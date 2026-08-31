import {
  StorageDriver,
  FileItem,
  calcFileType,
} from "../../internal/driver/base"
import { QuarkAddition, QuarkFile } from "./types"
import { QuarkClient } from "./util"

function quarkFileToFileItem(f: QuarkFile): FileItem {
  const isDir = !f.file
  const modTime = f.updated_at
    ? new Date(f.updated_at).toISOString()
    : new Date().toISOString()

  return {
    name: f.file_name,
    size: f.size || 0,
    is_dir: isDir,
    modified: modTime,
    sign: "",
    type: calcFileType(f.file_name, isDir),
    thumb: f.thumbnail || "",
    raw_url: "",
  }
}

export class QuarkDriver implements StorageDriver {
  private client: QuarkClient
  private pathFileIdCache = new Map<string, string>()

  constructor(addition: QuarkAddition) {
    this.client = new QuarkClient(addition)
  }

  async init(): Promise<void> {
    await this.client.init()
  }

  async list(_virtualPath: string, physicalPath: string): Promise<FileItem[]> {
    const folderId = await this.resolveFileId(physicalPath)
    const files = await this.client.getFiles(folderId)
    return files.map(quarkFileToFileItem)
  }

  async get(_virtualPath: string, physicalPath: string): Promise<FileItem> {
    const parts = physicalPath.split("/").filter(Boolean)
    const fileId = await this.resolveFileId(physicalPath)
    const rawName = parts[parts.length - 1] || "root"
    const decodedName = (() => {
      try {
        return decodeURIComponent(rawName)
      } catch {
        return rawName
      }
    })()
    const parentPath = "/" + parts.slice(0, parts.length - 1).join("/")
    const parentId = await this.resolveFileId(parentPath)

    const files = await this.client.getFiles(parentId)
    const file = files.find(
      (f) =>
        f.fid === fileId ||
        f.file_name === rawName ||
        f.file_name === decodedName,
    )

    let downloadLink = ""
    let downloadHeaders: Record<string, string> | undefined
    try {
      const linkRes = await this.client.getDownloadUrl(fileId, decodedName)
      downloadLink = linkRes.url
      downloadHeaders = linkRes.headers
    } catch (e: any) {
      console.warn(
        `[Quark/UC] getDownloadUrl warning for ${rawName}:`,
        e.message,
      )
    }

    if (file) {
      const item = quarkFileToFileItem(file)
      item.raw_url = downloadLink
      item.raw_url_headers = downloadHeaders
      return item
    }

    // Fallback: the path may be a folder that isn't listed in its parent
    // (e.g. the storage root). Probe it by listing — if it lists, it's a folder.
    try {
      await this.client.getFiles(fileId)
      return {
        name: decodedName || "root",
        size: 0,
        is_dir: true,
        modified: new Date().toISOString(),
        sign: "",
        type: 1,
        raw_url: "",
      }
    } catch {}

    return {
      name: decodedName || "root",
      size: 0,
      is_dir: false,
      modified: new Date().toISOString(),
      sign: "",
      type: 0,
      raw_url: downloadLink,
      raw_url_headers: downloadHeaders,
    }
  }

  async mkdir(_virtualPath: string, physicalPath: string): Promise<void> {
    const parts = physicalPath.split("/").filter(Boolean)
    const name = parts.pop() || "新文件夹"
    const parentPath = "/" + parts.join("/")
    const parentId = await this.resolveFileId(parentPath)
    await this.client.mkdir(parentId, name)
  }

  async rename(
    _virtualPath: string,
    physicalPath: string,
    newName: string,
  ): Promise<void> {
    const fileId = await this.resolveFileId(physicalPath)
    await this.client.rename(fileId, newName)
  }

  async remove(
    _virtualPath: string,
    physicalPath: string,
    _names: string[],
  ): Promise<void> {
    const fileId = await this.resolveFileId(physicalPath)
    await this.client.remove([fileId])
  }

  async move(
    _srcDir: string,
    _dstDir: string,
    _names: string[],
    srcPhysical: string,
    dstPhysical: string,
  ): Promise<void> {
    // dstPhysical 含文件名（op 层传入 dstDir/name 的完整路径），
    // client.move 需要目标"文件夹"ID —— 必须取其父目录解析，
    // 否则会到目标文件夹里找还没移过去的文件而报 not found。
    const fileId = await this.resolveFileId(srcPhysical)
    const dstId = await this.resolveFileId(this.getDirPath(dstPhysical))
    await this.client.move([fileId], dstId)
  }

  async copy(
    _srcDir: string,
    _dstDir: string,
    _names: string[],
    srcPhysical: string,
    dstPhysical: string,
  ): Promise<void> {
    // 同 move：取 dstPhysical 的父目录解析目标文件夹 ID。
    const fileId = await this.resolveFileId(srcPhysical)
    const dstId = await this.resolveFileId(this.getDirPath(dstPhysical))
    await this.client.copy([fileId], dstId)
  }

  /** 物理路径的父目录（"/a/b/c.txt" → "/a/b"；根级文件 → "/"） */
  private getDirPath(physicalPath: string): string {
    const parts = physicalPath.split("/").filter(Boolean)
    parts.pop()
    return "/" + parts.join("/")
  }

  /**
   * 中转上传（跨账号复制用）：按 OpenList quark_uc 官方协议执行
   *   1) /file/upload/pre 创建上传任务
   *   2) /file/update/hash 秒传检测（全量 md5+sha1，命中零数据传输）
   *   3) 未命中 → 分片上传（每片先 /file/upload/auth 取预签名再 PUT 到 OSS）
   *   4) CompleteMultipartUpload（XML + callback）
   *   5) /file/upload/finish
   */
  async uploadStream(params: {
    dstPhysicalPath: string
    fileName: string
    size: number
    md5: string
    sha1: string
    getStream: (start: number) => Promise<ReadableStream<Uint8Array>>
  }): Promise<void> {
    const parentId = await this.resolveFileId(
      this.getDirPath(params.dstPhysicalPath),
    )
    const pre = await this.client.uploadPre(
      parentId,
      params.fileName,
      params.size,
    )
    if (pre.finish) {
      // 秒传命中：服务端已直接创建文件，无需传输数据
      return
    }

    // 全量哈希秒传检测（/file/update/hash）
    if (await this.client.uploadHash(pre.task_id, params.md5, params.sha1)) {
      return
    }

    // 分片上传（part_size 由服务端下发，缺省 8MB）
    const partSize = pre.metadata?.part_size || 8 * 1024 * 1024
    const etags: string[] = []
    let partNumber = 1
    for (let offset = 0; offset < params.size; offset += partSize) {
      const len = Math.min(partSize, params.size - offset)
      const stream = await params.getStream(offset)
      const chunk = await readStreamFully(stream, len)
      const etag = await this.client.uploadPartToS3({
        pre,
        partNumber,
        body: chunk,
      })
      etags.push(etag)
      partNumber++
    }

    await this.client.uploadComplete(pre, etags)
    await this.client.uploadFinish(pre)
  }

  async put(
    _virtualPath: string,
    _physicalPath: string,
    _content: Buffer,
  ): Promise<void> {
    throw new Error(
      "[Quark/UC] Direct put not supported in stateless environment",
    )
  }

  async putStream(
    _virtualPath: string,
    _physicalPath: string,
    _stream: ReadableStream<Uint8Array>,
    _size?: number,
  ): Promise<void> {
    // 夸克上传协议需要先算哈希再分片上传，由 uploadStream 承担，
    // 直接流式上传不支持。
    throw new Error(
      "[Quark/UC] Direct stream upload not supported; use uploadStream (relay copy)",
    )
  }

  private async resolveFileId(physicalPath: string): Promise<string> {
    const clean = physicalPath.split("/").filter(Boolean).join("/")
    if (!clean) return this.client.getRootFolderId()
    if (this.pathFileIdCache.has(clean)) return this.pathFileIdCache.get(clean)!

    const parts = clean.split("/")
    let currentId = this.client.getRootFolderId()

    for (let i = 0; i < parts.length; i++) {
      const rawPart = parts[i]
      const decodedPart = (() => {
        try {
          return decodeURIComponent(rawPart)
        } catch {
          return rawPart
        }
      })()

      const items = await this.client.getFiles(currentId)
      const target = items.find(
        (f) =>
          f.file_name === rawPart ||
          f.file_name === decodedPart ||
          f.fid === rawPart,
      )
      if (!target) {
        throw new Error(
          `[Quark/UC] Path '${rawPart}' not found in folder '${currentId}'`,
        )
      }
      currentId = target.fid
      const subPath = "/" + parts.slice(0, i + 1).join("/")
      this.pathFileIdCache.set(subPath, currentId)
    }

    return currentId
  }
}

/** 从可读流中精确读取 want 字节（不足则报错），有界内存 */
async function readStreamFully(
  stream: ReadableStream<Uint8Array>,
  want: number,
): Promise<Uint8Array> {
  const out = new Uint8Array(want)
  const reader = stream.getReader()
  let filled = 0
  try {
    while (filled < want) {
      const { done, value } = await reader.read()
      if (done) break
      const take = Math.min(value.length, want - filled)
      out.set(value.subarray(0, take), filled)
      filled += take
      if (take < value.length) {
        // 多余数据直接丢弃（不应发生：按 Range 取流）
        await reader.cancel().catch(() => {})
        break
      }
    }
  } finally {
    if (filled < want) {
      await reader.cancel().catch(() => {})
    }
  }
  if (filled < want) {
    throw new Error(
      `[Quark/UC] stream ended early: got ${filled}/${want} bytes`,
    )
  }
  return out
}

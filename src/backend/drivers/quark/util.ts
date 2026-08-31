// Quark/UC drive HTTP client utilities
// Based on: https://github.com/OpenListTeam/OpenList/tree/main/drivers/quark_uc
import CryptoJS from "crypto-js"
import {
  QuarkAddition,
  QuarkConf,
  QuarkFile,
  QuarkSortResp,
  QuarkDownResp,
  QuarkMkdirResp,
  QuarkRenameResp,
  QuarkUploadPreData,
  QuarkUploadPreResp,
  QuarkHashResp,
  QuarkUpAuthResp,
  QuarkVariant,
} from "./types"

// ================================================================
// Variant configurations (Quark vs UC)
// ================================================================

const QUARK_CONF: QuarkConf = {
  ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) quark-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch",
  referer: "https://pan.quark.cn",
  api: "https://drive-m.quark.cn/1/clouddrive",
  pr: "ucpro",
}

const UC_CONF: QuarkConf = {
  ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) uc-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch",
  referer: "https://drive.uc.cn",
  api: "https://pc-api.uc.cn/1/clouddrive",
  pr: "UCBrowser",
}

function getConf(variant: QuarkVariant = "Quark"): QuarkConf {
  return variant === "UC" ? UC_CONF : QUARK_CONF
}

// ================================================================
// Cookie helpers
// ================================================================

function getCookieValue(cookieStr: string, key: string): string | null {
  const parts = cookieStr.split(";").map((p) => p.trim())
  for (const part of parts) {
    const idx = part.indexOf("=")
    if (idx !== -1 && part.substring(0, idx).trim() === key) {
      return part.substring(idx + 1).trim()
    }
  }
  return null
}

function setCookieValue(cookieStr: string, key: string, value: string): string {
  const parts = cookieStr
    .split(";")
    .map((p) => p.trim())
    .filter(Boolean)
  const existing = parts.findIndex((p) => {
    const idx = p.indexOf("=")
    return idx !== -1 && p.substring(0, idx).trim() === key
  })
  const newPart = `${key}=${value}`
  if (existing !== -1) {
    parts[existing] = newPart
  } else {
    parts.push(newPart)
  }
  return parts.join("; ")
}

// ================================================================
// QuarkClient
// ================================================================

export class QuarkClient {
  private addition: QuarkAddition
  private conf: QuarkConf
  private cookie: string

  // Persisted-cookie callback (optional, used to save updated cookies)
  private onCookieUpdate?: (newCookie: string) => void

  constructor(
    addition: QuarkAddition,
    onCookieUpdate?: (newCookie: string) => void,
  ) {
    this.addition = addition
    this.conf = getConf(addition.variant || "Quark")
    this.cookie = addition.cookie || ""
    this.onCookieUpdate = onCookieUpdate
  }

  public getRootFolderId(): string {
    const id = (this.addition.root_folder_id || "").trim()
    return id || "0"
  }

  public getVariant(): QuarkVariant {
    return this.addition.variant || "Quark"
  }

  public getConf(): QuarkConf {
    return this.conf
  }

  public getCookie(): string {
    return this.cookie
  }

  // ---- Core request method ----

  async request<T = any>(
    pathname: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    queryParams?: Record<string, string>,
    body?: any,
  ): Promise<T> {
    const url = new URL(this.conf.api + pathname)
    url.searchParams.set("pr", this.conf.pr)
    url.searchParams.set("fr", "pc")
    if (queryParams) {
      for (const [k, v] of Object.entries(queryParams)) {
        url.searchParams.set(k, v)
      }
    }

    const headers: Record<string, string> = {
      Cookie: this.cookie,
      Accept: "application/json, text/plain, */*",
      Referer: this.conf.referer,
      "Content-Type": "application/json",
      "User-Agent": this.conf.ua,
    }

    const fetchOptions: RequestInit = {
      method,
      headers,
    }
    if (body !== undefined && method !== "GET") {
      fetchOptions.body = JSON.stringify(body)
    }

    const res = await fetch(url.toString(), fetchOptions)

    // Update __puus cookie if server refreshes it
    const setCookieHeader = res.headers.get("set-cookie")
    if (setCookieHeader) {
      const puus = extractCookieFromSetCookie(setCookieHeader, "__puus")
      if (puus) {
        this.cookie = setCookieValue(this.cookie, "__puus", puus)
        this.onCookieUpdate?.(this.cookie)
      }
      // Quark transcoding also refreshes __pus
      if (this.addition.variant === "Quark") {
        const pus = extractCookieFromSetCookie(setCookieHeader, "__pus")
        if (pus) {
          this.cookie = setCookieValue(this.cookie, "__pus", pus)
          this.onCookieUpdate?.(this.cookie)
        }
      }
    }

    const data = (await res.json()) as any
    if (
      !res.ok ||
      (data.status !== undefined && data.status >= 400) ||
      (data.code !== undefined && data.code !== 0)
    ) {
      const msg = data.message || data.msg || `HTTP ${res.status}`
      throw new Error(
        `[Quark/UC] API error [${res.status}] ${pathname}: ${msg}`,
      )
    }
    return data as T
  }

  // ---- File listing ----

  async getFiles(parentId: string): Promise<QuarkFile[]> {
    const files: QuarkFile[] = []
    let page = 1
    const size = 100

    const query: Record<string, string> = {
      pdir_fid: parentId,
      _size: String(size),
      _fetch_total: "1",
      fetch_all_file: "1",
      fetch_risk_file_name: "1",
    }

    if (this.addition.order_by && this.addition.order_by !== "none") {
      const dir = this.addition.order_direction || "asc"
      query._sort = `file_type:asc,${this.addition.order_by}:${dir}`
    }

    while (true) {
      query._page = String(page)
      const resp = await this.request<QuarkSortResp>("/file/sort", "GET", query)
      const list = resp?.data?.list || []
      if (list.length === 0) break

      for (const file of list) {
        // HTML-unescape file names (the Go source does html.UnescapeString)
        file.file_name = unescapeHtml(file.file_name)

        if (this.addition.only_list_video_file) {
          // Only include videos (category === 1) and folders
          if (!file.file || file.category === 1) {
            files.push(file)
          }
        } else {
          files.push(file)
        }
      }

      const total = resp.metadata?.total ?? 0
      if (total > 0 && page * size >= total) break
      if (list.length < size) break
      page++
    }

    return files
  }

  // ---- Download link ----

  async getDownloadUrl(
    fileId: string,
    fileName: string,
  ): Promise<{ url: string; headers: Record<string, string> }> {
    const resp = await this.request<QuarkDownResp>(
      "/file/download",
      "POST",
      undefined,
      {
        fids: [fileId],
      },
    )

    const item = resp.data?.[0]
    if (!item?.download_url) {
      throw new Error(`[Quark/UC] No download_url for file: ${fileName}`)
    }

    return {
      url: item.download_url,
      headers: {
        Cookie: this.cookie,
        Referer: this.conf.referer,
        "User-Agent": this.conf.ua,
      },
    }
  }

  // ---- Mkdir ----

  async mkdir(parentId: string, dirName: string): Promise<string> {
    const resp = await this.request<QuarkMkdirResp>(
      "/file",
      "POST",
      undefined,
      {
        dir_init_lock: false,
        dir_path: "",
        file_name: dirName,
        pdir_fid: parentId,
      },
    )
    return resp.data?.[0]?.fid || ""
  }

  // ---- Rename ----

  async rename(fileId: string, newName: string): Promise<void> {
    await this.request<QuarkRenameResp>("/file/rename", "POST", undefined, {
      fid: fileId,
      file_name: newName,
    })
  }

  // ---- Delete ----

  async remove(fileIds: string[]): Promise<void> {
    await this.request("/file/delete", "POST", undefined, {
      action_type: 2,
      filelist: fileIds,
      exclude_fids: [],
    })
  }

  // ---- Move ----

  async move(fileIds: string[], toDirId: string): Promise<void> {
    await this.request("/file/move", "POST", undefined, {
      filelist: fileIds,
      to_pdir_fid: toDirId,
    })
  }

  // ---- Copy ----

  async copy(fileIds: string[], toDirId: string): Promise<void> {
    await this.request("/file/copy", "POST", undefined, {
      filelist: fileIds,
      to_pdir_fid: toDirId,
    })
  }

  // ---- Upload: create task (/file/upload/pre) ----

  async uploadPre(
    parentId: string,
    fileName: string,
    fileSize: number,
    mimeType?: string,
  ): Promise<QuarkUploadPreData> {
    const now = Date.now()
    const resp = await this.request<QuarkUploadPreResp>(
      "/file/upload/pre",
      "POST",
      undefined,
      {
        ccp_hash_update: true,
        dir_name: "",
        file_name: fileName,
        format_type: mimeType || guessFormatType(fileName),
        l_created_at: now,
        l_updated_at: now,
        pdir_fid: parentId,
        size: fileSize,
      },
    )
    return resp.data
  }

  // ---- Upload: instant upload check (/file/update/hash) ----

  /** 全量 md5+sha1 命中则服务端直接创建文件（零数据传输） */
  async uploadHash(
    taskId: string,
    md5: string,
    sha1: string,
  ): Promise<boolean> {
    const resp = await this.request<QuarkHashResp>(
      "/file/update/hash",
      "POST",
      undefined,
      { md5, sha1, task_id: taskId },
    )
    return !!resp.data?.finish
  }

  // ---- Upload: presign (/file/upload/auth) ----

  /** 服务端按签名原文（auth_meta）预计算 OSS Authorization */
  private async uploadAuth(params: {
    authInfo: string
    authMeta: string
    taskId: string
  }): Promise<string> {
    const resp = await this.request<QuarkUpAuthResp>(
      "/file/upload/auth",
      "POST",
      undefined,
      {
        auth_info: params.authInfo,
        auth_meta: params.authMeta,
        task_id: params.taskId,
      },
    )
    const key = resp.data?.auth_key
    if (!key) {
      throw new Error("[Quark/UC] upload/auth response missing auth_key")
    }
    return key
  }

  // ---- Upload: put part to OSS ----

  /** 上传单个分片：先取预签名再 PUT，返回分片 ETag（complete 需要） */
  async uploadPartToS3(params: {
    pre: QuarkUploadPreData
    partNumber: number
    body: Uint8Array
  }): Promise<string> {
    const pre = this.checkPreFields(params.pre)
    const mime = "application/octet-stream"
    const timeStr = new Date().toUTCString()
    const authMeta = [
      "PUT",
      mime,
      timeStr,
      `x-oss-date:${timeStr}`,
      `x-oss-user-agent:${OSS_USER_AGENT}`,
      `/${pre.bucket}/${pre.obj_key}?partNumber=${params.partNumber}&uploadId=${pre.upload_id}`,
    ].join("\n")
    const authKey = await this.uploadAuth({
      authInfo: pre.auth_info!,
      authMeta,
      taskId: pre.task_id,
    })

    const url =
      `https://${pre.bucket}.${stripScheme(pre.upload_url!)}/${pre.obj_key}` +
      `?partNumber=${params.partNumber}&uploadId=${encodeURIComponent(pre.upload_id!)}`
    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: authKey,
        "Content-Type": mime,
        Referer: "https://pan.quark.cn/",
        "x-oss-date": timeStr,
        "x-oss-user-agent": OSS_USER_AGENT,
      },
      body: params.body as Uint8Array<ArrayBuffer>,
    })
    if (!resp.ok) {
      const text = await resp.text().catch(() => "")
      throw new Error(
        `[Quark/UC] upload part ${params.partNumber} failed [${resp.status}]: ${text.slice(0, 200)}`,
      )
    }
    return resp.headers.get("etag") || ""
  }

  // ---- Upload: complete multipart (CompleteMultipartUpload XML) ----

  async uploadComplete(
    pre: QuarkUploadPreData,
    etags: string[],
  ): Promise<void> {
    const p = this.checkPreFields(pre)
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<CompleteMultipartUpload>\n`
    etags.forEach((etag, i) => {
      xml += `<Part>\n<PartNumber>${i + 1}</PartNumber>\n<ETag>${etag}</ETag>\n</Part>\n`
    })
    xml += `</CompleteMultipartUpload>`

    const contentMd5 = CryptoJS.MD5(xml).toString(CryptoJS.enc.Base64)
    const callbackJson = JSON.stringify(pre.callback || {})
    const callbackBase64 = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(callbackJson),
    )

    const timeStr = new Date().toUTCString()
    const authMeta = [
      "POST",
      contentMd5,
      "application/xml",
      timeStr,
      `x-oss-callback:${callbackBase64}`,
      `x-oss-date:${timeStr}`,
      `x-oss-user-agent:${OSS_USER_AGENT}`,
      `/${p.bucket}/${p.obj_key}?uploadId=${p.upload_id}`,
    ].join("\n")
    const authKey = await this.uploadAuth({
      authInfo: p.auth_info!,
      authMeta,
      taskId: p.task_id,
    })

    const url =
      `https://${p.bucket}.${stripScheme(p.upload_url!)}/${p.obj_key}` +
      `?uploadId=${encodeURIComponent(p.upload_id!)}`
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authKey,
        "Content-MD5": contentMd5,
        "Content-Type": "application/xml",
        Referer: "https://pan.quark.cn/",
        "x-oss-callback": callbackBase64,
        "x-oss-date": timeStr,
        "x-oss-user-agent": OSS_USER_AGENT,
      },
      body: xml,
    })
    if (!resp.ok) {
      const text = await resp.text().catch(() => "")
      throw new Error(
        `[Quark/UC] upload complete failed [${resp.status}]: ${text.slice(0, 200)}`,
      )
    }
  }

  // ---- Upload: finish (/file/upload/finish) ----

  async uploadFinish(pre: QuarkUploadPreData): Promise<void> {
    await this.request("/file/upload/finish", "POST", undefined, {
      obj_key: pre.obj_key,
      task_id: pre.task_id,
    })
  }

  /** 校验 upload/pre 响应包含完成上传所需的全部字段 */
  private checkPreFields(pre: QuarkUploadPreData): QuarkUploadPreData & {
    bucket: string
    obj_key: string
    upload_id: string
    upload_url: string
    auth_info: string
  } {
    if (
      !pre.bucket ||
      !pre.obj_key ||
      !pre.upload_id ||
      !pre.upload_url ||
      !pre.auth_info
    ) {
      throw new Error("[Quark/UC] upload/pre response missing upload fields")
    }
    return pre as QuarkUploadPreData & {
      bucket: string
      obj_key: string
      upload_id: string
      upload_url: string
      auth_info: string
    }
  }

  // ---- Init (validates cookie by calling /config) ----

  async init(): Promise<void> {
    if (!this.cookie?.trim()) {
      console.warn("[Quark/UC] Cookie is empty, skipping init.")
      return
    }
    try {
      await this.request("/config", "GET")
      console.log(`[Quark/UC] (${this.addition.variant || "Quark"}) init OK`)
    } catch (e: any) {
      console.warn(`[Quark/UC] init warning:`, e.message)
    }
  }
}

// ================================================================
// OSS upload constants (quark/uc parts upload to aliyun OSS)
// ================================================================

/** OSS 请求固定 UA（与官方客户端一致，参与预签名原文） */
const OSS_USER_AGENT =
  "aliyun-sdk-js/6.6.1 Chrome 98.0.4758.80 on Windows 10 64-bit"

/** 去掉 URL 的 scheme 与尾部斜杠（拼 bucket 子域名用） */
function stripScheme(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/+$/, "")
}

// ================================================================
// Helpers
// ================================================================

function extractCookieFromSetCookie(
  header: string,
  name: string,
): string | null {
  // Multiple Set-Cookie headers may be joined by comma or newline
  const segments = header.split(/,(?=[^;]+=[^;]+)/)
  for (const seg of segments) {
    const parts = seg.split(";")
    const kv = parts[0].trim()
    const eqIdx = kv.indexOf("=")
    if (eqIdx !== -1) {
      const k = kv.substring(0, eqIdx).trim()
      if (k === name) {
        return kv.substring(eqIdx + 1).trim()
      }
    }
  }
  return null
}

/** Simple HTML entity unescaping (matching Go's html.UnescapeString for common cases) */
function unescapeHtml(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}

/** Guess the format_type from file extension for upload */
function guessFormatType(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase() || ""
  const videoExts = [
    "mp4",
    "mkv",
    "avi",
    "mov",
    "flv",
    "wmv",
    "ts",
    "m2ts",
    "m4v",
    "rmvb",
    "webm",
  ]
  const audioExts = ["mp3", "flac", "aac", "wav", "ogg", "m4a", "opus"]
  const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "heic", "tiff"]
  const docExts = [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
    "md",
  ]
  if (videoExts.includes(ext)) return "video"
  if (audioExts.includes(ext)) return "audio"
  if (imageExts.includes(ext)) return "image"
  if (docExts.includes(ext)) return "doc"
  return "others"
}

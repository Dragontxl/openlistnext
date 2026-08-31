// 跨存储中转复制：
//   源 driver 下载 → (中转存储暂存 + 增量哈希) → 目标 driver 上传
//
// 目标类型路由：
//   - 夸克/UC（有 uploadStream）：数据 tee 到中转暂存，同时增量算全量 MD5+SHA1；
//     目标先做 /file/update/hash 秒传检测（命中零传输），未命中从中转回读分片上传
//   - S3 系（有 putStream + supportsStreamUpload）：源流直通目标分片上传（不落地）
//   - 其他（仅 put）：中转暂存 → 整体回读（≤64MB）→ put
import CryptoJS from "crypto-js"
import { resolvePath, getSettings } from "../model/db"
import { getDriver } from "./storage"
import type { FileItem, StorageDriver } from "../driver/base"

const MAX_BUFFERED_PUT = 64 * 1024 * 1024 // 仅支持 put 的目标：整文件缓冲上限
const RELAY_TMP_DIR = "_relay_tmp/openlist_relay"
const S3_FAMILY_DRIVERS = ["s3", "doge", "dogecloud"]

export interface RelayCopyParams {
  srcStorage: any
  dstStorage: any
  srcDir: string
  dstDir: string
  srcVirtual: string
  dstVirtual: string
  srcPhysical: string
  dstPhysical: string
  name: string
  /** "copy" | "move"：move 未配置中转时回退服务端 move */
  operation?: "copy" | "move"
  [key: string]: any
}

function normDriver(name: string): string {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
}

// Uint8Array → CryptoJS WordArray（增量哈希用）
function toWordArray(u8: Uint8Array) {
  const words: number[] = []
  for (let i = 0; i < u8.length; i += 4) {
    words.push(
      ((u8[i] || 0) << 24) |
        ((u8[i + 1] || 0) << 16) |
        ((u8[i + 2] || 0) << 8) |
        (u8[i + 3] || 0) |
        0,
    )
  }
  return CryptoJS.lib.WordArray.create(words, u8.length)
}

function newMd5() {
  return CryptoJS.algo.MD5.create()
}

function newSha1() {
  return CryptoJS.algo.SHA1.create()
}

function finalizeHex(hasher: { finalize: () => any }): string {
  return hasher.finalize().toString(CryptoJS.enc.Hex)
}

function bufferFrom(u8: Uint8Array): Buffer {
  return Buffer.from(u8.buffer, u8.byteOffset, u8.byteLength) as Buffer
}

/** 哈希一个流直到结束（同份数据增量喂入两个 hasher，消费全部数据） */
async function hashStreamDual(
  stream: ReadableStream<Uint8Array>,
  a: { update: (w: any) => void },
  b: { update: (w: any) => void },
): Promise<void> {
  const reader = stream.getReader()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (value && value.length) {
      const w = toWordArray(value)
      a.update(w)
      b.update(w)
    }
  }
}

/** 跨存储复制入口（storage.ts 的 copyItems/moveItems 调用） */
export async function copyBetweenStorages(
  params: RelayCopyParams,
): Promise<void> {
  const settings = await getSettings()
  const relayMount = String(settings.relay_storage || "").trim()

  if (relayMount) {
    await relayCopyBetweenStorages(params, relayMount)
    return
  }

  // 未配置中转：尝试源 driver 服务端复制/移动（同账号多挂载可行）。
  // S3 系除外：服务端复制会把文件写进"源 bucket 的目标相对路径"（静默错位）。
  const srcNorm = normDriver(params.srcStorage.driver)
  if (!S3_FAMILY_DRIVERS.includes(srcNorm)) {
    const srcDriver = await getDriver(
      params.srcStorage.driver,
      params.srcStorage,
    )
    if (params.operation === "move") {
      await srcDriver.move(
        params.srcDir,
        params.dstDir,
        [params.name],
        params.srcPhysical,
        params.dstPhysical,
      )
      return
    }
    await srcDriver.copy(
      params.srcDir,
      params.dstDir,
      [params.name],
      params.srcPhysical,
      params.dstPhysical,
    )
    return
  }

  throw new Error(
    "[跨存储复制] 未配置中转存储：请在 设置 → 站点设置 中将 relay_storage 设为一个 S3/R2 挂载",
  )
}

/** 中转复制主流程（文件或文件夹） */
async function relayCopyBetweenStorages(
  params: RelayCopyParams,
  relayMount: string,
): Promise<void> {
  const srcDriver = await getDriver(params.srcStorage.driver, params.srcStorage)
  const dstDriver = await getDriver(params.dstStorage.driver, params.dstStorage)

  const info = await srcDriver.get(params.srcVirtual, params.srcPhysical)
  if (info.is_dir) {
    // 文件夹：在目标建同名目录后递归
    await dstDriver.mkdir(params.dstVirtual, params.dstPhysical)
    await relayCopyDir(srcDriver, dstDriver, relayMount, {
      srcVirtual: params.srcVirtual,
      srcPhysical: params.srcPhysical,
      dstVirtual: params.dstVirtual,
      dstPhysical: params.dstPhysical,
    })
    return
  }

  await relayCopyFile(srcDriver, dstDriver, relayMount, {
    srcVirtual: params.srcVirtual,
    srcPhysical: params.srcPhysical,
    dstVirtual: params.dstVirtual,
    dstPhysical: params.dstPhysical,
    name: params.name,
    info,
  })
}

async function relayCopyDir(
  srcDriver: StorageDriver,
  dstDriver: StorageDriver,
  relayMount: string,
  paths: {
    srcVirtual: string
    srcPhysical: string
    dstVirtual: string
    dstPhysical: string
  },
): Promise<void> {
  const children = await srcDriver.list(paths.srcVirtual, paths.srcPhysical)
  for (const child of children) {
    const childSrcVirtual = joinV(paths.srcVirtual, child.name)
    const childDstVirtual = joinV(paths.dstVirtual, child.name)
    const childSrcPhysical = joinV(paths.srcPhysical, child.name)
    const childDstPhysical = joinV(paths.dstPhysical, child.name)
    if (child.is_dir) {
      await dstDriver.mkdir(childDstVirtual, childDstPhysical)
      await relayCopyDir(srcDriver, dstDriver, relayMount, {
        srcVirtual: childSrcVirtual,
        srcPhysical: childSrcPhysical,
        dstVirtual: childDstVirtual,
        dstPhysical: childDstPhysical,
      })
    } else {
      await relayCopyFile(srcDriver, dstDriver, relayMount, {
        srcVirtual: childSrcVirtual,
        srcPhysical: childSrcPhysical,
        dstVirtual: childDstVirtual,
        dstPhysical: childDstPhysical,
        name: child.name,
        info: child,
      })
    }
  }
}

function joinV(dir: string, name: string): string {
  return `${String(dir).replace(/\/+$/, "")}/${name}`
}

function joinPhys(dir: string, name: string): string {
  return `${String(dir).replace(/\/+$/, "")}/${name}`
}

interface FileCopyCtx {
  srcVirtual: string
  srcPhysical: string
  dstVirtual: string
  dstPhysical: string
  name: string
  info: FileItem
}

async function relayCopyFile(
  srcDriver: StorageDriver,
  dstDriver: StorageDriver,
  relayMount: string,
  ctx: FileCopyCtx,
): Promise<void> {
  const size = ctx.info.size || 0
  const fileName = ctx.name

  if (!ctx.info.raw_url) {
    throw new Error(
      `[中转复制] 无法获取源文件下载链接: ${ctx.srcVirtual}${ctx.info.raw_url_error ? ` (${ctx.info.raw_url_error})` : ""}`,
    )
  }

  const openSource = async (
    start: number,
  ): Promise<ReadableStream<Uint8Array>> => {
    const headers: Record<string, string> = {
      ...(ctx.info.raw_url_headers || {}),
    }
    if (start > 0) headers["Range"] = `bytes=${start}-`
    const resp = await fetch(ctx.info.raw_url!, { headers })
    if (!resp.ok || !resp.body) {
      throw new Error(
        `[中转复制] 源文件下载失败 [${resp.status}]: ${ctx.srcVirtual}`,
      )
    }
    return resp.body as ReadableStream<Uint8Array>
  }

  const dstAny = dstDriver as any
  const quarkLike = typeof dstAny.uploadStream === "function"
  const streamDst =
    !!dstDriver.putStream && dstDriver.supportsStreamUpload === true

  // ---------- 夸克/UC 目标：中转暂存 + 双哈希（目标侧秒传优先） ----------
  if (quarkLike) {
    if (!relayMount) {
      throw new Error(
        "[中转复制] 未配置中转存储：请在 设置 → 站点设置 中将 relay_storage 设为一个 S3/R2 挂载",
      )
    }
    const relay = await openRelayTemp(relayMount, fileName)
    try {
      // 源流 tee：一路写入中转桶暂存，一路增量计算全量 MD5+SHA1（秒传检测用）
      const md5 = newMd5()
      const sha1 = newSha1()
      const [toRelay, toHash] = (await openSource(0)).tee()
      const hashPromise = hashStreamDual(toHash, md5, sha1)
      await relay.relayDriver.putStream!(
        relay.tmpVirtual,
        relay.tmpPhysical,
        toRelay,
        size,
      )
      await hashPromise

      // 从中转回读分片上传到夸克（内部先做 /file/update/hash 秒传检测）
      const getStream = async (start: number) =>
        relay.relayDriver.getStream!(relay.tmpPhysical, start)
      await dstAny.uploadStream({
        dstPhysicalPath: ctx.dstPhysical,
        fileName,
        size,
        md5: finalizeHex(md5),
        sha1: finalizeHex(sha1),
        getStream,
      })
    } finally {
      await relay.cleanup()
    }
    return
  }

  // ---------- S3 系目标：流式直通（不落地） ----------
  if (streamDst) {
    await dstDriver.putStream!(
      ctx.dstVirtual,
      ctx.dstPhysical,
      await openSource(0),
      size,
    )
    return
  }

  // ---------- 其他目标：中转暂存 → 整体回读 → put ----------
  if (!relayMount) {
    throw new Error(
      "[中转复制] 未配置中转存储：请在 设置 → 站点设置 中将 relay_storage 设为一个 S3/R2 挂载",
    )
  }
  if (size > MAX_BUFFERED_PUT) {
    throw new Error(
      `[中转复制] 目标存储暂不支持流式上传，文件超过缓冲上限 (${Math.floor(MAX_BUFFERED_PUT / 1024 / 1024)}MB): ${fileName}`,
    )
  }
  const relay = await openRelayTemp(relayMount, fileName)
  try {
    // 源流写入中转暂存，再整体回读交给目标 put（目标不支持流式上传）
    await relay.relayDriver.putStream!(
      relay.tmpVirtual,
      relay.tmpPhysical,
      await openSource(0),
      size,
    )
    const resp = await relay.relayDriver.getStream!(relay.tmpPhysical, 0)
    const data = await readExactly(resp, size)
    await dstDriver.put(ctx.dstVirtual, ctx.dstPhysical, bufferFrom(data))
  } finally {
    await relay.cleanup()
  }
}

/** 打开中转临时文件（S3 系存储），返回回读句柄与清理函数 */
async function openRelayTemp(relayMount: string, fileName: string) {
  const cleanMount = relayMount.replace(/^\/+|\/+$/g, "")
  const tmpVirtual = `/${cleanMount}/${RELAY_TMP_DIR}/${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 8)}/${fileName}`
  const resolved = await resolvePath(tmpVirtual)
  if (resolved.isVirtual) {
    throw new Error(`[中转复制] 中转存储不可用: ${relayMount}`)
  }
  const relayDriver = await getDriver(resolved.storage.driver, resolved.storage)
  if (!relayDriver.putStream || relayDriver.supportsStreamUpload !== true) {
    throw new Error(
      `[中转复制] 中转存储必须是 S3/R2 类型（当前: ${resolved.storage.driver}）`,
    )
  }
  return {
    relayDriver,
    tmpVirtual,
    tmpPhysical: resolved.physical!,
    cleanup: async () => {
      try {
        await relayDriver.remove(tmpVirtual, resolved.physical!, [fileName])
      } catch {
        // 清理失败不影响主流程
      }
    },
  }
}

/** 从流中精确读取 want 字节（提前结束则报错并取消流） */
async function readExactly(
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
    }
  } finally {
    if (filled < want) {
      await reader.cancel().catch(() => {})
    }
  }
  if (filled < want) {
    throw new Error(`[中转复制] 流提前结束: 读取 ${filled}/${want} 字节`)
  }
  return out
}

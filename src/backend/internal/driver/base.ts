export interface FileItem {
  name: string
  size: number
  is_dir: boolean
  created?: string
  modified: string
  sign: string
  type: number // 1: FOLDER, 2: VIDEO, 3: AUDIO, 4: TEXT, 5: IMAGE, 0: UNKNOWN
  thumb?: string
  raw_url?: string
  /** Headers that must accompany the raw_url request (e.g. Cookie, Referer for cloud drives) */
  raw_url_headers?: Record<string, string>
  /** When the driver could not obtain a download link, the concrete reason (for better 404 reporting) */
  raw_url_error?: string
}

export function calcFileType(name: string, isDir: boolean): number {
  if (isDir) return 1 // FOLDER
  const ext = (name.split(".").pop() || "").toLowerCase()
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
    "3gp",
    "asf",
    "vob",
    "ogv",
    "rm",
    "f4v",
  ]
  if (videoExts.includes(ext)) return 2 // VIDEO

  const audioExts = [
    "mp3",
    "flac",
    "aac",
    "wav",
    "ogg",
    "m4a",
    "opus",
    "wma",
    "ape",
    "alac",
    "aiff",
    "mid",
    "midi",
  ]
  if (audioExts.includes(ext)) return 3 // AUDIO

  const textExts = [
    "txt",
    "md",
    "markdown",
    "json",
    "js",
    "ts",
    "jsx",
    "tsx",
    "css",
    "scss",
    "html",
    "htm",
    "xml",
    "yaml",
    "yml",
    "ini",
    "conf",
    "env",
    "log",
    "sql",
    "py",
    "java",
    "c",
    "cpp",
    "h",
    "hpp",
    "go",
    "rs",
    "sh",
    "bat",
    "cmd",
    "ps1",
    "php",
    "rb",
    "swift",
    "kt",
    "cs",
    "vue",
    "svelte",
    "json5",
    "toml",
  ]
  if (textExts.includes(ext)) return 4 // TEXT

  const imageExts = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "svg",
    "ico",
    "tiff",
    "tif",
    "heic",
    "heif",
    "avif",
    "vvc",
    "avc",
    "psd",
    "ai",
  ]
  if (imageExts.includes(ext)) return 5 // IMAGE

  return 0 // UNKNOWN
}

export interface StorageDriver {
  init?(): Promise<void>
  list(virtualPath: string, physicalPath: string): Promise<FileItem[]>
  get(virtualPath: string, physicalPath: string): Promise<FileItem>
  mkdir(virtualPath: string, physicalPath: string): Promise<void>
  rename(
    virtualPath: string,
    physicalPath: string,
    newName: string,
  ): Promise<void>
  remove(
    virtualPath: string,
    physicalPath: string,
    names: string[],
  ): Promise<void>
  move(
    srcDir: string,
    dstDir: string,
    names: string[],
    srcPhys: string,
    dstPhys: string,
  ): Promise<void>
  copy(
    srcDir: string,
    dstDir: string,
    names: string[],
    srcPhys: string,
    dstPhys: string,
  ): Promise<void>
  put(virtualPath: string, physicalPath: string, content: Buffer): Promise<void>
  /**
   * 流式上传（可选实现）：有界内存地写入任意大小的文件。
   * 目前 S3 系 driver 支持；中转复制时优先使用。
   */
  putStream?(
    virtualPath: string,
    physicalPath: string,
    stream: ReadableStream<Uint8Array>,
    size?: number,
  ): Promise<void>
  /** 支持流式上传的目标 driver 置为 true（配合 putStream 特性检测） */
  readonly supportsStreamUpload?: boolean
  /** 按物理路径读取对象/文件的字节流，start 为起始偏移（中转回读用） */
  getStream?(
    physicalPath: string,
    start?: number,
  ): Promise<ReadableStream<Uint8Array>>
}

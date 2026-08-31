var X0 = Object.create
var Ls = Object.defineProperty
var Z0 = Object.getOwnPropertyDescriptor
var Y0 = Object.getOwnPropertyNames
var eu = Object.getPrototypeOf,
  tu = Object.prototype.hasOwnProperty
var Ns = ((t) =>
  typeof require < "u"
    ? require
    : typeof Proxy < "u"
      ? new Proxy(t, { get: (e, r) => (typeof require < "u" ? require : e)[r] })
      : t)(function (t) {
  if (typeof require < "u") return require.apply(this, arguments)
  throw Error('Dynamic require of "' + t + '" is not supported')
})
var K = (t, e, r) => () => {
  if (r) throw r[0]
  try {
    return (t && (e = t((t = 0))), e)
  } catch (i) {
    throw ((r = [i]), i)
  }
}
var N = (t, e) => () => {
    try {
      return (e || t((e = { exports: {} }).exports, e), e.exports)
    } catch (r) {
      throw ((e = 0), r)
    }
  },
  Lr = (t, e) => {
    for (var r in e) Ls(t, r, { get: e[r], enumerable: !0 })
  },
  ru = (t, e, r, i) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let s of Y0(e))
        !tu.call(t, s) &&
          s !== r &&
          Ls(t, s, {
            get: () => e[s],
            enumerable: !(i = Z0(e, s)) || i.enumerable,
          })
    return t
  }
var mt = (t, e, r) => (
  (r = t != null ? X0(eu(t)) : {}),
  ru(
    e || !t || !t.__esModule
      ? Ls(r, "default", { value: t, enumerable: !0 })
      : r,
    t,
  )
)
var ar,
  Hs = K(() => {
    ar = class extends Error {
      res
      status
      constructor(t = 500, e) {
        ;(super(e?.message, { cause: e?.cause }),
          (this.res = e?.res),
          (this.status = t))
      }
      getResponse() {
        return this.res
          ? new Response(this.res.body, {
              status: this.status,
              headers: this.res.headers,
            })
          : new Response(this.message, { status: this.status })
      }
    }
  })
var Ua,
  $a = K(() => {
    Ua = Symbol()
  })
var Oa = K(() => {})
var qa,
  ja = K(() => {
    Oa()
    qa = (t, e) =>
      new Response(t, {
        headers: {
          "Content-Type": e.replace(/^[^;]+/, (i) => i.toLowerCase()),
        },
      }).formData()
  })
async function iu(t, e) {
  if (!Nr(t) && t.bodyCache.formData) return za(await t.bodyCache.formData, e)
  let r = Nr(t) ? t.headers : t.raw.headers,
    i = await t.arrayBuffer(),
    s = qa(i, r.get("Content-Type") || "")
  Nr(t) || (t.bodyCache.formData = s)
  let n = await s
  return n ? za(n, e) : {}
}
function za(t, e) {
  let r = Object.create(null)
  return (
    t.forEach((i, s) => {
      e.all || s.endsWith("[]") ? su(r, s, i) : (r[s] = i)
    }),
    e.dot &&
      Object.entries(r).forEach(([i, s]) => {
        i.includes(".") && (nu(r, i, s), delete r[i])
      }),
    r
  )
}
var Nr,
  La,
  su,
  nu,
  Na = K(() => {
    ja()
    ;((Nr = (t) => "headers" in t),
      (La = async (t, e = Object.create(null)) => {
        let { all: r = !1, dot: i = !1 } = e,
          a = (Nr(t) ? t.headers : t.raw.headers)
            .get("Content-Type")
            ?.split(";")[0]
            .trim()
            .toLowerCase()
        return a === "multipart/form-data" ||
          a === "application/x-www-form-urlencoded"
          ? iu(t, { all: r, dot: i })
          : {}
      }))
    ;((su = (t, e, r) => {
      t[e] !== void 0
        ? Array.isArray(t[e])
          ? t[e].push(r)
          : (t[e] = [t[e], r])
        : e.endsWith("[]")
          ? (t[e] = [r])
          : (t[e] = r)
    }),
      (nu = (t, e, r) => {
        if (/(?:^|\.)__proto__\./.test(e)) return
        let i = t,
          s = e.split(".")
        s.forEach((n, a) => {
          a === s.length - 1
            ? (i[n] = r)
            : ((!i[n] ||
                typeof i[n] != "object" ||
                Array.isArray(i[n]) ||
                i[n] instanceof File) &&
                (i[n] = Object.create(null)),
              (i = i[n]))
        })
      }))
  })
var Ws,
  Ma,
  au,
  ou,
  Mr,
  Ha,
  Ka,
  cu,
  Vs,
  Wa,
  it,
  Hr,
  qt,
  Ks,
  Va,
  Ga,
  Ja,
  du,
  yt = K(() => {
    ;((Ws = (t) => {
      let e = t.split("/")
      return (e[0] === "" && e.shift(), e)
    }),
      (Ma = (t) => {
        let { groups: e, path: r } = au(t),
          i = Ws(r)
        return ou(i, e)
      }),
      (au = (t) => {
        let e = []
        return (
          (t = t.replace(/\{[^}]+\}/g, (r, i) => {
            let s = `@${i}`
            return (e.push([s, r]), s)
          })),
          { groups: e, path: t }
        )
      }),
      (ou = (t, e) => {
        for (let r = e.length - 1; r >= 0; r--) {
          let [i] = e[r]
          for (let s = t.length - 1; s >= 0; s--)
            if (t[s].includes(i)) {
              t[s] = t[s].replace(i, e[r][1])
              break
            }
        }
        return t
      }),
      (Mr = {}),
      (Ha = (t, e) => {
        if (t === "*") return "*"
        let r = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/)
        if (r) {
          let i = `${t}#${e}`
          return (
            Mr[i] ||
              (r[2]
                ? (Mr[i] =
                    e && e[0] !== ":" && e[0] !== "*"
                      ? [i, r[1], new RegExp(`^${r[2]}(?=/${e})`)]
                      : [t, r[1], new RegExp(`^${r[2]}$`)])
                : (Mr[i] = [t, r[1], !0])),
            Mr[i]
          )
        }
        return null
      }),
      (Ka = (t, e) => {
        try {
          return e(t)
        } catch {
          return t.replace(/(?:%[0-9A-Fa-f]{2})+/g, (r) => {
            try {
              return e(r)
            } catch {
              return r
            }
          })
        }
      }),
      (cu = (t) => Ka(t, decodeURI)),
      (Vs = (t) => {
        let e = t.url,
          r = e.indexOf("/", e.indexOf(":") + 4),
          i = r
        for (; i < e.length; i++) {
          let s = e.charCodeAt(i)
          if (s === 37) {
            let n = e.indexOf("?", i),
              a = e.indexOf("#", i),
              o =
                n === -1
                  ? a === -1
                    ? void 0
                    : a
                  : a === -1
                    ? n
                    : Math.min(n, a),
              c = e.slice(r, o)
            return cu(c.includes("%25") ? c.replace(/%25/g, "%2525") : c)
          } else if (s === 63 || s === 35) break
        }
        return e.slice(r, i)
      }),
      (Wa = (t) => {
        let e = Vs(t)
        return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e
      }),
      (it = (t, e, ...r) => (
        r.length && (e = it(e, ...r)),
        `${t?.[0] === "/" ? "" : "/"}${t}${e === "/" ? "" : `${t?.at(-1) === "/" ? "" : "/"}${e?.[0] === "/" ? e.slice(1) : e}`}`
      )),
      (Hr = (t) => {
        if (t.charCodeAt(t.length - 1) !== 63 || !t.includes(":")) return null
        let e = t.split("/"),
          r = [],
          i = ""
        return (
          e.forEach((s) => {
            if (s !== "" && !/\:/.test(s)) i += "/" + s
            else if (/\:/.test(s))
              if (/\?/.test(s)) {
                r.length === 0 && i === "" ? r.push("/") : r.push(i)
                let n = s.replace("?", "")
                ;((i += "/" + n), r.push(i))
              } else i += "/" + s
          }),
          r.filter((s, n, a) => a.indexOf(s) === n)
        )
      }),
      (qt = (t) => (t.indexOf("%") !== -1 ? Ka(t, du) : t)),
      (Ks = (t) => (
        t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")),
        qt(t)
      )),
      (Va = (t, e, r) => {
        let i
        if (!r && e && e.indexOf("%") === -1 && e.indexOf("+") === -1) {
          let a = t.indexOf("?", 8)
          if (a === -1) return
          for (
            t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1));
            a !== -1;
          ) {
            let o = t.charCodeAt(a + e.length + 1)
            if (o === 61) {
              let c = a + e.length + 2,
                d = t.indexOf("&", c)
              return Ks(t.slice(c, d === -1 ? void 0 : d))
            } else if (o == 38 || isNaN(o)) return ""
            a = t.indexOf(`&${e}`, a + 1)
          }
          if (((i = /[%+]/.test(t)), !i)) return
        }
        let s = Object.create(null)
        i ??= /[%+]/.test(t)
        let n = t.indexOf("?", 8)
        for (; n !== -1; ) {
          let a = t.indexOf("&", n + 1),
            o = t.indexOf("=", n)
          o > a && a !== -1 && (o = -1)
          let c = t.slice(n + 1, o === -1 ? (a === -1 ? void 0 : a) : o)
          if ((i && (c = Ks(c)), (n = a), c === "")) continue
          let d
          ;(o === -1
            ? (d = "")
            : ((d = t.slice(o + 1, a === -1 ? void 0 : a)), i && (d = Ks(d))),
            r
              ? ((s[c] && Array.isArray(s[c])) || (s[c] = []), s[c].push(d))
              : (s[c] ??= d))
        }
        return e ? s[e] : s
      }),
      (Ga = Va),
      (Ja = (t, e) => Va(t, e, !0)),
      (du = decodeURIComponent))
  })
var Qa,
  Xa = K(() => {
    Hs()
    $a()
    Na()
    yt()
    Qa = class {
      raw
      #t
      #e
      routeIndex = 0
      path
      bodyCache = {}
      constructor(t, e = "/", r = [[]]) {
        ;((this.raw = t), (this.path = e), (this.#e = r))
      }
      param(t) {
        return t ? this.#r(t) : this.#n()
      }
      #r(t) {
        let e = this.#e[0][this.routeIndex][1][t],
          r = this.#i(e)
        return r && qt(r)
      }
      #n() {
        let t = {},
          e = Object.keys(this.#e[0][this.routeIndex][1])
        for (let r of e) {
          let i = this.#i(this.#e[0][this.routeIndex][1][r])
          i !== void 0 && (t[r] = qt(i))
        }
        return t
      }
      #i(t) {
        return this.#e[1] ? this.#e[1][t] : t
      }
      query(t) {
        return Ga(this.url, t)
      }
      queries(t) {
        return Ja(this.url, t)
      }
      header(t) {
        if (t) return this.raw.headers.get(t) ?? void 0
        let e = Object.create(null)
        return (
          this.raw.headers.forEach((r, i) => {
            e[i] = r
          }),
          e
        )
      }
      async parseBody(t) {
        return La(this, t)
      }
      #s = (t) => {
        let { bodyCache: e, raw: r } = this,
          i = e[t]
        if (i) return i
        for (let s in e)
          return e[s].then(
            (n) => (
              s === "json" && (n = JSON.stringify(n)),
              new Response(n)[t]()
            ),
          )
        return (e[t] = r[t]())
      }
      json() {
        return this.#s("text").then((t) => JSON.parse(t))
      }
      text() {
        return this.#s("text")
      }
      arrayBuffer() {
        return this.#s("arrayBuffer")
      }
      bytes() {
        return this.#s("arrayBuffer").then((t) => new Uint8Array(t))
      }
      blob() {
        return this.#s("blob")
      }
      formData() {
        return this.#s("formData")
      }
      addValidatedData(t, e) {
        ;(this.#t ??= {})[t] = e
      }
      valid(t) {
        return this.#t?.[t]
      }
      get url() {
        return this.raw.url
      }
      get method() {
        return this.raw.method
      }
      get [Ua]() {
        return this.#e
      }
      get matchedRoutes() {
        return this.#e[0].map(([[, t]]) => t)
      }
      get routePath() {
        return this.#e[0].map(([[, t]]) => t)[this.routeIndex].path
      }
    }
  })
var Za,
  lu,
  Gs,
  Ya = K(() => {
    ;((Za = { Stringify: 1, BeforeStream: 2, Stream: 3 }),
      (lu = (t, e) => {
        let r = new String(t)
        return ((r.isEscaped = !0), (r.callbacks = e), r)
      }),
      (Gs = async (t, e, r, i, s) => {
        typeof t == "object" &&
          !(t instanceof String) &&
          (t instanceof Promise || (t = t.toString()),
          t instanceof Promise && (t = await t))
        let n = t.callbacks
        if (!n?.length) return Promise.resolve(t)
        s ? (s[0] += t) : (s = [t])
        let a = Promise.all(
          n.map((o) => o({ phase: e, buffer: s, context: i })),
        ).then((o) =>
          Promise.all(o.filter(Boolean).map((c) => Gs(c, e, !1, i, s))).then(
            () => s[0],
          ),
        )
        return r ? lu(await a, n) : a
      }))
  })
var uu,
  Js,
  or,
  Qs,
  Kr = K(() => {
    Xa()
    Ya()
    ;((uu = "text/plain; charset=UTF-8"),
      (Js = (t, e) => ({ "Content-Type": t, ...e })),
      (or = (t, e) => new Response(t, e)),
      (Qs = class {
        #t
        #e
        env = {}
        #r
        finalized = !1
        error
        #n
        #i
        #s
        #l
        #c
        #d
        #o
        #u
        #p
        constructor(t, e) {
          ;((this.#t = t),
            e &&
              ((this.#i = e.executionCtx),
              (this.env = e.env),
              (this.#d = e.notFoundHandler),
              (this.#p = e.path),
              (this.#u = e.matchResult)))
        }
        get req() {
          return ((this.#e ??= new Qa(this.#t, this.#p, this.#u)), this.#e)
        }
        get event() {
          if (this.#i && "respondWith" in this.#i) return this.#i
          throw Error("This context has no FetchEvent")
        }
        get executionCtx() {
          if (this.#i) return this.#i
          throw Error("This context has no ExecutionContext")
        }
        get res() {
          return (this.#s ||= or(null, {
            headers: (this.#o ??= new Headers()),
          }))
        }
        set res(t) {
          if (this.#s && t) {
            t = or(t.body, t)
            for (let [e, r] of this.#s.headers.entries())
              if (e !== "content-type")
                if (e === "set-cookie") {
                  let i = this.#s.headers.getSetCookie()
                  t.headers.delete("set-cookie")
                  for (let s of i) t.headers.append("set-cookie", s)
                } else t.headers.set(e, r)
          }
          ;((this.#s = t), (this.finalized = !0))
        }
        render = (...t) => ((this.#c ??= (e) => this.html(e)), this.#c(...t))
        setLayout = (t) => (this.#l = t)
        getLayout = () => this.#l
        setRenderer = (t) => {
          this.#c = t
        }
        header = (t, e, r) => {
          this.finalized && (this.#s = or(this.#s.body, this.#s))
          let i = this.#s ? this.#s.headers : (this.#o ??= new Headers())
          e === void 0 ? i.delete(t) : r?.append ? i.append(t, e) : i.set(t, e)
        }
        status = (t) => {
          this.#n = t
        }
        set = (t, e) => {
          ;((this.#r ??= new Map()), this.#r.set(t, e))
        }
        get = (t) => (this.#r ? this.#r.get(t) : void 0)
        get var() {
          return this.#r ? Object.fromEntries(this.#r) : {}
        }
        #a(t, e, r) {
          let i = this.#s ? new Headers(this.#s.headers) : this.#o
          if (typeof e == "object" && e.headers) {
            i ??= new Headers()
            for (let [n, a] of new Headers(e.headers))
              n === "set-cookie" ? i.append(n, a) : i.set(n, a)
          }
          if (r) {
            if (!i) {
              let n = 0
              for (let a in r)
                if (++n > 1 || typeof r[a] != "string") {
                  i = new Headers()
                  break
                }
            }
            if (i)
              for (let n in r) {
                let a = r[n]
                if (typeof a == "string") i.set(n, a)
                else {
                  i.delete(n)
                  for (let o of a) i.append(n, o)
                }
              }
          }
          let s = typeof e == "number" ? e : (e?.status ?? this.#n)
          return or(t, { status: s, headers: i ?? r })
        }
        newResponse = (...t) => this.#a(...t)
        body = (t, e, r) => this.#a(t, e, r)
        text = (t, e, r) =>
          !this.#o && !this.#n && !e && !r && !this.finalized
            ? new Response(t)
            : this.#a(t, e, Js(uu, r))
        json = (t, e, r) =>
          this.#a(JSON.stringify(t), e, Js("application/json", r))
        html = (t, e, r) => {
          let i = (s) => this.#a(s, e, Js("text/html; charset=UTF-8", r))
          return typeof t == "object"
            ? Gs(t, Za.Stringify, !1, {}).then(i)
            : i(t)
        }
        redirect = (t, e) => {
          let r = String(t)
          return (
            this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r),
            this.newResponse(null, e ?? 302)
          )
        }
        notFound = () => ((this.#d ??= () => or()), this.#d(this))
      }))
  })
var Ro = N((fm, Io) => {
  "use strict"
  var dn = Object.defineProperty,
    mu = Object.getOwnPropertyDescriptor,
    yu = Object.getOwnPropertyNames,
    xu = Object.prototype.hasOwnProperty,
    wu = (t, e) => {
      for (var r in e) dn(t, r, { get: e[r], enumerable: !0 })
    },
    vu = (t, e, r, i) => {
      if ((e && typeof e == "object") || typeof e == "function")
        for (let s of yu(e))
          !xu.call(t, s) &&
            s !== r &&
            dn(t, s, {
              get: () => e[s],
              enumerable: !(i = mu(e, s)) || i.enumerable,
            })
      return t
    },
    _u = (t) => vu(dn({}, "__esModule", { value: !0 }), t),
    bo = {}
  wu(bo, {
    InvalidKeyError: () => Zr,
    InvalidStoreNameError: () => hr,
    MissingProjectIdError: () => ko,
    PagesBlobError: () => Le,
    PreconditionFailedError: () => an,
    QuotaExceededError: () => bu,
    RateLimitedError: () => ku,
    Store: () => So,
    getStore: () => Nu,
    listStores: () => Mu,
  })
  Io.exports = _u(bo)
  var Le = class extends Error {
      code
      constructor(t, e) {
        ;(super(`PagesBlob: ${e}`),
          (this.name = "PagesBlobError"),
          (this.code = t))
      }
    },
    Zr = class extends Le {
      constructor(t) {
        super("INVALID_KEY", t)
      }
    },
    hr = class extends Le {
      constructor(t) {
        super("INVALID_STORE_NAME", t)
      }
    },
    rn = class extends Le {
      constructor(t) {
        super(
          "MISSING_ENVIRONMENT",
          `Environment not configured for Pages Blob. Missing: ${t.join(", ")}. Supply these properties when creating a store, or ensure the function is running in a Pages environment.`,
        )
      }
    },
    bu = class extends Le {
      constructor() {
        super("QUOTA_EXCEEDED", "storage quota exceeded")
      }
    },
    ku = class extends Le {
      constructor() {
        super("RATE_LIMITED", "request rate limited, please retry later")
      }
    },
    ko = class extends Le {
      constructor() {
        super(
          "MISSING_PROJECT_ID",
          "projectId is required when using API token mode. Please supply { name, projectId, token } to getStore() / listStores().",
        )
      }
    },
    nt = class extends Le {
      constructor(t) {
        super("CREDENTIAL_ERROR", t)
      }
    },
    he = class extends Le {
      constructor(t, e) {
        super("COS_ERROR", `COS returned ${t}: ${e}`)
      }
    },
    an = class extends Le {
      constructor() {
        super(
          "PRECONDITION_FAILED",
          "conditional write failed (key already exists)",
        )
      }
    }
  function wt(t) {
    if (t === "") throw new Zr("Blob key must not be empty.")
    if (t.startsWith("/") || t.startsWith("%2F"))
      throw new Zr("Blob key must not start with forward slash (/).")
    if (new TextEncoder().encode(t).length > 600)
      throw new Zr(
        "Blob key must be a sequence of Unicode characters whose UTF-8 encoding is at most 600 bytes long.",
      )
  }
  function Su(t) {
    if (t === "") throw new hr("Store name must not be empty.")
    if (t.includes("/") || t.includes(":"))
      throw new hr(
        "Store name must not contain forward slashes (/) or colons (:).",
      )
    if (!/^[a-zA-Z0-9_-]+$/.test(t))
      throw new hr(
        "Store name must only contain letters, digits, underscores, and hyphens.",
      )
    if (new TextEncoder().encode(t).length > 64)
      throw new hr(
        "Store name must be a sequence of Unicode characters whose UTF-8 encoding is at most 64 bytes long.",
      )
  }
  var So = class {
      cosClient
      storeName
      defaultConsistency
      constructor(t, e, r = "eventual") {
        ;((this.cosClient = t),
          (this.storeName = e),
          (this.defaultConsistency = r))
      }
      resolveConsistency(t) {
        return t ?? this.defaultConsistency
      }
      async set(t, e, r) {
        wt(t)
        let i = await this.cosClient.putObject(this.storeName, t, e, {
          onlyIfNew: r?.onlyIfNew,
          cacheControl: r?.cacheControl,
        })
        if (r?.onlyIfNew && i.statusCode === 412) throw new an()
      }
      async setJSON(t, e, r) {
        wt(t)
        let i = JSON.stringify(e),
          s = await this.cosClient.putObject(this.storeName, t, i, {
            onlyIfNew: r?.onlyIfNew,
            contentType: "application/json",
            cacheControl: r?.cacheControl,
          })
        if (r?.onlyIfNew && s.statusCode === 412) throw new an()
      }
      async createUploadUrl(t, e) {
        wt(t)
        let { url: r, expiresAt: i } =
          await this.cosClient.createPresignedPutUrl(this.storeName, t, {
            expireSeconds: e?.expireSeconds,
            contentType: e?.contentType,
          })
        return { url: r, key: t, expiresAt: i }
      }
      async get(t, e) {
        wt(t)
        let r = this.resolveConsistency(e?.consistency),
          i = await this.cosClient.getObject(this.storeName, t, r)
        if (i === null) return null
        let { body: s } = i,
          n = e?.type ?? "text",
          a = new TextDecoder("utf-8")
        switch (n) {
          case "text":
            return a.decode(s)
          case "json":
            return JSON.parse(a.decode(s))
          case "arrayBuffer":
            return s.buffer.slice(s.byteOffset, s.byteOffset + s.byteLength)
          case "blob":
            return new Blob([s])
          case "stream":
            return new ReadableStream({
              start(o) {
                ;(o.enqueue(s), o.close())
              },
            })
          default:
            return a.decode(s)
        }
      }
      async getMetadata(t, e) {
        wt(t)
        let r = this.resolveConsistency(e?.consistency)
        return this.cosClient.headObject(this.storeName, t, r)
      }
      async getWithHeaders(t, e) {
        wt(t)
        let r = this.resolveConsistency(e?.consistency),
          i = await this.cosClient.getObject(this.storeName, t, r)
        return i
          ? {
              body: new TextDecoder("utf-8").decode(i.body),
              headers: i.headers || {},
            }
          : null
      }
      async delete(t) {
        ;(wt(t), await this.cosClient.deleteObject(this.storeName, t))
      }
      async list(t) {
        let e = t?.paginate !== !1,
          r = t?.limit,
          i = [],
          s = [],
          n = this.resolveConsistency(t?.consistency),
          a = t?.cursor || "",
          o = !0,
          c
        for (; o; ) {
          let d = r !== void 0 ? r - i.length : 1e3,
            l = Math.min(d, 1e3)
          if (l <= 0) break
          let u = await this.cosClient.listObjects(this.storeName, {
            prefix: t?.prefix,
            delimiter: t?.directories ? "/" : void 0,
            marker: a || void 0,
            maxKeys: l,
            consistency: n,
          })
          for (let p of u.contents) i.push({ key: p.key, etag: p.etag })
          ;(s.push(...u.commonPrefixes),
            r !== void 0 && i.length >= r
              ? ((i.length = r),
                (u.isTruncated || u.contents.length === l) &&
                  (c = u.nextMarker),
                (o = !1))
              : u.isTruncated
                ? !e && r === void 0
                  ? ((c = u.nextMarker), (o = !1))
                  : (a = u.nextMarker)
                : (o = !1))
        }
        return { blobs: i, directories: s, ...(c ? { cursor: c } : {}) }
      }
    },
    Pu = new TextEncoder()
  function on(t) {
    let e = Pu.encode(t),
      r = new ArrayBuffer(e.byteLength),
      i = new Uint8Array(r)
    return (i.set(e), i)
  }
  function Po(t) {
    let e = t instanceof Uint8Array ? t : new Uint8Array(t),
      r = ""
    for (let i = 0; i < e.length; i++) r += e[i].toString(16).padStart(2, "0")
    return r
  }
  async function ho(t, e) {
    let r = await crypto.subtle.importKey(
        "raw",
        on(t),
        { name: "HMAC", hash: "SHA-1" },
        !1,
        ["sign"],
      ),
      i = await crypto.subtle.sign("HMAC", r, on(e))
    return Po(i)
  }
  async function Au(t) {
    let e = await crypto.subtle.digest("SHA-1", on(t))
    return Po(e)
  }
  function Yr(t) {
    return encodeURIComponent(t).replace(
      /[!'()*]/g,
      (e) => "%" + e.charCodeAt(0).toString(16).toUpperCase(),
    )
  }
  function ei(t) {
    try {
      return decodeURIComponent(t)
    } catch {
      return t
    }
  }
  function Ao(t) {
    return t
      .split("/")
      .map((e) => ei(e))
      .join("/")
  }
  function Co(t) {
    return t
      .split("/")
      .map((e) => Yr(ei(e)))
      .join("/")
  }
  var Cu = new Set([
    "cache-control",
    "content-disposition",
    "content-encoding",
    "content-length",
    "content-md5",
    "content-type",
    "expect",
    "expires",
    "if-match",
    "if-modified-since",
    "if-none-match",
    "if-unmodified-since",
    "origin",
    "range",
    "transfer-encoding",
  ])
  function Eu(t) {
    return t === "host" || t === "x-cos-security-token"
      ? !1
      : !!(Cu.has(t) || t.startsWith("x-cos-"))
  }
  function go(t) {
    if (!t) return []
    let e = []
    for (let [r, i] of Object.entries(t))
      i != null && e.push([r.toLowerCase(), String(i)])
    return (e.sort(([r], [i]) => (r < i ? -1 : r > i ? 1 : 0)), e)
  }
  function mo(t) {
    return t.map(([e, r]) => `${Yr(e)}=${Yr(r)}`).join("&")
  }
  function yo(t) {
    return t.map(([e]) => Yr(e)).join(";")
  }
  async function Eo(t) {
    let e = t.method.toLowerCase(),
      r = t.pathname.startsWith("/") ? t.pathname : `/${t.pathname}`,
      i = Math.floor(Date.now() / 1e3),
      s = i + (t.expireSeconds ?? 3600),
      n = `${i};${s}`,
      a = go(t.headers).filter(([m]) => Eu(m)),
      o = yo(a),
      c = mo(a),
      d = go(t.query),
      l = yo(d),
      u = mo(d),
      p = `${e}
${r}
${u}
${c}
`,
      f = `sha1
${n}
${await Au(p)}
`,
      h = await ho(t.secretKey, n),
      y = await ho(h, f),
      x = [
        "q-sign-algorithm=sha1",
        `q-ak=${t.secretId}`,
        `q-sign-time=${n}`,
        `q-key-time=${n}`,
        `q-header-list=${o}`,
        `q-url-param-list=${l}`,
        `q-signature=${y}`,
      ].join("&"),
      g = {}
    for (let [m, w] of a) g[m] = w
    return { authorization: x, signedHeaders: g }
  }
  async function Du(t) {
    let e = new URL(t.domain),
      r = ei(t.key),
      i = `/${Ao(r)}`,
      s = `/${Co(r)}`
    e.pathname = s
    let { authorization: n } = await Eo({
      method: t.method,
      pathname: i,
      query: t.query,
      headers: t.headers,
      secretId: t.credential.secretId,
      secretKey: t.credential.secretKey,
      expireSeconds: t.expireSeconds,
    })
    if (t.query)
      for (let [a, o] of Object.entries(t.query))
        o != null && e.searchParams.set(a, String(o))
    for (let a of n.split("&")) {
      let o = a.indexOf("=")
      if (o === -1) continue
      let c = a.slice(0, o),
        d = a.slice(o + 1)
      e.searchParams.set(c, d)
    }
    return (
      t.credential.sessionToken &&
        e.searchParams.set("x-cos-security-token", t.credential.sessionToken),
      e.toString()
    )
  }
  async function dr(t) {
    let e = new URL(t.domain),
      r = t.key ? ei(t.key) : "",
      i = r ? `/${Ao(r)}` : "/",
      s = r ? `/${Co(r)}` : "/"
    if (((e.pathname = s), t.query))
      for (let [u, p] of Object.entries(t.query))
        p != null && e.searchParams.set(u, String(p))
    let { authorization: n } = await Eo({
        method: t.method,
        pathname: i,
        query: t.query,
        headers: t.headers,
        secretId: t.credential.secretId,
        secretKey: t.credential.secretKey,
      }),
      a = new Headers()
    if (t.headers)
      for (let [u, p] of Object.entries(t.headers))
        p != null && a.set(u, String(p))
    ;(a.set("Authorization", n),
      t.credential.sessionToken &&
        a.set("x-cos-security-token", t.credential.sessionToken))
    let o = e.toString(),
      c = {
        method: t.method,
        headers: a,
        body: t.body ?? void 0,
        signal: t.signal,
      },
      d = 2,
      l
    for (let u = 0; u <= d; u++)
      try {
        return await fetch(o, c)
      } catch (p) {
        if (((l = p), p instanceof DOMException && p.name === "AbortError"))
          throw p
        u < d && (await new Promise((f) => setTimeout(f, 1e3 * (u + 1))))
      }
    throw l
  }
  var Tu = "blob.edgeone.site",
    Fu = "blob-nocache.edgeone.site",
    Do = class Oe {
      credentialManager
      bucket = ""
      region = ""
      keyPrefix = ""
      cachedDomain = ""
      uncachedDomain = ""
      initialized = !1
      static buildErrorDetail(e, r, i, s, n) {
        let a = i ? `${r}/${i}` : r,
          o = n ? ` [request-id: ${n}]` : ""
        return `${e} ${a} - ${Iu(s)}${o}`
      }
      constructor(e) {
        this.credentialManager = e
      }
      computeSubdomain(e) {
        let r = []
        if (
          (e.appId && r.push(e.appId),
          e.zoneId && r.push(e.zoneId),
          e.projectId && r.push(e.projectId),
          r.length >= 2)
        )
          return r.join("-")
        if (e.resourcePrefix) {
          let i = e.resourcePrefix
            .replace(/\/?\*$/, "")
            .split("/")
            .filter(Boolean)
          if (i.length >= 2) return i.slice(0, Math.min(i.length, 3)).join("-")
        }
        return ""
      }
      async ensureInitialized() {
        if (this.initialized) return
        let e = await this.credentialManager.getCredential()
        !this.keyPrefix &&
          e.resourcePrefix &&
          (this.keyPrefix = e.resourcePrefix.replace(/\/?\*$/, ""))
        let r = e.edgeRegion === "CN",
          i = e.cosMainland,
          s = e.cosOverseas,
          n = r ? i || s : s || i
        !this.bucket &&
          n &&
          ((this.bucket = n.bucket), (this.region = n.region))
        let a = this.computeSubdomain(e)
        if (!a)
          throw new he(
            0,
            "unable to derive tenant subdomain from credential; missing appId/zoneId/projectId or resourcePrefix",
          )
        ;((this.cachedDomain = `https://${a}.${Tu}`),
          (this.uncachedDomain = `https://${a}.${Fu}`),
          (this.initialized = !0))
      }
      async resolveDomain(e) {
        return (
          await this.ensureInitialized(),
          e === "strong" ? this.uncachedDomain : this.cachedDomain
        )
      }
      async resolveCredential() {
        let e = await this.credentialManager.getCredential()
        return {
          secretId: e.tmpSecretId,
          secretKey: e.tmpSecretKey,
          sessionToken: e.sessionToken,
        }
      }
      buildCosKey(e, r) {
        return `${this.keyPrefix}/${e}/${r}`
      }
      async getDomains() {
        return (
          await this.ensureInitialized(),
          { cached: this.cachedDomain, uncached: this.uncachedDomain }
        )
      }
      async putObject(e, r, i, s) {
        let n = await this.resolveDomain("strong"),
          a = await this.resolveCredential(),
          o = this.buildCosKey(e, r),
          c =
            s?.cacheControl === null
              ? void 0
              : (s?.cacheControl ?? "max-age=0, stale-while-revalidate=60"),
          d = {}
        ;(s?.onlyIfNew && (d["If-None-Match"] = "*"),
          c && (d["Cache-Control"] = c),
          s?.contentType && (d["Content-Type"] = s.contentType))
        try {
          let l = await dr({
            domain: n,
            method: "PUT",
            key: o,
            headers: d,
            body: i,
            credential: a,
          })
          if (l.status === 412)
            return (
              await l.arrayBuffer().catch(() => {}),
              { etag: "", statusCode: 412 }
            )
          if (!l.ok) {
            let p = await lr(l)
            throw new he(
              l.status,
              Oe.buildErrorDetail(
                "PUT",
                n,
                o,
                p || `status ${l.status}`,
                ur(l),
              ),
            )
          }
          let u = l.headers.get("etag") || ""
          return (
            await l.arrayBuffer().catch(() => {}),
            { etag: u, statusCode: l.status }
          )
        } catch (l) {
          throw l instanceof he
            ? l
            : new he(0, Oe.buildErrorDetail("PUT", n, o, pr(l)))
        }
      }
      async createPresignedPutUrl(e, r, i) {
        let s = await this.resolveDomain("strong"),
          n = await this.resolveCredential(),
          a = this.buildCosKey(e, r),
          o = {}
        i?.contentType && (o["Content-Type"] = i.contentType)
        let c = i?.expireSeconds ?? 3600,
          d = await Du({
            domain: s,
            method: "PUT",
            key: a,
            headers: o,
            credential: n,
            expireSeconds: c,
          }),
          l = Math.floor(Date.now() / 1e3) + c
        return { url: d, expiresAt: l }
      }
      async getObject(e, r, i) {
        let s = await this.resolveDomain(i),
          n = await this.resolveCredential(),
          a = this.buildCosKey(e, r)
        try {
          let o = await dr({ domain: s, method: "GET", key: a, credential: n })
          if (o.status === 404)
            return (await o.arrayBuffer().catch(() => {}), null)
          if (!o.ok) {
            let l = await lr(o)
            throw new he(
              o.status,
              Oe.buildErrorDetail(
                "GET",
                s,
                a,
                l || `status ${o.status}`,
                ur(o),
              ),
            )
          }
          let c = new Uint8Array(await o.arrayBuffer()),
            d = xo(o.headers)
          return { body: c, contentType: d["content-type"], headers: d }
        } catch (o) {
          throw o instanceof he
            ? o
            : new he(0, Oe.buildErrorDetail("GET", s, a, pr(o)))
        }
      }
      async headObject(e, r, i) {
        let s = await this.resolveDomain(i),
          n = await this.resolveCredential(),
          a = this.buildCosKey(e, r)
        try {
          let o = await dr({ domain: s, method: "HEAD", key: a, credential: n })
          if (o.status === 404) return null
          if (!o.ok) {
            let d = await lr(o)
            throw new he(
              o.status,
              Oe.buildErrorDetail(
                "HEAD",
                s,
                a,
                d || `status ${o.status}`,
                ur(o),
              ),
            )
          }
          let c = xo(o.headers)
          return {
            cacheControl: c["cache-control"],
            contentType: c["content-type"],
            etag: c.etag,
            headers: c,
          }
        } catch (o) {
          throw o instanceof he
            ? o
            : new he(0, Oe.buildErrorDetail("HEAD", s, a, pr(o)))
        }
      }
      async deleteObject(e, r) {
        let i = await this.resolveDomain("strong"),
          s = await this.resolveCredential(),
          n = this.buildCosKey(e, r)
        try {
          let a = await dr({
            domain: i,
            method: "DELETE",
            key: n,
            credential: s,
          })
          if (a.status === 204 || a.status === 404 || a.ok) {
            await a.arrayBuffer().catch(() => {})
            return
          }
          let o = await lr(a)
          throw new he(
            a.status,
            Oe.buildErrorDetail(
              "DELETE",
              i,
              n,
              o || `status ${a.status}`,
              ur(a),
            ),
          )
        } catch (a) {
          throw a instanceof he
            ? a
            : new he(0, Oe.buildErrorDetail("DELETE", i, n, pr(a)))
        }
      }
      async listObjects(e, r) {
        await this.ensureInitialized()
        let i = `${this.keyPrefix}/${e}/`,
          s = r?.prefix ? i + r.prefix : i,
          n = await this.getBucketRaw({
            prefix: s,
            delimiter: r?.delimiter,
            marker: r?.marker,
            maxKeys: r?.maxKeys,
            consistency: r?.consistency,
          }),
          a = n.contents
            .map((c) => {
              let d = c.key,
                l = d.startsWith(i) ? d.slice(i.length) : d
              return l ? { key: l, etag: c.etag } : null
            })
            .filter((c) => c !== null),
          o = n.commonPrefixes
            .map((c) => (c.startsWith(i) ? c.slice(i.length) : c))
            .filter((c) => !!c)
        return {
          contents: a,
          commonPrefixes: o,
          isTruncated: n.isTruncated,
          nextMarker: n.nextMarker,
        }
      }
      async listStores(e) {
        let r = [],
          i = "",
          s = !0
        for (; s; ) {
          await this.ensureInitialized()
          let n = `${this.keyPrefix}/`,
            a = await this.getBucketRaw({
              prefix: n,
              delimiter: "/",
              maxKeys: 1e3,
              marker: i || void 0,
              consistency: e,
            })
          for (let o of a.commonPrefixes) {
            let c = o.startsWith(n) ? o.slice(n.length, -1) : o.slice(0, -1)
            c && r.push(c)
          }
          if (((s = a.isTruncated), (i = a.nextMarker), !s || !i)) break
        }
        return r
      }
      async getBucketRaw(e) {
        let r = await this.resolveDomain(e.consistency),
          i = await this.resolveCredential(),
          s = { prefix: e.prefix }
        ;(e.delimiter && (s.delimiter = e.delimiter),
          e.marker && (s.marker = e.marker),
          e.maxKeys && (s["max-keys"] = e.maxKeys))
        try {
          let n = await dr({
            domain: r,
            method: "GET",
            query: s,
            credential: i,
          })
          if (!n.ok) {
            let o = await lr(n)
            throw new he(
              n.status,
              Oe.buildErrorDetail(
                "LIST",
                r,
                e.prefix,
                o || `status ${n.status}`,
                ur(n),
              ),
            )
          }
          let a = await n.text()
          return Ru(a)
        } catch (n) {
          throw n instanceof he
            ? n
            : new he(0, Oe.buildErrorDetail("LIST", r, e.prefix, pr(n)))
        }
      }
    }
  function Iu(t) {
    return t
      .replace(
        /[a-zA-Z0-9\-]+\.cos\.[a-zA-Z0-9\-.]+\.myqcloud\.com/gi,
        "[cos-origin]",
      )
      .replace(
        /[a-zA-Z0-9\-]+\.cos\.[a-zA-Z0-9\-.]+\.tencentcos\.cn/gi,
        "[cos-origin]",
      )
  }
  async function lr(t) {
    try {
      return await t.text()
    } catch {
      return ""
    }
  }
  function ur(t) {
    return (
      t.headers.get("x-cos-request-id") ||
      t.headers.get("x-eo-log-id") ||
      void 0
    )
  }
  function pr(t) {
    let e = t,
      r = e.message || String(t),
      i = e.cause
    if (i) {
      let s = i.message || i.code || ""
      return s ? `${r} (${s})` : r
    }
    return r
  }
  function xo(t) {
    let e = {}
    return (
      t.forEach((r, i) => {
        e[i.toLowerCase()] = r
      }),
      e
    )
  }
  function Ru(t) {
    let e = [],
      r = /<Contents>([\s\S]*?)<\/Contents>/g,
      i
    for (; (i = r.exec(t)) !== null; ) {
      let c = i[1],
        d = fr(c, "Key"),
        l = fr(c, "ETag")
      d !== null && e.push({ key: sn(d), etag: l || "" })
    }
    let s = [],
      n = /<CommonPrefixes>([\s\S]*?)<\/CommonPrefixes>/g
    for (; (i = n.exec(t)) !== null; ) {
      let c = i[1],
        d = fr(c, "Prefix")
      d !== null && s.push(sn(d))
    }
    let a = fr(t, "IsTruncated") === "true",
      o = fr(t, "NextMarker") || ""
    return { contents: e, commonPrefixes: s, isTruncated: a, nextMarker: sn(o) }
  }
  function fr(t, e) {
    let r = new RegExp(`<${e}>([\\s\\S]*?)<\\/${e}>`).exec(t)
    return r ? r[1] : null
  }
  function sn(t) {
    return t
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, "&")
  }
  var Bu = "X-RateLimit-Reset"
  async function cn(t, e, r = 2) {
    e.signal?.throwIfAborted?.()
    try {
      let i = await fetch(t, e)
      if (r > 0 && (i.status === 429 || i.status >= 500)) {
        let s = wo(i.headers.get(Bu))
        return (await vo(s, e.signal), cn(t, e, r - 1))
      }
      return i
    } catch (i) {
      if (r === 0 || (i instanceof DOMException && i.name === "AbortError"))
        throw i
      let s = wo()
      return (await vo(s, e.signal), cn(t, e, r - 1))
    }
  }
  function wo(t) {
    return t ? Math.max(Number(t) * 1e3 - Date.now(), 500) : 1500
  }
  function vo(t, e) {
    return new Promise((r, i) => {
      if (e?.aborted) return i(e.reason)
      let s = setTimeout(() => {
          ;(e?.removeEventListener("abort", n), r())
        }, t),
        n = () => {
          ;(clearTimeout(s), i(e.reason))
        }
      e?.addEventListener("abort", n, { once: !0 })
    })
  }
  var Uu = "prod"
  function $u() {
    let t = typeof process < "u" ? process.env.PAGES_BLOB_STS_ENV : void 0
    return t === "test" || t === "prod" ? t : Uu
  }
  var Ou = 300,
    qu = "https://blob-sts.edgeone.site/",
    To = class {
      authToken
      projectId
      cached = null
      constructor(t, e) {
        ;((this.authToken = t), (this.projectId = e))
      }
      async getCredential() {
        if (this.cached && !this.isExpired(this.cached)) return this.cached
        let t = await this.fetchCredential()
        return ((this.cached = t), t)
      }
      clearCache() {
        this.cached = null
      }
      isExpired(t) {
        let e = Math.floor(Date.now() / 1e3)
        return t.expiredTime - e < Ou
      }
      async fetchCredential() {
        for (let t = 1; t <= 3; t++) {
          let e = new AbortController(),
            r = setTimeout(() => e.abort(), 1e4),
            i
          try {
            i = await cn(qu, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.authToken}`,
                "X-Env": $u(),
              },
              body: JSON.stringify(
                this.projectId ? { ProjectId: this.projectId } : {},
              ),
              signal: e.signal,
            })
          } catch (a) {
            if (t < 3) {
              await nn(500 * t)
              continue
            }
            throw new nt(
              `failed to obtain STS credential: ${a.message || "timeout"}`,
            )
          } finally {
            clearTimeout(r)
          }
          if (i.status === 413) throw new nt("storage quota exceeded")
          if (i.status === 429) throw new nt("rate limited, please retry later")
          if (!i.ok) {
            if (i.status >= 500 && t < 3) {
              await nn(500 * t)
              continue
            }
            let a = await i.text().catch(() => "unknown error")
            throw new nt(`failed to obtain STS credential: ${i.status} ${a}`)
          }
          let s = await i.json(),
            n = s.data && typeof s.data == "object" ? s.data : s
          if (
            n.tmpSecretId &&
            n.tmpSecretKey &&
            n.sessionToken &&
            n.expiredTime
          ) {
            let a = n.cosMainland,
              o = n.cosOverseas,
              c = i.headers.get("X-Edge-Region") || void 0
            return {
              tmpSecretId: n.tmpSecretId,
              tmpSecretKey: n.tmpSecretKey,
              sessionToken: n.sessionToken,
              expiredTime: n.expiredTime,
              appId: n.appId || void 0,
              zoneId: n.zoneId || void 0,
              projectId: n.projectId || void 0,
              resourcePrefix: n.resourcePrefix || void 0,
              cosMainland: a || void 0,
              cosOverseas: o || void 0,
              edgeRegion: c,
            }
          }
          if (n.code !== void 0 && n.code !== 0) {
            let a = n.msg || n.message || "unknown error"
            throw new nt(`credential exchange failed (code=${n.code}): ${a}`)
          }
          if (s.code !== void 0 && s.code !== 0) {
            let a = s.msg || s.message || "unknown error"
            throw new nt(`credential exchange failed (code=${s.code}): ${a}`)
          }
          if (t < 3) {
            await nn(500 * t)
            continue
          }
          throw new nt("invalid STS credential response")
        }
        throw new nt("invalid STS credential response")
      }
    }
  function nn(t) {
    return new Promise((e) => setTimeout(e, t))
  }
  var ju = "{{PAGES_BLOB_DEPLOY_CREDENTIAL}}"
  function zu() {
    let t = {},
      e = Lu()
    if (e) t.deployCredential = e
    else {
      let i = _o("PAGES_BLOB_DEPLOY_CREDENTIAL")
      i && (t.deployCredential = i)
    }
    let r = _o("PAGES_PROJECT_ID")
    return (r && (t.projectId = r), t)
  }
  function Lu() {
    let t = ju
    if (!(t.startsWith("{{") && t.endsWith("}}"))) return t || void 0
  }
  function _o(t) {
    if (typeof process < "u" && process.env) return process.env[t]
  }
  function Nu(t) {
    let e = typeof t == "string" ? t : t.name
    Su(e)
    let r = Fo(typeof t == "string" ? void 0 : t),
      i = new To(r.authToken, r.projectId),
      s = new Do(i)
    return new So(s, e, r.consistency ?? "eventual")
  }
  async function Mu(t) {
    let e = Fo(
        t
          ? {
              name: "__list__",
              projectId: t.projectId,
              token: t.token,
              consistency: t.consistency,
            }
          : void 0,
      ),
      r = new To(e.authToken, e.projectId)
    return {
      stores: (await new Do(r).listStores(e.consistency)).map((i) => ({
        name: i,
      })),
    }
  }
  function Fo(t) {
    let e = zu(),
      r = t?.token || e.deployCredential,
      i = t?.projectId || e.projectId
    if (t?.token || e.projectId) {
      if (!i) throw new ko()
      if (!r) throw new rn(["token"])
      return { authToken: r, projectId: i, consistency: t?.consistency }
    }
    if (t?.projectId && !r) throw new rn(["token"])
    if (!e.deployCredential) throw new rn(["deployCredential"])
    return { authToken: e.deployCredential, consistency: t?.consistency }
  }
})
var hn = {}
Lr(hn, {
  defaultDb: () => mr,
  getDb: () => U,
  getKvBinding: () => ni,
  getKvStatus: () => pn,
  getMetas: () => Ju,
  getPlugins: () => Qu,
  getSettings: () => fn,
  getStorages: () => Gu,
  getUsers: () => Vu,
  resolvePath: () => te,
  saveDb: () => q,
  setEnvCtx: () => un,
})
async function Hu() {
  if (Bo) return ti
  Bo = !0
  try {
    let { getStore: t } = await Promise.resolve().then(() => mt(Ro(), 1))
    ti = t({ name: "openlistnext_db", consistency: "strong" })
  } catch {
    ti = null
  }
  return ti
}
function $o() {
  Uo ||
    ((Uo = !0),
    !(typeof process > "u" || typeof process.on != "function") &&
      process.on("uncaughtException", (t) => {
        ;(t?.message?.includes("RESP") ||
          t?.message?.includes("Unknown type") ||
          t?.stack?.includes("processResponses")) &&
          console.error(
            "[KV/RESP] Caught uncaught exception from storage binding, continuing:",
            t.message,
          )
      }))
}
function un(t) {
  t && (gr = t)
}
async function ni(t) {
  t && (gr = t)
  let e = t || gr || (typeof process < "u" ? process.env : {}),
    r = typeof globalThis < "u" ? globalThis : {}
  try {
    let c = await Hu()
    if (c)
      return (
        $o(),
        {
          binding: c,
          platform: "EdgeOne Blob (@edgeone/pages-blob, strong consistency)",
          mode: "blob",
        }
      )
  } catch {}
  let i =
      (e && (e.EDGEONE_KV_NAME || e.KV_NAMESPACE || e.KV_NAME)) ||
      r.EDGEONE_KV_NAME ||
      r.KV_NAMESPACE,
    s = [
      ...(i ? [{ key: i, name: i }] : []),
      { key: "EDGEONE_KV", name: "EDGEONE_KV" },
      { key: "EO_KV", name: "EO_KV" },
      { key: "OPENLISTNEXT_KV", name: "OPENLISTNEXT_KV" },
      { key: "OPENLISTNEXT_KV_ID", name: "OPENLISTNEXT_KV_ID" },
      { key: "KV", name: "KV" },
      { key: "CF_KV", name: "CF_KV" },
      { key: "DATABASE_KV", name: "DATABASE_KV" },
    ]
  for (let c of s) {
    let d = (e && e[c.key]) || r[c.key]
    if (
      d &&
      typeof d.get == "function" &&
      (typeof d.put == "function" || typeof d.set == "function")
    ) {
      let l =
        c.key.startsWith("EDGEONE") ||
        c.key.startsWith("EO") ||
        !!(e && (e.EDGEONE || e.EO_REGION || e.EDGEONE_KV_NAME)) ||
        !!(r.EDGEONE_KV || r.EO_KV)
      l && $o()
      let u = l
        ? `EdgeOne KV (${c.name})`
        : `Cloudflare / EdgeOne KV (${c.name})`
      return { binding: d, platform: u, mode: "binding" }
    }
  }
  let n =
      e.CF_ACCOUNT_ID ||
      (typeof process < "u" ? process.env.CF_ACCOUNT_ID : ""),
    a =
      e.CF_KV_NAMESPACE_ID ||
      (typeof process < "u" ? process.env.CF_KV_NAMESPACE_ID : ""),
    o = e.CF_API_TOKEN || (typeof process < "u" ? process.env.CF_API_TOKEN : "")
  return n && a && o
    ? {
        binding: { type: "cf_rest", accountId: n, namespaceId: a, token: o },
        platform: "Cloudflare KV (REST API)",
        mode: "api",
      }
    : { binding: null, platform: "Memory", mode: "none" }
}
async function Oo(t, e = "openlistnext_config") {
  let { binding: r, mode: i } = t
  if (i === "none" || !r) return null
  try {
    if (i === "blob") {
      let s = await r.get(e, { type: "json" })
      if (s) return s
      let n = await r.get(e)
      if (n) return typeof n == "string" ? JSON.parse(n) : n
    } else if (i === "binding") {
      let s = null
      try {
        s = await r.get(e, "text")
      } catch {
        s = await r.get(e)
      }
      if ((s == null && (s = await r.get(e)), s))
        return typeof s == "string" ? JSON.parse(s) : s
    } else if (r.type === "cf_rest") {
      let s = `https://api.cloudflare.com/client/v4/accounts/${r.accountId}/storage/kv/namespaces/${r.namespaceId}/values/${e}`,
        n = await fetch(s, { headers: { Authorization: `Bearer ${r.token}` } })
      if (n.ok) {
        let a = await n.text()
        return JSON.parse(a)
      }
    }
  } catch (s) {
    console.error("[KV/Blob Store] Error reading key:", e, s)
  }
  return null
}
async function Ku(t, e, r) {
  let { binding: i, mode: s } = t
  if (s === "none" || !i) return !1
  let n = JSON.stringify(r)
  try {
    if (s === "blob") {
      if (typeof i.setJSON == "function") return (await i.setJSON(e, r), !0)
      if (typeof i.set == "function") return (await i.set(e, n), !0)
    } else if (s === "binding") {
      if (typeof i.put == "function") return (await i.put(e, n), !0)
      if (typeof i.set == "function") return (await i.set(e, n), !0)
    } else if (i.type === "cf_rest") {
      let a = `https://api.cloudflare.com/client/v4/accounts/${i.accountId}/storage/kv/namespaces/${i.namespaceId}/values/${e}`
      return (
        await fetch(a, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${i.token}`,
            "Content-Type": "text/plain",
          },
          body: n,
        })
      ).ok
    }
  } catch (a) {
    console.error("[KV/Blob Store] Error writing key:", e, a)
  }
  return !1
}
async function pn(t) {
  let e = await ni(t),
    r = e.mode !== "none",
    i = !1,
    s = null
  if (r)
    try {
      let n = await Oo(e, "openlistnext_config")
      return (
        (i = !0),
        {
          configured: !0,
          connected: !0,
          platform: e.platform,
          mode: e.mode,
          hasData: !!n,
          error: null,
        }
      )
    } catch (n) {
      s = n.message || String(n)
    }
  return {
    configured: r,
    connected: i,
    platform: e.platform,
    mode: e.mode,
    hasData: !1,
    error: s,
  }
}
async function te(t) {
  let e = await U(),
    r = []
  for (let o of String(t || "").split("/"))
    if (!(o === "" || o === ".")) {
      if (o === "..") {
        r.pop()
        continue
      }
      r.push(o)
    }
  let i = "/" + r.join("/")
  i === "" && (i = "/")
  let s = (e.storages || []).filter((o) => !o.disabled)
  if (s.length === 0)
    throw new Error(
      "failed get storage: storage not found; please add a storage first",
    )
  let n = [...s].sort((o, c) => {
    let d = "/" + (o.mount_path || "").split("/").filter(Boolean).join("/")
    return (
      ("/" + (c.mount_path || "").split("/").filter(Boolean).join("/")).length -
      d.length
    )
  })
  for (let o of n) {
    let c = "/" + (o.mount_path || "").split("/").filter(Boolean).join("/"),
      d = c === "/"
    if (d || i === c || i.startsWith(c + "/")) {
      let u = i
      ;(d || (u = i.slice(c.length)), u.startsWith("/") || (u = "/" + u))
      let p = JSON.parse(o.addition || "{}"),
        h = p.root_folder_path !== void 0 ? p.root_folder_path : "/",
        x = (
          [h, u]
            .map((g) => g.replace(/\\/g, "/"))
            .filter((g) => !!g && g !== "/")
            .join("/") || "/"
        ).replace(/\/{2,}/g, "/")
      return {
        storage: o,
        relative: u,
        physical: x,
        rootFolder: h,
        cleanPath: i,
        isVirtual: !1,
      }
    }
  }
  let a = !1
  for (let o of s) {
    let c = "/" + (o.mount_path || "").split("/").filter(Boolean).join("/")
    if (c !== "/" && c.startsWith(i === "/" ? "/" : i + "/")) {
      a = !0
      break
    }
  }
  if (a)
    return {
      storage: null,
      relative: i,
      physical: null,
      rootFolder: null,
      cleanPath: i,
      isVirtual: !0,
    }
  throw new Error("failed get storage: storage not found")
}
async function fn() {
  let t = await U(),
    e = {}
  return (
    t.settings &&
      t.settings.forEach((r) => {
        e[r.key] = r.value
      }),
    e
  )
}
async function Vu() {
  return (await U()).users || []
}
async function Gu() {
  return (await U()).storages || []
}
async function Ju() {
  return (await U()).metas || []
}
async function Qu() {
  return (await U()).plugins || []
}
var mr,
  Z,
  gr,
  ti,
  Bo,
  Uo,
  Wu,
  ln,
  ri,
  ii,
  si,
  U,
  q,
  ie = K(() => {
    "use strict"
    ;((mr = {
      settings: [
        {
          key: "version",
          value: "v4.2.3",
          type: "string",
          help: "Application Version",
          group: 1,
          flag: 1,
        },
        {
          key: "site_title",
          value: "OpenListNext",
          type: "string",
          help: "Site Title",
          group: 1,
          flag: 0,
        },
        {
          key: "announcement",
          value: "",
          type: "text",
          help: "Site Announcement",
          group: 1,
          flag: 0,
        },
        {
          key: "pagination_type",
          value: "pagination",
          type: "select",
          options: "all,pagination,load_more,auto_load_more",
          help: "Pagination Type",
          group: 1,
          flag: 0,
        },
        {
          key: "default_page_size",
          value: "20",
          type: "number",
          help: "Default Page Size",
          group: 1,
          flag: 0,
        },
        {
          key: "allow_indexed",
          value: "false",
          type: "bool",
          help: "Allow Search Engine Indexing",
          group: 1,
          flag: 0,
        },
        {
          key: "allow_mounted",
          value: "true",
          type: "bool",
          help: "Allow Mounted Storages",
          group: 1,
          flag: 0,
        },
        {
          key: "relay_storage",
          value: "",
          type: "string",
          help: "Relay Storage Mount Path For Cross-storage Copy/move (e.g. /r2, empty=disabled)",
          group: 1,
          flag: 0,
        },
        {
          key: "robots_txt",
          value: `User-agent: *
Disallow: /`,
          type: "text",
          help: "Robots Txt Content",
          group: 1,
          flag: 0,
        },
        {
          key: "logo",
          value: "/logo.png",
          type: "string",
          help: "Site Logo URL",
          group: 2,
          flag: 0,
        },
        {
          key: "favicon",
          value: "/favicon.png",
          type: "string",
          help: "Favicon URL",
          group: 2,
          flag: 0,
        },
        {
          key: "main_color",
          value: "#1890ff",
          type: "string",
          help: "Main Theme Color",
          group: 2,
          flag: 0,
        },
        {
          key: "home_icon",
          value: "openlistnext",
          type: "string",
          help: "Home Icon Name",
          group: 2,
          flag: 0,
        },
        {
          key: "home_container",
          value: "max_980px",
          type: "select",
          options: "max_980px,hope_container",
          help: "Home Container Width",
          group: 2,
          flag: 0,
        },
        {
          key: "settings_layout",
          value: "responsive",
          type: "select",
          options: "list,responsive",
          help: "Settings Layout Mode",
          group: 2,
          flag: 0,
        },
        {
          key: "text_types",
          value:
            "txt,htm,html,xml,java,properties,sql,js,json,c,cpp,python,py,php,go,rst,css,typescript,ts,log,conf,yaml,yml,cmd,bash,sh,vue,ini",
          type: "text",
          help: "Text File Extensions",
          group: 3,
          flag: 0,
        },
        {
          key: "audio_types",
          value: "mp3,ogg,aac,wav,wma,flac,m4a,opus",
          type: "text",
          help: "Audio File Extensions",
          group: 3,
          flag: 0,
        },
        {
          key: "video_types",
          value: "mp4,mkv,webm,avi,mov,flv,m3u8,ts",
          type: "text",
          help: "Video File Extensions",
          group: 3,
          flag: 0,
        },
        {
          key: "image_types",
          value: "jpg,png,jpeg,gif,bmp,svg,ico,webp,avif,tiff",
          type: "text",
          help: "Image File Extensions",
          group: 3,
          flag: 0,
        },
        {
          key: "proxy_types",
          value: "",
          type: "text",
          help: "Proxy File Extensions",
          group: 3,
          flag: 0,
        },
        {
          key: "proxy_ignore_headers",
          value: "",
          type: "text",
          help: "Proxy Ignore Headers",
          group: 3,
          flag: 0,
        },
        {
          key: "external_previews",
          value: "{}",
          type: "text",
          help: "External Previews JSON Config",
          group: 3,
          flag: 0,
        },
        {
          key: "iframe_previews",
          value: "{}",
          type: "text",
          help: "Iframe Previews JSON Config",
          group: 3,
          flag: 0,
        },
        {
          key: "audio_cover",
          value: "https://file.nn.ci/alist/cover.png",
          type: "string",
          help: "Audio Default Cover Image URL",
          group: 3,
          flag: 0,
        },
        {
          key: "audio_autoplay",
          value: "false",
          type: "bool",
          help: "Autoplay Audio",
          group: 3,
          flag: 0,
        },
        {
          key: "video_autoplay",
          value: "false",
          type: "bool",
          help: "Autoplay Video",
          group: 3,
          flag: 0,
        },
        {
          key: "preview_archives_by_default",
          value: "false",
          type: "bool",
          help: "Preview Archives By Default",
          group: 3,
          flag: 0,
        },
        {
          key: "readme_autorender",
          value: "true",
          type: "bool",
          help: "Readme Autorender",
          group: 3,
          flag: 0,
        },
        {
          key: "filter_readme_scripts",
          value: "true",
          type: "bool",
          help: "Filter Readme Scripts",
          group: 3,
          flag: 0,
        },
        {
          key: "force_preview",
          value: "",
          type: "text",
          help: "Force Preview Config",
          group: 3,
          flag: 0,
        },
        {
          key: "specify_preview",
          value: "",
          type: "text",
          help: "Specify Preview Layout Config",
          group: 3,
          flag: 0,
        },
        {
          key: "markdown_autorender",
          value: "true",
          type: "bool",
          help: "Autorender Markdown",
          group: 3,
          flag: 0,
        },
        {
          key: "code_editor_theme",
          value: "vs-dark",
          type: "select",
          options: "vs,vs-dark,hc-black",
          help: "Monaco Theme",
          group: 3,
          flag: 0,
        },
        {
          key: "office_preview",
          value: "true",
          type: "bool",
          help: "Enable Office Document Preview",
          group: 3,
          flag: 0,
        },
        {
          key: "pdf_preview",
          value: "true",
          type: "bool",
          help: "Enable PDF Preview",
          group: 3,
          flag: 0,
        },
        {
          key: "hide_files",
          value: "",
          type: "text",
          help: "Files Regex to Hide",
          group: 4,
          flag: 0,
        },
        {
          key: "package_download",
          value: "true",
          type: "bool",
          help: "Package Download Enabled",
          group: 4,
          flag: 0,
        },
        {
          key: "customize_head",
          value: "",
          type: "text",
          help: "Custom Head HTML/CSS",
          group: 4,
          flag: 0,
        },
        {
          key: "customize_body",
          value: "",
          type: "text",
          help: "Custom Body Script",
          group: 4,
          flag: 0,
        },
        {
          key: "link_expiration",
          value: "0",
          type: "number",
          help: "Link Expiration in Seconds",
          group: 4,
          flag: 0,
        },
        {
          key: "sign_all",
          value: "false",
          type: "bool",
          help: "Sign All Download Links",
          group: 4,
          flag: 0,
        },
        {
          key: "privacy_regs",
          value: "",
          type: "text",
          help: "Privacy Regex Rules",
          group: 4,
          flag: 0,
        },
        {
          key: "ocr_api",
          value: "",
          type: "string",
          help: "OCR API Endpoint",
          group: 4,
          flag: 0,
        },
        {
          key: "filename_char_mapping",
          value: "{}",
          type: "text",
          help: "Filename Char Mapping JSON",
          group: 4,
          flag: 0,
        },
        {
          key: "forward_direct_link_params",
          value: "",
          type: "string",
          help: "Forward Direct Link Params",
          group: 4,
          flag: 0,
        },
        {
          key: "ignore_direct_link_params",
          value: "",
          type: "string",
          help: "Ignore Direct Link Params",
          group: 4,
          flag: 0,
        },
        {
          key: "webauthn_login_enabled",
          value: "false",
          type: "bool",
          help: "Webauthn Login Enabled",
          group: 4,
          flag: 0,
        },
        {
          key: "allow_previewing_sharing_files",
          value: "true",
          type: "bool",
          help: "Allow Previewing Sharing Files",
          group: 4,
          flag: 0,
        },
        {
          key: "allow_previewing_sharing_archives",
          value: "true",
          type: "bool",
          help: "Allow Previewing Sharing Archives",
          group: 4,
          flag: 0,
        },
        {
          key: "force_proxy_sharing_files",
          value: "false",
          type: "bool",
          help: "Force Proxy Sharing Files",
          group: 4,
          flag: 0,
        },
        {
          key: "share_summary_content",
          value: "",
          type: "text",
          help: "Share Summary Content",
          group: 4,
          flag: 0,
        },
        {
          key: "handle_hook_after_writing",
          value: "",
          type: "string",
          help: "Handle Hook After Writing",
          group: 4,
          flag: 0,
        },
        {
          key: "handle_hook_rate_limit",
          value: "0",
          type: "number",
          help: "Handle Hook Rate Limit",
          group: 4,
          flag: 0,
        },
        {
          key: "ignore_system_files",
          value: "true",
          type: "bool",
          help: "Ignore System Files (.DS_Store, desktop.ini, etc.)",
          group: 4,
          flag: 0,
        },
        {
          key: "auto_update_index",
          value: "false",
          type: "bool",
          help: "Auto Update Search Index",
          group: 4,
          flag: 0,
        },
        {
          key: "sso_client_id",
          value: "",
          type: "string",
          help: "SSO Client ID",
          group: 7,
          flag: 0,
        },
        {
          key: "sso_client_secret",
          value: "",
          type: "string",
          help: "SSO Client Secret",
          group: 7,
          flag: 0,
        },
        {
          key: "sso_login_url",
          value: "",
          type: "string",
          help: "SSO Authorization Endpoint",
          group: 7,
          flag: 0,
        },
        {
          key: "ldap_host",
          value: "",
          type: "string",
          help: "LDAP Server Host",
          group: 8,
          flag: 0,
        },
        {
          key: "ldap_port",
          value: "389",
          type: "number",
          help: "LDAP Server Port",
          group: 8,
          flag: 0,
        },
        {
          key: "traffic_limit",
          value: "0",
          type: "number",
          help: "Traffic Limit in MB",
          group: 10,
          flag: 0,
        },
        {
          key: "ip_limit",
          value: "0",
          type: "number",
          help: "IP Rate Limit Per Minute",
          group: 10,
          flag: 0,
        },
        {
          key: "115_temp_dir",
          value: "",
          type: "string",
          help: "115 Temp Directory",
          group: 14,
          flag: 0,
        },
        {
          key: "115_open_temp_dir",
          value: "",
          type: "string",
          help: "115 Open Temp Directory",
          group: 14,
          flag: 0,
        },
        {
          key: "123_temp_dir",
          value: "",
          type: "string",
          help: "123 Pan Temp Directory",
          group: 14,
          flag: 0,
        },
        {
          key: "123_open_temp_dir",
          value: "",
          type: "string",
          help: "123 Open Temp Directory",
          group: 14,
          flag: 0,
        },
        {
          key: "123_open_callback_url",
          value: "",
          type: "string",
          help: "123 Open Callback URL",
          group: 14,
          flag: 0,
        },
        {
          key: "pikpak_temp_dir",
          value: "",
          type: "string",
          help: "PikPak Temp Directory",
          group: 14,
          flag: 0,
        },
        {
          key: "thunder_temp_dir",
          value: "",
          type: "string",
          help: "Thunder Temp Directory",
          group: 14,
          flag: 0,
        },
        {
          key: "thunder_browser_temp_dir",
          value: "",
          type: "string",
          help: "Thunder Browser Temp Directory",
          group: 14,
          flag: 0,
        },
        {
          key: "thunderx_temp_dir",
          value: "",
          type: "string",
          help: "ThunderX Temp Directory",
          group: 14,
          flag: 0,
        },
        {
          key: "token",
          value: "",
          type: "string",
          help: "115 / PikPak / Thunder Token",
          group: 14,
          flag: 0,
        },
        {
          key: "package_download_disabled",
          value: "false",
          type: "bool",
          help: "Disable Package Download",
          group: 14,
          flag: 0,
        },
      ],
      storages: [],
      users: [
        {
          id: 1,
          username: "admin",
          password: "",
          role: 2,
          permission: 0,
          base_path: "/",
          disabled: !1,
          sso_id: "",
          allow_ldap: !1,
          pwd_update_at: new Date().toISOString(),
        },
        {
          id: 2,
          username: "guest",
          password: "",
          role: 1,
          permission: 0,
          base_path: "/",
          disabled: !1,
          sso_id: "",
          allow_ldap: !1,
          pwd_update_at: new Date().toISOString(),
        },
      ],
      metas: [],
      shares: [],
      plugins: [],
    }),
      (Z = null),
      (gr = null),
      (ti = null),
      (Bo = !1))
    Uo = !1
    ;((Wu = {
      logo: {
        from: ["", "https://res.oplist.org/logo/logo.png"],
        to: "/logo.png",
      },
      favicon: {
        from: ["", "https://res.oplist.org/logo/logo.svg"],
        to: "/favicon.png",
      },
      site_title: { from: ["OpenList"], to: "OpenListNext" },
      home_icon: { from: ["openlist", "oplist"], to: "openlistnext" },
      home_container: { from: ["hope_container"], to: "max_980px" },
    }),
      (ln = (t) => {
        if (!t) return
        t.settings || (t.settings = [])
        let e = !1,
          r = [],
          i = new Set()
        for (let s of mr.settings) {
          i.add(s.key)
          let n = t.settings.filter((a) => a.key === s.key)
          if (n.length === 0) (r.push(JSON.parse(JSON.stringify(s))), (e = !0))
          else {
            let a = n.find((c) => c.value && c.value.trim() !== "") || n[0]
            ;((a.group !== s.group ||
              a.help !== s.help ||
              a.type !== s.type ||
              a.options !== s.options ||
              a.flag !== s.flag) &&
              ((a.group = s.group),
              (a.help = s.help),
              (a.type = s.type),
              (a.options = s.options),
              (a.flag = s.flag),
              (e = !0)),
              n.length > 1 && (e = !0))
            let o = Wu[s.key]
            ;(o && o.from.includes(a.value) && ((a.value = o.to), (e = !0)),
              r.push(a))
          }
        }
        for (let s of t.settings)
          s.key && !i.has(s.key) && (i.add(s.key), r.push(s))
        ;(e || r.length !== t.settings.length) &&
          ((t.settings = r), q(t).catch(() => {}))
      }),
      (ri = (t) => {
        t && (t.storages || (t.storages = []))
      }),
      (ii = (t) => {
        t && (t.shares || (t.shares = []))
      }),
      (si = (t) => {
        t && (t.plugins || (t.plugins = []))
      }),
      (U = async (t) => {
        t && (gr = t)
        let e = await ni(t)
        if (e.mode !== "none")
          try {
            let r = await Oo(e, "openlistnext_config")
            if (r) return ((Z = r), ln(Z), ri(Z), ii(Z), si(Z), Z)
          } catch (r) {
            console.error("[DB] Error reading config from KV:", r)
          }
        if (Z) return (ln(Z), ri(Z), ii(Z), si(Z), Z)
        if (typeof process < "u" && process.env && process.env.DATABASE_JSON)
          try {
            return (
              (Z = JSON.parse(process.env.DATABASE_JSON)),
              ln(Z),
              ri(Z),
              ii(Z),
              si(Z),
              Z
            )
          } catch (r) {
            console.error("Failed to parse DATABASE_JSON env variable:", r)
          }
        return ((Z = JSON.parse(JSON.stringify(mr))), ri(Z), ii(Z), si(Z), Z)
      }),
      (q = async (t, e) => {
        ;(e && (gr = e), (Z = t))
        let r = await ni(e)
        r.mode !== "none"
          ? (await Ku(r, "openlistnext_config", t).catch(
              (s) => (console.error("[DB] Failed to save to KV:", s), !1),
            )) &&
            console.log(
              `[DB] Successfully persisted ${t.storages?.length || 0} storages to KV (${r.platform})`,
            )
          : console.warn(
              "[DB] WARNING: No KV binding found! Storage configuration changes will exist only in memory!",
            )
      }))
  })
function W(t, e) {
  if (e) return 1
  let r = (t.split(".").pop() || "").toLowerCase()
  return [
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
  ].includes(r)
    ? 2
    : [
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
        ].includes(r)
      ? 3
      : [
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
          ].includes(r)
        ? 4
        : [
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
            ].includes(r)
          ? 5
          : 0
}
var xe = K(() => {
  "use strict"
})
var M = N((pi, Qo) => {
  ;(function (t, e) {
    typeof pi == "object"
      ? (Qo.exports = pi = e())
      : typeof define == "function" && define.amd
        ? define([], e)
        : (t.CryptoJS = e())
  })(pi, function () {
    var t =
      t ||
      (function (e, r) {
        var i
        if (
          (typeof window < "u" && window.crypto && (i = window.crypto),
          typeof self < "u" && self.crypto && (i = self.crypto),
          typeof globalThis < "u" &&
            globalThis.crypto &&
            (i = globalThis.crypto),
          !i && typeof window < "u" && window.msCrypto && (i = window.msCrypto),
          !i && typeof global < "u" && global.crypto && (i = global.crypto),
          !i && typeof Ns == "function")
        )
          try {
            i = Ns("crypto")
          } catch {}
        var s = function () {
            if (i) {
              if (typeof i.getRandomValues == "function")
                try {
                  return i.getRandomValues(new Uint32Array(1))[0]
                } catch {}
              if (typeof i.randomBytes == "function")
                try {
                  return i.randomBytes(4).readInt32LE()
                } catch {}
            }
            throw new Error(
              "Native crypto module could not be used to get secure random number.",
            )
          },
          n =
            Object.create ||
            (function () {
              function g() {}
              return function (m) {
                var w
                return (
                  (g.prototype = m),
                  (w = new g()),
                  (g.prototype = null),
                  w
                )
              }
            })(),
          a = {},
          o = (a.lib = {}),
          c = (o.Base = (function () {
            return {
              extend: function (g) {
                var m = n(this)
                return (
                  g && m.mixIn(g),
                  (!m.hasOwnProperty("init") || this.init === m.init) &&
                    (m.init = function () {
                      m.$super.init.apply(this, arguments)
                    }),
                  (m.init.prototype = m),
                  (m.$super = this),
                  m
                )
              },
              create: function () {
                var g = this.extend()
                return (g.init.apply(g, arguments), g)
              },
              init: function () {},
              mixIn: function (g) {
                for (var m in g) g.hasOwnProperty(m) && (this[m] = g[m])
                g.hasOwnProperty("toString") && (this.toString = g.toString)
              },
              clone: function () {
                return this.init.prototype.extend(this)
              },
            }
          })()),
          d = (o.WordArray = c.extend({
            init: function (g, m) {
              ;((g = this.words = g || []),
                m != r ? (this.sigBytes = m) : (this.sigBytes = g.length * 4))
            },
            toString: function (g) {
              return (g || u).stringify(this)
            },
            concat: function (g) {
              var m = this.words,
                w = g.words,
                v = this.sigBytes,
                _ = g.sigBytes
              if ((this.clamp(), v % 4))
                for (var b = 0; b < _; b++) {
                  var P = (w[b >>> 2] >>> (24 - (b % 4) * 8)) & 255
                  m[(v + b) >>> 2] |= P << (24 - ((v + b) % 4) * 8)
                }
              else for (var E = 0; E < _; E += 4) m[(v + E) >>> 2] = w[E >>> 2]
              return ((this.sigBytes += _), this)
            },
            clamp: function () {
              var g = this.words,
                m = this.sigBytes
              ;((g[m >>> 2] &= 4294967295 << (32 - (m % 4) * 8)),
                (g.length = e.ceil(m / 4)))
            },
            clone: function () {
              var g = c.clone.call(this)
              return ((g.words = this.words.slice(0)), g)
            },
            random: function (g) {
              for (var m = [], w = 0; w < g; w += 4) m.push(s())
              return new d.init(m, g)
            },
          })),
          l = (a.enc = {}),
          u = (l.Hex = {
            stringify: function (g) {
              for (var m = g.words, w = g.sigBytes, v = [], _ = 0; _ < w; _++) {
                var b = (m[_ >>> 2] >>> (24 - (_ % 4) * 8)) & 255
                ;(v.push((b >>> 4).toString(16)), v.push((b & 15).toString(16)))
              }
              return v.join("")
            },
            parse: function (g) {
              for (var m = g.length, w = [], v = 0; v < m; v += 2)
                w[v >>> 3] |= parseInt(g.substr(v, 2), 16) << (24 - (v % 8) * 4)
              return new d.init(w, m / 2)
            },
          }),
          p = (l.Latin1 = {
            stringify: function (g) {
              for (var m = g.words, w = g.sigBytes, v = [], _ = 0; _ < w; _++) {
                var b = (m[_ >>> 2] >>> (24 - (_ % 4) * 8)) & 255
                v.push(String.fromCharCode(b))
              }
              return v.join("")
            },
            parse: function (g) {
              for (var m = g.length, w = [], v = 0; v < m; v++)
                w[v >>> 2] |= (g.charCodeAt(v) & 255) << (24 - (v % 4) * 8)
              return new d.init(w, m)
            },
          }),
          f = (l.Utf8 = {
            stringify: function (g) {
              try {
                return decodeURIComponent(escape(p.stringify(g)))
              } catch {
                throw new Error("Malformed UTF-8 data")
              }
            },
            parse: function (g) {
              return p.parse(unescape(encodeURIComponent(g)))
            },
          }),
          h = (o.BufferedBlockAlgorithm = c.extend({
            reset: function () {
              ;((this._data = new d.init()), (this._nDataBytes = 0))
            },
            _append: function (g) {
              ;(typeof g == "string" && (g = f.parse(g)),
                this._data.concat(g),
                (this._nDataBytes += g.sigBytes))
            },
            _process: function (g) {
              var m,
                w = this._data,
                v = w.words,
                _ = w.sigBytes,
                b = this.blockSize,
                P = b * 4,
                E = _ / P
              g
                ? (E = e.ceil(E))
                : (E = e.max((E | 0) - this._minBufferSize, 0))
              var S = E * b,
                D = e.min(S * 4, _)
              if (S) {
                for (var k = 0; k < S; k += b) this._doProcessBlock(v, k)
                ;((m = v.splice(0, S)), (w.sigBytes -= D))
              }
              return new d.init(m, D)
            },
            clone: function () {
              var g = c.clone.call(this)
              return ((g._data = this._data.clone()), g)
            },
            _minBufferSize: 0,
          })),
          y = (o.Hasher = h.extend({
            cfg: c.extend(),
            init: function (g) {
              ;((this.cfg = this.cfg.extend(g)), this.reset())
            },
            reset: function () {
              ;(h.reset.call(this), this._doReset())
            },
            update: function (g) {
              return (this._append(g), this._process(), this)
            },
            finalize: function (g) {
              g && this._append(g)
              var m = this._doFinalize()
              return m
            },
            blockSize: 512 / 32,
            _createHelper: function (g) {
              return function (m, w) {
                return new g.init(w).finalize(m)
              }
            },
            _createHmacHelper: function (g) {
              return function (m, w) {
                return new x.HMAC.init(g, w).finalize(m)
              }
            },
          })),
          x = (a.algo = {})
        return a
      })(Math)
    return t
  })
})
var xr = N((fi, Xo) => {
  ;(function (t, e) {
    typeof fi == "object"
      ? (Xo.exports = fi = e(M()))
      : typeof define == "function" && define.amd
        ? define(["./core"], e)
        : e(t.CryptoJS)
  })(fi, function (t) {
    return (
      (function (e) {
        var r = t,
          i = r.lib,
          s = i.Base,
          n = i.WordArray,
          a = (r.x64 = {}),
          o = (a.Word = s.extend({
            init: function (d, l) {
              ;((this.high = d), (this.low = l))
            },
          })),
          c = (a.WordArray = s.extend({
            init: function (d, l) {
              ;((d = this.words = d || []),
                l != e ? (this.sigBytes = l) : (this.sigBytes = d.length * 8))
            },
            toX32: function () {
              for (
                var d = this.words, l = d.length, u = [], p = 0;
                p < l;
                p++
              ) {
                var f = d[p]
                ;(u.push(f.high), u.push(f.low))
              }
              return n.create(u, this.sigBytes)
            },
            clone: function () {
              for (
                var d = s.clone.call(this),
                  l = (d.words = this.words.slice(0)),
                  u = l.length,
                  p = 0;
                p < u;
                p++
              )
                l[p] = l[p].clone()
              return d
            },
          }))
      })(),
      t
    )
  })
})
var Yo = N((hi, Zo) => {
  ;(function (t, e) {
    typeof hi == "object"
      ? (Zo.exports = hi = e(M()))
      : typeof define == "function" && define.amd
        ? define(["./core"], e)
        : e(t.CryptoJS)
  })(hi, function (t) {
    return (
      (function () {
        if (typeof ArrayBuffer == "function") {
          var e = t,
            r = e.lib,
            i = r.WordArray,
            s = i.init,
            n = (i.init = function (a) {
              if (
                (a instanceof ArrayBuffer && (a = new Uint8Array(a)),
                (a instanceof Int8Array ||
                  (typeof Uint8ClampedArray < "u" &&
                    a instanceof Uint8ClampedArray) ||
                  a instanceof Int16Array ||
                  a instanceof Uint16Array ||
                  a instanceof Int32Array ||
                  a instanceof Uint32Array ||
                  a instanceof Float32Array ||
                  a instanceof Float64Array) &&
                  (a = new Uint8Array(a.buffer, a.byteOffset, a.byteLength)),
                a instanceof Uint8Array)
              ) {
                for (var o = a.byteLength, c = [], d = 0; d < o; d++)
                  c[d >>> 2] |= a[d] << (24 - (d % 4) * 8)
                s.call(this, c, o)
              } else s.apply(this, arguments)
            })
          n.prototype = i
        }
      })(),
      t.lib.WordArray
    )
  })
})
var tc = N((gi, ec) => {
  ;(function (t, e) {
    typeof gi == "object"
      ? (ec.exports = gi = e(M()))
      : typeof define == "function" && define.amd
        ? define(["./core"], e)
        : e(t.CryptoJS)
  })(gi, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.WordArray,
          s = e.enc,
          n =
            (s.Utf16 =
            s.Utf16BE =
              {
                stringify: function (o) {
                  for (
                    var c = o.words, d = o.sigBytes, l = [], u = 0;
                    u < d;
                    u += 2
                  ) {
                    var p = (c[u >>> 2] >>> (16 - (u % 4) * 8)) & 65535
                    l.push(String.fromCharCode(p))
                  }
                  return l.join("")
                },
                parse: function (o) {
                  for (var c = o.length, d = [], l = 0; l < c; l++)
                    d[l >>> 1] |= o.charCodeAt(l) << (16 - (l % 2) * 16)
                  return i.create(d, c * 2)
                },
              })
        s.Utf16LE = {
          stringify: function (o) {
            for (
              var c = o.words, d = o.sigBytes, l = [], u = 0;
              u < d;
              u += 2
            ) {
              var p = a((c[u >>> 2] >>> (16 - (u % 4) * 8)) & 65535)
              l.push(String.fromCharCode(p))
            }
            return l.join("")
          },
          parse: function (o) {
            for (var c = o.length, d = [], l = 0; l < c; l++)
              d[l >>> 1] |= a(o.charCodeAt(l) << (16 - (l % 2) * 16))
            return i.create(d, c * 2)
          },
        }
        function a(o) {
          return ((o << 8) & 4278255360) | ((o >>> 8) & 16711935)
        }
      })(),
      t.enc.Utf16
    )
  })
})
var ot = N((mi, rc) => {
  ;(function (t, e) {
    typeof mi == "object"
      ? (rc.exports = mi = e(M()))
      : typeof define == "function" && define.amd
        ? define(["./core"], e)
        : e(t.CryptoJS)
  })(mi, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.WordArray,
          s = e.enc,
          n = (s.Base64 = {
            stringify: function (o) {
              var c = o.words,
                d = o.sigBytes,
                l = this._map
              o.clamp()
              for (var u = [], p = 0; p < d; p += 3)
                for (
                  var f = (c[p >>> 2] >>> (24 - (p % 4) * 8)) & 255,
                    h = (c[(p + 1) >>> 2] >>> (24 - ((p + 1) % 4) * 8)) & 255,
                    y = (c[(p + 2) >>> 2] >>> (24 - ((p + 2) % 4) * 8)) & 255,
                    x = (f << 16) | (h << 8) | y,
                    g = 0;
                  g < 4 && p + g * 0.75 < d;
                  g++
                )
                  u.push(l.charAt((x >>> (6 * (3 - g))) & 63))
              var m = l.charAt(64)
              if (m) for (; u.length % 4; ) u.push(m)
              return u.join("")
            },
            parse: function (o) {
              var c = o.length,
                d = this._map,
                l = this._reverseMap
              if (!l) {
                l = this._reverseMap = []
                for (var u = 0; u < d.length; u++) l[d.charCodeAt(u)] = u
              }
              var p = d.charAt(64)
              if (p) {
                var f = o.indexOf(p)
                f !== -1 && (c = f)
              }
              return a(o, c, l)
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          })
        function a(o, c, d) {
          for (var l = [], u = 0, p = 0; p < c; p++)
            if (p % 4) {
              var f = d[o.charCodeAt(p - 1)] << ((p % 4) * 2),
                h = d[o.charCodeAt(p)] >>> (6 - (p % 4) * 2),
                y = f | h
              ;((l[u >>> 2] |= y << (24 - (u % 4) * 8)), u++)
            }
          return i.create(l, u)
        }
      })(),
      t.enc.Base64
    )
  })
})
var sc = N((yi, ic) => {
  ;(function (t, e) {
    typeof yi == "object"
      ? (ic.exports = yi = e(M()))
      : typeof define == "function" && define.amd
        ? define(["./core"], e)
        : e(t.CryptoJS)
  })(yi, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.WordArray,
          s = e.enc,
          n = (s.Base64url = {
            stringify: function (o, c) {
              c === void 0 && (c = !0)
              var d = o.words,
                l = o.sigBytes,
                u = c ? this._safe_map : this._map
              o.clamp()
              for (var p = [], f = 0; f < l; f += 3)
                for (
                  var h = (d[f >>> 2] >>> (24 - (f % 4) * 8)) & 255,
                    y = (d[(f + 1) >>> 2] >>> (24 - ((f + 1) % 4) * 8)) & 255,
                    x = (d[(f + 2) >>> 2] >>> (24 - ((f + 2) % 4) * 8)) & 255,
                    g = (h << 16) | (y << 8) | x,
                    m = 0;
                  m < 4 && f + m * 0.75 < l;
                  m++
                )
                  p.push(u.charAt((g >>> (6 * (3 - m))) & 63))
              var w = u.charAt(64)
              if (w) for (; p.length % 4; ) p.push(w)
              return p.join("")
            },
            parse: function (o, c) {
              c === void 0 && (c = !0)
              var d = o.length,
                l = c ? this._safe_map : this._map,
                u = this._reverseMap
              if (!u) {
                u = this._reverseMap = []
                for (var p = 0; p < l.length; p++) u[l.charCodeAt(p)] = p
              }
              var f = l.charAt(64)
              if (f) {
                var h = o.indexOf(f)
                h !== -1 && (d = h)
              }
              return a(o, d, u)
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            _safe_map:
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
          })
        function a(o, c, d) {
          for (var l = [], u = 0, p = 0; p < c; p++)
            if (p % 4) {
              var f = d[o.charCodeAt(p - 1)] << ((p % 4) * 2),
                h = d[o.charCodeAt(p)] >>> (6 - (p % 4) * 2),
                y = f | h
              ;((l[u >>> 2] |= y << (24 - (u % 4) * 8)), u++)
            }
          return i.create(l, u)
        }
      })(),
      t.enc.Base64url
    )
  })
})
var ct = N((xi, nc) => {
  ;(function (t, e) {
    typeof xi == "object"
      ? (nc.exports = xi = e(M()))
      : typeof define == "function" && define.amd
        ? define(["./core"], e)
        : e(t.CryptoJS)
  })(xi, function (t) {
    return (
      (function (e) {
        var r = t,
          i = r.lib,
          s = i.WordArray,
          n = i.Hasher,
          a = r.algo,
          o = []
        ;(function () {
          for (var f = 0; f < 64; f++)
            o[f] = (e.abs(e.sin(f + 1)) * 4294967296) | 0
        })()
        var c = (a.MD5 = n.extend({
          _doReset: function () {
            this._hash = new s.init([
              1732584193, 4023233417, 2562383102, 271733878,
            ])
          },
          _doProcessBlock: function (f, h) {
            for (var y = 0; y < 16; y++) {
              var x = h + y,
                g = f[x]
              f[x] =
                (((g << 8) | (g >>> 24)) & 16711935) |
                (((g << 24) | (g >>> 8)) & 4278255360)
            }
            var m = this._hash.words,
              w = f[h + 0],
              v = f[h + 1],
              _ = f[h + 2],
              b = f[h + 3],
              P = f[h + 4],
              E = f[h + 5],
              S = f[h + 6],
              D = f[h + 7],
              k = f[h + 8],
              C = f[h + 9],
              F = f[h + 10],
              A = f[h + 11],
              $ = f[h + 12],
              O = f[h + 13],
              j = f[h + 14],
              H = f[h + 15],
              T = m[0],
              R = m[1],
              B = m[2],
              I = m[3]
            ;((T = d(T, R, B, I, w, 7, o[0])),
              (I = d(I, T, R, B, v, 12, o[1])),
              (B = d(B, I, T, R, _, 17, o[2])),
              (R = d(R, B, I, T, b, 22, o[3])),
              (T = d(T, R, B, I, P, 7, o[4])),
              (I = d(I, T, R, B, E, 12, o[5])),
              (B = d(B, I, T, R, S, 17, o[6])),
              (R = d(R, B, I, T, D, 22, o[7])),
              (T = d(T, R, B, I, k, 7, o[8])),
              (I = d(I, T, R, B, C, 12, o[9])),
              (B = d(B, I, T, R, F, 17, o[10])),
              (R = d(R, B, I, T, A, 22, o[11])),
              (T = d(T, R, B, I, $, 7, o[12])),
              (I = d(I, T, R, B, O, 12, o[13])),
              (B = d(B, I, T, R, j, 17, o[14])),
              (R = d(R, B, I, T, H, 22, o[15])),
              (T = l(T, R, B, I, v, 5, o[16])),
              (I = l(I, T, R, B, S, 9, o[17])),
              (B = l(B, I, T, R, A, 14, o[18])),
              (R = l(R, B, I, T, w, 20, o[19])),
              (T = l(T, R, B, I, E, 5, o[20])),
              (I = l(I, T, R, B, F, 9, o[21])),
              (B = l(B, I, T, R, H, 14, o[22])),
              (R = l(R, B, I, T, P, 20, o[23])),
              (T = l(T, R, B, I, C, 5, o[24])),
              (I = l(I, T, R, B, j, 9, o[25])),
              (B = l(B, I, T, R, b, 14, o[26])),
              (R = l(R, B, I, T, k, 20, o[27])),
              (T = l(T, R, B, I, O, 5, o[28])),
              (I = l(I, T, R, B, _, 9, o[29])),
              (B = l(B, I, T, R, D, 14, o[30])),
              (R = l(R, B, I, T, $, 20, o[31])),
              (T = u(T, R, B, I, E, 4, o[32])),
              (I = u(I, T, R, B, k, 11, o[33])),
              (B = u(B, I, T, R, A, 16, o[34])),
              (R = u(R, B, I, T, j, 23, o[35])),
              (T = u(T, R, B, I, v, 4, o[36])),
              (I = u(I, T, R, B, P, 11, o[37])),
              (B = u(B, I, T, R, D, 16, o[38])),
              (R = u(R, B, I, T, F, 23, o[39])),
              (T = u(T, R, B, I, O, 4, o[40])),
              (I = u(I, T, R, B, w, 11, o[41])),
              (B = u(B, I, T, R, b, 16, o[42])),
              (R = u(R, B, I, T, S, 23, o[43])),
              (T = u(T, R, B, I, C, 4, o[44])),
              (I = u(I, T, R, B, $, 11, o[45])),
              (B = u(B, I, T, R, H, 16, o[46])),
              (R = u(R, B, I, T, _, 23, o[47])),
              (T = p(T, R, B, I, w, 6, o[48])),
              (I = p(I, T, R, B, D, 10, o[49])),
              (B = p(B, I, T, R, j, 15, o[50])),
              (R = p(R, B, I, T, E, 21, o[51])),
              (T = p(T, R, B, I, $, 6, o[52])),
              (I = p(I, T, R, B, b, 10, o[53])),
              (B = p(B, I, T, R, F, 15, o[54])),
              (R = p(R, B, I, T, v, 21, o[55])),
              (T = p(T, R, B, I, k, 6, o[56])),
              (I = p(I, T, R, B, H, 10, o[57])),
              (B = p(B, I, T, R, S, 15, o[58])),
              (R = p(R, B, I, T, O, 21, o[59])),
              (T = p(T, R, B, I, P, 6, o[60])),
              (I = p(I, T, R, B, A, 10, o[61])),
              (B = p(B, I, T, R, _, 15, o[62])),
              (R = p(R, B, I, T, C, 21, o[63])),
              (m[0] = (m[0] + T) | 0),
              (m[1] = (m[1] + R) | 0),
              (m[2] = (m[2] + B) | 0),
              (m[3] = (m[3] + I) | 0))
          },
          _doFinalize: function () {
            var f = this._data,
              h = f.words,
              y = this._nDataBytes * 8,
              x = f.sigBytes * 8
            h[x >>> 5] |= 128 << (24 - (x % 32))
            var g = e.floor(y / 4294967296),
              m = y
            ;((h[(((x + 64) >>> 9) << 4) + 15] =
              (((g << 8) | (g >>> 24)) & 16711935) |
              (((g << 24) | (g >>> 8)) & 4278255360)),
              (h[(((x + 64) >>> 9) << 4) + 14] =
                (((m << 8) | (m >>> 24)) & 16711935) |
                (((m << 24) | (m >>> 8)) & 4278255360)),
              (f.sigBytes = (h.length + 1) * 4),
              this._process())
            for (var w = this._hash, v = w.words, _ = 0; _ < 4; _++) {
              var b = v[_]
              v[_] =
                (((b << 8) | (b >>> 24)) & 16711935) |
                (((b << 24) | (b >>> 8)) & 4278255360)
            }
            return w
          },
          clone: function () {
            var f = n.clone.call(this)
            return ((f._hash = this._hash.clone()), f)
          },
        }))
        function d(f, h, y, x, g, m, w) {
          var v = f + ((h & y) | (~h & x)) + g + w
          return ((v << m) | (v >>> (32 - m))) + h
        }
        function l(f, h, y, x, g, m, w) {
          var v = f + ((h & x) | (y & ~x)) + g + w
          return ((v << m) | (v >>> (32 - m))) + h
        }
        function u(f, h, y, x, g, m, w) {
          var v = f + (h ^ y ^ x) + g + w
          return ((v << m) | (v >>> (32 - m))) + h
        }
        function p(f, h, y, x, g, m, w) {
          var v = f + (y ^ (h | ~x)) + g + w
          return ((v << m) | (v >>> (32 - m))) + h
        }
        ;((r.MD5 = n._createHelper(c)), (r.HmacMD5 = n._createHmacHelper(c)))
      })(Math),
      t.MD5
    )
  })
})
var wn = N((wi, ac) => {
  ;(function (t, e) {
    typeof wi == "object"
      ? (ac.exports = wi = e(M()))
      : typeof define == "function" && define.amd
        ? define(["./core"], e)
        : e(t.CryptoJS)
  })(wi, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.WordArray,
          s = r.Hasher,
          n = e.algo,
          a = [],
          o = (n.SHA1 = s.extend({
            _doReset: function () {
              this._hash = new i.init([
                1732584193, 4023233417, 2562383102, 271733878, 3285377520,
              ])
            },
            _doProcessBlock: function (c, d) {
              for (
                var l = this._hash.words,
                  u = l[0],
                  p = l[1],
                  f = l[2],
                  h = l[3],
                  y = l[4],
                  x = 0;
                x < 80;
                x++
              ) {
                if (x < 16) a[x] = c[d + x] | 0
                else {
                  var g = a[x - 3] ^ a[x - 8] ^ a[x - 14] ^ a[x - 16]
                  a[x] = (g << 1) | (g >>> 31)
                }
                var m = ((u << 5) | (u >>> 27)) + y + a[x]
                ;(x < 20
                  ? (m += ((p & f) | (~p & h)) + 1518500249)
                  : x < 40
                    ? (m += (p ^ f ^ h) + 1859775393)
                    : x < 60
                      ? (m += ((p & f) | (p & h) | (f & h)) - 1894007588)
                      : (m += (p ^ f ^ h) - 899497514),
                  (y = h),
                  (h = f),
                  (f = (p << 30) | (p >>> 2)),
                  (p = u),
                  (u = m))
              }
              ;((l[0] = (l[0] + u) | 0),
                (l[1] = (l[1] + p) | 0),
                (l[2] = (l[2] + f) | 0),
                (l[3] = (l[3] + h) | 0),
                (l[4] = (l[4] + y) | 0))
            },
            _doFinalize: function () {
              var c = this._data,
                d = c.words,
                l = this._nDataBytes * 8,
                u = c.sigBytes * 8
              return (
                (d[u >>> 5] |= 128 << (24 - (u % 32))),
                (d[(((u + 64) >>> 9) << 4) + 14] = Math.floor(l / 4294967296)),
                (d[(((u + 64) >>> 9) << 4) + 15] = l),
                (c.sigBytes = d.length * 4),
                this._process(),
                this._hash
              )
            },
            clone: function () {
              var c = s.clone.call(this)
              return ((c._hash = this._hash.clone()), c)
            },
          }))
        ;((e.SHA1 = s._createHelper(o)), (e.HmacSHA1 = s._createHmacHelper(o)))
      })(),
      t.SHA1
    )
  })
})
var _i = N((vi, oc) => {
  ;(function (t, e) {
    typeof vi == "object"
      ? (oc.exports = vi = e(M()))
      : typeof define == "function" && define.amd
        ? define(["./core"], e)
        : e(t.CryptoJS)
  })(vi, function (t) {
    return (
      (function (e) {
        var r = t,
          i = r.lib,
          s = i.WordArray,
          n = i.Hasher,
          a = r.algo,
          o = [],
          c = []
        ;(function () {
          function u(y) {
            for (var x = e.sqrt(y), g = 2; g <= x; g++) if (!(y % g)) return !1
            return !0
          }
          function p(y) {
            return ((y - (y | 0)) * 4294967296) | 0
          }
          for (var f = 2, h = 0; h < 64; )
            (u(f) &&
              (h < 8 && (o[h] = p(e.pow(f, 1 / 2))),
              (c[h] = p(e.pow(f, 1 / 3))),
              h++),
              f++)
        })()
        var d = [],
          l = (a.SHA256 = n.extend({
            _doReset: function () {
              this._hash = new s.init(o.slice(0))
            },
            _doProcessBlock: function (u, p) {
              for (
                var f = this._hash.words,
                  h = f[0],
                  y = f[1],
                  x = f[2],
                  g = f[3],
                  m = f[4],
                  w = f[5],
                  v = f[6],
                  _ = f[7],
                  b = 0;
                b < 64;
                b++
              ) {
                if (b < 16) d[b] = u[p + b] | 0
                else {
                  var P = d[b - 15],
                    E =
                      ((P << 25) | (P >>> 7)) ^
                      ((P << 14) | (P >>> 18)) ^
                      (P >>> 3),
                    S = d[b - 2],
                    D =
                      ((S << 15) | (S >>> 17)) ^
                      ((S << 13) | (S >>> 19)) ^
                      (S >>> 10)
                  d[b] = E + d[b - 7] + D + d[b - 16]
                }
                var k = (m & w) ^ (~m & v),
                  C = (h & y) ^ (h & x) ^ (y & x),
                  F =
                    ((h << 30) | (h >>> 2)) ^
                    ((h << 19) | (h >>> 13)) ^
                    ((h << 10) | (h >>> 22)),
                  A =
                    ((m << 26) | (m >>> 6)) ^
                    ((m << 21) | (m >>> 11)) ^
                    ((m << 7) | (m >>> 25)),
                  $ = _ + A + k + c[b] + d[b],
                  O = F + C
                ;((_ = v),
                  (v = w),
                  (w = m),
                  (m = (g + $) | 0),
                  (g = x),
                  (x = y),
                  (y = h),
                  (h = ($ + O) | 0))
              }
              ;((f[0] = (f[0] + h) | 0),
                (f[1] = (f[1] + y) | 0),
                (f[2] = (f[2] + x) | 0),
                (f[3] = (f[3] + g) | 0),
                (f[4] = (f[4] + m) | 0),
                (f[5] = (f[5] + w) | 0),
                (f[6] = (f[6] + v) | 0),
                (f[7] = (f[7] + _) | 0))
            },
            _doFinalize: function () {
              var u = this._data,
                p = u.words,
                f = this._nDataBytes * 8,
                h = u.sigBytes * 8
              return (
                (p[h >>> 5] |= 128 << (24 - (h % 32))),
                (p[(((h + 64) >>> 9) << 4) + 14] = e.floor(f / 4294967296)),
                (p[(((h + 64) >>> 9) << 4) + 15] = f),
                (u.sigBytes = p.length * 4),
                this._process(),
                this._hash
              )
            },
            clone: function () {
              var u = n.clone.call(this)
              return ((u._hash = this._hash.clone()), u)
            },
          }))
        ;((r.SHA256 = n._createHelper(l)),
          (r.HmacSHA256 = n._createHmacHelper(l)))
      })(Math),
      t.SHA256
    )
  })
})
var dc = N((bi, cc) => {
  ;(function (t, e, r) {
    typeof bi == "object"
      ? (cc.exports = bi = e(M(), _i()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./sha256"], e)
        : e(t.CryptoJS)
  })(bi, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.WordArray,
          s = e.algo,
          n = s.SHA256,
          a = (s.SHA224 = n.extend({
            _doReset: function () {
              this._hash = new i.init([
                3238371032, 914150663, 812702999, 4144912697, 4290775857,
                1750603025, 1694076839, 3204075428,
              ])
            },
            _doFinalize: function () {
              var o = n._doFinalize.call(this)
              return ((o.sigBytes -= 4), o)
            },
          }))
        ;((e.SHA224 = n._createHelper(a)),
          (e.HmacSHA224 = n._createHmacHelper(a)))
      })(),
      t.SHA224
    )
  })
})
var vn = N((ki, lc) => {
  ;(function (t, e, r) {
    typeof ki == "object"
      ? (lc.exports = ki = e(M(), xr()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./x64-core"], e)
        : e(t.CryptoJS)
  })(ki, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.Hasher,
          s = e.x64,
          n = s.Word,
          a = s.WordArray,
          o = e.algo
        function c() {
          return n.create.apply(n, arguments)
        }
        var d = [
            c(1116352408, 3609767458),
            c(1899447441, 602891725),
            c(3049323471, 3964484399),
            c(3921009573, 2173295548),
            c(961987163, 4081628472),
            c(1508970993, 3053834265),
            c(2453635748, 2937671579),
            c(2870763221, 3664609560),
            c(3624381080, 2734883394),
            c(310598401, 1164996542),
            c(607225278, 1323610764),
            c(1426881987, 3590304994),
            c(1925078388, 4068182383),
            c(2162078206, 991336113),
            c(2614888103, 633803317),
            c(3248222580, 3479774868),
            c(3835390401, 2666613458),
            c(4022224774, 944711139),
            c(264347078, 2341262773),
            c(604807628, 2007800933),
            c(770255983, 1495990901),
            c(1249150122, 1856431235),
            c(1555081692, 3175218132),
            c(1996064986, 2198950837),
            c(2554220882, 3999719339),
            c(2821834349, 766784016),
            c(2952996808, 2566594879),
            c(3210313671, 3203337956),
            c(3336571891, 1034457026),
            c(3584528711, 2466948901),
            c(113926993, 3758326383),
            c(338241895, 168717936),
            c(666307205, 1188179964),
            c(773529912, 1546045734),
            c(1294757372, 1522805485),
            c(1396182291, 2643833823),
            c(1695183700, 2343527390),
            c(1986661051, 1014477480),
            c(2177026350, 1206759142),
            c(2456956037, 344077627),
            c(2730485921, 1290863460),
            c(2820302411, 3158454273),
            c(3259730800, 3505952657),
            c(3345764771, 106217008),
            c(3516065817, 3606008344),
            c(3600352804, 1432725776),
            c(4094571909, 1467031594),
            c(275423344, 851169720),
            c(430227734, 3100823752),
            c(506948616, 1363258195),
            c(659060556, 3750685593),
            c(883997877, 3785050280),
            c(958139571, 3318307427),
            c(1322822218, 3812723403),
            c(1537002063, 2003034995),
            c(1747873779, 3602036899),
            c(1955562222, 1575990012),
            c(2024104815, 1125592928),
            c(2227730452, 2716904306),
            c(2361852424, 442776044),
            c(2428436474, 593698344),
            c(2756734187, 3733110249),
            c(3204031479, 2999351573),
            c(3329325298, 3815920427),
            c(3391569614, 3928383900),
            c(3515267271, 566280711),
            c(3940187606, 3454069534),
            c(4118630271, 4000239992),
            c(116418474, 1914138554),
            c(174292421, 2731055270),
            c(289380356, 3203993006),
            c(460393269, 320620315),
            c(685471733, 587496836),
            c(852142971, 1086792851),
            c(1017036298, 365543100),
            c(1126000580, 2618297676),
            c(1288033470, 3409855158),
            c(1501505948, 4234509866),
            c(1607167915, 987167468),
            c(1816402316, 1246189591),
          ],
          l = []
        ;(function () {
          for (var p = 0; p < 80; p++) l[p] = c()
        })()
        var u = (o.SHA512 = i.extend({
          _doReset: function () {
            this._hash = new a.init([
              new n.init(1779033703, 4089235720),
              new n.init(3144134277, 2227873595),
              new n.init(1013904242, 4271175723),
              new n.init(2773480762, 1595750129),
              new n.init(1359893119, 2917565137),
              new n.init(2600822924, 725511199),
              new n.init(528734635, 4215389547),
              new n.init(1541459225, 327033209),
            ])
          },
          _doProcessBlock: function (p, f) {
            for (
              var h = this._hash.words,
                y = h[0],
                x = h[1],
                g = h[2],
                m = h[3],
                w = h[4],
                v = h[5],
                _ = h[6],
                b = h[7],
                P = y.high,
                E = y.low,
                S = x.high,
                D = x.low,
                k = g.high,
                C = g.low,
                F = m.high,
                A = m.low,
                $ = w.high,
                O = w.low,
                j = v.high,
                H = v.low,
                T = _.high,
                R = _.low,
                B = b.high,
                I = b.low,
                X = P,
                J = E,
                _e = S,
                L = D,
                Yt = k,
                Ut = C,
                js = F,
                er = A,
                Ue = $,
                Ae = O,
                qr = j,
                tr = H,
                jr = T,
                rr = R,
                zs = B,
                ir = I,
                $e = 0;
              $e < 80;
              $e++
            ) {
              var Ie,
                tt,
                zr = l[$e]
              if ($e < 16)
                ((tt = zr.high = p[f + $e * 2] | 0),
                  (Ie = zr.low = p[f + $e * 2 + 1] | 0))
              else {
                var ka = l[$e - 15],
                  $t = ka.high,
                  sr = ka.low,
                  q0 =
                    (($t >>> 1) | (sr << 31)) ^
                    (($t >>> 8) | (sr << 24)) ^
                    ($t >>> 7),
                  Sa =
                    ((sr >>> 1) | ($t << 31)) ^
                    ((sr >>> 8) | ($t << 24)) ^
                    ((sr >>> 7) | ($t << 25)),
                  Pa = l[$e - 2],
                  Ot = Pa.high,
                  nr = Pa.low,
                  j0 =
                    ((Ot >>> 19) | (nr << 13)) ^
                    ((Ot << 3) | (nr >>> 29)) ^
                    (Ot >>> 6),
                  Aa =
                    ((nr >>> 19) | (Ot << 13)) ^
                    ((nr << 3) | (Ot >>> 29)) ^
                    ((nr >>> 6) | (Ot << 26)),
                  Ca = l[$e - 7],
                  z0 = Ca.high,
                  L0 = Ca.low,
                  Ea = l[$e - 16],
                  N0 = Ea.high,
                  Da = Ea.low
                ;((Ie = Sa + L0),
                  (tt = q0 + z0 + (Ie >>> 0 < Sa >>> 0 ? 1 : 0)),
                  (Ie = Ie + Aa),
                  (tt = tt + j0 + (Ie >>> 0 < Aa >>> 0 ? 1 : 0)),
                  (Ie = Ie + Da),
                  (tt = tt + N0 + (Ie >>> 0 < Da >>> 0 ? 1 : 0)),
                  (zr.high = tt),
                  (zr.low = Ie))
              }
              var M0 = (Ue & qr) ^ (~Ue & jr),
                Ta = (Ae & tr) ^ (~Ae & rr),
                H0 = (X & _e) ^ (X & Yt) ^ (_e & Yt),
                K0 = (J & L) ^ (J & Ut) ^ (L & Ut),
                W0 =
                  ((X >>> 28) | (J << 4)) ^
                  ((X << 30) | (J >>> 2)) ^
                  ((X << 25) | (J >>> 7)),
                Fa =
                  ((J >>> 28) | (X << 4)) ^
                  ((J << 30) | (X >>> 2)) ^
                  ((J << 25) | (X >>> 7)),
                V0 =
                  ((Ue >>> 14) | (Ae << 18)) ^
                  ((Ue >>> 18) | (Ae << 14)) ^
                  ((Ue << 23) | (Ae >>> 9)),
                G0 =
                  ((Ae >>> 14) | (Ue << 18)) ^
                  ((Ae >>> 18) | (Ue << 14)) ^
                  ((Ae << 23) | (Ue >>> 9)),
                Ia = d[$e],
                J0 = Ia.high,
                Ra = Ia.low,
                Ce = ir + G0,
                rt = zs + V0 + (Ce >>> 0 < ir >>> 0 ? 1 : 0),
                Ce = Ce + Ta,
                rt = rt + M0 + (Ce >>> 0 < Ta >>> 0 ? 1 : 0),
                Ce = Ce + Ra,
                rt = rt + J0 + (Ce >>> 0 < Ra >>> 0 ? 1 : 0),
                Ce = Ce + Ie,
                rt = rt + tt + (Ce >>> 0 < Ie >>> 0 ? 1 : 0),
                Ba = Fa + K0,
                Q0 = W0 + H0 + (Ba >>> 0 < Fa >>> 0 ? 1 : 0)
              ;((zs = jr),
                (ir = rr),
                (jr = qr),
                (rr = tr),
                (qr = Ue),
                (tr = Ae),
                (Ae = (er + Ce) | 0),
                (Ue = (js + rt + (Ae >>> 0 < er >>> 0 ? 1 : 0)) | 0),
                (js = Yt),
                (er = Ut),
                (Yt = _e),
                (Ut = L),
                (_e = X),
                (L = J),
                (J = (Ce + Ba) | 0),
                (X = (rt + Q0 + (J >>> 0 < Ce >>> 0 ? 1 : 0)) | 0))
            }
            ;((E = y.low = E + J),
              (y.high = P + X + (E >>> 0 < J >>> 0 ? 1 : 0)),
              (D = x.low = D + L),
              (x.high = S + _e + (D >>> 0 < L >>> 0 ? 1 : 0)),
              (C = g.low = C + Ut),
              (g.high = k + Yt + (C >>> 0 < Ut >>> 0 ? 1 : 0)),
              (A = m.low = A + er),
              (m.high = F + js + (A >>> 0 < er >>> 0 ? 1 : 0)),
              (O = w.low = O + Ae),
              (w.high = $ + Ue + (O >>> 0 < Ae >>> 0 ? 1 : 0)),
              (H = v.low = H + tr),
              (v.high = j + qr + (H >>> 0 < tr >>> 0 ? 1 : 0)),
              (R = _.low = R + rr),
              (_.high = T + jr + (R >>> 0 < rr >>> 0 ? 1 : 0)),
              (I = b.low = I + ir),
              (b.high = B + zs + (I >>> 0 < ir >>> 0 ? 1 : 0)))
          },
          _doFinalize: function () {
            var p = this._data,
              f = p.words,
              h = this._nDataBytes * 8,
              y = p.sigBytes * 8
            ;((f[y >>> 5] |= 128 << (24 - (y % 32))),
              (f[(((y + 128) >>> 10) << 5) + 30] = Math.floor(h / 4294967296)),
              (f[(((y + 128) >>> 10) << 5) + 31] = h),
              (p.sigBytes = f.length * 4),
              this._process())
            var x = this._hash.toX32()
            return x
          },
          clone: function () {
            var p = i.clone.call(this)
            return ((p._hash = this._hash.clone()), p)
          },
          blockSize: 1024 / 32,
        }))
        ;((e.SHA512 = i._createHelper(u)),
          (e.HmacSHA512 = i._createHmacHelper(u)))
      })(),
      t.SHA512
    )
  })
})
var pc = N((Si, uc) => {
  ;(function (t, e, r) {
    typeof Si == "object"
      ? (uc.exports = Si = e(M(), xr(), vn()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./x64-core", "./sha512"], e)
        : e(t.CryptoJS)
  })(Si, function (t) {
    return (
      (function () {
        var e = t,
          r = e.x64,
          i = r.Word,
          s = r.WordArray,
          n = e.algo,
          a = n.SHA512,
          o = (n.SHA384 = a.extend({
            _doReset: function () {
              this._hash = new s.init([
                new i.init(3418070365, 3238371032),
                new i.init(1654270250, 914150663),
                new i.init(2438529370, 812702999),
                new i.init(355462360, 4144912697),
                new i.init(1731405415, 4290775857),
                new i.init(2394180231, 1750603025),
                new i.init(3675008525, 1694076839),
                new i.init(1203062813, 3204075428),
              ])
            },
            _doFinalize: function () {
              var c = a._doFinalize.call(this)
              return ((c.sigBytes -= 16), c)
            },
          }))
        ;((e.SHA384 = a._createHelper(o)),
          (e.HmacSHA384 = a._createHmacHelper(o)))
      })(),
      t.SHA384
    )
  })
})
var hc = N((Pi, fc) => {
  ;(function (t, e, r) {
    typeof Pi == "object"
      ? (fc.exports = Pi = e(M(), xr()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./x64-core"], e)
        : e(t.CryptoJS)
  })(Pi, function (t) {
    return (
      (function (e) {
        var r = t,
          i = r.lib,
          s = i.WordArray,
          n = i.Hasher,
          a = r.x64,
          o = a.Word,
          c = r.algo,
          d = [],
          l = [],
          u = []
        ;(function () {
          for (var h = 1, y = 0, x = 0; x < 24; x++) {
            d[h + 5 * y] = (((x + 1) * (x + 2)) / 2) % 64
            var g = y % 5,
              m = (2 * h + 3 * y) % 5
            ;((h = g), (y = m))
          }
          for (var h = 0; h < 5; h++)
            for (var y = 0; y < 5; y++)
              l[h + 5 * y] = y + ((2 * h + 3 * y) % 5) * 5
          for (var w = 1, v = 0; v < 24; v++) {
            for (var _ = 0, b = 0, P = 0; P < 7; P++) {
              if (w & 1) {
                var E = (1 << P) - 1
                E < 32 ? (b ^= 1 << E) : (_ ^= 1 << (E - 32))
              }
              w & 128 ? (w = (w << 1) ^ 113) : (w <<= 1)
            }
            u[v] = o.create(_, b)
          }
        })()
        var p = []
        ;(function () {
          for (var h = 0; h < 25; h++) p[h] = o.create()
        })()
        var f = (c.SHA3 = n.extend({
          cfg: n.cfg.extend({ outputLength: 512 }),
          _doReset: function () {
            for (var h = (this._state = []), y = 0; y < 25; y++)
              h[y] = new o.init()
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
          },
          _doProcessBlock: function (h, y) {
            for (
              var x = this._state, g = this.blockSize / 2, m = 0;
              m < g;
              m++
            ) {
              var w = h[y + 2 * m],
                v = h[y + 2 * m + 1]
              ;((w =
                (((w << 8) | (w >>> 24)) & 16711935) |
                (((w << 24) | (w >>> 8)) & 4278255360)),
                (v =
                  (((v << 8) | (v >>> 24)) & 16711935) |
                  (((v << 24) | (v >>> 8)) & 4278255360)))
              var _ = x[m]
              ;((_.high ^= v), (_.low ^= w))
            }
            for (var b = 0; b < 24; b++) {
              for (var P = 0; P < 5; P++) {
                for (var E = 0, S = 0, D = 0; D < 5; D++) {
                  var _ = x[P + 5 * D]
                  ;((E ^= _.high), (S ^= _.low))
                }
                var k = p[P]
                ;((k.high = E), (k.low = S))
              }
              for (var P = 0; P < 5; P++)
                for (
                  var C = p[(P + 4) % 5],
                    F = p[(P + 1) % 5],
                    A = F.high,
                    $ = F.low,
                    E = C.high ^ ((A << 1) | ($ >>> 31)),
                    S = C.low ^ (($ << 1) | (A >>> 31)),
                    D = 0;
                  D < 5;
                  D++
                ) {
                  var _ = x[P + 5 * D]
                  ;((_.high ^= E), (_.low ^= S))
                }
              for (var O = 1; O < 25; O++) {
                var E,
                  S,
                  _ = x[O],
                  j = _.high,
                  H = _.low,
                  T = d[O]
                T < 32
                  ? ((E = (j << T) | (H >>> (32 - T))),
                    (S = (H << T) | (j >>> (32 - T))))
                  : ((E = (H << (T - 32)) | (j >>> (64 - T))),
                    (S = (j << (T - 32)) | (H >>> (64 - T))))
                var R = p[l[O]]
                ;((R.high = E), (R.low = S))
              }
              var B = p[0],
                I = x[0]
              ;((B.high = I.high), (B.low = I.low))
              for (var P = 0; P < 5; P++)
                for (var D = 0; D < 5; D++) {
                  var O = P + 5 * D,
                    _ = x[O],
                    X = p[O],
                    J = p[((P + 1) % 5) + 5 * D],
                    _e = p[((P + 2) % 5) + 5 * D]
                  ;((_.high = X.high ^ (~J.high & _e.high)),
                    (_.low = X.low ^ (~J.low & _e.low)))
                }
              var _ = x[0],
                L = u[b]
              ;((_.high ^= L.high), (_.low ^= L.low))
            }
          },
          _doFinalize: function () {
            var h = this._data,
              y = h.words,
              x = this._nDataBytes * 8,
              g = h.sigBytes * 8,
              m = this.blockSize * 32
            ;((y[g >>> 5] |= 1 << (24 - (g % 32))),
              (y[((e.ceil((g + 1) / m) * m) >>> 5) - 1] |= 128),
              (h.sigBytes = y.length * 4),
              this._process())
            for (
              var w = this._state,
                v = this.cfg.outputLength / 8,
                _ = v / 8,
                b = [],
                P = 0;
              P < _;
              P++
            ) {
              var E = w[P],
                S = E.high,
                D = E.low
              ;((S =
                (((S << 8) | (S >>> 24)) & 16711935) |
                (((S << 24) | (S >>> 8)) & 4278255360)),
                (D =
                  (((D << 8) | (D >>> 24)) & 16711935) |
                  (((D << 24) | (D >>> 8)) & 4278255360)),
                b.push(D),
                b.push(S))
            }
            return new s.init(b, v)
          },
          clone: function () {
            for (
              var h = n.clone.call(this),
                y = (h._state = this._state.slice(0)),
                x = 0;
              x < 25;
              x++
            )
              y[x] = y[x].clone()
            return h
          },
        }))
        ;((r.SHA3 = n._createHelper(f)), (r.HmacSHA3 = n._createHmacHelper(f)))
      })(Math),
      t.SHA3
    )
  })
})
var mc = N((Ai, gc) => {
  ;(function (t, e) {
    typeof Ai == "object"
      ? (gc.exports = Ai = e(M()))
      : typeof define == "function" && define.amd
        ? define(["./core"], e)
        : e(t.CryptoJS)
  })(Ai, function (t) {
    return (
      (function (e) {
        var r = t,
          i = r.lib,
          s = i.WordArray,
          n = i.Hasher,
          a = r.algo,
          o = s.create([
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1,
            10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1,
            2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15,
            14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
          ]),
          c = s.create([
            5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7,
            0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9,
            11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13,
            9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
          ]),
          d = s.create([
            11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13,
            11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13,
            15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14,
            5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8,
            5, 6,
          ]),
          l = s.create([
            8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15,
            7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6,
            14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9,
            12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13,
            11, 11,
          ]),
          u = s.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
          p = s.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
          f = (a.RIPEMD160 = n.extend({
            _doReset: function () {
              this._hash = s.create([
                1732584193, 4023233417, 2562383102, 271733878, 3285377520,
              ])
            },
            _doProcessBlock: function (v, _) {
              for (var b = 0; b < 16; b++) {
                var P = _ + b,
                  E = v[P]
                v[P] =
                  (((E << 8) | (E >>> 24)) & 16711935) |
                  (((E << 24) | (E >>> 8)) & 4278255360)
              }
              var S = this._hash.words,
                D = u.words,
                k = p.words,
                C = o.words,
                F = c.words,
                A = d.words,
                $ = l.words,
                O,
                j,
                H,
                T,
                R,
                B,
                I,
                X,
                J,
                _e
              ;((B = O = S[0]),
                (I = j = S[1]),
                (X = H = S[2]),
                (J = T = S[3]),
                (_e = R = S[4]))
              for (var L, b = 0; b < 80; b += 1)
                ((L = (O + v[_ + C[b]]) | 0),
                  b < 16
                    ? (L += h(j, H, T) + D[0])
                    : b < 32
                      ? (L += y(j, H, T) + D[1])
                      : b < 48
                        ? (L += x(j, H, T) + D[2])
                        : b < 64
                          ? (L += g(j, H, T) + D[3])
                          : (L += m(j, H, T) + D[4]),
                  (L = L | 0),
                  (L = w(L, A[b])),
                  (L = (L + R) | 0),
                  (O = R),
                  (R = T),
                  (T = w(H, 10)),
                  (H = j),
                  (j = L),
                  (L = (B + v[_ + F[b]]) | 0),
                  b < 16
                    ? (L += m(I, X, J) + k[0])
                    : b < 32
                      ? (L += g(I, X, J) + k[1])
                      : b < 48
                        ? (L += x(I, X, J) + k[2])
                        : b < 64
                          ? (L += y(I, X, J) + k[3])
                          : (L += h(I, X, J) + k[4]),
                  (L = L | 0),
                  (L = w(L, $[b])),
                  (L = (L + _e) | 0),
                  (B = _e),
                  (_e = J),
                  (J = w(X, 10)),
                  (X = I),
                  (I = L))
              ;((L = (S[1] + H + J) | 0),
                (S[1] = (S[2] + T + _e) | 0),
                (S[2] = (S[3] + R + B) | 0),
                (S[3] = (S[4] + O + I) | 0),
                (S[4] = (S[0] + j + X) | 0),
                (S[0] = L))
            },
            _doFinalize: function () {
              var v = this._data,
                _ = v.words,
                b = this._nDataBytes * 8,
                P = v.sigBytes * 8
              ;((_[P >>> 5] |= 128 << (24 - (P % 32))),
                (_[(((P + 64) >>> 9) << 4) + 14] =
                  (((b << 8) | (b >>> 24)) & 16711935) |
                  (((b << 24) | (b >>> 8)) & 4278255360)),
                (v.sigBytes = (_.length + 1) * 4),
                this._process())
              for (var E = this._hash, S = E.words, D = 0; D < 5; D++) {
                var k = S[D]
                S[D] =
                  (((k << 8) | (k >>> 24)) & 16711935) |
                  (((k << 24) | (k >>> 8)) & 4278255360)
              }
              return E
            },
            clone: function () {
              var v = n.clone.call(this)
              return ((v._hash = this._hash.clone()), v)
            },
          }))
        function h(v, _, b) {
          return v ^ _ ^ b
        }
        function y(v, _, b) {
          return (v & _) | (~v & b)
        }
        function x(v, _, b) {
          return (v | ~_) ^ b
        }
        function g(v, _, b) {
          return (v & b) | (_ & ~b)
        }
        function m(v, _, b) {
          return v ^ (_ | ~b)
        }
        function w(v, _) {
          return (v << _) | (v >>> (32 - _))
        }
        ;((r.RIPEMD160 = n._createHelper(f)),
          (r.HmacRIPEMD160 = n._createHmacHelper(f)))
      })(Math),
      t.RIPEMD160
    )
  })
})
var Ei = N((Ci, yc) => {
  ;(function (t, e) {
    typeof Ci == "object"
      ? (yc.exports = Ci = e(M()))
      : typeof define == "function" && define.amd
        ? define(["./core"], e)
        : e(t.CryptoJS)
  })(Ci, function (t) {
    ;(function () {
      var e = t,
        r = e.lib,
        i = r.Base,
        s = e.enc,
        n = s.Utf8,
        a = e.algo,
        o = (a.HMAC = i.extend({
          init: function (c, d) {
            ;((c = this._hasher = new c.init()),
              typeof d == "string" && (d = n.parse(d)))
            var l = c.blockSize,
              u = l * 4
            ;(d.sigBytes > u && (d = c.finalize(d)), d.clamp())
            for (
              var p = (this._oKey = d.clone()),
                f = (this._iKey = d.clone()),
                h = p.words,
                y = f.words,
                x = 0;
              x < l;
              x++
            )
              ((h[x] ^= 1549556828), (y[x] ^= 909522486))
            ;((p.sigBytes = f.sigBytes = u), this.reset())
          },
          reset: function () {
            var c = this._hasher
            ;(c.reset(), c.update(this._iKey))
          },
          update: function (c) {
            return (this._hasher.update(c), this)
          },
          finalize: function (c) {
            var d = this._hasher,
              l = d.finalize(c)
            d.reset()
            var u = d.finalize(this._oKey.clone().concat(l))
            return u
          },
        }))
    })()
  })
})
var wc = N((Di, xc) => {
  ;(function (t, e, r) {
    typeof Di == "object"
      ? (xc.exports = Di = e(M(), _i(), Ei()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./sha256", "./hmac"], e)
        : e(t.CryptoJS)
  })(Di, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.Base,
          s = r.WordArray,
          n = e.algo,
          a = n.SHA256,
          o = n.HMAC,
          c = (n.PBKDF2 = i.extend({
            cfg: i.extend({ keySize: 128 / 32, hasher: a, iterations: 25e4 }),
            init: function (d) {
              this.cfg = this.cfg.extend(d)
            },
            compute: function (d, l) {
              for (
                var u = this.cfg,
                  p = o.create(u.hasher, d),
                  f = s.create(),
                  h = s.create([1]),
                  y = f.words,
                  x = h.words,
                  g = u.keySize,
                  m = u.iterations;
                y.length < g;
              ) {
                var w = p.update(l).finalize(h)
                p.reset()
                for (var v = w.words, _ = v.length, b = w, P = 1; P < m; P++) {
                  ;((b = p.finalize(b)), p.reset())
                  for (var E = b.words, S = 0; S < _; S++) v[S] ^= E[S]
                }
                ;(f.concat(w), x[0]++)
              }
              return ((f.sigBytes = g * 4), f)
            },
          }))
        e.PBKDF2 = function (d, l, u) {
          return c.create(u).compute(d, l)
        }
      })(),
      t.PBKDF2
    )
  })
})
var Ve = N((Ti, vc) => {
  ;(function (t, e, r) {
    typeof Ti == "object"
      ? (vc.exports = Ti = e(M(), wn(), Ei()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./sha1", "./hmac"], e)
        : e(t.CryptoJS)
  })(Ti, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.Base,
          s = r.WordArray,
          n = e.algo,
          a = n.MD5,
          o = (n.EvpKDF = i.extend({
            cfg: i.extend({ keySize: 128 / 32, hasher: a, iterations: 1 }),
            init: function (c) {
              this.cfg = this.cfg.extend(c)
            },
            compute: function (c, d) {
              for (
                var l,
                  u = this.cfg,
                  p = u.hasher.create(),
                  f = s.create(),
                  h = f.words,
                  y = u.keySize,
                  x = u.iterations;
                h.length < y;
              ) {
                ;(l && p.update(l), (l = p.update(c).finalize(d)), p.reset())
                for (var g = 1; g < x; g++) ((l = p.finalize(l)), p.reset())
                f.concat(l)
              }
              return ((f.sigBytes = y * 4), f)
            },
          }))
        e.EvpKDF = function (c, d, l) {
          return o.create(l).compute(c, d)
        }
      })(),
      t.EvpKDF
    )
  })
})
var oe = N((Fi, _c) => {
  ;(function (t, e, r) {
    typeof Fi == "object"
      ? (_c.exports = Fi = e(M(), Ve()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./evpkdf"], e)
        : e(t.CryptoJS)
  })(Fi, function (t) {
    t.lib.Cipher ||
      (function (e) {
        var r = t,
          i = r.lib,
          s = i.Base,
          n = i.WordArray,
          a = i.BufferedBlockAlgorithm,
          o = r.enc,
          c = o.Utf8,
          d = o.Base64,
          l = r.algo,
          u = l.EvpKDF,
          p = (i.Cipher = a.extend({
            cfg: s.extend(),
            createEncryptor: function (k, C) {
              return this.create(this._ENC_XFORM_MODE, k, C)
            },
            createDecryptor: function (k, C) {
              return this.create(this._DEC_XFORM_MODE, k, C)
            },
            init: function (k, C, F) {
              ;((this.cfg = this.cfg.extend(F)),
                (this._xformMode = k),
                (this._key = C),
                this.reset())
            },
            reset: function () {
              ;(a.reset.call(this), this._doReset())
            },
            process: function (k) {
              return (this._append(k), this._process())
            },
            finalize: function (k) {
              k && this._append(k)
              var C = this._doFinalize()
              return C
            },
            keySize: 128 / 32,
            ivSize: 128 / 32,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: (function () {
              function k(C) {
                return typeof C == "string" ? D : P
              }
              return function (C) {
                return {
                  encrypt: function (F, A, $) {
                    return k(A).encrypt(C, F, A, $)
                  },
                  decrypt: function (F, A, $) {
                    return k(A).decrypt(C, F, A, $)
                  },
                }
              }
            })(),
          })),
          f = (i.StreamCipher = p.extend({
            _doFinalize: function () {
              var k = this._process(!0)
              return k
            },
            blockSize: 1,
          })),
          h = (r.mode = {}),
          y = (i.BlockCipherMode = s.extend({
            createEncryptor: function (k, C) {
              return this.Encryptor.create(k, C)
            },
            createDecryptor: function (k, C) {
              return this.Decryptor.create(k, C)
            },
            init: function (k, C) {
              ;((this._cipher = k), (this._iv = C))
            },
          })),
          x = (h.CBC = (function () {
            var k = y.extend()
            ;((k.Encryptor = k.extend({
              processBlock: function (F, A) {
                var $ = this._cipher,
                  O = $.blockSize
                ;(C.call(this, F, A, O),
                  $.encryptBlock(F, A),
                  (this._prevBlock = F.slice(A, A + O)))
              },
            })),
              (k.Decryptor = k.extend({
                processBlock: function (F, A) {
                  var $ = this._cipher,
                    O = $.blockSize,
                    j = F.slice(A, A + O)
                  ;($.decryptBlock(F, A),
                    C.call(this, F, A, O),
                    (this._prevBlock = j))
                },
              })))
            function C(F, A, $) {
              var O,
                j = this._iv
              j ? ((O = j), (this._iv = e)) : (O = this._prevBlock)
              for (var H = 0; H < $; H++) F[A + H] ^= O[H]
            }
            return k
          })()),
          g = (r.pad = {}),
          m = (g.Pkcs7 = {
            pad: function (k, C) {
              for (
                var F = C * 4,
                  A = F - (k.sigBytes % F),
                  $ = (A << 24) | (A << 16) | (A << 8) | A,
                  O = [],
                  j = 0;
                j < A;
                j += 4
              )
                O.push($)
              var H = n.create(O, A)
              k.concat(H)
            },
            unpad: function (k) {
              var C = k.words[(k.sigBytes - 1) >>> 2] & 255
              k.sigBytes -= C
            },
          }),
          w = (i.BlockCipher = p.extend({
            cfg: p.cfg.extend({ mode: x, padding: m }),
            reset: function () {
              var k
              p.reset.call(this)
              var C = this.cfg,
                F = C.iv,
                A = C.mode
              ;(this._xformMode == this._ENC_XFORM_MODE
                ? (k = A.createEncryptor)
                : ((k = A.createDecryptor), (this._minBufferSize = 1)),
                this._mode && this._mode.__creator == k
                  ? this._mode.init(this, F && F.words)
                  : ((this._mode = k.call(A, this, F && F.words)),
                    (this._mode.__creator = k)))
            },
            _doProcessBlock: function (k, C) {
              this._mode.processBlock(k, C)
            },
            _doFinalize: function () {
              var k,
                C = this.cfg.padding
              return (
                this._xformMode == this._ENC_XFORM_MODE
                  ? (C.pad(this._data, this.blockSize), (k = this._process(!0)))
                  : ((k = this._process(!0)), C.unpad(k)),
                k
              )
            },
            blockSize: 128 / 32,
          })),
          v = (i.CipherParams = s.extend({
            init: function (k) {
              this.mixIn(k)
            },
            toString: function (k) {
              return (k || this.formatter).stringify(this)
            },
          })),
          _ = (r.format = {}),
          b = (_.OpenSSL = {
            stringify: function (k) {
              var C,
                F = k.ciphertext,
                A = k.salt
              return (
                A
                  ? (C = n.create([1398893684, 1701076831]).concat(A).concat(F))
                  : (C = F),
                C.toString(d)
              )
            },
            parse: function (k) {
              var C,
                F = d.parse(k),
                A = F.words
              return (
                A[0] == 1398893684 &&
                  A[1] == 1701076831 &&
                  ((C = n.create(A.slice(2, 4))),
                  A.splice(0, 4),
                  (F.sigBytes -= 16)),
                v.create({ ciphertext: F, salt: C })
              )
            },
          }),
          P = (i.SerializableCipher = s.extend({
            cfg: s.extend({ format: b }),
            encrypt: function (k, C, F, A) {
              A = this.cfg.extend(A)
              var $ = k.createEncryptor(F, A),
                O = $.finalize(C),
                j = $.cfg
              return v.create({
                ciphertext: O,
                key: F,
                iv: j.iv,
                algorithm: k,
                mode: j.mode,
                padding: j.padding,
                blockSize: k.blockSize,
                formatter: A.format,
              })
            },
            decrypt: function (k, C, F, A) {
              ;((A = this.cfg.extend(A)), (C = this._parse(C, A.format)))
              var $ = k.createDecryptor(F, A).finalize(C.ciphertext)
              return $
            },
            _parse: function (k, C) {
              return typeof k == "string" ? C.parse(k, this) : k
            },
          })),
          E = (r.kdf = {}),
          S = (E.OpenSSL = {
            execute: function (k, C, F, A, $) {
              if ((A || (A = n.random(64 / 8)), $))
                var O = u.create({ keySize: C + F, hasher: $ }).compute(k, A)
              else var O = u.create({ keySize: C + F }).compute(k, A)
              var j = n.create(O.words.slice(C), F * 4)
              return (
                (O.sigBytes = C * 4),
                v.create({ key: O, iv: j, salt: A })
              )
            },
          }),
          D = (i.PasswordBasedCipher = P.extend({
            cfg: P.cfg.extend({ kdf: S }),
            encrypt: function (k, C, F, A) {
              A = this.cfg.extend(A)
              var $ = A.kdf.execute(F, k.keySize, k.ivSize, A.salt, A.hasher)
              A.iv = $.iv
              var O = P.encrypt.call(this, k, C, $.key, A)
              return (O.mixIn($), O)
            },
            decrypt: function (k, C, F, A) {
              ;((A = this.cfg.extend(A)), (C = this._parse(C, A.format)))
              var $ = A.kdf.execute(F, k.keySize, k.ivSize, C.salt, A.hasher)
              A.iv = $.iv
              var O = P.decrypt.call(this, k, C, $.key, A)
              return O
            },
          }))
      })()
  })
})
var kc = N((Ii, bc) => {
  ;(function (t, e, r) {
    typeof Ii == "object"
      ? (bc.exports = Ii = e(M(), oe()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./cipher-core"], e)
        : e(t.CryptoJS)
  })(Ii, function (t) {
    return (
      (t.mode.CFB = (function () {
        var e = t.lib.BlockCipherMode.extend()
        ;((e.Encryptor = e.extend({
          processBlock: function (i, s) {
            var n = this._cipher,
              a = n.blockSize
            ;(r.call(this, i, s, a, n), (this._prevBlock = i.slice(s, s + a)))
          },
        })),
          (e.Decryptor = e.extend({
            processBlock: function (i, s) {
              var n = this._cipher,
                a = n.blockSize,
                o = i.slice(s, s + a)
              ;(r.call(this, i, s, a, n), (this._prevBlock = o))
            },
          })))
        function r(i, s, n, a) {
          var o,
            c = this._iv
          ;(c ? ((o = c.slice(0)), (this._iv = void 0)) : (o = this._prevBlock),
            a.encryptBlock(o, 0))
          for (var d = 0; d < n; d++) i[s + d] ^= o[d]
        }
        return e
      })()),
      t.mode.CFB
    )
  })
})
var Pc = N((Ri, Sc) => {
  ;(function (t, e, r) {
    typeof Ri == "object"
      ? (Sc.exports = Ri = e(M(), oe()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./cipher-core"], e)
        : e(t.CryptoJS)
  })(Ri, function (t) {
    return (
      (t.mode.CTR = (function () {
        var e = t.lib.BlockCipherMode.extend(),
          r = (e.Encryptor = e.extend({
            processBlock: function (i, s) {
              var n = this._cipher,
                a = n.blockSize,
                o = this._iv,
                c = this._counter
              o && ((c = this._counter = o.slice(0)), (this._iv = void 0))
              var d = c.slice(0)
              ;(n.encryptBlock(d, 0), (c[a - 1] = (c[a - 1] + 1) | 0))
              for (var l = 0; l < a; l++) i[s + l] ^= d[l]
            },
          }))
        return ((e.Decryptor = r), e)
      })()),
      t.mode.CTR
    )
  })
})
var Cc = N((Bi, Ac) => {
  ;(function (t, e, r) {
    typeof Bi == "object"
      ? (Ac.exports = Bi = e(M(), oe()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./cipher-core"], e)
        : e(t.CryptoJS)
  })(Bi, function (t) {
    return (
      (t.mode.CTRGladman = (function () {
        var e = t.lib.BlockCipherMode.extend()
        function r(n) {
          if (((n >> 24) & 255) === 255) {
            var a = (n >> 16) & 255,
              o = (n >> 8) & 255,
              c = n & 255
            ;(a === 255
              ? ((a = 0),
                o === 255 ? ((o = 0), c === 255 ? (c = 0) : ++c) : ++o)
              : ++a,
              (n = 0),
              (n += a << 16),
              (n += o << 8),
              (n += c))
          } else n += 1 << 24
          return n
        }
        function i(n) {
          return ((n[0] = r(n[0])) === 0 && (n[1] = r(n[1])), n)
        }
        var s = (e.Encryptor = e.extend({
          processBlock: function (n, a) {
            var o = this._cipher,
              c = o.blockSize,
              d = this._iv,
              l = this._counter
            ;(d && ((l = this._counter = d.slice(0)), (this._iv = void 0)),
              i(l))
            var u = l.slice(0)
            o.encryptBlock(u, 0)
            for (var p = 0; p < c; p++) n[a + p] ^= u[p]
          },
        }))
        return ((e.Decryptor = s), e)
      })()),
      t.mode.CTRGladman
    )
  })
})
var Dc = N((Ui, Ec) => {
  ;(function (t, e, r) {
    typeof Ui == "object"
      ? (Ec.exports = Ui = e(M(), oe()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./cipher-core"], e)
        : e(t.CryptoJS)
  })(Ui, function (t) {
    return (
      (t.mode.OFB = (function () {
        var e = t.lib.BlockCipherMode.extend(),
          r = (e.Encryptor = e.extend({
            processBlock: function (i, s) {
              var n = this._cipher,
                a = n.blockSize,
                o = this._iv,
                c = this._keystream
              ;(o && ((c = this._keystream = o.slice(0)), (this._iv = void 0)),
                n.encryptBlock(c, 0))
              for (var d = 0; d < a; d++) i[s + d] ^= c[d]
            },
          }))
        return ((e.Decryptor = r), e)
      })()),
      t.mode.OFB
    )
  })
})
var Fc = N(($i, Tc) => {
  ;(function (t, e, r) {
    typeof $i == "object"
      ? (Tc.exports = $i = e(M(), oe()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./cipher-core"], e)
        : e(t.CryptoJS)
  })($i, function (t) {
    return (
      (t.mode.ECB = (function () {
        var e = t.lib.BlockCipherMode.extend()
        return (
          (e.Encryptor = e.extend({
            processBlock: function (r, i) {
              this._cipher.encryptBlock(r, i)
            },
          })),
          (e.Decryptor = e.extend({
            processBlock: function (r, i) {
              this._cipher.decryptBlock(r, i)
            },
          })),
          e
        )
      })()),
      t.mode.ECB
    )
  })
})
var Rc = N((Oi, Ic) => {
  ;(function (t, e, r) {
    typeof Oi == "object"
      ? (Ic.exports = Oi = e(M(), oe()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./cipher-core"], e)
        : e(t.CryptoJS)
  })(Oi, function (t) {
    return (
      (t.pad.AnsiX923 = {
        pad: function (e, r) {
          var i = e.sigBytes,
            s = r * 4,
            n = s - (i % s),
            a = i + n - 1
          ;(e.clamp(),
            (e.words[a >>> 2] |= n << (24 - (a % 4) * 8)),
            (e.sigBytes += n))
        },
        unpad: function (e) {
          var r = e.words[(e.sigBytes - 1) >>> 2] & 255
          e.sigBytes -= r
        },
      }),
      t.pad.Ansix923
    )
  })
})
var Uc = N((qi, Bc) => {
  ;(function (t, e, r) {
    typeof qi == "object"
      ? (Bc.exports = qi = e(M(), oe()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./cipher-core"], e)
        : e(t.CryptoJS)
  })(qi, function (t) {
    return (
      (t.pad.Iso10126 = {
        pad: function (e, r) {
          var i = r * 4,
            s = i - (e.sigBytes % i)
          e.concat(t.lib.WordArray.random(s - 1)).concat(
            t.lib.WordArray.create([s << 24], 1),
          )
        },
        unpad: function (e) {
          var r = e.words[(e.sigBytes - 1) >>> 2] & 255
          e.sigBytes -= r
        },
      }),
      t.pad.Iso10126
    )
  })
})
var Oc = N((ji, $c) => {
  ;(function (t, e, r) {
    typeof ji == "object"
      ? ($c.exports = ji = e(M(), oe()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./cipher-core"], e)
        : e(t.CryptoJS)
  })(ji, function (t) {
    return (
      (t.pad.Iso97971 = {
        pad: function (e, r) {
          ;(e.concat(t.lib.WordArray.create([2147483648], 1)),
            t.pad.ZeroPadding.pad(e, r))
        },
        unpad: function (e) {
          ;(t.pad.ZeroPadding.unpad(e), e.sigBytes--)
        },
      }),
      t.pad.Iso97971
    )
  })
})
var jc = N((zi, qc) => {
  ;(function (t, e, r) {
    typeof zi == "object"
      ? (qc.exports = zi = e(M(), oe()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./cipher-core"], e)
        : e(t.CryptoJS)
  })(zi, function (t) {
    return (
      (t.pad.ZeroPadding = {
        pad: function (e, r) {
          var i = r * 4
          ;(e.clamp(), (e.sigBytes += i - (e.sigBytes % i || i)))
        },
        unpad: function (e) {
          for (
            var r = e.words, i = e.sigBytes - 1, i = e.sigBytes - 1;
            i >= 0;
            i--
          )
            if ((r[i >>> 2] >>> (24 - (i % 4) * 8)) & 255) {
              e.sigBytes = i + 1
              break
            }
        },
      }),
      t.pad.ZeroPadding
    )
  })
})
var Lc = N((Li, zc) => {
  ;(function (t, e, r) {
    typeof Li == "object"
      ? (zc.exports = Li = e(M(), oe()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./cipher-core"], e)
        : e(t.CryptoJS)
  })(Li, function (t) {
    return (
      (t.pad.NoPadding = { pad: function () {}, unpad: function () {} }),
      t.pad.NoPadding
    )
  })
})
var Mc = N((Ni, Nc) => {
  ;(function (t, e, r) {
    typeof Ni == "object"
      ? (Nc.exports = Ni = e(M(), oe()))
      : typeof define == "function" && define.amd
        ? define(["./core", "./cipher-core"], e)
        : e(t.CryptoJS)
  })(Ni, function (t) {
    return (
      (function (e) {
        var r = t,
          i = r.lib,
          s = i.CipherParams,
          n = r.enc,
          a = n.Hex,
          o = r.format,
          c = (o.Hex = {
            stringify: function (d) {
              return d.ciphertext.toString(a)
            },
            parse: function (d) {
              var l = a.parse(d)
              return s.create({ ciphertext: l })
            },
          })
      })(),
      t.format.Hex
    )
  })
})
var Kc = N((Mi, Hc) => {
  ;(function (t, e, r) {
    typeof Mi == "object"
      ? (Hc.exports = Mi = e(M(), ot(), ct(), Ve(), oe()))
      : typeof define == "function" && define.amd
        ? define(
            ["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"],
            e,
          )
        : e(t.CryptoJS)
  })(Mi, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.BlockCipher,
          s = e.algo,
          n = [],
          a = [],
          o = [],
          c = [],
          d = [],
          l = [],
          u = [],
          p = [],
          f = [],
          h = []
        ;(function () {
          for (var g = [], m = 0; m < 256; m++)
            m < 128 ? (g[m] = m << 1) : (g[m] = (m << 1) ^ 283)
          for (var w = 0, v = 0, m = 0; m < 256; m++) {
            var _ = v ^ (v << 1) ^ (v << 2) ^ (v << 3) ^ (v << 4)
            ;((_ = (_ >>> 8) ^ (_ & 255) ^ 99), (n[w] = _), (a[_] = w))
            var b = g[w],
              P = g[b],
              E = g[P],
              S = (g[_] * 257) ^ (_ * 16843008)
            ;((o[w] = (S << 24) | (S >>> 8)),
              (c[w] = (S << 16) | (S >>> 16)),
              (d[w] = (S << 8) | (S >>> 24)),
              (l[w] = S))
            var S = (E * 16843009) ^ (P * 65537) ^ (b * 257) ^ (w * 16843008)
            ;((u[_] = (S << 24) | (S >>> 8)),
              (p[_] = (S << 16) | (S >>> 16)),
              (f[_] = (S << 8) | (S >>> 24)),
              (h[_] = S),
              w ? ((w = b ^ g[g[g[E ^ b]]]), (v ^= g[g[v]])) : (w = v = 1))
          }
        })()
        var y = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
          x = (s.AES = i.extend({
            _doReset: function () {
              var g
              if (!(this._nRounds && this._keyPriorReset === this._key)) {
                for (
                  var m = (this._keyPriorReset = this._key),
                    w = m.words,
                    v = m.sigBytes / 4,
                    _ = (this._nRounds = v + 6),
                    b = (_ + 1) * 4,
                    P = (this._keySchedule = []),
                    E = 0;
                  E < b;
                  E++
                )
                  E < v
                    ? (P[E] = w[E])
                    : ((g = P[E - 1]),
                      E % v
                        ? v > 6 &&
                          E % v == 4 &&
                          (g =
                            (n[g >>> 24] << 24) |
                            (n[(g >>> 16) & 255] << 16) |
                            (n[(g >>> 8) & 255] << 8) |
                            n[g & 255])
                        : ((g = (g << 8) | (g >>> 24)),
                          (g =
                            (n[g >>> 24] << 24) |
                            (n[(g >>> 16) & 255] << 16) |
                            (n[(g >>> 8) & 255] << 8) |
                            n[g & 255]),
                          (g ^= y[(E / v) | 0] << 24)),
                      (P[E] = P[E - v] ^ g))
                for (var S = (this._invKeySchedule = []), D = 0; D < b; D++) {
                  var E = b - D
                  if (D % 4) var g = P[E]
                  else var g = P[E - 4]
                  D < 4 || E <= 4
                    ? (S[D] = g)
                    : (S[D] =
                        u[n[g >>> 24]] ^
                        p[n[(g >>> 16) & 255]] ^
                        f[n[(g >>> 8) & 255]] ^
                        h[n[g & 255]])
                }
              }
            },
            encryptBlock: function (g, m) {
              this._doCryptBlock(g, m, this._keySchedule, o, c, d, l, n)
            },
            decryptBlock: function (g, m) {
              var w = g[m + 1]
              ;((g[m + 1] = g[m + 3]),
                (g[m + 3] = w),
                this._doCryptBlock(g, m, this._invKeySchedule, u, p, f, h, a))
              var w = g[m + 1]
              ;((g[m + 1] = g[m + 3]), (g[m + 3] = w))
            },
            _doCryptBlock: function (g, m, w, v, _, b, P, E) {
              for (
                var S = this._nRounds,
                  D = g[m] ^ w[0],
                  k = g[m + 1] ^ w[1],
                  C = g[m + 2] ^ w[2],
                  F = g[m + 3] ^ w[3],
                  A = 4,
                  $ = 1;
                $ < S;
                $++
              ) {
                var O =
                    v[D >>> 24] ^
                    _[(k >>> 16) & 255] ^
                    b[(C >>> 8) & 255] ^
                    P[F & 255] ^
                    w[A++],
                  j =
                    v[k >>> 24] ^
                    _[(C >>> 16) & 255] ^
                    b[(F >>> 8) & 255] ^
                    P[D & 255] ^
                    w[A++],
                  H =
                    v[C >>> 24] ^
                    _[(F >>> 16) & 255] ^
                    b[(D >>> 8) & 255] ^
                    P[k & 255] ^
                    w[A++],
                  T =
                    v[F >>> 24] ^
                    _[(D >>> 16) & 255] ^
                    b[(k >>> 8) & 255] ^
                    P[C & 255] ^
                    w[A++]
                ;((D = O), (k = j), (C = H), (F = T))
              }
              var O =
                  ((E[D >>> 24] << 24) |
                    (E[(k >>> 16) & 255] << 16) |
                    (E[(C >>> 8) & 255] << 8) |
                    E[F & 255]) ^
                  w[A++],
                j =
                  ((E[k >>> 24] << 24) |
                    (E[(C >>> 16) & 255] << 16) |
                    (E[(F >>> 8) & 255] << 8) |
                    E[D & 255]) ^
                  w[A++],
                H =
                  ((E[C >>> 24] << 24) |
                    (E[(F >>> 16) & 255] << 16) |
                    (E[(D >>> 8) & 255] << 8) |
                    E[k & 255]) ^
                  w[A++],
                T =
                  ((E[F >>> 24] << 24) |
                    (E[(D >>> 16) & 255] << 16) |
                    (E[(k >>> 8) & 255] << 8) |
                    E[C & 255]) ^
                  w[A++]
              ;((g[m] = O), (g[m + 1] = j), (g[m + 2] = H), (g[m + 3] = T))
            },
            keySize: 256 / 32,
          }))
        e.AES = i._createHelper(x)
      })(),
      t.AES
    )
  })
})
var Vc = N((Hi, Wc) => {
  ;(function (t, e, r) {
    typeof Hi == "object"
      ? (Wc.exports = Hi = e(M(), ot(), ct(), Ve(), oe()))
      : typeof define == "function" && define.amd
        ? define(
            ["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"],
            e,
          )
        : e(t.CryptoJS)
  })(Hi, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.WordArray,
          s = r.BlockCipher,
          n = e.algo,
          a = [
            57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51,
            43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15,
            7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28,
            20, 12, 4,
          ],
          o = [
            14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8,
            16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33,
            48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32,
          ],
          c = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
          d = [
            {
              0: 8421888,
              268435456: 32768,
              536870912: 8421378,
              805306368: 2,
              1073741824: 512,
              1342177280: 8421890,
              1610612736: 8389122,
              1879048192: 8388608,
              2147483648: 514,
              2415919104: 8389120,
              2684354560: 33280,
              2952790016: 8421376,
              3221225472: 32770,
              3489660928: 8388610,
              3758096384: 0,
              4026531840: 33282,
              134217728: 0,
              402653184: 8421890,
              671088640: 33282,
              939524096: 32768,
              1207959552: 8421888,
              1476395008: 512,
              1744830464: 8421378,
              2013265920: 2,
              2281701376: 8389120,
              2550136832: 33280,
              2818572288: 8421376,
              3087007744: 8389122,
              3355443200: 8388610,
              3623878656: 32770,
              3892314112: 514,
              4160749568: 8388608,
              1: 32768,
              268435457: 2,
              536870913: 8421888,
              805306369: 8388608,
              1073741825: 8421378,
              1342177281: 33280,
              1610612737: 512,
              1879048193: 8389122,
              2147483649: 8421890,
              2415919105: 8421376,
              2684354561: 8388610,
              2952790017: 33282,
              3221225473: 514,
              3489660929: 8389120,
              3758096385: 32770,
              4026531841: 0,
              134217729: 8421890,
              402653185: 8421376,
              671088641: 8388608,
              939524097: 512,
              1207959553: 32768,
              1476395009: 8388610,
              1744830465: 2,
              2013265921: 33282,
              2281701377: 32770,
              2550136833: 8389122,
              2818572289: 514,
              3087007745: 8421888,
              3355443201: 8389120,
              3623878657: 0,
              3892314113: 33280,
              4160749569: 8421378,
            },
            {
              0: 1074282512,
              16777216: 16384,
              33554432: 524288,
              50331648: 1074266128,
              67108864: 1073741840,
              83886080: 1074282496,
              100663296: 1073758208,
              117440512: 16,
              134217728: 540672,
              150994944: 1073758224,
              167772160: 1073741824,
              184549376: 540688,
              201326592: 524304,
              218103808: 0,
              234881024: 16400,
              251658240: 1074266112,
              8388608: 1073758208,
              25165824: 540688,
              41943040: 16,
              58720256: 1073758224,
              75497472: 1074282512,
              92274688: 1073741824,
              109051904: 524288,
              125829120: 1074266128,
              142606336: 524304,
              159383552: 0,
              176160768: 16384,
              192937984: 1074266112,
              209715200: 1073741840,
              226492416: 540672,
              243269632: 1074282496,
              260046848: 16400,
              268435456: 0,
              285212672: 1074266128,
              301989888: 1073758224,
              318767104: 1074282496,
              335544320: 1074266112,
              352321536: 16,
              369098752: 540688,
              385875968: 16384,
              402653184: 16400,
              419430400: 524288,
              436207616: 524304,
              452984832: 1073741840,
              469762048: 540672,
              486539264: 1073758208,
              503316480: 1073741824,
              520093696: 1074282512,
              276824064: 540688,
              293601280: 524288,
              310378496: 1074266112,
              327155712: 16384,
              343932928: 1073758208,
              360710144: 1074282512,
              377487360: 16,
              394264576: 1073741824,
              411041792: 1074282496,
              427819008: 1073741840,
              444596224: 1073758224,
              461373440: 524304,
              478150656: 0,
              494927872: 16400,
              511705088: 1074266128,
              528482304: 540672,
            },
            {
              0: 260,
              1048576: 0,
              2097152: 67109120,
              3145728: 65796,
              4194304: 65540,
              5242880: 67108868,
              6291456: 67174660,
              7340032: 67174400,
              8388608: 67108864,
              9437184: 67174656,
              10485760: 65792,
              11534336: 67174404,
              12582912: 67109124,
              13631488: 65536,
              14680064: 4,
              15728640: 256,
              524288: 67174656,
              1572864: 67174404,
              2621440: 0,
              3670016: 67109120,
              4718592: 67108868,
              5767168: 65536,
              6815744: 65540,
              7864320: 260,
              8912896: 4,
              9961472: 256,
              11010048: 67174400,
              12058624: 65796,
              13107200: 65792,
              14155776: 67109124,
              15204352: 67174660,
              16252928: 67108864,
              16777216: 67174656,
              17825792: 65540,
              18874368: 65536,
              19922944: 67109120,
              20971520: 256,
              22020096: 67174660,
              23068672: 67108868,
              24117248: 0,
              25165824: 67109124,
              26214400: 67108864,
              27262976: 4,
              28311552: 65792,
              29360128: 67174400,
              30408704: 260,
              31457280: 65796,
              32505856: 67174404,
              17301504: 67108864,
              18350080: 260,
              19398656: 67174656,
              20447232: 0,
              21495808: 65540,
              22544384: 67109120,
              23592960: 256,
              24641536: 67174404,
              25690112: 65536,
              26738688: 67174660,
              27787264: 65796,
              28835840: 67108868,
              29884416: 67109124,
              30932992: 67174400,
              31981568: 4,
              33030144: 65792,
            },
            {
              0: 2151682048,
              65536: 2147487808,
              131072: 4198464,
              196608: 2151677952,
              262144: 0,
              327680: 4198400,
              393216: 2147483712,
              458752: 4194368,
              524288: 2147483648,
              589824: 4194304,
              655360: 64,
              720896: 2147487744,
              786432: 2151678016,
              851968: 4160,
              917504: 4096,
              983040: 2151682112,
              32768: 2147487808,
              98304: 64,
              163840: 2151678016,
              229376: 2147487744,
              294912: 4198400,
              360448: 2151682112,
              425984: 0,
              491520: 2151677952,
              557056: 4096,
              622592: 2151682048,
              688128: 4194304,
              753664: 4160,
              819200: 2147483648,
              884736: 4194368,
              950272: 4198464,
              1015808: 2147483712,
              1048576: 4194368,
              1114112: 4198400,
              1179648: 2147483712,
              1245184: 0,
              1310720: 4160,
              1376256: 2151678016,
              1441792: 2151682048,
              1507328: 2147487808,
              1572864: 2151682112,
              1638400: 2147483648,
              1703936: 2151677952,
              1769472: 4198464,
              1835008: 2147487744,
              1900544: 4194304,
              1966080: 64,
              2031616: 4096,
              1081344: 2151677952,
              1146880: 2151682112,
              1212416: 0,
              1277952: 4198400,
              1343488: 4194368,
              1409024: 2147483648,
              1474560: 2147487808,
              1540096: 64,
              1605632: 2147483712,
              1671168: 4096,
              1736704: 2147487744,
              1802240: 2151678016,
              1867776: 4160,
              1933312: 2151682048,
              1998848: 4194304,
              2064384: 4198464,
            },
            {
              0: 128,
              4096: 17039360,
              8192: 262144,
              12288: 536870912,
              16384: 537133184,
              20480: 16777344,
              24576: 553648256,
              28672: 262272,
              32768: 16777216,
              36864: 537133056,
              40960: 536871040,
              45056: 553910400,
              49152: 553910272,
              53248: 0,
              57344: 17039488,
              61440: 553648128,
              2048: 17039488,
              6144: 553648256,
              10240: 128,
              14336: 17039360,
              18432: 262144,
              22528: 537133184,
              26624: 553910272,
              30720: 536870912,
              34816: 537133056,
              38912: 0,
              43008: 553910400,
              47104: 16777344,
              51200: 536871040,
              55296: 553648128,
              59392: 16777216,
              63488: 262272,
              65536: 262144,
              69632: 128,
              73728: 536870912,
              77824: 553648256,
              81920: 16777344,
              86016: 553910272,
              90112: 537133184,
              94208: 16777216,
              98304: 553910400,
              102400: 553648128,
              106496: 17039360,
              110592: 537133056,
              114688: 262272,
              118784: 536871040,
              122880: 0,
              126976: 17039488,
              67584: 553648256,
              71680: 16777216,
              75776: 17039360,
              79872: 537133184,
              83968: 536870912,
              88064: 17039488,
              92160: 128,
              96256: 553910272,
              100352: 262272,
              104448: 553910400,
              108544: 0,
              112640: 553648128,
              116736: 16777344,
              120832: 262144,
              124928: 537133056,
              129024: 536871040,
            },
            {
              0: 268435464,
              256: 8192,
              512: 270532608,
              768: 270540808,
              1024: 268443648,
              1280: 2097152,
              1536: 2097160,
              1792: 268435456,
              2048: 0,
              2304: 268443656,
              2560: 2105344,
              2816: 8,
              3072: 270532616,
              3328: 2105352,
              3584: 8200,
              3840: 270540800,
              128: 270532608,
              384: 270540808,
              640: 8,
              896: 2097152,
              1152: 2105352,
              1408: 268435464,
              1664: 268443648,
              1920: 8200,
              2176: 2097160,
              2432: 8192,
              2688: 268443656,
              2944: 270532616,
              3200: 0,
              3456: 270540800,
              3712: 2105344,
              3968: 268435456,
              4096: 268443648,
              4352: 270532616,
              4608: 270540808,
              4864: 8200,
              5120: 2097152,
              5376: 268435456,
              5632: 268435464,
              5888: 2105344,
              6144: 2105352,
              6400: 0,
              6656: 8,
              6912: 270532608,
              7168: 8192,
              7424: 268443656,
              7680: 270540800,
              7936: 2097160,
              4224: 8,
              4480: 2105344,
              4736: 2097152,
              4992: 268435464,
              5248: 268443648,
              5504: 8200,
              5760: 270540808,
              6016: 270532608,
              6272: 270540800,
              6528: 270532616,
              6784: 8192,
              7040: 2105352,
              7296: 2097160,
              7552: 0,
              7808: 268435456,
              8064: 268443656,
            },
            {
              0: 1048576,
              16: 33555457,
              32: 1024,
              48: 1049601,
              64: 34604033,
              80: 0,
              96: 1,
              112: 34603009,
              128: 33555456,
              144: 1048577,
              160: 33554433,
              176: 34604032,
              192: 34603008,
              208: 1025,
              224: 1049600,
              240: 33554432,
              8: 34603009,
              24: 0,
              40: 33555457,
              56: 34604032,
              72: 1048576,
              88: 33554433,
              104: 33554432,
              120: 1025,
              136: 1049601,
              152: 33555456,
              168: 34603008,
              184: 1048577,
              200: 1024,
              216: 34604033,
              232: 1,
              248: 1049600,
              256: 33554432,
              272: 1048576,
              288: 33555457,
              304: 34603009,
              320: 1048577,
              336: 33555456,
              352: 34604032,
              368: 1049601,
              384: 1025,
              400: 34604033,
              416: 1049600,
              432: 1,
              448: 0,
              464: 34603008,
              480: 33554433,
              496: 1024,
              264: 1049600,
              280: 33555457,
              296: 34603009,
              312: 1,
              328: 33554432,
              344: 1048576,
              360: 1025,
              376: 34604032,
              392: 33554433,
              408: 34603008,
              424: 0,
              440: 34604033,
              456: 1049601,
              472: 1024,
              488: 33555456,
              504: 1048577,
            },
            {
              0: 134219808,
              1: 131072,
              2: 134217728,
              3: 32,
              4: 131104,
              5: 134350880,
              6: 134350848,
              7: 2048,
              8: 134348800,
              9: 134219776,
              10: 133120,
              11: 134348832,
              12: 2080,
              13: 0,
              14: 134217760,
              15: 133152,
              2147483648: 2048,
              2147483649: 134350880,
              2147483650: 134219808,
              2147483651: 134217728,
              2147483652: 134348800,
              2147483653: 133120,
              2147483654: 133152,
              2147483655: 32,
              2147483656: 134217760,
              2147483657: 2080,
              2147483658: 131104,
              2147483659: 134350848,
              2147483660: 0,
              2147483661: 134348832,
              2147483662: 134219776,
              2147483663: 131072,
              16: 133152,
              17: 134350848,
              18: 32,
              19: 2048,
              20: 134219776,
              21: 134217760,
              22: 134348832,
              23: 131072,
              24: 0,
              25: 131104,
              26: 134348800,
              27: 134219808,
              28: 134350880,
              29: 133120,
              30: 2080,
              31: 134217728,
              2147483664: 131072,
              2147483665: 2048,
              2147483666: 134348832,
              2147483667: 133152,
              2147483668: 32,
              2147483669: 134348800,
              2147483670: 134217728,
              2147483671: 134219808,
              2147483672: 134350880,
              2147483673: 134217760,
              2147483674: 134219776,
              2147483675: 0,
              2147483676: 133120,
              2147483677: 2080,
              2147483678: 131104,
              2147483679: 134350848,
            },
          ],
          l = [
            4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504,
            2147483679,
          ],
          u = (n.DES = s.extend({
            _doReset: function () {
              for (var y = this._key, x = y.words, g = [], m = 0; m < 56; m++) {
                var w = a[m] - 1
                g[m] = (x[w >>> 5] >>> (31 - (w % 32))) & 1
              }
              for (var v = (this._subKeys = []), _ = 0; _ < 16; _++) {
                for (var b = (v[_] = []), P = c[_], m = 0; m < 24; m++)
                  ((b[(m / 6) | 0] |= g[(o[m] - 1 + P) % 28] << (31 - (m % 6))),
                    (b[4 + ((m / 6) | 0)] |=
                      g[28 + ((o[m + 24] - 1 + P) % 28)] << (31 - (m % 6))))
                b[0] = (b[0] << 1) | (b[0] >>> 31)
                for (var m = 1; m < 7; m++) b[m] = b[m] >>> ((m - 1) * 4 + 3)
                b[7] = (b[7] << 5) | (b[7] >>> 27)
              }
              for (var E = (this._invSubKeys = []), m = 0; m < 16; m++)
                E[m] = v[15 - m]
            },
            encryptBlock: function (y, x) {
              this._doCryptBlock(y, x, this._subKeys)
            },
            decryptBlock: function (y, x) {
              this._doCryptBlock(y, x, this._invSubKeys)
            },
            _doCryptBlock: function (y, x, g) {
              ;((this._lBlock = y[x]),
                (this._rBlock = y[x + 1]),
                p.call(this, 4, 252645135),
                p.call(this, 16, 65535),
                f.call(this, 2, 858993459),
                f.call(this, 8, 16711935),
                p.call(this, 1, 1431655765))
              for (var m = 0; m < 16; m++) {
                for (
                  var w = g[m],
                    v = this._lBlock,
                    _ = this._rBlock,
                    b = 0,
                    P = 0;
                  P < 8;
                  P++
                )
                  b |= d[P][((_ ^ w[P]) & l[P]) >>> 0]
                ;((this._lBlock = _), (this._rBlock = v ^ b))
              }
              var E = this._lBlock
              ;((this._lBlock = this._rBlock),
                (this._rBlock = E),
                p.call(this, 1, 1431655765),
                f.call(this, 8, 16711935),
                f.call(this, 2, 858993459),
                p.call(this, 16, 65535),
                p.call(this, 4, 252645135),
                (y[x] = this._lBlock),
                (y[x + 1] = this._rBlock))
            },
            keySize: 64 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32,
          }))
        function p(y, x) {
          var g = ((this._lBlock >>> y) ^ this._rBlock) & x
          ;((this._rBlock ^= g), (this._lBlock ^= g << y))
        }
        function f(y, x) {
          var g = ((this._rBlock >>> y) ^ this._lBlock) & x
          ;((this._lBlock ^= g), (this._rBlock ^= g << y))
        }
        e.DES = s._createHelper(u)
        var h = (n.TripleDES = s.extend({
          _doReset: function () {
            var y = this._key,
              x = y.words
            if (x.length !== 2 && x.length !== 4 && x.length < 6)
              throw new Error(
                "Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.",
              )
            var g = x.slice(0, 2),
              m = x.length < 4 ? x.slice(0, 2) : x.slice(2, 4),
              w = x.length < 6 ? x.slice(0, 2) : x.slice(4, 6)
            ;((this._des1 = u.createEncryptor(i.create(g))),
              (this._des2 = u.createEncryptor(i.create(m))),
              (this._des3 = u.createEncryptor(i.create(w))))
          },
          encryptBlock: function (y, x) {
            ;(this._des1.encryptBlock(y, x),
              this._des2.decryptBlock(y, x),
              this._des3.encryptBlock(y, x))
          },
          decryptBlock: function (y, x) {
            ;(this._des3.decryptBlock(y, x),
              this._des2.encryptBlock(y, x),
              this._des1.decryptBlock(y, x))
          },
          keySize: 192 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32,
        }))
        e.TripleDES = s._createHelper(h)
      })(),
      t.TripleDES
    )
  })
})
var Jc = N((Ki, Gc) => {
  ;(function (t, e, r) {
    typeof Ki == "object"
      ? (Gc.exports = Ki = e(M(), ot(), ct(), Ve(), oe()))
      : typeof define == "function" && define.amd
        ? define(
            ["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"],
            e,
          )
        : e(t.CryptoJS)
  })(Ki, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.StreamCipher,
          s = e.algo,
          n = (s.RC4 = i.extend({
            _doReset: function () {
              for (
                var c = this._key,
                  d = c.words,
                  l = c.sigBytes,
                  u = (this._S = []),
                  p = 0;
                p < 256;
                p++
              )
                u[p] = p
              for (var p = 0, f = 0; p < 256; p++) {
                var h = p % l,
                  y = (d[h >>> 2] >>> (24 - (h % 4) * 8)) & 255
                f = (f + u[p] + y) % 256
                var x = u[p]
                ;((u[p] = u[f]), (u[f] = x))
              }
              this._i = this._j = 0
            },
            _doProcessBlock: function (c, d) {
              c[d] ^= a.call(this)
            },
            keySize: 256 / 32,
            ivSize: 0,
          }))
        function a() {
          for (
            var c = this._S, d = this._i, l = this._j, u = 0, p = 0;
            p < 4;
            p++
          ) {
            ;((d = (d + 1) % 256), (l = (l + c[d]) % 256))
            var f = c[d]
            ;((c[d] = c[l]),
              (c[l] = f),
              (u |= c[(c[d] + c[l]) % 256] << (24 - p * 8)))
          }
          return ((this._i = d), (this._j = l), u)
        }
        e.RC4 = i._createHelper(n)
        var o = (s.RC4Drop = n.extend({
          cfg: n.cfg.extend({ drop: 192 }),
          _doReset: function () {
            n._doReset.call(this)
            for (var c = this.cfg.drop; c > 0; c--) a.call(this)
          },
        }))
        e.RC4Drop = i._createHelper(o)
      })(),
      t.RC4
    )
  })
})
var Xc = N((Wi, Qc) => {
  ;(function (t, e, r) {
    typeof Wi == "object"
      ? (Qc.exports = Wi = e(M(), ot(), ct(), Ve(), oe()))
      : typeof define == "function" && define.amd
        ? define(
            ["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"],
            e,
          )
        : e(t.CryptoJS)
  })(Wi, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.StreamCipher,
          s = e.algo,
          n = [],
          a = [],
          o = [],
          c = (s.Rabbit = i.extend({
            _doReset: function () {
              for (var l = this._key.words, u = this.cfg.iv, p = 0; p < 4; p++)
                l[p] =
                  (((l[p] << 8) | (l[p] >>> 24)) & 16711935) |
                  (((l[p] << 24) | (l[p] >>> 8)) & 4278255360)
              var f = (this._X = [
                  l[0],
                  (l[3] << 16) | (l[2] >>> 16),
                  l[1],
                  (l[0] << 16) | (l[3] >>> 16),
                  l[2],
                  (l[1] << 16) | (l[0] >>> 16),
                  l[3],
                  (l[2] << 16) | (l[1] >>> 16),
                ]),
                h = (this._C = [
                  (l[2] << 16) | (l[2] >>> 16),
                  (l[0] & 4294901760) | (l[1] & 65535),
                  (l[3] << 16) | (l[3] >>> 16),
                  (l[1] & 4294901760) | (l[2] & 65535),
                  (l[0] << 16) | (l[0] >>> 16),
                  (l[2] & 4294901760) | (l[3] & 65535),
                  (l[1] << 16) | (l[1] >>> 16),
                  (l[3] & 4294901760) | (l[0] & 65535),
                ])
              this._b = 0
              for (var p = 0; p < 4; p++) d.call(this)
              for (var p = 0; p < 8; p++) h[p] ^= f[(p + 4) & 7]
              if (u) {
                var y = u.words,
                  x = y[0],
                  g = y[1],
                  m =
                    (((x << 8) | (x >>> 24)) & 16711935) |
                    (((x << 24) | (x >>> 8)) & 4278255360),
                  w =
                    (((g << 8) | (g >>> 24)) & 16711935) |
                    (((g << 24) | (g >>> 8)) & 4278255360),
                  v = (m >>> 16) | (w & 4294901760),
                  _ = (w << 16) | (m & 65535)
                ;((h[0] ^= m),
                  (h[1] ^= v),
                  (h[2] ^= w),
                  (h[3] ^= _),
                  (h[4] ^= m),
                  (h[5] ^= v),
                  (h[6] ^= w),
                  (h[7] ^= _))
                for (var p = 0; p < 4; p++) d.call(this)
              }
            },
            _doProcessBlock: function (l, u) {
              var p = this._X
              ;(d.call(this),
                (n[0] = p[0] ^ (p[5] >>> 16) ^ (p[3] << 16)),
                (n[1] = p[2] ^ (p[7] >>> 16) ^ (p[5] << 16)),
                (n[2] = p[4] ^ (p[1] >>> 16) ^ (p[7] << 16)),
                (n[3] = p[6] ^ (p[3] >>> 16) ^ (p[1] << 16)))
              for (var f = 0; f < 4; f++)
                ((n[f] =
                  (((n[f] << 8) | (n[f] >>> 24)) & 16711935) |
                  (((n[f] << 24) | (n[f] >>> 8)) & 4278255360)),
                  (l[u + f] ^= n[f]))
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32,
          }))
        function d() {
          for (var l = this._X, u = this._C, p = 0; p < 8; p++) a[p] = u[p]
          ;((u[0] = (u[0] + 1295307597 + this._b) | 0),
            (u[1] =
              (u[1] + 3545052371 + (u[0] >>> 0 < a[0] >>> 0 ? 1 : 0)) | 0),
            (u[2] = (u[2] + 886263092 + (u[1] >>> 0 < a[1] >>> 0 ? 1 : 0)) | 0),
            (u[3] =
              (u[3] + 1295307597 + (u[2] >>> 0 < a[2] >>> 0 ? 1 : 0)) | 0),
            (u[4] =
              (u[4] + 3545052371 + (u[3] >>> 0 < a[3] >>> 0 ? 1 : 0)) | 0),
            (u[5] = (u[5] + 886263092 + (u[4] >>> 0 < a[4] >>> 0 ? 1 : 0)) | 0),
            (u[6] =
              (u[6] + 1295307597 + (u[5] >>> 0 < a[5] >>> 0 ? 1 : 0)) | 0),
            (u[7] =
              (u[7] + 3545052371 + (u[6] >>> 0 < a[6] >>> 0 ? 1 : 0)) | 0),
            (this._b = u[7] >>> 0 < a[7] >>> 0 ? 1 : 0))
          for (var p = 0; p < 8; p++) {
            var f = l[p] + u[p],
              h = f & 65535,
              y = f >>> 16,
              x = ((((h * h) >>> 17) + h * y) >>> 15) + y * y,
              g = (((f & 4294901760) * f) | 0) + (((f & 65535) * f) | 0)
            o[p] = x ^ g
          }
          ;((l[0] =
            (o[0] +
              ((o[7] << 16) | (o[7] >>> 16)) +
              ((o[6] << 16) | (o[6] >>> 16))) |
            0),
            (l[1] = (o[1] + ((o[0] << 8) | (o[0] >>> 24)) + o[7]) | 0),
            (l[2] =
              (o[2] +
                ((o[1] << 16) | (o[1] >>> 16)) +
                ((o[0] << 16) | (o[0] >>> 16))) |
              0),
            (l[3] = (o[3] + ((o[2] << 8) | (o[2] >>> 24)) + o[1]) | 0),
            (l[4] =
              (o[4] +
                ((o[3] << 16) | (o[3] >>> 16)) +
                ((o[2] << 16) | (o[2] >>> 16))) |
              0),
            (l[5] = (o[5] + ((o[4] << 8) | (o[4] >>> 24)) + o[3]) | 0),
            (l[6] =
              (o[6] +
                ((o[5] << 16) | (o[5] >>> 16)) +
                ((o[4] << 16) | (o[4] >>> 16))) |
              0),
            (l[7] = (o[7] + ((o[6] << 8) | (o[6] >>> 24)) + o[5]) | 0))
        }
        e.Rabbit = i._createHelper(c)
      })(),
      t.Rabbit
    )
  })
})
var Yc = N((Vi, Zc) => {
  ;(function (t, e, r) {
    typeof Vi == "object"
      ? (Zc.exports = Vi = e(M(), ot(), ct(), Ve(), oe()))
      : typeof define == "function" && define.amd
        ? define(
            ["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"],
            e,
          )
        : e(t.CryptoJS)
  })(Vi, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.StreamCipher,
          s = e.algo,
          n = [],
          a = [],
          o = [],
          c = (s.RabbitLegacy = i.extend({
            _doReset: function () {
              var l = this._key.words,
                u = this.cfg.iv,
                p = (this._X = [
                  l[0],
                  (l[3] << 16) | (l[2] >>> 16),
                  l[1],
                  (l[0] << 16) | (l[3] >>> 16),
                  l[2],
                  (l[1] << 16) | (l[0] >>> 16),
                  l[3],
                  (l[2] << 16) | (l[1] >>> 16),
                ]),
                f = (this._C = [
                  (l[2] << 16) | (l[2] >>> 16),
                  (l[0] & 4294901760) | (l[1] & 65535),
                  (l[3] << 16) | (l[3] >>> 16),
                  (l[1] & 4294901760) | (l[2] & 65535),
                  (l[0] << 16) | (l[0] >>> 16),
                  (l[2] & 4294901760) | (l[3] & 65535),
                  (l[1] << 16) | (l[1] >>> 16),
                  (l[3] & 4294901760) | (l[0] & 65535),
                ])
              this._b = 0
              for (var h = 0; h < 4; h++) d.call(this)
              for (var h = 0; h < 8; h++) f[h] ^= p[(h + 4) & 7]
              if (u) {
                var y = u.words,
                  x = y[0],
                  g = y[1],
                  m =
                    (((x << 8) | (x >>> 24)) & 16711935) |
                    (((x << 24) | (x >>> 8)) & 4278255360),
                  w =
                    (((g << 8) | (g >>> 24)) & 16711935) |
                    (((g << 24) | (g >>> 8)) & 4278255360),
                  v = (m >>> 16) | (w & 4294901760),
                  _ = (w << 16) | (m & 65535)
                ;((f[0] ^= m),
                  (f[1] ^= v),
                  (f[2] ^= w),
                  (f[3] ^= _),
                  (f[4] ^= m),
                  (f[5] ^= v),
                  (f[6] ^= w),
                  (f[7] ^= _))
                for (var h = 0; h < 4; h++) d.call(this)
              }
            },
            _doProcessBlock: function (l, u) {
              var p = this._X
              ;(d.call(this),
                (n[0] = p[0] ^ (p[5] >>> 16) ^ (p[3] << 16)),
                (n[1] = p[2] ^ (p[7] >>> 16) ^ (p[5] << 16)),
                (n[2] = p[4] ^ (p[1] >>> 16) ^ (p[7] << 16)),
                (n[3] = p[6] ^ (p[3] >>> 16) ^ (p[1] << 16)))
              for (var f = 0; f < 4; f++)
                ((n[f] =
                  (((n[f] << 8) | (n[f] >>> 24)) & 16711935) |
                  (((n[f] << 24) | (n[f] >>> 8)) & 4278255360)),
                  (l[u + f] ^= n[f]))
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32,
          }))
        function d() {
          for (var l = this._X, u = this._C, p = 0; p < 8; p++) a[p] = u[p]
          ;((u[0] = (u[0] + 1295307597 + this._b) | 0),
            (u[1] =
              (u[1] + 3545052371 + (u[0] >>> 0 < a[0] >>> 0 ? 1 : 0)) | 0),
            (u[2] = (u[2] + 886263092 + (u[1] >>> 0 < a[1] >>> 0 ? 1 : 0)) | 0),
            (u[3] =
              (u[3] + 1295307597 + (u[2] >>> 0 < a[2] >>> 0 ? 1 : 0)) | 0),
            (u[4] =
              (u[4] + 3545052371 + (u[3] >>> 0 < a[3] >>> 0 ? 1 : 0)) | 0),
            (u[5] = (u[5] + 886263092 + (u[4] >>> 0 < a[4] >>> 0 ? 1 : 0)) | 0),
            (u[6] =
              (u[6] + 1295307597 + (u[5] >>> 0 < a[5] >>> 0 ? 1 : 0)) | 0),
            (u[7] =
              (u[7] + 3545052371 + (u[6] >>> 0 < a[6] >>> 0 ? 1 : 0)) | 0),
            (this._b = u[7] >>> 0 < a[7] >>> 0 ? 1 : 0))
          for (var p = 0; p < 8; p++) {
            var f = l[p] + u[p],
              h = f & 65535,
              y = f >>> 16,
              x = ((((h * h) >>> 17) + h * y) >>> 15) + y * y,
              g = (((f & 4294901760) * f) | 0) + (((f & 65535) * f) | 0)
            o[p] = x ^ g
          }
          ;((l[0] =
            (o[0] +
              ((o[7] << 16) | (o[7] >>> 16)) +
              ((o[6] << 16) | (o[6] >>> 16))) |
            0),
            (l[1] = (o[1] + ((o[0] << 8) | (o[0] >>> 24)) + o[7]) | 0),
            (l[2] =
              (o[2] +
                ((o[1] << 16) | (o[1] >>> 16)) +
                ((o[0] << 16) | (o[0] >>> 16))) |
              0),
            (l[3] = (o[3] + ((o[2] << 8) | (o[2] >>> 24)) + o[1]) | 0),
            (l[4] =
              (o[4] +
                ((o[3] << 16) | (o[3] >>> 16)) +
                ((o[2] << 16) | (o[2] >>> 16))) |
              0),
            (l[5] = (o[5] + ((o[4] << 8) | (o[4] >>> 24)) + o[3]) | 0),
            (l[6] =
              (o[6] +
                ((o[5] << 16) | (o[5] >>> 16)) +
                ((o[4] << 16) | (o[4] >>> 16))) |
              0),
            (l[7] = (o[7] + ((o[6] << 8) | (o[6] >>> 24)) + o[5]) | 0))
        }
        e.RabbitLegacy = i._createHelper(c)
      })(),
      t.RabbitLegacy
    )
  })
})
var td = N((Gi, ed) => {
  ;(function (t, e, r) {
    typeof Gi == "object"
      ? (ed.exports = Gi = e(M(), ot(), ct(), Ve(), oe()))
      : typeof define == "function" && define.amd
        ? define(
            ["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"],
            e,
          )
        : e(t.CryptoJS)
  })(Gi, function (t) {
    return (
      (function () {
        var e = t,
          r = e.lib,
          i = r.BlockCipher,
          s = e.algo
        let n = 16,
          a = [
            608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832,
            137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300,
            3232508343, 3380367581, 1065670069, 3041331479, 2450970073,
            2306472731,
          ],
          o = [
            [
              3509652390, 2564797868, 805139163, 3491422135, 3101798381,
              1780907670, 3128725573, 4046225305, 614570311, 3012652279,
              134345442, 2240740374, 1667834072, 1901547113, 2757295779,
              4103290238, 227898511, 1921955416, 1904987480, 2182433518,
              2069144605, 3260701109, 2620446009, 720527379, 3318853667,
              677414384, 3393288472, 3101374703, 2390351024, 1614419982,
              1822297739, 2954791486, 3608508353, 3174124327, 2024746970,
              1432378464, 3864339955, 2857741204, 1464375394, 1676153920,
              1439316330, 715854006, 3033291828, 289532110, 2706671279,
              2087905683, 3018724369, 1668267050, 732546397, 1947742710,
              3462151702, 2609353502, 2950085171, 1814351708, 2050118529,
              680887927, 999245976, 1800124847, 3300911131, 1713906067,
              1641548236, 4213287313, 1216130144, 1575780402, 4018429277,
              3917837745, 3693486850, 3949271944, 596196993, 3549867205,
              258830323, 2213823033, 772490370, 2760122372, 1774776394,
              2652871518, 566650946, 4142492826, 1728879713, 2882767088,
              1783734482, 3629395816, 2517608232, 2874225571, 1861159788,
              326777828, 3124490320, 2130389656, 2716951837, 967770486,
              1724537150, 2185432712, 2364442137, 1164943284, 2105845187,
              998989502, 3765401048, 2244026483, 1075463327, 1455516326,
              1322494562, 910128902, 469688178, 1117454909, 936433444,
              3490320968, 3675253459, 1240580251, 122909385, 2157517691,
              634681816, 4142456567, 3825094682, 3061402683, 2540495037,
              79693498, 3249098678, 1084186820, 1583128258, 426386531,
              1761308591, 1047286709, 322548459, 995290223, 1845252383,
              2603652396, 3431023940, 2942221577, 3202600964, 3727903485,
              1712269319, 422464435, 3234572375, 1170764815, 3523960633,
              3117677531, 1434042557, 442511882, 3600875718, 1076654713,
              1738483198, 4213154764, 2393238008, 3677496056, 1014306527,
              4251020053, 793779912, 2902807211, 842905082, 4246964064,
              1395751752, 1040244610, 2656851899, 3396308128, 445077038,
              3742853595, 3577915638, 679411651, 2892444358, 2354009459,
              1767581616, 3150600392, 3791627101, 3102740896, 284835224,
              4246832056, 1258075500, 768725851, 2589189241, 3069724005,
              3532540348, 1274779536, 3789419226, 2764799539, 1660621633,
              3471099624, 4011903706, 913787905, 3497959166, 737222580,
              2514213453, 2928710040, 3937242737, 1804850592, 3499020752,
              2949064160, 2386320175, 2390070455, 2415321851, 4061277028,
              2290661394, 2416832540, 1336762016, 1754252060, 3520065937,
              3014181293, 791618072, 3188594551, 3933548030, 2332172193,
              3852520463, 3043980520, 413987798, 3465142937, 3030929376,
              4245938359, 2093235073, 3534596313, 375366246, 2157278981,
              2479649556, 555357303, 3870105701, 2008414854, 3344188149,
              4221384143, 3956125452, 2067696032, 3594591187, 2921233993,
              2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054,
              1432588573, 1507829418, 2025931657, 3646575487, 545086370,
              48609733, 2200306550, 1653985193, 298326376, 1316178497,
              3007786442, 2064951626, 458293330, 2589141269, 3591329599,
              3164325604, 727753846, 2179363840, 146436021, 1461446943,
              4069977195, 705550613, 3059967265, 3887724982, 4281599278,
              3313849956, 1404054877, 2845806497, 146425753, 1854211946,
            ],
            [
              1266315497, 3048417604, 3681880366, 3289982499, 290971e4,
              1235738493, 2632868024, 2414719590, 3970600049, 1771706367,
              1449415276, 3266420449, 422970021, 1963543593, 2690192192,
              3826793022, 1062508698, 1531092325, 1804592342, 2583117782,
              2714934279, 4024971509, 1294809318, 4028980673, 1289560198,
              2221992742, 1669523910, 35572830, 157838143, 1052438473,
              1016535060, 1802137761, 1753167236, 1386275462, 3080475397,
              2857371447, 1040679964, 2145300060, 2390574316, 1461121720,
              2956646967, 4031777805, 4028374788, 33600511, 2920084762,
              1018524850, 629373528, 3691585981, 3515945977, 2091462646,
              2486323059, 586499841, 988145025, 935516892, 3367335476,
              2599673255, 2839830854, 265290510, 3972581182, 2759138881,
              3795373465, 1005194799, 847297441, 406762289, 1314163512,
              1332590856, 1866599683, 4127851711, 750260880, 613907577,
              1450815602, 3165620655, 3734664991, 3650291728, 3012275730,
              3704569646, 1427272223, 778793252, 1343938022, 2676280711,
              2052605720, 1946737175, 3164576444, 3914038668, 3967478842,
              3682934266, 1661551462, 3294938066, 4011595847, 840292616,
              3712170807, 616741398, 312560963, 711312465, 1351876610,
              322626781, 1910503582, 271666773, 2175563734, 1594956187,
              70604529, 3617834859, 1007753275, 1495573769, 4069517037,
              2549218298, 2663038764, 504708206, 2263041392, 3941167025,
              2249088522, 1514023603, 1998579484, 1312622330, 694541497,
              2582060303, 2151582166, 1382467621, 776784248, 2618340202,
              3323268794, 2497899128, 2784771155, 503983604, 4076293799,
              907881277, 423175695, 432175456, 1378068232, 4145222326,
              3954048622, 3938656102, 3820766613, 2793130115, 2977904593,
              26017576, 3274890735, 3194772133, 1700274565, 1756076034,
              4006520079, 3677328699, 720338349, 1533947780, 354530856,
              688349552, 3973924725, 1637815568, 332179504, 3949051286,
              53804574, 2852348879, 3044236432, 1282449977, 3583942155,
              3416972820, 4006381244, 1617046695, 2628476075, 3002303598,
              1686838959, 431878346, 2686675385, 1700445008, 1080580658,
              1009431731, 832498133, 3223435511, 2605976345, 2271191193,
              2516031870, 1648197032, 4164389018, 2548247927, 300782431,
              375919233, 238389289, 3353747414, 2531188641, 2019080857,
              1475708069, 455242339, 2609103871, 448939670, 3451063019,
              1395535956, 2413381860, 1841049896, 1491858159, 885456874,
              4264095073, 4001119347, 1565136089, 3898914787, 1108368660,
              540939232, 1173283510, 2745871338, 3681308437, 4207628240,
              3343053890, 4016749493, 1699691293, 1103962373, 3625875870,
              2256883143, 3830138730, 1031889488, 3479347698, 1535977030,
              4236805024, 3251091107, 2132092099, 1774941330, 1199868427,
              1452454533, 157007616, 2904115357, 342012276, 595725824,
              1480756522, 206960106, 497939518, 591360097, 863170706,
              2375253569, 3596610801, 1814182875, 2094937945, 3421402208,
              1082520231, 3463918190, 2785509508, 435703966, 3908032597,
              1641649973, 2842273706, 3305899714, 1510255612, 2148256476,
              2655287854, 3276092548, 4258621189, 236887753, 3681803219,
              274041037, 1734335097, 3815195456, 3317970021, 1899903192,
              1026095262, 4050517792, 356393447, 2410691914, 3873677099,
              3682840055,
            ],
            [
              3913112168, 2491498743, 4132185628, 2489919796, 1091903735,
              1979897079, 3170134830, 3567386728, 3557303409, 857797738,
              1136121015, 1342202287, 507115054, 2535736646, 337727348,
              3213592640, 1301675037, 2528481711, 1895095763, 1721773893,
              3216771564, 62756741, 2142006736, 835421444, 2531993523,
              1442658625, 3659876326, 2882144922, 676362277, 1392781812,
              170690266, 3921047035, 1759253602, 3611846912, 1745797284,
              664899054, 1329594018, 3901205900, 3045908486, 2062866102,
              2865634940, 3543621612, 3464012697, 1080764994, 553557557,
              3656615353, 3996768171, 991055499, 499776247, 1265440854,
              648242737, 3940784050, 980351604, 3713745714, 1749149687,
              3396870395, 4211799374, 3640570775, 1161844396, 3125318951,
              1431517754, 545492359, 4268468663, 3499529547, 1437099964,
              2702547544, 3433638243, 2581715763, 2787789398, 1060185593,
              1593081372, 2418618748, 4260947970, 69676912, 2159744348,
              86519011, 2512459080, 3838209314, 1220612927, 3339683548,
              133810670, 1090789135, 1078426020, 1569222167, 845107691,
              3583754449, 4072456591, 1091646820, 628848692, 1613405280,
              3757631651, 526609435, 236106946, 48312990, 2942717905,
              3402727701, 1797494240, 859738849, 992217954, 4005476642,
              2243076622, 3870952857, 3732016268, 765654824, 3490871365,
              2511836413, 1685915746, 3888969200, 1414112111, 2273134842,
              3281911079, 4080962846, 172450625, 2569994100, 980381355,
              4109958455, 2819808352, 2716589560, 2568741196, 3681446669,
              3329971472, 1835478071, 660984891, 3704678404, 4045999559,
              3422617507, 3040415634, 1762651403, 1719377915, 3470491036,
              2693910283, 3642056355, 3138596744, 1364962596, 2073328063,
              1983633131, 926494387, 3423689081, 2150032023, 4096667949,
              1749200295, 3328846651, 309677260, 2016342300, 1779581495,
              3079819751, 111262694, 1274766160, 443224088, 298511866,
              1025883608, 3806446537, 1145181785, 168956806, 3641502830,
              3584813610, 1689216846, 3666258015, 3200248200, 1692713982,
              2646376535, 4042768518, 1618508792, 1610833997, 3523052358,
              4130873264, 2001055236, 3610705100, 2202168115, 4028541809,
              2961195399, 1006657119, 2006996926, 3186142756, 1430667929,
              3210227297, 1314452623, 4074634658, 4101304120, 2273951170,
              1399257539, 3367210612, 3027628629, 1190975929, 2062231137,
              2333990788, 2221543033, 2438960610, 1181637006, 548689776,
              2362791313, 3372408396, 3104550113, 3145860560, 296247880,
              1970579870, 3078560182, 3769228297, 1714227617, 3291629107,
              3898220290, 166772364, 1251581989, 493813264, 448347421,
              195405023, 2709975567, 677966185, 3703036547, 1463355134,
              2715995803, 1338867538, 1343315457, 2802222074, 2684532164,
              233230375, 2599980071, 2000651841, 3277868038, 1638401717,
              4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579,
              1405279636, 3267499572, 3150704214, 2428286686, 3959192993,
              3461946742, 1862657033, 1266418056, 963775037, 2089974820,
              2263052895, 1917689273, 448879540, 3550394620, 3981727096,
              150775221, 3627908307, 1303187396, 508620638, 2975983352,
              2726630617, 1817252668, 1876281319, 1457606340, 908771278,
              3720792119, 3617206836, 2455994898, 1729034894, 1080033504,
            ],
            [
              976866871, 3556439503, 2881648439, 1522871579, 1555064734,
              1336096578, 3548522304, 2579274686, 3574697629, 3205460757,
              3593280638, 3338716283, 3079412587, 564236357, 2993598910,
              1781952180, 1464380207, 3163844217, 3332601554, 1699332808,
              1393555694, 1183702653, 3581086237, 1288719814, 691649499,
              2847557200, 2895455976, 3193889540, 2717570544, 1781354906,
              1676643554, 2592534050, 3230253752, 1126444790, 2770207658,
              2633158820, 2210423226, 2615765581, 2414155088, 3127139286,
              673620729, 2805611233, 1269405062, 4015350505, 3341807571,
              4149409754, 1057255273, 2012875353, 2162469141, 2276492801,
              2601117357, 993977747, 3918593370, 2654263191, 753973209,
              36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599,
              2918365339, 1524020338, 1518925132, 3760827505, 3759777254,
              1202760957, 3985898139, 3906192525, 674977740, 4174734889,
              2031300136, 2019492241, 3983892565, 4153806404, 3822280332,
              352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578,
              2535922412, 2839152426, 457141659, 509813237, 4120667899,
              652014361, 1966332200, 2975202805, 55981186, 2327461051,
              676427537, 3255491064, 2882294119, 3433927263, 1307055953,
              942726286, 933058658, 2468411793, 3933900994, 4215176142,
              1361170020, 2001714738, 2830558078, 3274259782, 1222529897,
              1679025792, 2729314320, 3714953764, 1770335741, 151462246,
              3013232138, 1682292957, 1483529935, 471910574, 1539241949,
              458788160, 3436315007, 1807016891, 3718408830, 978976581,
              1043663428, 3165965781, 1927990952, 4200891579, 2372276910,
              3208408903, 3533431907, 1412390302, 2931980059, 4132332400,
              1947078029, 3881505623, 4168226417, 2941484381, 1077988104,
              1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804,
              3463356488, 1866414978, 891333506, 18488651, 661792760,
              1628790961, 3885187036, 3141171499, 876946877, 2693282273,
              1372485963, 791857591, 2686433993, 3759982718, 3167212022,
              3472953795, 2716379847, 445679433, 3561995674, 3504004811,
              3574258232, 54117162, 3331405415, 2381918588, 3769707343,
              4154350007, 1140177722, 4074052095, 668550556, 3214352940,
              367459370, 261225585, 2610173221, 4209349473, 3468074219,
              3265815641, 314222801, 3066103646, 3808782860, 282218597,
              3406013506, 3773591054, 379116347, 1285071038, 846784868,
              2669647154, 3771962079, 3550491691, 2305946142, 453669953,
              1268987020, 3317592352, 3279303384, 3744833421, 2610507566,
              3859509063, 266596637, 3847019092, 517658769, 3462560207,
              3443424879, 370717030, 4247526661, 2224018117, 4143653529,
              4112773975, 2788324899, 2477274417, 1456262402, 2901442914,
              1517677493, 1846949527, 2295493580, 3734397586, 2176403920,
              1280348187, 1908823572, 3871786941, 846861322, 1172426758,
              3287448474, 3383383037, 1655181056, 3139813346, 901632758,
              1897031941, 2986607138, 3066810236, 3447102507, 1393639104,
              373351379, 950779232, 625454576, 3124240540, 4148612726,
              2007998917, 544563296, 2244738638, 2330496472, 2058025392,
              1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329,
              2791104160, 1057563949, 3255363231, 3075367218, 3463963227,
              1469046755, 985887462,
            ],
          ]
        var c = { pbox: [], sbox: [] }
        function d(h, y) {
          let x = (y >> 24) & 255,
            g = (y >> 16) & 255,
            m = (y >> 8) & 255,
            w = y & 255,
            v = h.sbox[0][x] + h.sbox[1][g]
          return ((v = v ^ h.sbox[2][m]), (v = v + h.sbox[3][w]), v)
        }
        function l(h, y, x) {
          let g = y,
            m = x,
            w
          for (let v = 0; v < n; ++v)
            ((g = g ^ h.pbox[v]), (m = d(h, g) ^ m), (w = g), (g = m), (m = w))
          return (
            (w = g),
            (g = m),
            (m = w),
            (m = m ^ h.pbox[n]),
            (g = g ^ h.pbox[n + 1]),
            { left: g, right: m }
          )
        }
        function u(h, y, x) {
          let g = y,
            m = x,
            w
          for (let v = n + 1; v > 1; --v)
            ((g = g ^ h.pbox[v]), (m = d(h, g) ^ m), (w = g), (g = m), (m = w))
          return (
            (w = g),
            (g = m),
            (m = w),
            (m = m ^ h.pbox[1]),
            (g = g ^ h.pbox[0]),
            { left: g, right: m }
          )
        }
        function p(h, y, x) {
          for (let _ = 0; _ < 4; _++) {
            h.sbox[_] = []
            for (let b = 0; b < 256; b++) h.sbox[_][b] = o[_][b]
          }
          let g = 0
          for (let _ = 0; _ < n + 2; _++)
            ((h.pbox[_] = a[_] ^ y[g]), g++, g >= x && (g = 0))
          let m = 0,
            w = 0,
            v = 0
          for (let _ = 0; _ < n + 2; _ += 2)
            ((v = l(h, m, w)),
              (m = v.left),
              (w = v.right),
              (h.pbox[_] = m),
              (h.pbox[_ + 1] = w))
          for (let _ = 0; _ < 4; _++)
            for (let b = 0; b < 256; b += 2)
              ((v = l(h, m, w)),
                (m = v.left),
                (w = v.right),
                (h.sbox[_][b] = m),
                (h.sbox[_][b + 1] = w))
          return !0
        }
        var f = (s.Blowfish = i.extend({
          _doReset: function () {
            if (this._keyPriorReset !== this._key) {
              var h = (this._keyPriorReset = this._key),
                y = h.words,
                x = h.sigBytes / 4
              p(c, y, x)
            }
          },
          encryptBlock: function (h, y) {
            var x = l(c, h[y], h[y + 1])
            ;((h[y] = x.left), (h[y + 1] = x.right))
          },
          decryptBlock: function (h, y) {
            var x = u(c, h[y], h[y + 1])
            ;((h[y] = x.left), (h[y + 1] = x.right))
          },
          blockSize: 64 / 32,
          keySize: 128 / 32,
          ivSize: 64 / 32,
        }))
        e.Blowfish = i._createHelper(f)
      })(),
      t.Blowfish
    )
  })
})
var _t = N((Ji, rd) => {
  ;(function (t, e, r) {
    typeof Ji == "object"
      ? (rd.exports = Ji =
          e(
            M(),
            xr(),
            Yo(),
            tc(),
            ot(),
            sc(),
            ct(),
            wn(),
            _i(),
            dc(),
            vn(),
            pc(),
            hc(),
            mc(),
            Ei(),
            wc(),
            Ve(),
            oe(),
            kc(),
            Pc(),
            Cc(),
            Dc(),
            Fc(),
            Rc(),
            Uc(),
            Oc(),
            jc(),
            Lc(),
            Mc(),
            Kc(),
            Vc(),
            Jc(),
            Xc(),
            Yc(),
            td(),
          ))
      : typeof define == "function" && define.amd
        ? define(
            [
              "./core",
              "./x64-core",
              "./lib-typedarrays",
              "./enc-utf16",
              "./enc-base64",
              "./enc-base64url",
              "./md5",
              "./sha1",
              "./sha256",
              "./sha224",
              "./sha512",
              "./sha384",
              "./sha3",
              "./ripemd160",
              "./hmac",
              "./pbkdf2",
              "./evpkdf",
              "./cipher-core",
              "./mode-cfb",
              "./mode-ctr",
              "./mode-ctr-gladman",
              "./mode-ofb",
              "./mode-ecb",
              "./pad-ansix923",
              "./pad-iso10126",
              "./pad-iso97971",
              "./pad-zeropadding",
              "./pad-nopadding",
              "./format-hex",
              "./aes",
              "./tripledes",
              "./rc4",
              "./rabbit",
              "./rabbit-legacy",
              "./blowfish",
            ],
            e,
          )
        : (t.CryptoJS = e(t.CryptoJS))
  })(Ji, function (t) {
    return t
  })
})
function ud(t) {
  return Array.from(new Uint8Array(t))
    .map((e) => e.toString(16).padStart(2, "0"))
    .join("")
}
function _n(t) {
  return typeof t == "string" ? new TextEncoder().encode(t) : t
}
function Pp(t) {
  let e = typeof t == "string" ? new TextEncoder().encode(t) : t,
    r = e.length,
    i = r * 8,
    s = (56 - ((r + 1) % 64) + 64) % 64,
    n = new Uint8Array(r + 1 + s + 8)
  ;(n.set(e), (n[r] = 128))
  let a = new DataView(n.buffer)
  ;(a.setUint32(n.length - 8, i >>> 0, !0),
    a.setUint32(n.length - 4, Math.floor(i / 4294967296), !0))
  let o = new Int32Array(64)
  for (let h = 0; h < 64; h++)
    o[h] = (Math.abs(Math.sin(h + 1)) * 4294967296) | 0
  let c = [
      7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20,
      5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4,
      11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6,
      10, 15, 21,
    ],
    d = 1732584193,
    l = 4023233417,
    u = 2562383102,
    p = 271733878
  for (let h = 0; h < n.length; h += 64) {
    let y = new DataView(n.buffer, h, 64),
      x = Array.from({ length: 16 }, (_, b) => y.getInt32(b * 4, !0)),
      [g, m, w, v] = [d, l, u, p]
    for (let _ = 0; _ < 64; _++) {
      let b, P
      _ < 16
        ? ((b = (m & w) | (~m & v)), (P = _))
        : _ < 32
          ? ((b = (v & m) | (~v & w)), (P = (5 * _ + 1) % 16))
          : _ < 48
            ? ((b = m ^ w ^ v), (P = (3 * _ + 5) % 16))
            : ((b = w ^ (m | ~v)), (P = (7 * _) % 16))
      let E = v
      ;((v = w), (w = m))
      let S = (g + b + o[_] + x[P]) | 0
      ;((m = (m + ((S << c[_]) | (S >>> (32 - c[_])))) | 0), (g = E))
    }
    ;((d = (d + g) | 0),
      (l = (l + m) | 0),
      (u = (u + w) | 0),
      (p = (p + v) | 0))
  }
  let f = new DataView(new ArrayBuffer(16))
  return (
    f.setInt32(0, d, !0),
    f.setInt32(4, l, !0),
    f.setInt32(8, u, !0),
    f.setInt32(12, p, !0),
    ud(f.buffer)
  )
}
function ts(t) {
  return Pp(t)
}
async function rs(t) {
  let e = await crypto.subtle.digest("SHA-1", _n(t))
  return ud(e)
}
async function pd(t, e) {
  let r = await crypto.subtle.importKey(
      "raw",
      _n(e),
      { name: "HMAC", hash: "SHA-1" },
      !1,
      ["sign"],
    ),
    i = await crypto.subtle.sign("HMAC", r, _n(t)),
    s = new Uint8Array(i),
    n = ""
  for (let a of s) n += String.fromCharCode(a)
  return btoa(n)
}
var is = K(() => {
  "use strict"
})
var bl = {}
Lr(bl, { LocalDriver: () => Kn })
async function ut() {
  if (typeof process < "u" && process.release?.name === "node" && !re)
    try {
      ;((re = await import("fs/promises")), (ae = await import("path")))
    } catch {}
}
var re,
  ae,
  Kn,
  kl = K(() => {
    "use strict"
    xe()
    ;((re = null), (ae = null))
    Kn = class {
      async list(e, r) {
        if ((await ut(), !re || !ae))
          throw new Error("LocalDriver is not supported in Edge Runtime")
        let i = []
        try {
          i = await re.readdir(r, { withFileTypes: !0 })
        } catch {
          return []
        }
        return await Promise.all(
          i.map(async (n) => {
            let a = n.isDirectory(),
              o = 0,
              c = new Date()
            try {
              let d = await re.stat(ae.join(r, n.name))
              ;((o = d.size), (c = d.mtime))
            } catch {}
            return {
              name: n.name,
              size: a ? 0 : o,
              is_dir: a,
              created: c.toISOString(),
              modified: c.toISOString(),
              sign: "",
              type: W(n.name, a),
            }
          }),
        )
      }
      async get(e, r) {
        if ((await ut(), !re || !ae))
          throw new Error("LocalDriver is not supported in Edge Runtime")
        let i = await re.stat(r),
          s = i.isDirectory(),
          n =
            r
              .split(/[\\/]+/)
              .filter(Boolean)
              .pop() || "root"
        return {
          name: n,
          size: s ? 0 : i.size,
          is_dir: s,
          created: i.ctime?.toISOString() || i.mtime.toISOString(),
          modified: i.mtime.toISOString(),
          sign: "",
          type: W(n, s),
        }
      }
      async mkdir(e, r) {
        if ((await ut(), !re || !ae))
          throw new Error("LocalDriver is not supported in Edge Runtime")
        await re.mkdir(r, { recursive: !0 })
      }
      async rename(e, r, i) {
        if ((await ut(), !re || !ae))
          throw new Error("LocalDriver is not supported in Edge Runtime")
        let s = ae.join(ae.dirname(r), i)
        await re.rename(r, s)
      }
      async remove(e, r, i) {
        if ((await ut(), !re || !ae))
          throw new Error("LocalDriver is not supported in Edge Runtime")
        for (let s of i) {
          let n = ae.join(r, s)
          await re.rm(n, { recursive: !0, force: !0 })
        }
      }
      async move(e, r, i, s, n) {
        if ((await ut(), !re || !ae))
          throw new Error("LocalDriver is not supported in Edge Runtime")
        for (let a of i) {
          let o = ae.join(s, a),
            c = ae.join(n, a)
          ;(await re.mkdir(ae.dirname(c), { recursive: !0 }),
            await re.rename(o, c))
        }
      }
      async copy(e, r, i, s, n) {
        if ((await ut(), !re || !ae))
          throw new Error("LocalDriver is not supported in Edge Runtime")
        for (let a of i) {
          let o = ae.join(s, a),
            c = ae.join(n, a)
          ;(await re.mkdir(ae.dirname(c), { recursive: !0 }),
            await re.cp(o, c, { recursive: !0 }))
        }
      }
      async put(e, r, i) {
        if ((await ut(), !re || !ae))
          throw new Error("LocalDriver is not supported in Edge Runtime")
        ;(await re.mkdir(ae.dirname(r), { recursive: !0 }),
          await re.writeFile(r, i))
      }
    }
  })
var Fl,
  ih,
  sh,
  nh,
  ah,
  Tl,
  Fs,
  Jn,
  Il = K(() => {
    yt()
    ;((Fl = { name: "HMAC", hash: "SHA-256" }),
      (ih = async (t) => {
        let e = typeof t == "string" ? new TextEncoder().encode(t) : t
        return await crypto.subtle.importKey("raw", e, Fl, !1, [
          "sign",
          "verify",
        ])
      }),
      (sh = async (t, e, r) => {
        try {
          let i = atob(t),
            s = new Uint8Array(i.length)
          for (let n = 0, a = i.length; n < a; n++) s[n] = i.charCodeAt(n)
          return await crypto.subtle.verify(
            Fl,
            r,
            s,
            new TextEncoder().encode(e),
          )
        } catch {
          return !1
        }
      }),
      (nh = /^[!#-:<>-[\]-~]+$/),
      (ah = /^[ !#-:<-[\]-~]*$/),
      (Tl = (t) => {
        let e = 0,
          r = t.length
        for (; e < r; ) {
          let i = t.charCodeAt(e)
          if (i !== 32 && i !== 9) break
          e++
        }
        for (; r > e; ) {
          let i = t.charCodeAt(r - 1)
          if (i !== 32 && i !== 9) break
          r--
        }
        return e === 0 && r === t.length ? t : t.slice(e, r)
      }),
      (Fs = (t, e) => {
        if (e && t.indexOf(e) === -1) return {}
        let r = t.split(";"),
          i = Object.create(null)
        for (let s of r) {
          let n = s.indexOf("=")
          if (n === -1) continue
          let a = Tl(s.substring(0, n))
          if ((e && e !== a) || !nh.test(a) || a in i) continue
          let o = Tl(s.substring(n + 1))
          if (
            (o.startsWith('"') && o.endsWith('"') && (o = o.slice(1, -1)),
            ah.test(o) && ((i[a] = qt(o)), e))
          )
            break
        }
        return i
      }),
      (Jn = async (t, e, r) => {
        let i = Object.create(null),
          s = await ih(e)
        for (let [n, a] of Object.entries(Fs(t, r))) {
          let o = a.lastIndexOf(".")
          if (o < 1) continue
          let c = a.substring(0, o),
            d = a.substring(o + 1)
          if (d.length !== 44 || !d.endsWith("=")) continue
          let l = await sh(d, c, s)
          i[n] = l ? c : !1
        }
        return i
      }))
  })
var Is,
  Qn,
  Rl = K(() => {
    Il()
    ;((Is = (t, e, r) => {
      let i = t.req.raw.headers.get("Cookie")
      if (typeof e == "string") {
        if (!i) return
        let n = e
        return (
          r === "secure"
            ? (n = "__Secure-" + e)
            : r === "host" && (n = "__Host-" + e),
          Fs(i, n)[n]
        )
      }
      return i ? Fs(i) : {}
    }),
      (Qn = async (t, e, r, i) => {
        let s = t.req.raw.headers.get("Cookie")
        if (typeof r == "string") {
          if (!s) return
          let a = r
          return (
            i === "secure"
              ? (a = "__Secure-" + r)
              : i === "host" && (a = "__Host-" + r),
            (await Jn(s, e, a))[a]
          )
        }
        return s ? await Jn(s, e) : {}
      }))
  })
var Xn,
  Zn,
  oh,
  Yn,
  ea = K(() => {
    ;((Xn = (t) =>
      Yn(t.replace(/_|-/g, (e) => ({ _: "/", "-": "+" })[e] ?? e))),
      (Zn = (t) =>
        oh(t).replace(/\/|\+/g, (e) => ({ "/": "_", "+": "-" })[e] ?? e)),
      (oh = (t) => {
        let e = "",
          r = new Uint8Array(t)
        for (let i = 0, s = r.length; i < s; i++) e += String.fromCharCode(r[i])
        return btoa(e)
      }),
      (Yn = (t) => {
        let e = atob(t),
          r = new Uint8Array(new ArrayBuffer(e.length)),
          i = e.length / 2
        for (let s = 0, n = e.length - 1; s <= i; s++, n--)
          ((r[s] = e.charCodeAt(s)), (r[n] = e.charCodeAt(n)))
        return r
      }))
  })
var ft,
  ta = K(() => {
    ft = ((t) => (
      (t.HS256 = "HS256"),
      (t.HS384 = "HS384"),
      (t.HS512 = "HS512"),
      (t.RS256 = "RS256"),
      (t.RS384 = "RS384"),
      (t.RS512 = "RS512"),
      (t.PS256 = "PS256"),
      (t.PS384 = "PS384"),
      (t.PS512 = "PS512"),
      (t.ES256 = "ES256"),
      (t.ES384 = "ES384"),
      (t.ES512 = "ES512"),
      (t.EdDSA = "EdDSA"),
      t
    ))(ft || {})
  })
var ch,
  Bl,
  dh,
  Ul = K(() => {
    ;((ch = {
      deno: "Deno",
      bun: "Bun",
      workerd: "Cloudflare-Workers",
      node: "Node.js",
    }),
      (Bl = () => {
        let t = globalThis
        if (typeof navigator < "u" && typeof navigator.userAgent == "string") {
          for (let [r, i] of Object.entries(ch)) if (dh(i)) return r
        }
        return typeof t?.EdgeRuntime == "string"
          ? "edge-light"
          : t?.fastly !== void 0
            ? "fastly"
            : t?.process?.release?.name === "node"
              ? "node"
              : "other"
      }),
      (dh = (t) => navigator.userAgent.startsWith(t)))
  })
var $l,
  ra,
  ia,
  Ct,
  Ol,
  ql,
  jl,
  Rs,
  sa,
  zl,
  Ll,
  Nl,
  Ml,
  Hl,
  Kl,
  Vt,
  na = K(() => {
    ;(($l = class extends Error {
      constructor(t) {
        ;(super(`${t} is not an implemented algorithm`),
          (this.name = "JwtAlgorithmNotImplemented"))
      }
    }),
      (ra = class extends Error {
        constructor() {
          ;(super('JWT verification requires "alg" option to be specified'),
            (this.name = "JwtAlgorithmRequired"))
        }
      }),
      (ia = class extends Error {
        constructor(t, e) {
          ;(super(`JWT algorithm mismatch: expected "${t}", got "${e}"`),
            (this.name = "JwtAlgorithmMismatch"))
        }
      }),
      (Ct = class extends Error {
        constructor(t) {
          ;(super(`invalid JWT token: ${t}`), (this.name = "JwtTokenInvalid"))
        }
      }),
      (Ol = class extends Error {
        constructor(t) {
          ;(super(`token (${t}) is being used before it's valid`),
            (this.name = "JwtTokenNotBefore"))
        }
      }),
      (ql = class extends Error {
        constructor(t) {
          ;(super(`token (${t}) expired`), (this.name = "JwtTokenExpired"))
        }
      }),
      (jl = class extends Error {
        constructor(t, e) {
          ;(super(
            `Invalid "iat" claim, must be a valid number lower than "${t}" (iat: "${e}")`,
          ),
            (this.name = "JwtTokenIssuedAt"))
        }
      }),
      (Rs = class extends Error {
        constructor(t, e) {
          ;(super(`expected issuer "${t}", got ${e ? `"${e}"` : "none"} `),
            (this.name = "JwtTokenIssuer"))
        }
      }),
      (sa = class extends Error {
        constructor(t) {
          ;(super(`jwt header is invalid: ${JSON.stringify(t)}`),
            (this.name = "JwtHeaderInvalid"))
        }
      }),
      (zl = class extends Error {
        constructor(t) {
          ;(super(`required "kid" in jwt header: ${JSON.stringify(t)}`),
            (this.name = "JwtHeaderRequiresKid"))
        }
      }),
      (Ll = class extends Error {
        constructor(t) {
          ;(super(
            `symmetric algorithm "${t}" is not allowed for JWK verification`,
          ),
            (this.name = "JwtSymmetricAlgorithmNotAllowed"))
        }
      }),
      (Nl = class extends Error {
        constructor(t, e) {
          ;(super(
            `algorithm "${t}" is not in the allowed list: [${e.join(", ")}]`,
          ),
            (this.name = "JwtAlgorithmNotAllowed"))
        }
      }),
      (Ml = class extends Error {
        constructor(t) {
          ;(super(`token(${t}) signature mismatched`),
            (this.name = "JwtTokenSignatureMismatched"))
        }
      }),
      (Hl = class extends Error {
        constructor(t) {
          ;(super(`required "aud" in jwt payload: ${JSON.stringify(t)}`),
            (this.name = "JwtPayloadRequiresAud"))
        }
      }),
      (Kl = class extends Error {
        constructor(t, e) {
          ;(super(
            `expected audience "${Array.isArray(t) ? t.join(", ") : t}", got "${e}"`,
          ),
            (this.name = "JwtTokenAudience"))
        }
      }),
      (Vt = ((t) => (
        (t.Encrypt = "encrypt"),
        (t.Decrypt = "decrypt"),
        (t.Sign = "sign"),
        (t.Verify = "verify"),
        (t.DeriveKey = "deriveKey"),
        (t.DeriveBits = "deriveBits"),
        (t.WrapKey = "wrapKey"),
        (t.UnwrapKey = "unwrapKey"),
        t
      ))(Vt || {})))
  })
var Et,
  Wl,
  aa = K(() => {
    ;((Et = new TextEncoder()), (Wl = new TextDecoder()))
  })
async function Gl(t, e, r) {
  let i = Ql(e),
    s = await lh(t, i)
  return await crypto.subtle.sign(i, s, r)
}
async function Jl(t, e, r, i) {
  let s = Ql(e),
    n = await uh(t, s)
  return await crypto.subtle.verify(s, n, r, i)
}
function oa(t) {
  return Yn(t.replace(/-+(BEGIN|END).*?-+/g, "").replace(/\s/g, ""))
}
async function lh(t, e) {
  if (!crypto.subtle || !crypto.subtle.importKey)
    throw new Error(
      "`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.",
    )
  if (Xl(t)) {
    if (t.type !== "private" && t.type !== "secret")
      throw new Error(
        `unexpected key type: CryptoKey.type is ${t.type}, expected private or secret`,
      )
    return t
  }
  let r = [Vt.Sign]
  return typeof t == "object"
    ? await crypto.subtle.importKey("jwk", t, e, !1, r)
    : t.includes("PRIVATE")
      ? await crypto.subtle.importKey("pkcs8", oa(t), e, !1, r)
      : await crypto.subtle.importKey("raw", Et.encode(t), e, !1, r)
}
async function uh(t, e) {
  if (!crypto.subtle || !crypto.subtle.importKey)
    throw new Error(
      "`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.",
    )
  if (Xl(t)) {
    if (t.type === "public" || t.type === "secret") return t
    t = await Vl(t)
  }
  if (typeof t == "string" && t.includes("PRIVATE")) {
    let i = await crypto.subtle.importKey("pkcs8", oa(t), e, !0, [Vt.Sign])
    t = await Vl(i)
  }
  let r = [Vt.Verify]
  return typeof t == "object"
    ? await crypto.subtle.importKey("jwk", t, e, !1, r)
    : t.includes("PUBLIC")
      ? await crypto.subtle.importKey("spki", oa(t), e, !1, r)
      : await crypto.subtle.importKey("raw", Et.encode(t), e, !1, r)
}
async function Vl(t) {
  if (t.type !== "private") throw new Error(`unexpected key type: ${t.type}`)
  if (!t.extractable) throw new Error("unexpected private key is unextractable")
  let e = await crypto.subtle.exportKey("jwk", t),
    { kty: r } = e,
    { alg: i, e: s, n } = e,
    { crv: a, x: o, y: c } = e
  return { kty: r, alg: i, e: s, n, crv: a, x: o, y: c, key_ops: [Vt.Verify] }
}
function Ql(t) {
  switch (t) {
    case "HS256":
      return { name: "HMAC", hash: { name: "SHA-256" } }
    case "HS384":
      return { name: "HMAC", hash: { name: "SHA-384" } }
    case "HS512":
      return { name: "HMAC", hash: { name: "SHA-512" } }
    case "RS256":
      return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } }
    case "RS384":
      return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-384" } }
    case "RS512":
      return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-512" } }
    case "PS256":
      return { name: "RSA-PSS", hash: { name: "SHA-256" }, saltLength: 32 }
    case "PS384":
      return { name: "RSA-PSS", hash: { name: "SHA-384" }, saltLength: 48 }
    case "PS512":
      return { name: "RSA-PSS", hash: { name: "SHA-512" }, saltLength: 64 }
    case "ES256":
      return { name: "ECDSA", hash: { name: "SHA-256" }, namedCurve: "P-256" }
    case "ES384":
      return { name: "ECDSA", hash: { name: "SHA-384" }, namedCurve: "P-384" }
    case "ES512":
      return { name: "ECDSA", hash: { name: "SHA-512" }, namedCurve: "P-521" }
    case "EdDSA":
      return { name: "Ed25519", namedCurve: "Ed25519" }
    default:
      throw new $l(t)
  }
}
function Xl(t) {
  return Bl() === "node" && crypto.webcrypto
    ? t instanceof crypto.webcrypto.CryptoKey
    : t instanceof CryptoKey
}
var Zl = K(() => {
  Ul()
  ea()
  na()
  aa()
})
function Yl(t) {
  if (typeof t == "object" && t !== null) {
    let e = t
    return (
      "alg" in e &&
      Object.values(ft).includes(e.alg) &&
      (!("typ" in e) || e.typ === "JWT")
    )
  }
  return !1
}
var ca,
  ph,
  da,
  e0,
  la,
  fh,
  t0,
  ua,
  hh,
  r0 = K(() => {
    ea()
    ta()
    Zl()
    na()
    aa()
    ;((ca = (t) => Zn(Et.encode(JSON.stringify(t)).buffer).replace(/=/g, "")),
      (ph = (t) => Zn(t).replace(/=/g, "")),
      (da = (t) => JSON.parse(Wl.decode(Xn(t)))))
    ;((e0 = async (t, e, r = "HS256") => {
      let i = ca(t),
        s
      typeof e == "object" && "alg" in e
        ? ((r = e.alg), (s = ca({ alg: r, typ: "JWT", kid: e.kid })))
        : (s = ca({ alg: r, typ: "JWT" }))
      let n = `${s}.${i}`,
        a = await Gl(e, r, Et.encode(n)),
        o = ph(a)
      return `${n}.${o}`
    }),
      (la = async (t, e, r) => {
        if (!r) throw new ra()
        let {
          alg: i,
          iss: s,
          nbf: n = !0,
          exp: a = !0,
          iat: o = !0,
          aud: c,
        } = typeof r == "string" ? { alg: r } : r
        if (!i) throw new ra()
        let d = t.split(".")
        if (d.length !== 3) throw new Ct(t)
        let { header: l, payload: u } = ua(t)
        if (!Yl(l)) throw new sa(l)
        if (l.alg !== i) throw new ia(i, l.alg)
        let p = Math.floor(Date.now() / 1e3)
        if (
          n &&
          u.nbf !== void 0 &&
          (typeof u.nbf != "number" || !Number.isFinite(u.nbf) || u.nbf > p)
        )
          throw new Ol(t)
        if (
          a &&
          u.exp !== void 0 &&
          (typeof u.exp != "number" || !Number.isFinite(u.exp) || u.exp <= p)
        )
          throw new ql(t)
        if (
          o &&
          u.iat !== void 0 &&
          (typeof u.iat != "number" || !Number.isFinite(u.iat) || p < u.iat)
        )
          throw new jl(p, u.iat)
        if (s) {
          if (!u.iss) throw new Rs(s, null)
          if (typeof s == "string" && u.iss !== s) throw new Rs(s, u.iss)
          if (s instanceof RegExp && !s.test(u.iss)) throw new Rs(s, u.iss)
        }
        if (c) {
          if (!u.aud) throw new Hl(u)
          if (
            !(Array.isArray(u.aud) ? u.aud : [u.aud]).some((g) =>
              c instanceof RegExp
                ? c.test(g)
                : typeof c == "string"
                  ? g === c
                  : Array.isArray(c) && c.includes(g),
            )
          )
            throw new Kl(c, u.aud)
        }
        let f = t.substring(0, t.lastIndexOf("."))
        if (!(await Jl(e, i, Xn(d[2]), Et.encode(f)))) throw new Ml(t)
        return u
      }),
      (fh = [ft.HS256, ft.HS384, ft.HS512]),
      (t0 = async (t, e, r) => {
        let i = e.verification || {},
          s = hh(t)
        if (!Yl(s)) throw new sa(s)
        if (!s.kid) throw new zl(s)
        if (fh.includes(s.alg)) throw new Ll(s.alg)
        if (!e.allowedAlgorithms.includes(s.alg))
          throw new Nl(s.alg, e.allowedAlgorithms)
        let n = e.keys ? [...e.keys] : void 0
        if (e.jwks_uri) {
          let o = await fetch(e.jwks_uri, r)
          if (!o.ok) throw new Error(`failed to fetch JWKS from ${e.jwks_uri}`)
          let c = await o.json()
          if (!c.keys)
            throw new Error('invalid JWKS response. "keys" field is missing')
          if (!Array.isArray(c.keys))
            throw new Error(
              'invalid JWKS response. "keys" field is not an array',
            )
          ;((n ??= []), n.push(...c.keys))
        } else if (!n)
          throw new Error(
            'verifyWithJwks requires options for either "keys" or "jwks_uri" or both',
          )
        let a = n.find((o) => o.kid === s.kid)
        if (!a) throw new Ct(t)
        if (a.alg && a.alg !== s.alg) throw new ia(a.alg, s.alg)
        return await la(t, a, { alg: s.alg, ...i })
      }),
      (ua = (t) => {
        let e = t.split(".")
        if (e.length !== 3) throw new Ct(t)
        try {
          let r = da(e[0]),
            i = da(e[1])
          return { header: r, payload: i }
        } catch {
          throw new Ct(t)
        }
      }),
      (hh = (t) => {
        let e = t.split(".")
        if (e.length !== 3) throw new Ct(t)
        try {
          return da(e[0])
        } catch {
          throw new Ct(t)
        }
      }))
  })
var Gt,
  i0 = K(() => {
    r0()
    Gt = { sign: e0, verify: la, decode: ua, verifyWithJwks: t0 }
  })
function pa(t) {
  let e = (t.realm ?? t.ctx.req.url).replace(/"/g, '\\"'),
    r = t.errDescription.replace(/"/g, '\\"')
  return new Response("Unauthorized", {
    status: 401,
    statusText: t.statusText,
    headers: {
      "WWW-Authenticate": `Bearer realm="${e}",error="${t.error}",error_description="${r}"`,
    },
  })
}
var s0,
  n0,
  ht,
  a0,
  Ir,
  o0 = K(() => {
    Rl()
    Hs()
    i0()
    Kr()
    s0 = (t) => {
      let e = t.verification || {}
      if (!t || !t.secret)
        throw new Error('JWT auth middleware requires options for "secret"')
      if (!t.alg)
        throw new Error('JWT auth middleware requires options for "alg"')
      if (!crypto.subtle || !crypto.subtle.importKey)
        throw new Error(
          "`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.",
        )
      return async function (i, s) {
        let n = t.headerName || "Authorization",
          a = i.req.raw.headers.get(n),
          o
        if (a) {
          let l = a.split(/\s+/)
          if (l.length !== 2 || l[0].toLowerCase() !== "bearer") {
            let u = "invalid credentials structure"
            throw new ar(401, {
              message: u,
              res: pa({
                ctx: i,
                error: "invalid_request",
                errDescription: u,
                realm: t.realm,
              }),
            })
          } else o = l[1]
        } else
          t.cookie &&
            (typeof t.cookie == "string"
              ? (o = Is(i, t.cookie))
              : t.cookie.secret
                ? t.cookie.prefixOptions
                  ? (o = await Qn(
                      i,
                      t.cookie.secret,
                      t.cookie.key,
                      t.cookie.prefixOptions,
                    ))
                  : (o = await Qn(i, t.cookie.secret, t.cookie.key))
                : t.cookie.prefixOptions
                  ? (o = Is(i, t.cookie.key, t.cookie.prefixOptions))
                  : (o = Is(i, t.cookie.key)))
        if (!o) {
          let l = "no authorization included in request"
          throw new ar(401, {
            message: l,
            res: pa({
              ctx: i,
              error: "invalid_request",
              errDescription: l,
              realm: t.realm,
            }),
          })
        }
        let c, d
        try {
          c = await Gt.verify(o, t.secret, { alg: t.alg, ...e })
        } catch (l) {
          d = l
        }
        if (!c)
          throw new ar(401, {
            message: "Unauthorized",
            res: pa({
              ctx: i,
              error: "invalid_token",
              statusText: "Unauthorized",
              errDescription: "token verification failure",
              realm: t.realm,
            }),
            cause: d,
          })
        ;(i.set("jwtPayload", c), await s())
      }
    }
    ;((n0 = Gt.verifyWithJwks),
      (ht = Gt.verify),
      (a0 = Gt.decode),
      (Ir = Gt.sign))
  })
var c0 = {}
Lr(c0, {
  AlgorithmTypes: () => ft,
  decode: () => a0,
  jwt: () => s0,
  sign: () => Ir,
  verify: () => ht,
  verifyWithJwks: () => n0,
})
var Rr = K(() => {
  o0()
  ta()
})
var d0 = K(() => {
  "use strict"
})
var Dt,
  E1,
  l0 = K(() => {
    "use strict"
    ;((Dt = class extends Error {
      constructor(r, i, s) {
        super(i)
        this.code = r
        this.message = i
        this.originalError = s
        this.name = "OpenListNextNextError"
      }
      code
      message
      originalError
    }),
      (E1 = {
        PathNotFound: new Dt(1004, "Path not found"),
        NotReady: new Dt(1003, "Storage not ready"),
        InvalidConfig: new Dt(1001, "Invalid configuration"),
        Unauthorized: new Dt(401, "Unauthorized access"),
        Forbidden: new Dt(403, "Permission denied"),
      }))
  })
var u0 = K(() => {
  "use strict"
})
var p0 = K(() => {
  "use strict"
})
var f0 = K(() => {
  "use strict"
})
async function Tt(t) {
  let e = t.req.header("Authorization")
  if (!e) return !1
  let r = e.startsWith("Bearer ") ? e.substring(7) : e,
    i = await U(t.env),
    s = i.settings.find((n) => n.key === "token")
  if (s && s.value && r === s.value) return !0
  try {
    let { verify: n } = await Promise.resolve().then(() => (Rr(), c0)),
      { getJwtSecret: a } = await Promise.resolve().then(() => (Ze(), h0)),
      o = await a(t),
      c = await n(r, o, "HS256")
    if (c && c.role === 2) {
      let d = (i.users || []).find(
        (l) => l.id === c.id || l.username === c.username,
      )
      return !!(d && !d.disabled)
    }
  } catch {}
  return !1
}
var Bs = K(() => {
  "use strict"
  ie()
  d0()
  l0()
  u0()
  p0()
  is()
  f0()
})
var h0 = {}
Lr(h0, {
  adminAuthMiddleware: () => Se,
  getJwtSecret: () => gt,
  getUserFromContext: () => ee,
})
function gh() {
  let t = new Uint8Array(32)
  return (
    crypto.getRandomValues(t),
    Array.from(t, (e) => e.toString(16).padStart(2, "0")).join("")
  )
}
async function mh(t) {
  try {
    let { getKvBinding: e } = await Promise.resolve().then(() => (ie(), hn)),
      r = await e(t)
    if (r.mode === "none" || !r.binding) return null
    let { binding: i, mode: s } = r,
      n = null
    if (s === "blob") n = await i.get(Ft)
    else
      try {
        n = await i.get(Ft, "text")
      } catch {
        n = await i.get(Ft)
      }
    return (
      n && typeof n.text == "function" && (n = await n.text()),
      n ? String(n) : null
    )
  } catch (e) {
    return (console.warn("[JWT] Failed to read secret from KV:", e), null)
  }
}
async function yh(t, e) {
  try {
    let { getKvBinding: r } = await Promise.resolve().then(() => (ie(), hn)),
      i = await r(t)
    if (i.mode === "none" || !i.binding) return
    let { binding: s, mode: n } = i
    n === "blob"
      ? typeof s.set == "function"
        ? await s.set(Ft, e)
        : typeof s.put == "function" && (await s.put(Ft, e))
      : typeof s.put == "function"
        ? await s.put(Ft, e)
        : typeof s.set == "function" && (await s.set(Ft, e))
  } catch (r) {
    console.warn("[JWT] Failed to persist secret to KV:", r)
  }
}
async function gt(t) {
  let e = t?.env || (typeof process < "u" ? process.env : {}) || {},
    r = e.JWT_SECRET
  if (r && r.length >= 16) return r
  let i = await mh(e)
  return i && i.length >= 16 ? i : (Us || ((Us = gh()), await yh(e, Us)), Us)
}
async function Se(t, e) {
  if (!(await Tt(t)))
    return t.json(
      {
        code: 401,
        message: "Unauthorized admin privilege required",
        data: null,
      },
      401,
    )
  await e()
}
async function ee(t) {
  if (await Tt(t))
    return {
      role: 2,
      permission: 0,
      disabled: !1,
      username: "api-token",
      base_path: "/",
    }
  let e = t.req.header("Authorization")
  if (!e) {
    let i = t.req.query("token") || t.req.query("access_token")
    i && (e = `Bearer ${i}`)
  }
  if (!e) {
    try {
      let s = ((await U(t.env)).users || []).find((n) => n.username === "guest")
      if (s && !s.disabled)
        return {
          id: s.id,
          role: s.role ?? 1,
          permission: s.permission ?? 0,
          disabled: !!s.disabled,
          username: s.username,
          base_path: s.base_path || "/",
          sso_id: s.sso_id || "",
          allow_ldap: !!s.allow_ldap,
          otp_secret: s.otp_secret,
        }
    } catch {}
    return null
  }
  let r = e.startsWith("Bearer ") ? e.substring(7) : e
  try {
    let i = await gt(t),
      s = await ht(r, i, "HS256"),
      a = ((await U(t.env)).users || []).find(
        (o) => o.id === s.id || o.username === s.username,
      )
    return !a || a.disabled
      ? null
      : {
          id: a.id,
          role: a.role,
          permission: a.permission ?? 0,
          disabled: !!a.disabled,
          username: a.username,
          base_path: a.base_path || "/",
          sso_id: a.sso_id || "",
          allow_ldap: !!a.allow_ldap,
          otp_secret: a.otp_secret,
        }
  } catch {
    return null
  }
}
var Us,
  Ft,
  Ze = K(() => {
    "use strict"
    Rr()
    Bs()
    ie()
    ;((Us = null), (Ft = "openlistnext_jwt_secret"))
  })
var Ms = (t, e, r) => (i, s) => {
  let n = -1
  return a(0)
  async function a(o) {
    if (o <= n) throw new Error("next() called multiple times")
    n = o
    let c,
      d = !1,
      l
    if (
      (t[o]
        ? ((l = t[o][0][0]), (i.req.routeIndex = o))
        : (l = (o === t.length && s) || void 0),
      l)
    )
      try {
        c = await l(i, () => a(o + 1))
      } catch (u) {
        if (u instanceof Error && e)
          ((i.error = u), (c = await e(u, i)), (d = !0))
        else throw u
      }
    else i.finalized === !1 && r && (c = await r(i))
    return (c && (i.finalized === !1 || d) && (i.res = c), i)
  }
}
Kr()
var ne = "ALL",
  eo = "all",
  to = ["get", "post", "put", "delete", "options", "patch", "query"],
  Wr = "Can not add a route since the matcher is already built.",
  Vr = class extends Error {}
var ro = "__COMPOSED_HANDLER"
yt()
var pu = (t) => t.text("404 Not Found", 404),
  io = (t, e) => {
    if ("getResponse" in t) {
      let r = t.getResponse()
      return e.newResponse(r.body, r)
    }
    return (console.error(t), e.text("Internal Server Error", 500))
  },
  so = class no {
    get;
    post
    put
    delete
    options
    patch
    query
    all
    on
    use
    router
    getPath
    _basePath = "/"
    #t = "/"
    routes = []
    constructor(e = {}) {
      ;([...to, eo].forEach((n) => {
        this[n] = (a, ...o) => (
          typeof a == "string" ? (this.#t = a) : this.#n(n, this.#t, a),
          o.forEach((c) => {
            this.#n(n, this.#t, c)
          }),
          this
        )
      }),
        (this.on = (n, a, ...o) => {
          for (let c of [a].flat()) {
            this.#t = c
            for (let d of [n].flat())
              o.map((l) => {
                this.#n(d.toUpperCase(), this.#t, l)
              })
          }
          return this
        }),
        (this.use = (n, ...a) => (
          typeof n == "string"
            ? (this.#t = n)
            : ((this.#t = "*"), a.unshift(n)),
          a.forEach((o) => {
            this.#n(ne, this.#t, o)
          }),
          this
        )))
      let { strict: i, ...s } = e
      ;(Object.assign(this, s),
        (this.getPath = (i ?? !0) ? (e.getPath ?? Vs) : Wa))
    }
    #e() {
      let e = new no({ router: this.router, getPath: this.getPath })
      return (
        (e.errorHandler = this.errorHandler),
        (e.#r = this.#r),
        (e.routes = this.routes),
        e
      )
    }
    #r = pu
    errorHandler = io
    route(e, r) {
      let i = this.basePath(e)
      return (
        r.routes.map((s) => {
          let n
          ;(r.errorHandler === io
            ? (n = s.handler)
            : ((n = async (a, o) =>
                (await Ms([], r.errorHandler)(a, () => s.handler(a, o))).res),
              (n[ro] = s.handler)),
            i.#n(s.method, s.path, n, s.basePath))
        }),
        this
      )
    }
    basePath(e) {
      let r = this.#e()
      return ((r._basePath = it(this._basePath, e)), r)
    }
    onError = (e) => ((this.errorHandler = e), this)
    notFound = (e) => ((this.#r = e), this)
    mount(e, r, i) {
      let s, n
      i &&
        (typeof i == "function"
          ? (n = i)
          : ((n = i.optionHandler),
            i.replaceRequest === !1 ? (s = (c) => c) : (s = i.replaceRequest)))
      let a = n
        ? (c) => {
            let d = n(c)
            return Array.isArray(d) ? d : [d]
          }
        : (c) => {
            let d
            try {
              d = c.executionCtx
            } catch {}
            return [c.env, d]
          }
      s ||= (() => {
        let c = it(this._basePath, e),
          d = c === "/" ? 0 : c.length
        return (l) => {
          let u = new URL(l.url)
          return (
            (u.pathname = this.getPath(l).slice(d) || "/"),
            new Request(u, l)
          )
        }
      })()
      let o = async (c, d) => {
        let l = await r(s(c.req.raw), ...a(c))
        if (l) return l
        await d()
      }
      return (this.#n(ne, it(e, "*"), o), this)
    }
    #n(e, r, i, s) {
      ;((e = e.toUpperCase()), (r = it(this._basePath, r)))
      let n = {
        basePath: s !== void 0 ? it(this._basePath, s) : this._basePath,
        path: r,
        method: e,
        handler: i,
      }
      ;(this.router.add(e, r, [i, n]), this.routes.push(n))
    }
    #i(e, r) {
      if (e instanceof Error) return this.errorHandler(e, r)
      throw e
    }
    #s(e, r, i, s) {
      if (s === "HEAD")
        return (async () => new Response(null, await this.#s(e, r, i, "GET")))()
      let n = this.getPath(e, { env: i }),
        a = this.router.match(s, n),
        o = new Qs(e, {
          path: n,
          matchResult: a,
          env: i,
          executionCtx: r,
          notFoundHandler: this.#r,
        })
      if (a[0].length === 1) {
        let d
        try {
          d = a[0][0][0][0](o, async () => {
            o.res = await this.#r(o)
          })
        } catch (l) {
          return this.#i(l, o)
        }
        return d instanceof Promise
          ? d
              .then((l) => l || (o.finalized ? o.res : this.#r(o)))
              .catch((l) => this.#i(l, o))
          : (d ?? this.#r(o))
      }
      let c = Ms(a[0], this.errorHandler, this.#r)
      return (async () => {
        try {
          let d = await c(o)
          if (!d.finalized)
            throw new Error(
              "Context is not finalized. Did you forget to return a Response object or `await next()`?",
            )
          return d.res
        } catch (d) {
          return this.#i(d, o)
        }
      })()
    }
    fetch = (e, ...r) => this.#s(e, r[1], r[0], e.method)
    request = (e, r, i, s) =>
      e instanceof Request
        ? this.fetch(r ? new Request(e, r) : e, i, s)
        : ((e = e.toString()),
          this.fetch(
            new Request(
              /^https?:\/\//.test(e) ? e : `http://localhost${it("/", e)}`,
              r,
            ),
            i,
            s,
          ))
    fire = () => {
      addEventListener("fetch", (e) => {
        e.respondWith(this.#s(e.request, e, void 0, e.request.method))
      })
    }
  }
yt()
var Gr = []
function Xs(t, e) {
  let r = this.buildAllMatchers(),
    i = (s, n) => {
      let a = r[s] || r[ne],
        o = a[2][n]
      if (o) return o
      let c = n.match(a[0])
      if (!c) return [[], Gr]
      let d = c.indexOf("", 1)
      return [a[1][d], c]
    }
  return ((this.match = i), i(t, e))
}
var Jr = "[^/]+",
  jt = ".*",
  xt = "(?:|/.*)",
  st = Symbol(),
  ao = new Set(".\\+*[^]$()")
function fu(t, e) {
  return t.length === 1
    ? e.length === 1
      ? t < e
        ? -1
        : 1
      : -1
    : e.length === 1
      ? 1
      : t === jt || t === xt
        ? e === xt
          ? -1
          : 1
        : e === jt || e === xt
          ? -1
          : t === Jr
            ? 1
            : e === Jr
              ? -1
              : t.length === e.length
                ? t < e
                  ? -1
                  : 1
                : e.length - t.length
}
var oo = class Zs {
  #t
  #e
  #r = Object.create(null)
  insert(e, r, i, s, n) {
    let a = this
    for (let o = 0, c = e.length; o < c; o++) {
      let d = e[o],
        l =
          d.length === 1
            ? d === "*"
              ? o === c - 1
                ? ["", "", jt]
                : ["", "", Jr]
              : null
            : d === "/*"
              ? ["", "", xt]
              : d.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),
        u
      if (l) {
        let p = l[1],
          f = l[2] || Jr
        if (
          p &&
          l[2] &&
          (f === ".*" ||
            ((f = f.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:")),
            /\((?!\?:)/.test(f)) ||
            (f.length === 1 && ao.has(f)))
        )
          throw st
        if (((u = a.#r[f]), !u)) {
          if (f !== jt && f !== xt) {
            for (let h in a.#r)
              if ((f.length > 1 || h.length > 1) && h !== jt && h !== xt)
                throw st
          }
          u = a.#r[f] = new Zs()
        }
        p !== "" && ((u.#e ??= s.varIndex++), i.push([p, u.#e]))
      } else if (((u = a.#r[d]), !u)) {
        for (let p in a.#r) if (p.length > 1 && p !== jt && p !== xt) throw st
        u = a.#r[d] = new Zs()
      }
      a = u
    }
    if (a.#t !== void 0) throw st
    a.#t = n ? -1 : r
  }
  buildRegExpStr() {
    let r = Object.keys(this.#r)
      .sort(fu)
      .map((i) => {
        let s = this.#r[i],
          n = s.buildRegExpStr()
        return n === ""
          ? ""
          : (typeof s.#e == "number"
              ? `(${i})@${s.#e}`
              : ao.has(i)
                ? `\\${i}`
                : i) + n
      })
      .filter(Boolean)
    return (
      typeof this.#t == "number" && this.#t !== -1 && r.unshift(`#${this.#t}`),
      r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")"
    )
  }
}
var Ys = class {
  #t = { varIndex: 0 }
  #e = new oo()
  #r = 0
  paths = Object.create(null)
  insert(t, e) {
    if (e) {
      this.#e.insert(t.split(""), 0, [], this.#t, !0)
      return
    }
    let r = [],
      i = [],
      s = t
    for (let a = 0; ; ) {
      let o = !1
      if (
        ((s = s.replace(/\{[^}]+\}/g, (c) => {
          let d = `@\\${a}`
          return ((i[a] = [d, c]), a++, (o = !0), d)
        })),
        !o)
      )
        break
    }
    let n = s.match(/(?::[^\/]+)|(?:\/\*$)|./g) || []
    for (let a = i.length - 1; a >= 0; a--) {
      let [o] = i[a]
      for (let c = n.length - 1; c >= 0; c--)
        if (n[c].indexOf(o) !== -1) {
          n[c] = n[c].replace(o, i[a][1])
          break
        }
    }
    ;(this.#e.insert(n, this.#r, r, this.#t, !1),
      (this.paths[t] = [this.#r++, r]))
  }
  buildRegExp() {
    let t = this.#e.buildRegExpStr()
    if (t === "") return [/^$/, [], []]
    let e = 0,
      r = [],
      i = []
    return (
      (t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, n, a) =>
        n !== void 0
          ? ((r[++e] = Number(n)), "$()")
          : (a !== void 0 && (i[Number(a)] = ++e), ""),
      )),
      [new RegExp(`^${t}`), r, i]
    )
  }
}
var co = Object.create(null)
function lo(t) {
  return (co[t] ??= new RegExp(
    t === "*"
      ? ""
      : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, r) => (r ? `\\${r}` : "(?:|/.*)"))}$`,
  ))
}
function hu() {
  co = Object.create(null)
}
function Qr(t, e) {
  if (t) {
    for (let r of Object.keys(t).sort((i, s) => s.length - i.length))
      if (lo(r).test(e)) return [...t[r]]
  }
}
var Xr = class {
  name = "RegExpRouter"
  #t
  #e
  #r
  constructor() {
    ;((this.#t = { [ne]: Object.create(null) }),
      (this.#e = { [ne]: Object.create(null) }),
      (this.#r = { [ne]: new Ys() }))
  }
  #n(t, e) {
    try {
      this.#r[t].insert(e, !/\*|\/:/.test(e))
    } catch (r) {
      throw r === st ? new Vr(e) : r
    }
  }
  add(t, e, r) {
    let i = this.#t,
      s = this.#e
    if (!i || !s) throw new Error(Wr)
    ;(i[t] ||
      ((this.#r[t] = new Ys()),
      [i, s].forEach((o) => {
        ;((o[t] = Object.create(null)),
          Object.keys(o[ne]).forEach((c) => {
            ;((o[t][c] = [...o[ne][c]]), this.#n(t, c))
          }))
      })),
      e === "/*" && (e = "*"))
    let n = (e.match(/\/:/g) || []).length
    if (/\*$/.test(e)) {
      let o = lo(e)
      ;(Object.keys(i).forEach((c) => {
        ;(t === ne || t === c) &&
          !i[c][e] &&
          (this.#n(c, e), (i[c][e] = Qr(i[c], e) || Qr(i[ne], e) || []))
      }),
        Object.keys(i).forEach((c) => {
          ;(t === ne || t === c) &&
            Object.keys(i[c]).forEach((d) => {
              o.test(d) && i[c][d].push([r, n])
            })
        }),
        Object.keys(s).forEach((c) => {
          ;(t === ne || t === c) &&
            Object.keys(s[c]).forEach((d) => o.test(d) && s[c][d].push([r, n]))
        }))
      return
    }
    let a = Hr(e) || [e]
    for (let o = 0, c = a.length; o < c; o++) {
      let d = a[o]
      Object.keys(s).forEach((l) => {
        ;(t === ne || t === l) &&
          (s[l][d] ||
            (this.#n(l, d),
            (s[l][d] = [...(Qr(i[l], d) || Qr(i[ne], d) || [])])),
          s[l][d].push([r, n - c + o + 1]))
      })
    }
  }
  match = Xs
  buildAllMatchers() {
    let t = Object.create(null)
    return (
      Object.keys(this.#e)
        .concat(Object.keys(this.#t))
        .forEach((e) => {
          t[e] ||= this.#i(e)
        }),
      (this.#t = this.#e = this.#r = void 0),
      hu(),
      t
    )
  }
  #i(t) {
    let e = this.#t[t],
      r = this.#e[t],
      i = this.#r[t],
      s = Object.create(null),
      n = []
    ;[e, r].forEach((l) => {
      for (let u in l) {
        let p = l[u],
          f = i.paths[u]
        if (!f) {
          s[u] = [p.map(([y]) => [y, Object.create(null)]), Gr]
          continue
        }
        let h = f[1]
        n[f[0]] = p.map(([y, x]) => {
          let g = Object.create(null)
          for (x -= 1; x >= 0; x--) {
            let [m, w] = h[x]
            g[m] = w
          }
          return [y, g]
        })
      }
    })
    let [a, o, c] = i.buildRegExp()
    for (let l = 0, u = n.length; l < u; l++)
      for (let p = 0, f = n[l].length; p < f; p++) {
        let h = n[l][p]?.[1]
        if (!h) continue
        let y = Object.keys(h)
        for (let x = 0, g = y.length; x < g; x++) h[y[x]] = c[h[y[x]]]
      }
    let d = []
    for (let l in o) d[l] = n[o[l]]
    return [a, d, s]
  }
}
var en = class {
  name = "SmartRouter"
  #t = []
  #e = []
  constructor(t) {
    this.#t = t.routers
  }
  add(t, e, r) {
    if (!this.#e) throw new Error(Wr)
    this.#e.push([t, e, r])
  }
  match(t, e) {
    if (!this.#e) throw new Error("Fatal error")
    let r = this.#t,
      i = this.#e,
      s = r.length,
      n = 0,
      a
    for (; n < s; n++) {
      let o = r[n]
      try {
        for (let c = 0, d = i.length; c < d; c++) o.add(...i[c])
        a = o.match(t, e)
      } catch (c) {
        if (c instanceof Vr) continue
        throw c
      }
      ;((this.match = o.match.bind(o)), (this.#t = [o]), (this.#e = void 0))
      break
    }
    if (n === s) throw new Error("Fatal error")
    return ((this.name = `SmartRouter + ${this.activeRouter.name}`), a)
  }
  get activeRouter() {
    if (this.#e || this.#t.length !== 1)
      throw new Error("No active router has been determined yet.")
    return this.#t[0]
  }
}
yt()
yt()
var cr = Object.create(null),
  gu = (t) => {
    for (let e in t) return !0
    return !1
  },
  uo = class po {
    #t
    #e
    #r
    #n = 0
    #i = cr
    constructor(e, r, i) {
      if (((this.#e = i || Object.create(null)), (this.#t = []), e && r)) {
        let s = Object.create(null)
        ;((s[e] = { handler: r, possibleKeys: [], score: 0 }), (this.#t = [s]))
      }
      this.#r = []
    }
    insert(e, r, i) {
      this.#n = ++this.#n
      let s = this,
        n = Ma(r),
        a = []
      for (let o = 0, c = n.length; o < c; o++) {
        let d = n[o],
          l = n[o + 1],
          u = Ha(d, l),
          p = Array.isArray(u) ? u[0] : d
        if (p in s.#e) {
          ;((s = s.#e[p]), u && a.push(u[1]))
          continue
        }
        ;((s.#e[p] = new po()),
          u && (s.#r.push(u), a.push(u[1])),
          (s = s.#e[p]))
      }
      return (
        s.#t.push({
          [e]: {
            handler: i,
            possibleKeys: a.filter((o, c, d) => d.indexOf(o) === c),
            score: this.#n,
          },
        }),
        s
      )
    }
    #s(e, r, i, s, n) {
      for (let a = 0, o = r.#t.length; a < o; a++) {
        let c = r.#t[a],
          d = c[i] || c[ne],
          l = {}
        if (
          d !== void 0 &&
          ((d.params = Object.create(null)),
          e.push(d),
          s !== cr || (n && n !== cr))
        )
          for (let u = 0, p = d.possibleKeys.length; u < p; u++) {
            let f = d.possibleKeys[u],
              h = l[d.score]
            ;((d.params[f] = n?.[f] && !h ? n[f] : (s[f] ?? n?.[f])),
              (l[d.score] = !0))
          }
      }
    }
    search(e, r) {
      let i = []
      this.#i = cr
      let n = [this],
        a = Ws(r),
        o = [],
        c = a.length,
        d = null
      for (let l = 0; l < c; l++) {
        let u = a[l],
          p = l === c - 1,
          f = []
        for (let y = 0, x = n.length; y < x; y++) {
          let g = n[y],
            m = g.#e[u]
          m &&
            ((m.#i = g.#i),
            p
              ? (m.#e["*"] && this.#s(i, m.#e["*"], e, g.#i),
                this.#s(i, m, e, g.#i))
              : f.push(m))
          for (let w = 0, v = g.#r.length; w < v; w++) {
            let _ = g.#r[w],
              b = g.#i === cr ? {} : { ...g.#i }
            if (_ === "*") {
              let k = g.#e["*"]
              k && (this.#s(i, k, e, g.#i), (k.#i = b), f.push(k))
              continue
            }
            let [P, E, S] = _
            if (!u && !(S instanceof RegExp)) continue
            let D = g.#e[P]
            if (S instanceof RegExp) {
              if (d === null) {
                d = new Array(c)
                let F = r[0] === "/" ? 1 : 0
                for (let A = 0; A < c; A++) ((d[A] = F), (F += a[A].length + 1))
              }
              let k = r.substring(d[l]),
                C = S.exec(k)
              if (C) {
                if (
                  ((b[E] = C[0]),
                  this.#s(i, D, e, g.#i, b),
                  C[0].length === k.length &&
                    D.#e["*"] &&
                    this.#s(i, D.#e["*"], e, g.#i, b),
                  gu(D.#e))
                ) {
                  D.#i = b
                  let F = C[0].match(/\//)?.length ?? 0
                  ;(o[F] ||= []).push(D)
                }
                continue
              }
            }
            ;(S === !0 || S.test(u)) &&
              ((b[E] = u),
              p
                ? (this.#s(i, D, e, b, g.#i),
                  D.#e["*"] && this.#s(i, D.#e["*"], e, b, g.#i))
                : ((D.#i = b), f.push(D)))
          }
        }
        let h = o.shift()
        n = h ? f.concat(h) : f
      }
      return (
        i.length > 1 && i.sort((l, u) => l.score - u.score),
        [i.map(({ handler: l, params: u }) => [l, u])]
      )
    }
  }
var tn = class {
  name = "TrieRouter"
  #t
  constructor() {
    this.#t = new uo()
  }
  add(t, e, r) {
    let i = Hr(e)
    if (i) {
      for (let s = 0, n = i.length; s < n; s++) this.#t.insert(t, i[s], r)
      return
    }
    this.#t.insert(t, e, r)
  }
  match(t, e) {
    return this.#t.search(t, e)
  }
}
var Q = class extends so {
  constructor(t = {}) {
    ;(super(t),
      (this.router = t.router ?? new en({ routers: [new Xr(), new tn()] })))
  }
}
Kr()
var fo = (t) => {
  let e = {
      origin: "*",
      allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "QUERY"],
      allowHeaders: [],
      exposeHeaders: [],
      ...t,
    },
    r = ((s) =>
      typeof s == "string"
        ? s === "*"
          ? () => s
          : (n) => (s === n ? n : null)
        : typeof s == "function"
          ? s
          : (n) => (s.includes(n) ? n : null))(e.origin),
    i = ((s) =>
      typeof s == "function" ? s : Array.isArray(s) ? () => s : () => [])(
      e.allowMethods,
    )
  return async function (n, a) {
    function o(d, l) {
      n.res.headers.set(d, l)
    }
    let c = await r(n.req.header("origin") || "", n)
    if (
      (c && o("Access-Control-Allow-Origin", c),
      e.credentials && o("Access-Control-Allow-Credentials", "true"),
      e.exposeHeaders?.length &&
        o("Access-Control-Expose-Headers", e.exposeHeaders.join(",")),
      n.req.method === "OPTIONS")
    ) {
      ;(e.origin !== "*" && o("Vary", "Origin"),
        e.maxAge != null && o("Access-Control-Max-Age", e.maxAge.toString()))
      let d = await i(n.req.header("origin") || "", n)
      d.length && o("Access-Control-Allow-Methods", d.join(","))
      let l = e.allowHeaders
      if (!l?.length) {
        let u = n.req.header("Access-Control-Request-Headers")
        u && (l = u.split(",").map((p) => p.trim()))
      }
      return (
        l?.length &&
          (o("Access-Control-Allow-Headers", l.join(",")),
          n.res.headers.append("Vary", "Access-Control-Request-Headers")),
        n.res.headers.delete("Content-Length"),
        n.res.headers.delete("Content-Type"),
        new Response(null, {
          headers: n.res.headers,
          status: 204,
          statusText: "No Content",
        })
      )
    }
    ;(await a(), e.origin !== "*" && n.header("Vary", "Origin", { append: !0 }))
  }
}
ie()
ie()
xe()
function V(t, e, r) {
  let i = r !== "desc",
    s = String(e || "name").toLowerCase(),
    n = [...t]
  return (
    n.sort((a, o) => {
      if (a.is_dir !== o.is_dir) return a.is_dir ? -1 : 1
      let c
      return (
        s.includes("size")
          ? (c = (a.size || 0) - (o.size || 0))
          : s.includes("time") ||
              s.includes("modified") ||
              s.includes("created")
            ? (c =
                new Date(a.modified).getTime() - new Date(o.modified).getTime())
            : (c = String(a.name).localeCompare(String(o.name))),
        i ? c : -c
      )
    }),
    n
  )
}
var Ne = {
  global: {
    oauth: "https://login.microsoftonline.com",
    api: "https://graph.microsoft.com",
  },
  cn: {
    oauth: "https://login.partner.microsoftonline.cn",
    api: "https://microsoftgraph.chinacloudapi.cn",
  },
  us: {
    oauth: "https://login.microsoftonline.us",
    api: "https://graph.microsoft.us",
  },
  de: {
    oauth: "https://login.microsoftonline.de",
    api: "https://graph.microsoft.de",
  },
}
function gn(t, e) {
  let r = ""
  return (
    t.thumbnails &&
      t.thumbnails.length > 0 &&
      (r = t.thumbnails[0].medium?.url || ""),
    {
      id: t.id,
      name: t.name,
      size: t.size,
      modified:
        t.lastModifiedDateTime || t.fileSystemInfo?.lastModifiedDateTime || "",
      isFolder: !!t.folder || !t.file,
      thumbnail: r,
      parentID: e,
      url: t["@microsoft.graph.downloadUrl"] || "",
    }
  )
}
async function mn(t) {
  if (t.use_online_api && t.api_url_address) {
    let n = new URLSearchParams({
        refresh_ui: t.refresh_token,
        server_use: "true",
        driver_txt: "onedrive_pr",
      }).toString(),
      o = await (await fetch(`${t.api_url_address}?${n}`)).json()
    if (!o.refresh_token || !o.access_token)
      throw o.text
        ? new Error(`failed to refresh token: ${o.text}`)
        : new Error("empty token returned from official API")
    ;((t.accessToken = o.access_token),
      (t.refresh_token = o.refresh_token),
      t.onTokenUpdate?.(t.refresh_token))
    return
  }
  if (!t.client_id || !t.client_secret)
    throw new Error("empty ClientID or ClientSecret")
  let r = `${(Ne[t.region] || Ne.global).oauth}/common/oauth2/v2.0/token`,
    s = await (
      await fetch(r, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: t.client_id,
          client_secret: t.client_secret,
          redirect_uri: t.redirect_uri,
          refresh_token: t.refresh_token,
        }).toString(),
      })
    ).json()
  if (!s.refresh_token) throw new Error("Empty token")
  ;((t.refresh_token = s.refresh_token),
    (t.accessToken = s.access_token),
    t.onTokenUpdate?.(t.refresh_token))
}
async function Ee(t, e, r, i, s) {
  let n = {
      method: r.toUpperCase(),
      headers: {
        Authorization: `Bearer ${t.accessToken}`,
        ...(i !== void 0 ? { "Content-Type": "application/json" } : {}),
      },
      ...(i !== void 0 ? { body: JSON.stringify(i) } : {}),
    },
    a = await fetch(e, n)
  if (!a.ok) {
    let o
    try {
      o = (await a.json()).error
    } catch {
      o = null
    }
    let c = o?.code
    if (
      (c === "InvalidAuthenticationToken" ||
        c === "ExpiredAuthenticationToken" ||
        a.status === 401) &&
      !s
    )
      return (await mn(t), Ee(t, e, r, i, !0))
    throw new Error(o?.message || `Request failed: ${a.status}`)
  }
  if (a.status !== 204) return a.json()
}
function qo(t, e, r) {
  let i = e.replace(/\\/g, "/")
  if (!i || i === "/") return r ? `${t}/drive/root/${r}` : `${t}/drive/root`
  let s = i.startsWith("/") ? i.slice(1) : i
  if ((s.endsWith("/") && (s = s.slice(0, -1)), !s || s === ""))
    return r ? `${t}/drive/root/${r}` : `${t}/drive/root`
  let n = s.split("/").map(encodeURIComponent).join("/")
  return r ? `${t}/drive/root:/${n}:/${r}` : `${t}/drive/root:/${n}:`
}
async function jo(t, e) {
  let r = Ne[t.region] || Ne.global,
    i = t.is_sharepoint
      ? `${r.api}/v1.0/sites/${t.site_id}`
      : `${r.api}/v1.0/me`,
    n = qo(
      i,
      e,
      "children?$top=1000&$expand=thumbnails($select=medium)&$select=id,name,size,fileSystemInfo,@microsoft.graph.downloadUrl,file,folder,parentReference",
    ),
    a = []
  for (; n; ) {
    let o = await Ee(t, n, "GET")
    ;(o.value && a.push(...o.value), (n = o["@odata.nextLink"]))
  }
  return a
}
async function zo(t, e) {
  let r = Ne[t.region] || Ne.global,
    i = t.is_sharepoint
      ? `${r.api}/v1.0/sites/${t.site_id}`
      : `${r.api}/v1.0/me`,
    s = qo(i, e)
  return Ee(t, s, "GET")
}
var ai = class {
  root_folder_path = "/"
  region = "global"
  is_sharepoint = !1
  use_online_api = !0
  api_url_address = "https://api.oplist.org/onedrive/renewapi"
  client_id = ""
  client_secret = ""
  redirect_uri = "https://api.oplist.org/onedrive/callback"
  refresh_token = ""
  site_id = ""
  chunk_size = 5
  custom_host = ""
  disable_disk_usage = !1
  enable_direct_upload = !1
  order_by = "filename"
  order_direction = "asc"
  accessToken = ""
  onTokenUpdate
  constructor(e, r) {
    ;(e && Object.assign(this, e), (this.onTokenUpdate = r))
  }
  async init() {
    ;(typeof this.is_sharepoint == "string" &&
      (this.is_sharepoint = this.is_sharepoint.toLowerCase() === "true"),
      typeof this.use_online_api == "string" &&
        (this.use_online_api = this.use_online_api.toLowerCase() === "true"),
      typeof this.chunk_size == "string" &&
        (this.chunk_size = parseInt(this.chunk_size) || 5),
      typeof this.disable_disk_usage == "string" &&
        (this.disable_disk_usage =
          this.disable_disk_usage.toLowerCase() === "true"),
      typeof this.enable_direct_upload == "string" &&
        (this.enable_direct_upload =
          this.enable_direct_upload.toLowerCase() === "true"),
      this.chunk_size < 1 && (this.chunk_size = 5),
      this.refresh_token && (await mn(this)))
  }
  getMetaUrl(e, r, i) {
    let s = Ne[this.region] || Ne.global
    if (e) return s.oauth
    let n = this.is_sharepoint
        ? `${s.api}/v1.0/sites/${this.site_id}`
        : `${s.api}/v1.0/me`,
      a = r.replace(/\\/g, "/")
    if (!a || a === "/") return i ? `${n}/drive/root/${i}` : `${n}/drive/root`
    let o = a.startsWith("/") ? a.slice(1) : a
    if ((o.endsWith("/") && (o = o.slice(0, -1)), !o || o === ""))
      return i ? `${n}/drive/root/${i}` : `${n}/drive/root`
    let c = o
      .split("/")
      .map((d) => {
        try {
          return encodeURIComponent(decodeURIComponent(d))
        } catch {
          return encodeURIComponent(d)
        }
      })
      .join("/")
    return i ? `${n}/drive/root:/${c}:/${i}` : `${n}/drive/root:/${c}:`
  }
  async list(e, r) {
    let s = (await jo(this, r)).map((n) => {
      let a = gn(n, ""),
        o = n["@microsoft.graph.downloadUrl"] || a.url || ""
      if (this.custom_host && o)
        try {
          let c = new URL(o)
          ;((c.host = this.custom_host), (o = c.toString()))
        } catch {}
      return {
        name: a.name,
        size: a.size,
        is_dir: a.isFolder,
        modified: a.modified,
        sign: "",
        type: a.isFolder ? 1 : 0,
        thumb: a.thumbnail || "",
        raw_url: o,
      }
    })
    return V(s, this.order_by, this.order_direction)
  }
  async get(e, r) {
    let i = await zo(this, r),
      s = gn(i, ""),
      n = i["@microsoft.graph.downloadUrl"] || s.url || ""
    if (this.custom_host && n)
      try {
        let a = new URL(n)
        ;((a.host = this.custom_host), (n = a.toString()))
      } catch {}
    return {
      name: s.name,
      size: s.size,
      is_dir: s.isFolder,
      modified: s.modified,
      sign: "",
      type: s.isFolder ? 1 : 0,
      thumb: s.thumbnail || "",
      raw_url: n,
    }
  }
  async mkdir(e, r) {
    let i = r.split("/").slice(0, -1).join("/") || "/",
      s = r.split("/").filter(Boolean).pop() || "",
      n = this.getMetaUrl(!1, i, "children")
    await Ee(this, n, "POST", {
      name: s,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename",
    })
  }
  async rename(e, r, i) {
    let s = { name: i },
      n = this.getMetaUrl(!1, r)
    await Ee(this, n, "PATCH", s)
  }
  async remove(e, r, i) {
    for (let s of i) {
      let n = r === "/" ? `/${s}` : `${r}/${s}`,
        a = this.getMetaUrl(!1, n)
      await Ee(this, a, "DELETE")
    }
  }
  async move(e, r, i, s, n) {
    let a = this.getMetaUrl(!1, n),
      o = await Ee(this, a, "GET"),
      c = o.id,
      d = o.parentReference?.driveId
    for (let l of i) {
      let u = s === "/" ? `/${l}` : `${s}/${l}`,
        p = {
          parentReference: { id: c, ...(d ? { driveId: d } : {}) },
          name: l,
        },
        f = this.getMetaUrl(!1, u)
      await Ee(this, f, "PATCH", p)
    }
  }
  async copy(e, r, i, s, n) {
    let a = this.getMetaUrl(!1, n),
      o = await Ee(this, a, "GET"),
      c = o.id,
      d = o.parentReference?.driveId
    for (let l of i) {
      let u = s === "/" ? `/${l}` : `${s}/${l}`,
        p = {
          parentReference: { id: c, ...(d ? { driveId: d } : {}) },
          name: l,
        },
        f = this.getMetaUrl(!1, u, "copy")
      await Ee(this, f, "POST", p)
    }
  }
  async put(e, r, i) {
    if (i.length <= 4 * 1024 * 1024) {
      let s = this.getMetaUrl(!1, r, "content")
      await Ee(this, s, "PUT", i)
    } else {
      let s = this.getMetaUrl(!1, r, "createUploadSession"),
        o = (
          await Ee(this, s, "POST", {
            item: { "@microsoft.graph.conflictBehavior": "rename" },
          })
        ).uploadUrl,
        c = this.chunk_size * 1024 * 1024,
        d = 0,
        l = i.length
      for (; d < l; ) {
        let u = l - d,
          p = Math.min(u, c),
          f = i.slice(d, d + p)
        ;(await fetch(o, {
          method: "PUT",
          headers: {
            "Content-Length": String(p),
            "Content-Range": `bytes ${d}-${d + p - 1}/${l}`,
          },
          body: f,
        }),
          (d += p))
      }
    }
  }
}
function yn(t, e) {
  let r = ""
  return (
    t.thumbnails &&
      t.thumbnails.length > 0 &&
      (r = t.thumbnails[0].medium?.url || ""),
    {
      id: t.id,
      name: t.name,
      size: t.size,
      modified:
        t.lastModifiedDateTime || t.fileSystemInfo?.lastModifiedDateTime || "",
      isFolder: !!t.folder || !t.file,
      thumbnail: r,
      parentID: e,
      url: t["@microsoft.graph.downloadUrl"] || "",
    }
  )
}
var vt = {
  global: {
    oauth: "https://login.microsoftonline.com",
    api: "https://graph.microsoft.com",
  },
  cn: {
    oauth: "https://login.chinacloudapi.cn",
    api: "https://microsoftgraph.chinacloudapi.cn",
  },
  us: {
    oauth: "https://login.microsoftonline.us",
    api: "https://graph.microsoft.us",
  },
  de: {
    oauth: "https://login.microsoftonline.de",
    api: "https://graph.microsoft.de",
  },
}
function De(t, e, r, i) {
  let s = vt[t.region] || vt.global
  if (e) return s.oauth
  let n = r ? r.replace(/\\/g, "/") : ""
  if (!n || n === "/")
    return i
      ? `${s.api}/v1.0/users/${t.email}/drive/root/${i}`
      : `${s.api}/v1.0/users/${t.email}/drive/root`
  let a = n.startsWith("/") ? n.slice(1) : n
  if ((a.endsWith("/") && (a = a.slice(0, -1)), !a || a === ""))
    return i
      ? `${s.api}/v1.0/users/${t.email}/drive/root/${i}`
      : `${s.api}/v1.0/users/${t.email}/drive/root`
  let o = a
    .split("/")
    .map((c) => {
      try {
        return encodeURIComponent(decodeURIComponent(c))
      } catch {
        return encodeURIComponent(c)
      }
    })
    .join("/")
  return i
    ? `${s.api}/v1.0/users/${t.email}/drive/root:/${o}:/${i}`
    : `${s.api}/v1.0/users/${t.email}/drive/root:/${o}:`
}
async function xn(t) {
  let e = null
  for (let r = 0; r < 3; r++)
    try {
      await Xu(t)
      return
    } catch (i) {
      e = i
    }
  throw e || new Error("Failed to get access token")
}
async function Xu(t) {
  if (!t.client_id || !t.client_secret)
    throw new Error("empty client_id or client_secret")
  if (!t.tenant_id) throw new Error("empty tenant_id")
  let e = vt[t.region] || vt.global,
    r = `${e.oauth}/${t.tenant_id}/oauth2/token`,
    i = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: t.client_id,
      client_secret: t.client_secret,
      resource: `${e.api}/`,
      scope: `${e.api}/.default`,
    }).toString(),
    n = await (
      await fetch(r, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: i,
      })
    ).json()
  if (n.error) throw new Error(n.error_description || n.error)
  if (!n.access_token)
    throw new Error("empty token returned from Microsoft identity platform")
  ;((t.accessToken = n.access_token), t.onTokenUpdate?.(t.accessToken))
}
async function we(t, e, r, i, s) {
  let n =
      i !== void 0 &&
      (typeof i == "string" ||
        i instanceof Uint8Array ||
        i instanceof ArrayBuffer ||
        (typeof Buffer < "u" && Buffer.isBuffer(i))),
    a = {
      method: r.toUpperCase(),
      headers: {
        Authorization: `Bearer ${t.accessToken}`,
        ...(i !== void 0 && !n ? { "Content-Type": "application/json" } : {}),
      },
      ...(i !== void 0 ? { body: n ? i : JSON.stringify(i) } : {}),
    },
    o = await fetch(e, a)
  if (!o.ok) {
    let c
    try {
      c = (await o.json()).error
    } catch {
      c = null
    }
    let d = c?.code
    if (
      (d === "InvalidAuthenticationToken" ||
        d === "ExpiredAuthenticationToken" ||
        o.status === 401) &&
      !s
    )
      return (await xn(t), we(t, e, r, i, !0))
    throw new Error(c?.message || `Request failed: ${o.status}`)
  }
  if (o.status !== 204) return o.json()
}
async function Lo(t, e) {
  let i = De(
      t,
      !1,
      e,
      "children?$top=1000&$expand=thumbnails($select=medium)&$select=id,name,size,fileSystemInfo,lastModifiedDateTime,@microsoft.graph.downloadUrl,file,folder,parentReference",
    ),
    s = []
  for (; i; ) {
    let n = await we(t, i, "GET")
    ;(n.value && s.push(...n.value), (i = n["@odata.nextLink"]))
  }
  return s
}
async function No(t, e) {
  let r = De(t, !1, e)
  return we(t, r, "GET")
}
async function Mo(t) {
  let r = `${(vt[t.region] || vt.global).api}/v1.0/users/${t.email}/drive`
  return we(t, r, "GET", void 0, !0)
}
async function Ho(t, e) {
  let r = De(t, !1, e, "createUploadSession"),
    n = (
      await we(t, r, "POST", {
        item: { "@microsoft.graph.conflictBehavior": "rename" },
      })
    ).uploadUrl
  if (!n) throw new Error("failed to get upload URL from response")
  return {
    UploadURL: n,
    ChunkSize: (t.chunk_size || 5) * 1024 * 1024,
    Method: "PUT",
  }
}
var oi = class {
  root_folder_path = "/"
  region = "global"
  client_id = ""
  client_secret = ""
  tenant_id = ""
  email = ""
  chunk_size = 5
  custom_host = ""
  disable_disk_usage = !1
  enable_direct_upload = !1
  order_by = "filename"
  order_direction = "asc"
  accessToken = ""
  onTokenUpdate
  constructor(e, r) {
    ;(e && Object.assign(this, e), (this.onTokenUpdate = r))
  }
  async init() {
    ;(typeof this.chunk_size == "string" &&
      (this.chunk_size = parseInt(this.chunk_size) || 5),
      typeof this.disable_disk_usage == "string" &&
        (this.disable_disk_usage =
          this.disable_disk_usage.toLowerCase() === "true"),
      typeof this.enable_direct_upload == "string" &&
        (this.enable_direct_upload =
          this.enable_direct_upload.toLowerCase() === "true"),
      this.chunk_size < 1 && (this.chunk_size = 5),
      this.client_id &&
        this.client_secret &&
        this.tenant_id &&
        (await xn(this)))
  }
  async list(e, r) {
    let s = (await Lo(this, r)).map((n) => {
      let a = yn(n, ""),
        o = n["@microsoft.graph.downloadUrl"] || a.url || ""
      if (this.custom_host && o)
        try {
          let c = new URL(o)
          ;((c.host = this.custom_host), (o = c.toString()))
        } catch {}
      return {
        name: a.name,
        size: a.size,
        is_dir: a.isFolder,
        modified: a.modified,
        sign: "",
        type: a.isFolder ? 1 : 0,
        thumb: a.thumbnail || "",
        raw_url: o,
      }
    })
    return V(s, this.order_by, this.order_direction)
  }
  async get(e, r) {
    let i = await No(this, r),
      s = yn(i, ""),
      n = i["@microsoft.graph.downloadUrl"] || s.url || ""
    if (this.custom_host && n)
      try {
        let a = new URL(n)
        ;((a.host = this.custom_host), (n = a.toString()))
      } catch {}
    return {
      name: s.name,
      size: s.size,
      is_dir: s.isFolder,
      modified: s.modified,
      sign: "",
      type: s.isFolder ? 1 : 0,
      thumb: s.thumbnail || "",
      raw_url: n,
    }
  }
  async mkdir(e, r) {
    let i = r.split("/").slice(0, -1).join("/") || "/",
      s = r.split("/").filter(Boolean).pop() || "",
      n = De(this, !1, i, "children")
    await we(this, n, "POST", {
      name: s,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename",
    })
  }
  async rename(e, r, i) {
    let s = { name: i },
      n = De(this, !1, r)
    await we(this, n, "PATCH", s)
  }
  async remove(e, r, i) {
    for (let s of i) {
      let n = r === "/" ? `/${s}` : `${r}/${s}`,
        a = De(this, !1, n)
      await we(this, a, "DELETE")
    }
  }
  async move(e, r, i, s, n) {
    let a = De(this, !1, n),
      o = await we(this, a, "GET"),
      c = o.id,
      d = o.parentReference?.driveId
    for (let l of i) {
      let u = s === "/" ? `/${l}` : `${s}/${l}`,
        p = {
          parentReference: { id: c, ...(d ? { driveId: d } : {}) },
          name: l,
        },
        f = De(this, !1, u)
      await we(this, f, "PATCH", p)
    }
  }
  async copy(e, r, i, s, n) {
    let a = De(this, !1, n),
      o = await we(this, a, "GET"),
      c = o.id,
      d = o.parentReference?.driveId
    for (let l of i) {
      let u = s === "/" ? `/${l}` : `${s}/${l}`,
        p = {
          parentReference: { id: c, ...(d ? { driveId: d } : {}) },
          name: l,
        },
        f = De(this, !1, u, "copy")
      await we(this, f, "POST", p)
    }
  }
  async put(e, r, i) {
    if (i.length <= 4 * 1024 * 1024) {
      let s = De(this, !1, r, "content")
      await we(this, s, "PUT", i)
    } else {
      let s = De(this, !1, r, "createUploadSession"),
        o = (
          await we(this, s, "POST", {
            item: { "@microsoft.graph.conflictBehavior": "rename" },
          })
        ).uploadUrl,
        c = this.chunk_size * 1024 * 1024,
        d = 0,
        l = i.length
      for (; d < l; ) {
        let u = l - d,
          p = Math.min(u, c),
          f = i.slice(d, d + p)
        ;(await fetch(o, {
          method: "PUT",
          headers: {
            "Content-Length": String(p),
            "Content-Range": `bytes ${d}-${d + p - 1}/${l}`,
          },
          body: f,
        }),
          (d += p))
      }
    }
  }
  async getDetails() {
    if (this.disable_disk_usage) return {}
    let e = await Mo(this)
    return { total: e.quota.total, used: e.quota.used, free: e.quota.remaining }
  }
  async getDirectUploadInfo(e) {
    if (!this.enable_direct_upload)
      throw new Error("Direct upload is not enabled")
    return Ho(this, e)
  }
}
xe()
var Zu = "https://openapi.aliyundrive.com/adrive/v1.0",
  ci = class {
    addition
    accessToken = ""
    refreshTokenVal = ""
    driveId = ""
    tokenExpiresAt = 0
    constructor(e) {
      ;((this.addition = e),
        (this.refreshTokenVal = e.refresh_token || ""),
        (this.driveId = e.drive_id || ""))
    }
    async init() {
      if (!this.refreshTokenVal || !this.refreshTokenVal.trim()) {
        console.warn("[AliyundriveOpen] refresh_token is empty, skipping init.")
        return
      }
      try {
        ;(await this.refreshAccessToken(),
          this.driveId || (await this.resolveDriveId()))
      } catch (e) {
        console.warn("[AliyundriveOpen] init warning:", e.message)
      }
    }
    async resolveDriveId(e = !1) {
      if (!e && this.addition.drive_id && this.addition.drive_id.trim()) {
        this.driveId = this.addition.drive_id.trim()
        return
      }
      try {
        let r = await this.openApiRequest("/user/getDriveInfo", {}),
          i = e ? "resource" : this.addition.drive_type || "resource",
          s = ""
        ;(i === "resource" && r.resource_drive_id
          ? (s = r.resource_drive_id)
          : i === "backup" && r.backup_drive_id
            ? (s = r.backup_drive_id)
            : i === "default" && r.default_drive_id && (s = r.default_drive_id),
          s ||
            (s =
              r.resource_drive_id ||
              r.default_drive_id ||
              r.backup_drive_id ||
              ""),
          (this.driveId = s),
          console.log(
            `[AliyundriveOpen] Resolved drive_id: ${this.driveId} (driveType: ${i})`,
          ))
      } catch (r) {
        console.warn("[AliyundriveOpen] resolveDriveId failed:", r.message)
      }
    }
    async refreshAccessToken() {
      if (!this.refreshTokenVal || !this.refreshTokenVal.trim()) return
      let e = this.refreshTokenVal.trim(),
        r = []
      ;(this.addition.api_url_address &&
        this.addition.api_url_address.trim() &&
        r.push(this.addition.api_url_address.trim()),
        r.push(
          "https://api.oplist.org/alicloud/renewapi",
          "https://api.oplist.org/ali_open/token",
          "https://api.oplist.org/aliyundrive/token",
          "https://api.alist.nn.ci/alist/ali_open/token",
          "https://api.alist.nn.ci/aliyundrive/token",
          "https://api-sam.oplist.org/aliyundrive/token",
        ))
      let i =
        this.addition.alipan_type === "alipanTV" ? "alicloud_tv" : "alicloud_qr"
      for (let a of r)
        try {
          let o = new URLSearchParams({
              refresh_ui: e,
              refresh_token: e,
              server_use: "true",
              driver_txt: i,
            }),
            c = await fetch(`${a}?${o.toString()}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            })
          if (!c.ok) throw new Error(`[Status ${c.status}]`)
          let d = await c.json(),
            l = d.refresh_token || d.data?.refresh_token || "",
            u = d.access_token || d.data?.access_token || ""
          if (!u)
            throw new Error(
              `Empty access_token from online API: ${JSON.stringify(d)}`,
            )
          ;((this.accessToken = u),
            l && (this.refreshTokenVal = l),
            (this.tokenExpiresAt =
              Date.now() + (d.expires_in || 7200) * 1e3 - 6e4))
          return
        } catch (o) {
          console.warn(
            `[AliyundriveOpen] Online API '${a}' failed: ${o.message}`,
          )
        }
      let s =
          (this.addition.client_id || "").trim() ||
          "25ab4837190e48718a28f80073574a4d",
        n = (this.addition.client_secret || "").trim()
      try {
        let a = { grant_type: "refresh_token", refresh_token: e, client_id: s }
        n && (a.client_secret = n)
        let o = await fetch(
          "https://openapi.aliyundrive.com/oauth/access_token",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(a),
          },
        )
        if (!o.ok) {
          let d = await o.text().catch(() => "")
          throw new Error(`[Status ${o.status}] ${d}`)
        }
        let c = await o.json()
        if (!c.access_token)
          throw new Error(`Invalid response: ${JSON.stringify(c)}`)
        ;((this.accessToken = c.access_token),
          c.refresh_token && (this.refreshTokenVal = c.refresh_token),
          (this.tokenExpiresAt =
            Date.now() + (c.expires_in || 7200) * 1e3 - 6e4))
        return
      } catch (a) {
        console.warn(`[AliyundriveOpen] Direct OAuth failed: ${a.message}`)
      }
      throw new Error(
        "[AliyundriveOpen] All token refresh strategies failed. Please check: 1) refresh_token is valid and not expired, 2) api_url_address is accessible, 3) If using direct OAuth, client_id and client_secret are correct.",
      )
    }
    async ensureToken() {
      ;(!this.accessToken || Date.now() >= this.tokenExpiresAt) &&
        (await this.refreshAccessToken())
    }
    getRootFolderId() {
      return this.addition.root_folder_id?.trim() || "root"
    }
    async openApiRequest(e, r, i = !0) {
      await this.ensureToken()
      let s = e.startsWith("http") ? e : `${Zu}${e}`,
        n = await fetch(s, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
          body: JSON.stringify(r),
        })
      if (n.status === 401 && i)
        return (await this.refreshAccessToken(), this.openApiRequest(e, r, !1))
      if (!n.ok) {
        let a = await n.text().catch(() => "")
        throw new Error(`[AliyundriveOpen] API error [${n.status}] ${e}: ${a}`)
      }
      return n.json()
    }
    async listFiles(e) {
      this.driveId || (await this.resolveDriveId())
      let r = [],
        i,
        s = this.addition.order_by || "updated_at",
        n = this.addition.order_direction || "DESC"
      do {
        let a = {
          drive_id: this.driveId,
          parent_file_id: e,
          limit: 100,
          order_by: s,
          order_direction: n,
        }
        i && (a.marker = i)
        let o
        try {
          o = await this.openApiRequest("/openFile/list", a)
        } catch (c) {
          if (c.message?.includes("UserNotAllowedAccessDrive"))
            (console.warn(
              `[AliyundriveOpen] UserNotAllowedAccessDrive for drive ${this.driveId}, auto re-resolving drive_id...`,
            ),
              await this.resolveDriveId(!0),
              (a.drive_id = this.driveId),
              (o = await this.openApiRequest("/openFile/list", a)))
          else throw c
        }
        ;(r.push(...(o.items || [])), (i = o.next_marker || void 0))
      } while (i)
      return r
    }
    async getFile(e) {
      return (
        this.driveId || (await this.resolveDriveId()),
        this.openApiRequest("/openFile/get", {
          drive_id: this.driveId,
          file_id: e,
        })
      )
    }
    async getDownloadUrl(e) {
      let r = await this.openApiRequest("/openFile/getDownloadUrl", {
        drive_id: this.driveId,
        file_id: e,
        expire_sec: 14400,
      })
      return r.url || r.download_url || ""
    }
    async mkdir(e, r) {
      await this.openApiRequest("/openFile/create", {
        drive_id: this.driveId,
        parent_file_id: e,
        name: r,
        type: "folder",
        check_name_mode: "refuse",
      })
    }
    async rename(e, r) {
      await this.openApiRequest("/openFile/update", {
        drive_id: this.driveId,
        file_id: e,
        name: r,
        check_name_mode: "refuse",
      })
    }
    async remove(e) {
      let r = this.addition.remove_way || "trash"
      await this.openApiRequest(
        r === "trash" ? "/openFile/recyclebin" : "/openFile/delete",
        { drive_id: this.driveId, file_id: e },
      )
    }
    async move(e, r) {
      await this.openApiRequest("/openFile/move", {
        drive_id: this.driveId,
        file_id: e,
        to_parent_file_id: r,
        check_name_mode: "refuse",
      })
    }
    async copy(e, r) {
      await this.openApiRequest("/openFile/copy", {
        drive_id: this.driveId,
        file_id: e,
        to_parent_file_id: r,
        auto_rename: !0,
      })
    }
    async putFile(e, r, i) {
      let s = i.length,
        n = await this.openApiRequest("/openFile/create", {
          drive_id: this.driveId,
          parent_file_id: e,
          name: r,
          type: "file",
          size: s,
          check_name_mode: "auto_rename",
          part_info_list: [{ part_number: 1 }],
        }),
        a = n.part_info_list?.[0]?.upload_url
      if (!a) return
      let o = await fetch(a, { method: "PUT", body: i })
      if (!o.ok) throw new Error(`[AliyundriveOpen] Upload failed: ${o.status}`)
      await this.openApiRequest("/openFile/complete", {
        drive_id: this.driveId,
        file_id: n.file_id,
        upload_id: n.upload_id,
      })
    }
  }
function Ko(t) {
  let e = t.type === "folder"
  return {
    name: t.name,
    size: t.size || 0,
    is_dir: e,
    modified: t.updated_at || t.created_at || new Date().toISOString(),
    sign: "",
    type: W(t.name, e),
    thumb: t.thumbnail || "",
    raw_url: t.download_url || "",
  }
}
var di = class {
  client
  addition
  pathFileIdCache = new Map()
  constructor(e) {
    ;((this.addition = e), (this.client = new ci(e)))
  }
  async init() {
    await this.client.init()
  }
  async list(e, r) {
    let i = await this.resolveFileId(r),
      n = (await this.client.listFiles(i)).map(Ko)
    return V(n, this.addition.order_by, this.addition.order_direction)
  }
  async get(e, r) {
    let i = await this.resolveFileId(r),
      s = await this.client.getFile(i).catch(() => null),
      n = await this.client.getDownloadUrl(i).catch(() => "")
    if (s) {
      let c = Ko(s)
      return ((c.raw_url = n || c.raw_url), c)
    }
    try {
      await this.client.listFiles(i)
      let c = r.split("/").filter(Boolean)
      return {
        name: c[c.length - 1] || "root",
        size: 0,
        is_dir: !0,
        modified: new Date().toISOString(),
        sign: "",
        type: 1,
        raw_url: "",
      }
    } catch {}
    let a = r.split("/").filter(Boolean)
    return {
      name: a[a.length - 1] || "root",
      size: 0,
      is_dir: !1,
      modified: new Date().toISOString(),
      sign: "",
      type: 0,
      raw_url: n,
    }
  }
  async mkdir(e, r) {
    let i = r.split("/").filter(Boolean),
      s = i.pop() || "\u65B0\u6587\u4EF6\u5939",
      n = "/" + i.join("/"),
      a = await this.resolveFileId(n)
    await this.client.mkdir(a, s)
  }
  async rename(e, r, i) {
    let s = await this.resolveFileId(r)
    await this.client.rename(s, i)
  }
  async remove(e, r, i) {
    let s = await this.resolveFileId(r)
    await this.client.remove(s)
  }
  async move(e, r, i, s, n) {
    let a = await this.resolveFileId(s),
      o = await this.resolveFileId(r)
    await this.client.move(a, o)
  }
  async copy(e, r, i, s, n) {
    let a = await this.resolveFileId(s),
      o = await this.resolveFileId(r)
    await this.client.copy(a, o)
  }
  async put(e, r, i) {
    let s = r.split("/").filter(Boolean),
      n = s.pop() || "upload",
      a = "/" + s.join("/"),
      o = await this.resolveFileId(a)
    await this.client.putFile(o, n, i)
  }
  async resolveFileId(e) {
    let r = e.split("/").filter(Boolean).join("/")
    if (!r) return this.client.getRootFolderId()
    if (this.pathFileIdCache.has(r)) return this.pathFileIdCache.get(r)
    let i = r.split("/"),
      s = this.client.getRootFolderId()
    for (let n = 0; n < i.length; n++) {
      let a = i[n],
        o = (() => {
          try {
            return decodeURIComponent(a)
          } catch {
            return a
          }
        })(),
        c = i.slice(0, n + 1).join("/")
      if (this.pathFileIdCache.has(c)) {
        s = this.pathFileIdCache.get(c)
        continue
      }
      let l = (await this.client.listFiles(s)).find(
        (u) => u.name === a || u.name === o || u.file_id === a,
      )
      if (!l) throw new Error(`[AliyundriveOpen] Path '${a}' not found`)
      ;((s = l.file_id), this.pathFileIdCache.set(c, s))
    }
    return s
  }
}
var yr = "application/vnd.google-apps.folder",
  Wo = "application/vnd.google-apps.shortcut",
  Vo =
    "files(id,name,mimeType,size,modifiedTime,createdTime,thumbnailLink,shortcutDetails,md5Checksum,sha1Checksum,sha256Checksum),nextPageToken"
var at = "https://www.googleapis.com/drive/v3",
  Go = "https://www.googleapis.com/upload/drive/v3",
  Yu = "https://oauth2.googleapis.com/token",
  li = class {
    addition
    accessToken = ""
    refreshTokenVal = ""
    tokenExpiresAt = 0
    constructor(e) {
      ;((this.addition = e), (this.refreshTokenVal = e.refresh_token || ""))
    }
    getRootFolderId() {
      return this.addition.root_folder_id?.trim() || "root"
    }
    async init() {
      if (!this.refreshTokenVal || !this.refreshTokenVal.trim()) {
        console.warn("[GoogleDrive] refresh_token is empty, skipping init.")
        return
      }
      try {
        await this.refreshAccessToken()
      } catch (e) {
        console.warn("[GoogleDrive] init token refresh warning:", e.message)
      }
    }
    async refreshAccessToken() {
      let e = this.refreshTokenVal.trim()
      if (!e) return
      let r = this.addition.use_online_api !== !1,
        i = []
      r &&
        (this.addition.api_url_address?.trim() &&
          i.push(this.addition.api_url_address.trim()),
        i.push(
          "https://api.oplist.org/google/token",
          "https://api.oplist.org/google/renewapi",
          "https://api.oplist.org/googledrive/token",
          "https://api-sam.oplist.org/google/token",
          "https://api-sam.oplist.org/googledrive/token",
          "https://api.alist.nn.ci/google/token",
          "https://api.alist.nn.ci/googledrive/token",
        ))
      for (let a of i)
        try {
          let o = new URLSearchParams({
              refresh_ui: e,
              server_use: "true",
              driver_txt: "googleui_go",
            }),
            c = await fetch(`${a}?${o.toString()}`, { method: "GET" })
          if (!c.ok) throw new Error(`[Status ${c.status}]`)
          let d = await c.json(),
            l = d.access_token || d.data?.access_token || "",
            u = d.refresh_token || d.data?.refresh_token || ""
          if (!l) {
            let p = d.text || d.error || "empty access_token"
            throw new Error(p)
          }
          ;((this.accessToken = l),
            u && (this.refreshTokenVal = u),
            (this.tokenExpiresAt =
              Date.now() + (d.expires_in || 3600) * 1e3 - 6e4))
          return
        } catch (o) {
          console.warn(`[GoogleDrive] Online API '${a}' failed: ${o.message}`)
        }
      let s =
          (this.addition.client_id || "").trim() ||
          "202264815644-2n82p2e49c7o6026u87j9e22v1n25c27.apps.googleusercontent.com",
        n =
          (this.addition.client_secret || "").trim() ||
          "GOCSPX-4bH5Kx3s_89_j6j2x-2x3-8x"
      if (s && n)
        try {
          let a = await fetch(Yu, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: s,
              client_secret: n,
              refresh_token: e,
              grant_type: "refresh_token",
            }).toString(),
          })
          if (!a.ok) {
            let c = await a.text().catch(() => "")
            throw new Error(`[Status ${a.status}] ${c}`)
          }
          let o = await a.json()
          if (!o.access_token)
            throw new Error(`Invalid OAuth response: ${JSON.stringify(o)}`)
          ;((this.accessToken = o.access_token),
            o.refresh_token && (this.refreshTokenVal = o.refresh_token),
            (this.tokenExpiresAt =
              Date.now() + (o.expires_in || 3600) * 1e3 - 6e4))
          return
        } catch (a) {
          console.warn(`[GoogleDrive] Direct OAuth failed: ${a.message}`)
        }
      throw new Error(
        "[GoogleDrive] All token refresh strategies failed. Please check: 1) refresh_token is valid, 2) api_url_address is accessible, 3) If using direct OAuth: client_id and client_secret are correct.",
      )
    }
    async ensureToken() {
      ;(!this.accessToken || Date.now() >= this.tokenExpiresAt) &&
        (await this.refreshAccessToken())
    }
    async request(e, r = {}, i = !0) {
      await this.ensureToken()
      let s = await fetch(e, {
        ...r,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          ...(r.headers || {}),
        },
      })
      if (s.status === 401 && i)
        return (
          console.warn("[GoogleDrive] 401 Unauthorized, refreshing token..."),
          await this.refreshAccessToken(),
          this.request(e, r, !1)
        )
      if (!s.ok) {
        let n = await s.text().catch(() => "")
        throw new Error(`[GoogleDrive] API error [${s.status}]: ${n}`)
      }
      return s.status === 204 ? null : s.json()
    }
    async listFiles(e) {
      let r = [],
        i,
        s = this.addition.order_by || "folder,name,modifiedTime desc"
      do {
        let n = new URLSearchParams({
          q: `'${e}' in parents and trashed = false`,
          fields: Vo,
          orderBy: s,
          pageSize: "1000",
          includeItemsFromAllDrives: "true",
          supportsAllDrives: "true",
        })
        i && n.set("pageToken", i)
        let a = `${at}/files?${n.toString()}`,
          o = await this.request(a),
          c = o.files || []
        for (let d of c)
          d.mimeType === Wo &&
            d.shortcutDetails?.targetId &&
            ((d.id = d.shortcutDetails.targetId),
            (d.mimeType = d.shortcutDetails.targetMimeType || d.mimeType))
        ;(r.push(...c), (i = o.nextPageToken))
      } while (i)
      return r
    }
    async getFile(e) {
      let r = new URLSearchParams({
        fields: "id,name,mimeType,size,modifiedTime,md5Checksum",
        includeItemsFromAllDrives: "true",
        supportsAllDrives: "true",
      })
      return this.request(`${at}/files/${e}?${r.toString()}`)
    }
    getDownloadUrl(e) {
      return `${at}/files/${e}?includeItemsFromAllDrives=true&supportsAllDrives=true&alt=media&acknowledgeAbuse=true`
    }
    getDownloadHeaders() {
      return { Authorization: `Bearer ${this.accessToken}` }
    }
    async mkdir(e, r) {
      await this.request(`${at}/files?supportsAllDrives=true`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: r, parents: [e], mimeType: yr }),
      })
    }
    async rename(e, r) {
      await this.request(`${at}/files/${e}?supportsAllDrives=true`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: r }),
      })
    }
    async remove(e) {
      await this.request(`${at}/files/${e}?supportsAllDrives=true`, {
        method: "DELETE",
      })
    }
    async move(e, r, i) {
      let s = new URLSearchParams({
        addParents: i,
        removeParents: r,
        supportsAllDrives: "true",
      })
      await this.request(`${at}/files/${e}?${s.toString()}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      })
    }
    async copy(e, r, i) {
      await this.request(`${at}/files/${e}/copy?supportsAllDrives=true`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: i, parents: [r] }),
      })
    }
    async putFile(e, r, i, s = "application/octet-stream") {
      let n = (this.addition.chunk_size || 5) * 1024 * 1024
      if (i.length <= n) {
        let a = new URLSearchParams({
            uploadType: "multipart",
            supportsAllDrives: "true",
          }),
          o = `----GoogleDriveBoundary${Date.now()}`,
          c = JSON.stringify({ name: r, parents: [e] }),
          d = `--${o}\r
Content-Type: application/json\r
\r
${c}\r
--${o}\r
Content-Type: ${s}\r
\r
`,
          l = Buffer.from(d),
          u = Buffer.from(`\r
--${o}--`),
          p = Buffer.concat([l, i, u])
        await this.request(`${Go}/files?${a.toString()}`, {
          method: "POST",
          headers: { "Content-Type": `multipart/related; boundary=${o}` },
          body: p,
        })
      } else {
        let a = new URLSearchParams({
          uploadType: "resumable",
          supportsAllDrives: "true",
        })
        await this.ensureToken()
        let o = await fetch(`${Go}/files?${a.toString()}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
            "X-Upload-Content-Type": s,
            "X-Upload-Content-Length": String(i.length),
          },
          body: JSON.stringify({ name: r, parents: [e] }),
        })
        if (!o.ok)
          throw new Error(
            `[GoogleDrive] Resumable upload init failed: ${o.status}`,
          )
        let c = o.headers.get("location")
        if (!c) throw new Error("[GoogleDrive] No upload URL returned")
        let d = 0
        for (; d < i.length; ) {
          let l = i.slice(d, d + n),
            u = d + l.length - 1,
            p = await fetch(c, {
              method: "PUT",
              headers: {
                "Content-Range": `bytes ${d}-${u}/${i.length}`,
                "Content-Type": s,
              },
              body: l,
            })
          if (!p.ok && p.status !== 308)
            throw new Error(`[GoogleDrive] Chunk upload failed: ${p.status}`)
          d += l.length
        }
      }
    }
    pathCache = new Map()
    async resolveFileId(e) {
      let r = e.split("/").filter(Boolean).join("/")
      if (!r) return this.getRootFolderId()
      if (this.pathCache.has(r)) return this.pathCache.get(r)
      let i = r.split("/"),
        s = this.getRootFolderId()
      for (let n = 0; n < i.length; n++) {
        let a = i[n],
          o = (() => {
            try {
              return decodeURIComponent(a)
            } catch {
              return a
            }
          })(),
          c = i.slice(0, n + 1).join("/")
        if (this.pathCache.has(c)) {
          s = this.pathCache.get(c)
          continue
        }
        let l = (await this.listFiles(s)).find(
          (u) => u.name === a || u.name === o || u.id === a,
        )
        if (!l) throw new Error(`[GoogleDrive] Path '${a}' not found`)
        ;((s = l.id), this.pathCache.set(c, s))
      }
      return s
    }
    async resolveParentAndName(e) {
      let r = e.split("/").filter(Boolean),
        i = r.pop() || "unnamed",
        s = "/" + r.join("/")
      return { parentId: await this.resolveFileId(s), name: i }
    }
  }
function Jo(t) {
  return {
    name: t.name,
    size: t.size ? parseInt(t.size, 10) : 0,
    is_dir: t.mimeType === yr,
    modified: t.modifiedTime || t.createdTime || new Date().toISOString(),
    sign: "",
    type: t.mimeType === yr ? 1 : 0,
    thumb: t.thumbnailLink || "",
    raw_url: "",
  }
}
var ui = class {
  client
  addition
  constructor(e) {
    ;((this.addition = e), (this.client = new li(e)))
  }
  async init() {
    await this.client.init()
  }
  async list(e, r) {
    let i = await this.client.resolveFileId(r),
      n = (await this.client.listFiles(i)).map(Jo)
    return V(n, this.addition.order_by, this.addition.order_direction)
  }
  async get(e, r) {
    let i = await this.client.resolveFileId(r),
      s = await this.client.getFile(i).catch(() => null)
    if (s) {
      let o = Jo(s)
      return (
        (o.raw_url = this.client.getDownloadUrl(i)),
        (o.raw_url_headers = this.client.getDownloadHeaders()),
        o
      )
    }
    let n = r.split("/").filter(Boolean),
      a = n[n.length - 1] || "root"
    try {
      return (
        await this.client.listFiles(i),
        {
          name: a,
          size: 0,
          is_dir: !0,
          modified: new Date().toISOString(),
          sign: "",
          type: 1,
          raw_url: "",
        }
      )
    } catch {}
    return {
      name: a,
      size: 0,
      is_dir: !1,
      modified: new Date().toISOString(),
      sign: "",
      type: 0,
      raw_url: "",
    }
  }
  async mkdir(e, r) {
    let { parentId: i, name: s } = await this.client.resolveParentAndName(r)
    await this.client.mkdir(i, s)
  }
  async rename(e, r, i) {
    let s = await this.client.resolveFileId(r)
    await this.client.rename(s, i)
  }
  async remove(e, r, i) {
    let s = await this.client.resolveFileId(r)
    await this.client.remove(s)
  }
  async move(e, r, i, s, n) {
    let a = await this.client.resolveFileId(s),
      o = s.split("/").filter(Boolean)
    o.pop()
    let c = await this.client.resolveFileId("/" + o.join("/")),
      d = await this.client.resolveFileId(r)
    await this.client.move(a, c, d)
  }
  async copy(e, r, i, s, n) {
    let a = await this.client.resolveFileId(s),
      o = s.split("/").filter(Boolean).pop() || "copy",
      c = await this.client.resolveFileId(r)
    await this.client.copy(a, c, o)
  }
  async put(e, r, i) {
    let { parentId: s, name: n } = await this.client.resolveParentAndName(r)
    await this.client.putFile(s, n, i)
  }
}
xe()
var wr = mt(_t(), 1),
  ep = {
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) quark-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch",
    referer: "https://pan.quark.cn",
    api: "https://drive-m.quark.cn/1/clouddrive",
    pr: "ucpro",
  },
  tp = {
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) uc-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch",
    referer: "https://drive.uc.cn",
    api: "https://pc-api.uc.cn/1/clouddrive",
    pr: "UCBrowser",
  }
function rp(t = "Quark") {
  return t === "UC" ? tp : ep
}
function id(t, e, r) {
  let i = t
      .split(";")
      .map((a) => a.trim())
      .filter(Boolean),
    s = i.findIndex((a) => {
      let o = a.indexOf("=")
      return o !== -1 && a.substring(0, o).trim() === e
    }),
    n = `${e}=${r}`
  return (s !== -1 ? (i[s] = n) : i.push(n), i.join("; "))
}
var Xi = class {
    addition
    conf
    cookie
    onCookieUpdate
    constructor(e, r) {
      ;((this.addition = e),
        (this.conf = rp(e.variant || "Quark")),
        (this.cookie = e.cookie || ""),
        (this.onCookieUpdate = r))
    }
    getRootFolderId() {
      return (this.addition.root_folder_id || "").trim() || "0"
    }
    getVariant() {
      return this.addition.variant || "Quark"
    }
    getConf() {
      return this.conf
    }
    getCookie() {
      return this.cookie
    }
    async request(e, r, i, s) {
      let n = new URL(this.conf.api + e)
      if (
        (n.searchParams.set("pr", this.conf.pr),
        n.searchParams.set("fr", "pc"),
        i)
      )
        for (let [u, p] of Object.entries(i)) n.searchParams.set(u, p)
      let a = {
          Cookie: this.cookie,
          Accept: "application/json, text/plain, */*",
          Referer: this.conf.referer,
          "Content-Type": "application/json",
          "User-Agent": this.conf.ua,
        },
        o = { method: r, headers: a }
      s !== void 0 && r !== "GET" && (o.body = JSON.stringify(s))
      let c = await fetch(n.toString(), o),
        d = c.headers.get("set-cookie")
      if (d) {
        let u = nd(d, "__puus")
        if (
          (u &&
            ((this.cookie = id(this.cookie, "__puus", u)),
            this.onCookieUpdate?.(this.cookie)),
          this.addition.variant === "Quark")
        ) {
          let p = nd(d, "__pus")
          p &&
            ((this.cookie = id(this.cookie, "__pus", p)),
            this.onCookieUpdate?.(this.cookie))
        }
      }
      let l = await c.json()
      if (
        !c.ok ||
        (l.status !== void 0 && l.status >= 400) ||
        (l.code !== void 0 && l.code !== 0)
      ) {
        let u = l.message || l.msg || `HTTP ${c.status}`
        throw new Error(`[Quark/UC] API error [${c.status}] ${e}: ${u}`)
      }
      return l
    }
    async getFiles(e) {
      let r = [],
        i = 1,
        s = 100,
        n = {
          pdir_fid: e,
          _size: String(s),
          _fetch_total: "1",
          fetch_all_file: "1",
          fetch_risk_file_name: "1",
        }
      if (this.addition.order_by && this.addition.order_by !== "none") {
        let a = this.addition.order_direction || "asc"
        n._sort = `file_type:asc,${this.addition.order_by}:${a}`
      }
      for (;;) {
        n._page = String(i)
        let a = await this.request("/file/sort", "GET", n),
          o = a?.data?.list || []
        if (o.length === 0) break
        for (let d of o)
          ((d.file_name = ip(d.file_name)),
            this.addition.only_list_video_file
              ? (!d.file || d.category === 1) && r.push(d)
              : r.push(d))
        let c = a.metadata?.total ?? 0
        if ((c > 0 && i * s >= c) || o.length < s) break
        i++
      }
      return r
    }
    async getDownloadUrl(e, r) {
      let s = (
        await this.request("/file/download", "POST", void 0, { fids: [e] })
      ).data?.[0]
      if (!s?.download_url)
        throw new Error(`[Quark/UC] No download_url for file: ${r}`)
      return {
        url: s.download_url,
        headers: {
          Cookie: this.cookie,
          Referer: this.conf.referer,
          "User-Agent": this.conf.ua,
        },
      }
    }
    async mkdir(e, r) {
      return (
        (
          await this.request("/file", "POST", void 0, {
            dir_init_lock: !1,
            dir_path: "",
            file_name: r,
            pdir_fid: e,
          })
        ).data?.[0]?.fid || ""
      )
    }
    async rename(e, r) {
      await this.request("/file/rename", "POST", void 0, {
        fid: e,
        file_name: r,
      })
    }
    async remove(e) {
      await this.request("/file/delete", "POST", void 0, {
        action_type: 2,
        filelist: e,
        exclude_fids: [],
      })
    }
    async move(e, r) {
      await this.request("/file/move", "POST", void 0, {
        filelist: e,
        to_pdir_fid: r,
      })
    }
    async copy(e, r) {
      await this.request("/file/copy", "POST", void 0, {
        filelist: e,
        to_pdir_fid: r,
      })
    }
    async uploadPre(e, r, i, s) {
      let n = Date.now()
      return (
        await this.request("/file/upload/pre", "POST", void 0, {
          ccp_hash_update: !0,
          dir_name: "",
          file_name: r,
          format_type: s || sp(r),
          l_created_at: n,
          l_updated_at: n,
          pdir_fid: e,
          size: i,
        })
      ).data
    }
    async uploadHash(e, r, i) {
      return !!(
        await this.request("/file/update/hash", "POST", void 0, {
          md5: r,
          sha1: i,
          task_id: e,
        })
      ).data?.finish
    }
    async uploadAuth(e) {
      let i = (
        await this.request("/file/upload/auth", "POST", void 0, {
          auth_info: e.authInfo,
          auth_meta: e.authMeta,
          task_id: e.taskId,
        })
      ).data?.auth_key
      if (!i)
        throw new Error("[Quark/UC] upload/auth response missing auth_key")
      return i
    }
    async uploadPartToS3(e) {
      let r = this.checkPreFields(e.pre),
        i = "application/octet-stream",
        s = new Date().toUTCString(),
        n = [
          "PUT",
          i,
          s,
          `x-oss-date:${s}`,
          `x-oss-user-agent:${Qi}`,
          `/${r.bucket}/${r.obj_key}?partNumber=${e.partNumber}&uploadId=${r.upload_id}`,
        ].join(`
`),
        a = await this.uploadAuth({
          authInfo: r.auth_info,
          authMeta: n,
          taskId: r.task_id,
        }),
        o = `https://${r.bucket}.${sd(r.upload_url)}/${r.obj_key}?partNumber=${e.partNumber}&uploadId=${encodeURIComponent(r.upload_id)}`,
        c = await fetch(o, {
          method: "PUT",
          headers: {
            Authorization: a,
            "Content-Type": i,
            Referer: "https://pan.quark.cn/",
            "x-oss-date": s,
            "x-oss-user-agent": Qi,
          },
          body: e.body,
        })
      if (!c.ok) {
        let d = await c.text().catch(() => "")
        throw new Error(
          `[Quark/UC] upload part ${e.partNumber} failed [${c.status}]: ${d.slice(0, 200)}`,
        )
      }
      return c.headers.get("etag") || ""
    }
    async uploadComplete(e, r) {
      let i = this.checkPreFields(e),
        s = `<?xml version="1.0" encoding="UTF-8"?>
<CompleteMultipartUpload>
`
      ;(r.forEach((f, h) => {
        s += `<Part>
<PartNumber>${h + 1}</PartNumber>
<ETag>${f}</ETag>
</Part>
`
      }),
        (s += "</CompleteMultipartUpload>"))
      let n = wr.default.MD5(s).toString(wr.default.enc.Base64),
        a = JSON.stringify(e.callback || {}),
        o = wr.default.enc.Base64.stringify(wr.default.enc.Utf8.parse(a)),
        c = new Date().toUTCString(),
        d = [
          "POST",
          n,
          "application/xml",
          c,
          `x-oss-callback:${o}`,
          `x-oss-date:${c}`,
          `x-oss-user-agent:${Qi}`,
          `/${i.bucket}/${i.obj_key}?uploadId=${i.upload_id}`,
        ].join(`
`),
        l = await this.uploadAuth({
          authInfo: i.auth_info,
          authMeta: d,
          taskId: i.task_id,
        }),
        u = `https://${i.bucket}.${sd(i.upload_url)}/${i.obj_key}?uploadId=${encodeURIComponent(i.upload_id)}`,
        p = await fetch(u, {
          method: "POST",
          headers: {
            Authorization: l,
            "Content-MD5": n,
            "Content-Type": "application/xml",
            Referer: "https://pan.quark.cn/",
            "x-oss-callback": o,
            "x-oss-date": c,
            "x-oss-user-agent": Qi,
          },
          body: s,
        })
      if (!p.ok) {
        let f = await p.text().catch(() => "")
        throw new Error(
          `[Quark/UC] upload complete failed [${p.status}]: ${f.slice(0, 200)}`,
        )
      }
    }
    async uploadFinish(e) {
      await this.request("/file/upload/finish", "POST", void 0, {
        obj_key: e.obj_key,
        task_id: e.task_id,
      })
    }
    checkPreFields(e) {
      if (
        !e.bucket ||
        !e.obj_key ||
        !e.upload_id ||
        !e.upload_url ||
        !e.auth_info
      )
        throw new Error("[Quark/UC] upload/pre response missing upload fields")
      return e
    }
    async init() {
      if (!this.cookie?.trim()) {
        console.warn("[Quark/UC] Cookie is empty, skipping init.")
        return
      }
      try {
        ;(await this.request("/config", "GET"),
          console.log(
            `[Quark/UC] (${this.addition.variant || "Quark"}) init OK`,
          ))
      } catch (e) {
        console.warn("[Quark/UC] init warning:", e.message)
      }
    }
  },
  Qi = "aliyun-sdk-js/6.6.1 Chrome 98.0.4758.80 on Windows 10 64-bit"
function sd(t) {
  return t.replace(/^https?:\/\//, "").replace(/\/+$/, "")
}
function nd(t, e) {
  let r = t.split(/,(?=[^;]+=[^;]+)/)
  for (let i of r) {
    let n = i.split(";")[0].trim(),
      a = n.indexOf("=")
    if (a !== -1 && n.substring(0, a).trim() === e)
      return n.substring(a + 1).trim()
  }
  return null
}
function ip(t) {
  return t
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}
function sp(t) {
  let e = t.split(".").pop()?.toLowerCase() || "",
    r = [
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
    ],
    i = ["mp3", "flac", "aac", "wav", "ogg", "m4a", "opus"],
    s = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "heic", "tiff"],
    n = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "md"]
  return r.includes(e)
    ? "video"
    : i.includes(e)
      ? "audio"
      : s.includes(e)
        ? "image"
        : n.includes(e)
          ? "doc"
          : "others"
}
function ad(t) {
  let e = !t.file,
    r = t.updated_at
      ? new Date(t.updated_at).toISOString()
      : new Date().toISOString()
  return {
    name: t.file_name,
    size: t.size || 0,
    is_dir: e,
    modified: r,
    sign: "",
    type: W(t.file_name, e),
    thumb: t.thumbnail || "",
    raw_url: "",
  }
}
var Zi = class {
  client
  pathFileIdCache = new Map()
  constructor(e) {
    this.client = new Xi(e)
  }
  async init() {
    await this.client.init()
  }
  async list(e, r) {
    let i = await this.resolveFileId(r)
    return (await this.client.getFiles(i)).map(ad)
  }
  async get(e, r) {
    let i = r.split("/").filter(Boolean),
      s = await this.resolveFileId(r),
      n = i[i.length - 1] || "root",
      a = (() => {
        try {
          return decodeURIComponent(n)
        } catch {
          return n
        }
      })(),
      o = "/" + i.slice(0, i.length - 1).join("/"),
      c = await this.resolveFileId(o),
      l = (await this.client.getFiles(c)).find(
        (f) => f.fid === s || f.file_name === n || f.file_name === a,
      ),
      u = "",
      p
    try {
      let f = await this.client.getDownloadUrl(s, a)
      ;((u = f.url), (p = f.headers))
    } catch (f) {
      console.warn(`[Quark/UC] getDownloadUrl warning for ${n}:`, f.message)
    }
    if (l) {
      let f = ad(l)
      return ((f.raw_url = u), (f.raw_url_headers = p), f)
    }
    try {
      return (
        await this.client.getFiles(s),
        {
          name: a || "root",
          size: 0,
          is_dir: !0,
          modified: new Date().toISOString(),
          sign: "",
          type: 1,
          raw_url: "",
        }
      )
    } catch {}
    return {
      name: a || "root",
      size: 0,
      is_dir: !1,
      modified: new Date().toISOString(),
      sign: "",
      type: 0,
      raw_url: u,
      raw_url_headers: p,
    }
  }
  async mkdir(e, r) {
    let i = r.split("/").filter(Boolean),
      s = i.pop() || "\u65B0\u6587\u4EF6\u5939",
      n = "/" + i.join("/"),
      a = await this.resolveFileId(n)
    await this.client.mkdir(a, s)
  }
  async rename(e, r, i) {
    let s = await this.resolveFileId(r)
    await this.client.rename(s, i)
  }
  async remove(e, r, i) {
    let s = await this.resolveFileId(r)
    await this.client.remove([s])
  }
  async move(e, r, i, s, n) {
    let a = await this.resolveFileId(s),
      o = await this.resolveFileId(this.getDirPath(n))
    await this.client.move([a], o)
  }
  async copy(e, r, i, s, n) {
    let a = await this.resolveFileId(s),
      o = await this.resolveFileId(this.getDirPath(n))
    await this.client.copy([a], o)
  }
  getDirPath(e) {
    let r = e.split("/").filter(Boolean)
    return (r.pop(), "/" + r.join("/"))
  }
  async uploadStream(e) {
    let r = await this.resolveFileId(this.getDirPath(e.dstPhysicalPath)),
      i = await this.client.uploadPre(r, e.fileName, e.size)
    if (i.finish || (await this.client.uploadHash(i.task_id, e.md5, e.sha1)))
      return
    let s = i.metadata?.part_size || 8 * 1024 * 1024,
      n = [],
      a = 1
    for (let o = 0; o < e.size; o += s) {
      let c = Math.min(s, e.size - o),
        d = await e.getStream(o),
        l = await np(d, c),
        u = await this.client.uploadPartToS3({ pre: i, partNumber: a, body: l })
      ;(n.push(u), a++)
    }
    ;(await this.client.uploadComplete(i, n), await this.client.uploadFinish(i))
  }
  async put(e, r, i) {
    throw new Error(
      "[Quark/UC] Direct put not supported in stateless environment",
    )
  }
  async putStream(e, r, i, s) {
    throw new Error(
      "[Quark/UC] Direct stream upload not supported; use uploadStream (relay copy)",
    )
  }
  async resolveFileId(e) {
    let r = e.split("/").filter(Boolean).join("/")
    if (!r) return this.client.getRootFolderId()
    if (this.pathFileIdCache.has(r)) return this.pathFileIdCache.get(r)
    let i = r.split("/"),
      s = this.client.getRootFolderId()
    for (let n = 0; n < i.length; n++) {
      let a = i[n],
        o = (() => {
          try {
            return decodeURIComponent(a)
          } catch {
            return a
          }
        })(),
        d = (await this.client.getFiles(s)).find(
          (u) => u.file_name === a || u.file_name === o || u.fid === a,
        )
      if (!d)
        throw new Error(`[Quark/UC] Path '${a}' not found in folder '${s}'`)
      s = d.fid
      let l = "/" + i.slice(0, n + 1).join("/")
      this.pathFileIdCache.set(l, s)
    }
    return s
  }
}
async function np(t, e) {
  let r = new Uint8Array(e),
    i = t.getReader(),
    s = 0
  try {
    for (; s < e; ) {
      let { done: n, value: a } = await i.read()
      if (n) break
      let o = Math.min(a.length, e - s)
      if ((r.set(a.subarray(0, o), s), (s += o), o < a.length)) {
        await i.cancel().catch(() => {})
        break
      }
    }
  } finally {
    s < e && (await i.cancel().catch(() => {}))
  }
  if (s < e)
    throw new Error(`[Quark/UC] stream ended early: got ${s}/${e} bytes`)
  return r
}
xe()
var qe = "https://yun.123pan.com/b/api",
  ap = "https://login.123pan.com/api",
  op = ap + "/user/sign_in"
function cp(t) {
  let e = (t || "").trim()
  if (!e) return ""
  if (/^Bearer\s+/i.test(e)) return e.replace(/^Bearer\s+/i, "").trim()
  if (/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(e)) return e
  let r = {}
  for (let s of e.split(";")) {
    let n = s.indexOf("=")
    if (n < 0) continue
    let a = s.slice(0, n).trim(),
      o = s.slice(n + 1).trim()
    a && (r[a] = o)
  }
  let i = (s) => {
    let n = r[s] || ""
    return /^Bearer\s+/i.test(n) ? n.replace(/^Bearer\s+/i, "").trim() : n
  }
  return i("sso-token") || i("token") || i("authorization") || ""
}
var dp = qe + "/user/info",
  lp = qe + "/file/list/new",
  up = qe + "/file/download_info",
  pp = qe + "/file/upload_request",
  fp = qe + "/file/mod_pid",
  hp = qe + "/file/rename",
  gp = qe + "/file/trash",
  mp = qe + "/file/upload_request",
  yp = qe + "/file/s3_upload_object/auth",
  xp = qe + "/file/s3_repare_upload_parts_batch",
  wp = qe + "/file/upload_complete/v2",
  vp = (() => {
    let t = new Array(256)
    for (let e = 0; e < 256; e++) {
      let r = e
      for (let i = 0; i < 8; i++) r = r & 1 ? 3988292384 ^ (r >>> 1) : r >>> 1
      t[e] = r
    }
    return t
  })()
function od(t) {
  let e = 4294967295
  for (let r = 0; r < t.length; r++)
    e = vp[(e ^ t.charCodeAt(r)) & 255] ^ (e >>> 8)
  return (e ^ 4294967295) >>> 0
}
var _p = [
  "a",
  "d",
  "e",
  "f",
  "g",
  "h",
  "l",
  "m",
  "y",
  "i",
  "j",
  "n",
  "o",
  "p",
  "k",
  "q",
  "r",
  "s",
  "t",
  "u",
  "b",
  "c",
  "v",
  "w",
  "s",
  "z",
]
function bp(t) {
  let e = Math.round(1e7 * Math.random()).toString(),
    r = new Date(),
    s = Math.round((r.getTime() + 8 * 36e5) / 1e3).toString(),
    n = r.getUTCFullYear(),
    a = String(r.getUTCMonth() + 1).padStart(2, "0"),
    o = String(r.getUTCDate()).padStart(2, "0"),
    c = String(r.getUTCHours() + 8).padStart(2, "0"),
    d = String(r.getUTCMinutes()).padStart(2, "0"),
    u = `${n}${a}${o}${c}${d}`
      .split("")
      .map((y) => _p[parseInt(y)])
      .join(""),
    p = (od(u) >>> 0).toString(),
    f = [s, e, t, "web", "3", p].join("|"),
    h = (od(f) >>> 0).toString()
  return `${p}=${s}-${e}-${h}`
}
function kp(t) {
  let e = t.indexOf("?"),
    r = e >= 0 ? t.substring(0, e) : t,
    i = e >= 0 ? t.substring(e + 1) : "",
    s = new URL(t),
    n = bp(s.pathname)
  return `${r}?${i}${i ? "&" : ""}${n}`
}
var Yi = class {
  addition
  accessToken = ""
  onTokenUpdate
  constructor(e, r) {
    ;((this.addition = e), (this.onTokenUpdate = r))
  }
  getRootId() {
    return (this.addition.root_id || "0").trim() || "0"
  }
  async login() {
    if (this.addition.access_token) {
      this.accessToken = this.addition.access_token
      try {
        await this.userInfo(!0)
        return
      } catch {
        this.accessToken = ""
      }
    }
    if (this.addition.cookie) {
      let e = cp(this.addition.cookie)
      if (e) {
        this.accessToken = e
        try {
          ;(await this.userInfo(!0),
            (this.addition.access_token = e),
            this.onTokenUpdate?.(e))
          return
        } catch {
          this.accessToken = ""
        }
      }
    }
    if (!this.addition.username || !this.addition.password)
      throw new Error(
        "123 \u7F51\u76D8\u767B\u5F55\u51ED\u8BC1\u7F3A\u5931\uFF1A\u8BF7\u586B\u5199 123 \u7F51\u76D8\u624B\u673A\u53F7 + \u5BC6\u7801\uFF1B\u82E5\u90E8\u7F72\u73AF\u5883\uFF08\u5982 Cloudflare Workers \u6570\u636E\u4E2D\u5FC3 IP\uFF09\u5BC6\u7801\u767B\u5F55\u4F1A\u88AB\u98CE\u63A7\uFF0C\u53EF\u5728\u300CCookie\u300D\u5B57\u6BB5\u7C98\u8D34\u6D4F\u89C8\u5668\u767B\u5F55\u540E\u7684 Cookie\uFF08\u542B sso-token\uFF09\uFF0C\u6216\u586B\u5199\u6709\u6548\u7684\u8BBF\u95EE\u4EE4\u724C access_token\uFF08\u5728\u672C\u673A\u6D4F\u89C8\u5668\u767B\u5F55 https://www.123pan.com/ \u540E\u4ECE\u5F00\u53D1\u8005\u5DE5\u5177\u83B7\u53D6\uFF09\u3002",
      )
    await this.signIn()
  }
  async signIn() {
    let r = /@/.test(this.addition.username)
        ? {
            mail: this.addition.username,
            password: this.addition.password,
            type: 2,
          }
        : {
            passport: this.addition.username,
            password: this.addition.password,
            remember: !0,
          },
      s = await (
        await fetch(op, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            origin: "https://yun.123pan.com",
            referer: "https://yun.123pan.com/",
            "user-agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) openlist-client",
            platform: "web",
            "app-version": "3",
          },
          body: JSON.stringify(r),
        })
      ).json()
    if (s.code !== 200)
      throw new Error(
        `123 \u7F51\u76D8\u767B\u5F55\u5931\u8D25\uFF08${s.message || `code ${s.code}`}\uFF09\u3002\u5F53\u524D\u90E8\u7F72\u73AF\u5883\u7684\u51FA\u53E3 IP \u88AB 123 \u5224\u5B9A\u4E3A\u5883\u5916/\u964C\u751F\u8BBE\u5907\uFF08\u5982 Cloudflare Workers \u6570\u636E\u4E2D\u5FC3 IP\uFF09\uFF0C\u8D26\u53F7\u5BC6\u7801\u767B\u5F55\u4F1A\u88AB\u98CE\u63A7\u62E6\u622A\u3002\u53EF\u9760\u65B9\u6848\uFF1A\u2460 \u5728\u672C\u673A\u6D4F\u89C8\u5668\u767B\u5F55 https://www.123pan.com/\uFF08\u767B\u5F55\u4E00\u6B21\u6216\u4FEE\u6539\u5BC6\u7801\u53EF\u89E3\u9664\u8D26\u53F7\u98CE\u9669\uFF09\uFF0C\u6253\u5F00\u5F00\u53D1\u8005\u5DE5\u5177 \u2192 Application/Network \u2192 \u590D\u5236\u8BF7\u6C42\u5934\u4E2D\u7684 Bearer \u4EE4\u724C\uFF0C\u586B\u5165\u5B58\u50A8\u8BBE\u7F6E\u7684 access_token \u5B57\u6BB5\uFF08\u4EE4\u724C\u6709\u6548\u671F\u5185 API \u8BF7\u6C42\u4E0D\u53D7 IP \u98CE\u63A7\u5F71\u54CD\uFF09\uFF1B\u2461 \u6216\u5C06\u8BE5\u7F51\u76D8\u90E8\u7F72\u5230\u5883\u5185\u670D\u52A1\u5668\uFF08Node \u5BB9\u5668\u6A21\u5F0F\uFF09\u540E\u4F7F\u7528\u8D26\u53F7\u5BC6\u7801\u3002`,
      )
    if (((this.accessToken = s.data?.token || ""), !this.accessToken))
      throw new Error("login returned empty token")
    ;((this.addition.access_token = this.accessToken),
      this.onTokenUpdate?.(this.accessToken))
  }
  async request(e, r, i, s, n = !1) {
    let a = async () => {
        let d = kp(e),
          l = {
            origin: "https://yun.123pan.com",
            referer: "https://yun.123pan.com/",
            authorization: this.accessToken ? `Bearer ${this.accessToken}` : "",
            "user-agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) openlist-client",
            platform: this.addition.platform || "web",
            "app-version": "3",
            Accept: "application/json",
          },
          u = { method: r, headers: l }
        return (
          i !== void 0 &&
            r !== "GET" &&
            ((l["Content-Type"] = "application/json"),
            (u.body = JSON.stringify(i))),
          (await fetch(d, u)).json()
        )
      },
      o = await a(),
      c = o?.code
    if (c !== 0 && c !== 200) {
      if (c === 401 && !n) {
        ;(await this.login(), (o = await a()))
        let d = o?.code
        if (d !== 0 && d !== 200)
          throw new Error(o?.message || `api error: code ${d}`)
        return o
      }
      throw new Error(o?.message || `api error: code ${c}`)
    }
    return o
  }
  async userInfo(e = !1) {
    return (await this.request(dp, "GET", void 0, void 0, e)).data
  }
  async getFiles(e, r) {
    let i = [],
      s = 1,
      n = "0",
      a = r?.maxPages ?? 45
    for (;;) {
      if (r?.budget) {
        if (r.budget.used >= r.budget.limit) {
          console.warn(
            `[123Pan] \u5DF2\u8FBE Cloudflare subrequest \u9884\u7B97\u4E0A\u9650(${r.budget.limit} \u6B21)\uFF0C\u7ED3\u679C\u5DF2\u622A\u65AD\uFF08\u76EE\u5F55\u6587\u4EF6\u8FC7\u591A\u6216\u8DEF\u5F84\u8FC7\u6DF1\uFF09`,
          )
          break
        }
        r.budget.used++
      }
      if (s > a) {
        console.warn(
          `[123Pan] \u5206\u9875\u8D85\u8FC7 ${a} \u9875\uFF0C\u7ED3\u679C\u53EF\u80FD\u4E0D\u5B8C\u6574\uFF08\u76EE\u5F55\u6587\u4EF6\u8FC7\u591A\uFF09`,
        )
        break
      }
      let o = new URLSearchParams({
          driveId: "0",
          limit: "100",
          next: n,
          orderBy: this.addition.order_by || "file_id",
          orderDirection: this.addition.order_direction || "desc",
          parentFileId: e,
          trashed: "false",
          SearchData: "",
          Page: String(s),
          OnlyLookAbnormalFile: "0",
          event: "homeListFile",
          operateType: "4",
          inDirectSpace: "false",
        }),
        c = `${lp}?${o.toString()}`,
        d = await this.request(c, "GET"),
        l = d.data?.InfoList || []
      if ((i.push(...l), r?.findName)) {
        let p = l.find(
          (f) =>
            f.FileName === r.findName &&
            (r.findIsDir === void 0 || (f.Type === 1) === r.findIsDir),
        )
        if (p) return [p]
      }
      let u = String(d.data?.Next ?? "-1")
      if (!d.data || l.length === 0 || u === "-1") break
      ;((n = u), s++)
    }
    return i
  }
  async getDownloadLink(e) {
    let r = {
        driveId: 0,
        etag: e.Etag,
        fileId: e.FileId,
        fileName: e.FileName,
        s3keyFlag: e.S3KeyFlag,
        size: e.Size,
        type: e.Type,
      },
      s = (await this.request(up, "POST", r)).data?.DownloadUrl || ""
    if (!s) throw new Error("no download url")
    try {
      let o = new URL(s).searchParams.get("params")
      if (o) {
        let c = atob(o)
        s = new URL(c).toString()
      }
    } catch {}
    let n = await fetch(s, {
      method: "GET",
      redirect: "manual",
      headers: { Referer: "https://yun.123pan.com/" },
    })
    return n.status === 302
      ? n.headers.get("location") || s
      : (n.status < 300 &&
          (await n.json().catch(() => ({}))).data?.redirect_url) ||
          s
  }
  async mkdir(e, r) {
    let i = await this.request(pp, "POST", {
      driveId: 0,
      etag: "",
      fileName: r,
      parentFileId: parseInt(e, 10) || 0,
      size: 0,
      type: 1,
    })
    return i.data?.FileId != null ? String(i.data.FileId) : ""
  }
  async rename(e, r) {
    await this.request(hp, "POST", {
      driveId: 0,
      fileId: parseInt(e, 10),
      fileName: r,
    })
  }
  async move(e, r) {
    await this.request(fp, "POST", {
      fileIdList: e.map((i) => ({ FileId: parseInt(i, 10) })),
      parentFileId: parseInt(r, 10),
    })
  }
  async remove(e, r) {
    await this.request(gp, "POST", {
      driveId: 0,
      operation: !0,
      fileTrashInfoList: [r],
    })
  }
  async getPartUploadUrl(e, r, i) {
    let n = (
      i === 1
        ? await this.getS3Auth(e, r, r + 1)
        : await this.getS3PreSignedUrls(e, r, r + 1)
    ).presignedUrls[String(r)]
    if (!n)
      throw new Error(
        `[123Pan] \u672A\u8FD4\u56DE\u7B2C ${r} \u5206\u7247\u7684\u4E0A\u4F20 URL`,
      )
    return n
  }
  async completeUpload(e, r, i) {
    await this.completeS3(e, r, i)
  }
  async createUpload(e, r, i, s) {
    let n = {
      driveId: 0,
      duplicate: 2,
      etag: s,
      fileName: e,
      parentFileId: r,
      size: i,
      type: 0,
    }
    return (await this.request(mp, "POST", n)).data
  }
  async getS3Auth(e, r, i) {
    let s = {
      StorageNode: e.StorageNode,
      bucket: e.Bucket,
      key: e.Key,
      partNumberEnd: i,
      partNumberStart: r,
      uploadId: e.UploadId,
    }
    return (await this.request(yp, "POST", s)).data
  }
  async getS3PreSignedUrls(e, r, i) {
    let s = {
      bucket: e.Bucket,
      key: e.Key,
      partNumberEnd: i,
      partNumberStart: r,
      uploadId: e.UploadId,
      StorageNode: e.StorageNode,
    }
    return (await this.request(xp, "POST", s)).data
  }
  async completeS3(e, r, i) {
    await this.request(wp, "POST", {
      StorageNode: e.StorageNode,
      bucket: e.Bucket,
      fileId: e.FileId,
      fileSize: r,
      isMultipart: i,
      key: e.Key,
      uploadId: e.UploadId,
    })
  }
  async uploadFile(e, r, i) {
    let s = ""
    try {
      s = (await import("node:crypto"))
        .createHash("md5")
        .update(i)
        .digest("hex")
    } catch {
      s = ""
    }
    let n = await this.createUpload(r, e, i.length, s)
    if (n.Reuse || n.Key === "") return
    let a = 16 * 1024 * 1024,
      o = 1
    i.length > a && (o = Math.ceil(i.length / a))
    let c = i.length % a
    c === 0 && (c = a)
    let d
    o === 1
      ? (d = (await this.getS3Auth(n, 1, 2)).presignedUrls)
      : (d = (await this.getS3PreSignedUrls(n, 1, o + 1)).presignedUrls)
    for (let l = 1; l <= o; l++) {
      let u = (l - 1) * a,
        p = l === o ? c : a,
        f = d[String(l)]
      if (!f)
        throw new Error(
          `[123Pan] \u7F3A\u5C11\u7B2C ${l} \u5206\u7247\u7684\u4E0A\u4F20 URL`,
        )
      let h = i.subarray(u, u + p),
        y = await fetch(f, { method: "PUT", body: h })
      if (y.status !== 200) {
        let x = await y.text().catch(() => "")
        throw new Error(
          `[123Pan] \u4E0A\u4F20\u7B2C ${l}/${o} \u5206\u7247\u5931\u8D25\uFF1AHTTP ${y.status} ${x}`,
        )
      }
    }
    await this.completeS3(n, i.length, o > 1)
  }
}
function Sp(t) {
  return Buffer.from(JSON.stringify(t), "utf8").toString("base64")
}
function cd(t) {
  let e = JSON.parse(Buffer.from(t, "base64").toString("utf8"))
  if (!e || !e.bucket || !e.key || !e.uploadId)
    throw new Error("[123Pan] invalid upload session")
  return e
}
function dd(t) {
  return {
    AccessKeyId: "",
    SecretAccessKey: "",
    SessionToken: "",
    Bucket: t.bucket,
    Key: t.key,
    UploadId: t.uploadId,
    FileId: t.fileId,
    StorageNode: t.storageNode,
    EndPoint: "",
    Reuse: !1,
  }
}
function ld(t) {
  let e = t.Type === 1
  return {
    name: t.FileName,
    size: t.Size || 0,
    is_dir: e,
    modified: t.UpdateAt
      ? new Date(t.UpdateAt).toISOString()
      : new Date().toISOString(),
    sign: String(t.FileId),
    type: W(t.FileName, e),
    thumb: "",
    raw_url: "",
  }
}
var es = class {
  client
  addition
  pathIdCache = new Map()
  budget = { used: 0, limit: 45 }
  constructor(e, r) {
    ;((this.addition = e), (this.client = new Yi(e, r)))
  }
  async init() {
    await this.client.login()
  }
  async resolveFolderId(e) {
    let r = this.client.getRootId(),
      i =
        "/" +
        String(e || "")
          .split("/")
          .filter(Boolean)
          .join("/")
    if (i === "/" || i === `/${r}`) return r
    let s = i.split("/").filter(Boolean),
      n = 0,
      a = r,
      o = ""
    for (let c = 0; c < s.length; c++) {
      let d = "/" + s.slice(0, c + 1).join("/"),
        l = this.pathIdCache.get(d)
      if (l !== void 0) ((a = l), (n = c + 1), (o = d))
      else break
    }
    for (let c = n; c < s.length; c++) {
      let d = s[c],
        l = (() => {
          try {
            return decodeURIComponent(d)
          } catch {
            return d
          }
        })(),
        p = (
          await this.client.getFiles(a, {
            findName: l,
            findIsDir: !0,
            budget: this.budget,
          })
        ).find(
          (f) =>
            f.Type === 1 &&
            (f.FileName === d ||
              f.FileName === l ||
              String(f.FileId) === d ||
              String(f.FileId) === l),
        )
      if (!p) throw new Error(`folder not found: ${d}`)
      ;((a = String(p.FileId)),
        (o = "/" + s.slice(0, c + 1).join("/")),
        this.pathIdCache.set(o, a))
    }
    return a
  }
  async ensureFolderId(e) {
    let r = this.client.getRootId(),
      i =
        "/" +
        String(e || "")
          .split("/")
          .filter(Boolean)
          .join("/")
    if (i === "/" || i === `/${r}`) return r
    let s = i.split("/").filter(Boolean),
      n = r,
      a = ""
    for (let o = 0; o < s.length; o++) {
      let c = s[o],
        d = (() => {
          try {
            return decodeURIComponent(c)
          } catch {
            return c
          }
        })()
      a = "/" + s.slice(0, o + 1).join("/")
      let l = this.pathIdCache.get(a)
      if (l === void 0) {
        let u = await this.client.getFiles(n, {
            findName: d,
            findIsDir: !0,
            budget: this.budget,
          }),
          p = u.find(
            (f) => f.Type === 1 && (f.FileName === c || f.FileName === d),
          )
        if (p) l = String(p.FileId)
        else {
          try {
            let f = await this.client.mkdir(n, d)
            f && (l = f)
          } catch {}
          if (l === void 0) {
            if (
              ((u = await this.client.getFiles(n, {
                findName: d,
                findIsDir: !0,
                budget: this.budget,
              })),
              (p = u.find((f) => f.Type === 1 && f.FileName === d)),
              !p)
            )
              throw new Error(
                `[123Pan] \u81EA\u52A8\u521B\u5EFA\u76EE\u5F55\u5931\u8D25: ${c}`,
              )
            l = String(p.FileId)
          }
        }
        this.pathIdCache.set(a, l)
      }
      n = l
    }
    return n
  }
  async resolveFile(e) {
    let r = String(e || "")
      .split("/")
      .filter(Boolean)
    if (r.length === 0) throw new Error("invalid path")
    let i = r[r.length - 1],
      s = (() => {
        try {
          return decodeURIComponent(i)
        } catch {
          return i
        }
      })(),
      n = "/" + r.slice(0, r.length - 1).join("/"),
      a = await this.resolveFolderId(n),
      c = (
        await this.client.getFiles(a, { findName: s, budget: this.budget })
      ).find(
        (d) =>
          String(d.FileId) === i ||
          String(d.FileId) === s ||
          d.FileName === i ||
          d.FileName === s,
      )
    if (!c) throw new Error(`file not found: ${i}`)
    return { file: c, parentId: a, name: i }
  }
  async list(e, r) {
    this.budget.used = 0
    let i = await this.resolveFolderId(r),
      n = (await this.client.getFiles(i, { budget: this.budget })).map(ld)
    return V(
      n,
      this.addition.order_by || "file_name",
      this.addition.order_direction,
    )
  }
  async get(e, r) {
    this.budget.used = 0
    let i = String(r || "")
      .split("/")
      .filter(Boolean)
    if (i.length === 0 || i[i.length - 1] === this.client.getRootId()) {
      let a = this.client.getRootId()
      return {
        name: a,
        size: 0,
        is_dir: !0,
        modified: new Date().toISOString(),
        sign: a,
        type: 1,
        raw_url: "",
      }
    }
    let { file: s } = await this.resolveFile(r),
      n = ld(s)
    if (s.Type !== 1)
      try {
        ;((n.raw_url = await this.client.getDownloadLink(s)),
          n.raw_url ||
            (n.raw_url_error =
              "123 \u7F51\u76D8\u672A\u8FD4\u56DE\u4E0B\u8F7D\u94FE\u63A5\uFF08DownloadUrl \u4E3A\u7A7A\uFF09\u3002\u5E38\u89C1\u539F\u56E0\uFF1Aaccess_token/cookie \u5931\u6548\uFF0C\u6216\u8BE5\u6587\u4EF6\u5DF2\u5220\u9664/\u88AB\u9650\u5236\u4E0B\u8F7D\u3002\u8BF7\u5230\u7BA1\u7406\u540E\u53F0\u66F4\u65B0 access_token \u540E\u91CD\u8BD5\u3002"))
      } catch (a) {
        ;((n.raw_url_error =
          `123 \u7F51\u76D8\u83B7\u53D6\u4E0B\u8F7D\u94FE\u63A5\u5931\u8D25\uFF1A${a?.message || String(a)}\u3002` +
          (String(a?.message || "").includes("\u767B\u5F55\u5931\u8D25")
            ? "\u5F53\u524D\u90E8\u7F72\u51FA\u53E3 IP \u53EF\u80FD\u88AB 123 \u98CE\u63A7\uFF0C\u8BF7\u914D\u7F6E\u6709\u6548\u7684 access_token\uFF08\u6D4F\u89C8\u5668\u767B\u5F55 123 \u7F51\u76D8\u540E\u590D\u5236 Bearer \u4EE4\u724C\uFF09\u3002"
            : "\u8BF7\u68C0\u67E5 access_token/cookie \u662F\u5426\u6709\u6548\uFF0C\u6216\u5728 123 \u7F51\u76D8\u7F51\u9875\u7AEF\u786E\u8BA4\u8BE5\u6587\u4EF6\u53EF\u4E0B\u8F7D\u3002")),
          console.warn(
            `[123Pan] getDownloadLink warning for ${s.FileName}:`,
            a.message,
          ))
      }
    else
      n.raw_url_error =
        "\u8BE5\u6761\u76EE\u662F\u6587\u4EF6\u5939\uFF0C\u4E0D\u53EF\u4F5C\u4E3A\u6587\u4EF6\u4E0B\u8F7D\u3002"
    return n
  }
  async mkdir(e, r) {
    this.budget.used = 0
    let i = String(r || "")
        .split("/")
        .filter(Boolean),
      s = i.pop() || "\u65B0\u6587\u4EF6\u5939",
      n = "/" + i.join("/"),
      a = await this.resolveFolderId(n)
    await this.client.mkdir(a, s)
  }
  async rename(e, r, i) {
    this.budget.used = 0
    let { file: s } = await this.resolveFile(r)
    await this.client.rename(String(s.FileId), i)
  }
  async remove(e, r, i) {
    this.budget.used = 0
    let { file: s } = await this.resolveFile(r)
    await this.client.remove(String(s.FileId), s)
  }
  async move(e, r, i, s, n) {
    this.budget.used = 0
    let { file: a } = await this.resolveFile(s),
      o = String(r).split("/").filter(Boolean),
      c = await this.resolveFolderId("/" + o.join("/"))
    await this.client.move([String(a.FileId)], c)
  }
  async copy() {
    throw new Error("[123Pan] Copy is not supported by 123 Cloud Drive API")
  }
  async put(e, r, i) {
    this.budget.used = 0
    let s = String(r || "")
      .split("/")
      .filter(Boolean)
    if (s.length === 0) throw new Error("invalid upload path")
    let n = s[s.length - 1],
      a = (() => {
        try {
          return decodeURIComponent(n)
        } catch {
          return n
        }
      })(),
      o = "/" + s.slice(0, s.length - 1).join("/"),
      c = await this.ensureFolderId(o)
    await this.client.uploadFile(c, a, i)
  }
  async createUploadSession(e, r, i, s, n) {
    this.budget.used = 0
    let a = await this.ensureFolderId(r || "/"),
      o = await this.client.createUpload(i, a, s, n || ""),
      c = 16 * 1024 * 1024
    if (o.Reuse || o.Key === "")
      return { reuse: !0, partCount: 0, chunkSize: c, session: "" }
    let d = Math.max(1, Math.ceil(s / c)),
      l = Sp({
        bucket: o.Bucket,
        key: o.Key,
        uploadId: o.UploadId,
        fileId: o.FileId,
        storageNode: o.StorageNode,
        size: s,
        partCount: d,
        chunkSize: c,
      })
    return { reuse: !1, partCount: d, chunkSize: c, session: l }
  }
  async uploadPart(e, r, i) {
    this.budget.used = 0
    let s = cd(e),
      n = await this.client.getPartUploadUrl(dd(s), r, s.partCount),
      a = await fetch(n, { method: "PUT", body: i })
    if (a.status !== 200) {
      let o = await a.text().catch(() => "")
      throw new Error(
        `[123Pan] \u4E0A\u4F20\u7B2C ${r}/${s.partCount} \u5206\u7247\u5931\u8D25\uFF1AHTTP ${a.status} ${o}`,
      )
    }
  }
  async completeUploadSession(e) {
    this.budget.used = 0
    let r = cd(e)
    await this.client.completeUpload(dd(r), r.size, r.partCount > 1)
  }
}
xe()
is()
var Ap = "https://openapi.baidu.com/oauth/2.0/token",
  fd = "https://pan.baidu.com/rest/2.0",
  zt = 4 * 1024 * 1024,
  bn = 16 * 1024 * 1024,
  kn = 32 * 1024 * 1024,
  Sn = 2048,
  Cp = 1 * 1024 * 1024,
  Lt = "https://d.pcs.baidu.com",
  Ep = 60 * 1e3,
  vr = 3,
  An = 1e3,
  gd = 5e3,
  Dp = new Set([111, -6, 20016])
function Tp(t) {
  return new Promise((e) => setTimeout(e, t))
}
function Pn(t) {
  if (!t) return t
  try {
    let e = new URL(t)
    return (e.searchParams.delete("access_token"), e.toString())
  } catch {
    return t
  }
}
function Mt(t) {
  let e = { ...(t || {}) },
    r = (i, s) =>
      i == null || i === ""
        ? s
        : typeof i == "boolean"
          ? i
          : String(i).toLowerCase() === "true"
  return (
    (e.use_online_api = r(e.use_online_api, !0)),
    (e.api_url_address =
      e.api_url_address || "https://api.oplist.org/baiduyun/renewapi"),
    (e.download_api = e.download_api || "official"),
    (e.custom_crack_ua = e.custom_crack_ua || "netdisk"),
    (e.order_by = e.order_by || "name"),
    (e.order_direction = e.order_direction || "asc"),
    (e.upload_thread = e.upload_thread || "3"),
    (e.upload_api = e.upload_api || Lt),
    (e.use_dynamic_upload_api = r(e.use_dynamic_upload_api, !0)),
    (e.custom_upload_part_size = e.custom_upload_part_size || 0),
    (e.low_bandwith_upload_mode = r(e.low_bandwith_upload_mode, !1)),
    (e.only_list_video_file = r(e.only_list_video_file, !1)),
    e
  )
}
var ss = class t {
    addition
    accessToken = ""
    onTokenUpdate
    constructor(e, r) {
      ;((this.addition = Mt(e)),
        (this.onTokenUpdate = r),
        this.addition.access_token &&
          (this.accessToken = this.addition.access_token))
    }
    static apiUA =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Chrome/142.0.0.0 OpenList/425.6.30"
    async refreshToken() {
      let e = this.addition
      if (e.use_online_api && e.api_url_address) {
        let n = new URL(e.api_url_address)
        ;(n.searchParams.set("refresh_ui", e.refresh_token),
          n.searchParams.set("server_use", "true"),
          n.searchParams.set("driver_txt", "baiduyun_go"))
        let a = await fetch(n.toString(), {
            headers: { "User-Agent": t.apiUA },
          }),
          o,
          c = await a.text()
        try {
          o = JSON.parse(c)
        } catch {
          throw new Error(
            `\u5728\u7EBF API \u5237\u65B0\u5931\u8D25 (HTTP ${a.status})\uFF1A${c.slice(0, 300) || "\u975E JSON \u54CD\u5E94"}\u3002\u8BF7\u786E\u8BA4 refresh_token \u662F\u901A\u8FC7 https://api.oplist.org/ \u83B7\u53D6\u7684\u6709\u6548\u4EE4\u724C\u3002`,
          )
        }
        if (!o.refresh_token || !o.access_token)
          throw new Error(
            o.text ||
              (a.status !== 200
                ? `\u5728\u7EBF API \u8FD4\u56DE HTTP ${a.status}`
                : "empty token returned from official API, a wrong refresh token may have been used"),
          )
        ;((this.accessToken = o.access_token),
          (e.refresh_token = o.refresh_token),
          (e.access_token = o.access_token),
          this.onTokenUpdate?.({
            access_token: o.access_token,
            refresh_token: o.refresh_token,
          }))
        return
      }
      if (!e.client_id || !e.client_secret)
        throw new Error("empty ClientID or ClientSecret")
      let r = new URL(Ap)
      ;(r.searchParams.set("grant_type", "refresh_token"),
        r.searchParams.set("refresh_token", e.refresh_token),
        r.searchParams.set("client_id", e.client_id),
        r.searchParams.set("client_secret", e.client_secret))
      let s = await (await fetch(r.toString())).json()
      if (s.error) throw new Error(`${s.error}: ${s.error_description || ""}`)
      if (!s.refresh_token)
        throw new Error("empty refresh token returned from OAuth")
      ;((this.accessToken = s.access_token || ""),
        (e.refresh_token = s.refresh_token),
        (e.access_token = s.access_token || ""),
        this.onTokenUpdate?.({
          access_token: s.access_token || "",
          refresh_token: s.refresh_token,
        }))
    }
    async login() {
      this.accessToken || (await this.refreshToken())
    }
    async ensureToken() {
      this.accessToken || (await this.refreshToken())
    }
    async request(e, r, i, s) {
      await this.ensureToken()
      let n = async () => {
          let o = new URL(e)
          o.searchParams.set("access_token", this.accessToken)
          for (let [h, y] of Object.entries(i || {})) o.searchParams.set(h, y)
          let c = { "User-Agent": t.apiUA, Accept: "application/json" },
            d = { method: r, headers: c }
          if (s && r === "POST") {
            let h = new URLSearchParams()
            for (let [y, x] of Object.entries(s)) h.set(y, x)
            ;((c["Content-Type"] = "application/x-www-form-urlencoded"),
              (d.body = h.toString()))
          }
          let l = await fetch(o.toString(), d),
            u = await l.text(),
            p
          try {
            p = JSON.parse(u)
          } catch {
            throw new Error(
              `req: [${e}] invalid JSON response, status ${l.status}`,
            )
          }
          let f = typeof p.errno == "number" ? p.errno : 0
          if (f !== 0) {
            if (
              (Dp.has(f) && (await this.refreshToken()),
              f === 31023 && this.addition.download_api === "crack_video")
            )
              return p
            let h = `req: [${e}] ,errno: ${f}, refer to https://pan.baidu.com/union/doc/`
            throw f === 31023
              ? new Error(
                  `${h} \u767E\u5EA6\u7F51\u76D8\u98CE\u63A7 (Trigger security policy: Please try again later) \u2014 \u89E6\u53D1\u539F\u56E0\u901A\u5E38\u662F\uFF1A\u2460 \u5F53\u524D\u90E8\u7F72\u73AF\u5883\u7684\u51FA\u53E3 IP\uFF08\u5982 Cloudflare Workers \u6570\u636E\u4E2D\u5FC3 IP\uFF09\u88AB\u767E\u5EA6\u5B89\u5168\u7B56\u7565\u62E6\u622A\uFF1B\u2461 refresh_token \u65E0\u6548\u6216\u4ECE\u975E\u5B98\u65B9\u6E20\u9053\u83B7\u53D6\uFF0C\u5BFC\u81F4\u8D26\u53F7\u88AB\u98CE\u63A7\u3002\u8BF7\u786E\u8BA4\uFF1Arefresh_token \u5FC5\u987B\u901A\u8FC7 https://api.oplist.org/ \u83B7\u53D6\uFF08\u672C\u9A71\u52A8\u9ED8\u8BA4\u5DF2\u5F00\u542F"\u4F7F\u7528\u5728\u7EBF API"\uFF09\uFF1B\u98CE\u63A7\u4E3A\u4E34\u65F6\u6027\uFF0C\u7B49\u5F85\u6570\u5206\u949F\u81F3\u6570\u5C0F\u65F6\u540E\u81EA\u52A8\u89E3\u9664\uFF1B\u957F\u671F\u4F7F\u7528\u8BF7\u5C06\u540E\u7AEF\u90E8\u7F72\u5230\u5883\u5185\u670D\u52A1\u5668\uFF08\u6216\u914D\u7F6E HTTPS_PROXY \u5883\u5185\u4EE3\u7406\uFF09\u3002`,
                )
              : new Error(h)
          }
          return p
        },
        a
      for (let o = 0; o < vr; o++)
        try {
          return await n()
        } catch (c) {
          ;((a = c), o < vr - 1 && (await Tp(An * Math.pow(2, o))))
        }
      throw a
    }
    get(e, r) {
      return this.request(fd + e, "GET", r)
    }
    postForm(e, r, i) {
      return this.request(fd + e, "POST", r, i)
    }
    async uinfo() {
      let e = await this.get("/xpan/nas", { method: "uinfo" })
      return typeof e.vip_type == "number" ? e.vip_type : 0
    }
    async getFiles(e) {
      let s = { method: "list", dir: e, web: "web" }
      this.addition.order_by &&
        ((s.order = this.addition.order_by),
        this.addition.order_direction === "desc" && (s.desc = "1"))
      let n = []
      for (let a = 0; ; a += 1e3) {
        ;((s.start = String(a)), (s.limit = String(1e3)))
        let c = (await this.get("/xpan/file", s)).list || []
        if (c.length === 0) break
        if (this.addition.only_list_video_file)
          for (let d of c) (d.isdir === 1 || d.category === 1) && n.push(d)
        else n.push(...c)
        if (c.length < 1e3) break
      }
      return n
    }
    async getOfficialLink(e) {
      let i = (
        await this.get("/xpan/multimedia", {
          method: "filemetas",
          fsids: `[${e}]`,
          dlink: "1",
        })
      ).list?.[0]?.dlink
      if (!i) throw new Error("no dlink returned from filemetas")
      let s = `${i}&access_token=${this.accessToken}`,
        a =
          (
            await fetch(s, {
              method: "HEAD",
              redirect: "manual",
              headers: { "User-Agent": "pan.baidu.com" },
            })
          ).headers.get("location") || s
      return { url: Pn(a), headers: { "User-Agent": "pan.baidu.com" } }
    }
    async getCrackLink(e) {
      let i = (
        await this.request("https://pan.baidu.com/api/filemetas", "GET", {
          target: `["${e}"]`,
          dlink: "1",
          web: "5",
          origin: "dlna",
        })
      ).info?.[0]?.dlink
      if (!i) throw new Error("no dlink returned from crack filemetas")
      return {
        url: Pn(i),
        headers: { "User-Agent": this.addition.custom_crack_ua || "netdisk" },
      }
    }
    async getCrackVideoLink(e, r) {
      let s = (
        await this.request("https://pan.baidu.com/api/mediainfo", "GET", {
          type: "VideoURL",
          path: e,
          fs_id: String(r),
          devuid: "0%1",
          clienttype: "1",
          channel: "android_15_25010PN30C_bd-netdisk_1523a",
          nom3u8: "1",
          dlink: "1",
          media: "1",
          origin: "dlna",
        })
      )?.info?.dlink
      if (!s) throw new Error("no dlink returned from mediainfo")
      return {
        url: Pn(s),
        headers: { "User-Agent": this.addition.custom_crack_ua || "netdisk" },
      }
    }
    async manage(e, r) {
      return this.postForm(
        "/xpan/file",
        { method: "filemanager", opera: e },
        { async: "0", filelist: JSON.stringify(r), ondup: "fail" },
      )
    }
    async create(e, r, i, s, n, a, o) {
      let c = { path: e, size: String(r), isdir: String(i), rtype: "3" }
      return (
        a !== 0 && o !== 0 && hd(c, o, a),
        s && (c.uploadid = s),
        n && (c.block_list = n),
        this.postForm("/xpan/file", { method: "create" }, c)
      )
    }
    async precreate(e, r, i, s, n, a, o) {
      let c = {
        path: e,
        size: String(r),
        isdir: "0",
        autoinit: "1",
        rtype: "3",
        block_list: i,
      }
      ;(s !== "" && n !== "" && ((c["content-md5"] = s), (c["slice-md5"] = n)),
        hd(c, a, o))
      let d = await this.postForm("/xpan/file", { method: "precreate" }, c)
      return (
        d.return_type === 2 &&
          d.info &&
          ((d.info.ctime = a), (d.info.mtime = o)),
        d
      )
    }
    async uploadSlice(e, r, i, s, n) {
      let a = new URL(e + "/rest/2.0/pcs/superfile2")
      for (let [l, u] of Object.entries(r)) a.searchParams.set(l, u)
      let o = new FormData()
      o.append("file", new Blob([s]), i)
      let c = new AbortController(),
        d = setTimeout(() => c.abort(), n > 0 ? n : Ep)
      try {
        let u = await (
            await fetch(a.toString(), {
              method: "POST",
              body: o,
              signal: c.signal,
            })
          ).text(),
          p = u.toLowerCase()
        if (
          p.includes("uploadid") &&
          (p.includes("invalid") ||
            p.includes("expired") ||
            p.includes("not found"))
        )
          throw new Nt()
        let f
        try {
          f = JSON.parse(u)
        } catch {
          f = {}
        }
        let h = f?.error_code ?? 0,
          y = f?.errno ?? 0
        if (h !== 0 || y !== 0)
          throw new Error(`error uploading to baidu, response=${u}`)
      } finally {
        clearTimeout(d)
      }
    }
    getUploadUrl(e, r) {
      let i = this.addition
      return (!i.use_dynamic_upload_api || !r, i.upload_api || Lt)
    }
    async requestForUploadUrl(e, r) {
      let i = await this.request(
          "https://d.pcs.baidu.com/rest/2.0/pcs/file",
          "GET",
          {
            method: "locateupload",
            appid: "250528",
            path: e,
            uploadid: r,
            upload_version: "2.0",
          },
        ),
        s = ""
      if (
        (i.servers && i.servers.length > 0
          ? (s = i.servers[0].server)
          : i.bak_servers &&
            i.bak_servers.length > 0 &&
            (s = i.bak_servers[0].server),
        !s)
      )
        throw new Error("upload URL is empty")
      return s
    }
    getSliceSize(e, r) {
      let i = this.addition,
        s = i.custom_upload_part_size || 0
      if (r === 0)
        return (
          s !== 0 &&
            console.warn(
              "[baidu_netdisk] CustomUploadPartSize is not supported for non-vip user, use DefaultSliceSize",
            ),
          e > Sn * zt &&
            console.warn(
              `[baidu_netdisk] File size(${e}) is too large, may cause upload failure`,
            ),
          zt
        )
      if (s !== 0)
        return s < zt
          ? (console.warn(
              `[baidu_netdisk] CustomUploadPartSize(${s}) is less than DefaultSliceSize, use DefaultSliceSize`,
            ),
            zt)
          : r === 1 && s > bn
            ? (console.warn(
                `[baidu_netdisk] CustomUploadPartSize(${s}) is greater than VipSliceSize, use VipSliceSize`,
              ),
              bn)
            : r === 2 && s > kn
              ? (console.warn(
                  `[baidu_netdisk] CustomUploadPartSize(${s}) is greater than SVipSliceSize, use SVipSliceSize`,
                ),
                kn)
              : s
      let n = zt
      if (
        (r === 1 && (n = bn), r === 2 && (n = kn), i.low_bandwith_upload_mode)
      ) {
        let a = zt
        for (; a <= n; ) {
          if (e <= Sn * a) return a
          a += Cp
        }
      }
      return (
        e > Sn * n &&
          console.warn(
            `[baidu_netdisk] File size(${e}) is too large, may cause upload failure`,
          ),
        n
      )
    }
    async quota() {
      let e = await this.request("https://pan.baidu.com/api/quota", "GET")
      return { total: e.total || 0, used: e.used || 0 }
    }
  },
  Nt = class extends Error {
    constructor() {
      ;(super("uploadid expired"), (this.name = "ErrUploadIDExpired"))
    }
  }
function hd(t, e, r) {
  ;((t.local_mtime = String(r)), (t.local_ctime = String(e)))
}
var Fp = new Error("empty files are not allowed by baidu netdisk")
function Ip(t) {
  return new Promise((e) => setTimeout(e, t))
}
function md(t) {
  let e = t.server_filename || _r(t.path),
    r = t.server_ctime || t.ctime || 0,
    i = t.server_mtime || t.mtime || 0,
    s = t.isdir === 1
  return {
    name: e,
    size: t.size || 0,
    is_dir: s,
    created: r ? new Date(r * 1e3).toISOString() : void 0,
    modified: i ? new Date(i * 1e3).toISOString() : new Date().toISOString(),
    sign: String(t.fs_id),
    type: W(e, s),
    thumb: t.thumbs?.url3 || "",
    raw_url: "",
  }
}
function _r(t) {
  let e = String(t || "").split("/")
  return e[e.length - 1] || ""
}
var ns = class {
  client
  addition
  uploadThread = 3
  vipType = 0
  pathCache = new Map()
  constructor(e, r) {
    ;((this.addition = Mt(e)), (this.client = new ss(this.addition, r)))
  }
  async init() {
    let e = this.addition,
      r = parseInt(e.upload_thread || "3", 10)
    if (
      (r < 1 && (r = 1),
      r > 32 && (r = 32),
      (this.uploadThread = r),
      !this.client.accessToken)
    )
      throw new Error(
        "\u767E\u5EA6\u7F51\u76D8\u7F3A\u5C11\u8BBF\u95EE\u4EE4\u724C access_token\uFF08\u5FC5\u586B\uFF09\uFF1A\u8BF7\u901A\u8FC7 https://api.oplist.org/ \u83B7\u53D6\u540E\u586B\u5199\u3002",
      )
    this.vipType = await this.client.uinfo()
  }
  baiduPath(e) {
    let r = "/" + String(e || "").replace(/\/+/g, "/")
    return r === "/" ? "/" : r.replace(/\/$/, "")
  }
  async list(e, r) {
    let i = await this.client.getFiles(this.baiduPath(r)),
      s = i.map(md)
    for (let n of i)
      this.pathCache.set(n.path, { fsId: n.fs_id, parent: yd(n.path) })
    return V(s, this.addition.order_by || "name", this.addition.order_direction)
  }
  async get(e, r) {
    let i = this.baiduPath(r)
    if (i === "/")
      return {
        name: "/",
        size: 0,
        is_dir: !0,
        modified: new Date().toISOString(),
        sign: "",
        type: 1,
        raw_url: "",
      }
    let s = yd(i),
      n = _r(i),
      a = (() => {
        try {
          return decodeURIComponent(n)
        } catch {
          return n
        }
      })(),
      c = (await this.client.getFiles(s)).find(
        (l) =>
          l.server_filename === n ||
          l.server_filename === a ||
          l.path === i ||
          String(l.fs_id) === n,
      )
    if (!c) throw new Error(`file not found: ${n}`)
    this.pathCache.set(c.path, { fsId: c.fs_id, parent: s })
    let d = md(c)
    if (c.isdir !== 1)
      try {
        let l = await this.getDownloadLink(c)
        ;((d.raw_url = l.url), (d.raw_url_headers = l.headers))
      } catch (l) {
        console.warn(
          `[baidu_netdisk] getDownloadLink warning for ${c.server_filename}:`,
          l.message,
        )
      }
    return d
  }
  async getDownloadLink(e) {
    let r = this.addition.download_api || "official"
    return r === "crack"
      ? this.client.getCrackLink(e.path)
      : r === "crack_video"
        ? this.client.getCrackVideoLink(e.path, e.fs_id)
        : this.client.getOfficialLink(e.fs_id)
  }
  async mkdir(e, r) {
    await this.client.create(this.baiduPath(r), 0, 1, "", "", 0, 0)
  }
  async rename(e, r, i) {
    await this.client.manage("rename", [
      { path: this.baiduPath(r), newname: i },
    ])
  }
  async remove(e, r, i) {
    await this.client.manage("delete", [this.baiduPath(r)])
  }
  async move(e, r, i, s, n) {
    let a = i[0] || _r(s),
      o = this.baiduPath(r)
    await this.client.manage("move", [
      { path: this.baiduPath(s), dest: o, newname: a },
    ])
  }
  async copy(e, r, i, s, n) {
    let a = i[0] || _r(s),
      o = this.baiduPath(r)
    await this.client.manage("copy", [
      { path: this.baiduPath(s), dest: o, newname: a },
    ])
  }
  async put(e, r, i) {
    if (i.length < 1) throw Fp
    let s = i.length,
      n = this.baiduPath(r),
      a = _r(n),
      o = Math.floor(Date.now() / 1e3),
      c = o,
      d = o,
      l = ts(i),
      u = JSON.stringify([l])
    try {
      await this.client.create(n, s, 0, "", u, c, d)
      return
    } catch {}
    let p = this.client.getSliceSize(s, this.vipType),
      f = Math.max(1, Math.ceil(s / p)),
      h = s % p || p,
      y = []
    for (let m = 0; m < f; m++) {
      let w = m === f - 1 ? h : p,
        v = i.subarray(m * p, m * p + w)
      y.push(ts(v))
    }
    let x = JSON.stringify(y),
      g = await this.client.precreate(
        n,
        s,
        x,
        l,
        ts(i.subarray(0, 256 * 1024)),
        d,
        c,
      )
    if (!(g.return_type === 2 && g.info)) {
      for (let m = 0; m < 2; m++) {
        let w = this.addition.upload_api || Lt
        if (this.addition.use_dynamic_upload_api && g.uploadid)
          try {
            w = await this.client.requestForUploadUrl(n, g.uploadid)
          } catch {
            w = this.addition.upload_api || Lt
          }
        let v = g.block_list || [],
          _ = !1,
          b = 0,
          P = Math.max(1, Math.min(this.uploadThread, v.length)),
          E = async () => {
            for (;;) {
              let S = b++
              if (S >= v.length) return
              let D = v[S]
              if (D < 0) continue
              let k = D * p,
                C = D + 1 === f ? h : p,
                F = i.subarray(k, k + C),
                A = {
                  method: "upload",
                  access_token: this.client.accessToken,
                  type: "tmpfile",
                  path: n,
                  uploadid: g.uploadid,
                  partseq: String(D),
                },
                $ = !1
              for (let O = 0; O < vr; O++)
                try {
                  ;(await this.client.uploadSlice(
                    w,
                    A,
                    a,
                    F,
                    (this.addition.upload_timeout || 60) * 1e3,
                  ),
                    (v[S] = -1),
                    ($ = !0))
                  break
                } catch (j) {
                  if (j instanceof Nt) throw j
                  O < vr - 1 && (await Ip(Math.min(An * Math.pow(2, O), gd)))
                }
              if (!$) throw ((_ = !0), new Error(`upload slice ${D} failed`))
            }
          }
        try {
          if ((await Promise.all(Array.from({ length: P }, () => E())), _))
            throw new Error("upload slice failed")
        } catch (S) {
          if (S instanceof Nt) {
            let D = await this.client.precreate(n, s, x, "", "", d, c)
            if (D.return_type === 2 && D.info) return
            g = D
            continue
          }
          throw S
        }
        await this.client.create(n, s, 0, g.uploadid, x, c, d)
        return
      }
      throw new Error("upload failed after retries")
    }
  }
}
function yd(t) {
  let e = t.lastIndexOf("/")
  return e <= 0 ? "/" : t.slice(0, e)
}
xe()
is()
var je = "https://proapi.115.com",
  Rp = "https://passportapi.115.com",
  Bp = je + "/open/upload/get_token",
  Up = je + "/open/upload/init",
  $p = je + "/open/folder/add",
  Op = je + "/open/ufile/files",
  xd = je + "/open/folder/get_info",
  qp = je + "/open/ufile/copy",
  jp = je + "/open/ufile/move",
  zp = je + "/open/ufile/downurl",
  Lp = je + "/open/ufile/update",
  Np = je + "/open/ufile/delete",
  Mp = je + "/open/user/info",
  Hp = Rp + "/open/refreshToken"
function Kp(t) {
  return t === 99 || String(t).startsWith("401")
}
var br = 430004,
  as = class t {
    addition
    accessToken = ""
    refreshTokenValue = ""
    onTokenUpdate
    rateLimitMs = 0
    lastRequestAt = 0
    constructor(e, r) {
      ;((this.addition = e),
        (this.accessToken = e.access_token || ""),
        (this.refreshTokenValue = e.refresh_token || ""),
        (this.onTokenUpdate = r))
      let i = e.limit_rate || 0
      i > 0 && (this.rateLimitMs = 1e3 / i)
    }
    async waitRateLimit() {
      if (this.rateLimitMs <= 0) return
      let e = Date.now(),
        r = this.lastRequestAt + this.rateLimitMs - e
      ;(r > 0 && (await new Promise((i) => setTimeout(i, r))),
        (this.lastRequestAt = Date.now()))
    }
    async fetchWithRetry(e, r) {
      let i
      for (let s = 0; s < 3; s++)
        try {
          let n = new AbortController(),
            a = setTimeout(() => n.abort(), 2e4)
          try {
            return await fetch(e, { ...r, signal: n.signal })
          } finally {
            clearTimeout(a)
          }
        } catch (n) {
          ;((i = n),
            s < 2 && (await new Promise((a) => setTimeout(a, 500 * (s + 1)))))
        }
      throw i
    }
    static describeNetError(e) {
      let r = e,
        i = r?.cause?.code || r?.cause?.cause?.code,
        s = r?.cause?.message || r?.cause?.cause?.message
      return i
        ? `${r?.message || "fetch failed"}\uFF08${i}\uFF09`
        : s
          ? `${r?.message || "fetch failed"}\uFF08${s}\uFF09`
          : r?.message || String(e)
    }
    async refreshToken() {
      if (!this.refreshTokenValue)
        throw new Error(
          "115 \u7F51\u76D8\u7F3A\u5C11 refresh_token\uFF08\u5FC5\u586B\uFF09",
        )
      let e = new URLSearchParams()
      e.set("refresh_token", this.refreshTokenValue)
      let i = await (
        await this.fetchWithRetry(Hp, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: e.toString(),
        })
      ).json()
      if (i.code !== 0 || !i.data?.access_token || !i.data?.refresh_token)
        throw new Error(
          `115 \u7F51\u76D8 token \u5237\u65B0\u5931\u8D25\uFF08code ${i.code} ${i.message}\uFF09\uFF1A\u8BF7\u786E\u8BA4 refresh_token \u6709\u6548\u3002`,
        )
      ;((this.accessToken = i.data.access_token),
        (this.refreshTokenValue = i.data.refresh_token),
        (this.addition.access_token = this.accessToken),
        (this.addition.refresh_token = this.refreshTokenValue),
        this.onTokenUpdate?.({
          access_token: this.accessToken,
          refresh_token: this.refreshTokenValue,
        }))
    }
    async request(e, r, i, s, n, a = !1) {
      await this.waitRateLimit()
      let o = async () => {
          let l = new URL(e)
          for (let [x, g] of Object.entries(i || {}))
            g !== "" && l.searchParams.set(x, g)
          let u = {
            Accept: "application/json",
            "User-Agent":
              n ||
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Chrome/142.0.0.0 OpenList/425.6.30",
          }
          this.accessToken && (u.Authorization = `Bearer ${this.accessToken}`)
          let p = { method: r, headers: u }
          if (s && r === "POST") {
            let x = new URLSearchParams()
            for (let [g, m] of Object.entries(s)) m !== "" && x.set(g, m)
            ;((u["Content-Type"] = "application/x-www-form-urlencoded"),
              (p.body = x.toString()))
          }
          let f = await this.fetchWithRetry(l.toString(), p),
            h = await f.text(),
            y
          try {
            y = JSON.parse(h)
          } catch {
            y = { state: !1, code: f.status, message: h.slice(0, 200) }
          }
          return { body: y, rawText: h }
        },
        c
      try {
        ;({ body: c } = await o())
      } catch (l) {
        throw new Error(t.describeNetError(l))
      }
      let d = c?.state
      if (d === !1 || d === void 0) {
        let l = Number(c?.code ?? 0)
        if (Kp(l) && !a) {
          ;(await this.refreshToken(), (c = (await o()).body))
          let p = c?.state
          if (p !== !1 && p !== void 0) return c
          throw new Error(
            `115 \u7F51\u76D8 API \u9519\u8BEF\uFF08code ${c?.code} ${c?.message}\uFF09`,
          )
        }
        if (l === br) {
          let u = new Error("115 object not found")
          throw ((u.code = br), u)
        }
        throw new Error(
          `115 \u7F51\u76D8 API \u9519\u8BEF\uFF08code ${l} ${c?.message || ""}\uFF09`,
        )
      }
      return c
    }
    async userInfo() {
      return (await this.request(Mp, "GET"))?.data
    }
    async getFiles(e) {
      let r = await this.request(Op, "GET", {
        cid: e.cid,
        limit: String(e.limit),
        offset: String(e.offset),
        asc: e.asc ? "1" : "0",
        o: e.o || "",
        show_dir: e.showDir ? "1" : "0",
        cur: "1",
      })
      return { files: r.data || [], count: r.count || 0 }
    }
    async getFolderInfo(e) {
      return (await this.request(xd, "GET", { file_id: e }))?.data
    }
    async getFolderInfoByPath(e) {
      return (await this.request(xd, "POST", void 0, { path: e }))?.data
    }
    async mkdir(e, r) {
      return (await this.request($p, "POST", void 0, { pid: e, file_name: r }))
        ?.data
    }
    async move(e, r) {
      await this.request(jp, "POST", void 0, { file_ids: e, to_cid: r })
    }
    async updateFile(e, r) {
      await this.request(Lp, "POST", void 0, { file_id: e, file_name: r })
    }
    async copy(e, r) {
      await this.request(qp, "POST", void 0, {
        pid: e,
        file_id: r,
        no_dupli: "1",
      })
    }
    async delFile(e, r) {
      await this.request(Np, "POST", void 0, { file_ids: e, parent_id: r })
    }
    async downUrl(e, r) {
      return (await this.request(zp, "POST", void 0, { pick_code: e }, r))?.data
    }
    async uploadGetToken() {
      return (await this.request(Bp, "GET"))?.data
    }
    async uploadInit(e) {
      return (
        await this.request(Up, "POST", void 0, {
          file_name: e.fileName,
          file_size: String(e.fileSize),
          target: `U_1_${e.target}`,
          fileid: e.fileId,
          preid: e.preId,
          sign_key: e.signKey || "",
          sign_val: e.signVal || "",
        })
      )?.data
    }
  }
var os =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Chrome/142.0.0.0 OpenList/425.6.30",
  Wp = 45
function wd(t) {
  let e = t.fc === "0"
  return {
    name: t.fn,
    size: t.fs || 0,
    is_dir: e,
    created: t.uppt ? new Date(t.uppt * 1e3).toISOString() : void 0,
    modified: t.upt
      ? new Date(t.upt * 1e3).toISOString()
      : new Date().toISOString(),
    sign: t.fid,
    type: W(t.fn, e),
    thumb: t.thumbnail || t.fco || "",
    raw_url: "",
  }
}
function Vp(t) {
  let e = { ...(t || {}) }
  return (
    (e.order_by = e.order_by || "file_name"),
    (e.order_direction = e.order_direction || "asc"),
    (e.page_size = e.page_size || 200),
    (e.root_folder_id || e.root_folder_id === "0") &&
      !e.root_id &&
      (e.root_id = String(e.root_folder_id)),
    e
  )
}
var cs = class t {
  client
  addition
  pageSize = 200
  parentPath = "/"
  fidCache = new Map()
  budget = { used: 0, limit: Wp }
  linkCache = new Map()
  static LINK_TTL_MS = 1800 * 1e3
  constructor(e, r) {
    ;((this.addition = Vp(e)), (this.client = new as(this.addition, r)))
  }
  async init() {
    let r = this.addition.page_size || 200
    ;(r <= 0 && (r = 200), r > 1150 && (r = 1150), (this.pageSize = r))
    try {
      await this.client.userInfo()
    } catch (s) {
      if (s?.code === br) throw s
      let n = String(s?.message || s)
      throw n.includes("fetch") || n.includes("ECONN") || n.includes("abort")
        ? new Error(
            `115 \u7F51\u76D8\u7F51\u7EDC\u8FDE\u63A5\u5931\u8D25\uFF08${n}\uFF09\uFF1Aproapi.115.com \u53EF\u80FD\u65E0\u6CD5\u4ECE\u5F53\u524D\u90E8\u7F72\u73AF\u5883\u8BBF\u95EE\uFF08\u6570\u636E\u4E2D\u5FC3 IP \u53EF\u80FD\u88AB 115 \u62E6\u622A\uFF09\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u6216\u66F4\u6362\u90E8\u7F72\u73AF\u5883\u3002`,
          )
        : new Error(
            `115 \u7F51\u76D8 token \u9A8C\u8BC1\u5931\u8D25\uFF1A${n}\u3002\u8BF7\u786E\u8BA4 access_token / refresh_token \u6709\u6548\u3002`,
          )
    }
    let i = this.getRootId()
    if (i !== "0")
      try {
        let s = await this.client.getFolderInfo(i)
        if (s.file_id !== "0") {
          this.parentPath = `/${s.file_name}`
          let n = [...(s.paths || [])].reverse()
          for (let a of n) this.parentPath = `/${a.file_name}${this.parentPath}`
        }
      } catch (s) {
        console.warn("[115open] init root path resolve failed:", s.message)
      }
  }
  getRootId() {
    return (this.addition.root_id || "0").trim() || "0"
  }
  reserve() {
    return this.budget.used >= this.budget.limit
      ? (console.warn(
          `[115open] \u5DF2\u8FBE Cloudflare subrequest \u9884\u7B97\u4E0A\u9650(${this.budget.limit})\uFF0C\u7ED3\u679C\u5DF2\u622A\u65AD`,
        ),
        !1)
      : (this.budget.used++, !0)
  }
  async list(e, r) {
    this.budget.used = 0
    let i = await this.resolveFolderId(r),
      s = [],
      n = 0
    for (; this.reserve(); ) {
      let { files: a, count: o } = await this.client.getFiles({
        cid: i,
        limit: this.pageSize,
        offset: n,
        asc: this.addition.order_direction === "asc",
        o: this.addition.order_by || "file_name",
        showDir: !0,
      })
      for (let c of a) (s.push(wd(c)), this.fidCache.set(c.fid, c.fid))
      if (s.length >= o || a.length === 0) break
      n += a.length
    }
    return V(
      s,
      this.addition.order_by || "file_name",
      this.addition.order_direction,
    )
  }
  async resolveFolderId(e) {
    let r = this.getRootId(),
      i =
        "/" +
        String(e || "")
          .split("/")
          .filter(Boolean)
          .join("/")
    if (i === "/" || i === `/${r}`) return r
    let s = this.fidCache.get(i)
    if (s) return s
    let n = `/${r === "0" ? "" : r}${i === "/" ? "" : i}`
    try {
      if (!this.reserve()) throw new Error("subrequest budget exceeded")
      let d = await this.client.getFolderInfoByPath(n)
      if (d.file_id) return (this.fidCache.set(i, d.file_id), d.file_id)
    } catch (d) {
      if (d?.code !== br && d?.code !== 990002) throw d
    }
    let a = i.split("/").filter(Boolean),
      o = r,
      c = ""
    for (let d of a) {
      let l = (() => {
        try {
          return decodeURIComponent(d)
        } catch {
          return d
        }
      })()
      c = `${c}/${d}`
      let u = this.fidCache.get(c)
      if (u) {
        o = u
        continue
      }
      if (!this.reserve()) throw new Error("subrequest budget exceeded")
      let { files: p } = await this.client.getFiles({
          cid: o,
          limit: 1e3,
          offset: 0,
          asc: !0,
          o: "file_name",
          showDir: !0,
        }),
        f = p.find(
          (h) => h.fc === "0" && (h.fn === d || h.fn === l || h.fid === d),
        )
      if (!f) throw new Error(`folder not found: ${d}`)
      ;((o = f.fid), this.fidCache.set(c, o))
    }
    return o
  }
  async resolveFile(e) {
    let r =
        "/" +
        String(e || "")
          .split("/")
          .filter(Boolean)
          .join("/"),
      i = r.split("/").filter(Boolean),
      s = i.pop() || ""
    if (!s) throw new Error(`file not found: ${r}`)
    let n = (() => {
        try {
          return decodeURIComponent(s)
        } catch {
          return s
        }
      })(),
      a = "/" + i.join("/"),
      o = await this.resolveFolderId(a),
      c = 0
    for (;;) {
      if (!this.reserve()) throw new Error("subrequest budget exceeded")
      let { files: d, count: l } = await this.client.getFiles({
          cid: o,
          limit: Math.max(this.pageSize, 1e3),
          offset: c,
          asc: !0,
          o: "file_name",
          showDir: !0,
        }),
        u = d.find(
          (p) => p.fn === s || p.fn === n || p.fid === s || p.fid === n,
        )
      if (u) return u
      if (d.length === 0 || c + d.length >= l) break
      c += d.length
    }
    throw new Error(`file not found: ${s}`)
  }
  async get(e, r) {
    this.budget.used = 0
    let i =
      "/" +
      String(r || "")
        .split("/")
        .filter(Boolean)
        .join("/")
    if (i === "/" || i === `/${this.getRootId()}`)
      return {
        name: this.getRootId(),
        size: 0,
        is_dir: !0,
        modified: new Date().toISOString(),
        sign: this.getRootId(),
        type: 1,
        raw_url: "",
      }
    let s = await this.resolveFile(r),
      n = wd(s)
    if (s.fc !== "0" && s.pc)
      try {
        let a = `${s.fid}|${os}`,
          o = this.linkCache.get(a)
        if (o && o.expire > Date.now())
          ((n.raw_url = o.url), (n.raw_url_headers = { "User-Agent": os }))
        else {
          if (!this.reserve()) throw new Error("subrequest budget exceeded")
          let d = (await this.client.downUrl(s.pc, os))[s.fid]
          d?.url?.url &&
            ((n.raw_url = d.url.url),
            (n.raw_url_headers = { "User-Agent": os }),
            this.linkCache.set(a, {
              url: d.url.url,
              expire: Date.now() + t.LINK_TTL_MS,
            }))
        }
      } catch (a) {
        String(a?.message || a).includes("406")
          ? console.warn(
              "[115open] downurl \u914D\u989D\u7528\u5C3D\uFF08406\uFF09\uFF1A\u5DF2\u4F7F\u7528\u7F13\u5B58\u6216\u7A0D\u540E\u91CD\u8BD5",
            )
          : console.warn(`[115open] downUrl warning for ${s.fn}:`, a.message)
      }
    return n
  }
  async mkdir(e, r) {
    this.budget.used = 0
    let i = String(r || "")
        .split("/")
        .filter(Boolean),
      s = i.pop() || "\u65B0\u6587\u4EF6\u5939",
      n = "/" + i.join("/"),
      a = await this.resolveFolderId(n)
    if (!this.reserve()) throw new Error("subrequest budget exceeded")
    await this.client.mkdir(a, s)
  }
  async rename(e, r, i) {
    this.budget.used = 0
    let s = await this.resolveFile(r)
    if (!this.reserve()) throw new Error("subrequest budget exceeded")
    await this.client.updateFile(s.fid, i)
  }
  async remove(e, r, i) {
    this.budget.used = 0
    let s = await this.resolveFile(r)
    if (!this.reserve()) throw new Error("subrequest budget exceeded")
    await this.client.delFile(s.fid, s.pid || this.getRootId())
  }
  async move(e, r, i, s, n) {
    this.budget.used = 0
    let a = await this.resolveFile(s),
      o = await this.resolveFolderId(r)
    if (!this.reserve()) throw new Error("subrequest budget exceeded")
    await this.client.move(a.fid, o)
  }
  async copy(e, r, i, s, n) {
    this.budget.used = 0
    let a = await this.resolveFile(s),
      o = await this.resolveFolderId(r)
    if (!this.reserve()) throw new Error("subrequest budget exceeded")
    await this.client.copy(o, a.fid)
  }
  async put(e, r, i) {
    if (i.length < 1)
      throw new Error(
        "115 \u7F51\u76D8\u4E0D\u5141\u8BB8\u4E0A\u4F20\u7A7A\u6587\u4EF6",
      )
    this.budget.used = 0
    let s = String(r || "")
        .split("/")
        .filter(Boolean),
      n = s.pop() || "file",
      a = "/" + s.join("/"),
      c = await this.resolveFolderId(a),
      d = i.length,
      l = (await rs(i)).toUpperCase(),
      u = Math.min(128 * 1024, d),
      p = (await rs(i.subarray(0, u))).toUpperCase()
    if (!this.reserve()) throw new Error("subrequest budget exceeded")
    let f = await this.client.uploadInit({
      fileName: n,
      fileSize: d,
      target: c,
      fileId: l,
      preId: p,
    })
    if (f.status === 2) return
    if ([6, 7, 8].includes(f.status) && f.sign_check) {
      let y = f.sign_check.split("-"),
        x = parseInt(y[0], 10),
        g = parseInt(y[1], 10)
      if (Number.isFinite(x) && Number.isFinite(g)) {
        let m = (await rs(i.subarray(x, g + 1))).toUpperCase()
        if (!this.reserve()) throw new Error("subrequest budget exceeded")
        if (
          ((f = await this.client.uploadInit({
            fileName: n,
            fileSize: d,
            target: c,
            fileId: l,
            preId: p,
            signKey: f.sign_key,
            signVal: m,
          })),
          f.status === 2)
        )
          return
      }
    }
    if (!this.reserve()) throw new Error("subrequest budget exceeded")
    let h = await this.client.uploadGetToken()
    if (!f.bucket || !f.object || !h.endpoint)
      throw new Error(
        "115 \u4E0A\u4F20\u521D\u59CB\u5316\u5931\u8D25\uFF1A\u7F3A\u5C11 OSS \u4E0A\u4F20\u4FE1\u606F",
      )
    await this.ossPutObject(h, f, i)
  }
  async ossPutObject(e, r, i) {
    let n = `${(e.endpoint.startsWith("http") ? e.endpoint : `https://${e.endpoint}`).replace(/\/$/, "")}/${r.object}`,
      a = Buffer.from(r.callback?.callback || "", "utf8").toString("base64"),
      o = Buffer.from(r.callback?.callback_var || "", "utf8").toString(
        "base64",
      ),
      c = new Date().toUTCString(),
      d = "application/octet-stream",
      l = `x-oss-callback:${a}
x-oss-callback-var:${o}
x-oss-security-token:${e.SecurityToken}
`,
      u = `/${r.bucket}/${r.object}`,
      p = `PUT

${d}
${c}
${l}${u}`,
      f = await pd(p, e.AccessKeySecret),
      h = await fetch(n, {
        method: "PUT",
        headers: {
          "Content-Type": d,
          Date: c,
          Authorization: `OSS ${e.AccessKeyId}:${f}`,
          "x-oss-security-token": e.SecurityToken,
          "x-oss-callback": a,
          "x-oss-callback-var": o,
          "Content-Length": String(i.length),
        },
        body: i,
      })
    if (!h.ok) {
      let y = (await h.text()).slice(0, 300)
      throw new Error(
        `115 OSS \u4E0A\u4F20\u5931\u8D25\uFF08HTTP ${h.status}\uFF09\uFF1A${y}`,
      )
    }
  }
}
xe()
function se(t) {
  if (!t) return "/"
  let r = t
    .replace(/\\/g, "/")
    .replace(/\/+/g, "/")
    .replace(/^\/|\/$/g, "")
  return r ? "/" + r : "/"
}
function Me(t) {
  let e = se(t)
  if (e === "/") return "/"
  let r = e.split("/").filter(Boolean)
  return (r.pop(), r.length ? "/" + r.join("/") : "/")
}
function le(t) {
  let e = se(t)
  if (e === "/") return ""
  let r = e.split("/").filter(Boolean)
  return r[r.length - 1] || ""
}
function Ht(...t) {
  return se(t.join("/"))
}
function bt(t, e, r) {
  if (!t || !t.trim()) return `${e.UserName} ${r} ${e.ObjPath}`
  let i = t
  return (
    (i = i.replace(/\{\{\.UserName\}\}/g, e.UserName || "")),
    (i = i.replace(/\{\{\.ObjName\}\}/g, e.ObjName || "")),
    (i = i.replace(/\{\{\.ObjPath\}\}/g, e.ObjPath || "")),
    (i = i.replace(/\{\{\.ParentName\}\}/g, e.ParentName || "")),
    (i = i.replace(/\{\{\.ParentPath\}\}/g, e.ParentPath || "")),
    (i = i.replace(/\{\{\.TargetName\}\}/g, e.TargetName || "")),
    (i = i.replace(/\{\{\.TargetPath\}\}/g, e.TargetPath || "")),
    i
  )
}
function vd(t, e) {
  let r = se(t),
    i = se(e),
    s = 1
  for (; s < r.length && s < i.length && r[s] === i[s]; ) s++
  let n = s
  for (; n < r.length && r[n] !== "/"; ) n++
  let a = s
  for (; a < i.length && i[a] !== "/"; ) a++
  for (; s > 0 && r[s] !== "/"; ) s--
  let o = se(r.slice(0, s)),
    c = r.slice(s + 1, n),
    d = i.slice(s + 1, a),
    l = r.slice(s + 1),
    u = i.slice(s + 1)
  return { ancestor: o, aChildName: c, bChildName: d, aRest: l, bRest: u }
}
var ds = class {
  addition
  token
  owner
  repo
  constructor(e) {
    ;((this.addition = e),
      (this.token = (e.token || "").trim()),
      (this.owner = (e.owner || "").trim()),
      (this.repo = (e.repo || "").trim()))
  }
  get headers() {
    let e = {
      Accept: "application/vnd.github.object+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "OpenListNext-Github-Driver",
    }
    return (this.token && (e.Authorization = `Bearer ${this.token}`), e)
  }
  async request(e, r = {}) {
    let i = { ...this.headers, ...(r.headers || {}) },
      s
    r.body !== void 0 &&
      (typeof r.body == "string"
        ? (s = r.body)
        : ((s = JSON.stringify(r.body)),
          i["Content-Type"] || (i["Content-Type"] = "application/json")))
    let n = await fetch(e, { method: r.method || "GET", headers: i, body: s })
    if (!n.ok) {
      let a = `${n.status} ${n.statusText}`
      try {
        let o = await n.json()
        o?.message && (a = `${n.status} ${n.statusText}: ${o.message}`)
      } catch {}
      throw new Error(a)
    }
    return n.status === 204 ? {} : await n.json()
  }
  getContentApiUrl(e) {
    let r = se(e)
    return `https://api.github.com/repos/${this.owner}/${this.repo}/contents${r === "/" ? "" : r}`
  }
  async getContents(e, r) {
    let i = new URL(this.getContentApiUrl(e))
    return (r && i.searchParams.set("ref", r), this.request(i.toString()))
  }
  async getRepo() {
    return this.request(
      `https://api.github.com/repos/${this.owner}/${this.repo}`,
    )
  }
  async getBranchHead(e) {
    return (
      await this.request(
        `https://api.github.com/repos/${this.owner}/${this.repo}/branches/${encodeURIComponent(e)}`,
      )
    ).commit.sha
  }
  async getAuthenticatedUser() {
    return this.request("https://api.github.com/user")
  }
  async getTree(e) {
    return this.request(
      `https://api.github.com/repos/${this.owner}/${this.repo}/git/trees/${e}`,
    )
  }
  async getTreeDirectly(e, r) {
    let i = await this.getContents(e, r)
    if (!i.entries && i.type !== "dir") throw new Error(`${e} is not a folder`)
    let s = await this.getTree(i.sha)
    if (s.truncated) throw new Error(`tree ${e} is truncated`)
    return { tree: s, dirSha: i.sha }
  }
  async newTree(e, r) {
    let i = { tree: r }
    return (
      e && (i.base_tree = e),
      (
        await this.request(
          `https://api.github.com/repos/${this.owner}/${this.repo}/git/trees`,
          {
            method: "POST",
            body: i,
            headers: { Accept: "application/vnd.github+json" },
          },
        )
      ).sha
    )
  }
  async putBlob(e) {
    let r = Buffer.from(e).toString("base64")
    return (
      await this.request(
        `https://api.github.com/repos/${this.owner}/${this.repo}/git/blobs`,
        {
          method: "POST",
          body: { encoding: "base64", content: r },
          headers: { Accept: "application/vnd.github+json" },
        },
      )
    ).sha
  }
  async createCommit(e, r, i, s, n) {
    let a = { message: e, tree: r, parents: [i] }
    return (
      s?.name &&
        (a.committer = {
          name: s.name,
          email: s.email,
          date: new Date().toISOString(),
        }),
      n?.name &&
        (a.author = {
          name: n.name,
          email: n.email,
          date: new Date().toISOString(),
        }),
      (
        await this.request(
          `https://api.github.com/repos/${this.owner}/${this.repo}/git/commits`,
          {
            method: "POST",
            body: a,
            headers: { Accept: "application/vnd.github+json" },
          },
        )
      ).sha
    )
  }
  async updateRef(e, r) {
    await this.request(
      `https://api.github.com/repos/${this.owner}/${this.repo}/git/refs/heads/${encodeURIComponent(e)}`,
      {
        method: "PATCH",
        body: { sha: r, force: !1 },
        headers: { Accept: "application/vnd.github+json" },
      },
    )
  }
  async renewParentTrees(e, r, i, s, n) {
    let a = se(e),
      o = se(s)
    for (; a !== o; ) {
      a = Me(a)
      let { tree: c, dirSha: d } = await this.getTreeDirectly(a, n),
        l = c.tree.find((p) => p.sha === r)
      if (!l) throw new Error(`Object with sha ${r} not found in ${a}`)
      let u = { path: l.path, mode: l.mode, type: l.type, sha: i }
      ;((i = await this.newTree(d, [u])), (r = d))
    }
    return i
  }
}
var ls = class {
  addition
  client
  isOnBranch = !1
  commitLock = Promise.resolve()
  constructor(e) {
    ;((this.addition = e), (this.client = new ds(e)))
  }
  async acquireLock(e) {
    let r = this.commitLock,
      i
    ;((this.commitLock = new Promise((s) => {
      i = s
    })),
      await r)
    try {
      return await e()
    } finally {
      i()
    }
  }
  formatDownloadUrl(e) {
    if (!e) return ""
    let r = (this.addition.gh_proxy || "").trim()
    return r ? e.replace("https://raw.githubusercontent.com", r) : e
  }
  async commitAndPush(e, r) {
    let i = this.addition.ref,
      s = await this.client.getBranchHead(i),
      n =
        this.addition.committer_name && this.addition.committer_email
          ? {
              name: this.addition.committer_name,
              email: this.addition.committer_email,
            }
          : void 0,
      a =
        this.addition.author_name && this.addition.author_email
          ? {
              name: this.addition.author_name,
              email: this.addition.author_email,
            }
          : void 0,
      o = await this.client.createCommit(e, r, s, n, a)
    await this.client.updateRef(i, o)
  }
  async init() {
    if (
      ((this.addition.root_folder_path = se(
        this.addition.root_folder_path || "/",
      )),
      (this.addition.committer_name && !this.addition.committer_email) ||
        (!this.addition.committer_name && this.addition.committer_email))
    )
      throw new Error(
        "committer_name and committer_email must both be set or empty",
      )
    if (
      (this.addition.author_name && !this.addition.author_email) ||
      (!this.addition.author_name && this.addition.author_email)
    )
      throw new Error("author_name and author_email must both be set or empty")
    if (!this.addition.ref || !this.addition.ref.trim()) {
      let e = await this.client.getRepo()
      ;((this.addition.ref = e.default_branch), (this.isOnBranch = !0))
    } else
      try {
        ;(await this.client.getBranchHead(this.addition.ref),
          (this.isOnBranch = !0))
      } catch {
        this.isOnBranch = !1
      }
  }
  async list(e, r) {
    let i = se(r),
      s = await this.client.getContents(i, this.addition.ref)
    if (!s.entries && s.type !== "dir") throw new Error(`${r} is not a folder`)
    let n = []
    if (s.entries && s.entries.length >= 1e3) {
      let a = await this.client.getTree(s.sha)
      if (a.truncated)
        throw new Error(`Tree ${r} is truncated (>100,000 items)`)
      for (let o of a.tree) {
        if (o.path === ".gitkeep") continue
        let c = o.type === "tree"
        n.push({
          name: o.path,
          size: o.size || 0,
          is_dir: c,
          modified: new Date(0).toISOString(),
          sign: "",
          type: W(o.path, c),
          raw_url: "",
        })
      }
    } else if (s.entries)
      for (let a of s.entries) {
        if (a.name === ".gitkeep") continue
        let o = a.type === "dir"
        n.push({
          name: a.name,
          size: a.size || 0,
          is_dir: o,
          modified: new Date(0).toISOString(),
          sign: "",
          type: W(a.name, o),
          raw_url: this.formatDownloadUrl(a.download_url),
        })
      }
    return V(n, this.addition.order_by, this.addition.order_direction)
  }
  async get(e, r) {
    let i = se(r),
      s = await this.client.getContents(i, this.addition.ref)
    if (s.type === "submodule") throw new Error("cannot download a submodule")
    let n = s.type === "dir" || !!s.entries,
      a = s.name || le(i) || "root"
    return {
      name: a,
      size: s.size || 0,
      is_dir: n,
      modified: new Date(0).toISOString(),
      sign: "",
      type: W(a, n),
      raw_url: this.formatDownloadUrl(s.download_url),
    }
  }
  async mkdir(e, r) {
    if (!this.isOnBranch)
      throw new Error("cannot write to non-branch reference")
    let i = se(r),
      s = Me(i),
      n = le(i)
    await this.acquireLock(async () => {
      let a = await this.client.getContents(s, this.addition.ref)
      if (!a.entries && a.type !== "dir")
        throw new Error(`${s} is not a folder`)
      let o = await this.client.newTree("", [
          { path: ".gitkeep", mode: "100644", type: "blob", content: "" },
        ]),
        c = [{ path: n, mode: "040000", type: "tree", sha: o }]
      a.entries?.length === 1 &&
        a.entries[0].name === ".gitkeep" &&
        c.push({ path: ".gitkeep", mode: "100644", type: "blob", sha: null })
      let d = await this.client.newTree(a.sha, c),
        l = await this.client.renewParentTrees(
          s,
          a.sha,
          d,
          "/",
          this.addition.ref,
        ),
        u = bt(
          this.addition.mkdir_commit_message,
          {
            UserName: "OpenListNext",
            ObjName: n,
            ObjPath: i,
            ParentName: le(s),
            ParentPath: s,
          },
          "mkdir",
        )
      await this.commitAndPush(u, l)
    })
  }
  async put(e, r, i) {
    if (!this.isOnBranch)
      throw new Error("cannot write to non-branch reference")
    let s = se(r),
      n = Me(s),
      a = le(s)
    await this.acquireLock(async () => {
      let o = await this.client.putBlob(i),
        c = await this.client.getContents(n, this.addition.ref)
      if (!c.entries && c.type !== "dir")
        throw new Error(`${n} is not a folder`)
      let d = [{ path: a, mode: "100644", type: "blob", sha: o }]
      c.entries?.length === 1 &&
        c.entries[0].name === ".gitkeep" &&
        d.push({ path: ".gitkeep", mode: "100644", type: "blob", sha: null })
      let l = await this.client.newTree(c.sha, d),
        u = await this.client.renewParentTrees(
          n,
          c.sha,
          l,
          "/",
          this.addition.ref,
        ),
        p = bt(
          this.addition.put_commit_message,
          {
            UserName: "OpenListNext",
            ObjName: a,
            ObjPath: s,
            ParentName: le(n),
            ParentPath: n,
          },
          "upload",
        )
      await this.commitAndPush(p, u)
    })
  }
  async rename(e, r, i) {
    if (!this.isOnBranch)
      throw new Error("cannot write to non-branch reference")
    let s = se(r),
      n = Me(s),
      a = le(s)
    await this.acquireLock(async () => {
      let { tree: o, dirSha: c } = await this.client.getTreeDirectly(
          n,
          this.addition.ref,
        ),
        d = o.tree.find((y) => y.path === a)
      if (!d) throw new Error(`Object not found: ${s}`)
      if (d.type === "commit") throw new Error("cannot rename a submodule")
      let l = { path: a, mode: d.mode, type: d.type, sha: null },
        u = { path: i, mode: d.mode, type: d.type, sha: d.sha },
        p = await this.client.newTree(c, [l, u]),
        f = await this.client.renewParentTrees(n, c, p, "/", this.addition.ref),
        h = bt(
          this.addition.rename_commit_message,
          {
            UserName: "OpenListNext",
            ObjName: a,
            ObjPath: s,
            ParentName: le(n),
            ParentPath: n,
            TargetName: i,
            TargetPath: Ht(n, i),
          },
          "rename",
        )
      await this.commitAndPush(h, f)
    })
  }
  async remove(e, r, i) {
    if (!this.isOnBranch)
      throw new Error("cannot write to non-branch reference")
    let s = se(r),
      n = Me(s),
      a = le(s)
    await this.acquireLock(async () => {
      let { tree: o, dirSha: c } = await this.client.getTreeDirectly(
          n,
          this.addition.ref,
        ),
        d = o.tree.find((h) => h.path === a)
      if (!d) throw new Error(`Object not found: ${s}`)
      if (d.type === "commit") throw new Error("cannot remove a submodule")
      let l = [{ path: a, mode: d.mode, type: d.type, sha: null }]
      o.tree.length === 1 &&
        l.push({ path: ".gitkeep", mode: "100644", type: "blob", content: "" })
      let u = await this.client.newTree(c, l),
        p = await this.client.renewParentTrees(n, c, u, "/", this.addition.ref),
        f = bt(
          this.addition.delete_commit_message,
          {
            UserName: "OpenListNext",
            ObjName: a,
            ObjPath: s,
            ParentName: le(n),
            ParentPath: n,
          },
          "remove",
        )
      await this.commitAndPush(f, p)
    })
  }
  async move(e, r, i, s, n) {
    if (!this.isOnBranch)
      throw new Error("cannot write to non-branch reference")
    let a = se(s),
      o = se(r)
    if (o.startsWith(a)) throw new Error("cannot move parent dir to child")
    await this.acquireLock(async () => {
      let c = "",
        d = Me(a),
        l = le(a)
      if (o.startsWith(d)) {
        let {
            dstOldSha: p,
            dstNewSha: f,
            ancestorOldSha: h,
            srcParentTree: y,
          } = await this.copyWithoutRenewTree(a, o),
          g = o.slice(d.length).replace(/^\//, "").split("/")[0],
          m = Ht(d, g),
          w = await this.client.renewParentTrees(o, p, f, m, this.addition.ref),
          v = y.tree.find((P) => P.path === l),
          _ = y.tree.find((P) => P.path === g)
        if (!v || !_) throw new Error("Object not found during move")
        let b = await this.client.newTree(h, [
          { path: v.path, mode: v.mode, type: v.type, sha: null },
          { path: _.path, mode: _.mode, type: _.type, sha: w },
        ])
        c = await this.client.renewParentTrees(d, h, b, "/", this.addition.ref)
      } else if (a.startsWith(o)) {
        let { tree: p, dirSha: f } = await this.client.getTreeDirectly(
            d,
            this.addition.ref,
          ),
          h = p.tree.find((S) => S.path === l)
        if (!h) throw new Error("Object not found")
        if (h.type === "commit") throw new Error("cannot move a submodule")
        let y = [{ path: h.path, mode: h.mode, type: h.type, sha: null }]
        p.tree.length === 1 &&
          y.push({
            path: ".gitkeep",
            mode: "100644",
            type: "blob",
            content: "",
          })
        let x = await this.client.newTree(f, y),
          m = a.slice(o.length).replace(/^\//, "").split("/")[0]
        if (!m) throw new Error("cannot move in place")
        let w = Ht(o, m),
          v = await this.client.renewParentTrees(d, f, x, w, this.addition.ref),
          { tree: _, dirSha: b } = await this.client.getTreeDirectly(
            o,
            this.addition.ref,
          ),
          P = _.tree.find((S) => S.path === m)
        if (!P) throw new Error("Object not found")
        let E = await this.client.newTree(b, [
          { path: P.path, mode: P.mode, type: P.type, sha: v },
          { path: h.path, mode: h.mode, type: h.type, sha: h.sha },
        ])
        c = await this.client.renewParentTrees(o, b, E, "/", this.addition.ref)
      } else {
        let {
            dstOldSha: p,
            dstNewSha: f,
            srcParentOldSha: h,
            srcParentTree: y,
          } = await this.copyWithoutRenewTree(a, o),
          x = y.tree.find((F) => F.path === l)
        if (!x) throw new Error("Object not found")
        let g = [{ path: x.path, mode: x.mode, type: x.type, sha: null }]
        y.tree.length === 1 &&
          g.push({
            path: ".gitkeep",
            mode: "100644",
            type: "blob",
            content: "",
          })
        let m = await this.client.newTree(h, g),
          { ancestor: w, aChildName: v, bChildName: _ } = vd(a, o),
          b = await this.client.renewParentTrees(
            o,
            p,
            f,
            Ht(w, _),
            this.addition.ref,
          ),
          P = await this.client.renewParentTrees(
            d,
            h,
            m,
            Ht(w, v),
            this.addition.ref,
          ),
          { tree: E, dirSha: S } = await this.client.getTreeDirectly(
            w,
            this.addition.ref,
          ),
          D = E.tree.find((F) => F.path === v),
          k = E.tree.find((F) => F.path === _)
        if (!D || !k) throw new Error("Ancestor child tree not found")
        let C = await this.client.newTree(S, [
          { path: D.path, mode: D.mode, type: D.type, sha: P },
          { path: k.path, mode: k.mode, type: k.type, sha: b },
        ])
        c = await this.client.renewParentTrees(w, S, C, "/", this.addition.ref)
      }
      let u = bt(
        this.addition.move_commit_message,
        {
          UserName: "OpenListNext",
          ObjName: l,
          ObjPath: a,
          ParentName: le(d),
          ParentPath: d,
          TargetName: le(o),
          TargetPath: o,
        },
        "move",
      )
      await this.commitAndPush(u, c)
    })
  }
  async copy(e, r, i, s, n) {
    if (!this.isOnBranch)
      throw new Error("cannot write to non-branch reference")
    let a = se(s),
      o = se(r)
    if (o.startsWith(a)) throw new Error("cannot copy parent dir to child")
    await this.acquireLock(async () => {
      let { dstOldSha: c, dstNewSha: d } = await this.copyWithoutRenewTree(
          a,
          o,
        ),
        l = await this.client.renewParentTrees(o, c, d, "/", this.addition.ref),
        u = bt(
          this.addition.copy_commit_message,
          {
            UserName: "OpenListNext",
            ObjName: le(a),
            ObjPath: a,
            ParentName: le(Me(a)),
            ParentPath: Me(a),
            TargetName: le(o),
            TargetPath: o,
          },
          "copy",
        )
      await this.commitAndPush(u, l)
    })
  }
  async copyWithoutRenewTree(e, r) {
    let i = await this.client.getContents(r, this.addition.ref)
    if (!i.entries && i.type !== "dir") throw new Error(`${r} is not a folder`)
    let s = Me(e),
      n = le(e),
      { tree: a, dirSha: o } = await this.client.getTreeDirectly(
        s,
        this.addition.ref,
      ),
      c = a.tree.find((u) => u.path === n)
    if (!c) throw new Error(`Object not found: ${e}`)
    if (c.type === "commit") throw new Error("cannot copy a submodule")
    let d = [{ path: c.path, mode: c.mode, type: c.type, sha: c.sha }]
    i.entries?.length === 1 &&
      i.entries[0].name === ".gitkeep" &&
      d.push({ path: ".gitkeep", mode: "100644", type: "blob", sha: null })
    let l = await this.client.newTree(i.sha, d)
    return {
      dstOldSha: i.sha,
      dstNewSha: l,
      srcParentOldSha: o,
      srcParentTree: a,
      ancestorOldSha: o,
    }
  }
}
xe()
var Re = mt(_t(), 1),
  kd = "https://api-pan.xunlei.com/drive/v1",
  Ge = `${kd}/files`,
  Zy = `${kd}/tasks`,
  Sd = "https://xluser-ssl.xunlei.com",
  us = `${Sd}/v1`,
  Cn = "drive#folder",
  Pd = "drive#file"
var En = "UPLOAD_TYPE_RESUMABLE"
var Gp = "access_end_point_token",
  Ad = "40",
  Jp = "34a062aaa22f906fca4fefe9fb3a3021"
function kt(t) {
  return Re.default.MD5(t).toString(Re.default.enc.Hex)
}
function _d(t, e) {
  let r = e.match(/:\/\/[^/]+((\/[^/\s?#]+)*)/),
    i = r ? r[1] : e
  return `${t}:${i}`
}
function bd(t, e) {
  let r = `${t}${e}${Ad}${Jp}`,
    i = Re.default.SHA1(r).toString(Re.default.enc.Hex),
    s = Re.default.MD5(i).toString(Re.default.enc.Hex)
  return `div101.${t}${s}`
}
function Cd(t) {
  let e = t.length,
    r = 262144
  for (; e / r > 512 && r < 2097152; ) r = r << 1
  let i = []
  for (let n = 0; n < e; n += r) {
    let a = t.subarray(n, Math.min(n + r, e)),
      o = Re.default.lib.WordArray.create(a),
      c = Re.default.SHA1(o)
    i.push(c)
  }
  let s = Re.default.lib.WordArray.create()
  for (let n of i) s.concat(n)
  return Re.default.SHA1(s).toString(Re.default.enc.Hex)
}
var kr = class {
  options
  tokenResp = null
  coreLoginResp = null
  captchaToken = ""
  creditKey = ""
  constructor(e) {
    ;((this.options = e),
      (this.captchaToken = e.captchaToken || ""),
      (this.creditKey = e.creditKey || ""))
  }
  getCaptchaSign() {
    if (!this.options.algorithms || this.options.algorithms.length === 0)
      return {
        timestamp: this.options.timestamp || "",
        sign: this.options.captchaSign || "",
      }
    let e = Date.now().toString(),
      r = `${this.options.clientId}${this.options.clientVersion}${this.options.packageName}${this.options.deviceId}${e}`
    for (let i of this.options.algorithms) r = kt(r + i)
    return { timestamp: e, sign: `1.${r}` }
  }
  async refreshCaptchaToken(e, r) {
    let i = {
        action: e,
        captcha_token: this.captchaToken,
        client_id: this.options.clientId,
        device_id: this.options.deviceId,
        meta: r,
        redirect_uri: "xlaccsdk01://xunlei.com/callback?state=harbor",
      },
      s = await this.rawRequest(`${us}/shield/captcha/init`, {
        method: "POST",
        body: i,
      })
    if (s.error_code || (s.error && s.error !== "success"))
      throw new Error(
        `Captcha error: ${s.error_code} ${s.error} ${s.error_description || ""}`,
      )
    if (s.url)
      throw new Error(
        `need verify: <a target="_blank" href="${s.url}">Click Here</a>`,
      )
    if (!s.captcha_token) throw new Error("empty captchaToken")
    ;((this.captchaToken = s.captcha_token),
      this.options.onPersistCaptchaToken &&
        (await this.options.onPersistCaptchaToken(s.captcha_token)))
  }
  async refreshCaptchaTokenAtLogin(e, r) {
    let { timestamp: i, sign: s } = this.getCaptchaSign(),
      n = {
        client_version: this.options.clientVersion,
        package_name: this.options.packageName,
        user_id: r,
        timestamp: i,
        captcha_sign: s,
      }
    await this.refreshCaptchaToken(e, n)
  }
  async refreshCaptchaTokenInLogin(e, r) {
    let i = {}
    ;(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(r)
      ? (i.email = r)
      : r.length >= 11 && r.length <= 18
        ? (i.phone_number = r)
        : (i.username = r),
      await this.refreshCaptchaToken(e, i))
  }
  formatReviewData(e) {
    let r = bd(this.options.deviceId, this.options.packageName),
      i = {
        creditkey: e.creditkey,
        reviewurl: `${e.reviewurl}&deviceid=${r}`,
        deviceid: r,
        devicesign: r,
      },
      n = `
<div style="font-family: Arial, sans-serif; padding: 15px; border-radius: 5px; border: 1px solid #e0e0e0;">
    <h3 style="color: #d9534f; margin-top: 0;">
        <span style="font-size: 16px;">\u{1F512} \u672C\u6B21\u767B\u5F55\u9700\u8981\u9A8C\u8BC1</span><br>
        <span style="font-size: 14px; font-weight: normal; color: #666;">This login requires verification</span>
    </h3>
    <p style="font-size: 14px; margin-bottom: 15px;">\u4E0B\u9762\u662F\u9A8C\u8BC1\u6240\u9700\u8981\u7684\u6570\u636E\uFF0C\u5177\u4F53\u4F7F\u7528\u65B9\u6CD5\u8BF7\u53C2\u7167\u5BF9\u5E94\u7684\u9A71\u52A8\u6587\u6863<br>
    <span style="color: #666; font-size: 13px;">Below are the relevant verification data. For specific usage methods, please refer to the corresponding driver documentation.</span></p>
    <div style="border: 1px solid #ddd; border-radius: 4px; padding: 10px; overflow-x: auto; font-family: 'Courier New', monospace; font-size: 13px;">
        <pre style="margin: 0; white-space: pre-wrap;"><code>${JSON.stringify(i, null, 2)}</code></pre>
    </div>
</div>`
    return new Error(n)
  }
  async rawRequest(e, r = {}) {
    let i = {
        "user-agent": this.options.userAgent,
        accept: "application/json;charset=UTF-8",
        "x-device-id": this.options.deviceId,
        "x-client-id": this.options.clientId,
        "x-client-version": this.options.clientVersion,
        ...(r.headers || {}),
      },
      s
    r.body !== void 0 &&
      (typeof r.body == "string"
        ? (s = r.body)
        : ((s = JSON.stringify(r.body)),
          i["content-type"] ||
            (i["content-type"] = "application/json;charset=UTF-8")))
    let n = await fetch(e, { method: r.method || "GET", headers: i, body: s }),
      a = await n.text(),
      o = {}
    try {
      o = JSON.parse(a)
    } catch {
      if (!n.ok) throw new Error(`${n.status} ${n.statusText}: ${a}`)
      return a
    }
    if (o.error === "review_panel") throw this.formatReviewData(o)
    return o
  }
  async authRequest(e, r = {}) {
    if (!this.tokenResp?.access_token) throw new Error("empty token")
    let i = {
        Authorization: `${this.tokenResp.token_type} ${this.tokenResp.access_token}`,
        "X-Captcha-Token": this.captchaToken,
        ...(r.headers || {}),
      },
      s = await this.rawRequest(e, { ...r, headers: i }),
      n = s?.error_code || 0
    if (n === 4122 || n === 4121 || n === 10 || n === 16) {
      if (this.tokenResp?.refresh_token) {
        let a = await this.refreshToken(this.tokenResp.refresh_token)
        return (
          (this.tokenResp = a),
          this.options.onPersistToken && (await this.options.onPersistToken(a)),
          this.authRequest(e, r)
        )
      }
      throw new Error(`Token expired error ${n}`)
    } else if (n === 9) {
      let a = _d(r.method || "GET", e)
      return (
        await this.refreshCaptchaTokenAtLogin(a, this.tokenResp.user_id || ""),
        this.authRequest(e, r)
      )
    } else if (n !== 0 || (s.error && s.error !== "success"))
      throw new Error(
        `ErrorCode: ${s.error_code || 0}, Error: ${s.error || ""}, ErrorDescription: ${s.error_description || ""}`,
      )
    return s
  }
  async coreLogin(e, r) {
    let i = `${Sd}/xluser.core.login/v3/login`,
      s = {
        protocolVersion: "301",
        sequenceNo: "1000012",
        platformVersion: "10",
        isCompressed: "0",
        appid: Ad,
        clientVersion: this.options.clientVersion,
        peerID: "00000000000000000000000000000000",
        appName: "ANDROID-com.xunlei.downloadprovider",
        sdkVersion: "512000",
        devicesign: bd(this.options.deviceId, this.options.packageName),
        netWorkType: "WIFI",
        providerName: "NONE",
        deviceModel: "M2004J7AC",
        deviceName: "Xiaomi_M2004j7ac",
        OSVersion: "12",
        creditkey: this.creditKey,
        hl: "zh-CN",
        userName: e,
        passWord: r,
        verifyKey: "",
        verifyCode: "",
        isMd5Pwd: "0",
      },
      n = await this.rawRequest(i, {
        method: "POST",
        body: s,
        headers: {
          "user-agent":
            "android-ok-http-client/xl-acc-sdk/version-5.0.12.512000",
        },
      })
    return ((this.coreLoginResp = n), n)
  }
  async login(e, r) {
    let s = (await this.coreLogin(e, r)).sessionID,
      n = `${us}/auth/signin/token`
    await this.refreshCaptchaTokenInLogin(_d("POST", n), e)
    let a = await this.rawRequest(n, {
      method: "POST",
      body: {
        client_id: this.options.clientId,
        client_secret: this.options.clientSecret,
        provider: Gp,
        signin_token: s,
      },
    })
    return (
      (this.tokenResp = a),
      (this.creditKey = ""),
      this.options.onPersistToken && (await this.options.onPersistToken(a)),
      a
    )
  }
  async refreshToken(e) {
    let r = `${us}/auth/token`,
      i = await this.rawRequest(r, {
        method: "POST",
        body: {
          grant_type: "refresh_token",
          refresh_token: e,
          client_id: this.options.clientId,
          client_secret: this.options.clientSecret,
        },
      })
    return (
      (this.tokenResp = i),
      this.options.onPersistToken && (await this.options.onPersistToken(i)),
      i
    )
  }
  async isLogin() {
    if (!this.tokenResp?.access_token) return !1
    try {
      return (await this.authRequest(`${us}/user/me`, { method: "GET" }), !0)
    } catch {
      return !1
    }
  }
}
function Ed(t, e, r) {
  let i = t.kind === Cn,
    s = t.web_content_link || ""
  if (r && t.medias && t.medias.length > 0) {
    for (let n of t.medias)
      if (n.link?.url) {
        s = n.link.url
        break
      }
  }
  return {
    name: t.name,
    size: parseInt(t.size || "0", 10),
    is_dir: i,
    modified: t.modified_time || t.created_time || new Date().toISOString(),
    sign: "",
    type: W(t.name, i),
    thumb: t.thumbnail_link || t.icon_link || "",
    raw_url: s,
    raw_url_headers: { "User-Agent": e },
  }
}
function Dd(t) {
  if (t?.device_id && t.device_id.trim().length === 32)
    return t.device_id.trim()
  let e = `${t?.username || ""}${t?.password || ""}`
  return e.trim()
    ? kt(e)
    : kt(Math.random().toString(36) + Date.now().toString(36))
}
var Sr = class {
    client
    addition
    identity = ""
    onPersistCallback
    constructor(e, r) {
      ;((this.addition = e), (this.onPersistCallback = r))
      let i = Dd(e)
      ;((e.device_id = i),
        (this.client = new kr({
          deviceId: i,
          clientId: "Xp6vsxz_7IYVw2BB",
          clientSecret: "Xp6vsy4tN9toTVdMSpomVdXpRmES",
          clientVersion: "8.31.0.9726",
          packageName: "com.xunlei.downloadprovider",
          userAgent:
            "ANDROID-com.xunlei.downloadprovider/8.31.0.9726 netWorkType/5G appid/40 deviceName/Xiaomi_M2004j7ac deviceModel/M2004J7AC OSVersion/12 protocolVersion/301 platformVersion/10 sdkVersion/512000 Oauth2Client/0.9 (Linux 4_14_186-perf-gddfs8vbb238b) (JAVA 0)",
          downloadUserAgent:
            "Dalvik/2.1.0 (Linux; U; Android 12; M2004J7AC Build/SP1A.210812.016)",
          algorithms: [
            "9uJNVj/wLmdwKrJaVj/omlQ",
            "Oz64Lp0GigmChHMf/6TNfxx7O9PyopcczMsnf",
            "Eb+L7Ce+Ej48u",
            "jKY0",
            "ASr0zCl6v8W4aidjPK5KHd1Lq3t+vBFf41dqv5+fnOd",
            "wQlozdg6r1qxh0eRmt3QgNXOvSZO6q/GXK",
            "gmirk+ciAvIgA/cxUUCema47jr/YToixTT+Q6O",
            "5IiCoM9B1/788ntB",
            "P07JH0h6qoM6TSUAK2aL9T5s2QBVeY9JWvalf",
            "+oK0AN",
          ],
          space: e.space || "",
          captchaToken: e.captcha_token || "",
          creditKey: e.credit_key || "",
          onPersistToken: async (s) => {
            this.onPersistCallback &&
              (await this.onPersistCallback({
                refresh_token: s.refresh_token,
                captcha_token: this.client.captchaToken,
                device_id: i,
              }))
          },
          onPersistCaptchaToken: async (s) => {
            this.onPersistCallback &&
              (await this.onPersistCallback({ captcha_token: s }))
          },
        })))
    }
    get downloadUserAgent() {
      return (
        this.addition.download_user_agent ||
        "Dalvik/2.1.0 (Linux; U; Android 12; M2004J7AC Build/SP1A.210812.016)"
      )
    }
    get useVideoUrl() {
      return !!this.addition.use_video_url
    }
    async init() {
      let e = this.addition.username || "",
        r = this.addition.password || "",
        i = kt(`${e}${r}`)
      ;(this.identity !== i || !(await this.client.isLogin())) &&
        ((this.identity = i), await this.client.login(e, r))
    }
    resolveFolderId(e) {
      if (!e || e === "/" || e === "0")
        return this.addition.root_folder_id || ""
      let r = e.split("/").filter(Boolean)
      return r[r.length - 1] || this.addition.root_folder_id || ""
    }
    async list(e, r) {
      let i = this.resolveFolderId(r),
        s = [],
        n = ""
      for (;;) {
        let a = new URL(Ge)
        ;(a.searchParams.set("space", this.addition.space || ""),
          a.searchParams.set("__type", "drive"),
          a.searchParams.set("refresh", "true"),
          a.searchParams.set("__sync", "true"),
          a.searchParams.set("parent_id", i),
          a.searchParams.set("page_token", n),
          a.searchParams.set("with_audit", "true"),
          a.searchParams.set("limit", "100"),
          a.searchParams.set(
            "filters",
            JSON.stringify({
              phase: { eq: "PHASE_TYPE_COMPLETE" },
              trashed: { eq: !1 },
            }),
          ))
        let o = await this.client.authRequest(a.toString(), { method: "GET" })
        if (o.files && o.files.length > 0)
          for (let c of o.files)
            s.push(Ed(c, this.downloadUserAgent, this.useVideoUrl))
        if (!o.next_page_token) break
        n = o.next_page_token
      }
      return V(s, this.addition.order_by, this.addition.order_direction)
    }
    async get(e, r) {
      let i = this.resolveFolderId(r),
        s = new URL(`${Ge}/${i}`)
      s.searchParams.set("space", this.addition.space || "")
      let n = await this.client.authRequest(s.toString(), { method: "GET" })
      return Ed(n, this.downloadUserAgent, this.useVideoUrl)
    }
    async mkdir(e, r) {
      let i = r.split("/").filter(Boolean),
        s = i.pop() || "new_folder",
        n = "/" + i.join("/"),
        a = this.resolveFolderId(n)
      await this.client.authRequest(Ge, {
        method: "POST",
        body: {
          kind: Cn,
          name: s,
          parent_id: a,
          space: this.addition.space || "",
        },
      })
    }
    async rename(e, r, i) {
      let s = this.resolveFolderId(r)
      await this.client.authRequest(`${Ge}/${s}`, {
        method: "PATCH",
        body: { name: i, space: this.addition.space || "" },
      })
    }
    async remove(e, r, i) {
      let s = this.resolveFolderId(r),
        n = new URL(`${Ge}/${s}/trash`)
      ;(n.searchParams.set("space", this.addition.space || ""),
        await this.client.authRequest(n.toString(), {
          method: "PATCH",
          body: {},
        }))
    }
    async move(e, r, i, s, n) {
      let a = this.resolveFolderId(s),
        o = this.resolveFolderId(r)
      await this.client.authRequest(`${Ge}:batchMove`, {
        method: "POST",
        body: {
          to: { parent_id: o },
          ids: [a],
          space: this.addition.space || "",
        },
      })
    }
    async copy(e, r, i, s, n) {
      let a = this.resolveFolderId(s),
        o = this.resolveFolderId(r)
      await this.client.authRequest(`${Ge}:batchCopy`, {
        method: "POST",
        body: {
          to: { parent_id: o },
          ids: [a],
          space: this.addition.space || "",
        },
      })
    }
    async put(e, r, i) {
      let s = r.split("/").filter(Boolean),
        n = s.pop() || "file",
        a = "/" + s.join("/"),
        o = this.resolveFolderId(a),
        c = Cd(i),
        d = await this.client.authRequest(Ge, {
          method: "POST",
          body: {
            kind: Pd,
            parent_id: o,
            name: n,
            size: i.length.toString(),
            hash: c,
            upload_type: En,
            space: this.addition.space || "",
          },
        })
      if (d.upload_type === En && d.resumable?.params) {
        let l = d.resumable.params,
          u = l.endpoint
        ;(u.startsWith(l.bucket + ".") && (u = u.slice(l.bucket.length + 1)),
          !u.startsWith("http://") &&
            !u.startsWith("https://") &&
            (u = `https://${u}`))
        let p = `${u.replace(/\/$/, "")}/${l.bucket}/${l.key}`,
          f = { "x-amz-security-token": l.security_token },
          h = await fetch(p, { method: "PUT", headers: f, body: i })
        if (!h.ok)
          throw new Error(`S3 Upload failed: ${h.status} ${h.statusText}`)
      }
    }
  },
  ps = class extends Sr {
    constructor(e, r) {
      super(e, r)
      let i = Dd(e)
      e.device_id = i
      let s =
        e.sign_type === "captcha_sign"
          ? void 0
          : (e.algorithms || "")
              .split(",")
              .map((n) => n.trim())
              .filter(Boolean)
      this.client = new kr({
        deviceId: i,
        clientId: e.client_id || "Xp6vsxz_7IYVw2BB",
        clientSecret: e.client_secret || "Xp6vsy4tN9toTVdMSpomVdXpRmES",
        clientVersion: e.client_version || "8.31.0.9726",
        packageName: e.package_name || "com.xunlei.downloadprovider",
        userAgent:
          e.user_agent ||
          "ANDROID-com.xunlei.downloadprovider/8.31.0.9726 netWorkType/5G appid/40 deviceName/Xiaomi_M2004j7ac deviceModel/M2004J7AC OSVersion/12 protocolVersion/301 platformVersion/10 sdkVersion/512000 Oauth2Client/0.9 (Linux 4_14_186-perf-gddfs8vbb238b) (JAVA 0)",
        downloadUserAgent:
          e.download_user_agent ||
          "Dalvik/2.1.0 (Linux; U; Android 12; M2004J7AC Build/SP1A.210812.016)",
        algorithms: s && s.length > 0 ? s : void 0,
        timestamp: e.timestamp,
        captchaSign: e.captcha_sign,
        useVideoUrl: e.use_video_url,
        space: e.space || "",
        captchaToken: e.captcha_token || "",
        creditKey: e.credit_key || "",
        onPersistToken: async (n) => {
          this.onPersistCallback &&
            (await this.onPersistCallback({
              refresh_token: n.refresh_token,
              captcha_token: this.client.captchaToken,
              device_id: i,
            }))
        },
        onPersistCaptchaToken: async (n) => {
          this.onPersistCallback &&
            (await this.onPersistCallback({ captcha_token: n }))
        },
      })
    }
    async init() {
      let e = this.addition,
        r = ""
      ;(e.login_type === "refresh_token"
        ? (r = kt(e.refresh_token || ""))
        : (r = kt(`${e.username || ""}${e.password || ""}`)),
        (this.identity !== r || !(await this.client.isLogin())) &&
          ((this.identity = r),
          e.login_type === "refresh_token" && e.refresh_token
            ? await this.client.refreshToken(e.refresh_token)
            : e.username &&
              e.password &&
              (await this.client.login(e.username, e.password))))
    }
  }
xe()
var Qp = /([0-9.]*)\s*([\u4e00-\u9fa5]+)/,
  Xp = /([0-9.]+)\s*([bkm]+)/i,
  Zp = /arg1='([0-9A-Z]+)'/i
function Td(t) {
  if (!t) return new Date().toISOString()
  let e = t.trim(),
    r = new Date(e)
  if (!isNaN(r.getTime())) return r.toISOString()
  let i = Date.now(),
    s = 864e5,
    n = e.match(Qp)
  if (n) {
    let a = parseFloat(n[1]) || 0,
      o = n[2]
    if (o.includes("\u79D2\u524D")) return new Date(i - a * 1e3).toISOString()
    if (o.includes("\u5206") || o.includes("\u5206\u949F\u524D"))
      return new Date(i - a * 6e4).toISOString()
    if (o.includes("\u5C0F\u65F6\u524D") || o.includes("\u5C0F\u65F6"))
      return new Date(i - a * 36e5).toISOString()
    if (o.includes("\u5929\u524D") || o.includes("\u5929"))
      return new Date(i - a * s).toISOString()
    if (o.includes("\u6628\u5929")) return new Date(i - s).toISOString()
    if (o.includes("\u524D\u5929")) return new Date(i - s * 2).toISOString()
  }
  return new Date().toISOString()
}
function Fd(t) {
  if (!t) return 0
  let e = t.trim().match(Xp)
  if (!e) return 0
  let r = parseFloat(e[1])
  switch (e[2].toUpperCase()) {
    case "B":
      return Math.floor(r)
    case "K":
      return Math.floor(r * 1024)
    case "M":
      return Math.floor(r * 1048576)
    case "G":
      return Math.floor(r * 1073741824)
    default:
      return 0
  }
}
function Pr(t) {
  return t.replace(/<!--[\s\S]*?-->|[^:]\/\/.*|\/\*[\s\S]*?\*\//g, (e) =>
    e.slice(1, 3) === "//"
      ? e.slice(0, 1)
      : `
`,
  )
}
function Id(t) {
  let e = "",
    r = !1,
    i = !1
  for (let s = 0; s < t.length; s++) {
    let n = t[s]
    if (
      i &&
      (n ===
        `
` ||
        n === "\r")
    ) {
      ;((i = !1), (e += n))
      continue
    }
    if (r && n === "*" && s + 1 < t.length && t[s + 1] === "/") {
      ;((r = !1), s++)
      continue
    }
    if (!(r || i)) {
      if (n === "/" && s + 1 < t.length) {
        let a = t[s + 1]
        if (a === "*") {
          ;((r = !0), s++)
          continue
        } else if (a === "/") {
          ;((i = !0), s++)
          continue
        }
      }
      e += n
    }
  }
  return e
}
function Yp(t) {
  let e = [
      6, 28, 34, 31, 33, 18, 30, 23, 9, 8, 19, 38, 17, 24, 0, 5, 32, 21, 10, 22,
      25, 14, 15, 3, 16, 27, 13, 35, 2, 29, 11, 26, 4, 36, 1, 39, 37, 7, 20, 12,
    ],
    r = new Array(t.length).fill("")
  for (let i = 0; i < e.length; i++) {
    let s = e[i]
    s < r.length && i < t.length && (r[s] = t[i])
  }
  return r.join("")
}
function ef(t, e) {
  let r = Math.min(t.length, e.length),
    i = Math.floor(r / 2),
    s = ""
  for (let n = 0; n < i; n++) {
    let a = parseInt(t.slice(n * 2, n * 2 + 2), 16),
      o = parseInt(e.slice(n * 2, n * 2 + 2), 16),
      c = a ^ o
    s += c.toString(16).padStart(2, "0")
  }
  return s
}
function fs(t) {
  let e = t.match(Zp)
  if (!e || e.length < 2)
    throw new Error(
      "[Lanzou] \u65E0\u6CD5\u5339\u914D\u5230 acw_sc__v2 \u7684 arg1 \u53C2\u6570",
    )
  let r = e[1]
  return ef(Yp(r), "3000176000856006061501533003690027800375")
}
function tf(t, e) {
  if (!t || !e) return ""
  if (t !== "sasign") {
    let r = e.match(
      new RegExp(
        `(?:var|let|const)\\s+${t}\\s*=\\s*['"]?([\\s\\S]*?)['"]?;`,
        "i",
      ),
    )
    if (r) return r[1].trim().replace(/^['"]|['"]$/g, "")
    let i = e.match(
      new RegExp(`(?:^|[;,\\s])${t}\\s*=\\s*['"]?([\\s\\S]*?)['"]?;`, "im"),
    )
    if (i) return i[1].trim().replace(/^['"]|['"]$/g, "")
    let s = e.match(
      new RegExp(`['"]?${t}['"]?\\s*:\\s*['"]?([\\s\\S]*?)['"]?`, "i"),
    )
    return s ? s[1].trim().replace(/^['"]|['"]$/g, "") : ""
  } else {
    let r = Array.from(
      e.matchAll(
        new RegExp(
          `(?:var|let|const)?\\s*${t}\\s*=\\s*['"]?([\\s\\S]*?)['"]?;`,
          "gi",
        ),
      ),
    )
    if (r.length === 3) return r[1][1].trim().replace(/^['"]|['"]$/g, "")
    if (r.length > 0) return r[0][1].trim().replace(/^['"]|['"]$/g, "")
  }
  return ""
}
function rf(t, e) {
  let r = {},
    i = /['"]?([a-zA-Z0-9_$]+)['"]?\s*:\s*(['"]?([^'",}\s]+)['"]?)/g,
    s = t.matchAll(i)
  for (let n of s) {
    let a = n[1],
      o = n[2],
      c = n[3]
    if (!c) r[a] = ""
    else if (o.includes("'") || o.includes('"') || /^\d+$/.test(o)) r[a] = c
    else {
      let d = tf(c, e)
      r[a] = d !== "" ? d : c
    }
  }
  return r
}
function sf(t) {
  let e = {},
    r = t.split("&")
  for (let i of r) {
    let [s, n] = i.split("=")
    s && (e[decodeURIComponent(s)] = decodeURIComponent(n || ""))
  }
  return e
}
function Kt(t, e) {
  let r = e || t,
    i = Array.from(t.matchAll(/data\s*:\s*({[\s\S]*?})/g))
  if (i.length > 0) {
    let n = i[0][1]
    for (let o of i) o[1].length > n.length && (n = o[1])
    let a = rf(n, r)
    if (Object.keys(a).length > 0) return a
  }
  let s = t.match(/data\s*:\s*['"]([^'"]+)['"]/)
  if (s && s[1].includes("=")) return sf(s[1])
  throw new Error(
    "[Lanzou] \u672A\u80FD\u627E\u5230\u8BF7\u6C42\u53C2\u6570 data \u5BF9\u8C61",
  )
}
function Rd(t, e) {
  let r = new RegExp(`function\\s+${e}\\s*\\([^)]*\\)\\s*\\{`, "i"),
    i = t.search(r)
  if (i === -1) throw new Error(`[Lanzou] \u672A\u627E\u5230\u51FD\u6570 ${e}`)
  let s = 0,
    n = -1
  for (let a = i; a < t.length; a++)
    if (t[a] === "{") (s === 0 && (n = a), s++)
    else if (t[a] === "}" && (s--, s === 0)) return t.slice(i, a + 1)
  return t.slice(i)
}
var hs = class {
  addition
  cookie = ""
  uid = ""
  vei = ""
  onCookieUpdate
  constructor(e, r) {
    ;((this.addition = e),
      (this.cookie = (e.cookie || "").trim()),
      (this.onCookieUpdate = r))
  }
  getBaseUrl() {
    return (
      this.addition.baseUrl ||
      this.addition.base_url ||
      "https://pc.woozooo.com"
    ).replace(/\/$/, "")
  }
  getShareUrl() {
    return (
      this.addition.shareUrl ||
      this.addition.share_url ||
      "https://pan.lanzoui.com"
    ).replace(/\/$/, "")
  }
  getUserAgent() {
    return (
      this.addition.user_agent ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
  }
  getCookie() {
    return this.cookie
  }
  updateCookie(e) {
    if (!e) return
    let r = this.cookie ? this.cookie.split(";").map((n) => n.trim()) : [],
      i = e.split(/,(?=[a-zA-Z0-9_\-]+=[^;]+)/)
    for (let n of i) {
      let a = n.split(";")[0].trim(),
        o = a.indexOf("=")
      if (o > 0) {
        let c = a.slice(0, o).trim(),
          d = a.slice(o + 1).trim(),
          l = r.findIndex((u) => u.startsWith(`${c}=`))
        l !== -1 ? (r[l] = `${c}=${d}`) : r.push(`${c}=${d}`)
      }
    }
    let s = r.filter(Boolean).join("; ")
    s !== this.cookie && ((this.cookie = s), this.onCookieUpdate?.(this.cookie))
  }
  async init() {
    let e = this.addition.type || "cookie"
    e === "account"
      ? (await this.login(), await this.initVeiAndUid())
      : e === "cookie" && this.cookie && (await this.initVeiAndUid())
  }
  async login() {
    if (!this.addition.account || !this.addition.password)
      throw new Error(
        "[Lanzou] \u8D26\u53F7\u6A21\u5F0F\u4E0B\u5FC5\u987B\u63D0\u4F9B\u8D26\u53F7\u4E0E\u5BC6\u7801",
      )
    let e = ""
    for (let r = 0; r < 3; r++) {
      let i = {
        "User-Agent": this.getUserAgent(),
        Referer: "https://pc.woozooo.com",
        "Content-Type": "application/x-www-form-urlencoded",
      }
      e && (i.Cookie = `acw_sc__v2=${e}`)
      let s = await fetch("https://up.woozooo.com/mlogin.php", {
        method: "POST",
        headers: i,
        body: new URLSearchParams({
          task: "3",
          uid: this.addition.account,
          pwd: this.addition.password,
          setSessionId: "",
          setSig: "",
          setScene: "",
          setTocen: "",
          formhash: "",
        }),
      })
      this.updateCookie(s.headers.get("set-cookie"))
      let n = await s.text()
      if (n.includes("acw_sc__v2")) {
        e = fs(n)
        continue
      }
      let a
      try {
        a = JSON.parse(n)
      } catch {
        throw new Error(
          `[Lanzou] \u767B\u5F55\u54CD\u5E94\u5F02\u5E38: ${n.slice(0, 200)}`,
        )
      }
      if (a.zt !== 1)
        throw new Error(`[Lanzou] \u767B\u5F55\u5931\u8D25: ${a.info || n}`)
      return
    }
    throw new Error(
      "[Lanzou] \u767B\u5F55\u591A\u6B21\u89E6\u53D1 WAF \u6821\u9A8C\u5931\u8D25",
    )
  }
  async initVeiAndUid() {
    let e = await this.request(
        `${this.getBaseUrl()}/mydisk.php?item=files&action=index`,
        "GET",
      ),
      r = e.match(/uid=([^'"&;]+)/)
    if (!r)
      throw new Error(
        "[Lanzou] \u672A\u80FD\u83B7\u53D6\u5230 uid\uFF0C\u8BF7\u68C0\u67E5 Cookie \u662F\u5426\u6709\u6548",
      )
    this.uid = r[1]
    let i = Pr(e)
    try {
      let s = Kt(i)
      this.vei = s.vei || ""
    } catch {
      let s = e.match(/['"]?vei['"]?\s*:\s*['"]?([^'",\s]+)['"]?/)
      s && (this.vei = s[1])
    }
  }
  async request(e, r = "GET", i, s) {
    let n = "",
      a =
        e.startsWith(this.getShareUrl()) ||
        e.includes("ajaxm.php") ||
        e.includes("filemoreajax.php")
          ? this.getShareUrl()
          : this.getBaseUrl()
    for (let o = 0; o < 3; o++) {
      let c = {
          Referer: s || a,
          "User-Agent": this.getUserAgent(),
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        },
        d = this.cookie
      ;(e.includes("/file/") && (d = (d ? d + "; " : "") + "down_ip=1"),
        n && (d = (d ? d + "; " : "") + `acw_sc__v2=${n}`),
        d && (c.Cookie = d))
      let l
      i &&
        r === "POST" &&
        ((c["Content-Type"] =
          "application/x-www-form-urlencoded; charset=UTF-8"),
        (l = new URLSearchParams(i).toString()))
      let u = await fetch(e, { method: r, headers: c, body: l })
      this.updateCookie(u.headers.get("set-cookie"))
      let p = await u.text()
      if (p.includes("acw_sc__v2")) {
        n = fs(p)
        continue
      }
      return p
    }
    throw new Error(
      "[Lanzou] \u8BF7\u6C42\u89E6\u53D1 acw_sc__v2 \u6821\u9A8C\u8D85\u9650",
    )
  }
  async doupload(e) {
    let r = `${this.getBaseUrl()}/doupload.php?uid=${this.uid}&vei=${this.vei}`,
      i = await this.request(r, "POST", e),
      s
    try {
      s = JSON.parse(i)
    } catch {
      throw new Error(`[Lanzou] \u975E JSON \u54CD\u5E94: ${i.slice(0, 200)}`)
    }
    if (s.zt === 9) {
      if (this.addition.type === "account")
        return (
          await this.login(),
          await this.initVeiAndUid(),
          this.doupload(e)
        )
      throw new Error(
        "[Lanzou] Cookie \u5DF2\u8FC7\u671F\uFF0C\u8BF7\u66F4\u65B0 Cookie",
      )
    }
    if (s.zt !== 1 && s.zt !== 2 && s.zt !== 4)
      throw new Error(
        s.inf || s.info || `[Lanzou] API \u9519\u8BEF (zt: ${s.zt})`,
      )
    return s
  }
  async getAllFiles(e) {
    let r = await this.getFolders(e),
      i = await this.getFiles(e)
    return [...r, ...i]
  }
  async getFolders(e) {
    return (
      (await this.doupload({ task: "47", folder_id: e || "-1" })).text || []
    ).map((s) => ({
      ...s,
      name: s.name,
      fol_id: s.fol_id || s.id,
      is_folder: !0,
    }))
  }
  async getFiles(e) {
    let r = []
    for (let i = 1; ; i++) {
      let n =
        (
          await this.doupload({
            task: "5",
            folder_id: e || "-1",
            pg: String(i),
          })
        ).text || []
      if (n.length === 0) break
      r.push(
        ...n.map((a) => ({
          ...a,
          name_all: a.name_all || a.name,
          id: a.id,
          size: a.size,
          time: a.time,
          is_folder: !1,
        })),
      )
    }
    return r
  }
  async getFileShareUrlById(e) {
    return (await this.doupload({ task: "22", file_id: e })).info || {}
  }
  async getFileOrFolderByShareUrl(e, r = "") {
    let i = e.replace(/^\//, ""),
      s = await this.request(`${this.getShareUrl()}/${i}`, "GET")
    if (s.includes("\u53D6\u6D88\u5206\u4EAB"))
      throw new Error(
        "[Lanzou] \u8BE5\u6587\u4EF6\u5DF2\u53D6\u6D88\u5206\u4EAB",
      )
    if (s.includes("\u6587\u4EF6\u4E0D\u5B58\u5728"))
      throw new Error("[Lanzou] \u6587\u4EF6\u4E0D\u5B58\u5728")
    return /class="fileinfo"|id="file"|文件描述/i.test(s)
      ? [await this.getFilesByShareUrl(i, r, s)]
      : this.getFolderByShareUrl(r, s)
  }
  async getFolderByShareUrl(e, r) {
    let i = Pr(r),
      s = {}
    try {
      s = Kt(i)
    } catch {
      s = {}
    }
    let n = [],
      a = Array.from(
        r.matchAll(
          /(?:folderlink|mbxfolder)[^>]*href=["']\/?([^"']+)["'][^>]*>(.+?)<\//gi,
        ),
      )
    for (let o of a) n.push({ id: o[1], name_all: o[2].trim(), is_folder: !0 })
    s.pwd = e || this.addition.share_password || ""
    for (let o = 1; ; o++) {
      s.pg = String(o)
      let c = await this.request(
          `${this.getShareUrl()}/filemoreajax.php`,
          "POST",
          s,
        ),
        d
      try {
        d = JSON.parse(c)
      } catch {
        break
      }
      if (d.zt !== 1 || !Array.isArray(d.text) || d.text.length === 0) break
      let l = d.text
      n.push(
        ...l.map((u) => ({
          id: u.id,
          name_all: u.name_all || u.name,
          size: u.size,
          time: u.time,
          is_folder: !1,
          pwd: s.pwd,
        })),
      )
    }
    return n
  }
  async getFilesByShareUrl(e, r = "", i, s) {
    let n = e.replace(/^\//, ""),
      a = (s || this.getShareUrl()).replace(/\/+$/, ""),
      o = `${a}/${n}`,
      c = i
    ;(c || (c = await this.request(o, "GET")), (c = Pr(c)), (c = Id(c)))
    let d = {},
      l = "",
      u = "",
      p = { id: n, is_folder: !1 }
    if (c.includes("pwdload") || c.includes("passwddiv")) {
      let m = Rd(c, "down_p")
      ;((d = Kt(m, c)), (d.p = r || this.addition.share_password || ""))
      let w =
          m.match(/['"]?\/?ajaxm\.php\?file=(\d+)['"]?/) ||
          c.match(/['"]?\/?ajaxm\.php\?file=(\d+)['"]?/) ||
          m.match(/file\s*[:=]\s*['"]?(\d+)['"]?/) ||
          c.match(/file\s*[:=]\s*['"]?(\d+)['"]?/) ||
          m.match(/var\s+file_id\s*=\s*['"]?(\d+)['"]?/) ||
          c.match(/var\s+file_id\s*=\s*['"]?(\d+)['"]?/),
        v = w ? w[1] : ""
      if (!v) throw new Error("[Lanzou] \u672A\u627E\u5230\u6587\u4EF6 ID")
      let _ = await this.request(`${a}/ajaxm.php?file=${v}`, "POST", d, o),
        b
      try {
        b = JSON.parse(_)
      } catch {
        throw new Error(
          `[Lanzou] ajaxm.php \u54CD\u5E94\u683C\u5F0F\u9519\u8BEF: ${_}`,
        )
      }
      if (b.zt !== 1)
        throw new Error(
          b.info ||
            b.text ||
            `[Lanzou] \u5BC6\u7801\u9519\u8BEF\u6216\u63D0\u53D6\u94FE\u63A5\u5931\u8D25 (zt=${b.zt})`,
        )
      ;((p.name_all = b.inf || "download"),
        (l = `${b.dom}/file`),
        (u = `${l}/${b.url}`))
    } else {
      let m =
        c.match(/<iframe[^>]*?src=["']([^"']+)["']/i) ||
        c.match(/href=["'](\/fn\?[^"']+)["']/i) ||
        c.match(/["'](\/fn\?[^"']+)["']/i)
      if (!m)
        throw new Error(
          "[Lanzou] \u672A\u627E\u5230\u4E0B\u8F7D\u9875\u9762 iframe \u53C2\u6570",
        )
      let w = m[1],
        v = `${a}${w.startsWith("/") ? "" : "/"}${w}`,
        _ = await this.request(v, "GET", void 0, o),
        b = Pr(_)
      d = Kt(b, b)
      let P =
          b.match(/['"]?\/?ajaxm\.php\?file=(\d+)['"]?/) ||
          b.match(/file\s*[:=]\s*['"]?(\d+)['"]?/) ||
          b.match(/file=(\d+)/) ||
          b.match(/var\s+file_id\s*=\s*['"]?(\d+)['"]?/),
        E = P ? P[1] : ""
      if (!E) throw new Error("[Lanzou] \u672A\u627E\u5230\u6587\u4EF6 ID")
      let S = await this.request(`${a}/ajaxm.php?file=${E}`, "POST", d, v),
        D
      try {
        D = JSON.parse(S)
      } catch {
        throw new Error(
          `[Lanzou] ajaxm.php \u54CD\u5E94\u683C\u5F0F\u9519\u8BEF: ${S}`,
        )
      }
      if (D.zt !== 1)
        throw new Error(
          D.info ||
            D.text ||
            `[Lanzou] \u63D0\u53D6\u94FE\u63A5\u5931\u8D25 (zt=${D.zt})`,
        )
      ;((l = `${D.dom}/file`), (u = `${l}/${D.url}`))
      let k = c.match(
        /<title>(.+?) - 蓝奏云<\/title>|id="filenajax">(.+?)<\/div>|var filename = ['"](.+?)['"];|<div style="font-size[^>]*>([^<>]+)<\/div>|<div class="filethetext"[^>]*>([^<>]+)<\/div>/i,
      )
      if (k) {
        for (let C = 1; C < k.length; C++)
          if (k[C]) {
            p.name_all = k[C].trim()
            break
          }
      }
    }
    let h = c.match(/大小\W*([0-9.]+\s*[bkm]+)/i)
    h && (p.size = h[1])
    let y = c.match(/\d+\s*[秒天分小][钟时]?前|[昨前]天|\d{4}-\d{2}-\d{2}/)
    y && (p.time = y[0])
    let x = u,
      g = ""
    for (let m = 0; m < 3; m++) {
      let w = {
          Referer: l,
          "User-Agent": this.getUserAgent(),
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        },
        v = "down_ip=1"
      ;(g && (v += `; acw_sc__v2=${g}`), (w.Cookie = v))
      let _ = await fetch(u, { method: "GET", headers: w, redirect: "manual" })
      if (
        _.status === 301 ||
        _.status === 302 ||
        _.status === 303 ||
        _.status === 307 ||
        _.status === 308
      ) {
        let P = _.headers.get("location")
        if (P) {
          x = new URL(P, u).toString()
          break
        }
      }
      if (_.status === 200 && _.url && _.url !== u) {
        x = _.url
        break
      }
      let b = await _.text()
      if (b.includes("acw_sc__v2")) {
        g = fs(b)
        continue
      }
      try {
        let P = Kt(b, b)
        ;((P.el = "2"), await new Promise((D) => setTimeout(D, 1500)))
        let E = await this.request(`${l}/ajax.php`, "POST", P, l),
          S = JSON.parse(E)
        if (S.url) {
          x = S.url.startsWith("http") ? S.url : new URL(S.url, l).toString()
          break
        }
      } catch {}
      break
    }
    return ((p.url = x), p)
  }
  async getFileRealInfo(e) {
    try {
      let r = await fetch(e, {
          method: "HEAD",
          headers: { "User-Agent": this.getUserAgent() },
        }),
        i = r.headers.get("content-length"),
        s = r.headers.get("last-modified")
      return {
        size: i ? parseInt(i, 10) : void 0,
        time: s ? new Date(s).toISOString() : void 0,
      }
    } catch {
      return {}
    }
  }
  async mkdir(e, r) {
    await this.doupload({
      task: "2",
      parent_id: e || "-1",
      folder_name: r,
      folder_description: "",
    })
  }
  async rename(e, r) {
    await this.doupload({ task: "46", file_id: e, file_name: r, type: "2" })
  }
  async move(e, r) {
    await this.doupload({ task: "20", file_id: e, folder_id: r })
  }
  async remove(e, r) {
    r
      ? await this.doupload({ task: "3", folder_id: e })
      : await this.doupload({ task: "6", file_id: e })
  }
}
function nf(t) {
  let e = { ...(t || {}) }
  return (
    (e.type = e.type || "cookie"),
    (e.account = e.account || ""),
    (e.password = e.password || ""),
    (e.cookie = (e.cookie || "").trim()),
    (e.root_folder_id = e.root_folder_id || (e.type === "url" ? "" : "-1")),
    (e.share_password = e.share_password || ""),
    (e.baseUrl = e.baseUrl || "https://pc.woozooo.com"),
    (e.shareUrl = e.shareUrl || "https://pan.lanzoui.com"),
    (e.user_agent =
      e.user_agent ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"),
    (e.repair_file_info = !!e.repair_file_info),
    (e.order_by = e.order_by || "name"),
    (e.order_direction = e.order_direction || "asc"),
    e
  )
}
function Dn(t, e) {
  let r = !!t.is_folder || !!t.fol_id,
    i = t.name_all || t.name || "",
    s = e?.size !== void 0 ? e.size : Fd(t.size || "0"),
    n = e?.time ? e.time : Td(t.time || ""),
    a = t.fol_id || t.id || ""
  return {
    name: i,
    size: s,
    is_dir: r,
    modified: n,
    sign: a,
    type: W(i, r),
    thumb: "",
    raw_url: t.url || "",
  }
}
var gs = class {
  client
  addition
  pathIdCache = new Map()
  constructor(e, r) {
    ;((this.addition = nf(e)), (this.client = new hs(this.addition, r)))
  }
  async init() {
    await this.client.init()
  }
  isUrlMode() {
    return this.addition.type === "url"
  }
  getRootId() {
    return this.addition.root_folder_id || (this.isUrlMode() ? "" : "-1")
  }
  async resolveFolderId(e) {
    let r = this.getRootId(),
      i =
        "/" +
        String(e || "")
          .split("/")
          .filter(Boolean)
          .join("/")
    if (i === "/" || i === `/${r}`) return r
    let s = i.split("/").filter(Boolean),
      n = 0,
      a = r,
      o = ""
    for (let c = 0; c < s.length; c++) {
      let d = "/" + s.slice(0, c + 1).join("/"),
        l = this.pathIdCache.get(d)
      if (l !== void 0) ((a = l), (n = c + 1), (o = d))
      else break
    }
    for (let c = n; c < s.length; c++) {
      let d = s[c],
        l = (() => {
          try {
            return decodeURIComponent(d)
          } catch {
            return d
          }
        })(),
        p = (
          this.isUrlMode()
            ? await this.client.getFileOrFolderByShareUrl(
                a,
                this.addition.share_password,
              )
            : await this.client.getFolders(a)
        ).find((f) => {
          if (!f.is_folder && !f.fol_id) return !1
          let h = f.name || f.name_all || "",
            y = f.fol_id || f.id || ""
          return h === d || h === l || y === d || y === l
        })
      if (!p) throw new Error(`[Lanzou] \u76EE\u5F55\u672A\u627E\u5230: ${d}`)
      ;((a = p.fol_id || p.id || ""),
        (o = "/" + s.slice(0, c + 1).join("/")),
        this.pathIdCache.set(o, a))
    }
    return a
  }
  async resolveItem(e) {
    let r =
        "/" +
        String(e || "")
          .split("/")
          .filter(Boolean)
          .join("/"),
      i = r.split("/").filter(Boolean)
    if (i.length === 0) throw new Error("[Lanzou] \u8DEF\u5F84\u65E0\u6548")
    let s = i[i.length - 1],
      n = (() => {
        try {
          return decodeURIComponent(s)
        } catch {
          return s
        }
      })(),
      a = "/" + i.slice(0, i.length - 1).join("/"),
      o = await this.resolveFolderId(a),
      d = (
        this.isUrlMode()
          ? await this.client.getFileOrFolderByShareUrl(
              o,
              this.addition.share_password,
            )
          : await this.client.getAllFiles(o)
      ).find((u) => {
        let p = u.name_all || u.name || "",
          f = u.fol_id || u.id || ""
        return p === s || p === n || f === s || f === n
      })
    if (!d)
      throw new Error(
        `[Lanzou] \u6587\u4EF6\u6216\u76EE\u5F55\u672A\u627E\u5230: ${s}`,
      )
    let l = !!(d.is_folder || d.fol_id)
    return (
      l && this.pathIdCache.set(r, d.fol_id || d.id || ""),
      { item: d, parentId: o, isDir: l }
    )
  }
  async list(e, r) {
    let i = await this.resolveFolderId(r),
      n = (
        this.isUrlMode()
          ? await this.client.getFileOrFolderByShareUrl(
              i,
              this.addition.share_password,
            )
          : await this.client.getAllFiles(i)
      ).map((a) => Dn(a))
    return V(
      n,
      this.addition.order_by === "name"
        ? "file_name"
        : this.addition.order_by === "size"
          ? "size"
          : "updated_at",
      this.addition.order_direction,
    )
  }
  async get(e, r) {
    let i = String(r || "")
      .split("/")
      .filter(Boolean)
    if (i.length === 0 || i[i.length - 1] === this.getRootId()) {
      let d = this.getRootId()
      return {
        name: d || "root",
        size: 0,
        is_dir: !0,
        modified: new Date().toISOString(),
        sign: d,
        type: 1,
        raw_url: "",
      }
    }
    let { item: s, isDir: n } = await this.resolveItem(r)
    if (n) return Dn(s)
    let a = s.url
    if (!a)
      try {
        if (this.isUrlMode()) {
          let d = await this.client.getFilesByShareUrl(
            s.id || "",
            s.pwd || this.addition.share_password || "",
          )
          ;((a = d.url),
            (s.name_all = d.name_all || s.name_all),
            (s.size = d.size || s.size))
        } else {
          let d = await this.client.getFileShareUrlById(s.id || ""),
            l = d?.f_id || d?.id,
            u = d?.is_newd
          if (l) {
            let p = await this.client.getFilesByShareUrl(
              l,
              d.pwd || "",
              void 0,
              u,
            )
            ;((a = p.url),
              p.name_all && (s.name_all = p.name_all),
              p.size && (s.size = p.size))
          }
        }
      } catch (d) {
        throw (
          console.error(
            `[Lanzou] \u89E3\u6790\u4E0B\u8F7D\u94FE\u63A5\u5931\u8D25 (${s.name_all || s.name}):`,
            d.message,
          ),
          new Error(
            `[Lanzou] \u83B7\u53D6\u4E0B\u8F7D\u76F4\u94FE\u5931\u8D25 (${s.name_all || s.name}): ${d.message}`,
          )
        )
      }
    if (!a)
      throw new Error(
        `[Lanzou] \u672A\u80FD\u83B7\u53D6\u5230\u4E0B\u8F7D\u76F4\u94FE (${s.name_all || s.name || r})`,
      )
    let o
    if (this.addition.repair_file_info && a)
      try {
        o = await this.client.getFileRealInfo(a)
      } catch {}
    let c = Dn(s, o)
    return (
      (c.raw_url = a || ""),
      (c.raw_url_headers = { "User-Agent": this.client.getUserAgent() }),
      c
    )
  }
  async mkdir(e, r) {
    if (this.isUrlMode())
      throw new Error(
        "[Lanzou] \u5206\u4EAB\u94FE\u63A5\u6A21\u5F0F\u4E0D\u652F\u6301\u65B0\u5EFA\u6587\u4EF6\u5939",
      )
    let i = String(r || "")
        .split("/")
        .filter(Boolean),
      s = i.pop() || "\u65B0\u6587\u4EF6\u5939",
      n = "/" + i.join("/"),
      a = await this.resolveFolderId(n)
    await this.client.mkdir(a, s)
  }
  async rename(e, r, i) {
    if (this.isUrlMode())
      throw new Error(
        "[Lanzou] \u5206\u4EAB\u94FE\u63A5\u6A21\u5F0F\u4E0D\u652F\u6301\u91CD\u547D\u540D",
      )
    let { item: s, isDir: n } = await this.resolveItem(r)
    if (n)
      throw new Error(
        "[Lanzou] \u84DD\u594F\u4E91\u4E0D\u652F\u6301\u91CD\u547D\u540D\u6587\u4EF6\u5939",
      )
    await this.client.rename(s.id || "", i)
  }
  async remove(e, r, i) {
    if (this.isUrlMode())
      throw new Error(
        "[Lanzou] \u5206\u4EAB\u94FE\u63A5\u6A21\u5F0F\u4E0D\u652F\u6301\u5220\u9664",
      )
    let { item: s, isDir: n } = await this.resolveItem(r)
    await this.client.remove(s.fol_id || s.id || "", n)
  }
  async move(e, r, i, s, n) {
    if (this.isUrlMode())
      throw new Error(
        "[Lanzou] \u5206\u4EAB\u94FE\u63A5\u6A21\u5F0F\u4E0D\u652F\u6301\u79FB\u52A8",
      )
    let { item: a, isDir: o } = await this.resolveItem(s)
    if (o)
      throw new Error(
        "[Lanzou] \u84DD\u594F\u4E91\u4E0D\u652F\u6301\u79FB\u52A8\u6587\u4EF6\u5939",
      )
    let c = String(r).split("/").filter(Boolean),
      d = await this.resolveFolderId("/" + c.join("/"))
    await this.client.move(a.id || "", d)
  }
  async copy() {
    throw new Error(
      "[Lanzou] \u84DD\u594F\u4E91\u4E0D\u652F\u6301\u76F4\u63A5\u590D\u5236\u6587\u4EF6",
    )
  }
  async put() {
    throw new Error(
      "[Lanzou] Cloudflare Worker \u73AF\u5883\u6682\u4E0D\u652F\u6301\u76F4\u63A5\u6D41\u5F0F\u5199\u5165\uFF0C\u8BF7\u4F7F\u7528\u7F51\u9875\u7AEF\u8FDB\u884C\u6587\u4EF6\u4E0A\u4F20",
    )
  }
}
xe()
var ge = mt(_t(), 1)
function af(t) {
  let e = t.replace(/\s+/g, ""),
    r = atob(e),
    i = new Uint8Array(r.length)
  for (let s = 0; s < r.length; s++) i[s] = r.charCodeAt(s)
  return i
}
function of(t) {
  let e = ""
  for (let r = 0; r < t.length; r++) e += String.fromCharCode(t[r])
  return btoa(e)
}
function cf(t) {
  return Array.from(t)
    .map((e) => e.toString(16).padStart(2, "0"))
    .join("")
}
function Tn(t) {
  let e = 0n
  for (let r = 0; r < t.length; r++) e = (e << 8n) | BigInt(t[r])
  return e
}
function df(t, e) {
  let r = new Uint8Array(e),
    i = t
  for (let s = e - 1; s >= 0; s--) ((r[s] = Number(i & 0xffn)), (i >>= 8n))
  return r
}
function lf(t, e, r) {
  let i = 1n
  for (t = t % r; e > 0n; )
    (e % 2n === 1n && (i = (i * t) % r), (t = (t * t) % r), (e /= 2n))
  return i
}
function uf(t) {
  let e = t
      .replace(/-----BEGIN[^-]+-----/g, "")
      .replace(/-----END[^-]+-----/g, "")
      .replace(/\s+/g, ""),
    r = af(e),
    i = 0
  function s() {
    let d = r[i++],
      l = r[i++]
    if (l & 128) {
      let p = l & 127
      l = 0
      for (let f = 0; f < p; f++) l = (l << 8) | r[i++]
    }
    return { tag: d, length: l, dataStart: i }
  }
  let n = []
  function a(d, l) {
    let u = d
    for (; u < l; ) {
      let p = r[u++],
        f = r[u++]
      if (f & 128) {
        let y = f & 127
        f = 0
        for (let x = 0; x < y; x++) f = (f << 8) | r[u++]
      }
      let h = u
      if (((u += f), p === 2)) {
        let y = r.subarray(h, h + f)
        ;(y[0] === 0 && y.length > 1 && (y = y.subarray(1)), n.push(y))
      } else
        p === 48 || (p & 32) !== 0
          ? a(h, h + f)
          : p === 3 && r[h] === 0 && a(h + 1, h + f)
    }
  }
  if ((a(0, r.length), n.length < 2))
    throw new Error(
      "Failed to parse RSA public key: insufficient integers found",
    )
  let o = n[0],
    c = n[1]
  if (o.length < c.length) {
    let d = o
    ;((o = c), (c = d))
  }
  return { n: Tn(o), e: Tn(c), keyLength: o.length }
}
function ms(t, e, r = !1) {
  let { n: i, e: s, keyLength: n } = uf(e),
    a = typeof t == "string" ? new TextEncoder().encode(t) : t
  if (a.length > n - 11)
    throw new Error(`Data too long for RSA key size: ${a.length} > ${n - 11}`)
  let o = n - a.length - 3,
    c = new Uint8Array(o),
    d = new Uint8Array(o * 2)
  crypto.getRandomValues(d)
  let l = 0
  for (let y = 0; y < o; y++) {
    let x = d[l++]
    for (; x === 0; )
      (l >= d.length && (crypto.getRandomValues(d), (l = 0)), (x = d[l++]))
    c[y] = x
  }
  let u = new Uint8Array(n)
  ;((u[0] = 0), (u[1] = 2), u.set(c, 2), (u[2 + o] = 0), u.set(a, 3 + o))
  let p = Tn(u),
    f = lf(p, s, i),
    h = df(f, n)
  return r ? cf(h) : of(h)
}
function Bd(t, e) {
  let r =
      typeof e == "string"
        ? ge.default.enc.Utf8.parse(e.slice(0, 16))
        : ge.default.lib.WordArray.create(Array.from(e.slice(0, 16)), 16),
    i = ge.default.enc.Utf8.parse(t)
  return ge.default.AES.encrypt(i, r, {
    mode: ge.default.mode.ECB,
    padding: ge.default.pad.Pkcs7,
  }).ciphertext.toString(ge.default.enc.Hex)
}
function Ud(t, e) {
  return ge.default.HmacSHA1(t, e).toString(ge.default.enc.Hex)
}
function $d(t) {
  return typeof t == "string"
    ? ge.default.enc.Utf8.parse(t)
    : ge.default.lib.WordArray.create(t)
}
function ys(t) {
  return ge.default.MD5($d(t)).toString(ge.default.enc.Hex)
}
function Od(t) {
  return ge.default.MD5($d(t)).toString(ge.default.enc.Base64)
}
function Fn(t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
  return t.replace(/[xy]/g, (e) => {
    let r = (Math.random() * 16) | 0
    return (e === "x" ? r : (r & 3) | 8).toString(16)
  })
}
function In() {
  return (
    "0." +
    Math.floor(Math.random() * 1e17)
      .toString()
      .padStart(17, "0")
  )
}
function pf(t, e, r) {
  let i = t ? t.split(";").map((a) => a.trim()) : [],
    s = `${e}=${r}`,
    n = i.findIndex((a) => a.startsWith(`${e}=`))
  return (n !== -1 ? (i[n] = s) : i.push(s), i.filter(Boolean).join("; "))
}
function ff(t, e) {
  if (!e) return t
  let r = t,
    i = e.split(/,(?=\s*[a-zA-Z0-9_\-]+=[^;]+)/)
  for (let s of i) {
    let n = s.split(";")[0].trim(),
      a = n.indexOf("=")
    if (a > 0) {
      let o = n.slice(0, a).trim(),
        c = n.slice(a + 1).trim()
      r = pf(r, o, c)
    }
  }
  return r
}
function hf(t) {
  let e = t
  if (typeof e.getSetCookie == "function") {
    let i = e.getSetCookie()
    if (i.length > 0) return i
  }
  let r = t.get("set-cookie")
  return r ? [r] : []
}
function qd(t) {
  let e = t.replace(/("id"\s*:\s*)(-?\d{16,})(?=\s*[,}])/g, '$1"$2"')
  return JSON.parse(e)
}
var gf = new Set(["cloud.189.cn", "open.e.189.cn"])
function Rn(t) {
  return t.protocol === "https:" && gf.has(t.hostname)
}
function jd(t) {
  try {
    let e = new URL(t, "https://open.e.189.cn")
    return !!e.searchParams.get("lt") && !!e.searchParams.get("reqId")
  } catch {
    return !1
  }
}
function Bn(t) {
  try {
    let e = new URL(t, "https://open.e.189.cn")
    return (
      e.hostname === "cloud.189.cn" &&
      (e.pathname === "/web/main" || e.pathname === "/main.action")
    )
  } catch {
    return !1
  }
}
var xs = class {
  addition
  cookie = ""
  cookieDirty = !1
  sessionKey = ""
  rsa = { pubKey: "", pkId: "", expire: 0 }
  constructor(e, r) {
    ;((this.addition = e), (this.cookie = (e.cookie || "").trim()))
  }
  getCookie() {
    return this.cookie
  }
  consumePendingCookie() {
    return this.cookieDirty ? ((this.cookieDirty = !1), this.cookie) : null
  }
  getRootId() {
    return this.addition.root_folder_id || "-11"
  }
  setSessionKey(e) {
    this.sessionKey = e
  }
  getDownloadHeaders() {
    let e = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://cloud.189.cn/",
    }
    return (this.cookie && (e.Cookie = this.cookie), e)
  }
  async updateCookie(e) {
    let r = hf(e)
    if (r.length === 0) return
    let i = r.reduce((s, n) => ff(s, n), this.cookie)
    i !== this.cookie && ((this.cookie = i), (this.cookieDirty = !0))
  }
  async followRedirectsWithCookies(e, r) {
    let i = e
    for (let s = 0; s <= 8; s++) {
      let n = new URL(i)
      if (!Rn(n))
        throw new Error(
          n.protocol !== "https:"
            ? `[189Cloud] \u767B\u5F55\u91CD\u5B9A\u5411\u5FC5\u987B\u4F7F\u7528 HTTPS: ${n.origin}`
            : `[189Cloud] \u4E0D\u53D7\u4FE1\u4EFB\u7684\u767B\u5F55\u91CD\u5B9A\u5411\u5730\u5740: ${n.origin}`,
        )
      let a = { ...r }
      ;(s > 0 && (a.Referer = i), this.cookie && (a.Cookie = this.cookie))
      let o = await fetch(i, { method: "GET", headers: a, redirect: "manual" })
      await this.updateCookie(o.headers)
      let c = o.headers.get("location")
      if (!(o.status >= 300 && o.status < 400) || !c) {
        let u = i
        if (o.url && o.url !== i) {
          let p = new URL(o.url, i)
          if (jd(p.toString()) || Bn(p.toString())) {
            if (!Rn(p))
              throw new Error(
                p.protocol !== "https:"
                  ? `[189Cloud] \u767B\u5F55\u91CD\u5B9A\u5411\u5FC5\u987B\u4F7F\u7528 HTTPS: ${p.origin}`
                  : `[189Cloud] \u4E0D\u53D7\u4FE1\u4EFB\u7684\u767B\u5F55\u91CD\u5B9A\u5411\u5730\u5740: ${p.origin}`,
              )
            u = p.toString()
          }
        }
        return { response: o, url: u }
      }
      if (s === 8)
        throw new Error(
          "[189Cloud] \u767B\u5F55\u91CD\u5B9A\u5411\u6B21\u6570\u8FC7\u591A",
        )
      let l = new URL(c, i)
      if (!Rn(l))
        throw new Error(
          l.protocol !== "https:"
            ? `[189Cloud] \u767B\u5F55\u91CD\u5B9A\u5411\u5FC5\u987B\u4F7F\u7528 HTTPS: ${l.origin}`
            : `[189Cloud] \u4E0D\u53D7\u4FE1\u4EFB\u7684\u767B\u5F55\u91CD\u5B9A\u5411\u5730\u5740: ${l.origin}`,
        )
      i = l.toString()
    }
    throw new Error("[189Cloud] \u767B\u5F55\u91CD\u5B9A\u5411\u5931\u8D25")
  }
  async resolveLoginUrl(e, r) {
    let i = e
    for (let s = 0; s < 3; s++) {
      let n = new URL(e)
      n.searchParams.set("noCache", In())
      let a = await this.followRedirectsWithCookies(n.toString(), r)
      if (((i = a.url), jd(a.url) || Bn(a.url))) return a.url
      s < 2 && (await new Promise((o) => setTimeout(o, 150 * (s + 1))))
    }
    return i
  }
  async login(e = {}) {
    if (this.cookie && !e.force) return
    let r =
        "https://cloud.189.cn/api/portal/loginUrl.action?redirectURL=https%3A%2F%2Fcloud.189.cn%2Fmain.action",
      i = {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://cloud.189.cn/",
      }
    this.cookie && (i.Cookie = this.cookie)
    let s = await this.resolveLoginUrl(r, i)
    if (Bn(s)) return
    if (!this.addition.username || !this.addition.password) {
      if (this.cookie) return
      throw new Error(
        "[189Cloud] \u8D26\u53F7\u6216\u5BC6\u7801\u4E3A\u7A7A\uFF0C\u4E14\u672A\u63D0\u4F9B\u6709\u6548 Cookie",
      )
    }
    let n
    try {
      n = new URL(s, "https://open.e.189.cn")
    } catch {
      n = new URL("https://open.e.189.cn" + s)
    }
    let a = n.searchParams.get("lt") || "",
      o = n.searchParams.get("reqId") || "",
      c = n.searchParams.get("appId") || "cloud"
    if (!a || !o)
      throw new Error(
        "[189Cloud] \u767B\u5F55\u8DF3\u8F6C\u53C2\u6570\u4E0D\u5B8C\u6574\uFF0C\u672A\u83B7\u53D6\u5230 lt \u6216 reqId",
      )
    let d = () => {
        let _ = {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          lt: a,
          reqid: o,
          referer: s,
          origin: "https://open.e.189.cn",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        }
        return (this.cookie && (_.Cookie = this.cookie), _)
      },
      l = await fetch("https://open.e.189.cn/api/logbox/oauth2/appConf.do", {
        method: "POST",
        headers: d(),
        body: new URLSearchParams({ version: "2.0", appKey: c }),
      })
    await this.updateCookie(l.headers)
    let u = await l.json()
    if (u.result !== "0" || !u.data)
      throw new Error(
        `[189Cloud] \u83B7\u53D6 AppConf \u5931\u8D25: ${u.msg || JSON.stringify(u)}`,
      )
    let p = await fetch(
      "https://open.e.189.cn/api/logbox/config/encryptConf.do",
      { method: "POST", headers: d(), body: new URLSearchParams({ appId: c }) },
    )
    await this.updateCookie(p.headers)
    let f = await p.json()
    if (f.result !== 0 || !f.data?.pubKey)
      throw new Error(
        `[189Cloud] \u83B7\u53D6 EncryptConf \u5931\u8D25: ${JSON.stringify(f)}`,
      )
    let h = f.data.pre || "",
      y = f.data.pubKey,
      x = h + ms(this.addition.username, y, !0),
      g = h + ms(this.addition.password, y, !0),
      m = {
        version: "v2.0",
        apToken: "",
        appKey: c,
        accountType: u.data.accountType || "01",
        userName: x,
        epd: g,
        captchaType: "",
        validateCode: "",
        smsValidateCode: "",
        captchaToken: "",
        returnUrl: u.data.returnUrl || "https://cloud.189.cn/main.action",
        mailSuffix: u.data.mailSuffix || "@189.cn",
        dynamicCheck: "FALSE",
        clientType: String(u.data.clientType ?? "10010"),
        cb_SaveName: "3",
        isOauth2: String(u.data.isOauth2 ?? !1),
        state: "",
        paramId: u.data.paramId || "",
      },
      w = await fetch(
        "https://open.e.189.cn/api/logbox/oauth2/loginSubmit.do",
        { method: "POST", headers: { ...d() }, body: new URLSearchParams(m) },
      )
    await this.updateCookie(w.headers)
    let v = await w.json()
    if (v.result !== 0) {
      let _ = v.msg || "\u767B\u5F55\u5931\u8D25"
      throw _.includes("\u9A8C\u8BC1\u7801") ||
        _.includes("\u6ED1\u5757") ||
        _.includes("\u8BBE\u5907\u9501")
        ? new Error(
            `[189Cloud] \u767B\u5F55\u89E6\u53D1\u9A8C\u8BC1\u7801/\u8BBE\u5907\u4FDD\u62A4: ${_}\u3002\u8BF7\u5728\u6D4F\u89C8\u5668\u767B\u5F55\u540E\u590D\u5236 Cookie \u586B\u5165\u914D\u7F6E\u3002`,
          )
        : new Error(`[189Cloud] \u767B\u5F55\u5931\u8D25: ${_}`)
    }
    v.toUrl &&
      (await this.followRedirectsWithCookies(v.toUrl, {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      }))
  }
  async request(e, r = {}) {
    let i = r.method || "GET",
      s = r.retryOnInvalidSession !== !1,
      n = new URL(e)
    if ((n.searchParams.set("noCache", In()), r.params))
      for (let [p, f] of Object.entries(r.params))
        f !== void 0 && n.searchParams.set(p, f)
    let a = {
      Accept: "application/json;charset=UTF-8",
      Referer: "https://cloud.189.cn/",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    }
    this.cookie && (a.Cookie = this.cookie)
    let o
    r.body &&
      ((a["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8"),
      (o = new URLSearchParams(r.body).toString()))
    let c = await fetch(n.toString(), { method: i, headers: a, body: o })
    await this.updateCookie(c.headers)
    let d = await c.text(),
      l
    try {
      l = qd(d)
    } catch {
      throw new Error(
        `[189Cloud] \u975E\u9884\u671F\u54CD\u5E94: ${d.slice(0, 200)}`,
      )
    }
    if (
      l.errorCode === "InvalidSessionKey" ||
      l.res_code === "InvalidSessionKey" ||
      String(l.res_code) === "1010"
    ) {
      if (s)
        return (
          await this.login({ force: !0 }),
          this.request(e, { ...r, retryOnInvalidSession: !1 })
        )
      throw new Error(
        l.errorMsg ||
          l.res_message ||
          "[189Cloud] \u767B\u5F55\u4F1A\u8BDD\u5DF2\u5931\u6548",
      )
    }
    if (l.errorCode)
      throw new Error(
        l.errorMsg || `[189Cloud] API \u9519\u8BEF: ${l.errorCode}`,
      )
    if (!c.ok)
      throw new Error(
        l.errorMsg ||
          l.res_message ||
          `[189Cloud] HTTP \u8BF7\u6C42\u5931\u8D25 (${c.status})`,
      )
    if (l.res_code !== void 0 && String(l.res_code) !== "0")
      throw new Error(
        l.res_message || `189 API \u9519\u8BEF (res_code: ${l.res_code})`,
      )
    return l
  }
  async getFilesPage(e, r, i) {
    let s = this.addition.order_by || "lastOpTime",
      n =
        (this.addition.order_direction || "desc") === "desc" ? "true" : "false",
      a = await this.request(
        "https://cloud.189.cn/api/open/file/listFiles.action",
        {
          method: "GET",
          params: {
            pageSize: i,
            pageNum: String(r),
            mediaType: "0",
            folderId: e || this.getRootId(),
            iconOption: "5",
            orderBy: s,
            descending: n,
          },
        },
      ),
      o = a.fileListAO?.count,
      c =
        typeof o == "number"
          ? o
          : typeof o == "string" && o.trim() !== ""
            ? Number(o)
            : NaN
    if (
      !a.fileListAO ||
      typeof a.fileListAO != "object" ||
      Array.isArray(a.fileListAO) ||
      !Number.isFinite(c) ||
      c < 0 ||
      !Array.isArray(a.fileListAO.fileList) ||
      !Array.isArray(a.fileListAO.folderList)
    )
      throw new Error(
        "[189Cloud] \u6587\u4EF6\u5217\u8868\u54CD\u5E94\u7F3A\u5C11\u6709\u6548\u7684 fileListAO \u6570\u7EC4\u5B57\u6BB5",
      )
    return a
  }
  async validateRoot(e) {
    await this.getFilesPage(e, 1, "1")
  }
  async getFiles(e, r) {
    let i = [],
      s = [],
      n = 1,
      a = "60"
    for (;;) {
      if (r?.budget) {
        if (r.budget.used >= r.budget.limit) {
          console.warn(
            "[189Cloud] Cloudflare Worker subrequest budget limit reached.",
          )
          break
        }
        r.budget.used++
      }
      let c = (await this.getFilesPage(e, n, a)).fileListAO
      if (Number(c.count) === 0) break
      let d = c.fileList || [],
        l = c.folderList || []
      if (
        (s.push(...l),
        i.push(...d),
        (r?.findName &&
          ((r.findIsDir && l.some((u) => u.name === r.findName)) ||
            (!r.findIsDir && d.some((u) => u.name === r.findName)))) ||
          d.length + l.length < parseInt(a, 10))
      )
        break
      n++
    }
    return { files: i, folders: s }
  }
  async getDownloadUrl(e) {
    let r = await this.request(
        "https://cloud.189.cn/api/portal/getFileInfo.action",
        { method: "GET", params: { fileId: e } },
      ),
      i = r.fileDownloadUrl || r.downloadUrl
    if (!i)
      throw new Error(
        `[189Cloud] \u83B7\u53D6\u6587\u4EF6\u4E0B\u8F7D\u5730\u5740\u5931\u8D25 (fileId: ${e})`,
      )
    let s = i.startsWith("//") ? "https:" + i : i
    s = s.replace(/^http:\/\//i, "https://")
    try {
      let n = await fetch(s, {
          method: "GET",
          headers: this.getDownloadHeaders(),
          redirect: "manual",
        }),
        a = n.headers.get("location")
      n.status === 302 && a && (s = a.replace(/^http:\/\//i, "https://"))
    } catch {}
    return s
  }
  async getSessionKey() {
    let e = await this.request(
        "https://cloud.189.cn/v2/getUserBriefInfo.action",
        { method: "GET" },
      ),
      r = String(e.sessionKey || "")
    if (!r)
      throw new Error(
        "[189Cloud] \u83B7\u53D6\u4E0A\u4F20 SessionKey \u5931\u8D25",
      )
    return r
  }
  async getResKey() {
    if (this.rsa.pubKey && this.rsa.pkId && this.rsa.expire > Date.now())
      return this.rsa
    let e = await this.request(
        "https://cloud.189.cn/api/security/generateRsaKey.action",
        { method: "GET" },
      ),
      r = String(e.pubKey || ""),
      i = String(e.pkId || "")
    if (!r || !i)
      throw new Error(
        "[189Cloud] \u83B7\u53D6\u4E0A\u4F20 RSA \u516C\u94A5\u5931\u8D25",
      )
    return (
      (this.rsa = {
        pubKey: r,
        pkId: i,
        expire: Number(e.expire) || Date.now() + 5 * 6e4,
      }),
      this.rsa
    )
  }
  async uploadRequest(e, r) {
    this.sessionKey || (this.sessionKey = await this.getSessionKey())
    let i = String(Date.now()),
      s = Fn(),
      n = Fn("xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx").slice(
        0,
        16 + Math.floor(Math.random() * 17),
      ),
      a = Object.keys(r)
        .sort()
        .map((y) => `${y}=${r[y]}`)
        .join("&"),
      o = Bd(a, n.slice(0, 16)),
      c = Ud(
        `SessionKey=${this.sessionKey}&Operate=GET&RequestURI=${e}&Date=${i}&params=${o}`,
        n,
      ),
      { pubKey: d, pkId: l } = await this.getResKey(),
      u = {
        accept: "application/json;charset=UTF-8",
        SessionKey: this.sessionKey,
        Signature: c,
        "X-Request-Date": i,
        "X-Request-ID": s,
        EncryptionText: ms(n, d, !1),
        PkId: l,
      }
    this.cookie && (u.Cookie = this.cookie)
    let p = await fetch(`https://upload.cloud.189.cn${e}?params=${o}`, {
      method: "GET",
      headers: u,
    })
    await this.updateCookie(p.headers)
    let f = await p.text()
    if (!p.ok)
      throw new Error(
        `[189Cloud] \u4E0A\u4F20\u63A5\u53E3 HTTP ${p.status}: ${f.slice(0, 200)}`,
      )
    let h
    try {
      h = qd(f)
    } catch {
      throw new Error(
        `[189Cloud] \u4E0A\u4F20\u63A5\u53E3\u8FD4\u56DE\u65E0\u6548\u54CD\u5E94: ${f.slice(0, 200)}`,
      )
    }
    if (h.code !== "SUCCESS")
      throw new Error(
        h.msg ||
          h.message ||
          `[189Cloud] \u4E0A\u4F20\u63A5\u53E3\u5931\u8D25: ${e}`,
      )
    return h
  }
  async createMultiUpload(e, r, i, s) {
    let n = await this.getSessionKey()
    this.sessionKey = n
    let a = {
        parentFolderId: e,
        fileName: encodeURIComponent(r).replace(/%20/g, "+"),
        fileSize: String(i),
        sliceSize: String(10 * 1024 * 1024),
      },
      o
    try {
      o = await this.uploadRequest("/person/initMultiUpload", {
        ...a,
        fileMd5: s,
        sliceMd5: s,
      })
    } catch (d) {
      let l = String(d?.message || d)
      if (
        !/InfoSecurityErrorCode|file md5 is in black list|security check not pass/i.test(
          l,
        )
      )
        throw d
      o = await this.uploadRequest("/person/initMultiUpload", {
        ...a,
        lazyCheck: "1",
      })
    }
    let c = String(o.data?.uploadFileId || "")
    if (!c)
      throw new Error(
        "[189Cloud] \u521B\u5EFA\u4E0A\u4F20\u4F1A\u8BDD\u5931\u8D25\uFF1A\u7F3A\u5C11 uploadFileId",
      )
    return {
      uploadFileId: c,
      fileDataExists: String(o.data?.fileDataExists || "0") === "1",
      sessionKey: n,
    }
  }
  async getMultiUploadUrls(e, r, i) {
    let n = (
      await this.uploadRequest("/person/getMultiUploadUrls", {
        partInfo: `${r}-${Od(i)}`,
        uploadFileId: e,
      })
    ).uploadUrls?.[`partNumber_${r}`]
    if (!n?.requestURL)
      throw new Error(
        `[189Cloud] \u83B7\u53D6\u7B2C ${r} \u4E2A\u5206\u7247\u4E0A\u4F20\u5730\u5740\u5931\u8D25`,
      )
    return n
  }
  async commitMultiUpload(e, r, i) {
    await this.uploadRequest("/person/commitMultiUploadFile", {
      uploadFileId: e,
      fileMd5: r,
      sliceMd5: i,
      lazyCheck: "1",
      opertype: "3",
    })
  }
  async mkdir(e, r) {
    await this.request(
      "https://cloud.189.cn/api/open/file/createFolder.action",
      {
        method: "POST",
        body: { parentFolderId: e || this.getRootId(), folderName: r },
      },
    )
  }
  async rename(e, r, i) {
    let s = r
        ? "https://cloud.189.cn/api/open/file/renameFolder.action"
        : "https://cloud.189.cn/api/open/file/renameFile.action",
      n = r
        ? { folderId: e, destFolderName: i }
        : { fileId: e, destFileName: i }
    await this.request(s, { method: "POST", body: n })
  }
  async batchTask(e, r, i = "") {
    let s = r.map((n) => ({
      fileId: n.id,
      fileName: n.name,
      isFolder: n.isFolder ? 1 : 0,
    }))
    await this.request(
      "https://cloud.189.cn/api/open/batch/createBatchTask.action",
      {
        method: "POST",
        body: { type: e, targetFolderId: i, taskInfos: JSON.stringify(s) },
      },
    )
  }
  async move(e, r, i, s) {
    await this.batchTask("MOVE", [{ id: e, name: i, isFolder: r }], s)
  }
  async copy(e, r, i, s) {
    await this.batchTask("COPY", [{ id: e, name: i, isFolder: r }], s)
  }
  async remove(e, r, i) {
    await this.batchTask("DELETE", [{ id: e, name: i, isFolder: r }], "")
  }
  async getCapacityInfo() {
    return this.request(
      "https://cloud.189.cn/api/portal/getUserSizeInfo.action",
      { method: "GET" },
    )
  }
}
var mf = 45,
  yf = 10 * 1024 * 1024
function xf(t) {
  return Buffer.from(JSON.stringify(t), "utf8").toString("base64")
}
function zd(t) {
  try {
    let e = JSON.parse(Buffer.from(t, "base64").toString("utf8"))
    if (
      !e ||
      !e.uploadFileId ||
      !e.sessionKey ||
      !e.fileMd5 ||
      !Number.isInteger(e.partCount) ||
      e.partCount < 1 ||
      !Number.isInteger(e.chunkSize) ||
      e.chunkSize < 1
    )
      throw new Error("invalid upload session")
    return e
  } catch {
    throw new Error(
      "[189Cloud] \u4E0A\u4F20\u4F1A\u8BDD\u65E0\u6548\u6216\u5DF2\u635F\u574F",
    )
  }
}
function Md(t) {
  if (!t) return new Date().toISOString()
  try {
    let e = new Date(t)
    if (!isNaN(e.getTime())) return e.toISOString()
  } catch {}
  return new Date().toISOString()
}
function Ld(t) {
  return {
    name: t.name,
    size: 0,
    is_dir: !0,
    modified: Md(t.lastOpTime),
    sign: String(t.id),
    type: 1,
    thumb: "",
    raw_url: "",
  }
}
function Nd(t) {
  return {
    name: t.name,
    size: t.size || 0,
    is_dir: !1,
    modified: Md(t.lastOpTime),
    sign: String(t.id),
    type: W(t.name, !1),
    thumb: t.icon?.smallUrl || t.icon?.largeUrl || "",
    raw_url: "",
  }
}
function wf(t) {
  let e = { ...(t || {}) }
  return (
    (e.username = e.username || ""),
    (e.password = e.password || ""),
    (e.cookie = (e.cookie || "").trim()),
    (e.root_folder_id = e.root_folder_id || "-11"),
    (e.order_by = e.order_by || "lastOpTime"),
    (e.order_direction = e.order_direction || "desc"),
    e
  )
}
var ws = class {
  client
  addition
  pathIdCache = new Map()
  budget = { used: 0, limit: mf }
  constructor(e, r) {
    ;((this.addition = wf(e)), (this.client = new xs(this.addition, r)))
  }
  async init() {
    await this.client.login()
  }
  consumePendingCookie() {
    return this.client.consumePendingCookie()
  }
  async resolveFolderId(e) {
    let r = this.client.getRootId(),
      i =
        "/" +
        String(e || "")
          .split("/")
          .filter(Boolean)
          .join("/")
    if (i === "/" || i === `/${r}`) return r
    let s = i.split("/").filter(Boolean),
      n = 0,
      a = r,
      o = ""
    for (let c = 0; c < s.length; c++) {
      let d = "/" + s.slice(0, c + 1).join("/"),
        l = this.pathIdCache.get(d)
      if (l !== void 0) ((a = l), (n = c + 1), (o = d))
      else break
    }
    for (let c = n; c < s.length; c++) {
      let d = s[c],
        l = (() => {
          try {
            return decodeURIComponent(d)
          } catch {
            return d
          }
        })(),
        { folders: u } = await this.client.getFiles(a, {
          findName: l,
          findIsDir: !0,
          budget: this.budget,
        }),
        p = u.find(
          (f) =>
            f.name === d ||
            f.name === l ||
            String(f.id) === d ||
            String(f.id) === l,
        )
      if (!p) throw new Error(`[189Cloud] \u76EE\u5F55\u672A\u627E\u5230: ${d}`)
      ;((a = String(p.id)),
        (o = "/" + s.slice(0, c + 1).join("/")),
        this.pathIdCache.set(o, a))
    }
    return a
  }
  async resolveFile(e) {
    let r = String(e || "")
      .split("/")
      .filter(Boolean)
    if (r.length === 0) throw new Error("[189Cloud] \u8DEF\u5F84\u65E0\u6548")
    let i = r[r.length - 1],
      s = (() => {
        try {
          return decodeURIComponent(i)
        } catch {
          return i
        }
      })(),
      n = "/" + r.slice(0, r.length - 1).join("/"),
      a = await this.resolveFolderId(n),
      { files: o, folders: c } = await this.client.getFiles(a, {
        findName: s,
        budget: this.budget,
      }),
      d = o.find(
        (u) =>
          u.name === i ||
          u.name === s ||
          String(u.id) === i ||
          String(u.id) === s,
      )
    if (d) return { file: d, parentId: a, isDir: !1 }
    let l = c.find(
      (u) =>
        u.name === i ||
        u.name === s ||
        String(u.id) === i ||
        String(u.id) === s,
    )
    if (l) return { file: l, parentId: a, isDir: !0 }
    throw new Error(
      `[189Cloud] \u6587\u4EF6\u6216\u76EE\u5F55\u672A\u627E\u5230: ${i}`,
    )
  }
  async list(e, r) {
    this.budget.used = 0
    let i = await this.resolveFolderId(r),
      { files: s, folders: n } = await this.client.getFiles(i, {
        budget: this.budget,
      }),
      a = [...n.map(Ld), ...s.map(Nd)]
    return V(
      a,
      this.addition.order_by === "filename"
        ? "file_name"
        : this.addition.order_by === "fileSize"
          ? "size"
          : "updated_at",
      this.addition.order_direction,
    )
  }
  async get(e, r) {
    this.budget.used = 0
    let i = String(r || "")
      .split("/")
      .filter(Boolean)
    if (i.length === 0 || i[i.length - 1] === this.client.getRootId()) {
      let o = this.client.getRootId()
      return {
        name: o,
        size: 0,
        is_dir: !0,
        modified: new Date().toISOString(),
        sign: o,
        type: 1,
        raw_url: "",
      }
    }
    let { file: s, isDir: n } = await this.resolveFile(r)
    if (n) return Ld(s)
    let a = Nd(s)
    try {
      ;((a.raw_url = await this.client.getDownloadUrl(String(s.id))),
        (a.raw_url_headers = this.client.getDownloadHeaders()))
    } catch (o) {
      console.warn(
        `[189Cloud] \u83B7\u53D6 ${s.name} \u4E0B\u8F7D\u5730\u5740\u5931\u8D25:`,
        o.message,
      )
    }
    return a
  }
  async mkdir(e, r) {
    this.budget.used = 0
    let i = String(r || "")
        .split("/")
        .filter(Boolean),
      s = i.pop() || "\u65B0\u6587\u4EF6\u5939",
      n = "/" + i.join("/"),
      a = await this.resolveFolderId(n)
    await this.client.mkdir(a, s)
  }
  async rename(e, r, i) {
    this.budget.used = 0
    let { file: s, isDir: n } = await this.resolveFile(r)
    await this.client.rename(String(s.id), n, i)
  }
  async remove(e, r, i) {
    this.budget.used = 0
    let { file: s, isDir: n } = await this.resolveFile(r)
    await this.client.remove(String(s.id), n, s.name)
  }
  async move(e, r, i, s, n) {
    this.budget.used = 0
    let { file: a, isDir: o } = await this.resolveFile(s),
      c = String(r).split("/").filter(Boolean),
      d = await this.resolveFolderId("/" + c.join("/"))
    await this.client.move(String(a.id), o, a.name, d)
  }
  async copy(e, r, i, s, n) {
    this.budget.used = 0
    let { file: a, isDir: o } = await this.resolveFile(s),
      c = String(r).split("/").filter(Boolean),
      d = await this.resolveFolderId("/" + c.join("/"))
    await this.client.copy(String(a.id), o, a.name, d)
  }
  async put(e, r, i) {
    let s = String(r || "")
        .split("/")
        .filter(Boolean),
      n = s.pop()
    if (!n) throw new Error("[189Cloud] \u4E0A\u4F20\u8DEF\u5F84\u65E0\u6548")
    let a = "/" + s.join("/"),
      o = await this.createUploadSession(a, a, n, i.length, ys(i))
    if (o.reuse) return
    let c = []
    for (let d = 1; d <= o.partCount; d++) {
      let l = (d - 1) * o.chunkSize,
        u = i.subarray(l, Math.min(l + o.chunkSize, i.length)),
        p = await this.uploadPart(o.session, d, u)
      c.push(p.partMd5)
    }
    await this.completeUploadSession(o.session, c)
  }
  async createUploadSession(e, r, i, s, n) {
    let a = yf,
      o = String(n || "")
        .trim()
        .toLowerCase()
    if (!/^[a-f0-9]{32}$/.test(o))
      return {
        reuse: !1,
        requiresMd5: !0,
        partCount: 0,
        chunkSize: a,
        session: "",
      }
    this.budget.used = 0
    let c = Math.max(1, Math.ceil(Math.max(0, Number(s) || 0) / a)),
      d = await this.resolveFolderId(r || "/"),
      l = await this.client.createMultiUpload(
        d,
        i,
        Math.max(0, Number(s) || 0),
        o,
      )
    return l.fileDataExists
      ? (await this.client.commitMultiUpload(l.uploadFileId, o, o),
        { reuse: !0, partCount: 0, chunkSize: a, session: "" })
      : {
          reuse: !1,
          partCount: c,
          chunkSize: a,
          session: xf({
            uploadFileId: l.uploadFileId,
            sessionKey: l.sessionKey,
            fileMd5: o,
            size: Math.max(0, Number(s) || 0),
            partCount: c,
            chunkSize: a,
          }),
        }
  }
  async uploadPart(e, r, i) {
    let s = zd(e)
    if (!Number.isInteger(r) || r < 1 || r > s.partCount)
      throw new Error(`[189Cloud] \u5206\u7247\u5E8F\u53F7\u65E0\u6548: ${r}`)
    this.client.setSessionKey(s.sessionKey)
    let n = await this.client.getMultiUploadUrls(s.uploadFileId, r, i),
      a = {}
    if (n.requestHeader) {
      let c = n.requestHeader
      try {
        c = decodeURIComponent(c)
      } catch {}
      for (let d of c.split("&")) {
        let l = d.indexOf("=")
        l <= 0 || (a[d.slice(0, l)] = d.slice(l + 1))
      }
    }
    let o = await fetch(n.requestURL, { method: "PUT", headers: a, body: i })
    if (!o.ok) {
      let c = await o.text().catch(() => "")
      throw new Error(
        `[189Cloud] \u4E0A\u4F20\u7B2C ${r}/${s.partCount} \u5206\u7247\u5931\u8D25: HTTP ${o.status} ${c}`,
      )
    }
    return { partMd5: ys(i) }
  }
  async completeUploadSession(e, r = []) {
    let i = zd(e)
    this.client.setSessionKey(i.sessionKey)
    let s = r
      .map((a) =>
        String(a || "")
          .trim()
          .toLowerCase(),
      )
      .filter((a) => /^[a-f0-9]{32}$/.test(a))
    if (s.length !== i.partCount)
      throw new Error(
        "[189Cloud] \u5206\u7247\u6821\u9A8C\u4FE1\u606F\u4E0D\u5B8C\u6574\uFF0C\u65E0\u6CD5\u63D0\u4EA4\u4E0A\u4F20",
      )
    let n =
      i.partCount === 1
        ? i.fileMd5
        : ys(
            s.join(`
`),
          ).toUpperCase()
    await this.client.commitMultiUpload(i.uploadFileId, i.fileMd5, n)
  }
}
xe()
var St = mt(_t(), 1)
function Je(t, e) {
  let r = t.replace(/\/+$/, ""),
    i = e.replace(/^\/+/, "")
  return !r && !i ? "/" : r ? (i ? `${r}/${i}` : r) : "/" + i
}
function vf(t) {
  return t
    .split("/")
    .map((e) => encodeURIComponent(e))
    .join("/")
}
function Hd(t, e) {
  let r = [],
    i,
    s =
      /<(?:[a-zA-Z0-9_-]+:)?response\b[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9_-]+:)?response>/gi,
    n
  for (; (n = s.exec(t)) !== null; ) {
    let a = n[1],
      o =
        /<(?:[a-zA-Z0-9_-]+:)?href\b[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9_-]+:)?href>/i.exec(
          a,
        )
    if (!o) continue
    let c = o[1].trim(),
      d = c
    try {
      d = decodeURIComponent(c)
    } catch {}
    let l =
        /<(?:[a-zA-Z0-9_-]+:)?propstat\b[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9_-]+:)?propstat>/gi,
      u,
      p = ""
    for (; (u = l.exec(a)) !== null; ) {
      let A = u[1],
        $ =
          /<(?:[a-zA-Z0-9_-]+:)?status\b[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9_-]+:)?status>/i.exec(
            A,
          ),
        O = $ ? $[1] : ""
      if (O.includes("200") || O.toLowerCase().includes("ok")) {
        let j =
          /<(?:[a-zA-Z0-9_-]+:)?prop\b[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9_-]+:)?prop>/i.exec(
            A,
          )
        if (j) {
          p = j[1]
          break
        }
      }
    }
    if (!p) continue
    let f =
        /<(?:[a-zA-Z0-9_-]+:)?resourcetype\b[^>]*>[\s\S]*?<(?:[a-zA-Z0-9_-]+:)?collection\b/i.test(
          p,
        ),
      h =
        /<(?:[a-zA-Z0-9_-]+:)?displayname\b[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9_-]+:)?displayname>/i.exec(
          p,
        ),
      y = h ? h[1].trim() : "",
      x = d.replace(/\/+$/, ""),
      g = (x && x.split("/").pop()) || "",
      m = y || g,
      w =
        /<(?:[a-zA-Z0-9_-]+:)?getcontentlength\b[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9_-]+:)?getcontentlength>/i.exec(
          p,
        ),
      v = f ? 0 : (w && parseInt(w[1].trim(), 10)) || 0,
      _ =
        /<(?:[a-zA-Z0-9_-]+:)?getlastmodified\b[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9_-]+:)?getlastmodified>/i.exec(
          p,
        ),
      b = new Date().toISOString()
    if (_) {
      let A = new Date(_[1].trim())
      isNaN(A.getTime()) || (b = A.toISOString())
    }
    let P =
        /<(?:[a-zA-Z0-9_-]+:)?getcontenttype\b[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9_-]+:)?getcontenttype>/i.exec(
          p,
        ),
      E = P ? P[1].trim() : void 0,
      S =
        /<(?:[a-zA-Z0-9_-]+:)?getetag\b[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9_-]+:)?getetag>/i.exec(
          p,
        ),
      D = S ? S[1].trim().replace(/^"|"$/g, "") : void 0,
      k = {
        name: m,
        path: d,
        size: v,
        modified: b,
        isFolder: f,
        contentType: E,
        etag: D,
      },
      C = e.replace(/\/+$/, "").toLowerCase(),
      F = x.toLowerCase()
    !i && (F === C || F.endsWith(C) || (C === "" && F === ""))
      ? (i = k)
      : r.push(k)
  }
  return { self: i, items: r }
}
function _f(t) {
  let e = {},
    r = t.replace(/^digest\s+/i, "").split(/,\s*/)
  for (let i of r) {
    let s = i.indexOf("=")
    if (s !== -1) {
      let n = i.slice(0, s).trim(),
        a = i
          .slice(s + 1)
          .trim()
          .replace(/^"|"$/g, "")
      n === "realm"
        ? (e.realm = a)
        : n === "nonce"
          ? (e.nonce = a)
          : n === "qop"
            ? (e.qop = a)
            : n === "opaque"
              ? (e.opaque = a)
              : n === "algorithm" && (e.algorithm = a)
    }
  }
  return e
}
function Kd(t, e, r, i, s, n = 1) {
  let a = n.toString(16).padStart(8, "0"),
    o = Math.random().toString(36).substring(2, 18),
    c = t.realm || "",
    d = t.nonce || "",
    l = (t.algorithm || "MD5").toUpperCase(),
    u = t.qop || "",
    p = ""
  if (l === "MD5" || l === "") p = St.default.MD5(`${e}:${c}:${r}`).toString()
  else if (l === "MD5-SESS") {
    let x = St.default.MD5(`${e}:${c}:${r}`).toString()
    p = St.default.MD5(`${x}:${d}:${o}`).toString()
  }
  let f = ""
  ;(u === "auth" || u === "") && (f = St.default.MD5(`${i}:${s}`).toString())
  let h = ""
  u
    ? (h = St.default.MD5(`${p}:${d}:${a}:${o}:${u}:${f}`).toString())
    : (h = St.default.MD5(`${p}:${d}:${f}`).toString())
  let y = `Digest username="${e}", realm="${c}", nonce="${d}", uri="${s}", response="${h}"`
  return (
    l && (y += `, algorithm=${l}`),
    u && (y += `, qop=${u}, nc=${a}, cnonce="${o}"`),
    t.opaque && (y += `, opaque="${t.opaque}"`),
    y
  )
}
var bf = {
  com: "https://login.microsoftonline.com",
  cn: "https://login.chinacloudapi.cn",
  us: "https://login.microsoftonline.us",
  de: "https://login.microsoftonline.de",
}
async function kf(t, e, r) {
  let i = new URL(r),
    s = i.hostname.split("."),
    n = s[s.length - 1],
    o = `${bf[n] || "https://login.microsoftonline.com"}/extSTS.srf`,
    c = `<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope"
xmlns:a="http://www.w3.org/2005/08/addressing"
xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
<s:Header>
<a:Action s:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action>
<a:ReplyTo>
<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>
</a:ReplyTo>
<a:To s:mustUnderstand="1">${o}</a:To>
<o:Security s:mustUnderstand="1"
 xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
<o:UsernameToken>
  <o:Username>${t.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</o:Username>
  <o:Password>${e.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</o:Password>
</o:UsernameToken>
</o:Security>
</s:Header>
<s:Body>
<t:RequestSecurityToken xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust">
<wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy">
  <a:EndpointReference>
    <a:Address>${r.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</a:Address>
  </a:EndpointReference>
</wsp:AppliesTo>
<t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType>
<t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType>
<t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType>
</t:RequestSecurityToken>
</s:Body>
</s:Envelope>`,
    d = await fetch(o, {
      method: "POST",
      headers: { "Content-Type": "application/soap+xml; charset=utf-8" },
      body: c,
    })
  if (!d.ok)
    throw new Error(`SharePoint SAML auth failed with HTTP ${d.status}`)
  let l = await d.text(),
    u =
      /<(?:[a-zA-Z0-9_-]+:)?BinarySecurityToken\b[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9_-]+:)?BinarySecurityToken>/i.exec(
        l,
      )
  if (!u) {
    let m =
        /<(?:[a-zA-Z0-9_-]+:)?Text\b[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9_-]+:)?Text>/i.exec(
          l,
        ),
      w = m ? m[1] : "Failed to obtain BinarySecurityToken"
    throw new Error(`SharePoint login failed: ${w}`)
  }
  let p = u[1].trim(),
    f = `https://${i.host}/_forms/default.aspx?wa=wsignin1.0`,
    h = await fetch(f, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: p,
      redirect: "manual",
    }),
    y = "",
    x = "",
    g = (m) => {
      let w = []
      if (m.headers.getSetCookie) w.push(...m.headers.getSetCookie())
      else {
        let v = m.headers.get("set-cookie")
        v && w.push(v)
      }
      for (let v of w) {
        let _ = /rtFa=([^;]+)/.exec(v)
        _ && (y = _[1])
        let b = /FedAuth=([^;]+)/.exec(v)
        b && (x = b[1])
      }
    }
  if ((g(h), !y || !x)) {
    let m = h.headers.get("location")
    if (m) {
      let w = new URL(m, f).toString(),
        v = await fetch(w, {
          method: "GET",
          headers: { Cookie: `rtFa=${y}; FedAuth=${x}` },
          redirect: "manual",
        })
      g(v)
    }
  }
  if (!y && !x)
    throw new Error(
      "SharePoint auth failed: rtFa / FedAuth cookies not returned",
    )
  return `rtFa=${y}; FedAuth=${x}`
}
var vs = class {
  address
  username
  password
  isSharepoint
  sharepointCookie = ""
  digestParts = null
  ncCount = 0
  constructor(e) {
    ;((this.address = e.address.replace(/\/+$/, "")),
      (this.username = e.username || ""),
      (this.password = e.password || ""),
      (this.isSharepoint = e.vendor === "sharepoint"))
  }
  async init() {
    this.isSharepoint &&
      (this.sharepointCookie = await kf(
        this.username,
        this.password,
        this.address,
      ))
  }
  buildUrl(e) {
    let r = e.replace(/^\/+/, "")
    return r ? `${this.address}/${vf(r)}` : this.address
  }
  getAuthHeaders(e, r) {
    let i = {}
    if (this.isSharepoint && this.sharepointCookie)
      i.Cookie = this.sharepointCookie
    else if (this.digestParts)
      (this.ncCount++,
        (i.Authorization = Kd(
          this.digestParts,
          this.username,
          this.password,
          e,
          r,
          this.ncCount,
        )))
    else if (this.username || this.password) {
      let s = btoa(
        unescape(encodeURIComponent(`${this.username}:${this.password}`)),
      )
      i.Authorization = `Basic ${s}`
    }
    return i
  }
  async request(e, r, i = {}) {
    let s = this.buildUrl(r),
      n = new URL(s),
      a = n.pathname + n.search,
      c = { ...this.getAuthHeaders(e, a), ...(i.headers || {}) },
      d = await fetch(s, {
        method: e,
        headers: c,
        body: i.body,
        redirect: i.redirect || "follow",
      })
    if (d.status === 401 && !this.isSharepoint) {
      let l = d.headers.get("www-authenticate") || ""
      if (/digest/i.test(l)) {
        ;((this.digestParts = _f(l)), (this.ncCount = 1))
        let u = Kd(
            this.digestParts,
            this.username,
            this.password,
            e,
            a,
            this.ncCount,
          ),
          p = { ...c, Authorization: u }
        d = await fetch(s, {
          method: e,
          headers: p,
          body: i.body,
          redirect: i.redirect || "follow",
        })
      }
    }
    return d
  }
  async readDir(e) {
    let i = await this.request("PROPFIND", e, {
      headers: {
        Depth: "1",
        "Content-Type": "application/xml; charset=utf-8",
        Accept: "application/xml, text/xml",
      },
      body: `<?xml version="1.0" encoding="utf-8" ?>
<d:propfind xmlns:d="DAV:">
  <d:prop>
    <d:displayname/>
    <d:resourcetype/>
    <d:getcontentlength/>
    <d:getcontenttype/>
    <d:getetag/>
    <d:getlastmodified/>
  </d:prop>
</d:propfind>`,
    })
    if (i.status === 404) throw new Error(`Directory not found: ${e}`)
    if (i.status !== 207 && !i.ok) {
      let a = await i.text()
      throw new Error(
        `WebDAV PROPFIND failed with status ${i.status}: ${a || i.statusText}`,
      )
    }
    let s = await i.text(),
      { items: n } = Hd(s, e)
    return n
  }
  async stat(e) {
    let i = await this.request("PROPFIND", e, {
      headers: {
        Depth: "0",
        "Content-Type": "application/xml; charset=utf-8",
        Accept: "application/xml, text/xml",
      },
      body: `<?xml version="1.0" encoding="utf-8" ?>
<d:propfind xmlns:d="DAV:">
  <d:prop>
    <d:displayname/>
    <d:resourcetype/>
    <d:getcontentlength/>
    <d:getcontenttype/>
    <d:getetag/>
    <d:getlastmodified/>
  </d:prop>
</d:propfind>`,
    })
    if (i.status === 404) throw new Error(`Object not found: ${e}`)
    if (i.status !== 207 && !i.ok) {
      let c = await i.text()
      throw new Error(
        `WebDAV PROPFIND failed with status ${i.status}: ${c || i.statusText}`,
      )
    }
    let s = await i.text(),
      { self: n, items: a } = Hd(s, e),
      o = n || a[0]
    if (!o) throw new Error(`Object not found in PROPFIND response: ${e}`)
    return o
  }
  async mkdir(e) {
    let r = await this.request("MKCOL", e)
    if (!(r.status === 201 || r.status === 405))
      throw new Error(`WebDAV MKCOL failed with status ${r.status}`)
  }
  async mkdirAll(e) {
    let r = await this.request("MKCOL", e)
    if (!(r.status === 201 || r.status === 405)) {
      if (r.status === 409) {
        let i = e.split("/").filter(Boolean),
          s = ""
        for (let n of i) {
          s += "/" + n
          let a = await this.request("MKCOL", s)
          if (a.status !== 201 && a.status !== 405)
            throw new Error(
              `WebDAV MkdirAll failed at ${s} with status ${a.status}`,
            )
        }
        return
      }
      throw new Error(`WebDAV MkdirAll failed with status ${r.status}`)
    }
  }
  async move(e, r, i = !0) {
    let s = this.buildUrl(r),
      n = await this.request("MOVE", e, {
        headers: { Destination: s, Overwrite: i ? "T" : "F" },
      })
    if (!(n.status === 201 || n.status === 204)) {
      if (n.status === 409) {
        let a = r.substring(0, r.lastIndexOf("/"))
        if (a) return (await this.mkdirAll(a), this.move(e, r, i))
      }
      throw new Error(`WebDAV MOVE failed with status ${n.status}`)
    }
  }
  async copy(e, r, i = !0) {
    let s = this.buildUrl(r),
      n = await this.request("COPY", e, {
        headers: { Destination: s, Overwrite: i ? "T" : "F" },
      })
    if (!(n.status === 201 || n.status === 204)) {
      if (n.status === 409) {
        let a = r.substring(0, r.lastIndexOf("/"))
        if (a) return (await this.mkdirAll(a), this.copy(e, r, i))
      }
      throw new Error(`WebDAV COPY failed with status ${n.status}`)
    }
  }
  async remove(e) {
    let r = await this.request("DELETE", e)
    if (!(r.status === 200 || r.status === 204 || r.status === 404))
      throw new Error(`WebDAV DELETE failed with status ${r.status}`)
  }
  async put(e, r, i) {
    let s = {}
    i && (s["Content-Type"] = i)
    let n = await this.request("PUT", e, { headers: s, body: r })
    if (!(n.status === 200 || n.status === 201 || n.status === 204)) {
      if (n.status === 409) {
        let a = e.substring(0, e.lastIndexOf("/"))
        if (
          a &&
          (await this.mkdirAll(a),
          (n = await this.request("PUT", e, { headers: s, body: r })),
          n.status === 200 || n.status === 201 || n.status === 204)
        )
          return
      }
      throw new Error(`WebDAV PUT failed with status ${n.status}`)
    }
  }
  getLink(e) {
    let r = this.buildUrl(e),
      i = new URL(r),
      s = i.pathname + i.search,
      n = this.getAuthHeaders("GET", s)
    return { url: r, headers: n }
  }
}
function Sf(t) {
  let e = { ...(t || {}) }
  return (
    (e.vendor = e.vendor || "other"),
    (e.address = (e.address || "").trim()),
    (e.username = (e.username || "").trim()),
    (e.password = e.password || ""),
    (e.root_folder_path = (e.root_folder_path || "/").trim()),
    e.root_folder_path.startsWith("/") ||
      (e.root_folder_path = "/" + e.root_folder_path),
    (e.tls_insecure_skip_verify = !!e.tls_insecure_skip_verify),
    (e.order_by = e.order_by || "name"),
    (e.order_direction = e.order_direction || "asc"),
    e
  )
}
var _s = class {
  client
  addition
  constructor(e) {
    ;((this.addition = Sf(e)), (this.client = new vs(this.addition)))
  }
  async init() {
    await this.client.init()
  }
  getRemotePath(e) {
    let r = this.addition.root_folder_path || "/"
    return Je(r, e || "/")
  }
  fileItemFromWebdav(e, r) {
    let i = this.client.getLink(r)
    return {
      name: e.name,
      size: e.size,
      is_dir: e.isFolder,
      modified: e.modified,
      sign: e.path || r,
      type: W(e.name, e.isFolder),
      thumb: "",
      raw_url: e.isFolder ? void 0 : i.url,
      raw_url_headers: e.isFolder ? void 0 : i.headers,
    }
  }
  async list(e, r) {
    let i = this.getRemotePath(r),
      n = (await this.client.readDir(i)).map((a) => {
        let o = Je(i, a.name)
        return this.fileItemFromWebdav(a, o)
      })
    return V(
      n,
      this.addition.order_by || "name",
      this.addition.order_direction || "asc",
    )
  }
  async get(e, r) {
    let i = this.getRemotePath(r),
      s = await this.client.stat(i)
    return this.fileItemFromWebdav(s, i)
  }
  async mkdir(e, r) {
    let i = this.getRemotePath(r)
    await this.client.mkdirAll(i)
  }
  async rename(e, r, i) {
    let s = this.getRemotePath(r),
      n = s.lastIndexOf("/"),
      a = n >= 0 ? s.substring(0, n) : "/",
      o = Je(a, i)
    await this.client.move(s, o, !0)
  }
  async move(e, r, i, s, n) {
    let a = this.getRemotePath(s),
      o = this.getRemotePath(n)
    for (let c of i) {
      let d = Je(a, c),
        l = Je(o, c)
      await this.client.move(d, l, !0)
    }
  }
  async copy(e, r, i, s, n) {
    let a = this.getRemotePath(s),
      o = this.getRemotePath(n)
    for (let c of i) {
      let d = Je(a, c),
        l = Je(o, c)
      await this.client.copy(d, l, !0)
    }
  }
  async remove(e, r, i) {
    let s = this.getRemotePath(r)
    if (i && i.length > 0)
      for (let n of i) {
        let a = Je(s, n)
        await this.client.remove(a)
      }
    else await this.client.remove(s)
  }
  async put(e, r, i) {
    let s = this.getRemotePath(r)
    await this.client.put(s, i)
  }
}
xe()
var Be = "1001000021",
  bs = "XFmi9GS2hzk98jGX",
  Wd = "10000001",
  Vd = "https://panservice.mail.wo.cn",
  Un = "https://tjupload.pan.wo.cn",
  $n =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.37"
var dt = "api-user",
  On = "wohome",
  Gd = "wocloud"
var Jd = "AppQueryUser",
  Qd = "AppRefreshToken"
var Xd = "QueryCloudUsageInfo"
var Zd = "ClassifyRule",
  Yd = "GetZoneInfo"
var el = "FamilyUserCurrentEncode",
  tl = "QueryAllFiles"
var rl = "GetDownloadUrlV2"
var il = "CreateDirectory",
  sl = "RenameFileOrDirectory",
  nl = "MoveFile",
  al = "CopyFile",
  ol = "DeleteFile"
var cl = "upload2C"
var qn = {
  name_asc: 1,
  name_desc: 2,
  size_asc: 3,
  size_desc: 4,
  time_asc: 5,
  time_desc: 6,
}
var be = mt(_t(), 1)
var Pf = "wNSOYIB1k1DjY5lA",
  ks = class {
    key = bs
    iv = Pf
    accessKey = ""
    constructor(e) {
      e && this.setAccessToken(e)
    }
    setAccessToken(e) {
      e && e.length >= 16
        ? (this.accessKey = e.slice(0, 16))
        : e && (this.accessKey = e)
    }
    encrypt(e, r) {
      let i = r === dt ? this.key : this.accessKey || this.key,
        s = be.default.enc.Utf8.parse(i),
        n = be.default.enc.Utf8.parse(this.iv)
      return be.default.AES.encrypt(be.default.enc.Utf8.parse(e), s, {
        iv: n,
        mode: be.default.mode.CBC,
        padding: be.default.pad.Pkcs7,
      }).toString()
    }
    decrypt(e, r) {
      let i = r === dt ? this.key : this.accessKey || this.key,
        s = be.default.enc.Utf8.parse(i),
        n = be.default.enc.Utf8.parse(this.iv)
      return be.default.AES.decrypt(e, s, {
        iv: n,
        mode: be.default.mode.CBC,
        padding: be.default.pad.Pkcs7,
      }).toString(be.default.enc.Utf8)
    }
    userEncrypt(e) {
      return this.encrypt(e, dt)
    }
    userDecrypt(e) {
      return this.decrypt(e, dt)
    }
    woHomeEncrypt(e) {
      return this.encrypt(e, "wohome")
    }
    woHomeDecrypt(e) {
      return this.decrypt(e, "wohome")
    }
    calHeader(e, r) {
      let i = Date.now(),
        s = Math.floor(Math.random() * 8999) + 1e5,
        n = "",
        a = be.default.MD5(`${r}${i}${s}${e}${n}`).toString()
      return { key: r, resTime: i, reqSeq: s, channel: e, sign: a, version: n }
    }
  }
function Af(t) {
  let e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    r = ""
  for (let i = 0; i < t; i++)
    r += e.charAt(Math.floor(Math.random() * e.length))
  return r
}
function Cf(t = new Date()) {
  let e = (c) => String(c).padStart(2, "0"),
    r = t.getFullYear(),
    i = e(t.getMonth() + 1),
    s = e(t.getDate()),
    n = e(t.getHours()),
    a = e(t.getMinutes()),
    o = e(t.getSeconds())
  return `${r}${i}${s}${n}${a}${o}`
}
var Ss = class {
  addition
  accessToken
  refreshTokenValue
  phone = ""
  zoneURL = ""
  classifyRuleData = null
  crypto
  onTokenUpdate
  constructor(e, r) {
    ;((this.addition = e),
      (this.accessToken = e.access_token || ""),
      (this.refreshTokenValue = e.refresh_token || ""),
      (this.onTokenUpdate = r),
      (this.crypto = new ks(this.accessToken)))
  }
  getAccessToken() {
    return this.accessToken
  }
  getRefreshToken() {
    return this.refreshTokenValue
  }
  setAccessToken(e) {
    ;((this.accessToken = e), this.crypto.setAccessToken(e))
  }
  setRefreshToken(e) {
    this.refreshTokenValue = e
  }
  async request(e, r, i, s = {}, n = !0) {
    let a = this.crypto.calHeader(e, r),
      o = { ...s }
    if (i != null) {
      let h = JSON.stringify(i),
        y = this.crypto.encrypt(h, e)
      o.param = y
    }
    let c = {
      Origin: "https://pan.wo.cn",
      Referer: "https://pan.wo.cn/",
      "User-Agent": $n,
      "Content-Type": "application/json;charset=UTF-8",
    }
    this.accessToken && (c.Accesstoken = this.accessToken)
    let d = `${Vd}/${e}/dispatcher`,
      l = await fetch(d, {
        method: "POST",
        headers: c,
        body: JSON.stringify({ header: a, body: o }),
      })
    if (!l.ok)
      throw new Error(
        `[WoPan] Request failed with HTTP status: ${l.status} ${l.statusText}`,
      )
    let u = await l.json().catch(() => null)
    if (!u) throw new Error(`[WoPan] Response is not valid JSON from ${r}`)
    if (u.STATUS !== "200")
      throw new Error(
        `[WoPan] Request failed with status: ${u.STATUS}, msg: ${u.MSG || ""}`,
      )
    let p = u.RSP?.RSP_CODE
    if (p !== "0000") {
      if (e !== dt && n && p === "9999")
        return (await this.refreshToken(), this.request(e, r, i, s, !1))
      throw new Error(
        `[WoPan] Request failed with rsp_code: ${p}, rsp_desc: ${u.RSP?.RSP_DESC || ""}`,
      )
    }
    let f = u.RSP?.DATA
    if (f == null) return {}
    if (typeof f == "string") {
      let h = f.trim()
      h.startsWith('"') && h.endsWith('"') && (h = h.slice(1, -1))
      try {
        let y = this.crypto.decrypt(h, e)
        if (y) return JSON.parse(y)
      } catch {
        try {
          return JSON.parse(h)
        } catch {
          return h
        }
      }
    }
    return f
  }
  async requestApiUser(e, r, i = {}) {
    return this.request(dt, e, r, i)
  }
  async requestWoHome(e, r, i = {}) {
    return this.request(On, e, r, i)
  }
  async appRefreshToken() {
    return await this.requestApiUser(
      Qd,
      { refreshToken: this.refreshTokenValue, clientSecret: bs },
      { clientId: Be, secret: !0 },
    )
  }
  async refreshToken() {
    let e = await this.appRefreshToken()
    if (!e.access_token)
      throw new Error("[WoPan] Failed to refresh token: empty access_token")
    ;(this.setAccessToken(e.access_token),
      e.refresh_token && this.setRefreshToken(e.refresh_token),
      this.onTokenUpdate?.(this.accessToken, this.refreshTokenValue))
  }
  async appQueryUser() {
    return this.requestApiUser(
      Jd,
      { accessToken: this.accessToken },
      { clientId: Be, secret: !0 },
    )
  }
  async initPhone() {
    if (this.phone) return
    let e = await this.appQueryUser()
    e?.userId && (this.phone = e.userId)
  }
  async classifyRule() {
    return this.requestWoHome(Zd, {}, { key: !0 })
  }
  async initClassifyRule() {
    if (this.classifyRuleData) return
    let e = await this.classifyRule().catch(() => null)
    e && (this.classifyRuleData = e)
  }
  async getZoneInfo() {
    return this.requestWoHome(Yd, { appId: Wd }, { key: !0 })
  }
  async initZoneURL() {
    if (this.zoneURL) return
    let e = await this.getZoneInfo().catch(() => null)
    this.zoneURL = e?.url || Un
  }
  async familyUserCurrentEncode() {
    return this.requestWoHome(el, { clientId: Be }, { secret: !0 })
  }
  async initData() {
    ;(!this.accessToken &&
      this.refreshTokenValue &&
      (await this.refreshToken()),
      await this.initPhone().catch(() => {}),
      await this.initClassifyRule().catch(() => {}),
      await this.initZoneURL().catch(() => {}))
  }
  getFileType(e) {
    let r = (e.split(".").pop() || "").toLowerCase()
    return r && this.classifyRuleData?.fileTypes?.[r]
      ? this.classifyRuleData.fileTypes[r].type
      : "5"
  }
  async queryAllFiles(e, r, i, s, n, a = "") {
    let o = {
      spaceType: e,
      parentDirectoryId: r,
      pageNum: i,
      pageSize: s,
      sortRule: n,
      clientId: Be,
    }
    return (
      e === "1" && a && (o.familyId = a),
      this.requestWoHome(tl, o, { secret: !0 })
    )
  }
  async getDownloadUrlV2(e) {
    let r = { type: "1", fidList: e, clientId: Be }
    return this.requestWoHome(rl, r, { secret: !0 })
  }
  async createDirectory(e, r, i, s = "") {
    let n = {
      spaceType: e,
      familyId: s,
      parentDirectoryId: r,
      directoryName: i,
      clientId: Be,
    }
    return this.requestWoHome(il, n, { secret: !0 })
  }
  async renameFileOrDirectory(e, r, i, s, n = "") {
    let a = r === 0 ? "0" : this.getFileType(s),
      o = { spaceType: e, type: r, fileType: a, id: i, name: s, clientId: Be }
    ;(e === "1" && n && (o.familyId = n),
      await this.requestWoHome(sl, o, { secret: !0 }))
  }
  async moveFile(e, r, i, s, n, a = "", o = "") {
    let c = {
      targetDirId: i,
      sourceType: s,
      targetType: n,
      dirList: e,
      fileList: r,
      secret: !1,
      clientId: Be,
    }
    ;(s === "1" && a && (c.fromFamilyId = a),
      n === "1" && o && (c.familyId = o),
      await this.requestWoHome(nl, c, { secret: !0 }))
  }
  async copyFile(e, r, i, s, n, a = "", o = "") {
    let c = {
      targetDirId: i,
      sourceType: s,
      targetType: n,
      dirList: e,
      fileList: r,
      secret: !1,
      clientId: Be,
    }
    ;(s === "1" && a && (c.fromFamilyId = a),
      n === "1" && o && (c.familyId = o),
      await this.requestWoHome(al, c, { secret: !0 }))
  }
  async deleteFile(e, r, i) {
    let s = {
      spaceType: e,
      vipLevel: "0",
      dirList: r,
      fileList: i,
      clientId: Be,
    }
    await this.requestWoHome(ol, s, { secret: !0 })
  }
  async queryCloudUsageInfo() {
    return (
      await this.initPhone(),
      this.requestWoHome(
        Xd,
        { phoneNum: this.phone, clientId: Be },
        { secret: !0 },
      )
    )
  }
  async upload2C(e, r, i, s, n = "", a) {
    await this.initZoneURL()
    let c = `${this.zoneURL || Un}/openapi/client/${cl}`,
      d =
        i instanceof Uint8Array
          ? i
          : i instanceof ArrayBuffer
            ? new Uint8Array(i)
            : new Uint8Array(i),
      l = d.length,
      u = Math.max(1, Math.ceil(l / 8388608)),
      p = Cf(),
      f = {
        spaceType: e,
        directoryId: s,
        batchNo: p,
        fileName: r,
        fileSize: l,
        fileType: this.getFileType(r),
      }
    e === "1" && n && (f.familyId = n)
    let h = this.crypto.encrypt(JSON.stringify(f), On),
      y = `${Date.now()}_${Af(6)}`,
      x = 0,
      g = ""
    for (let m = 1; m <= u; m++) {
      let w = (m - 1) * 8388608,
        v = m === u ? l - w : 8388608,
        _ = d.subarray(w, w + v),
        b = new FormData()
      ;(b.append("uniqueId", y),
        b.append("accessToken", this.accessToken),
        b.append("fileName", r),
        b.append("psToken", "undefined"),
        b.append("fileSize", String(l)),
        b.append("totalPart", String(u)),
        b.append("channel", Gd),
        b.append("directoryId", s),
        b.append("fileInfo", h),
        b.append("partSize", String(v)),
        b.append("partIndex", String(m)))
      let P = new Blob(
        [_.buffer.slice(_.byteOffset, _.byteOffset + _.byteLength)],
        { type: "application/octet-stream" },
      )
      b.append("file", P, r)
      let E = await fetch(c, {
        method: "POST",
        headers: {
          Origin: "https://pan.wo.cn",
          Referer: "https://pan.wo.cn/",
          "User-Agent": $n,
        },
        body: b,
      })
      if (!E.ok)
        throw new Error(
          `[WoPan] Upload part ${m}/${u} failed with HTTP status: ${E.status}`,
        )
      let S = await E.json().catch(() => ({}))
      if (S.code !== "0000")
        throw new Error(
          `[WoPan] Upload part ${m}/${u} failed: ${S.code} ${S.msg || ""}`,
        )
      ;(S.data?.fid && (g = S.data.fid), (x += v), a?.(x, l))
    }
    return g
  }
}
function Df(t) {
  if (!t) return new Date().toISOString()
  if (t.length >= 14) {
    let e = t.slice(0, 4),
      r = t.slice(4, 6),
      i = t.slice(6, 8),
      s = t.slice(8, 10),
      n = t.slice(10, 12),
      a = t.slice(12, 14),
      o = `${e}-${r}-${i}T${s}:${n}:${a}+08:00`,
      c = new Date(o)
    if (!isNaN(c.getTime())) return c.toISOString()
  }
  try {
    let e = new Date(t)
    if (!isNaN(e.getTime())) return e.toISOString()
  } catch {}
  return new Date().toISOString()
}
function dl(t) {
  let e = t.type === 0
  return {
    name: t.name,
    size: t.size || 0,
    is_dir: e,
    modified: Df(t.createTime),
    sign: t.fid || t.id,
    type: W(t.name, e),
    thumb: t.thumbUrl || "",
    raw_url: "",
  }
}
function zn(t) {
  let e = { ...(t || {}) }
  return (
    (e.root_folder_id = e.root_folder_id || "0"),
    (e.refresh_token = (e.refresh_token || "").trim()),
    (e.family_id = (e.family_id || "").trim()),
    (e.sort_rule = e.sort_rule || "name_asc"),
    (e.access_token = (e.access_token || "").trim()),
    e
  )
}
var Ps = class {
  client
  addition
  defaultFamilyId = ""
  pathFileMapCache = new Map()
  pathFolderIdCache = new Map()
  constructor(e, r) {
    ;((this.addition = zn(e)),
      (this.client = new Ss(this.addition, (i, s) => {
        ;((this.addition.access_token = i),
          (this.addition.refresh_token = s),
          r?.(i, s))
      })))
  }
  getSpaceType() {
    return this.addition.family_id ? "1" : "0"
  }
  getFamilyId() {
    return this.addition.family_id || this.defaultFamilyId
  }
  getSortRuleNum() {
    let e = this.addition.sort_rule || "name_asc"
    return qn[e] || qn.name_asc
  }
  getRootId() {
    return this.addition.root_folder_id || "0"
  }
  async init() {
    await this.client.initData()
    let e = await this.client.familyUserCurrentEncode().catch(() => null)
    e?.defaultHomeId !== void 0 &&
      e.defaultHomeId !== null &&
      (this.defaultFamilyId = String(e.defaultHomeId))
  }
  async list(e, r) {
    let i = await this.resolveFolderId(r),
      s = await this.fetchFolderFiles(i),
      n = r.split("/").filter(Boolean).join("/")
    for (let o of s) {
      let c = n ? `${n}/${o.name}` : o.name
      ;(this.pathFileMapCache.set(c, o),
        o.type === 0 && this.pathFolderIdCache.set(c, o.id))
    }
    let a = s.map(dl)
    return V(a, this.addition.order_by, this.addition.order_direction)
  }
  async get(e, r) {
    let i = r.split("/").filter(Boolean).join("/")
    if (!i)
      return {
        name: "root",
        size: 0,
        is_dir: !0,
        modified: new Date().toISOString(),
        sign: this.getRootId(),
        type: 1,
        raw_url: "",
      }
    let s = await this.resolveWoPanFile(r)
    if (!s) {
      let a = await this.resolveFolderId(r).catch(() => null)
      if (a) {
        let o = i.split("/")
        return {
          name: o[o.length - 1] || "root",
          size: 0,
          is_dir: !0,
          modified: new Date().toISOString(),
          sign: a,
          type: 1,
          raw_url: "",
        }
      }
      throw new Error(`[WoPan] File not found: ${r}`)
    }
    let n = dl(s)
    if (!n.is_dir && s.fid) {
      let a = await this.client.getDownloadUrlV2([s.fid]).catch(() => null)
      a?.list?.[0]?.downloadUrl && (n.raw_url = a.list[0].downloadUrl)
    }
    return n
  }
  async mkdir(e, r) {
    let i = r.split("/").filter(Boolean),
      s = i.pop() || "\u65B0\u6587\u4EF6\u5939",
      n = i.join("/"),
      a = await this.resolveFolderId(n)
    ;(await this.client.createDirectory(
      this.getSpaceType(),
      a,
      s,
      this.getFamilyId(),
    ),
      this.clearCache())
  }
  async rename(e, r, i) {
    let s = await this.resolveWoPanFile(r)
    if (!s) throw new Error(`[WoPan] Item not found for rename: ${r}`)
    ;(await this.client.renameFileOrDirectory(
      this.getSpaceType(),
      s.type,
      s.id,
      i,
      this.getFamilyId(),
    ),
      this.clearCache())
  }
  async remove(e, r, i) {
    let s = await this.resolveWoPanFile(r)
    if (!s) throw new Error(`[WoPan] Item not found for deletion: ${r}`)
    let n = [],
      a = []
    ;(s.type === 0 ? n.push(s.id) : a.push(s.id),
      await this.client.deleteFile(this.getSpaceType(), n, a),
      this.clearCache())
  }
  async move(e, r, i, s, n) {
    let a = await this.resolveWoPanFile(s)
    if (!a) throw new Error(`[WoPan] Source item not found for move: ${s}`)
    let o = await this.resolveFolderId(r),
      c = [],
      d = []
    ;(a.type === 0 ? c.push(a.id) : d.push(a.id),
      await this.client.moveFile(
        c,
        d,
        o,
        this.getSpaceType(),
        this.getSpaceType(),
        this.getFamilyId(),
        this.getFamilyId(),
      ),
      this.clearCache())
  }
  async copy(e, r, i, s, n) {
    let a = await this.resolveWoPanFile(s)
    if (!a) throw new Error(`[WoPan] Source item not found for copy: ${s}`)
    let o = await this.resolveFolderId(r),
      c = [],
      d = []
    ;(a.type === 0 ? c.push(a.id) : d.push(a.id),
      await this.client.copyFile(
        c,
        d,
        o,
        this.getSpaceType(),
        this.getSpaceType(),
        this.getFamilyId(),
        this.getFamilyId(),
      ),
      this.clearCache())
  }
  async put(e, r, i) {
    let s = r.split("/").filter(Boolean),
      n = s.pop() || "upload",
      a = s.join("/"),
      o = await this.resolveFolderId(a)
    ;(await this.client.upload2C(
      this.getSpaceType(),
      n,
      i,
      o,
      this.getFamilyId(),
    ),
      this.clearCache())
  }
  clearCache() {
    ;(this.pathFileMapCache.clear(), this.pathFolderIdCache.clear())
  }
  async fetchFolderFiles(e) {
    let r = [],
      i = 0,
      s = 100
    for (;;) {
      let a =
        (
          await this.client.queryAllFiles(
            this.getSpaceType(),
            e,
            i,
            s,
            this.getSortRuleNum(),
            this.getFamilyId(),
          )
        )?.files || []
      if ((r.push(...a), a.length < s)) break
      i++
    }
    return r
  }
  async resolveFolderId(e) {
    let r = e.split("/").filter(Boolean).join("/")
    if (!r) return this.getRootId()
    if (this.pathFolderIdCache.has(r)) return this.pathFolderIdCache.get(r)
    let i = r.split("/"),
      s = this.getRootId()
    for (let n = 0; n < i.length; n++) {
      let a = i[n],
        o = (() => {
          try {
            return decodeURIComponent(a)
          } catch {
            return a
          }
        })(),
        c = i.slice(0, n + 1).join("/")
      if (this.pathFolderIdCache.has(c)) {
        s = this.pathFolderIdCache.get(c)
        continue
      }
      let d = await this.fetchFolderFiles(s)
      for (let u of d) {
        let p = i.slice(0, n).concat(u.name).join("/")
        ;(this.pathFileMapCache.set(p, u),
          u.type === 0 && this.pathFolderIdCache.set(p, u.id))
      }
      let l = d.find(
        (u) => u.type === 0 && (u.name === a || u.name === o || u.id === a),
      )
      if (!l)
        throw new Error(`[WoPan] Directory '${a}' not found in path '${e}'`)
      ;((s = l.id), this.pathFolderIdCache.set(c, s))
    }
    return s
  }
  async resolveWoPanFile(e) {
    let r = e.split("/").filter(Boolean).join("/")
    if (!r) return null
    if (this.pathFileMapCache.has(r)) return this.pathFileMapCache.get(r)
    let i = r.split("/"),
      s = i.pop(),
      n = (() => {
        try {
          return decodeURIComponent(s)
        } catch {
          return s
        }
      })(),
      a = i.join("/"),
      o = await this.resolveFolderId(a),
      c = await this.fetchFolderFiles(o)
    for (let l of c) {
      let u = i.concat(l.name).join("/")
      ;(this.pathFileMapCache.set(u, l),
        l.type === 0 && this.pathFolderIdCache.set(u, l.id))
    }
    return (
      c.find(
        (l) => l.name === s || l.name === n || l.id === s || l.fid === s,
      ) || null
    )
  }
}
xe()
var Tf = new TextEncoder()
function Cr(t) {
  return typeof t == "string" ? Tf.encode(t) : t
}
function Nn(t) {
  let e = t instanceof Uint8Array ? t : new Uint8Array(t),
    r = ""
  for (let i = 0; i < e.length; i++) r += e[i].toString(16).padStart(2, "0")
  return r
}
async function Ln(t) {
  let e = await crypto.subtle.digest("SHA-256", Cr(t))
  return Nn(e)
}
async function Ar(t, e) {
  let r = await crypto.subtle.importKey(
      "raw",
      Cr(t),
      { name: "HMAC", hash: "SHA-256" },
      !1,
      ["sign"],
    ),
    i = await crypto.subtle.sign("HMAC", r, Cr(e))
  return new Uint8Array(i)
}
async function ll(t, e) {
  let r = await Ar(t, e)
  return Nn(r)
}
async function Ff(t, e) {
  let r = await crypto.subtle.importKey(
      "raw",
      Cr(t),
      { name: "HMAC", hash: "SHA-1" },
      !1,
      ["sign"],
    ),
    i = await crypto.subtle.sign("HMAC", r, Cr(e))
  return Nn(i)
}
function Pt(t, e = !0) {
  let r = encodeURIComponent(t).replace(
    /[!'()*]/g,
    (i) => "%" + i.charCodeAt(0).toString(16).toUpperCase(),
  )
  return (e || (r = r.replace(/%2F/g, "/")), r)
}
function ul(t = new Date()) {
  let e = (l) => l.toString().padStart(2, "0"),
    r = t.getUTCFullYear(),
    i = e(t.getUTCMonth() + 1),
    s = e(t.getUTCDate()),
    n = e(t.getUTCHours()),
    a = e(t.getUTCMinutes()),
    o = e(t.getUTCSeconds()),
    c = `${r}${i}${s}`
  return { amzDate: `${c}T${n}${a}${o}Z`, dateStamp: c }
}
async function pl(t, e, r, i = "s3") {
  let s = "AWS4" + t,
    n = await Ar(s, e),
    a = await Ar(n, r),
    o = await Ar(a, i)
  return await Ar(o, "aws4_request")
}
async function fl(t) {
  let {
      method: e,
      url: r,
      region: i,
      accessKeyId: s,
      secretAccessKey: n,
      sessionToken: a,
      headers: o = {},
      body: c = null,
      service: d = "s3",
      date: l = new Date(),
    } = t,
    u = new URL(r),
    { amzDate: p, dateStamp: f } = ul(l),
    h =
      c != null
        ? await Ln(c)
        : "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    y = { ...o }
  ;((y.host = u.host),
    (y["x-amz-date"] = p),
    (y["x-amz-content-sha256"] = h),
    a && (y["x-amz-security-token"] = a))
  let x = Object.keys(y)
      .map((A) => A.toLowerCase())
      .sort(),
    g = ""
  for (let A of x) {
    let O = (Object.entries(y).find(([j]) => j.toLowerCase() === A)?.[1] || "")
      .trim()
      .replace(/\s+/g, " ")
    g += `${A}:${O}
`
  }
  let m = x.join(";"),
    v = u.pathname || "/",
    _ = []
  ;(u.searchParams.forEach((A, $) => {
    _.push([$, A])
  }),
    _.sort(([A], [$]) => (A < $ ? -1 : A > $ ? 1 : 0)))
  let b = _.map(([A, $]) => `${Pt(A)}=${Pt($)}`).join("&"),
    P = [e.toUpperCase(), v, b, g, m, h].join(`
`),
    E = `${f}/${i}/${d}/aws4_request`,
    S = await Ln(P),
    D = ["AWS4-HMAC-SHA256", p, E, S].join(`
`),
    k = await pl(n, f, i, d),
    C = await ll(k, D),
    F = `AWS4-HMAC-SHA256 Credential=${s}/${E}, SignedHeaders=${m}, Signature=${C}`
  return ((y.authorization = F), { headers: y, url: u.toString() })
}
async function As(t) {
  let {
      method: e = "GET",
      url: r,
      region: i,
      accessKeyId: s,
      secretAccessKey: n,
      sessionToken: a,
      expiresInSeconds: o = 14400,
      service: c = "s3",
      date: d = new Date(),
      customQueryParams: l = {},
    } = t,
    u = new URL(r),
    { amzDate: p, dateStamp: f } = ul(d),
    h = `${f}/${i}/${c}/aws4_request`
  ;(u.searchParams.set("X-Amz-Algorithm", "AWS4-HMAC-SHA256"),
    u.searchParams.set("X-Amz-Credential", `${s}/${h}`),
    u.searchParams.set("X-Amz-Date", p),
    u.searchParams.set("X-Amz-Expires", o.toString()),
    u.searchParams.set("X-Amz-SignedHeaders", "host"),
    a && u.searchParams.set("X-Amz-Security-Token", a))
  for (let [C, F] of Object.entries(l)) u.searchParams.set(C, F)
  let x = u.pathname || "/",
    g = []
  ;(u.searchParams.forEach((C, F) => {
    F.toLowerCase() !== "x-amz-signature" && g.push([F, C])
  }),
    g.sort(([C], [F]) => (C < F ? -1 : C > F ? 1 : 0)))
  let m = g.map(([C, F]) => `${Pt(C)}=${Pt(F)}`).join("&"),
    v = `host:${u.host}
`,
    P = [e.toUpperCase(), x, m, v, "host", "UNSIGNED-PAYLOAD"].join(`
`),
    E = await Ln(P),
    S = ["AWS4-HMAC-SHA256", p, h, E].join(`
`),
    D = await pl(n, f, i, c),
    k = await ll(D, S)
  return (u.searchParams.set("X-Amz-Signature", k), u.toString())
}
async function hl(t, e) {
  let r = "/auth/tmp_token.json",
    i = JSON.stringify({ channel: "OSS_FULL", scopes: ["*"] }),
    s =
      r +
      `
` +
      i,
    n = await Ff(e, s),
    a = `TOKEN ${t}:${n}`,
    o = await fetch("https://api.dogecloud.com" + r, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: a },
      body: i,
    })
  if (!o.ok)
    throw new Error(`DogeCloud tmp_token request failed with HTTP ${o.status}`)
  let c = await o.json()
  if (c.code !== 200 || !c.data || !c.data.Credentials)
    throw new Error(
      `DogeCloud tmp_token error (${c.code}): ${c.msg || "unknown"}`,
    )
  return {
    accessKeyId: c.data.Credentials.accessKeyId,
    secretAccessKey: c.data.Credentials.secretAccessKey,
    sessionToken: c.data.Credentials.sessionToken,
    expiredAt: c.data.ExpiredAt,
  }
}
var If = 5 * 1e3 * 1e3 * 1e3,
  Rf = 100 * 1024 * 1024,
  Bf = 5 * 1024 * 1024 * 1024,
  Uf = 1e4
function ue(...t) {
  return t
    .map((e) => e.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/")
}
function ve(t, e = !1) {
  let r = (t || "").replace(/^\/+/, "")
  return (r && e && !r.endsWith("/") && (r += "/"), r)
}
function At(t) {
  return t && t.trim() ? t.trim() : ".openlist"
}
function Xe(t) {
  let e = t.replace(/\/+$/, ""),
    r = e.lastIndexOf("/")
  return r >= 0 ? e.substring(r + 1) : e
}
function Mn(t) {
  let e = t.replace(/\/+$/, ""),
    r = e.lastIndexOf("/")
  return r >= 0 ? e.substring(0, r) : ""
}
function ml(t, e) {
  let r = ("/" + t + "/").replace(/\/+/g, "/")
  return ("/" + e + "/").replace(/\/+/g, "/").startsWith(r)
}
function Y(t, e) {
  let r = t.match(new RegExp(`<${e}[^>]*>([\\s\\S]*?)<\\/${e}>`, "i"))
  return r ? r[1].trim() : void 0
}
function Er(t, e) {
  let r = [],
    i = new RegExp(`<${e}[^>]*>([\\s\\S]*?)<\\/${e}>`, "gi"),
    s
  for (; (s = i.exec(t)) !== null; ) r.push(s[1])
  return r
}
function lt(t) {
  return t
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}
function me(t, e) {
  let r = Y(t, "Code") || "Unknown",
    i = Y(t, "Message") || t || `HTTP ${e}`,
    s = new Error(`S3 Error [${r}]: ${lt(i)} (status ${e})`)
  return ((s.code = r), (s.status = e), s)
}
function $f(t, e, r, i = !1) {
  let s = [],
    n = At(r),
    a = Er(t, "CommonPrefixes")
  for (let l of a) {
    let u = Y(l, "Prefix")
    if (u) {
      let p = lt(u),
        f = Xe(p)
      f &&
        s.push({
          name: f,
          size: 0,
          isFolder: !0,
          modified: new Date().toISOString(),
          path: ue(e, f),
        })
    }
  }
  let o = Er(t, "Contents")
  for (let l of o) {
    let u = Y(l, "Key")
    if (!u) continue
    let p = lt(u)
    if (p.endsWith("/")) continue
    let f = Xe(p)
    if (!i && (f === n || f === r)) continue
    let h = parseInt(Y(l, "Size") || "0", 10),
      y = Y(l, "LastModified") || new Date().toISOString(),
      x = Y(l, "ETag")?.replace(/"/g, "")
    s.push({
      name: f,
      size: h,
      isFolder: !1,
      modified: y,
      path: ue(e, f),
      etag: x,
    })
  }
  let c = Y(t, "IsTruncated") === "true",
    d = Y(t, "NextMarker")
  return {
    files: s,
    isTruncated: c,
    nextMarker: d,
    lastEvaluatedKey: s.length > 0 ? s[s.length - 1].path : void 0,
  }
}
function Of(t, e, r, i = !1) {
  let s = [],
    n = At(r),
    a = Er(t, "CommonPrefixes")
  for (let l of a) {
    let u = Y(l, "Prefix")
    if (u) {
      let p = lt(u),
        f = Xe(p)
      f &&
        s.push({
          name: f,
          size: 0,
          isFolder: !0,
          modified: new Date().toISOString(),
          path: ue(e, f),
        })
    }
  }
  let o = Er(t, "Contents")
  for (let l of o) {
    let u = Y(l, "Key")
    if (!u) continue
    let p = lt(u)
    if (p.endsWith("/")) continue
    let f = Xe(p)
    if (!i && (f === n || f === r)) continue
    let h = parseInt(Y(l, "Size") || "0", 10),
      y = Y(l, "LastModified") || new Date().toISOString(),
      x = Y(l, "ETag")?.replace(/"/g, "")
    s.push({
      name: f,
      size: h,
      isFolder: !1,
      modified: y,
      path: ue(e, f),
      etag: x,
    })
  }
  let c = Y(t, "IsTruncated") === "true",
    d = Y(t, "NextContinuationToken")
  return {
    files: s,
    isTruncated: c,
    nextContinuationToken: d,
    lastEvaluatedKey: s.length > 0 ? s[s.length - 1].path : void 0,
  }
}
function gl(t) {
  let e = Y(t, "UploadId")
  if (!e)
    throw new Error("InitiateMultipartUpload returned empty UploadId: " + t)
  return lt(e)
}
function qf(t) {
  let e = Y(t, "ETag")
  if (!e) throw new Error("UploadPartCopy returned empty ETag: " + t)
  return lt(e).replace(/"/g, "")
}
function jf(t) {
  let e = Math.max(Rf, Math.floor((t - 1) / Uf) + 1)
  if (e > Bf) throw new Error(`Object size ${t} exceeds multipart copy limit`)
  return e
}
var Cs = class {
  addition
  bucket
  endpoint
  region
  accessKeyId
  secretAccessKey
  sessionToken
  isPathStyle
  userAgent
  budget = { used: 0, limit: 45 }
  constructor(e) {
    ;((this.addition = e), (this.bucket = (e.bucket || "").trim()))
    let r = (e.endpoint || "").trim()
    ;(!r.startsWith("http://") &&
      !r.startsWith("https://") &&
      (r = "https://" + r),
      (this.endpoint = r.replace(/\/+$/, "")),
      (this.region = (e.region || "").trim() || "openlist"),
      (this.accessKeyId = (e.access_key_id || "").trim()),
      (this.secretAccessKey = (e.secret_access_key || "").trim()),
      (this.sessionToken = e.session_token ? e.session_token.trim() : void 0),
      (this.userAgent = e.user_agent ? e.user_agent.trim() : void 0))
    let i = new URL(this.endpoint),
      s =
        /^(\d{1,3}\.){3}\d{1,3}$/.test(i.hostname) || i.hostname === "localhost"
    this.isPathStyle = !!e.force_path_style || s
  }
  updateCredentials(e) {
    ;((this.accessKeyId = e.accessKeyId),
      (this.secretAccessKey = e.secretAccessKey),
      (this.sessionToken = e.sessionToken))
  }
  updateBudget(e) {
    this.budget = e
  }
  reserve() {
    return this.budget.used >= this.budget.limit ? !1 : (this.budget.used++, !0)
  }
  getUrl(e = "", r) {
    let i = new URL(this.endpoint),
      s = "",
      n = e ? ve(e, !1) : ""
    if (this.isPathStyle) {
      let c = [i.pathname.replace(/\/+$/, ""), this.bucket, n]
        .filter(Boolean)
        .join("/")
      ;((i.pathname = "/" + c.replace(/^\/+/, "")), (s = i.toString()))
    } else {
      let o = i.host.split(":"),
        c = o[1] ? `:${o[1]}` : "",
        d = `${this.bucket}.${o[0]}${c}`
      i.host = d
      let u = [i.pathname.replace(/\/+$/, ""), n].filter(Boolean).join("/")
      ;((i.pathname = "/" + u.replace(/^\/+/, "")), (s = i.toString()))
    }
    let a = new URL(s)
    if (r)
      for (let [o, c] of Object.entries(r))
        c != null && a.searchParams.set(o, c)
    return a.toString()
  }
  async fetch(e, r, i = null, s = {}) {
    if (!this.reserve())
      throw new Error(
        `[S3] \u5DF2\u8FBE Cloudflare Workers \u5B50\u8BF7\u6C42\u4E0A\u9650(${this.budget.limit})\uFF0C\u8BF7\u51CF\u5C11\u5355\u6B21\u64CD\u4F5C\u7684\u6587\u4EF6\u6570\u91CF\u6216\u5206\u6279\u64CD\u4F5C`,
      )
    let n = { ...s }
    this.userAgent && (n["user-agent"] = this.userAgent)
    let { headers: a } = await fl({
        method: e,
        url: r,
        region: this.region,
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
        sessionToken: this.sessionToken,
        headers: n,
        body: i,
      }),
      o = { method: e, headers: a }
    return (
      i != null && e !== "GET" && e !== "HEAD" && (o.body = i),
      await fetch(r, o)
    )
  }
  async listObjects(e, r = "v1", i = !1) {
    let s = ve(e, !0),
      n = [],
      a = this.addition.placeholder || ""
    if (r === "v2") {
      let o, c
      for (;;) {
        let d = { "list-type": "2", prefix: s, delimiter: "/" }
        ;(o && (d["continuation-token"] = o), c && (d["start-after"] = c))
        let l = this.getUrl("", d),
          u = await this.fetch("GET", l),
          p = await u.text()
        if (!u.ok) throw me(p, u.status)
        let f = Of(p, e, a, i)
        if ((n.push(...f.files), !f.isTruncated)) break
        if (f.nextContinuationToken) {
          o = f.nextContinuationToken
          continue
        }
        if (f.files.length === 0) break
        c = f.lastEvaluatedKey
      }
    } else {
      let o
      for (;;) {
        let c = { prefix: s, delimiter: "/" }
        o && (c.marker = o)
        let d = this.getUrl("", c),
          l = await this.fetch("GET", d),
          u = await l.text()
        if (!l.ok) throw me(u, l.status)
        let p = $f(u, e, a, i)
        if ((n.push(...p.files), !p.isTruncated)) break
        if (p.nextMarker) o = p.nextMarker
        else if (p.files.length > 0) o = p.files[p.files.length - 1].path
        else break
      }
    }
    return n
  }
  async headObject(e) {
    let r = this.getUrl(e),
      i = await this.fetch("HEAD", r)
    if (i.status === 404) return null
    if (!i.ok) {
      let o = await i.text().catch(() => "")
      throw me(o, i.status)
    }
    let s = parseInt(i.headers.get("content-length") || "0", 10),
      n = i.headers.get("last-modified") || new Date().toISOString(),
      a = (i.headers.get("etag") || "").replace(/"/g, "")
    return { size: s, modified: n, etag: a }
  }
  async listPrefixProbe(e, r = "v1") {
    let s = { prefix: ve(e, !0), "max-keys": "1" }
    r === "v2" && (s["list-type"] = "2")
    let n = this.getUrl("", s),
      a = await this.fetch("GET", n)
    if (!a.ok) return !1
    let o = await a.text()
    return o.includes("<Contents>") || o.includes("<CommonPrefixes>")
  }
  async putObject(e, r, i = "application/octet-stream") {
    let s = this.getUrl(e),
      n = { "content-type": i },
      a = await this.fetch("PUT", s, r, n)
    if (!a.ok) {
      let o = await a.text().catch(() => "")
      throw me(o, a.status)
    }
  }
  async deleteObject(e) {
    let r = this.getUrl(e),
      i = await this.fetch("DELETE", r)
    if (!i.ok && i.status !== 404 && i.status !== 204) {
      let s = await i.text().catch(() => "")
      throw me(s, i.status)
    }
  }
  async listAllObjects(e, r = "v1") {
    let i = ve(e, !0),
      s = At(this.addition.placeholder || ""),
      n = [],
      a = (o) => {
        for (let c of Er(o, "Contents")) {
          let d = Y(c, "Key")
          if (!d) continue
          let l = lt(d)
          if (l.endsWith("/") || Xe(l) === s) continue
          let p = parseInt(Y(c, "Size") || "0", 10)
          n.push({ key: l, size: p })
        }
      }
    if (r === "v2") {
      let o
      for (;;) {
        let c = { "list-type": "2", prefix: i }
        o && (c["continuation-token"] = o)
        let d = this.getUrl("", c),
          l = await this.fetch("GET", d),
          u = await l.text()
        if (!l.ok) throw me(u, l.status)
        a(u)
        let p = Y(u, "IsTruncated") === "true",
          f = Y(u, "NextContinuationToken")
        if (!p) break
        if (f) {
          o = f
          continue
        }
        if (n.length === 0) break
      }
    } else {
      let o
      for (;;) {
        let c = { prefix: i }
        o && (c.marker = o)
        let d = this.getUrl("", c),
          l = await this.fetch("GET", d),
          u = await l.text()
        if (!l.ok) throw me(u, l.status)
        a(u)
        let p = Y(u, "IsTruncated") === "true",
          f = Y(u, "NextMarker")
        if (!p) break
        if (f) o = f
        else if (n.length > 0) o = n[n.length - 1].key
        else break
      }
    }
    return n
  }
  async deleteObjects(e) {
    if (!e.length) return
    let r = (i) =>
      i.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    for (let i = 0; i < e.length; i += 1e3) {
      let n = [
          "<Delete>",
          ...e
            .slice(i, i + 1e3)
            .map((c) => `<Object><Key>${r(c)}</Key></Object>`),
          "</Delete>",
        ].join(""),
        a = this.getUrl("", { delete: "" }),
        o = await this.fetch("POST", a, n, {
          "content-type": "application/xml",
        })
      if (!o.ok) {
        let c = await o.text().catch(() => "")
        throw me(c, o.status)
      }
    }
  }
  async copyObject(e, r, i) {
    if (i !== void 0 && i > If) return this.copyMultipart(e, r, i)
    let s = ve(e, !1),
      n = ve(r, !1),
      a = Pt(`${this.bucket}/${s}`, !1),
      o = this.getUrl(n),
      c = { "x-amz-copy-source": a },
      d = await this.fetch("PUT", o, null, c)
    if (!d.ok) {
      let l = await d.text().catch(() => "")
      throw me(l, d.status)
    }
  }
  async copyMultipart(e, r, i) {
    let s = ve(e, !1),
      n = ve(r, !1),
      a = Pt(`${this.bucket}/${s}`, !1),
      o = this.getUrl(n, { uploads: "" }),
      c = await this.fetch("POST", o),
      d = await c.text()
    if (!c.ok) throw me(d, c.status)
    let l = gl(d),
      u = jf(i),
      p = []
    try {
      let f = 0,
        h = 1
      for (; f < i; ) {
        let m = Math.min(f + u, i) - 1,
          w = this.getUrl(n, { partNumber: h.toString(), uploadId: l }),
          v = {
            "x-amz-copy-source": a,
            "x-amz-copy-source-range": `bytes=${f}-${m}`,
          },
          _ = await this.fetch("PUT", w, null, v),
          b = await _.text()
        if (!_.ok) throw me(b, _.status)
        let P = qf(b)
        ;(p.push({ partNumber: h, etag: P }), (f += u), h++)
      }
      let y = this.getUrl(n, { uploadId: l }),
        x = [
          "<CompleteMultipartUpload>",
          ...p.map(
            (m) =>
              `<Part><PartNumber>${m.partNumber}</PartNumber><ETag>${m.etag}</ETag></Part>`,
          ),
          "</CompleteMultipartUpload>",
        ].join(""),
        g = await this.fetch("POST", y, x, {
          "content-type": "application/xml",
        })
      if (!g.ok) {
        let m = await g.text().catch(() => "")
        throw me(m, g.status)
      }
    } catch (f) {
      let h = this.getUrl(n, { uploadId: l })
      throw (await this.fetch("DELETE", h).catch(() => {}), f)
    }
  }
  async getObject(e, r) {
    let i = this.getUrl(e),
      s = {}
    r &&
      (s.range =
        r.end !== void 0 ? `bytes=${r.start}-${r.end}` : `bytes=${r.start}-`)
    let n = await this.fetch("GET", i, null, s)
    if (!n.ok) {
      let a = await n.text().catch(() => "")
      throw me(a, n.status)
    }
    return n
  }
  async multipartUpload(e, r, i = {}) {
    let s = ve(e, !1),
      n = i.partSize || 8 * 1024 * 1024,
      a = this.getUrl(s, { uploads: "" }),
      o = await this.fetch("POST", a),
      c = await o.text()
    if (!o.ok) throw me(c, o.status)
    let d = gl(c),
      l = [],
      u = r.getReader(),
      p = new Uint8Array(n),
      f = 0,
      h = 1,
      y = async () => {
        if (f === 0) return
        let x = f === p.length ? p : p.slice(0, f),
          g = this.getUrl(s, { partNumber: h.toString(), uploadId: d }),
          m = await this.fetch("PUT", g, x, {
            "content-type": "application/octet-stream",
          })
        if (!m.ok) {
          let v = await m.text().catch(() => "")
          throw me(v, m.status)
        }
        let w = (m.headers.get("etag") || "").replace(/"/g, "")
        ;(l.push({ partNumber: h, etag: w }), h++, (f = 0))
      }
    try {
      for (;;) {
        let { done: w, value: v } = await u.read()
        if (w) break
        i.onPart && v && i.onPart(v)
        let _ = 0
        for (; _ < v.length; ) {
          let b = p.length - f,
            P = Math.min(b, v.length - _)
          ;(p.set(v.subarray(_, _ + P), f),
            (f += P),
            (_ += P),
            f === p.length && (await y()))
        }
      }
      await y()
      let x = this.getUrl(s, { uploadId: d }),
        g = [
          "<CompleteMultipartUpload>",
          ...l.map(
            (w) =>
              `<Part><PartNumber>${w.partNumber}</PartNumber><ETag>${w.etag}</ETag></Part>`,
          ),
          "</CompleteMultipartUpload>",
        ].join(""),
        m = await this.fetch("POST", x, g, {
          "content-type": "application/xml",
        })
      if (!m.ok) {
        let w = await m.text().catch(() => "")
        throw me(w, m.status)
      }
    } catch (x) {
      await u.cancel().catch(() => {})
      let g = this.getUrl(s, { uploadId: d })
      throw (await this.fetch("DELETE", g).catch(() => {}), x)
    }
  }
  async getLink(e, r, i = 4, s = "", n = !1, a = !1, o = !1) {
    let c = ve(e, !1),
      d = Math.max(60, Math.floor(i * 3600)),
      l = this.getUrl(c),
      u = {}
    if (!s) {
      let f = `attachment; filename*=UTF-8''${encodeURIComponent(r)}`
      ;(o &&
        (f = `attachment; filename="${encodeURIComponent(r)}"; filename*=UTF-8''${encodeURIComponent(r)}`),
        (u["response-content-disposition"] = f))
    }
    if (s)
      if (n) {
        let f = await As({
            url: l,
            region: this.region,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
            sessionToken: this.sessionToken,
            expiresInSeconds: d,
            customQueryParams: u,
          }),
          h = new URL(f),
          y = s.split("://")
        if (
          (y.length === 2 && (y[0] === "http" || y[0] === "https")
            ? ((h.protocol = y[0] + ":"), (h.host = y[1].replace(/\/+$/, "")))
            : (h.host = s.replace(/\/+$/, "")),
          a)
        ) {
          let x = "/" + this.bucket
          if (h.pathname.startsWith(x)) {
            let g = h.pathname.substring(x.length)
            ;(g || (g = "/"), (h.pathname = g))
          }
        }
        return { url: h.toString() }
      } else {
        let f = s.split("://"),
          h = "https",
          y = s
        f.length === 2 &&
          (f[0] === "http" || f[0] === "https") &&
          ((h = f[0]), (y = f[1].replace(/\/+$/, "")))
        let x = this.isPathStyle ? `/${this.bucket}/${c}` : `/${c}`
        return (
          a &&
            x.startsWith(`/${this.bucket}`) &&
            ((x = x.substring(`/${this.bucket}`.length)), x || (x = "/")),
          { url: `${h}://${y}${x.startsWith("/") ? "" : "/"}${x}` }
        )
      }
    return {
      url: await As({
        url: l,
        region: this.region,
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
        sessionToken: this.sessionToken,
        expiresInSeconds: d,
        customQueryParams: u,
      }),
    }
  }
  async getDirectUploadInfo(e, r, i = 4, s = "") {
    let n = ue(e, r),
      a = ve(n, !1),
      o = Math.max(60, Math.floor(i * 3600)),
      c = this.getUrl(a)
    if (s) {
      let l = new URL(c),
        u = s.split("://")
      ;(u.length === 2 && (u[0] === "http" || u[0] === "https")
        ? ((l.protocol = u[0] + ":"), (l.host = u[1].replace(/\/+$/, "")))
        : (l.host = s.replace(/\/+$/, "")),
        (c = l.toString()))
    }
    return {
      upload_url: await As({
        method: "PUT",
        url: c,
        region: this.region,
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
        sessionToken: this.sessionToken,
        expiresInSeconds: o,
      }),
      method: "PUT",
    }
  }
}
function zf(t) {
  let e = { ...(t || {}) }
  return (
    (e.bucket = (e.bucket || "").trim()),
    (e.endpoint = (e.endpoint || "").trim()),
    (e.region = (e.region || "").trim() || "openlist"),
    (e.access_key_id = (e.access_key_id || "").trim()),
    (e.secret_access_key = (e.secret_access_key || "").trim()),
    (e.session_token = (e.session_token || "").trim()),
    (e.root_folder_path = (e.root_folder_path || "/").trim()),
    e.root_folder_path.startsWith("/") ||
      (e.root_folder_path = "/" + e.root_folder_path),
    (e.custom_host = (e.custom_host || "").trim()),
    (e.enable_custom_host_presign = !!e.enable_custom_host_presign),
    (e.sign_url_expire = Number(e.sign_url_expire) || 4),
    (e.placeholder = (e.placeholder || "").trim()),
    (e.force_path_style = !!e.force_path_style),
    (e.list_object_version = (e.list_object_version || "v1").toLowerCase()),
    (e.remove_bucket = !!e.remove_bucket),
    (e.add_filename_to_disposition = !!e.add_filename_to_disposition),
    (e.enable_direct_upload = !!e.enable_direct_upload),
    (e.direct_upload_host = (e.direct_upload_host || "").trim()),
    (e.user_agent = (e.user_agent || "").trim()),
    (e.order_by = e.order_by || "name"),
    (e.order_direction = e.order_direction || "asc"),
    e
  )
}
var Es = class {
  client
  addition
  driverName
  dogeExpiredAt
  dogeTimer
  budget = { used: 0, limit: 45 }
  constructor(e, r = "S3") {
    ;((this.addition = zf(e)),
      (this.driverName = r),
      (this.client = new Cs(this.addition)),
      this.client.updateBudget(this.budget))
  }
  async init() {
    this.driverName.toLowerCase().includes("doge") &&
      (await this.refreshDogeToken())
  }
  async refreshDogeToken() {
    try {
      let e = await hl(
        this.addition.access_key_id,
        this.addition.secret_access_key,
      )
      ;((this.dogeExpiredAt = e.expiredAt),
        this.client.updateCredentials({
          accessKeyId: e.accessKeyId,
          secretAccessKey: e.secretAccessKey,
          sessionToken: e.sessionToken,
        }))
    } catch (e) {
      throw (
        console.error("[S3Driver] DogeCloud init/refresh session error:", e),
        e
      )
    }
  }
  async checkDogeToken() {
    if (
      ((this.budget.used = 0), this.driverName.toLowerCase().includes("doge"))
    ) {
      let e = Math.floor(Date.now() / 1e3)
      ;(!this.dogeExpiredAt || this.dogeExpiredAt - e < 120) &&
        (await this.refreshDogeToken())
    }
  }
  drop() {
    this.dogeTimer && (clearInterval(this.dogeTimer), (this.dogeTimer = void 0))
  }
  getRemotePath(e) {
    let r = this.addition.root_folder_path || "/",
      i = e || "/"
    return (r !== "/" && !ml(r, i) && (i = ue(r, i)), ve(i, !1))
  }
  async fileItemFromS3(e, r) {
    let i, s
    if (!e.isFolder) {
      let n = await this.client.getLink(
        r,
        e.name,
        Number(this.addition.sign_url_expire) || 4,
        this.addition.custom_host,
        this.addition.enable_custom_host_presign,
        this.addition.remove_bucket,
        this.addition.add_filename_to_disposition,
      )
      ;((i = n.url), (s = n.headers))
    }
    return {
      name: e.name,
      size: e.size,
      is_dir: e.isFolder,
      modified: e.modified,
      sign: e.etag || r,
      type: W(e.name, e.isFolder),
      thumb: "",
      raw_url: i,
      raw_url_headers: s,
    }
  }
  async list(e, r) {
    await this.checkDogeToken()
    let i = this.getRemotePath(r),
      s = this.addition.list_object_version === "v2" ? "v2" : "v1",
      n = await this.client.listObjects(i, s, !1),
      a = []
    for (let o of n) {
      let c = ue(i, o.name),
        d = await this.fileItemFromS3(o, c)
      a.push(d)
    }
    return V(
      a,
      this.addition.order_by || "name",
      this.addition.order_direction || "asc",
    )
  }
  async get(e, r) {
    await this.checkDogeToken()
    let i = this.getRemotePath(r),
      s = await this.client.headObject(i)
    if (s) {
      let o = Xe(i)
      return this.fileItemFromS3(
        {
          name: o,
          size: s.size,
          isFolder: !1,
          modified: s.modified,
          path: i,
          etag: s.etag,
        },
        i,
      )
    }
    let n = this.addition.list_object_version === "v2" ? "v2" : "v1"
    if ((await this.client.listPrefixProbe(i, n)) || i === "" || i === "/")
      return {
        name: Xe(i),
        size: 0,
        is_dir: !0,
        modified: new Date().toISOString(),
        sign: i,
        type: 1,
      }
    throw new Error(`Object not found: ${r}`)
  }
  async mkdir(e, r) {
    await this.checkDogeToken()
    let i = this.getRemotePath(r),
      s = At(this.addition.placeholder),
      n = ue(i, s)
    await this.client.putObject(n, new Uint8Array(0))
  }
  async rename(e, r, i) {
    await this.checkDogeToken()
    let s = this.getRemotePath(r),
      n = Mn(s),
      a = ue(n, i),
      o = await this.client.headObject(s)
    o
      ? (await this.client.copyObject(s, a, o.size),
        await this.client.deleteObject(s))
      : (await this.copyDirRecursive(s, a), await this.removeDirRecursive(s))
  }
  async move(e, r, i, s, n) {
    await this.checkDogeToken()
    let a = this.getRemotePath(s),
      o = this.getRemotePath(n),
      c = await this.client.headObject(a)
    if (c)
      (await this.client.copyObject(a, o, c.size),
        await this.client.deleteObject(a))
    else {
      let d = this.addition.list_object_version === "v2" ? "v2" : "v1",
        l = await this.client.listAllObjects(a, d),
        u = ve(a, !0),
        p = []
      for (let { key: h, size: y } of l) {
        let x = h.startsWith(u) ? h.slice(u.length) : h,
          g = ue(o, x)
        ;(await this.client.copyObject(h, g, y), p.push(h))
      }
      p.length && (await this.client.deleteObjects(p))
      let f = At(this.addition.placeholder)
      await this.client.deleteObject(ue(a, f)).catch(() => {})
    }
  }
  async copy(e, r, i, s, n) {
    await this.checkDogeToken()
    let a = this.getRemotePath(s),
      o = this.getRemotePath(n),
      c = await this.client.headObject(a)
    if (c) await this.client.copyObject(a, o, c.size)
    else {
      let d = this.addition.list_object_version === "v2" ? "v2" : "v1",
        l = await this.client.listAllObjects(a, d),
        u = ve(a, !0)
      for (let { key: p, size: f } of l) {
        let h = p.startsWith(u) ? p.slice(u.length) : p,
          y = ue(o, h)
        await this.client.copyObject(p, y, f)
      }
    }
  }
  async copyDirRecursive(e, r) {
    let i = this.addition.list_object_version === "v2" ? "v2" : "v1",
      s = await this.client.listObjects(e, i, !0)
    for (let n of s) {
      let a = ue(e, n.name),
        o = ue(r, n.name)
      n.isFolder
        ? await this.copyDirRecursive(a, o)
        : await this.client.copyObject(a, o, n.size)
    }
  }
  async remove(e, r, i) {
    await this.checkDogeToken()
    let s = this.getRemotePath(r)
    ;(await this.client.headObject(s))
      ? await this.client.deleteObject(s)
      : await this.removeDirRecursive(s)
  }
  async removeDirRecursive(e) {
    let r = this.addition.list_object_version === "v2" ? "v2" : "v1",
      i = await this.client.listAllObjects(e, r)
    i.length && (await this.client.deleteObjects(i.map((n) => n.key)))
    let s = At(this.addition.placeholder)
    ;(await this.client.deleteObject(ue(e, s)).catch(() => {}),
      this.addition.placeholder &&
        (await this.client
          .deleteObject(ue(e, this.addition.placeholder))
          .catch(() => {})))
  }
  async put(e, r, i) {
    await this.checkDogeToken()
    let s = this.getRemotePath(r)
    await this.client.putObject(s, i)
  }
  async putStream(e, r, i, s) {
    await this.checkDogeToken()
    let n = this.getRemotePath(r)
    await this.client.multipartUpload(n, i)
  }
  supportsStreamUpload = !0
  async getStream(e, r) {
    let i = this.getRemotePath(e)
    return (
      await this.client.getObject(i, r !== void 0 ? { start: r } : void 0)
    ).body
  }
  async getDirectUploadInfo(e, r) {
    if (!this.addition.enable_direct_upload)
      throw new Error("Direct upload is not enabled")
    await this.checkDogeToken()
    let i = this.getRemotePath(e)
    return await this.client.getDirectUploadInfo(
      i,
      r,
      Number(this.addition.sign_url_expire) || 4,
      this.addition.direct_upload_host,
    )
  }
  async other(e, r, i) {
    if (e === "direct_upload" || e === "get_direct_upload_info") {
      let s = i?.name || i?.fileName || Xe(r),
        n = Mn(r)
      return await this.getDirectUploadInfo(n, s)
    }
    throw new Error(`Unsupported method ${e}`)
  }
}
var Dr = mt(_t(), 1)
ie()
var yl = 64 * 1024 * 1024,
  Lf = "_relay_tmp/openlist_relay",
  Nf = ["s3", "doge", "dogecloud"]
function Mf(t) {
  return String(t || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
}
function Hf(t) {
  let e = []
  for (let r = 0; r < t.length; r += 4)
    e.push(
      ((t[r] || 0) << 24) |
        ((t[r + 1] || 0) << 16) |
        ((t[r + 2] || 0) << 8) |
        (t[r + 3] || 0) |
        0,
    )
  return Dr.default.lib.WordArray.create(e, t.length)
}
function Kf() {
  return Dr.default.algo.MD5.create()
}
function Wf() {
  return Dr.default.algo.SHA1.create()
}
function xl(t) {
  return t.finalize().toString(Dr.default.enc.Hex)
}
function Vf(t) {
  return Buffer.from(t.buffer, t.byteOffset, t.byteLength)
}
async function Gf(t, e, r) {
  let i = t.getReader()
  for (;;) {
    let { done: s, value: n } = await i.read()
    if (s) break
    if (n && n.length) {
      let a = Hf(n)
      ;(e.update(a), r.update(a))
    }
  }
}
async function Hn(t) {
  let e = await fn(),
    r = String(e.relay_storage || "").trim()
  if (r) {
    await Jf(t, r)
    return
  }
  let i = Mf(t.srcStorage.driver)
  if (!Nf.includes(i)) {
    let s = await G(t.srcStorage.driver, t.srcStorage)
    if (t.operation === "move") {
      await s.move(t.srcDir, t.dstDir, [t.name], t.srcPhysical, t.dstPhysical)
      return
    }
    await s.copy(t.srcDir, t.dstDir, [t.name], t.srcPhysical, t.dstPhysical)
    return
  }
  throw new Error(
    "[\u8DE8\u5B58\u50A8\u590D\u5236] \u672A\u914D\u7F6E\u4E2D\u8F6C\u5B58\u50A8\uFF1A\u8BF7\u5728 \u8BBE\u7F6E \u2192 \u7AD9\u70B9\u8BBE\u7F6E \u4E2D\u5C06 relay_storage \u8BBE\u4E3A\u4E00\u4E2A S3/R2 \u6302\u8F7D",
  )
}
async function Jf(t, e) {
  let r = await G(t.srcStorage.driver, t.srcStorage),
    i = await G(t.dstStorage.driver, t.dstStorage),
    s = await r.get(t.srcVirtual, t.srcPhysical)
  if (s.is_dir) {
    ;(await i.mkdir(t.dstVirtual, t.dstPhysical),
      await vl(r, i, e, {
        srcVirtual: t.srcVirtual,
        srcPhysical: t.srcPhysical,
        dstVirtual: t.dstVirtual,
        dstPhysical: t.dstPhysical,
      }))
    return
  }
  await _l(r, i, e, {
    srcVirtual: t.srcVirtual,
    srcPhysical: t.srcPhysical,
    dstVirtual: t.dstVirtual,
    dstPhysical: t.dstPhysical,
    name: t.name,
    info: s,
  })
}
async function vl(t, e, r, i) {
  let s = await t.list(i.srcVirtual, i.srcPhysical)
  for (let n of s) {
    let a = Ds(i.srcVirtual, n.name),
      o = Ds(i.dstVirtual, n.name),
      c = Ds(i.srcPhysical, n.name),
      d = Ds(i.dstPhysical, n.name)
    n.is_dir
      ? (await e.mkdir(o, d),
        await vl(t, e, r, {
          srcVirtual: a,
          srcPhysical: c,
          dstVirtual: o,
          dstPhysical: d,
        }))
      : await _l(t, e, r, {
          srcVirtual: a,
          srcPhysical: c,
          dstVirtual: o,
          dstPhysical: d,
          name: n.name,
          info: n,
        })
  }
}
function Ds(t, e) {
  return `${String(t).replace(/\/+$/, "")}/${e}`
}
async function _l(t, e, r, i) {
  let s = i.info.size || 0,
    n = i.name
  if (!i.info.raw_url)
    throw new Error(
      `[\u4E2D\u8F6C\u590D\u5236] \u65E0\u6CD5\u83B7\u53D6\u6E90\u6587\u4EF6\u4E0B\u8F7D\u94FE\u63A5: ${i.srcVirtual}${i.info.raw_url_error ? ` (${i.info.raw_url_error})` : ""}`,
    )
  let a = async (u) => {
      let p = { ...(i.info.raw_url_headers || {}) }
      u > 0 && (p.Range = `bytes=${u}-`)
      let f = await fetch(i.info.raw_url, { headers: p })
      if (!f.ok || !f.body)
        throw new Error(
          `[\u4E2D\u8F6C\u590D\u5236] \u6E90\u6587\u4EF6\u4E0B\u8F7D\u5931\u8D25 [${f.status}]: ${i.srcVirtual}`,
        )
      return f.body
    },
    o = e,
    c = typeof o.uploadStream == "function",
    d = !!e.putStream && e.supportsStreamUpload === !0
  if (c) {
    if (!r)
      throw new Error(
        "[\u4E2D\u8F6C\u590D\u5236] \u672A\u914D\u7F6E\u4E2D\u8F6C\u5B58\u50A8\uFF1A\u8BF7\u5728 \u8BBE\u7F6E \u2192 \u7AD9\u70B9\u8BBE\u7F6E \u4E2D\u5C06 relay_storage \u8BBE\u4E3A\u4E00\u4E2A S3/R2 \u6302\u8F7D",
      )
    let u = await wl(r, n)
    try {
      let p = Kf(),
        f = Wf(),
        [h, y] = (await a(0)).tee(),
        x = Gf(y, p, f)
      ;(await u.relayDriver.putStream(u.tmpVirtual, u.tmpPhysical, h, s),
        await x)
      let g = async (m) => u.relayDriver.getStream(u.tmpPhysical, m)
      await o.uploadStream({
        dstPhysicalPath: i.dstPhysical,
        fileName: n,
        size: s,
        md5: xl(p),
        sha1: xl(f),
        getStream: g,
      })
    } finally {
      await u.cleanup()
    }
    return
  }
  if (d) {
    await e.putStream(i.dstVirtual, i.dstPhysical, await a(0), s)
    return
  }
  if (!r)
    throw new Error(
      "[\u4E2D\u8F6C\u590D\u5236] \u672A\u914D\u7F6E\u4E2D\u8F6C\u5B58\u50A8\uFF1A\u8BF7\u5728 \u8BBE\u7F6E \u2192 \u7AD9\u70B9\u8BBE\u7F6E \u4E2D\u5C06 relay_storage \u8BBE\u4E3A\u4E00\u4E2A S3/R2 \u6302\u8F7D",
    )
  if (s > yl)
    throw new Error(
      `[\u4E2D\u8F6C\u590D\u5236] \u76EE\u6807\u5B58\u50A8\u6682\u4E0D\u652F\u6301\u6D41\u5F0F\u4E0A\u4F20\uFF0C\u6587\u4EF6\u8D85\u8FC7\u7F13\u51B2\u4E0A\u9650 (${Math.floor(yl / 1024 / 1024)}MB): ${n}`,
    )
  let l = await wl(r, n)
  try {
    await l.relayDriver.putStream(l.tmpVirtual, l.tmpPhysical, await a(0), s)
    let u = await l.relayDriver.getStream(l.tmpPhysical, 0),
      p = await Qf(u, s)
    await e.put(i.dstVirtual, i.dstPhysical, Vf(p))
  } finally {
    await l.cleanup()
  }
}
async function wl(t, e) {
  let i = `/${t.replace(/^\/+|\/+$/g, "")}/${Lf}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}/${e}`,
    s = await te(i)
  if (s.isVirtual)
    throw new Error(
      `[\u4E2D\u8F6C\u590D\u5236] \u4E2D\u8F6C\u5B58\u50A8\u4E0D\u53EF\u7528: ${t}`,
    )
  let n = await G(s.storage.driver, s.storage)
  if (!n.putStream || n.supportsStreamUpload !== !0)
    throw new Error(
      `[\u4E2D\u8F6C\u590D\u5236] \u4E2D\u8F6C\u5B58\u50A8\u5FC5\u987B\u662F S3/R2 \u7C7B\u578B\uFF08\u5F53\u524D: ${s.storage.driver}\uFF09`,
    )
  return {
    relayDriver: n,
    tmpVirtual: i,
    tmpPhysical: s.physical,
    cleanup: async () => {
      try {
        await n.remove(i, s.physical, [e])
      } catch {}
    },
  }
}
async function Qf(t, e) {
  let r = new Uint8Array(e),
    i = t.getReader(),
    s = 0
  try {
    for (; s < e; ) {
      let { done: n, value: a } = await i.read()
      if (n) break
      let o = Math.min(a.length, e - s)
      ;(r.set(a.subarray(0, o), s), (s += o))
    }
  } finally {
    s < e && (await i.cancel().catch(() => {}))
  }
  if (s < e)
    throw new Error(
      `[\u4E2D\u8F6C\u590D\u5236] \u6D41\u63D0\u524D\u7ED3\u675F: \u8BFB\u53D6 ${s}/${e} \u5B57\u8282`,
    )
  return r
}
var Wn = null
async function Xf() {
  if (!Wn) {
    let { LocalDriver: t } = await Promise.resolve().then(() => (kl(), bl))
    Wn = new t()
  }
  return Wn
}
var Vn = new Map(),
  Zf = new Map(),
  Ts = new Map()
async function Yf(t, e, r) {
  let i = t.get(e)
  if (i) return i
  let s = r()
  t.set(e, s)
  try {
    return await s
  } catch (n) {
    throw (t.get(e) === s && t.delete(e), n)
  }
}
function pe(t) {
  let e = t?.addition
  return e ? (typeof e == "string" ? JSON.parse(e || "{}") : e) : {}
}
async function Sl(t, e) {
  let r = (t || "").toLowerCase().replace(/[^a-z0-9]/g, "")
  if (r === "local") {
    if (typeof process < "u" && process.release?.name === "node") return Xf()
    throw new Error(
      "Local storage driver requires Node.js runtime (not available in Cloudflare Workers)",
    )
  }
  if (!e)
    throw new Error(
      "failed get driver: storage config not found for driver " + t,
    )
  let i
  if (r === "onedriveapp") {
    i = new oi(pe(e))
    try {
      await i.init?.()
    } catch (s) {
      throw (console.error("onedrive_app init failed:", s), s)
    }
  } else if (r === "onedrive" || r === "onedrivesb") {
    i = new ai(pe(e), async (s) => {
      try {
        let n = await U(),
          a = (n.storages || []).find((c) => c.id === e?.id)
        if (!a) return
        let o =
          typeof a.addition == "string"
            ? JSON.parse(a.addition || "{}")
            : a.addition || {}
        ;((o.refresh_token = s), (a.addition = JSON.stringify(o)), await q(n))
      } catch (n) {
        console.warn("[Onedrive] failed to persist refresh token:", n)
      }
    })
    try {
      await i.init?.()
    } catch (s) {
      throw (console.error("onedrive init failed:", s), s)
    }
  } else if (
    r === "aliyundrive" ||
    r === "aliyundriveopen" ||
    r === "aliyundriveshare" ||
    r === "aliyun"
  )
    ((i = new di(pe(e))), await i.init?.())
  else if (r === "googledrive") ((i = new ui(pe(e))), await i.init?.())
  else if (r === "quark" || r === "quarkuc" || r === "uc")
    ((i = new Zi(pe(e))), await i.init?.())
  else if (r === "123pan" || r === "123") {
    let s = pe(e)
    ;((i = new es(s, async (n) => {
      try {
        let a = await U(),
          o = (a.storages || []).find((d) => d.id === e?.id)
        if (!o) return
        let c =
          typeof o.addition == "string"
            ? JSON.parse(o.addition || "{}")
            : o.addition || {}
        ;((c.access_token = n), (o.addition = JSON.stringify(c)), await q(a))
      } catch (a) {
        console.warn("[123Pan] failed to persist access_token:", a)
      }
    })),
      await i.init?.())
  } else if (r === "baidunetdisk" || r === "baidu" || r === "baiduyun") {
    let s = pe(e)
    ;((i = new ns(s, async (n) => {
      try {
        let a = await U(),
          o = (a.storages || []).find((d) => d.id === e?.id)
        if (!o) return
        let c =
          typeof o.addition == "string"
            ? JSON.parse(o.addition || "{}")
            : o.addition || {}
        ;((c.access_token = n.access_token),
          (c.refresh_token = n.refresh_token),
          (o.addition = JSON.stringify(Mt(c))),
          await q(a))
      } catch (a) {
        console.warn("[baidu_netdisk] failed to persist token:", a)
      }
    })),
      await i.init?.())
  } else if (r === "115open" || r === "115" || r === "115pan") {
    let s = pe(e)
    ;((i = new cs(s, async (n) => {
      try {
        let a = await U(),
          o = (a.storages || []).find((d) => d.id === e?.id)
        if (!o) return
        let c =
          typeof o.addition == "string"
            ? JSON.parse(o.addition || "{}")
            : o.addition || {}
        ;((c.access_token = n.access_token),
          (c.refresh_token = n.refresh_token),
          (o.addition = JSON.stringify(c)),
          await q(a))
      } catch (a) {
        console.warn("[115open] failed to persist token:", a)
      }
    })),
      await i.init?.())
  } else if (r === "github" || r === "githubapi" || r === "github_api") {
    let s = pe(e)
    ;((i = new ls(s)), await i.init?.())
  } else if (
    r === "thunderexpert" ||
    r === "thunderbrowserexpert" ||
    r === "thunderxexpert"
  ) {
    let s = pe(e)
    ;((i = new ps(s, async (n) => {
      try {
        ;(n.device_id && (s.device_id = n.device_id),
          n.refresh_token && (s.refresh_token = n.refresh_token),
          n.captcha_token && (s.captcha_token = n.captcha_token),
          (e.addition = JSON.stringify(s)))
        let a = await U(),
          o = (a.storages || []).find((c) => c.id === e?.id)
        if (o) {
          let c =
            typeof o.addition == "string"
              ? JSON.parse(o.addition || "{}")
              : o.addition || {}
          ;(n.refresh_token && (c.refresh_token = n.refresh_token),
            n.captcha_token && (c.captcha_token = n.captcha_token),
            n.device_id && (c.device_id = n.device_id),
            (o.addition = JSON.stringify(c)),
            await q(a))
        }
      } catch (a) {
        console.warn("[thunderexpert] failed to persist token:", a)
      }
    })),
      await i.init?.())
  } else if (
    r === "thunder" ||
    r === "xunlei" ||
    r === "thunderbrowser" ||
    r === "thunderx"
  ) {
    let s = pe(e)
    ;((i = new Sr(s, async (n) => {
      try {
        ;(n.device_id && (s.device_id = n.device_id),
          n.refresh_token && (s.refresh_token = n.refresh_token),
          n.captcha_token && (s.captcha_token = n.captcha_token),
          (e.addition = JSON.stringify(s)))
        let a = await U(),
          o = (a.storages || []).find((c) => c.id === e?.id)
        if (o) {
          let c =
            typeof o.addition == "string"
              ? JSON.parse(o.addition || "{}")
              : o.addition || {}
          ;(n.refresh_token && (c.refresh_token = n.refresh_token),
            n.captcha_token && (c.captcha_token = n.captcha_token),
            n.device_id && (c.device_id = n.device_id),
            (o.addition = JSON.stringify(c)),
            await q(a))
        }
      } catch (a) {
        console.warn("[thunder] failed to persist token:", a)
      }
    })),
      await i.init?.())
  } else if (
    r === "lanzou" ||
    r === "lanzoupan" ||
    r === "ilanzou" ||
    r === "lanzoui" ||
    r === "lanzous"
  ) {
    let s = pe(e)
    ;((i = new gs(s, async (n) => {
      try {
        let a = await U(),
          o = (a.storages || []).find((d) => d.id === e?.id)
        if (!o) return
        let c =
          typeof o.addition == "string"
            ? JSON.parse(o.addition || "{}")
            : o.addition || {}
        ;((c.cookie = n), (o.addition = JSON.stringify(c)), await q(a))
      } catch (a) {
        console.warn("[Lanzou] failed to persist cookie:", a)
      }
    })),
      await i.init?.())
  } else if (
    r === "189" ||
    r === "189cloud" ||
    r === "cloud189" ||
    r === "ctyun" ||
    r === "189pan"
  ) {
    let s = pe(e)
    ;((i = new ws(s)), await i.init?.())
  } else if (r === "webdav") {
    let s = pe(e)
    ;((i = new _s(s)), await i.init?.())
  } else if (r === "s3" || r === "doge" || r === "dogecloud") {
    let s = pe(e)
    ;((i = new Es(s, e.driver || "S3")), await i.init?.())
  } else if (
    r === "wopan" ||
    r === "unicom" ||
    r === "unicomcloud" ||
    r === "woyun" ||
    r === "chinaunicom"
  ) {
    let s = pe(e)
    ;((i = new Ps(s, async (n, a) => {
      try {
        let o = await U(),
          c = (o.storages || []).find((l) => l.id === e?.id)
        if (!c) return
        let d =
          typeof c.addition == "string"
            ? JSON.parse(c.addition || "{}")
            : c.addition || {}
        ;((d.access_token = n),
          (d.refresh_token = a),
          (c.addition = JSON.stringify(zn(d))),
          await q(o))
      } catch (o) {
        console.warn("[WoPan] failed to persist tokens:", o)
      }
    })),
      await i.init?.())
  } else throw new Error("failed get driver: unsupported driver '" + t + "'")
  return i
}
async function G(t, e) {
  if ((t || "").toLowerCase().replace(/[^a-z0-9]/g, "") === "local")
    return Sl(t, e)
  if (!e)
    throw new Error(
      "failed get driver: storage config not found for driver " + t,
    )
  let i = `${e.id}_${e.modified}`,
    s = Vn.get(i)
  return (
    s ||
    Yf(Zf, i, async () => {
      let n = Vn.get(i)
      if (n) return n
      let a = await Sl(t, e)
      return (Vn.set(i, a), a)
    })
  )
}
function eh(t) {
  let e = (t || "").toLowerCase().replace(/[^a-z0-9]/g, "")
  return (
    e === "189" ||
    e === "189cloud" ||
    e === "cloud189" ||
    e === "ctyun" ||
    e === "189pan"
  )
}
async function th(t, e) {
  if (t)
    try {
      t(e)
      return
    } catch {}
  await e
}
async function rh(t, e) {
  let r = String(t?.id || "")
  if (!r) return
  let s = (Ts.get(r) || Promise.resolve())
    .catch(() => {})
    .then(async () => {
      let n = await U(),
        a = (n.storages || []).find((c) => String(c.id) === r)
      if (!a) return
      let o =
        typeof a.addition == "string"
          ? JSON.parse(a.addition || "{}")
          : a.addition || {}
      ;((o.cookie = e),
        (a.addition = JSON.stringify(o)),
        String(t?.id) === r && (t.addition = a.addition),
        await q(n))
    })
  Ts.set(r, s)
  try {
    await s
  } finally {
    Ts.get(r) === s && Ts.delete(r)
  }
}
async function ke(t, e, r, i) {
  if (!eh(t)) return
  let n = r.consumePendingCookie?.call(r)
  if (!n) return
  let a = rh(e, n).catch((o) => {
    console.warn("[189Cloud] failed to persist cookie:", o)
  })
  await th(i?.waitUntil, a)
}
async function pt(t, e) {
  let r = await te(t),
    i = [],
    s = "Virtual"
  if (r.storage) {
    s = r.storage.driver
    try {
      let c = await G(s, r.storage)
      try {
        i = await c.list(t, r.physical)
      } finally {
        await ke(s, r.storage, c, e)
      }
      if (r.storage.status !== "work") {
        r.storage.status = "work"
        let d = await U(),
          l = (d.storages || []).find((u) => u.id === r.storage?.id)
        l && ((l.status = "work"), await q(d))
      }
    } catch (c) {
      try {
        let d = await U(),
          l = (d.storages || []).find((u) => u.id === r.storage?.id)
        l && ((l.status = c.message || String(c)), await q(d))
      } catch (d) {
        console.warn("Failed to persist storage status:", d)
      }
      throw c
    }
  } else if (!r.isVirtual)
    throw new Error("failed get storage: storage not found")
  let a = ((await U()).storages || []).filter((c) => !c.disabled),
    o = r.cleanPath
  return (
    a.forEach((c) => {
      let d = "/" + (c.mount_path || "").split("/").filter(Boolean).join("/")
      if (d === o || d === "/") return
      let l = o === "/" ? "/" : o + "/"
      if (d.startsWith(l)) {
        let u = d.slice(l.length).split("/").filter(Boolean)[0]
        u &&
          !i.some((p) => p.name === u) &&
          i.push({
            name: u,
            size: 0,
            is_dir: !0,
            modified: c.modified || new Date().toISOString(),
            sign: "",
            type: 1,
          })
      }
    }),
    i.forEach((c) => {
      c.type || (c.type = W(c.name, c.is_dir))
    }),
    { content: i, provider: s, storage: r.storage }
  )
}
async function Tr(t, e) {
  let r = await te(t)
  if (r.isVirtual)
    return {
      item: {
        name: r.cleanPath.split("/").filter(Boolean).pop() || "root",
        size: 0,
        is_dir: !0,
        modified: new Date().toISOString(),
        sign: "",
        type: 1,
      },
      provider: "Virtual",
      rawUrl: "",
    }
  if (r.storage && r.relative === "/") {
    let a = r.cleanPath.split("/").filter(Boolean).pop() || "root",
      o = pe(r.storage)
    return {
      item: {
        name: a,
        size: 0,
        is_dir: !0,
        modified: r.storage.modified || new Date().toISOString(),
        sign: String(o.root_folder_id || ""),
        type: 1,
        raw_url: "",
      },
      provider: r.storage.driver,
      rawUrl: `/api/p${t.startsWith("/") ? "" : "/"}${t}`,
    }
  }
  let i = r.storage ? r.storage.driver : "Local",
    s = await G(i, r.storage),
    n
  try {
    n = await s.get(t, r.physical)
  } finally {
    await ke(i, r.storage, s, e)
  }
  return (
    n.type || (n.type = W(n.name, n.is_dir)),
    {
      item: n,
      provider: i,
      rawUrl: `/api/p${t.startsWith("/") ? "" : "/"}${t}`,
    }
  )
}
async function Pl(t, e) {
  let r = await te(t)
  if (r.isVirtual) throw new Error("failed get storage: storage not found")
  let i = await G(r.storage.driver, r.storage)
  try {
    await i.mkdir(t, r.physical)
  } finally {
    await ke(r.storage.driver, r.storage, i, e)
  }
}
async function Al(t, e, r) {
  let i = await te(t)
  if (i.isVirtual) throw new Error("failed get storage: storage not found")
  let s = await G(i.storage.driver, i.storage)
  try {
    await s.rename(t, i.physical, e)
  } finally {
    await ke(i.storage.driver, i.storage, s, r)
  }
}
async function Cl(t, e, r) {
  for (let i of e) {
    let s = `${t}/${i}`,
      n = await te(s)
    if (n.isVirtual) throw new Error("failed get storage: storage not found")
    let a = await G(n.storage.driver, n.storage)
    try {
      await a.remove(s, n.physical, [i])
    } finally {
      await ke(n.storage.driver, n.storage, a, r)
    }
  }
}
async function El(t, e, r, i) {
  for (let s of r) {
    let n = `${t}/${s}`,
      a = `${e}/${s}`,
      o = await te(n),
      c = await te(a)
    if (o.isVirtual || c.isVirtual)
      throw new Error("failed get storage: storage not found")
    let d = await G(o.storage.driver, o.storage)
    try {
      if (o.storage.id === c.storage.id)
        await d.move(t, e, [s], o.physical, c.physical)
      else
        try {
          await d.move(t, e, [s], o.physical, c.physical)
        } catch {
          ;(await Hn({
            srcStorage: o.storage,
            dstStorage: c.storage,
            srcDir: t,
            dstDir: e,
            srcVirtual: n,
            dstVirtual: a,
            srcPhysical: o.physical,
            dstPhysical: c.physical,
            name: s,
            operation: "move",
          }),
            await d.remove(n, o.physical, [s]))
        }
    } finally {
      await ke(o.storage.driver, o.storage, d, i)
    }
  }
}
async function Dl(t, e, r, i) {
  for (let s of r) {
    let n = `${t}/${s}`,
      a = `${e}/${s}`,
      o = await te(n),
      c = await te(a)
    if (o.isVirtual || c.isVirtual)
      throw new Error("failed get storage: storage not found")
    let d = await G(o.storage.driver, o.storage)
    try {
      o.storage.id === c.storage.id
        ? await d.copy(t, e, [s], o.physical, c.physical)
        : await Hn({
            srcStorage: o.storage,
            dstStorage: c.storage,
            srcDir: t,
            dstDir: e,
            srcVirtual: n,
            dstVirtual: a,
            srcPhysical: o.physical,
            dstPhysical: c.physical,
            name: s,
            operation: "copy",
          })
    } finally {
      await ke(o.storage.driver, o.storage, d, i)
    }
  }
}
async function Gn(t, e, r) {
  let i = await te(t)
  if (i.isVirtual) throw new Error("failed get storage: storage not found")
  let s = await G(i.storage.driver, i.storage)
  try {
    await s.put(t, i.physical, e)
  } finally {
    await ke(i.storage.driver, i.storage, s, r)
  }
}
ie()
var Fr = (t) =>
  "/" +
  String(t || "")
    .split("/")
    .filter(Boolean)
    .join("/")
async function Wt(t, e, r) {
  let s = Fr(t).split("/").filter(Boolean)
  if (s.length < 1) return { ok: !1, error: "Invalid share path" }
  let n, a
  if (s[0] === "@s") {
    if (s.length < 2) return { ok: !1, error: "Invalid share path" }
    ;((n = s[1]), (a = s.slice(2)))
  } else ((n = s[0]), (a = s.slice(1)))
  let o = await U(r),
    c = (o.shares || []).find((p) => p.id === n)
  if (!c) return { ok: !1, error: "share not found" }
  if (c.disabled) return { ok: !1, error: "share has been disabled" }
  if (c.expires && new Date(c.expires) < new Date())
    return { ok: !1, error: "share has expired" }
  if (
    c.max_accessed > 0 &&
    c.accessed !== void 0 &&
    c.accessed >= c.max_accessed
  )
    return { ok: !1, error: "share access count exceeded" }
  if (c.pwd && c.pwd !== e) return { ok: !1, error: "wrong password" }
  if (!c.files || c.files.length === 0)
    return { ok: !1, error: "share is empty" }
  if (
    ((c.accessed = (c.accessed || 0) + 1),
    q(o, r).catch(() => {}),
    c.files.length > 1 && a.length === 0)
  )
    return { ok: !0, share: c, virtualList: !0 }
  if (c.files.length === 1) {
    let p = Fr(c.files[0]),
      f = Fr([p, ...a].join("/"))
    return { ok: !0, share: c, realPath: f }
  }
  let d = a[0],
    l = c.files.find((p) => {
      let f = String(p).split("/").filter(Boolean)
      return f[f.length - 1] === d
    })
  if (!l) return { ok: !1, error: "path not found in share" }
  let u = Fr([Fr(l), ...a.slice(1)].join("/"))
  return { ok: !0, share: c, realPath: u }
}
ie()
Ze()
var xh = {
  SEE_HIDES: 0,
  ACCESS_WITHOUT_PASSWORD: 1,
  OFFLINE_DOWNLOAD: 2,
  WRITE_CONTENT: 3,
  RENAME: 4,
  MOVE: 5,
  COPY: 6,
  DELETE: 7,
  WEBDAV_READ: 8,
  WEBDAV_MANAGE: 9,
  FTP_READ: 10,
  FTP_MANAGE: 11,
  READ_ARCHIVES: 12,
  DECOMPRESS: 13,
  SHARE: 14,
  CUSTOMIZE_SHARE_ID: 15,
}
function wh(t) {
  return !t || t.role === 1
}
function fa(t) {
  return !!t && t.role === 2
}
function vh(t, e) {
  return !t || t.disabled
    ? !1
    : fa(t)
      ? !0
      : wh(t)
        ? !1
        : ((t.permission >> e) & 1) === 1
}
function Te(t) {
  return vh(t, xh.WRITE_CONTENT)
}
function ce(t, e = "/") {
  let r = e || "/"
  if (r.startsWith("/@s")) return r
  let i = (t?.base_path || "/").trim()
  if (!i || i === "/") return r.startsWith("/") ? r : `/${r}`
  ;(i.startsWith("/") || (i = `/${i}`),
    i.endsWith("/") && i.length > 1 && (i = i.replace(/\/+$/, "")))
  let s = r.startsWith("/") ? r : `/${r}`
  return s === "/" ? i : `${i}${s}`
}
async function g0(t = {}, e) {
  let r = (t.parent || "/").replace(/\/+/g, "/") || "/",
    i = String(t.keywords || "")
      .trim()
      .toLowerCase(),
    s = t.scope ?? 0,
    n = Math.max(1, t.page || 1),
    a = Math.max(1, Math.min(100, t.per_page || 30)),
    o = t.max_depth ?? 10,
    c = t.max_results ?? 500,
    d = []
  async function l(h, y) {
    if (y > o || d.length >= c) return
    let x = []
    try {
      x = (await pt(h)).content || []
    } catch {
      return
    }
    for (let g of x) {
      if (d.length >= c) break
      let m = !i || g.name.toLowerCase().includes(i),
        w = !!g.is_dir,
        v = !0
      if (
        (s === 1 && !w && (v = !1),
        s === 2 && w && (v = !1),
        m &&
          v &&
          d.push({
            ...g,
            parent: h.endsWith("/") && h !== "/" ? h.slice(0, -1) : h,
          }),
        w)
      ) {
        let _ = h === "/" ? `/${g.name}` : `${h}/${g.name}`
        await l(_, y + 1)
      }
    }
  }
  await l(r, 0)
  let u = d.length,
    p = (n - 1) * a
  return { content: d.slice(p, p + a), total: u }
}
var de = new Q(),
  Fe = (t) => {
    let e = t.executionCtx
    if (!(!e || typeof e.waitUntil != "function"))
      return { waitUntil: (r) => e.waitUntil(r) }
  },
  He = (t) =>
    t.json({ code: 403, message: "Permission denied", data: null }, 403)
de.post("/dirs", async (t) => {
  let e = await t.req.json().catch(() => ({})),
    r = await ee(t),
    i = e.path || "/"
  if (!i.startsWith("/@s") && (!r || r.disabled))
    return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
  let n = Fe(t),
    a = i
  ;(!e.force_root || !fa(r)) && (a = ce(r, a))
  try {
    if (a.startsWith("/@s")) {
      let d = await Wt(a, e.password || "", t.env)
      if (!d.ok) return t.json({ code: 400, message: d.error, data: null })
      if (d.virtualList) {
        let p = []
        for (let f of d.share.files || [])
          try {
            let { item: h } = await Tr(f, n)
            if (h.is_dir) {
              let y = String(f).split("/").filter(Boolean)
              p.push({
                name: y[y.length - 1] || f,
                size: 0,
                is_dir: !0,
                modified: h.modified || new Date().toISOString(),
                sign: "",
                thumb: "",
                type: 1,
              })
            }
          } catch {}
        return t.json({ code: 200, message: "success", data: p })
      }
      let { content: l } = await pt(d.realPath, n),
        u = l
          .filter((p) => p.is_dir)
          .map((p) => ({
            name: p.name,
            size: 0,
            is_dir: !0,
            modified: p.modified || new Date().toISOString(),
            sign: p.sign || "",
            thumb: p.thumb || "",
            type: 1,
          }))
      return t.json({ code: 200, message: "success", data: u })
    }
    let { content: o } = await pt(a, n),
      c = o
        .filter((d) => d.is_dir)
        .map((d) => ({
          name: d.name,
          size: 0,
          is_dir: !0,
          modified: d.modified || new Date().toISOString(),
          sign: d.sign || "",
          thumb: d.thumb || "",
          type: 1,
        }))
    return t.json({ code: 200, message: "success", data: c })
  } catch (o) {
    return t.json({ code: 500, message: o.message, data: null })
  }
})
de.post("/list", async (t) => {
  let e = await t.req.json().catch(() => ({})),
    r = await ee(t)
  if (!(e.path || "/").startsWith("/@s") && (!r || r.disabled))
    return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
  let s = Fe(t),
    n = ce(r, e.path || "/"),
    a = parseInt(e.page, 10) || 1,
    o = parseInt(e.per_page, 10) || 0,
    c = (d) => {
      let l = d.length
      if (o <= 0) return { content: d, total: l }
      let p = (Math.max(1, a) - 1) * o,
        f = p + o
      return { content: d.slice(p, f), total: l }
    }
  try {
    if (n.startsWith("/@s")) {
      let w = await Wt(n, e.password || "", t.env)
      if (!w.ok) return t.json({ code: 400, message: w.error, data: null })
      if (w.virtualList) {
        let S = []
        for (let C of w.share.files || []) {
          let F = String(C).split("/").filter(Boolean),
            A = F[F.length - 1] || C
          try {
            let { item: $ } = await Tr(C, s)
            S.push({
              name: A,
              size: $.size || 0,
              is_dir: !!$.is_dir,
              modified: $.modified || new Date().toISOString(),
              sign: "",
              thumb: $.thumb || "",
              type: $.type ?? 0,
            })
          } catch {
            try {
              ;(await pt(C, s),
                S.push({
                  name: A,
                  size: 0,
                  is_dir: !0,
                  modified: new Date().toISOString(),
                  sign: "",
                  thumb: "",
                  type: 1,
                }))
            } catch {
              S.push({
                name: A,
                size: 0,
                is_dir: !1,
                modified: new Date().toISOString(),
                sign: "",
                thumb: "",
                type: 0,
              })
            }
          }
        }
        let { content: D, total: k } = c(S)
        return t.json({
          code: 200,
          message: "success",
          data: {
            content: D,
            total: k,
            readme: w.share.readme || "",
            header: w.share.header || "",
            write: !1,
            write_content_bypass: !1,
            provider: "Share",
          },
        })
      }
      let { content: v, provider: _ } = await pt(w.realPath, s),
        b = v.map((S) => ({
          name: S.name,
          size: S.size,
          is_dir: S.is_dir,
          created: S.created || S.modified || new Date().toISOString(),
          modified: S.modified || new Date().toISOString(),
          sign: S.sign || "",
          thumb: S.thumb || "",
          type: S.type ?? 0,
        })),
        { content: P, total: E } = c(b)
      return t.json({
        code: 200,
        message: "success",
        data: {
          content: P,
          total: E,
          readme: w.share.readme || "",
          header: w.share.header || "",
          write: !1,
          write_content_bypass: !1,
          provider: _,
        },
      })
    }
    let { content: d, provider: l, storage: u } = await pt(n, s),
      p = Te(r),
      f = d.map((w) => ({
        name: w.name,
        size: w.size,
        is_dir: w.is_dir,
        created: w.created || w.modified || new Date().toISOString(),
        modified: w.modified || new Date().toISOString(),
        sign: w.sign || "",
        thumb: w.thumb || "",
        type: w.type ?? 0,
      })),
      h = 0
    if (u && ((h = parseInt(u.page_size, 10) || 0), !h && u.addition))
      try {
        let w =
          typeof u.addition == "string" ? JSON.parse(u.addition) : u.addition
        h = parseInt(w?.page_size, 10) || 0
      } catch {}
    let y = o > 0 ? o : h > 0 ? h : 0,
      x = (w) => {
        let v = w.length
        if (y <= 0) return { content: w, total: v }
        let b = (Math.max(1, a) - 1) * y,
          P = b + y
        return { content: w.slice(b, P), total: v }
      },
      { content: g, total: m } = x(f)
    return t.json({
      code: 200,
      message: "success",
      data: {
        content: g,
        total: m,
        readme: "",
        header: "",
        write: p,
        write_content_bypass: !1,
        provider: l,
        page_size: y > 0 ? y : void 0,
      },
    })
  } catch (d) {
    return t.json({ code: 500, message: d.message, data: null })
  }
})
de.post("/get", async (t) => {
  let e = await t.req.json().catch(() => ({})),
    r = await ee(t)
  if (!(e.path || "/").startsWith("/@s") && (!r || r.disabled))
    return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
  let s = Fe(t),
    n = ce(r, e.path || "/")
  try {
    if (n.startsWith("/@s")) {
      let d = await Wt(n, e.password || "", t.env)
      if (!d.ok) return t.json({ code: 400, message: d.error, data: null })
      if (d.virtualList) {
        let h = n.split("/").filter(Boolean)[1] || "share"
        return t.json({
          code: 200,
          message: "success",
          data: {
            name: h,
            size: 0,
            is_dir: !0,
            modified: new Date().toISOString(),
            sign: "",
            thumb: "",
            type: 1,
            raw_url: "",
            readme: d.share.readme || "",
            header: d.share.header || "",
            provider: "Share",
            related: [],
            write: !1,
            write_content_bypass: !1,
          },
        })
      }
      let l = n.split("/").filter(Boolean)[1] || "",
        { item: u, provider: p } = await Tr(d.realPath, s),
        f = n.replace(/^\/@s\/[^/]+/, "")
      return t.json({
        code: 200,
        message: "success",
        data: {
          name: u.name,
          size: u.size,
          is_dir: u.is_dir,
          created: u.created || u.modified || new Date().toISOString(),
          modified: u.modified,
          sign: u.sign || "",
          thumb: u.thumb || "",
          type: u.type ?? 0,
          raw_url: `/api/sd/${l}${f}`,
          readme: d.share.readme || "",
          header: d.share.header || "",
          provider: p,
          related: [],
          write: !1,
          write_content_bypass: !1,
        },
      })
    }
    let { item: a, provider: o, rawUrl: c } = await Tr(n, s)
    return t.json({
      code: 200,
      message: "success",
      data: {
        name: a.name,
        size: a.size,
        is_dir: a.is_dir,
        created: a.created || a.modified || new Date().toISOString(),
        modified: a.modified,
        sign: a.sign || "",
        thumb: a.thumb || "",
        type: a.type ?? 0,
        raw_url: c,
        readme: "",
        header: "",
        provider: o,
        related: [],
        write: Te(r),
        write_content_bypass: !1,
      },
    })
  } catch (a) {
    return t.json({ code: 500, message: a.message, data: null })
  }
})
de.post("/mkdir", async (t) => {
  let e = await ee(t)
  if (!Te(e)) return He(t)
  let r = await t.req.json().catch(() => ({})),
    i = ce(e, r.path || "/"),
    s = Fe(t)
  try {
    return (
      await Pl(i, s),
      t.json({ code: 200, message: "success", data: null })
    )
  } catch (n) {
    return t.json({ code: 500, message: n.message, data: null })
  }
})
de.post("/rename", async (t) => {
  let e = await ee(t)
  if (!Te(e)) return He(t)
  let { path: r, name: i } = await t.req.json().catch(() => ({})),
    s = Fe(t)
  try {
    let n = ce(e, r || "/")
    return (
      await Al(n, i, s),
      t.json({ code: 200, message: "success", data: null })
    )
  } catch (n) {
    return t.json({ code: 500, message: n.message, data: null })
  }
})
de.post("/remove", async (t) => {
  let e = await ee(t)
  if (!Te(e)) return He(t)
  let { dir: r, names: i } = await t.req.json().catch(() => ({})),
    s = Fe(t)
  try {
    let n = ce(e, r || "/")
    return (
      await Cl(n, i, s),
      t.json({ code: 200, message: "success", data: null })
    )
  } catch (n) {
    return t.json({ code: 500, message: n.message, data: null })
  }
})
de.post("/move", async (t) => {
  let e = await ee(t)
  if (!Te(e)) return He(t)
  let {
      src_dir: r,
      dst_dir: i,
      names: s,
    } = await t.req.json().catch(() => ({})),
    n = Fe(t)
  try {
    let a = ce(e, r || "/"),
      o = ce(e, i || "/")
    return (
      await El(a, o, s, n),
      t.json({ code: 200, message: "success", data: null })
    )
  } catch (a) {
    return t.json({ code: 500, message: a.message, data: null })
  }
})
de.post("/copy", async (t) => {
  let e = await ee(t)
  if (!Te(e)) return He(t)
  let {
      src_dir: r,
      dst_dir: i,
      names: s,
    } = await t.req.json().catch(() => ({})),
    n = Fe(t)
  try {
    let a = ce(e, r || "/"),
      o = ce(e, i || "/")
    return (
      await Dl(a, o, s, n),
      t.json({ code: 200, message: "success", data: null })
    )
  } catch (a) {
    return t.json({ code: 500, message: a.message, data: null })
  }
})
de.put("/put", async (t) => {
  let e = await ee(t)
  if (!Te(e)) return He(t)
  let r = decodeURIComponent(t.req.header("File-Path") || ""),
    i = ce(e, r),
    s = Fe(t)
  try {
    let n = await t.req.arrayBuffer()
    return (
      await Gn(i, Buffer.from(n), s),
      t.json({ code: 200, message: "success", data: null })
    )
  } catch (n) {
    return t.json({ code: 500, message: n.message, data: null })
  }
})
de.put("/form", async (t) => {
  let e = await ee(t)
  if (!Te(e)) return He(t)
  let r = decodeURIComponent(t.req.header("File-Path") || ""),
    i = ce(e, r),
    s = Fe(t)
  try {
    let a = (await t.req.formData()).get("file")
    if (!a || typeof a == "string")
      return t.json({
        code: 400,
        message: "missing file in form data",
        data: null,
      })
    let o = Buffer.from(await a.arrayBuffer())
    return (
      await Gn(i, o, s),
      t.json({ code: 200, message: "success", data: null })
    )
  } catch (n) {
    return t.json({ code: 500, message: n.message, data: null })
  }
})
de.post("/upload/create", async (t) => {
  let e = await ee(t)
  if (!Te(e)) return He(t)
  let {
      path: r,
      file_name: i,
      size: s,
      md5: n,
    } = await t.req.json().catch(() => ({})),
    a = ce(e, r || "/"),
    o = Fe(t)
  if (!i)
    return t.json({
      code: 400,
      message: "path and file_name are required",
      data: null,
    })
  try {
    let c = await te(a)
    if (c.isVirtual) throw new Error("failed get storage: storage not found")
    let d = await G(c.storage.driver, c.storage)
    if (typeof d.createUploadSession != "function")
      return t.json({ code: 200, message: "success", data: null })
    let l
    try {
      l = await d.createUploadSession(a, c.physical, i, Number(s) || 0, n || "")
    } finally {
      await ke(c.storage.driver, c.storage, d, o)
    }
    return t.json({ code: 200, message: "success", data: l })
  } catch (c) {
    return t.json({ code: 500, message: c.message, data: null })
  }
})
de.put("/upload/part", async (t) => {
  let e = await ee(t)
  if (!Te(e)) return He(t)
  let r = t.req.header("X-Upload-Session") || "",
    i = parseInt(t.req.header("X-Part-Number") || "0", 10),
    s = decodeURIComponent(t.req.header("Upload-Path") || ""),
    n = ce(e, s),
    a = Fe(t)
  if (!r || !(i >= 1) || !n)
    return t.json({
      code: 400,
      message: "missing X-Upload-Session / X-Part-Number / Upload-Path",
      data: null,
    })
  try {
    let o = await te(n)
    if (o.isVirtual) throw new Error("failed get storage: storage not found")
    let c = await G(o.storage.driver, o.storage)
    if (typeof c.uploadPart != "function")
      throw new Error("storage does not support chunked upload")
    let d = Buffer.from(await t.req.arrayBuffer()),
      l
    try {
      l = await c.uploadPart(r, i, d)
    } finally {
      await ke(o.storage.driver, o.storage, c, a)
    }
    return t.json({ code: 200, message: "success", data: l ?? null })
  } catch (o) {
    return t.json({ code: 500, message: o.message, data: null })
  }
})
de.post("/upload/complete", async (t) => {
  let e = await ee(t)
  if (!Te(e)) return He(t)
  let {
      path: r,
      session: i,
      partMd5s: s,
    } = await t.req.json().catch(() => ({})),
    n = ce(e, r || "/"),
    a = Fe(t)
  if (!i)
    return t.json({
      code: 400,
      message: "path and session are required",
      data: null,
    })
  try {
    let o = await te(n)
    if (o.isVirtual) throw new Error("failed get storage: storage not found")
    let c = await G(o.storage.driver, o.storage)
    if (typeof c.completeUploadSession != "function")
      throw new Error("storage does not support chunked upload")
    try {
      await c.completeUploadSession(i, s)
    } finally {
      await ke(o.storage.driver, o.storage, c, a)
    }
    return t.json({ code: 200, message: "success", data: null })
  } catch (o) {
    return t.json({ code: 500, message: o.message, data: null })
  }
})
de.post("/add_offline_download", async (t) => {
  let e = await ee(t)
  if (!e || e.disabled)
    return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
  let { path: r, urls: i } = await t.req.json().catch(() => ({})),
    s = ce(e, r || "/")
  return !i || i.length === 0
    ? t.json({ code: 400, message: "No URLs provided" })
    : t.json({
        code: 200,
        message:
          "Offline download task received (Note: background processing limited in Serverless mode)",
        data: null,
      })
})
de.post("/search", async (t) => {
  let e = await ee(t)
  if (!e || e.disabled)
    return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
  let r = await t.req.json().catch(() => ({})),
    i = ce(e, r.parent || "/")
  try {
    let s = await g0(
      {
        parent: i,
        keywords: r.keywords || "",
        scope: r.scope !== void 0 ? parseInt(r.scope, 10) : 0,
        page: r.page ? parseInt(r.page, 10) : 1,
        per_page: r.per_page ? parseInt(r.per_page, 10) : 30,
      },
      t.env,
    )
    return t.json({ code: 200, message: "success", data: s })
  } catch (s) {
    return t.json({ code: 500, message: s.message, data: null }, 500)
  }
})
de.post("/other", async (t) => {
  let e = await ee(t)
  if (!e || e.disabled)
    return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
  let r = await t.req.json().catch(() => ({})),
    i = ce(e, r.path || "/"),
    s = r.method
  if (!s)
    return t.json(
      { code: 400, message: "Missing required parameter 'method'", data: null },
      400,
    )
  try {
    let n = await te(i)
    if (n.isVirtual || !n.storage)
      throw new Error("failed get storage: storage not found")
    let a = await G(n.storage.driver, n.storage)
    if (typeof a.other == "function") {
      let o = await a.other(s, n.relative, r)
      return t.json({ code: 200, message: "success", data: o })
    }
    return t.json(
      {
        code: 500,
        message: `Driver '${n.storage.driver}' does not support other method '${s}'`,
        data: null,
      },
      500,
    )
  } catch (n) {
    return t.json({ code: 500, message: n.message, data: null }, 500)
  }
})
Rr()
ie()
Ze()
var ha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
function _h(t) {
  let e = String(t).toUpperCase().replace(/[\s=]/g, "")
  if (!e) throw new Error("Empty base32 secret")
  let r = [],
    i = 0,
    s = 0
  for (let n of e) {
    let a = ha.indexOf(n)
    if (a === -1) throw new Error(`Invalid base32 character: ${n}`)
    ;((i = (i << 5) | a),
      (s += 5),
      s >= 8 && (r.push((i >> (s - 8)) & 255), (s -= 8)))
  }
  return new Uint8Array(r)
}
function bh(t) {
  let e = 0,
    r = 0,
    i = ""
  for (let s = 0; s < t.length; s++)
    for (e = (e << 8) | t[s], r += 8; r >= 5; )
      ((i += ha[(e >> (r - 5)) & 31]), (r -= 5))
  return (r > 0 && (i += ha[(e << (5 - r)) & 31]), i)
}
function m0(t = 20) {
  let e = new Uint8Array(t)
  return (crypto.getRandomValues(e), bh(e))
}
async function kh(t, e) {
  let r = await crypto.subtle.importKey(
      "raw",
      t,
      { name: "HMAC", hash: "SHA-1" },
      !1,
      ["sign"],
    ),
    i = await crypto.subtle.sign("HMAC", r, e)
  return new Uint8Array(i)
}
async function Sh(t, e = Date.now(), r = 30, i = 6) {
  let s = Math.floor(e / 1e3 / r),
    n = new Uint8Array(8),
    a = s
  for (let u = 7; u >= 0; u--) ((n[u] = a & 255), (a = Math.floor(a / 256)))
  let o = await kh(_h(t), n),
    c = o[o.length - 1] & 15,
    l =
      (((o[c] & 127) << 24) |
        ((o[c + 1] & 255) << 16) |
        ((o[c + 2] & 255) << 8) |
        (o[c + 3] & 255)) %
      Math.pow(10, i)
  return String(l).padStart(i, "0")
}
async function ga(t, e, r = 1, i = Date.now()) {
  if (!t || !e) return !1
  let s = String(e).trim()
  if (!/^\d{6}$/.test(s)) return !1
  for (let n = -r; n <= r; n++) if ((await Sh(t, i + n * 3e4)) === s) return !0
  return !1
}
function y0(t, e, r = "OpenListNext") {
  let i = encodeURIComponent(`${r}:${e}`),
    s = new URLSearchParams({
      secret: t,
      issuer: r,
      algorithm: "SHA1",
      digits: "6",
      period: "30",
    })
  return `otpauth://totp/${i}?${s.toString()}`
}
function x0(t) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(t)}`
}
ie()
function Ph(t) {
  let e = ""
  for (let r = 0; r < t.length; r++) e += String.fromCharCode(t[r])
  return btoa(e)
}
function w0(t) {
  let e = String(t || "")
      .replace(/[\s\r\n]/g, "")
      .replace(/-/g, "+")
      .replace(/_/g, "/"),
    r = e.length % 4,
    i = r ? e + "=".repeat(4 - r) : e
  try {
    let s = atob(i),
      n = new Uint8Array(s.length)
    for (let a = 0; a < s.length; a++) n[a] = s.charCodeAt(a)
    return n
  } catch {
    return null
  }
}
var Ah = [
  "ssh-rsa",
  "ssh-dss",
  "ssh-ed25519",
  "ecdsa-sha2-nistp256",
  "ecdsa-sha2-nistp384",
  "ecdsa-sha2-nistp521",
  "sk-ssh-ed25519@openssh.com",
  "sk-ecdsa-sha2-nistp256@openssh.com",
  "sk-ssh-ed25519@openssh.com.webauthn",
  "sk-ecdsa-sha2-nistp256@openssh.com.webauthn",
]
function ma(t) {
  let e = String(t || "")
    .trim()
    .split(/\s+/)
  if (e.length < 2) return null
  let r = e[0]
  if (!Ah.includes(r)) return null
  let i = w0(e[1])
  return !i || i.length < 16
    ? null
    : {
        type: r,
        blobBase64: e[1].replace(/[\s\r\n]/g, ""),
        comment: e.slice(2).join(" ") || "",
      }
}
async function v0(t) {
  let e = ma(t)
  if (!e) return null
  let r = w0(e.blobBase64)
  if (!r) return null
  let i = await crypto.subtle.digest(
      "SHA-256",
      r.buffer.slice(r.byteOffset, r.byteOffset + r.byteLength),
    ),
    s = new Uint8Array(i)
  return "SHA256:" + Ph(s).replace(/=+$/, "")
}
function _0() {
  let t = globalThis
  return typeof t.crypto?.randomUUID == "function"
    ? t.crypto.randomUUID()
    : Date.now().toString(36) +
        "-" +
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10)
}
async function Jt(t, e) {
  let i = ((await U(e)).users || []).find((s) => s.id === t)
  return i ? i.ssh_keys || [] : []
}
async function b0(t, e, r, i) {
  let s = ma(e)
  if (!s) throw new Error("Invalid OpenSSH public key format")
  let n = await v0(e)
  if (!n) throw new Error("Failed to compute SSH key fingerprint")
  let a = await U(i),
    o = (a.users || []).find((d) => d.id === t)
  if (!o) throw new Error("User not found")
  if (
    (Array.isArray(o.ssh_keys) || (o.ssh_keys = []),
    o.ssh_keys.some((d) => d.fingerprint === n))
  )
    throw new Error("SSH key with this fingerprint already exists")
  let c = {
    id: _0(),
    name: (r || s.comment || s.type).slice(0, 64),
    public_key: e.trim(),
    fingerprint: n,
    created_at: new Date().toISOString(),
  }
  return (o.ssh_keys.push(c), await q(a, i), c)
}
async function $s(t, e, r) {
  let i = await U(r),
    s = (i.users || []).find((a) => a.id === t)
  if (!s || !Array.isArray(s.ssh_keys)) return !1
  let n = s.ssh_keys.length
  return (
    (s.ssh_keys = s.ssh_keys.filter((a) => a.id !== e)),
    s.ssh_keys.length !== n ? (await q(i, r), !0) : !1
  )
}
var Ke = new Q(),
  Br = new Q(),
  Ch = 5,
  Eh = 900 * 1e3,
  It = new Map()
function Dh(t) {
  return (
    t.req.header("CF-Connecting-IP") ||
    t.req.header("x-real-ip") ||
    t.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  )
}
function ya(t, e) {
  return `${Dh(t)}|${String(e || "").toLowerCase()}`
}
function k0(t, e) {
  if (It.size > 1e4) {
    let i = Date.now()
    for (let [s, n] of It) n.lockedUntil < i && n.count === 0 && It.delete(s)
  }
  let r = It.get(ya(t, e))
  return !!r && r.lockedUntil > Date.now()
}
function S0(t, e) {
  let r = ya(t, e),
    i = Date.now(),
    s = It.get(r) || { count: 0, lockedUntil: 0 }
  s.lockedUntil > i ||
    ((s.count += 1),
    s.count >= Ch && ((s.lockedUntil = i + Eh), (s.count = 0)),
    It.set(r, s))
}
function P0(t, e) {
  It.delete(ya(t, e))
}
async function Ye(t) {
  let r = new TextEncoder().encode(`${t}-https://github.com/alist-org/alist`),
    i = await crypto.subtle.digest("SHA-256", r)
  return Array.from(new Uint8Array(i))
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("")
}
async function A0(t) {
  let e = await U(t)
  if (!e.users || e.users.length === 0) {
    let r =
        (t && t.ADMIN_PASSWORD) ||
        (typeof process < "u" ? process.env?.ADMIN_PASSWORD : "") ||
        "",
      i = await Ye(r || "admin")
    ;((e.users = [
      {
        id: 1,
        username: "admin",
        password: i,
        role: 2,
        permission: 0,
        base_path: "/",
        disabled: !1,
        sso_id: "",
        allow_ldap: !1,
        pwd_update_at: new Date().toISOString(),
      },
      {
        id: 2,
        username: "guest",
        password: "",
        role: 1,
        permission: 0,
        base_path: "/",
        disabled: !1,
        sso_id: "",
        allow_ldap: !1,
        pwd_update_at: new Date().toISOString(),
      },
    ]),
      await q(e, t))
  }
  return { db: e, users: e.users }
}
async function Qt(t) {
  let e = t.req.header("Authorization")
  if (!e) return null
  let r = e.startsWith("Bearer ") ? e.substring(7) : e
  try {
    let i = await gt(t),
      s = await ht(r, i, "HS256"),
      n = await U(t.env)
    n.users || (n.users = [])
    let a = n.users.find((o) => o.id === s.id || o.username === s.username)
    return a ? { db: n, user: a } : null
  } catch {
    return null
  }
}
async function C0(t, e) {
  if (!t.otp_secret)
    return { ok: !0, code: 200, httpStatus: 200, message: "ok" }
  let r = String(e.otp_code || e.code || "").trim()
  return r
    ? (await ga(t.otp_secret, r))
      ? { ok: !0, code: 200, httpStatus: 200, message: "ok" }
      : { ok: !1, code: 401, httpStatus: 401, message: "Invalid OTP code" }
    : { ok: !1, code: 402, httpStatus: 200, message: "OTP code required" }
}
Ke.post("/login", async (t) => {
  let e = await t.req.json().catch(() => ({})),
    r = (e.username || "").trim(),
    i = e.password || ""
  if (k0(t, r))
    return t.json(
      {
        code: 429,
        message:
          "Too many failed login attempts for this account/IP, please try again later",
        data: null,
      },
      429,
    )
  let s = await Ye(i),
    { users: n } = await A0(t.env),
    a = n.find((o) => o.username === r && !o.disabled)
  if (a) {
    let o = a.password || ""
    if ((o !== "" && o === i) || o === s) {
      let d = await C0(a, e)
      if (!d.ok)
        return t.json(
          { code: d.code, message: d.message, data: null },
          d.httpStatus,
        )
      P0(t, r)
      let l = {
          id: a.id,
          username: a.username,
          role: a.role,
          exp: Math.floor(Date.now() / 1e3) + 3600 * 24 * 7,
        },
        u = await gt(t),
        p = await Ir(l, u)
      return t.json({ code: 200, message: "success", data: { token: p } })
    }
  }
  return (
    S0(t, r),
    t.json({ code: 401, message: "Invalid credentials", data: null }, 401)
  )
})
Ke.post("/login/hash", async (t) => {
  let e = await t.req.json().catch(() => ({})),
    r = (e.username || "").trim(),
    i = e.password || ""
  if (k0(t, r))
    return t.json(
      {
        code: 429,
        message:
          "Too many failed login attempts for this account/IP, please try again later",
        data: null,
      },
      429,
    )
  let { users: s } = await A0(t.env),
    n = s.find((a) => a.username === r && !a.disabled)
  if (n) {
    let a = n.password || "",
      o = a.length === 64 ? a : await Ye(a || "admin")
    if (i === a || i === o) {
      let d = await C0(n, e)
      if (!d.ok)
        return t.json(
          { code: d.code, message: d.message, data: null },
          d.httpStatus,
        )
      P0(t, r)
      let l = {
          id: n.id,
          username: n.username,
          role: n.role,
          exp: Math.floor(Date.now() / 1e3) + 3600 * 24 * 7,
        },
        u = await gt(t),
        p = await Ir(l, u)
      return t.json({ code: 200, message: "success", data: { token: p } })
    }
  }
  return (
    S0(t, r),
    t.json({ code: 401, message: "Invalid credentials", data: null }, 401)
  )
})
var xa = async (t) => {
    let e = await Qt(t)
    if (!e)
      return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
    let { db: r, user: i } = e,
      s = await t.req.json().catch(() => ({}))
    if (s.username && s.username.trim() !== "") {
      let n = s.username.trim()
      if (r.users.some((o) => o.id !== i.id && o.username === n))
        return t.json(
          { code: 400, message: "Username already exists", data: null },
          400,
        )
      i.username = n
    }
    return (
      s.password &&
        s.password.trim() !== "" &&
        ((i.password = await Ye(s.password.trim())),
        (i.pwd_update_at = new Date().toISOString())),
      await q(r, t.env),
      t.json({ code: 200, message: "success", data: null })
    )
  },
  wa = async (t) => {
    let e = await ee(t)
    return !e || e.disabled
      ? t.json({ code: 401, message: "Unauthorized", data: null }, 401)
      : t.json({
          code: 200,
          message: "success",
          data: {
            id: e.id,
            username: e.username,
            role: e.role,
            permission: e.permission ?? 0,
            base_path: e.base_path || "/",
            disabled: !!e.disabled,
            sso_id: e.sso_id || "",
            allow_ldap: !!e.allow_ldap,
            otp: !!e.otp_secret,
          },
        })
  }
Ke.get("/me", wa)
Ke.post("/me/update", xa)
var Ur = (t) => t.json({ code: 200, message: "success", data: null })
Ke.get("/logout", Ur)
Ke.post("/logout", Ur)
Ke.post("/2fa/generate", async (t) => {
  let e = await Qt(t)
  if (!e) return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
  let { user: r } = e
  if (r.otp_secret)
    return t.json(
      { code: 400, message: "2FA already enabled", data: null },
      400,
    )
  let i = m0(),
    s = y0(i, r.username)
  return t.json({
    code: 200,
    message: "success",
    data: { qr: x0(s), secret: i },
  })
})
Ke.post("/2fa/verify", async (t) => {
  let e = await Qt(t)
  if (!e) return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
  let { db: r, user: i } = e,
    s = await t.req.json().catch(() => ({})),
    n = String(s.code || "").trim(),
    a = String(s.secret || "").trim()
  return a
    ? /^[A-Z2-7]+$/i.test(a)
      ? (await ga(a, n))
        ? ((i.otp_secret = a.toUpperCase()),
          await q(r, t.env),
          t.json({ code: 200, message: "success", data: null }))
        : t.json({ code: 400, message: "Invalid code", data: null }, 400)
      : t.json({ code: 400, message: "Invalid secret format", data: null }, 400)
    : t.json(
        { code: 400, message: "Missing secret parameter", data: null },
        400,
      )
})
Br.get("/sshkey/list", async (t) => {
  let e = await Qt(t)
  if (!e) return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
  let r = await Jt(e.user.id, t.env)
  return t.json({
    code: 200,
    message: "success",
    data: { content: r, total: r.length },
  })
})
Br.post("/sshkey/add", async (t) => {
  let e = await Qt(t)
  if (!e) return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
  let r = await t.req.json().catch(() => ({}))
  try {
    let i = await b0(
      e.user.id,
      r.key || r.public_key || "",
      r.name || r.title || "",
      t.env,
    )
    return t.json({ code: 200, message: "success", data: i })
  } catch (i) {
    return t.json(
      { code: 400, message: i.message || "Failed to add SSH key", data: null },
      400,
    )
  }
})
Br.post("/sshkey/delete", async (t) => {
  let e = await Qt(t)
  if (!e) return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
  let r = t.req.query("id")
  if (!r)
    return t.json(
      { code: 400, message: "Missing id parameter", data: null },
      400,
    )
  if (!(await $s(e.user.id, r, t.env)))
    return t.json({ code: 404, message: "SSH key not found", data: null }, 404)
  let s = await Jt(e.user.id, t.env)
  return t.json({ code: 200, message: "success", data: s })
})
ie()
Bs()
ie()
Rr()
Ze()
var ze = new Q()
ze.get("/list", async (t) => {
  let r = ((await U(t.env)).users || []).map((i) => ({
    id: i.id,
    username: i.username,
    role: i.role,
    permission: i.permission ?? 0,
    base_path: i.base_path || "/",
    disabled: !!i.disabled,
    sso_id: i.sso_id || "",
    allow_ldap: !!i.allow_ldap,
    pwd_update_at: i.pwd_update_at || "",
    otp: !!i.otp_secret,
  }))
  return t.json({
    code: 200,
    message: "success",
    data: { content: r, total: r.length },
  })
})
ze.get("/get", async (t) => {
  let e = t.req.query("id")
  if (!e)
    return t.json(
      { code: 400, message: "Missing id parameter", data: null },
      400,
    )
  let r = parseInt(e, 10),
    s = ((await U(t.env)).users || []).find((n) => n.id === r)
  return s
    ? t.json({
        code: 200,
        message: "success",
        data: {
          id: s.id,
          username: s.username,
          password: "",
          role: s.role,
          permission: s.permission ?? 0,
          base_path: s.base_path || "/",
          disabled: !!s.disabled,
          sso_id: s.sso_id || "",
          allow_ldap: !!s.allow_ldap,
          otp: !!s.otp_secret,
        },
      })
    : t.json({ code: 404, message: "User not found", data: null }, 404)
})
ze.post("/create", async (t) => {
  let e = await t.req.json().catch(() => ({}))
  if (!e.username)
    return t.json(
      { code: 400, message: "Username is required", data: null },
      400,
    )
  let r = await U(t.env)
  if (
    (r.users || (r.users = []), r.users.some((d) => d.username === e.username))
  )
    return t.json(
      { code: 400, message: "Username already exists", data: null },
      400,
    )
  let n = r.users.reduce((d, l) => Math.max(d, l.id || 0), 0) + 1,
    a = e.password || "123456",
    o = await Ye(a),
    c = {
      id: n,
      username: e.username,
      password: o,
      role: e.role !== void 0 ? parseInt(e.role, 10) : 0,
      permission: e.permission !== void 0 ? parseInt(e.permission, 10) : 0,
      base_path: e.base_path || "/",
      disabled: !!e.disabled,
      sso_id: e.sso_id || "",
      allow_ldap: !!e.allow_ldap,
      pwd_update_at: new Date().toISOString(),
    }
  return (
    r.users.push(c),
    await q(r, t.env),
    t.json({ code: 200, message: "success", data: null })
  )
})
ze.post("/update", async (t) => {
  let e = await t.req.json().catch(() => ({}))
  if (!e.id)
    return t.json(
      { code: 400, message: "User ID is required", data: null },
      400,
    )
  let r = parseInt(e.id, 10),
    i = await U(t.env)
  i.users || (i.users = [])
  let s = i.users.findIndex((a) => a.id === r)
  if (s === -1)
    return t.json({ code: 404, message: "User not found", data: null }, 404)
  let n = i.users[s]
  if (e.username && e.username !== n.username) {
    if (i.users.some((o) => o.id !== r && o.username === e.username))
      return t.json(
        { code: 400, message: "Username already in use", data: null },
        400,
      )
    n.username = e.username
  }
  return (
    e.password &&
      e.password.trim() !== "" &&
      ((n.password = await Ye(e.password)),
      (n.pwd_update_at = new Date().toISOString())),
    e.role !== void 0 && (n.role = parseInt(e.role, 10)),
    e.permission !== void 0 && (n.permission = parseInt(e.permission, 10)),
    e.base_path !== void 0 && (n.base_path = e.base_path),
    e.disabled !== void 0 && (n.disabled = !!e.disabled),
    e.sso_id !== void 0 && (n.sso_id = e.sso_id),
    e.allow_ldap !== void 0 && (n.allow_ldap = !!e.allow_ldap),
    (i.users[s] = n),
    await q(i, t.env),
    t.json({ code: 200, message: "success", data: null })
  )
})
var E0 = async (t) => {
  let e = t.req.query("id")
  if (!e)
    return t.json(
      { code: 400, message: "Missing id parameter", data: null },
      400,
    )
  let r = parseInt(e, 10)
  if (r === 1)
    return t.json(
      { code: 400, message: "Cannot delete primary admin user", data: null },
      400,
    )
  let i = await U(t.env)
  return (
    i.users || (i.users = []),
    (i.users = i.users.filter((s) => s.id !== r)),
    await q(i, t.env),
    t.json({ code: 200, message: "success", data: null })
  )
}
ze.post("/delete", E0)
ze.post("/cancel", E0)
ze.get("/sshkey/list", async (t) => {
  let e = parseInt(t.req.query("uid") || "0", 10),
    r = await Jt(e, t.env)
  return t.json({
    code: 200,
    message: "success",
    data: { content: r, total: r.length },
  })
})
ze.post("/sshkey/delete", async (t) => {
  let e = parseInt(t.req.query("uid") || "0", 10),
    r = t.req.query("id")
  if (!e || !r)
    return t.json(
      { code: 400, message: "Missing uid or id parameter", data: null },
      400,
    )
  if (!(await $s(e, r, t.env)))
    return t.json({ code: 404, message: "SSH key not found", data: null }, 404)
  let s = await Jt(e, t.env)
  return t.json({ code: 200, message: "success", data: s })
})
ze.post("/cancel_2fa", async (t) => {
  let e = parseInt(t.req.query("id") || "0", 10)
  if (!e)
    return t.json(
      { code: 400, message: "Missing id parameter", data: null },
      400,
    )
  let r = await U(t.env),
    i = (r.users || []).find((s) => s.id === e)
  return i
    ? (delete i.otp_secret,
      await q(r, t.env),
      t.json({ code: 200, message: "success", data: null }))
    : t.json({ code: 404, message: "User not found", data: null }, 404)
})
var D0 = async (t) => {
  let e = t.req.header("Authorization")
  if (!e) return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
  let r = e.startsWith("Bearer ") ? e.substring(7) : e
  try {
    let i = await gt(t),
      s = await ht(r, i, "HS256"),
      n = await t.req.json().catch(() => ({})),
      a = n.old_password || "",
      o = n.new_password || ""
    if (!o)
      return t.json(
        { code: 400, message: "New password is required", data: null },
        400,
      )
    let c = await U(t.env)
    c.users || (c.users = [])
    let d = c.users.findIndex((p) => p.id === s.id || p.username === s.username)
    if (d === -1)
      return t.json({ code: 404, message: "User not found", data: null }, 404)
    let l = c.users[d],
      u = await Ye(a)
    return l.password && l.password !== a && l.password !== u
      ? t.json(
          { code: 400, message: "Incorrect old password", data: null },
          400,
        )
      : ((l.password = await Ye(o)),
        (l.pwd_update_at = new Date().toISOString()),
        (c.users[d] = l),
        await q(c, t.env),
        t.json({ code: 200, message: "success", data: null }))
  } catch (i) {
    return t.json(
      {
        code: 401,
        message: `Unauthorized: ${i.message || "Invalid token"}`,
        data: null,
      },
      401,
    )
  }
}
var z = new Q()
z.use("*", async (t, e) => {
  if (!(await Tt(t)))
    return t.json({ code: 401, message: "Unauthorized", data: null })
  await e()
})
z.get("/storage/list", async (t) => {
  let e = await U(t.env)
  return t.json({
    code: 200,
    message: "success",
    data: { content: e.storages, total: e.storages.length },
  })
})
z.post("/storage/load_all", async (t) => {
  let e = await U(t.env),
    r = [],
    i = 0,
    s = 0
  for (let n of e.storages || [])
    if (!n.disabled)
      try {
        ;(await G(n.driver, n),
          i++,
          r.push({
            id: n.id,
            mount_path: n.mount_path,
            driver: n.driver,
            status: "ok",
          }))
      } catch (a) {
        ;(s++,
          r.push({
            id: n.id,
            mount_path: n.mount_path,
            driver: n.driver,
            status: "failed",
            error: a?.message || String(a),
          }))
      }
  return t.json({
    code: 200,
    message: "success",
    data: { loaded: i, failed: s, results: r },
  })
})
z.get("/storage/get", async (t) => {
  let e = parseInt(t.req.query("id") || "0", 10),
    i = (await U(t.env)).storages.find((s) => s.id === e)
  return i
    ? t.json({ code: 200, message: "success", data: i })
    : t.json({ code: 404, message: "storage not found", data: null })
})
var T0 = (t, e) => {
  let r = (t || "").toLowerCase()
  if (r.includes("thunder") || r.includes("xunlei"))
    try {
      let i = JSON.parse(e || "{}")
      if (
        !i.device_id ||
        typeof i.device_id != "string" ||
        i.device_id.trim().length !== 32
      ) {
        let s =
          typeof crypto < "u" && typeof crypto.randomUUID == "function"
            ? crypto.randomUUID().replace(/-/g, "")
            : Math.random().toString(16).substring(2).padEnd(16, "0") +
              Math.random().toString(16).substring(2).padEnd(16, "0")
        return ((i.device_id = s.slice(0, 32)), JSON.stringify(i))
      }
    } catch {}
  return e
}
z.post("/storage/create", async (t) => {
  let e = await t.req.json().catch(() => ({})),
    r = await U(t.env),
    i = "/" + (e.mount_path || "").split("/").filter(Boolean).join("/")
  if (
    r.storages.some(
      (a) =>
        "/" + (a.mount_path || "").split("/").filter(Boolean).join("/") === i,
    )
  )
    return t.json({
      code: 400,
      message: "mount path already exists",
      data: null,
    })
  let s = T0(e.driver, e.addition || "{}"),
    n = {
      ...e,
      addition: s,
      mount_path: i,
      id: r.storages.length ? Math.max(...r.storages.map((a) => a.id)) + 1 : 1,
      status: "work",
      modified: new Date().toISOString(),
    }
  if (!n.disabled)
    try {
      ;(await (await G(n.driver, n)).init?.(), (n.status = "work"))
    } catch (a) {
      return (
        (n.status = a.message || String(a)),
        r.storages.push(n),
        await q(r, t.env),
        t.json({ code: 500, message: a.message || String(a), data: n })
      )
    }
  return (
    r.storages.push(n),
    await q(r, t.env),
    t.json({ code: 200, message: "success", data: n })
  )
})
z.post("/storage/update", async (t) => {
  let e = await t.req.json().catch(() => ({})),
    r = await U(t.env),
    i = "/" + (e.mount_path || "").split("/").filter(Boolean).join("/")
  if (
    r.storages.some(
      (n) =>
        n.id !== e.id &&
        "/" + (n.mount_path || "").split("/").filter(Boolean).join("/") === i,
    )
  )
    return t.json({
      code: 400,
      message: "mount path already exists",
      data: null,
    })
  let s = r.storages.findIndex((n) => n.id === e.id)
  if (s !== -1) {
    let n = T0(
        e.driver || r.storages[s].driver,
        e.addition || r.storages[s].addition || "{}",
      ),
      a = {
        ...r.storages[s],
        ...e,
        addition: n,
        mount_path: i,
        modified: new Date().toISOString(),
      }
    if (!a.disabled)
      try {
        ;(await (await G(a.driver, a)).init?.(), (a.status = "work"))
      } catch (o) {
        return (
          (a.status = o.message || String(o)),
          (r.storages[s] = a),
          await q(r, t.env),
          t.json({
            code: 500,
            message: o.message || String(o),
            data: { id: a.id },
          })
        )
      }
    ;((r.storages[s] = a), await q(r, t.env))
  }
  return t.json({ code: 200, message: "success", data: null })
})
z.post("/storage/delete", async (t) => {
  let e = parseInt(t.req.query("id") || "0", 10),
    r = await U(t.env)
  return (
    (r.storages = r.storages.filter((i) => i.id !== e)),
    await q(r, t.env),
    t.json({ code: 200, message: "success", data: null })
  )
})
z.post("/storage/enable", async (t) => {
  let e = parseInt(t.req.query("id") || "0", 10),
    r = await U(t.env),
    i = r.storages.find((s) => s.id === e)
  if (i) {
    ;((i.disabled = !1), (i.modified = new Date().toISOString()))
    try {
      ;(await (await G(i.driver, i)).init?.(), (i.status = "work"))
    } catch (s) {
      return (
        (i.status = s.message || String(s)),
        await q(r, t.env),
        t.json({ code: 500, message: s.message || String(s), data: null })
      )
    }
    await q(r, t.env)
  }
  return t.json({ code: 200, message: "success", data: null })
})
z.post("/storage/disable", async (t) => {
  let e = parseInt(t.req.query("id") || "0", 10),
    r = await U(t.env),
    i = r.storages.find((s) => s.id === e)
  return (
    i && ((i.disabled = !0), await q(r, t.env)),
    t.json({ code: 200, message: "success", data: null })
  )
})
z.get("/driver/names", (t) =>
  t.json({
    code: 200,
    message: "success",
    data: [
      "AliyundriveOpen",
      "GoogleDrive",
      "Onedrive",
      "OnedriveAPP",
      "Quark",
      "123Pan",
      "BaiduNetdisk",
      "115Open",
      "GitHub API",
      "Thunder",
      "ThunderExpert",
      "189Cloud",
      "WoPan",
      "Lanzou",
      "WebDav",
      "S3",
      "Doge",
    ],
  }),
)
var fe = [
    { name: "mount_path", type: "string", default: "", required: !0 },
    { name: "order", type: "number", default: "0", required: !1 },
    { name: "remark", type: "string", default: "", required: !1 },
    { name: "cache_expiration", type: "number", default: "30", required: !1 },
    { name: "web_proxy", type: "bool", default: "false", required: !1 },
    {
      name: "webdav_policy",
      type: "select",
      options: "302_redirect,use_proxy_url,native_proxy",
      default: "302_redirect",
      required: !1,
    },
    { name: "down_proxy_url", type: "string", default: "", required: !1 },
  ],
  va = {
    AliyundriveOpen: {
      name: "AliyundriveOpen",
      default_mount_path: "/aliyundrive",
      common: fe,
      additional: [
        {
          name: "refresh_token",
          type: "text",
          default: "",
          required: !0,
          help: "true",
        },
        {
          name: "drive_type",
          type: "select",
          options: "resource,backup,default",
          default: "resource",
          required: !0,
        },
        { name: "drive_id", type: "string", default: "", required: !1 },
        {
          name: "root_folder_id",
          type: "string",
          default: "root",
          required: !0,
        },
        {
          name: "order_by",
          type: "select",
          options: "updated_at,name,size,created_at",
          default: "updated_at",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "DESC,ASC",
          default: "DESC",
          required: !1,
        },
        {
          name: "api_url_address",
          type: "string",
          default: "https://api.oplist.org/alicloud/renewapi",
          required: !1,
          help: "true",
        },
        {
          name: "alipan_type",
          type: "select",
          options: "alipanQR,alipanTV",
          default: "alipanQR",
          required: !1,
        },
        { name: "client_id", type: "string", default: "", required: !1 },
        { name: "client_secret", type: "string", default: "", required: !1 },
        {
          name: "remove_way",
          type: "select",
          options: "trash,delete",
          default: "trash",
          required: !1,
        },
      ],
      config: {
        name: "AliyundriveOpen",
        local_sort: !0,
        only_local: !1,
        only_proxy: !1,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "root",
      },
    },
    Onedrive: {
      name: "Onedrive",
      default_mount_path: "/onedrive",
      common: fe.slice(0, 3),
      additional: [
        {
          name: "root_folder_path",
          type: "string",
          default: "/",
          required: !0,
        },
        {
          name: "region",
          type: "select",
          options: "global,cn,us,de",
          default: "global",
          required: !0,
        },
        { name: "is_sharepoint", type: "bool", default: "false", required: !1 },
        { name: "use_online_api", type: "bool", default: "true", required: !1 },
        {
          name: "api_url_address",
          type: "string",
          default: "https://api.oplist.org/onedrive/renewapi",
          required: !1,
        },
        { name: "client_id", type: "string", default: "", required: !1 },
        { name: "client_secret", type: "string", default: "", required: !1 },
        {
          name: "redirect_uri",
          type: "string",
          default: "https://api.oplist.org/onedrive/callback",
          required: !0,
        },
        { name: "refresh_token", type: "string", default: "", required: !0 },
        { name: "site_id", type: "string", default: "", required: !1 },
        { name: "chunk_size", type: "number", default: "5", required: !1 },
        {
          name: "custom_host",
          type: "string",
          default: "",
          required: !1,
          help: "true",
        },
        {
          name: "disable_disk_usage",
          type: "bool",
          default: "false",
          required: !1,
          help: "true",
        },
        {
          name: "enable_direct_upload",
          type: "bool",
          default: "false",
          required: !1,
          help: "true",
        },
        {
          name: "order_by",
          type: "select",
          options: "filename,modified_time,size",
          default: "filename",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
      ],
      config: {
        name: "Onedrive",
        local_sort: !0,
        only_local: !1,
        only_proxy: !1,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "/",
      },
    },
    OnedriveAPP: {
      name: "OnedriveAPP",
      default_mount_path: "/onedrive_app",
      common: fe.slice(0, 3),
      additional: [
        {
          name: "root_folder_path",
          type: "string",
          default: "/",
          required: !0,
        },
        {
          name: "region",
          type: "select",
          options: "global,cn,us,de",
          default: "global",
          required: !0,
        },
        { name: "client_id", type: "string", default: "", required: !0 },
        { name: "client_secret", type: "string", default: "", required: !0 },
        { name: "tenant_id", type: "string", default: "", required: !0 },
        { name: "email", type: "string", default: "", required: !0 },
        { name: "chunk_size", type: "number", default: "5", required: !1 },
        {
          name: "custom_host",
          type: "string",
          default: "",
          required: !1,
          help: "true",
        },
        {
          name: "disable_disk_usage",
          type: "bool",
          default: "false",
          required: !1,
          help: "true",
        },
        {
          name: "enable_direct_upload",
          type: "bool",
          default: "false",
          required: !1,
          help: "true",
        },
        {
          name: "order_by",
          type: "select",
          options: "filename,modified_time,size",
          default: "filename",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
      ],
      config: {
        name: "OnedriveAPP",
        local_sort: !0,
        only_local: !1,
        only_proxy: !1,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "/",
      },
    },
    GoogleDrive: {
      name: "GoogleDrive",
      default_mount_path: "/google-drive",
      common: fe,
      additional: [
        {
          name: "refresh_token",
          type: "text",
          default: "",
          required: !0,
          help: "true",
        },
        {
          name: "root_folder_id",
          type: "string",
          default: "root",
          required: !1,
        },
        {
          name: "order_by",
          type: "select",
          options: "folder,name,modifiedTime desc",
          default: "folder,name,modifiedTime desc",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
        {
          name: "api_url_address",
          type: "string",
          default: "https://api.alist.nn.ci/googledrive/token",
          required: !1,
          help: "true",
        },
        { name: "use_online_api", type: "bool", default: "true", required: !1 },
        { name: "client_id", type: "string", default: "", required: !1 },
        { name: "client_secret", type: "string", default: "", required: !1 },
        { name: "chunk_size", type: "number", default: "5", required: !1 },
      ],
      config: {
        name: "GoogleDrive",
        local_sort: !0,
        only_local: !1,
        only_proxy: !1,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "root",
      },
    },
    Quark: {
      name: "Quark",
      default_mount_path: "/quark",
      common: fe,
      additional: [
        {
          name: "variant",
          type: "select",
          options: "Quark,UC",
          default: "Quark",
          required: !0,
        },
        {
          name: "cookie",
          type: "text",
          default: "",
          required: !0,
          help: "true",
        },
        { name: "root_folder_id", type: "string", default: "0", required: !0 },
        {
          name: "order_by",
          type: "select",
          options: "none,file_type,file_name,updated_at",
          default: "none",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
        {
          name: "use_transcoding_address",
          type: "bool",
          default: "false",
          required: !1,
        },
        {
          name: "only_list_video_file",
          type: "bool",
          default: "false",
          required: !1,
        },
      ],
      config: {
        name: "Quark",
        local_sort: !0,
        only_local: !1,
        only_proxy: !1,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "0",
      },
    },
    "123Pan": {
      name: "123Pan",
      default_mount_path: "/123",
      common: fe,
      additional: [
        { name: "username", type: "string", default: "", required: !0 },
        { name: "password", type: "string", default: "", required: !0 },
        {
          name: "access_token",
          type: "string",
          default: "",
          required: !1,
          help: "\u767B\u5F55\u4EE4\u724C\uFF08\u53EF\u9009\uFF0C\u81EA\u52A8\u6301\u4E45\u5316\uFF0C\u65E0\u9700\u624B\u52A8\u586B\u5199\uFF09\u3002\u4EC5\u9700\u586B\u5199\u4E0A\u65B9 123 \u7F51\u76D8\u624B\u673A\u53F7\u548C\u5BC6\u7801\uFF0C\u767B\u5F55\u540E\u81EA\u52A8\u83B7\u53D6\u5E76\u4FDD\u5B58\uFF0C\u8DF3\u8FC7\u91CD\u590D\u767B\u5F55\u53EF\u907F\u514D\u5883\u5916 IP \u89E6\u53D1\u98CE\u63A7\u3002",
        },
        {
          name: "cookie",
          type: "text",
          default: "",
          required: !1,
          help: "\u6D4F\u89C8\u5668 Cookie\uFF08\u53EF\u9009\uFF09\u3002\u5728 123 \u7F51\u76D8\u7F51\u9875\u767B\u5F55\u540E\uFF0C\u4ECE\u5F00\u53D1\u8005\u5DE5\u5177\u590D\u5236\u8BF7\u6C42\u5934\u4E2D\u7684 Cookie \u6574\u4E32\u7C98\u8D34\u4E8E\u6B64\uFF08\u542B sso-token\uFF09\uFF0C\u6216\u4ECE Authorization: Bearer <token> \u4E2D\u590D\u5236 token/Bearer \u503C\u3002\u89E3\u6790\u51FA\u7684 JWT \u4F1A\u4F5C\u4E3A Bearer \u4EE4\u724C\u4F7F\u7528\uFF0C\u6548\u679C\u7B49\u540C\u8BBF\u95EE\u4EE4\u724C\uFF0C\u9002\u5408\u8D26\u53F7\u5BC6\u7801\u767B\u5F55\u88AB\u98CE\u63A7\u62E6\u622A\u7684\u73AF\u5883\u3002",
        },
        { name: "root_id", type: "string", default: "0", required: !1 },
        {
          name: "upload_thread",
          type: "number",
          default: "3",
          required: !1,
          help: "the threads of upload",
        },
        {
          name: "platform",
          type: "string",
          default: "web",
          required: !1,
          help: "the platform header value, sent with API requests",
        },
        {
          name: "order_by",
          type: "select",
          options: "file_id,file_name,size,created_at,updated_at",
          default: "file_id",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "desc",
          required: !1,
        },
      ],
      config: {
        name: "123Pan",
        local_sort: !0,
        only_local: !1,
        only_proxy: !0,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "0",
      },
    },
    BaiduNetdisk: {
      name: "BaiduNetdisk",
      default_mount_path: "/baidu",
      common: fe,
      additional: [
        {
          name: "refresh_token",
          type: "text",
          default: "",
          required: !0,
          help: "true",
        },
        {
          name: "access_token",
          type: "string",
          default: "",
          required: !0,
          help: "\u8BBF\u95EE\u4EE4\u724C\uFF08\u5FC5\u586B\uFF09\u3002\u901A\u8FC7 https://api.oplist.org/ \u83B7\u53D6\u3002\u82E5\u4EE4\u724C\u5931\u6548\uFF0C\u6302\u8F7D\u65F6\u4F1A\u81EA\u52A8\u6839\u636E refresh_token \u901A\u8FC7\u5728\u7EBF API \u6362\u65B0\u5E76\u6301\u4E45\u5316\u3002",
        },
        {
          name: "use_online_api",
          type: "bool",
          default: "true",
          required: !1,
          help: "\u4F7F\u7528\u5728\u7EBF API \u5237\u65B0 token\uFF08\u65E0\u9700 ClientID/ClientSecret\uFF09",
        },
        {
          name: "api_url_address",
          type: "string",
          default: "https://api.oplist.org/baiduyun/renewapi",
          required: !1,
        },
        { name: "client_id", type: "string", default: "", required: !1 },
        { name: "client_secret", type: "string", default: "", required: !1 },
        {
          name: "download_api",
          type: "select",
          options: "official,crack,crack_video",
          default: "official",
          required: !1,
        },
        {
          name: "custom_crack_ua",
          type: "string",
          default: "netdisk",
          required: !0,
        },
        {
          name: "order_by",
          type: "select",
          options: "name,time,size",
          default: "name",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
        {
          name: "only_list_video_file",
          type: "bool",
          default: "false",
          required: !1,
        },
        {
          name: "upload_thread",
          type: "string",
          default: "3",
          required: !1,
          help: "1<=thread<=32",
        },
        {
          name: "upload_timeout",
          type: "number",
          default: "60",
          required: !1,
          help: "per-slice upload timeout in seconds",
        },
        {
          name: "custom_upload_part_size",
          type: "number",
          default: "0",
          required: !1,
          help: "0 for auto",
        },
        {
          name: "use_dynamic_upload_api",
          type: "bool",
          default: "true",
          required: !1,
          help: "dynamically get upload api domain, when enabled, the 'Upload API' setting will be used as a fallback if failed to get",
        },
        {
          name: "upload_api",
          type: "string",
          default: "https://d.pcs.baidu.com",
          required: !1,
        },
        {
          name: "low_bandwith_upload_mode",
          type: "bool",
          default: "false",
          required: !1,
        },
      ],
      config: {
        name: "BaiduNetdisk",
        local_sort: !0,
        only_local: !1,
        only_proxy: !0,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "/",
      },
    },
    "115Open": {
      name: "115Open",
      default_mount_path: "/115",
      common: fe,
      additional: [
        {
          name: "access_token",
          type: "string",
          default:
            "e4mvi.43f51ee687247d07f386048e903ae6b7.3a9175e14e8e4b254ab81462866f9111e2bdc9984324da30a2b8e2bdfad74ff1",
          required: !0,
          help: "\u8BBF\u95EE\u4EE4\u724C\uFF08\u5FC5\u586B\uFF09\u3002\u901A\u8FC7 115 \u5F00\u653E\u5E73\u53F0\u83B7\u53D6\uFF1B\u5931\u6548\u65F6\u81EA\u52A8\u7528 refresh_token \u5237\u65B0\u5E76\u6301\u4E45\u5316\u3002",
        },
        {
          name: "refresh_token",
          type: "string",
          default: "",
          required: !0,
          help: "\u5237\u65B0\u4EE4\u724C\uFF08\u5FC5\u586B\uFF09\u3002\u901A\u8FC7 115 \u5F00\u653E\u5E73\u53F0\u83B7\u53D6\uFF1Baccess_token \u5931\u6548\u65F6\u81EA\u52A8\u5237\u65B0\u3002",
        },
        {
          name: "root_id",
          type: "string",
          default: "0",
          required: !1,
          help: "\u6839\u6587\u4EF6\u5939 ID\uFF0C\u9ED8\u8BA4 0\uFF08\u6839\u76EE\u5F55\uFF09",
        },
        {
          name: "order_by",
          type: "select",
          options: "file_name,file_size,user_utime,file_type",
          default: "file_name",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
        {
          name: "page_size",
          type: "number",
          default: "200",
          required: !1,
          help: "list api per page size (1~1150)",
        },
        {
          name: "limit_rate",
          type: "float",
          default: "1",
          required: !1,
          help: "limit all api request rate ([limit]r/1s)\uFF0C0 \u8868\u793A\u4E0D\u9650\u901F",
        },
      ],
      config: {
        name: "115Open",
        local_sort: !0,
        only_local: !1,
        only_proxy: !0,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "0",
      },
    },
    "GitHub API": {
      name: "GitHub API",
      default_mount_path: "/github",
      common: fe,
      additional: [
        {
          name: "root_folder_path",
          type: "string",
          default: "/",
          required: !0,
        },
        { name: "token", type: "string", default: "", required: !0 },
        { name: "owner", type: "string", default: "", required: !0 },
        { name: "repo", type: "string", default: "", required: !0 },
        {
          name: "ref",
          type: "string",
          default: "",
          required: !1,
          help: "A branch, a tag or a commit SHA, default branch by default.",
        },
        {
          name: "gh_proxy",
          type: "string",
          default: "",
          required: !1,
          help: "GitHub proxy, e.g. https://ghproxy.net/raw.githubusercontent.com",
        },
        { name: "committer_name", type: "string", default: "", required: !1 },
        { name: "committer_email", type: "string", default: "", required: !1 },
        { name: "author_name", type: "string", default: "", required: !1 },
        { name: "author_email", type: "string", default: "", required: !1 },
        {
          name: "mkdir_commit_message",
          type: "text",
          default: "{{.UserName}} mkdir {{.ObjPath}}",
          required: !1,
        },
        {
          name: "delete_commit_message",
          type: "text",
          default: "{{.UserName}} remove {{.ObjPath}}",
          required: !1,
        },
        {
          name: "put_commit_message",
          type: "text",
          default: "{{.UserName}} upload {{.ObjPath}}",
          required: !1,
        },
        {
          name: "rename_commit_message",
          type: "text",
          default: "{{.UserName}} rename {{.ObjPath}} to {{.TargetName}}",
          required: !1,
        },
        {
          name: "copy_commit_message",
          type: "text",
          default: "{{.UserName}} copy {{.ObjPath}} to {{.TargetPath}}",
          required: !1,
        },
        {
          name: "move_commit_message",
          type: "text",
          default: "{{.UserName}} move {{.ObjPath}} to {{.TargetPath}}",
          required: !1,
        },
        {
          name: "order_by",
          type: "select",
          options: "name,size,modified",
          default: "name",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
      ],
      config: {
        name: "GitHub API",
        local_sort: !0,
        only_local: !1,
        only_proxy: !1,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "/",
      },
    },
    Thunder: {
      name: "Thunder",
      default_mount_path: "/thunder",
      common: fe,
      additional: [
        { name: "root_folder_id", type: "string", default: "", required: !1 },
        { name: "username", type: "string", default: "", required: !0 },
        { name: "password", type: "string", default: "", required: !0 },
        { name: "captcha_token", type: "string", default: "", required: !1 },
        {
          name: "credit_key",
          type: "string",
          default: "",
          required: !1,
          help: "credit key, used for login",
        },
        {
          name: "device_id",
          type: "string",
          default: "",
          required: !1,
          help: "32 hex characters",
        },
        {
          name: "space",
          type: "string",
          default: "",
          required: !1,
          help: "device id for remote device",
        },
        {
          name: "order_by",
          type: "select",
          options: "name,size,modified",
          default: "name",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
      ],
      config: {
        name: "Thunder",
        local_sort: !0,
        only_local: !1,
        only_proxy: !1,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "",
      },
    },
    ThunderExpert: {
      name: "ThunderExpert",
      default_mount_path: "/thunderexpert",
      common: fe,
      additional: [
        { name: "root_folder_id", type: "string", default: "", required: !1 },
        {
          name: "login_type",
          type: "select",
          options: "user,refresh_token",
          default: "user",
          required: !0,
        },
        {
          name: "sign_type",
          type: "select",
          options: "algorithms,captcha_sign",
          default: "algorithms",
          required: !0,
        },
        {
          name: "username",
          type: "string",
          default: "",
          required: !1,
          help: "login type is user, this is required",
        },
        {
          name: "password",
          type: "string",
          default: "",
          required: !1,
          help: "login type is user, this is required",
        },
        {
          name: "refresh_token",
          type: "string",
          default: "",
          required: !1,
          help: "login type is refresh_token, this is required",
        },
        {
          name: "algorithms",
          type: "string",
          default:
            "9uJNVj/wLmdwKrJaVj/omlQ,Oz64Lp0GigmChHMf/6TNfxx7O9PyopcczMsnf,Eb+L7Ce+Ej48u,jKY0,ASr0zCl6v8W4aidjPK5KHd1Lq3t+vBFf41dqv5+fnOd,wQlozdg6r1qxh0eRmt3QgNXOvSZO6q/GXK,gmirk+ciAvIgA/cxUUCema47jr/YToixTT+Q6O,5IiCoM9B1/788ntB,P07JH0h6qoM6TSUAK2aL9T5s2QBVeY9JWvalf,+oK0AN",
          required: !1,
        },
        { name: "captcha_sign", type: "string", default: "", required: !1 },
        { name: "timestamp", type: "string", default: "", required: !1 },
        { name: "captcha_token", type: "string", default: "", required: !1 },
        {
          name: "credit_key",
          type: "string",
          default: "",
          required: !1,
          help: "credit key, used for login",
        },
        { name: "device_id", type: "string", default: "", required: !1 },
        {
          name: "client_id",
          type: "string",
          default: "Xp6vsxz_7IYVw2BB",
          required: !0,
        },
        {
          name: "client_secret",
          type: "string",
          default: "Xp6vsy4tN9toTVdMSpomVdXpRmES",
          required: !0,
        },
        {
          name: "client_version",
          type: "string",
          default: "8.31.0.9726",
          required: !0,
        },
        {
          name: "package_name",
          type: "string",
          default: "com.xunlei.downloadprovider",
          required: !0,
        },
        {
          name: "user_agent",
          type: "string",
          default:
            "ANDROID-com.xunlei.downloadprovider/8.31.0.9726 netWorkType/5G appid/40 deviceName/Xiaomi_M2004j7ac deviceModel/M2004J7AC OSVersion/12 protocolVersion/301 platformVersion/10 sdkVersion/512000 Oauth2Client/0.9 (Linux 4_14_186-perf-gddfs8vbb238b) (JAVA 0)",
          required: !0,
        },
        {
          name: "download_user_agent",
          type: "string",
          default:
            "Dalvik/2.1.0 (Linux; U; Android 12; M2004J7AC Build/SP1A.210812.016)",
          required: !0,
        },
        { name: "use_video_url", type: "bool", default: "false", required: !1 },
        {
          name: "space",
          type: "string",
          default: "",
          required: !1,
          help: "device id for remote device",
        },
        {
          name: "order_by",
          type: "select",
          options: "name,size,modified",
          default: "name",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
      ],
      config: {
        name: "ThunderExpert",
        local_sort: !0,
        only_local: !1,
        only_proxy: !1,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "",
      },
    },
    "189Cloud": {
      name: "189Cloud",
      default_mount_path: "/189",
      common: fe,
      additional: [
        {
          name: "username",
          type: "string",
          default: "",
          required: !0,
          help: "the phone number used to log in",
        },
        {
          name: "password",
          type: "string",
          default: "",
          required: !0,
          help: "password for login",
        },
        {
          name: "cookie",
          type: "text",
          default: "",
          required: !1,
          help: "Fill in the cookie if need captcha (\u82E5\u9047\u6ED1\u5757\u9A8C\u8BC1\u7801\u6216\u8BBE\u5907\u9501\uFF0C\u53EF\u5728\u6D4F\u89C8\u5668\u767B\u5F55\u540E\u590D\u5236 Cookie \u586B\u5165)",
        },
        {
          name: "root_folder_id",
          type: "string",
          default: "-11",
          required: !1,
          help: "\u6839\u6587\u4EF6\u5939ID\uFF0C\u9ED8\u8BA4\u4E3A -11\uFF08\u4E2A\u4EBA\u4E91\u6839\u76EE\u5F55\uFF09",
        },
        {
          name: "order_by",
          type: "select",
          options: "lastOpTime,filename,fileSize",
          default: "lastOpTime",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "desc,asc",
          default: "desc",
          required: !1,
        },
      ],
      config: {
        name: "189Cloud",
        local_sort: !0,
        only_local: !1,
        only_proxy: !1,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "-11",
      },
    },
    Lanzou: {
      name: "Lanzou",
      default_mount_path: "/lanzou",
      common: fe,
      additional: [
        {
          name: "type",
          type: "select",
          options: "cookie,account,url",
          default: "cookie",
          required: !0,
        },
        {
          name: "account",
          type: "string",
          default: "",
          required: !1,
          help: "\u8D26\u53F7\uFF08\u624B\u673A\u53F7/UID\uFF09\uFF0C\u4EC5 account \u6A21\u5F0F\u9700\u586B\u5199",
        },
        {
          name: "password",
          type: "string",
          default: "",
          required: !1,
          help: "\u5BC6\u7801\uFF0C\u4EC5 account \u6A21\u5F0F\u9700\u586B\u5199",
        },
        {
          name: "cookie",
          type: "text",
          default: "",
          required: !1,
          help: "\u767B\u5F55 Cookie\uFF08\u542B ylogin, phpdisk_info \u7B49\uFF09\uFF0Ccookie \u6A21\u5F0F\u9700\u586B\u5199\uFF1B\u6709\u6548\u671F\u7EA6 15 \u5929",
        },
        {
          name: "root_folder_id",
          type: "string",
          default: "-1",
          required: !1,
          help: "\u6839\u6587\u4EF6\u5939 ID / \u5206\u4EAB ID\uFF08\u4E2A\u4EBA\u76D8\u9ED8\u8BA4 -1\uFF0C\u5206\u4EAB\u94FE\u63A5\u586B\u5206\u4EAB ID \u5982 b00xxxx\uFF09",
        },
        {
          name: "share_password",
          type: "string",
          default: "",
          required: !1,
          help: "\u63D0\u53D6\u7801 / \u8BBF\u95EE\u5BC6\u7801\uFF08\u65E0\u5BC6\u7801\u7559\u7A7A\uFF09",
        },
        {
          name: "baseUrl",
          type: "string",
          default: "https://pc.woozooo.com",
          required: !1,
          help: "\u57FA\u672C API \u57DF\u540D",
        },
        {
          name: "shareUrl",
          type: "string",
          default: "https://pan.lanzoui.com",
          required: !1,
          help: "\u5206\u4EAB\u9875\u9762\u89E3\u6790\u57DF\u540D",
        },
        {
          name: "user_agent",
          type: "string",
          default:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Chrome/142.0.0.0 OpenList/42",
          required: !0,
          help: "\u53D1\u9001\u7ED9\u84DD\u594F\u4E91 API \u4E0E\u76F4\u94FE\u89E3\u6790\u65F6\u643A\u5E26\u7684\u5BA2\u6237\u7AEF User-Agent",
        },
        {
          name: "repair_file_info",
          type: "bool",
          default: "false",
          required: !1,
          help: "\u901A\u8FC7 HEAD \u8BF7\u6C42\u4FEE\u6B63\u6587\u4EF6\u7CBE\u786E\u5927\u5C0F\u4E0E\u4FEE\u6539\u65F6\u95F4\uFF08WebDAV \u63A8\u8350\u5F00\u542F\uFF09",
        },
        {
          name: "order_by",
          type: "select",
          options: "name,size,time",
          default: "name",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
      ],
      config: {
        name: "Lanzou",
        local_sort: !0,
        only_local: !1,
        only_proxy: !1,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "-1",
      },
    },
    WebDav: {
      name: "WebDav",
      default_mount_path: "/webdav",
      common: fe,
      additional: [
        {
          name: "vendor",
          type: "select",
          options: "other,sharepoint",
          default: "other",
          required: !0,
        },
        { name: "address", type: "string", default: "", required: !0 },
        { name: "username", type: "string", default: "", required: !0 },
        { name: "password", type: "string", default: "", required: !0 },
        {
          name: "root_folder_path",
          type: "string",
          default: "/",
          required: !1,
        },
        {
          name: "tls_insecure_skip_verify",
          type: "bool",
          default: "false",
          required: !1,
        },
        {
          name: "order_by",
          type: "select",
          options: "name,size,modified",
          default: "name",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
      ],
      config: {
        name: "WebDav",
        local_sort: !0,
        only_local: !1,
        only_proxy: !0,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "/",
      },
    },
    WoPan: {
      name: "WoPan",
      default_mount_path: "/wopan",
      common: fe,
      additional: [
        { name: "root_folder_id", type: "string", default: "0", required: !1 },
        { name: "refresh_token", type: "text", default: "", required: !0 },
        {
          name: "family_id",
          type: "string",
          default: "",
          required: !1,
          help: "true",
        },
        {
          name: "sort_rule",
          type: "select",
          options: "name_asc,name_desc,time_asc,time_desc,size_asc,size_desc",
          default: "name_asc",
          required: !1,
        },
        { name: "access_token", type: "string", default: "", required: !1 },
        {
          name: "order_by",
          type: "select",
          options: "name,size,modified",
          default: "name",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
      ],
      config: {
        name: "WoPan",
        local_sort: !0,
        only_local: !1,
        only_proxy: !1,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "0",
        no_overwrite_upload: !0,
      },
    },
    S3: {
      name: "S3",
      default_mount_path: "/s3",
      common: fe,
      additional: [
        {
          name: "root_folder_path",
          type: "string",
          default: "/",
          required: !1,
        },
        { name: "bucket", type: "string", default: "", required: !0 },
        { name: "endpoint", type: "string", default: "", required: !0 },
        { name: "region", type: "string", default: "", required: !1 },
        { name: "access_key_id", type: "string", default: "", required: !0 },
        {
          name: "secret_access_key",
          type: "string",
          default: "",
          required: !0,
        },
        { name: "session_token", type: "string", default: "", required: !1 },
        { name: "custom_host", type: "string", default: "", required: !1 },
        {
          name: "enable_custom_host_presign",
          type: "bool",
          default: "false",
          required: !1,
        },
        { name: "sign_url_expire", type: "number", default: "4", required: !1 },
        { name: "placeholder", type: "string", default: "", required: !1 },
        {
          name: "force_path_style",
          type: "bool",
          default: "false",
          required: !1,
        },
        {
          name: "list_object_version",
          type: "select",
          options: "v1,v2",
          default: "v1",
          required: !1,
        },
        {
          name: "remove_bucket",
          type: "bool",
          default: "false",
          required: !1,
          help: "true",
        },
        {
          name: "add_filename_to_disposition",
          type: "bool",
          default: "false",
          required: !1,
          help: "true",
        },
        {
          name: "enable_direct_upload",
          type: "bool",
          default: "false",
          required: !1,
        },
        {
          name: "direct_upload_host",
          type: "string",
          default: "",
          required: !1,
        },
        {
          name: "user_agent",
          type: "string",
          default: "",
          required: !1,
          help: "true",
        },
        {
          name: "order_by",
          type: "select",
          options: "name,size,modified",
          default: "name",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
      ],
      config: {
        name: "S3",
        local_sort: !0,
        only_local: !1,
        only_proxy: !1,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "/",
        check_status: !0,
      },
    },
    Doge: {
      name: "Doge",
      default_mount_path: "/doge",
      common: fe,
      additional: [
        {
          name: "root_folder_path",
          type: "string",
          default: "/",
          required: !1,
        },
        { name: "bucket", type: "string", default: "", required: !0 },
        { name: "endpoint", type: "string", default: "", required: !0 },
        { name: "region", type: "string", default: "", required: !1 },
        { name: "access_key_id", type: "string", default: "", required: !0 },
        {
          name: "secret_access_key",
          type: "string",
          default: "",
          required: !0,
        },
        { name: "session_token", type: "string", default: "", required: !1 },
        { name: "custom_host", type: "string", default: "", required: !1 },
        {
          name: "enable_custom_host_presign",
          type: "bool",
          default: "false",
          required: !1,
        },
        { name: "sign_url_expire", type: "number", default: "4", required: !1 },
        { name: "placeholder", type: "string", default: "", required: !1 },
        {
          name: "force_path_style",
          type: "bool",
          default: "false",
          required: !1,
        },
        {
          name: "list_object_version",
          type: "select",
          options: "v1,v2",
          default: "v1",
          required: !1,
        },
        {
          name: "remove_bucket",
          type: "bool",
          default: "false",
          required: !1,
          help: "true",
        },
        {
          name: "add_filename_to_disposition",
          type: "bool",
          default: "false",
          required: !1,
          help: "true",
        },
        {
          name: "enable_direct_upload",
          type: "bool",
          default: "false",
          required: !1,
        },
        {
          name: "direct_upload_host",
          type: "string",
          default: "",
          required: !1,
        },
        {
          name: "user_agent",
          type: "string",
          default: "",
          required: !1,
          help: "true",
        },
        {
          name: "order_by",
          type: "select",
          options: "name,size,modified",
          default: "name",
          required: !1,
        },
        {
          name: "order_direction",
          type: "select",
          options: "asc,desc",
          default: "asc",
          required: !1,
        },
      ],
      config: {
        name: "Doge",
        local_sort: !0,
        only_local: !1,
        only_proxy: !1,
        no_cache: !1,
        no_upload: !1,
        need_ms: !1,
        default_root: "/",
        check_status: !0,
      },
    },
  }
z.get("/driver/list", (t) =>
  t.json({ code: 200, message: "success", data: va }),
)
z.get("/driver/info", (t) => {
  let e = t.req.query("driver") || "",
    r = va[e] || va.AliyundriveOpen
  return t.json({ code: 200, message: "success", data: r })
})
z.get("/setting/list", async (t) => {
  let e = await U(t.env),
    r = t.req.query("group"),
    i = t.req.query("groups"),
    s = e.settings || []
  if (r !== void 0) {
    let n = parseInt(r, 10)
    s = s.filter((a) => a.group === n)
  } else if (i !== void 0) {
    let n = i.split(",").map((a) => parseInt(a, 10))
    s = s.filter((a) => n.includes(a.group))
  }
  return t.json({ code: 200, message: "success", data: s })
})
z.post("/setting/save", async (t) => {
  let e = await t.req.json().catch(() => []),
    r = await U(t.env)
  r.settings || (r.settings = [])
  for (let s of e) {
    let n = r.settings.findIndex((a) => a.key === s.key)
    n !== -1
      ? ((r.settings[n].value = s.value),
        s.group !== void 0 && (r.settings[n].group = s.group))
      : r.settings.push(s)
  }
  let i = new Set()
  return (
    (r.settings = r.settings.filter((s) =>
      !s.key || i.has(s.key) ? !1 : (i.add(s.key), !0),
    )),
    await q(r, t.env),
    t.json({ code: 200, message: "success", data: null })
  )
})
z.post("/setting/default", async (t) => {
  let e = t.req.query("group")
  if (e === void 0)
    return t.json({ code: 400, message: "group is required", data: null })
  let r = parseInt(e, 10),
    i = await U(t.env)
  i.settings = (i.settings || []).filter((a) => a.group !== r)
  let s = mr.settings.filter((a) => a.group === r),
    n = new Set(s.map((a) => a.key))
  return (
    (i.settings = i.settings.filter((a) => !n.has(a.key))),
    i.settings.push(...JSON.parse(JSON.stringify(s))),
    await q(i, t.env),
    t.json({ code: 200, message: "success", data: s })
  )
})
z.post("/setting/delete", async (t) => {
  let e = t.req.query("key")
  if (!e) return t.json({ code: 400, message: "key is required", data: null })
  let r = await U(t.env)
  return (
    (r.settings = (r.settings || []).filter((i) => i.key !== e)),
    await q(r, t.env),
    t.json({ code: 200, message: "success", data: null })
  )
})
function Th(t = 32) {
  let e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    r = ""
  for (let i = 0; i < t; i++)
    r += e.charAt(Math.floor(Math.random() * e.length))
  return r
}
z.post("/setting/reset_token", async (t) => {
  let e = await U(t.env),
    r = Th(32),
    i = (e.settings || []).findIndex((s) => s.key === "token")
  return (
    i !== -1
      ? ((e.settings[i].value = r),
        e.settings[i].group !== 5 &&
          e.settings[i].group !== 0 &&
          (e.settings[i].group = 5))
      : (e.settings || (e.settings = []),
        e.settings.push({
          key: "token",
          value: r,
          type: "string",
          help: "115 / PikPak / Thunder Token",
          group: 5,
          flag: 0,
        })),
    await q(e, t.env),
    t.json({ code: 200, message: "success", data: r })
  )
})
var et = async (t, e, r = 14) => {
  let i = await U(t)
  i.settings || (i.settings = [])
  for (let [s, n] of Object.entries(e)) {
    if (n === void 0) continue
    let a = i.settings.findIndex((o) => o.key === s)
    a !== -1
      ? (i.settings[a].value = n)
      : i.settings.push({
          key: s,
          value: n,
          type: "string",
          help: s,
          group: r,
          flag: 0,
        })
  }
  await q(i, t)
}
z.post("/setting/set_115", async (t) => {
  let e = await t.req.json().catch(() => ({}))
  return (
    await et(t.env, { "115_temp_dir": e.temp_dir || "" }),
    t.json({ code: 200, message: "success", data: "success" })
  )
})
z.post("/setting/set_115_open", async (t) => {
  let e = await t.req.json().catch(() => ({}))
  return (
    await et(t.env, { "115_open_temp_dir": e.temp_dir || "" }),
    t.json({ code: 200, message: "success", data: "success" })
  )
})
z.post("/setting/set_123_pan", async (t) => {
  let e = await t.req.json().catch(() => ({}))
  return (
    await et(t.env, {
      "123_pan_temp_dir": e.temp_dir || "",
      "123_temp_dir": e.temp_dir || "",
    }),
    t.json({ code: 200, message: "success", data: "success" })
  )
})
z.post("/setting/set_123_open", async (t) => {
  let e = await t.req.json().catch(() => ({}))
  return (
    await et(t.env, {
      "123_open_temp_dir": e.temp_dir || "",
      "123_open_callback_url": e.callback_url || "",
    }),
    t.json({ code: 200, message: "success", data: "success" })
  )
})
z.post("/setting/set_pikpak", async (t) => {
  let e = await t.req.json().catch(() => ({}))
  return (
    await et(t.env, { pikpak_temp_dir: e.temp_dir || "" }),
    t.json({ code: 200, message: "success", data: "success" })
  )
})
z.post("/setting/set_thunder", async (t) => {
  let e = await t.req.json().catch(() => ({}))
  return (
    await et(t.env, { thunder_temp_dir: e.temp_dir || "" }),
    t.json({ code: 200, message: "success", data: "success" })
  )
})
z.post("/setting/set_thunder_browser", async (t) => {
  let e = await t.req.json().catch(() => ({}))
  return (
    await et(t.env, { thunder_browser_temp_dir: e.temp_dir || "" }),
    t.json({ code: 200, message: "success", data: "success" })
  )
})
z.post("/setting/set_thunderx", async (t) => {
  let e = await t.req.json().catch(() => ({}))
  return (
    await et(t.env, { thunderx_temp_dir: e.temp_dir || "" }),
    t.json({ code: 200, message: "success", data: "success" })
  )
})
z.post("/setting/reset_token", async (t) => {
  let e =
    typeof crypto < "u" && typeof crypto.randomUUID == "function"
      ? crypto.randomUUID().replace(/-/g, "")
      : Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2)
  return (
    await et(t.env, { token: e }),
    t.json({ code: 200, message: "success", data: e })
  )
})
z.get("/meta/list", async (t) => {
  let e = await U(t.env)
  return t.json({
    code: 200,
    message: "success",
    data: { content: e.metas, total: e.metas.length },
  })
})
z.get("/meta/get", async (t) => {
  let e = parseInt(t.req.query("id") || "0", 10),
    i = ((await U(t.env)).metas || []).find((s) => s.id === e)
  return i
    ? t.json({ code: 200, message: "success", data: i })
    : t.json({ code: 404, message: "meta not found", data: null })
})
z.post("/meta/create", async (t) => {
  let e = await t.req.json().catch(() => ({})),
    r = await U(t.env)
  r.metas || (r.metas = [])
  let i =
    "/" +
    String(e.path || "")
      .split("/")
      .filter(Boolean)
      .join("/")
  if (!i || i === "/")
    return t.json({ code: 400, message: "path is required", data: null })
  if (r.metas.some((n) => n.path === i))
    return t.json({ code: 400, message: "meta already exists", data: null })
  let s = {
    id: r.metas.length ? Math.max(...r.metas.map((n) => n.id)) + 1 : 1,
    path: i,
    password: e.password || "",
    read_users: e.read_users || [],
    read_users_sub: !!e.read_users_sub,
    write_users: e.write_users || [],
    write_users_sub: !!e.write_users_sub,
    p_sub: !!e.p_sub,
    write: !!e.write,
    w_sub: !!e.w_sub,
    hide: e.hide || "",
    h_sub: !!e.h_sub,
    readme: e.readme || "",
    r_sub: !!e.r_sub,
    header: e.header || "",
    header_sub: !!e.header_sub,
  }
  return (
    r.metas.push(s),
    await q(r, t.env),
    t.json({ code: 200, message: "success", data: s })
  )
})
z.post("/meta/update", async (t) => {
  let e = await t.req.json().catch(() => ({})),
    r = await U(t.env)
  r.metas || (r.metas = [])
  let i = r.metas.findIndex((n) => n.id === e.id)
  if (i === -1)
    return t.json({ code: 404, message: "meta not found", data: null })
  let s =
    e.path !== void 0
      ? "/" + String(e.path).split("/").filter(Boolean).join("/")
      : r.metas[i].path
  return s && r.metas.some((n) => n.path === s && n.id !== e.id)
    ? t.json({ code: 400, message: "meta already exists", data: null })
    : ((r.metas[i] = {
        ...r.metas[i],
        ...(s ? { path: s } : {}),
        password: e.password !== void 0 ? e.password : r.metas[i].password,
        read_users:
          e.read_users !== void 0 ? e.read_users : r.metas[i].read_users,
        read_users_sub:
          e.read_users_sub !== void 0
            ? !!e.read_users_sub
            : r.metas[i].read_users_sub,
        write_users:
          e.write_users !== void 0 ? e.write_users : r.metas[i].write_users,
        write_users_sub:
          e.write_users_sub !== void 0
            ? !!e.write_users_sub
            : r.metas[i].write_users_sub,
        p_sub: e.p_sub !== void 0 ? !!e.p_sub : r.metas[i].p_sub,
        write: e.write !== void 0 ? !!e.write : r.metas[i].write,
        w_sub: e.w_sub !== void 0 ? !!e.w_sub : r.metas[i].w_sub,
        hide: e.hide !== void 0 ? e.hide : r.metas[i].hide,
        h_sub: e.h_sub !== void 0 ? !!e.h_sub : r.metas[i].h_sub,
        readme: e.readme !== void 0 ? e.readme : r.metas[i].readme,
        r_sub: e.r_sub !== void 0 ? !!e.r_sub : r.metas[i].r_sub,
        header: e.header !== void 0 ? e.header : r.metas[i].header,
        header_sub:
          e.header_sub !== void 0 ? !!e.header_sub : r.metas[i].header_sub,
      }),
      await q(r, t.env),
      t.json({ code: 200, message: "success", data: null }))
})
z.post("/meta/delete", async (t) => {
  let e = parseInt(t.req.query("id") || "0", 10),
    r = await U(t.env)
  return (
    r.metas || (r.metas = []),
    (r.metas = r.metas.filter((i) => i.id !== e)),
    await q(r, t.env),
    t.json({ code: 200, message: "success", data: null })
  )
})
z.route("/user", ze)
z.get("/kv/status", async (t) => {
  let e = await pn(t.env)
  return t.json({ code: 200, message: "success", data: e })
})
z.get("/index/progress", (t) =>
  t.json({
    code: 200,
    message: "success",
    data: { total: 0, current: 0, speed: 0 },
  }),
)
z.get("/scan/progress", (t) =>
  t.json({
    code: 200,
    message: "success",
    data: { total: 0, current: 0, speed: 0 },
  }),
)
z.get("/plugin/list", async (t) => {
  let e = await U(t.env)
  return (
    e.plugins || (e.plugins = []),
    t.json({
      code: 200,
      message: "success",
      data: { content: e.plugins, total: e.plugins.length },
    })
  )
})
z.get("/plugin/get", async (t) => {
  let e = t.req.query("id")
  if (!e) return t.json({ code: 400, message: "id is required", data: null })
  let r = await U(t.env)
  r.plugins || (r.plugins = [])
  let i = r.plugins.find((s) => s.id === e)
  return i
    ? t.json({ code: 200, message: "success", data: i })
    : t.json({ code: 404, message: "Plugin not found", data: null })
})
z.post("/plugin/install", async (t) => {
  try {
    let e = await t.req.json(),
      r = e
    if (e.manifest_url && typeof e.manifest_url == "string")
      try {
        let o = await fetch(e.manifest_url)
        if (!o.ok)
          return t.json({
            code: 400,
            message: `Failed to fetch plugin manifest from URL: HTTP ${o.status}`,
            data: null,
          })
        r = { ...(await o.json()), ...e }
      } catch (o) {
        return t.json({
          code: 400,
          message: `Network error fetching plugin manifest: ${o.message || String(o)}`,
          data: null,
        })
      }
    if (!r.id || !r.name)
      return t.json({
        code: 400,
        message: "Plugin id and name are required",
        data: null,
      })
    let i = await U(t.env)
    i.plugins || (i.plugins = [])
    let s = i.plugins.findIndex((o) => o.id === r.id),
      n = new Date().toISOString(),
      a = {
        id: r.id,
        name: r.name,
        version: r.version || "1.0.0",
        description: r.description || "",
        author: r.author || "Unknown",
        homepage: r.homepage || "",
        repository: r.repository || "",
        icon: r.icon || "",
        type: r.type || "ui",
        enabled: r.enabled !== void 0 ? !!r.enabled : !0,
        high_privilege: !!r.high_privilege,
        permissions: Array.isArray(r.permissions) ? r.permissions : [],
        entry_url: r.entry_url || "",
        script_content: r.script_content || "",
        style_content: r.style_content || "",
        config_schema: r.config_schema || [],
        config_values: r.config_values || r.default_config || {},
        target_hooks: r.target_hooks || ["global"],
        is_builtin: !!r.is_builtin,
        tags: r.tags || [],
        created_at: s >= 0 ? i.plugins[s].created_at : n,
        updated_at: n,
      }
    return (
      s >= 0 ? (i.plugins[s] = a) : i.plugins.push(a),
      await q(i, t.env),
      t.json({ code: 200, message: "Plugin installed successfully", data: a })
    )
  } catch (e) {
    return t.json({
      code: 500,
      message: e.message || "Failed to install plugin",
      data: null,
    })
  }
})
z.post("/plugin/update", async (t) => {
  try {
    let e = await t.req.json()
    if (!e.id)
      return t.json({ code: 400, message: "Plugin id is required", data: null })
    let r = await U(t.env)
    r.plugins || (r.plugins = [])
    let i = r.plugins.findIndex((a) => a.id === e.id)
    if (i === -1)
      return t.json({ code: 404, message: "Plugin not found", data: null })
    let s = r.plugins[i],
      n = { ...s, ...e, id: s.id, updated_at: new Date().toISOString() }
    return (
      (r.plugins[i] = n),
      await q(r, t.env),
      t.json({ code: 200, message: "Plugin updated successfully", data: n })
    )
  } catch (e) {
    return t.json({
      code: 500,
      message: e.message || "Failed to update plugin",
      data: null,
    })
  }
})
z.post("/plugin/toggle", async (t) => {
  try {
    let e = await t.req.json()
    if (!e.id)
      return t.json({ code: 400, message: "Plugin id is required", data: null })
    let r = await U(t.env)
    r.plugins || (r.plugins = [])
    let i = r.plugins.findIndex((n) => n.id === e.id)
    if (i === -1)
      return t.json({ code: 404, message: "Plugin not found", data: null })
    let s = e.enabled !== void 0 ? !!e.enabled : !r.plugins[i].enabled
    return (
      (r.plugins[i].enabled = s),
      (r.plugins[i].updated_at = new Date().toISOString()),
      await q(r, t.env),
      t.json({
        code: 200,
        message: s ? "Plugin enabled" : "Plugin disabled",
        data: { id: e.id, enabled: s },
      })
    )
  } catch (e) {
    return t.json({
      code: 500,
      message: e.message || "Failed to toggle plugin",
      data: null,
    })
  }
})
z.post("/plugin/delete", async (t) => {
  try {
    let r = t.req.query("id")
    if (!r)
      try {
        r = (await t.req.json()).id
      } catch {}
    if (!r)
      return t.json({ code: 400, message: "Plugin id is required", data: null })
    let i = await U(t.env)
    i.plugins || (i.plugins = [])
    let s = i.plugins.length
    return (
      (i.plugins = i.plugins.filter((n) => n.id !== r)),
      i.plugins.length === s
        ? t.json({ code: 404, message: "Plugin not found", data: null })
        : (await q(i, t.env),
          t.json({
            code: 200,
            message: "Plugin deleted successfully",
            data: null,
          }))
    )
  } catch (e) {
    return t.json({
      code: 500,
      message: e.message || "Failed to delete plugin",
      data: null,
    })
  }
})
z.post("/plugin/batch_save", async (t) => {
  try {
    let e = await t.req.json(),
      r = Array.isArray(e) ? e : e.plugins
    if (!Array.isArray(r))
      return t.json({
        code: 400,
        message: "plugins array is required",
        data: null,
      })
    let i = await U(t.env)
    return (
      (i.plugins = r),
      await q(i, t.env),
      t.json({
        code: 200,
        message: "Plugins saved successfully",
        data: { count: r.length },
      })
    )
  } catch (e) {
    return t.json({
      code: 500,
      message: e.message || "Failed to batch save plugins",
      data: null,
    })
  }
})
ie()
ie()
function F0(t, e) {
  let r = t.replace(/bytes=/, "").split("-"),
    i = parseInt(r[0], 10),
    s = r[1] ? parseInt(r[1], 10) : e - 1,
    n = s - i + 1
  return { start: i, end: s, chunksize: n }
}
Ze()
var qs = null,
  Os = null
async function Fh() {
  if (typeof process < "u" && process.release?.name === "node" && !qs)
    try {
      ;((qs = await import("fs/promises")),
        (Os = (await import("fs")).createReadStream))
    } catch {}
}
var We = new Q(),
  Ih = (t) => {
    let e = t.executionCtx
    if (!(!e || typeof e.waitUntil != "function"))
      return { waitUntil: (r) => e.waitUntil(r) }
  }
We.get("/*", async (t) => {
  await Fh()
  let e =
      t.req.query("proxy") === "true" ||
      t.req.path.startsWith("/p") ||
      t.req.path.startsWith("/api/p") ||
      t.req.path.startsWith("/sd") ||
      t.req.path.startsWith("/api/sd"),
    r = t.req.path
      .replace(/^\/api\/raw/, "")
      .replace(/^\/api\/d/, "")
      .replace(/^\/api\/sd/, "")
      .replace(/^\/api\/p/, "")
      .replace(/^\/raw/, "")
      .replace(/^\/d/, "")
      .replace(/^\/sd/, "")
      .replace(/^\/p/, ""),
    i = decodeURIComponent(r)
  try {
    let s = i
    if (t.req.path.startsWith("/api/sd") || t.req.path.startsWith("/sd")) {
      let d = await Wt(s, t.req.query("pwd") || "", t.env)
      if (!d.ok) return t.text(d.error || "Share not found", 404)
      if (d.virtualList || !d.realPath)
        return t.text("Cannot download share root", 400)
      s = d.realPath
    } else {
      let d = await ee(t)
      if (!d || d.disabled) return t.text("Unauthorized", 401)
    }
    let a = await te(s)
    if (a.isVirtual || !a.physical)
      return t.text("Cannot download virtual directory path", 400)
    if (
      a.storage &&
      (a.storage.driver || "").toLowerCase().replace(/[^a-z0-9]/g, "") !==
        "local"
    )
      try {
        let l = await G(a.storage.driver, a.storage),
          u
        try {
          u = await l.get(s, a.physical)
        } finally {
          await ke(a.storage.driver, a.storage, l, Ih(t))
        }
        if (u && u.raw_url)
          if (e) {
            console.log(
              `[rawRouter] Proxying download for '${s}' via ${a.storage.driver}`,
            )
            let p = { ...(u.raw_url_headers || {}) }
            p["User-Agent"] ||
              (p["User-Agent"] =
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
            let f = t.req.header("Range")
            f && (p.Range = f)
            let h = await fetch(u.raw_url, { headers: p })
            ;(h.status === 412 &&
              (console.warn(
                `[rawRouter] Upstream returned 412 for '${s}', retrying without Range header...`,
              ),
              delete p.Range,
              (h = await fetch(u.raw_url, { headers: p }))),
              t.header("Access-Control-Allow-Origin", "*"),
              t.header("Access-Control-Allow-Methods", "GET, OPTIONS, HEAD"),
              t.header(
                "Access-Control-Expose-Headers",
                "Content-Range, Accept-Ranges, Content-Length, Content-Disposition",
              ))
            let y = {
                pdf: "application/pdf",
                mp4: "video/mp4",
                webm: "video/webm",
                mkv: "video/x-matroska",
                mp3: "audio/mpeg",
                flac: "audio/flac",
                m3u8: "application/vnd.apple.mpegurl",
                ts: "video/mp2t",
                png: "image/png",
                jpg: "image/jpeg",
                jpeg: "image/jpeg",
                gif: "image/gif",
                webp: "image/webp",
                svg: "image/svg+xml",
              },
              x = s.split(".").pop()?.toLowerCase() || "",
              g = y[x] || "application/octet-stream"
            t.header("Content-Type", h.headers.get("content-type") || g)
            let m = h.headers.get("content-length")
            m && t.header("Content-Length", m)
            let w = h.headers.get("content-range")
            ;(w && t.header("Content-Range", w),
              t.header(
                "Accept-Ranges",
                h.headers.get("accept-ranges") || "bytes",
              ))
            let v = h.headers.get("etag")
            v && t.header("ETag", v)
            let _ = h.headers.get("last-modified")
            _ && t.header("Last-Modified", _)
            let b = h.headers.get("cache-control")
            b && t.header("Cache-Control", b)
            let P = h.headers.get("content-disposition")
            return (
              P && t.header("Content-Disposition", P),
              t.body(h.body, h.status)
            )
          } else
            return (
              console.log(
                `[rawRouter] Redirecting download for '${s}' via ${a.storage.driver}`,
              ),
              t.redirect(u.raw_url, 302)
            )
        else {
          let p =
            u?.raw_url_error ||
            (u?.is_dir
              ? "\u8BE5\u6761\u76EE\u662F\u6587\u4EF6\u5939\uFF0C\u4E0D\u53EF\u4F5C\u4E3A\u6587\u4EF6\u4E0B\u8F7D\u3002"
              : "\u8BE5\u5B58\u50A8\u9A71\u52A8\u672A\u8FD4\u56DE\u4E0B\u8F7D\u94FE\u63A5\uFF08raw_url \u4E3A\u7A7A\uFF09\u3002")
          return t.text(
            `File not found or no download link available: ${s}
${p}`,
            404,
          )
        }
      } catch (l) {
        return (
          console.error(`[rawRouter] Driver get failed for '${s}':`, l.message),
          t.text(`Download failed: ${l.message}`, 500)
        )
      }
    if (!qs || !Os)
      return t.text("Local file streaming not supported in Edge Runtime", 500)
    let o = await qs.stat(a.physical)
    if (o.isDirectory()) return t.text("Cannot download directory", 400)
    t.header("Access-Control-Allow-Origin", "*")
    let c = t.req.header("Range")
    if (c) {
      let { start: d, end: l, chunksize: u } = F0(c, o.size),
        p = Os(a.physical, { start: d, end: l })
      return (
        t.header("Content-Range", `bytes ${d}-${l}/${o.size}`),
        t.header("Accept-Ranges", "bytes"),
        t.header("Content-Length", u.toString()),
        t.header("Content-Type", "application/octet-stream"),
        t.body(p, 206)
      )
    } else {
      ;(t.header("Content-Length", o.size.toString()),
        t.header("Accept-Ranges", "bytes"))
      let d = Os(a.physical)
      return t.body(d)
    }
  } catch (s) {
    return (
      console.error(`[rawRouter] Download 404 for '${i}':`, s.message),
      t.text(`Not found: ${s.message || s}`, 404)
    )
  }
})
ie()
var Xt = new Q()
Xt.get("/settings", async (t) => {
  let e = await U(t.env),
    r = {
      title: "OpenListNext Serverless",
      site_title: "OpenListNext Serverless",
      version: "v4.2.3",
      announcement: "",
      pagination_type: "pagination",
      default_page_size: "20",
      allow_indexed: "false",
      allow_mounted: "true",
      robots_txt: `User-agent: *
Allow: /`,
      logo: "/logo.png",
      favicon: "/favicon.png",
      main_color: "#1890ff",
      hide_storage_details: "false",
      hide_storage_details_in_manage_page: "false",
      customize_head: "",
      customize_body: "",
      text_types:
        "txt,htm,html,xml,java,properties,sql,js,md,json,conf,ini,vue,php,py,bat,gitignore,yml,yaml,toml,Makefile,mk,dockerfile,sh,pub,lock,gradle,ts,tsx,jsx,go,rs,c,cpp,h,cs,rb,swift,kt,dart,r,m,pl,pm,lua,ex,exs",
      audio_types: "mp3,flac,ogg,m4a,wav,opus,wma,aac,aiff,ape",
      video_types:
        "mp4,mkv,avi,mov,rmvb,webm,flv,m3u8,ts,wmv,m2ts,mpg,mpeg,3gp",
      image_types:
        "jpg,tiff,jpeg,png,gif,bmp,svg,ico,webp,avif,heic,heif,raw,cr2,nef,arw,dng",
      proxy_types: "",
      proxy_ignore_headers: "",
      audio_autoplay: "false",
      video_autoplay: "false",
      readme_autorender: "true",
      filter_readme_scripts: "true",
      preview_download_by_default: "false",
      preview_archives_by_default: "false",
      share_preview_download_by_default: "false",
      share_preview_archives_by_default: "false",
      share_preview: "true",
      share_archive_preview: "true",
      hide_files: "/\\.DS_Store/i",
      link_expiration: "0",
      sign_all: "false",
      filename_char_mapping: "{}",
      forward_direct_link_params: "false",
      ignore_direct_link_params: "",
      package_download: "true",
      offline_download: "true",
      ocr_api: "",
      privacy_regs: "",
      iframe_previews: "{}",
      external_previews: "{}",
      check_down_link: "false",
      check_update: "false",
      allow_guest: "true",
      webauthn_login_enabled: "false",
      sso_login_enabled: "false",
      sso_compatibility_mode: "false",
      ldap_login_enabled: "false",
      show_disk_usage_in_plain_text: "false",
      non_efs_zip_encoding: "UTF-8",
    }
  e.settings.forEach((n) => {
    n.key &&
      n.value !== void 0 &&
      ((r[n.key] = n.value), n.key === "site_title" && (r.title = n.value))
  })
  let i = (e.users || []).find((n) => n.username === "guest")
  return (
    !!!(i && !i.disabled) || r.allow_guest === "false"
      ? (r.allow_guest = "false")
      : (r.allow_guest = "true"),
    t.json({ code: 200, message: "success", data: r })
  )
})
Xt.get("/archive_extensions", (t) =>
  t.json({
    code: 200,
    message: "success",
    data: [
      "zip",
      "rar",
      "7z",
      "tar",
      "gz",
      "bz2",
      "xz",
      "tar.gz",
      "tar.bz2",
      "tar.xz",
    ],
  }),
)
Xt.get("/offline_download_tools", (t) =>
  t.json({ code: 200, message: "success", data: [] }),
)
Xt.get("/plugins", async (t) => {
  let i = ((await U(t.env)).plugins || []).filter((s) => s.enabled)
  return t.json({ code: 200, message: "success", data: i })
})
function Rh() {
  return [
    {
      name: "list_files",
      description: "List files and directories in OpenListNext storage",
      inputSchema: {
        type: "object",
        properties: {
          path: { type: "string", description: "Storage mount path" },
        },
      },
    },
    {
      name: "get_system_info",
      description: "Fetch server hardware and storage metrics",
      inputSchema: { type: "object", properties: {} },
    },
  ]
}
function Bh() {
  return [
    {
      uri: "openlistnext://storage/metrics",
      name: "Storage Metrics",
      mimeType: "application/json",
      description: "Current storage metrics of OpenListNext",
    },
  ]
}
function Uh() {
  return [
    {
      name: "summarize_directory",
      description: "Prompt to summarize contents of a folder",
      arguments: [
        { name: "path", description: "The folder path", required: !0 },
      ],
    },
  ]
}
function I0(t, e, r) {
  switch (t) {
    case "tools/list":
      return { jsonrpc: "2.0", result: { tools: Rh() }, id: e }
    case "resources/list":
      return { jsonrpc: "2.0", result: { resources: Bh() }, id: e }
    case "prompts/list":
      return { jsonrpc: "2.0", result: { prompts: Uh() }, id: e }
    default:
      return {
        jsonrpc: "2.0",
        error: { code: -32601, message: "Method not found" },
        id: e,
      }
  }
}
Ze()
var $r = new Q()
$r.use("*", Se)
$r.get(
  "/sse",
  (t) => (
    t.header("Content-Type", "text/event-stream"),
    t.header("Cache-Control", "no-cache"),
    t.header("Connection", "keep-alive"),
    t.text(`event: endpoint
data: /api/mcp/messages

`)
  ),
)
$r.post("/messages", async (t) => {
  let e = await t.req.json().catch(() => ({})),
    { method: r, id: i, params: s } = e
  if (!r)
    return t.json(
      {
        jsonrpc: "2.0",
        error: { code: -32600, message: "Invalid Request" },
        id: i || null,
      },
      400,
    )
  let n = I0(r, i, s),
    a = n.error ? 404 : 200
  return t.json(n, a)
})
ie()
Bs()
var _a = new Q()
_a.get("/info", async (t) => {
  let e = await Tt(t),
    r = await U(t.env),
    i = {
      runtime: "Cloudflare Workers / Edge",
      timestamp: new Date().toISOString(),
    }
  return (
    e &&
      (i.db_state = {
        storages_count: r.storages?.length || 0,
        users_count: r.users?.length || 0,
        metas_count: r.metas?.length || 0,
        settings_count: r.settings?.length || 0,
      }),
    t.json({
      code: 200,
      message: "OpenListNext debug profile generated",
      data: i,
    })
  )
})
ie()
Ze()
var ye = new Q()
ye.use("/list", Se)
ye.use("/get", Se)
ye.use("/update", Se)
ye.use("/delete", Se)
ye.use("/cancel", Se)
ye.use("/enable", Se)
ye.use("/disable", Se)
ye.get("/list", async (t) => {
  let e = await U(t.env)
  return t.json({
    code: 200,
    message: "success",
    data: { content: e.shares || [], total: (e.shares || []).length },
  })
})
ye.get("/get", async (t) => {
  let e = t.req.query("id") || "",
    i = ((await U(t.env)).shares || []).find((s) => s.id === e)
  return i
    ? t.json({ code: 200, message: "success", data: i })
    : t.json({ code: 404, message: "share not found", data: null })
})
ye.post("/create", async (t) => {
  let e = await ee(t)
  if (!e) return t.json({ code: 401, message: "Unauthorized", data: null }, 401)
  let r = await t.req.json().catch(() => ({})),
    i = await U(t.env),
    s = r.id && String(r.id).trim() !== "" ? String(r.id).trim() : $h()
  if ((i.shares || []).some((a) => a.id === s))
    return t.json({ code: 400, message: "share id already exists", data: null })
  let n = {
    id: s,
    new_id: r.new_id || s,
    creator: e.username || "user",
    creator_role: e.role ?? 1,
    accessed: 0,
    expires: r.expires || null,
    pwd: r.pwd || "",
    max_accessed: r.max_accessed ?? 0,
    disabled: r.disabled ?? !1,
    order_by: r.order_by || "",
    order_direction: r.order_direction || "",
    extract_folder: r.extract_folder || "",
    files: r.files || [],
    remark: r.remark || "",
    readme: r.readme || "",
    header: r.header || "",
  }
  return (
    i.shares || (i.shares = []),
    i.shares.push(n),
    await q(i, t.env),
    t.json({ code: 200, message: "success", data: n })
  )
})
function $h() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 16)
}
ye.post("/update", async (t) => {
  let e = await t.req.json().catch(() => ({})),
    r = await U(t.env)
  if (!e.id)
    return t.json({ code: 400, message: "share id is required", data: null })
  let i = (r.shares || []).findIndex((n) => n.id === e.id)
  if (i === -1)
    return t.json({ code: 404, message: "share not found", data: null })
  let s =
    e.new_id && String(e.new_id).trim() !== "" ? String(e.new_id).trim() : e.id
  return s !== e.id && (r.shares || []).some((a) => a.id === s && a.id !== e.id)
    ? t.json({ code: 400, message: "share id already exists", data: null })
    : ((r.shares[i] = {
        ...r.shares[i],
        id: s,
        new_id: s,
        expires: e.expires !== void 0 ? e.expires : r.shares[i].expires,
        pwd: e.pwd !== void 0 ? e.pwd : r.shares[i].pwd,
        max_accessed:
          e.max_accessed !== void 0 ? e.max_accessed : r.shares[i].max_accessed,
        disabled: e.disabled !== void 0 ? e.disabled : r.shares[i].disabled,
        order_by: e.order_by !== void 0 ? e.order_by : r.shares[i].order_by,
        order_direction:
          e.order_direction !== void 0
            ? e.order_direction
            : r.shares[i].order_direction,
        extract_folder:
          e.extract_folder !== void 0
            ? e.extract_folder
            : r.shares[i].extract_folder,
        files: e.files !== void 0 ? e.files : r.shares[i].files,
        remark: e.remark !== void 0 ? e.remark : r.shares[i].remark,
        readme: e.readme !== void 0 ? e.readme : r.shares[i].readme,
        header: e.header !== void 0 ? e.header : r.shares[i].header,
      }),
      await q(r, t.env),
      t.json({ code: 200, message: "success", data: null }))
})
ye.post("/delete", async (t) => {
  let e = t.req.query("id") || "",
    r = await U(t.env)
  return (
    r.shares || (r.shares = []),
    (r.shares = r.shares.filter((i) => i.id !== e)),
    await q(r, t.env),
    t.json({ code: 200, message: "success", data: null })
  )
})
ye.post("/enable", async (t) => {
  let e = t.req.query("id") || "",
    r = await U(t.env),
    i = (r.shares || []).find((s) => s.id === e)
  return (
    i && ((i.disabled = !1), await q(r, t.env)),
    t.json({ code: 200, message: "success", data: null })
  )
})
ye.post("/disable", async (t) => {
  let e = t.req.query("id") || "",
    r = await U(t.env),
    i = (r.shares || []).find((s) => s.id === e)
  return (
    i && ((i.disabled = !0), await q(r, t.env)),
    t.json({ code: 200, message: "success", data: null })
  )
})
ie()
Ze()
var Pe = new Q()
Pe.all("/refresh", Se, async (t) => {
  let e = await U(t.env),
    r = 0,
    i = 0,
    s = []
  for (let n of e.storages || [])
    if (!n.disabled)
      try {
        ;(await (await G(n.driver, n)).init?.(),
          (n.status = "work"),
          r++,
          s.push({
            id: n.id,
            mount_path: n.mount_path,
            driver: n.driver,
            status: "ok",
          }))
      } catch (a) {
        ;(i++,
          s.push({
            id: n.id,
            mount_path: n.mount_path,
            driver: n.driver,
            status: "failed",
            error: a?.message || String(a),
          }))
      }
  return (
    await q(e, t.env),
    t.json({
      code: 200,
      message: "token refresh executed",
      data: {
        refreshed: r,
        failed: i,
        total: e.storages?.length || 0,
        results: s,
      },
    })
  )
})
var Rt = { upload: [], copy: [], move: [], offline_download: [] }
Pe.use("*", Se)
Pe.get("/:type/:state", (t) => {
  let e = t.req.param("type"),
    r = t.req.param("state"),
    s = (Rt[e] || []).filter((n) => (r === "done" ? n.done : !n.done))
  return t.json({ code: 200, message: "success", data: s })
})
Pe.post("/:type/clear_done", (t) => {
  let e = t.req.param("type")
  return (
    Rt[e] && (Rt[e] = Rt[e].filter((r) => !r.done)),
    t.json({ code: 200, message: "success", data: null })
  )
})
Pe.post("/:type/clear_succeeded", (t) => {
  let e = t.req.param("type")
  return (
    Rt[e] && (Rt[e] = Rt[e].filter((r) => r.state !== "succeeded")),
    t.json({ code: 200, message: "success", data: null })
  )
})
Pe.post("/:type/retry_failed", (t) =>
  t.json({ code: 200, message: "success", data: null }),
)
Pe.post("/:type/retry", (t) =>
  t.json({ code: 200, message: "success", data: null }),
)
Pe.post("/:type/retry_some", (t) =>
  t.json({ code: 200, message: "success", data: null }),
)
Pe.post("/:type/cancel", (t) =>
  t.json({ code: 200, message: "success", data: null }),
)
Pe.post("/:type/cancel_some", (t) =>
  t.json({ code: 200, message: "success", data: null }),
)
Pe.post("/:type/delete", (t) =>
  t.json({ code: 200, message: "success", data: null }),
)
Pe.post("/:type/delete_some", (t) =>
  t.json({ code: 200, message: "success", data: null }),
)
var Or = new Map(),
  Zt = new Map()
function Oh(t) {
  return (
    t.req.header("CF-Connecting-IP") ||
    t.req.header("x-real-ip") ||
    t.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  )
}
function qh() {
  let t = Date.now()
  if (Or.size > 2e4) for (let [e, r] of Or) t - r.start > 6e4 && Or.delete(e)
  if (Zt.size > 2e4) for (let [e, r] of Zt) t - r.start > 36e5 && Zt.delete(e)
}
async function jh(t, e) {
  let r = Oh(t),
    i = Date.now(),
    s = 0,
    n = 0
  try {
    let a = await U(t.env),
      o = {}
    for (let c of a.settings || []) o[c.key] = c.value
    ;((s = parseInt(o.ip_limit, 10) || 0),
      (n = parseInt(o.traffic_limit, 10) || 0))
  } catch {}
  if ((qh(), s > 0)) {
    let a = Or.get(r)
    if (!a || i - a.start > 6e4) Or.set(r, { start: i, count: 1 })
    else if (((a.count += 1), a.count > s))
      return t.json(
        { code: 429, message: "Too many requests, slow down", data: null },
        429,
      )
  }
  if (n > 0) {
    let a = Zt.get(r),
      o = n * 1024 * 1024
    if (a && i - a.start <= 36e5 && a.bytes >= o)
      return t.json(
        { code: 429, message: "Traffic limit exceeded", data: null },
        429,
      )
  }
  if ((await e(), n > 0)) {
    let a = parseInt(t.res?.headers?.get("content-length") || "0", 10) || 0
    if (a > 0) {
      let o = Zt.get(r)
      !o || i - o.start > 36e5
        ? Zt.set(r, { start: i, bytes: a })
        : (o.bytes += a)
    }
  }
}
function R0(t) {
  ;(t.use("*", jh),
    t.use(
      "*",
      fo({
        origin: (e, r) => {
          if (!e) return e
          let n = (
            (r.env || {}).ALLOWED_ORIGINS ||
            (typeof process < "u" ? process.env?.ALLOWED_ORIGINS : "") ||
            ""
          )
            .split(",")
            .map((o) => o.trim())
            .filter(Boolean)
          if (n.length > 0) return n.includes(e) ? e : null
          let a = r.req.header("host") || ""
          try {
            if (new URL(e).host === a) return e
          } catch {}
          return null
        },
        allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        exposeHeaders: ["Content-Length", "Content-Type"],
        maxAge: 600,
        credentials: !0,
      }),
    ),
    t.route("/raw", We),
    t.route("/fs", de),
    t.route("/auth", Ke),
    t.route("/public", Xt),
    t.route("/admin", z),
    t.route("/mcp", $r),
    t.route("/debug", _a),
    t.route("/share", ye),
    t.route("/task", Pe),
    t.route("/d", We),
    t.route("/sd", We),
    t.route("/p", We),
    t.route("/me", Br),
    t.get("/me", wa),
    t.post("/me/update", xa),
    t.post("/user/update_pwd", D0),
    t.get("/logout", Ur),
    t.post("/logout", Ur),
    t.get("/health", (e) =>
      e.json({
        ok: !0,
        name: "OpenListNext",
        version: "v4.2.3",
        environment: e.env?.ENVIRONMENT || "development",
      }),
    ))
}
ie()
var Bt = new Q()
Bt.use("*", async (t, e) => {
  let r = Date.now()
  ;(un(t.env),
    console.log(`[Backend] ${t.req.method} ${t.req.path}`),
    await e(),
    console.log(`[Backend] ${t.res.status} (${Date.now() - r}ms)`))
})
var B0 = new Q()
R0(B0)
Bt.route("/api", B0)
Bt.route("/d", We)
Bt.route("/sd", We)
Bt.route("/p", We)
var ba = null
function U0(t) {
  ba = t
}
Bt.all("*", async (t) => {
  let e = t.env
  if (e && e.ASSETS && typeof e.ASSETS.fetch == "function") {
    let r = new URL(t.req.url),
      i = await e.ASSETS.fetch(t.req.raw)
    if (i.status !== 404) {
      if (r.pathname === "/" || r.pathname === "/index.html") {
        let n = new Headers(i.headers)
        return (
          n.set("Cache-Control", "no-cache, must-revalidate"),
          new Response(i.body, { status: i.status, headers: n })
        )
      }
      return i
    }
    let s = new Request(`${r.origin}/index.html`, t.req.raw)
    return e.ASSETS.fetch(s)
  }
  return ba && (t.req.method === "GET" || t.req.method === "HEAD")
    ? t.body(ba, 200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache, must-revalidate",
      })
    : t.text("404 Not Found", 404)
})
var $0 = Bt
var O0 = `<!doctype html>\r
<html lang="en" translate="no">\r
  <head>\r
    <!-- customize head -->\r
    <meta charset="utf-8" />\r
    <meta name="viewport" content="width=device-width, initial-scale=1" />\r
    <meta name="referrer" content="same-origin" />\r
    <meta name="generator" content="OpenListNext" />\r
    <meta name="theme-color" content="#000000" />\r
    <meta name="google" content="notranslate" />\r
    <link href="/manifest.json" rel="manifest" crossorigin="use-credentials" />\r
    <meta name="mobile-web-app-capable" content="yes" />\r
    <meta name="apple-mobile-web-app-capable" content="yes" />\r
    <meta name="apple-mobile-web-app-title" content="OpenListNext" />\r
    <link rel="apple-touch-icon" href="/logo.png" />\r
    <link rel="shortcut icon" type="image/png" href="/favicon.png" />\r
    <title>Loading...</title>\r
    <script>\r
      window.OPENLISTNEXT_CONFIG = {\r
        cdn: undefined,\r
        base_path: undefined,\r
        api: undefined,\r
        main_color: undefined,\r
      }\r
    </script>\r
    <script type="module" crossorigin src="/assets/index-Bw4glFfg.js"></script>
    <link rel="modulepreload" crossorigin href="/assets/rolldown-runtime-Dd_uD5pT.js">
    <link rel="modulepreload" crossorigin href="/assets/entry-BD5ybjvq.js">
    <link rel="modulepreload" crossorigin href="/assets/entry-CywL5umv.js">
    <link rel="modulepreload" crossorigin href="/assets/preload-helper-Czpn1I53.js">
    <link rel="modulepreload" crossorigin href="/assets/store-Bv5vQ5eM.js">
    <link rel="modulepreload" crossorigin href="/assets/lib-DCkDzrFc.js">
    <link rel="modulepreload" crossorigin href="/assets/fi-aysjypUg.js">
    <link rel="modulepreload" crossorigin href="/assets/micromark-factory-space-C61DdfyV.js">
    <link rel="modulepreload" crossorigin href="/assets/lib-BI7MA2me.js">
    <link rel="modulepreload" crossorigin href="/assets/components-DLMMLkAe.js">
    <link rel="modulepreload" crossorigin href="/assets/archive-DWS1gHM1.js">
    <link rel="stylesheet" crossorigin href="/assets/components-DFUx0M5w.css">
    <link rel="stylesheet" crossorigin href="/assets/index-CEjh6L5N.css">
    <script type="module">import'data:text/javascript,if(!import.meta.resolve)throw Error("import.meta.resolve not supported")';import.meta.url;import("_").catch(()=>1);(async function*(){})().next();window.__vite_is_modern_browser=true</script>
    <script type="module">!function(){if(window.__vite_is_modern_browser)return;console.warn("vite: loading legacy chunks, syntax error above and the same error below should be ignored");var e=document.getElementById("vite-legacy-polyfill"),n=document.createElement("script");n.src=e.src,n.onload=function(){System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))},document.body.appendChild(n)}();</script>
  </head>\r
  <body>\r
    <noscript>You need to enable JavaScript to run this app.</noscript>\r
    <div id="root"></div>\r
\r\r
    <!-- customize body -->\r
    <script nomodule>!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",(function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()}),!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();</script>
    <script nomodule crossorigin id="vite-legacy-polyfill" src="/assets/polyfills-legacy-W3AHIlJa.js"></script>
    <script nomodule crossorigin id="vite-legacy-entry" data-src="/assets/index-legacy-CUqOsj1B.js">System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))</script>
  </body>\r
</html>\r
`
U0(O0)
function Lh(t) {
  return $0.fetch(t.request, t.env, t)
}
var P_ = Lh
export { P_ as default, Lh as onRequest }
/*! Bundled license information:

crypto-js/ripemd160.js:
  (** @preserve
  	(c) 2012 by Cédric Mesnil. All rights reserved.
  
  	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  
  	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  
  	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  	*)

crypto-js/mode-ctr-gladman.js:
  (** @preserve
   * Counter block mode compatible with  Dr Brian Gladman fileenc.c
   * derived from CryptoJS.mode.CTR
   * Jan Hruby jhruby.web@gmail.com
   *)
*/

#!/usr/bin/env node
/**
 * Downloads remote images (Unsplash & friends), converts them to WebP, stores them
 * under src/assets/images/remote/, and rewrites the source files to use the local files.
 *
 *   node scripts/fetch-remote-images.mjs           # fetch missing + rewrite
 *   node scripts/fetch-remote-images.mjs --force   # re-download everything
 *   node scripts/fetch-remote-images.mjs --min-width 1200   # upscale the fetch width
 *
 * Idempotent: re-running keeps working, it only re-downloads what is missing.
 */
import { readdir, readFile, writeFile, stat, mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const ROOT = process.cwd()
const SRC_DIR = path.join(ROOT, 'src')
const OUT_DIR = path.join(SRC_DIR, 'assets', 'images', 'remote')
const INDEX_FILE = path.join(OUT_DIR, 'index.js')
const MANIFEST_FILE = path.join(OUT_DIR, 'manifest.json')

const force = process.argv.includes('--force')
const minWidth = Number(process.argv[process.argv.indexOf('--min-width') + 1]) || 0

const CODE_EXT = new Set(['.js', '.jsx', '.ts', '.tsx'])
const IGNORED_DIRS = new Set(['node_modules', 'dist', '.git', '.vite'])

// Matches any URL wrapped in quotes inside JS/JSX source.
const URL_RE = /(['"`])(https?:\/\/[^'"`\s<>]+)\1/g
// Matches a JSX attribute holding a URL, e.g. src="https://...".
const JSX_ATTR_RE = /(\b[a-zA-Z][a-zA-Z0-9-]*=)(["'])(https?:\/\/[^"'`\s<>]+)\2/g
// Matches `remote.photo_xxx` references (from a previous run).
const REF_RE = /remote\.([a-zA-Z0-9_]+)/g

// Hosts that always serve images, plus any URL ending in an image extension.
const IMAGE_HOSTS = [
  'images.unsplash.com',
  'plus.unsplash.com',
  'source.unsplash.com',
  'images.pexels.com',
  'cdn.pixabay.com',
  'images.pexels.com',
  'res.cloudinary.com',
]
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif)$/i

function isImageUrl(url) {
  try {
    const u = new URL(url)
    if (IMAGE_HOSTS.includes(u.hostname.toLowerCase())) return true
    return IMAGE_EXT.test(u.pathname)
  } catch {
    return false
  }
}

function isUnsplash(url) {
  try {
    return new URL(url).hostname.toLowerCase().includes('unsplash.com')
  } catch {
    return false
  }
}

async function* walk(dir) {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue
      yield* walk(full)
    } else if (entry.isFile() && CODE_EXT.has(path.extname(entry.name))) {
      yield full
    }
  }
}

function parseId(url) {
  try {
    const u = new URL(url)
    if (isUnsplash(url)) {
      const m = u.pathname.match(/([a-zA-Z0-9_-]+)$/)
      return m ? m[1] : null
    }
    const base = path.basename(u.pathname).replace(IMAGE_EXT, '')
    return base && base !== '/' ? base : u.hostname.replace(/\W+/g, '-')
  } catch {
    return null
  }
}

function parseWidth(url) {
  try {
    const w = new URL(url).searchParams.get('w')
    return w ? Number(w) : 0
  } catch {
    return 0
  }
}

function sanitize(id) {
  return `img_${id.replace(/[^a-zA-Z0-9]/g, '_')}`
}

// Dot-accessible key for the `remote` map (Unsplash ids contain dashes).
function toKey(id) {
  return id.replace(/[^a-zA-Z0-9]/g, '_')
}

function toPosix(p) {
  return p.split(path.sep).join('/')
}

async function exists(file) {
  try {
    await stat(file)
    return true
  } catch {
    return false
  }
}

async function download(id, width, originalUrl) {
  let url
  if (isUnsplash(originalUrl || '')) {
    url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80&fm=jpg`
  } else {
    url = originalUrl
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  // 1. Collect every remote image reference from the source tree.
  const files = []
  for await (const file of walk(SRC_DIR)) files.push(file)

  const sources = new Map() // id -> { urls:Set, widths:Set }
  const manifest = new Map()
  const keyToId = new Map()

  if (await exists(MANIFEST_FILE)) {
    const saved = JSON.parse(await readFile(MANIFEST_FILE, 'utf8'))
    for (const [id, entry] of Object.entries(saved)) {
      manifest.set(id, entry)
      keyToId.set(toKey(id), id)
    }
  }

  for (const file of files) {
    const code = await readFile(file, 'utf8')
    for (const m of code.matchAll(URL_RE)) {
      if (!isImageUrl(m[2])) continue
      const id = parseId(m[2])
      if (!id) continue
      keyToId.set(toKey(id), id)
      if (!sources.has(id)) sources.set(id, { urls: new Set(), widths: new Set() })
      sources.get(id).urls.add(m[2])
      const w = parseWidth(m[2])
      if (w) sources.get(id).widths.add(w)
    }
    for (const m of code.matchAll(REF_RE)) {
      const id = keyToId.get(m[1])
      if (!id) continue
      if (!sources.has(id)) sources.set(id, { urls: new Set(), widths: new Set() })
    }
  }

  if (!sources.size) {
    console.log('No remote image references found.')
    return
  }

  // 2. Decide the fetch width per image (largest requested width wins).
  const plan = []
  for (const [id, info] of sources) {
    const saved = manifest.get(id)
    let width = info.widths.size ? Math.max(...info.widths) : 0
    if (saved?.width) width = Math.max(width, saved.width)
    if (minWidth) width = Math.max(width, minWidth)
    if (!width) width = 1600
    plan.push({ id, width, urls: info.urls, source: saved?.source || null })
  }
  plan.sort((a, b) => a.id.localeCompare(b.id))

  // 3. Download + convert.
  const results = []
  for (const item of plan) {
    const outFile = path.join(OUT_DIR, `${item.id}.webp`)
    const alreadyThere = (await exists(outFile)) && !force
    const sourceUrl = item.source || [...item.urls][0] || `https://images.unsplash.com/${item.id}`

    try {
      if (alreadyThere) {
        const s = await stat(outFile)
        results.push({ id: item.id, file: outFile, bytes: s.size, cached: true })
        continue
      }
      const buffer = await download(item.id, item.width, sourceUrl)
      const webp = await sharp(buffer).webp({ quality: 82, effort: 6 }).toBuffer()
      await writeFile(outFile, webp)
      results.push({ id: item.id, file: outFile, bytes: webp.length, cached: false, srcBytes: buffer.length })
    } catch (error) {
      console.error(`! failed ${item.id}: ${error.message}`)
      process.exitCode = 1
      continue
    }
  }

  const okIds = new Set(results.map((r) => r.id))
  const finalManifest = {}
  for (const item of plan) {
    if (!okIds.has(item.id)) continue
    finalManifest[item.id] = {
      width: item.width,
      source: item.source || [...item.urls][0] || `https://images.unsplash.com/${item.id}`,
    }
  }
  await writeFile(MANIFEST_FILE, `${JSON.stringify(finalManifest, null, 2)}\n`)

  // 4. Generate the index module.
  const ids = [...okIds].sort()
  const imports = ids.map((id) => `import ${sanitize(id)} from './${id}.webp'`).join('\n')
  const map = ids.map((id) => `  ${toKey(id)}: ${sanitize(id)},`).join('\n')
  const byId = ids.map((id) => `  '${id}': ${sanitize(id)},`).join('\n')
  const indexSource = `// AUTO-GENERATED by scripts/fetch-remote-images.mjs - do not edit by hand.
// Originals: Unsplash (https://unsplash.com) - see manifest.json for the source of each file.
${imports}

export const remote = {
${map}
}

// Same images, keyed by their original Unsplash photo id.
export const byId = {
${byId}
}

export default remote
`
  await writeFile(INDEX_FILE, indexSource)

  // 5. Rewrite the source files to point at the local WebP files.
  let rewritten = 0
  for (const file of files) {
    let code = await readFile(file, 'utf8')
    const original = code

    // JSX attributes: src="https://..." -> src={remote.photo_xxx}
    code = code.replace(JSX_ATTR_RE, (full, attr, quote, url) => {
      if (!isImageUrl(url)) return full
      const id = parseId(url)
      if (!id || !okIds.has(id)) return full
      return `${attr}{remote.${toKey(id)}}`
    })

    // Plain JS strings: img: 'https://...' -> img: remote.photo_xxx
    code = code.replace(URL_RE, (full, quote, url) => {
      if (!isImageUrl(url)) return full
      const id = parseId(url)
      if (!id || !okIds.has(id)) return full
      return `remote.${toKey(id)}`
    })

    if (code === original) continue

    const relPath = toPosix(path.relative(path.dirname(file), OUT_DIR))
    const importLine = `import { remote } from '${relPath}'`
    if (!/^import \{ remote \} from/m.test(code)) {
      const importMatches = [...code.matchAll(/^import\s[\s\S]*?from\s+['"][^'"]+['"];?[ \t]*$/gm)]
      if (importMatches.length) {
        const last = importMatches[importMatches.length - 1]
        const insertAt = last.index + last[0].length
        code = `${code.slice(0, insertAt)}\n${importLine}${code.slice(insertAt)}`
      } else {
        code = `${importLine}\n${code}`
      }
    }

    await writeFile(file, code)
    rewritten++
  }

  // 6. Report.
  console.log('')
  console.log('Remote images -> WebP')
  console.log('-'.repeat(74))
  let total = 0
  for (const r of results.sort((a, b) => a.id.localeCompare(b.id))) {
    total += r.bytes
    const extra = r.cached ? '(cached)' : `from ${(r.srcBytes / 1024).toFixed(0)} KB`
    console.log(`${r.id.padEnd(42)} ${(r.bytes / 1024).toFixed(1).padStart(8)} KB  ${extra}`)
  }
  console.log('-'.repeat(74))
  console.log(`${String(results.length).padEnd(42)} ${(total / 1024).toFixed(1).padStart(8)} KB  total`)
  console.log('')
  console.log(`Index:  ${toPosix(path.relative(ROOT, INDEX_FILE))}`)
  console.log(`Files rewritten: ${rewritten}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

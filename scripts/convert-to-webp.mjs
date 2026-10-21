#!/usr/bin/env node
/**
 * Converts every raster image in src/ and public/ to WebP, in place.
 *
 *   node scripts/convert-to-webp.mjs            # convert + delete originals
 *   node scripts/convert-to-webp.mjs --keep     # convert, keep originals
 *
 * SVG is intentionally skipped: it is vector and stays sharp at any size.
 */
import { readdir, stat, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const ROOT = process.cwd()
const TARGET_DIRS = ['src', 'public']
const IGNORED_DIRS = new Set(['node_modules', 'dist', '.git', '.vite'])

const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg', '.jfif', '.gif', '.bmp', '.tif', '.tiff', '.avif', '.webp'])
const SKIP_EXT = new Set(['.svg'])
const CONVERTIBLE_EXT = new Set(['.png', '.jpg', '.jpeg', '.jfif', '.gif', '.bmp', '.tif', '.tiff', '.avif'])

const keepOriginals = process.argv.includes('--keep')
const force = process.argv.includes('--force')

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
    } else if (entry.isFile()) {
      yield full
    }
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

async function convert(file) {
  const ext = path.extname(file).toLowerCase()
  const out = path.join(path.dirname(file), `${path.basename(file, ext)}.webp`)

  if (ext === '.webp') {
    if (force) {
      await sharp(file).webp({ quality: 82, effort: 6 }).toFile(out)
    }
    return null
  }

  const input = sharp(file, { animated: true })
  const meta = await input.metadata()

  const hasAlpha = Boolean(meta.hasAlpha)

  let buffer
  if (hasAlpha) {
    // PNG/GIF sources are already lossless, so keep them lossless to avoid quality loss.
    buffer = await sharp(file, { animated: true }).webp({ lossless: true, effort: 6 }).toBuffer()
    if (buffer.length > (await stat(file)).size) {
      const lossy = await sharp(file, { animated: true })
        .webp({ quality: 85, alphaQuality: 100, effort: 6 })
        .toBuffer()
      if (lossy.length < buffer.length) buffer = lossy
    }
  } else {
    buffer = await sharp(file, { animated: true }).webp({ quality: 82, effort: 6 }).toBuffer()
  }

  await writeFile(out, buffer)

  const [before, after] = await Promise.all([stat(file), stat(out)])
  const saved = before.size - after.size
  const pct = before.size ? (saved / before.size) * 100 : 0

  if (!keepOriginals) {
    await unlink(file)
  }

  return {
    file: path.relative(ROOT, file),
    before: before.size,
    after: after.size,
    saved,
    pct,
    alpha: hasAlpha,
  }
}

const results = []
for (const dir of TARGET_DIRS) {
  for await (const file of walk(path.join(ROOT, dir))) {
    const ext = path.extname(file).toLowerCase()
    if (SKIP_EXT.has(ext) || !RASTER_EXT.has(ext)) continue
    if (!CONVERTIBLE_EXT.has(ext) && !force) continue
    try {
      const result = await convert(file)
      if (result) results.push(result)
    } catch (error) {
      console.error(`! failed: ${path.relative(ROOT, file)} -> ${error.message}`)
      process.exitCode = 1
    }
  }
}

if (!results.length) {
  console.log('No raster images to convert.')
} else {
  console.log('')
  console.log('Converted to WebP')
  console.log('-'.repeat(78))
  for (const r of results) {
    const sign = r.saved >= 0 ? '-' : '+'
    console.log(
      `${r.file.padEnd(42)} ${formatBytes(r.before).padStart(10)} -> ${formatBytes(r.after).padStart(10)}  ` +
        `${sign}${formatBytes(Math.abs(r.saved)).padStart(10)} (${r.pct.toFixed(1)}% smaller)${r.alpha ? '  [alpha]' : ''}`,
    )
  }
  const totalBefore = results.reduce((s, r) => s + r.before, 0)
  const totalAfter = results.reduce((s, r) => s + r.after, 0)
  console.log('-'.repeat(78))
  console.log(
    `${'Total'.padEnd(42)} ${formatBytes(totalBefore).padStart(10)} -> ${formatBytes(totalAfter).padStart(10)}  ` +
      `-${formatBytes(totalBefore - totalAfter)} (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}% smaller)`,
  )
  console.log('')
  console.log(keepOriginals ? 'Originals kept.' : 'Originals deleted.')
}

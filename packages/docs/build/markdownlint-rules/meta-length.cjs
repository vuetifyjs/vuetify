// Custom markdownlint rule: enforce SEO-friendly lengths for frontmatter
// `meta.title` and `meta.description`. Parses with `front-matter` — the same
// library the docs build uses (build/markdownBuilders.ts) — so the measured
// length matches what actually ships in the rendered <title>/<meta> tags.
'use strict'

const fm = require('front-matter')

const TITLE_MAX = 60
const DESCRIPTION_MAX = 160

function findKeyLine (frontMatterLines, key) {
  // Frontmatter starts at file line 1, so array index + 1 is the line number.
  // Scope the search to the `meta:` block to avoid matching a same-named
  // top-level key.
  let inMeta = false
  for (let i = 0; i < frontMatterLines.length; i++) {
    const line = frontMatterLines[i]
    if (/^meta:\s*$/.test(line)) { inMeta = true; continue }
    // A non-indented, non-fence line ends the meta block.
    if (inMeta && /^\S/.test(line) && line !== '---') inMeta = false
    if (inMeta && new RegExp(`^\\s+${key}:`).test(line)) return i + 1
  }
  return 1
}

module.exports = {
  names: ['meta-length', 'frontmatter-meta-length'],
  description: 'Frontmatter meta.title/meta.description exceed SEO length limits',
  tags: ['frontmatter', 'seo'],
  parser: 'none',
  function: function metaLength (params, onError) {
    const lines = params.frontMatterLines
    if (!lines || !lines.length) return

    let attributes
    try {
      attributes = fm(lines.join('\n')).attributes
    } catch {
      return
    }

    const meta = attributes && attributes.meta
    if (!meta || typeof meta !== 'object') return

    const titleMax = Number(params.config.title_max ?? TITLE_MAX)
    const descriptionMax = Number(params.config.description_max ?? DESCRIPTION_MAX)

    const checks = [
      ['title', meta.title, titleMax],
      ['description', meta.description, descriptionMax],
    ]

    for (const [key, value, max] of checks) {
      if (typeof value !== 'string' || value.length <= max) continue
      onError({
        lineNumber: findKeyLine(lines, key),
        detail: `meta.${key} is ${value.length} characters; keep it ${max} or fewer`,
        context: `${value.slice(0, 50)}…`,
      })
    }
  },
}

import type MarkdownIt from 'markdown-it'
import type Renderer from 'markdown-it/lib/renderer'

function addCodeRules (md: MarkdownIt) {
  const fence = md.renderer.rules.fence

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const handler = fence || self.renderToken
    const token = tokens[idx]

    return `<app-markup resource="${token?.attrs?.[0][1] ?? ''}" class="mb-4">${handler(tokens, idx, options, env, self)}</app-markup>`
  }
  md.renderer.rules.code_inline = function (tokens, idx) {
    const token = tokens[idx]

    const attrs = Object.entries(
      (token.attrs || []).reduce((acc, [key, value]) => {
        acc[key] = acc[key] ? acc[key] + ' ' + value : value
        return acc
      }, { class: 'v-code' } as Record<string, string>)
    ).map(([key, value]) => `${key}="${value}"`).join(' ')

    return `<code ${attrs}>${md.utils.escapeHtml(token.content)}</code>`
  }
}

function addImageRules (md: MarkdownIt) {
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const alt = token.content
    const placeholder = token.attrGet('placeholder') ? 'https://cdn.vuetifyjs.com/docs/images/graphics/placeholder.png' : undefined
    const src = placeholder ?? token.attrGet('src')
    const title = token.attrGet('title') ?? ''
    const isEntry = alt.toLowerCase().includes('entry')
    const height = token.attrGet('height') ?? (isEntry ? 305 : '')

    return `
<div>
  <app-figure
    ${alt ? `alt="${alt}"` : ''}
    ${src ? `src="${src}"` : ''}
    ${title ? `title="${title}"` : ''}
    ${height ? `height="${height}"` : ''}
  />
</div>
`
  }
}

function addHrRules (md: MarkdownIt) {
  md.renderer.rules.hr = function (tokens, idx, options, env, self) {
    return '<app-divider />'
  }
}

function addUnderlineRules (md: MarkdownIt) {
  const renderEm: Renderer.RenderRule = (tokens, idx, opts, env, self) => {
    const token = tokens[idx]
    if (token.markup === '_') {
      token.tag = 'span'

      token.type === 'em_open' && token.attrSet('style', 'text-decoration: underline;')
    }
    return self.renderToken(tokens, idx, opts)
  }

  md.renderer.rules.em_open = renderEm
  md.renderer.rules.em_close = renderEm
}

function addHeadingRules (md: MarkdownIt) {
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const level = tokens[idx].markup.length
    const next = tokens[idx + 1]
    const children = next ? next.children : []
    const [, href] = children?.[0].attrs?.[1] ?? []

    if (next?.children) {
      next.children = next.children.filter(token => !['link_open', 'link_close'].includes(token.type))
    }

    tokens[idx].tag = 'app-heading'
    tokens[idx].attrSet('href', href ?? '')
    tokens[idx].attrSet('level', level.toString())

    return self.renderToken(tokens, idx, options)
  }
  md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
    tokens[idx].tag = 'app-heading'

    return self.renderToken(tokens, idx, options)
  }
}

function addLinkRules (md: MarkdownIt) {
  md.renderer.rules.link_open = md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    tokens[idx].tag = 'app-link'

    return self.renderToken(tokens, idx, options)
  }
}

function addTableRules (md: MarkdownIt) {
  md.renderer.rules.table_open = md.renderer.rules.table_close = (tokens, idx, options, env, self) => {
    tokens[idx].tag = 'app-table'

    return self.renderToken(tokens, idx, options)
  }
}

export default [
  addCodeRules,
  addHeadingRules,
  addHrRules,
  addLinkRules,
  addImageRules,
  addTableRules,
  addUnderlineRules,
]

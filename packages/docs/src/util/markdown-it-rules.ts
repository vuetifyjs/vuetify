import container from 'markdown-it-container'
import Token from 'markdown-it/lib/token'
import type MarkdownIt from 'markdown-it'
import type Renderer from 'markdown-it/lib/renderer'
import type { RenderRule } from 'markdown-it/lib/renderer'

function addCodeRules (md: MarkdownIt) {
  const fence = md.renderer.rules.fence

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const handler = fence || self.renderToken
    const token = tokens[idx]

    return `<AppMarkup resource="${token?.attrs?.[0][1] ?? ''}" class="mb-4">${handler(tokens, idx, options, env, self)}</AppMarkup>`
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

  createContainer(md, 'error')
  createContainer(md, 'info')
  createContainer(md, 'success')
  createContainer(md, 'warning')
  createContainer(md, 'tip', 'TIP')
  createTabs(md)
}

function addImageRules (md: MarkdownIt) {
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const alt = token.content
    const placeholder = token.attrGet('placeholder') ? 'https://cdn.vuetifyjs.com/docs/images/graphics/placeholder.png' : undefined
    const src = placeholder ?? token.attrGet('src')
    const title = token.attrGet('title') ?? ''
    // const isEntry = alt.toLowerCase().includes('entry')
    const height = token.attrGet('height') ?? ''

    return `
<div>
  <AppFigure
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
    return '<AppDivider />'
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

    tokens[idx].tag = 'AppHeading'
    tokens[idx].attrSet('href', href ?? '')
    tokens[idx].attrSet('level', level.toString())

    return self.renderToken(tokens, idx, options)
  }
  md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
    tokens[idx].tag = 'AppHeading'

    return self.renderToken(tokens, idx, options)
  }
}

function addLinkRules (md: MarkdownIt) {
  md.renderer.rules.link_open = md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    tokens[idx].tag = 'AppLink'

    return self.renderToken(tokens, idx, options)
  }
}

function addTableRules (md: MarkdownIt) {
  md.renderer.rules.table_open = md.renderer.rules.table_close = (tokens, idx, options, env, self) => {
    tokens[idx].tag = 'AppTable'

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

/**
 * Inspired by vitepress
 * https://github.com/vuejs/vitepress/blob/f9cfd16/src/node/markdown/plugins/containers.ts
 */
function createContainer (md: MarkdownIt, type: string, title?: string) {
  md.use(container, type, {
    render (tokens, idx) {
      const token = tokens[idx]
      if (token.nesting === 1) {
        return `<Alert type="${type}">\n` + (title ? `<p><strong>${title}:</strong></p>\n` : '')
      } else {
        return `</Alert>\n`
      }
    },
  } satisfies { render: RenderRule })
}

function createTabs (md: MarkdownIt) {
  // Inject "::: tab" around code blocks
  md.core.ruler.push('tabs', state => {
    let inTabs = false
    let level = 0
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i]

      if (token.type === 'container_tabs_open') {
        inTabs = true
        level = token.level
      } else if (token.type === 'container_tabs_close') {
        inTabs = false
      } else if (inTabs && token.level === level + 1 && token.type === 'fence' && token.tag === 'code') {
        const title = extractTitle(token.info)
        token.level += 1
        const openToken = new Token('container_tab_open', 'div', 1)
        openToken.info = ` tab ${title}`
        openToken.markup = ':::'
        openToken.block = true
        openToken.level = level + 1
        const closeToken = new Token('container_tab_close', 'div', -1)
        closeToken.level = level + 1
        closeToken.block = true
        state.tokens.splice(i, 0, openToken)
        state.tokens.splice(i + 2, 0, closeToken)
        i += 2
      }
    }
  })

  md.use(container, 'tabs', {
    render (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        let tabs = ''
        for (let i = idx + 1; i < tokens.length; i++) {
          const token = tokens[i]

          if (token.type === 'container_tab_open') {
            const title = token.info.trim().slice('tab'.length).trim()
            tabs += `<v-tab value="${title}" variant="plain" class="text-none">${title}</v-tab>\n`
          } else if (token.type === 'container_tabs_close') break
        }

        return `<DocTabs>\n<template #tabs>\n${tabs}</template>\n<template #content>\n`
      } else {
        return `</template>\n</DocTabs>\n`
      }
    },
  } satisfies { render: RenderRule })

  md.use(container, 'tab', {
    render (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const title = tokens[idx].info.trim().slice('tab'.length).trim()
        return `<v-window-item value="${title}">\n`
      } else {
        return `\n</v-window-item>\n`
      }
    },
  } satisfies { render: RenderRule })
}

function extractTitle (info: string) {
  return info.match(/\[(.*)\]/)?.[1] || extractLang(info) || 'txt'
}

function extractLang (info: string) {
  return info
    .trim()
    .replace(/:(no-)?line-numbers({| |$).*/, '')
    .replace(/(-vue|{| ).*$/, '')
    .replace(/^vue-html$/, 'template')
}

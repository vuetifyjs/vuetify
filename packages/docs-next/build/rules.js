function addCodeRules (md) {
  const fence = md.renderer.rules.fence

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const handler = fence || self.renderToken

    return `<app-code>${handler(tokens, idx, options)}</app-code>`
  }
}

function addImageRules (md) {
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const alt = token.content
    const src = token.attrGet('src')
    const title = token.attrGet('title')

    return `<app-img src="${src}" alt="${alt}" title="${title}" />`
  }
}

function addHeadingRules (md) {
  const map = {
    h1: 'text-h3',
    h2: 'text-h4',
    h3: 'text-h5',
  }

  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.attrSet('class', map[token.tag])

    return self.renderToken(tokens, idx, options)
  }
}

function addBlockQuoteRules (md) {
  md.renderer.rules.blockquote_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const paragraph = tokens[idx + 1]
    const inline = tokens[idx + 2]
    const text = inline.children.find(child => child.type === 'text')
    const [type, ...content] = text.content.split(' ')

    paragraph.attrSet('class', 'mb-0')

    text.content = content.join(' ')

    token.attrSet('type', type)
    token.type = 'inline'
    token.tag = 'app-alert'

    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.blockquote_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.type = 'inline'
    token.tag = 'app-alert'

    return self.renderToken(tokens, idx, options)
  }
}

module.exports = {
  addBlockQuoteRules,
  addCodeRules,
  addHeadingRules,
  addImageRules,
}

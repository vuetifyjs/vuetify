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
    h4: 'text-h6',
  }

  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.attrSet('class', map[token.tag])

    return self.renderToken(tokens, idx, options)
  }
}

function addTableRules (md) {
  md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
    tokens[idx].tag = 'api-table'

    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.table_close = (tokens, idx, options, env, self) => {
    tokens[idx].tag = 'api-table'

    return self.renderToken(tokens, idx, options)
  }
}

module.exports = {
  addCodeRules,
  addHeadingRules,
  addImageRules,
  addTableRules,
}

const { md } = require('./markdown-it')

function getPageHeadings (page) {
  const headings = []
  const tokens = md.parse(page, {})
  const length = tokens.length

  for (let i = 0; i < length; i++) {
    const token = tokens[i]

    if (token.type !== 'heading_open') continue

    // heading level by hash length '###' === h3
    const level = token.markup.length

    if (level <= 1) continue

    const next = tokens[i + 1]
    const link = next.children[0]
    const text = next.content
    const [, href] = link.attrs.find(([attr]) => attr === 'href')

    headings.push({
      text,
      href,
      level,
    })
  }

  return headings
}

function loader (source) {
  // Replace body string with toc headings
  return source.replace(/body:\s"(.*)",/g, (_, markdown) => {
    const headings = getPageHeadings(markdown.replace(/\\n/g, '\n'))
    return `toc: ${JSON.stringify(headings)},`
  })
}

module.exports = loader

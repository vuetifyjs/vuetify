// Imports
const rules = require('./rules')
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-anchor'), {
    permalink: true,
    permalinkSymbol: '',
    permalinkClass: '',
    slugify: str => {
      const slug = String(str)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')

      return encodeURIComponent(slug)
    },
  })
  .use(require('markdown-it-prism'))
  .use(require('markdown-it-header-sections'))

for (const key in rules) rules[key](md)

module.exports = { md }

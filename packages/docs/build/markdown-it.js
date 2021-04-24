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
      let slug = String(str)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, c => c.charCodeAt(0).toString(16))
        .replace(/\s+/g, '-')

      if (slug.charAt(0).match(/[^a-z]/g)) {
        slug = 'section-' + slug
      }

      return encodeURIComponent(slug)
    },
  })
  .use(require('markdown-it-prism'))
  .use(require('markdown-it-header-sections'))

for (const key in rules) rules[key](md)

module.exports = { md }

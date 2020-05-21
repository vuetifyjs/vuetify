const prism = require('markdown-it-prism')
const md = require('markdown-it')().use(prism)
const rules = require('./rules')

for (const key in rules) {
  rules[key](md)
}

module.exports = { md }

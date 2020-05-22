// Imports
const prism = require('markdown-it-prism')
const rules = require('./rules')
const md = require('markdown-it')({
  html: true,
  linkify: true,
}).use(prism)

for (const key in rules) rules[key](md)

module.exports = { md }

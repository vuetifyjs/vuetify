const rules = require('./rules')

function VuetifyMDCompiler (md) {
  for (const key in rules) {
    rules[key](md)
  }
}

module.exports = {
  VuetifyMDCompiler,
}

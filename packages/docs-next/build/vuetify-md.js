const {
  addBlockQuoteRules,
  addHeadingRules,
  addImageRules,
} = require('./rules')

function VuetifyMDCompiler (md) {
  addBlockQuoteRules(md)
  addHeadingRules(md)
  addImageRules(md)
}

module.exports = {
  VuetifyMDCompiler,
}

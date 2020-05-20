const marked = require('marked')

module.exports = function (content) {
  this.cacheable()

  return marked(content)
}

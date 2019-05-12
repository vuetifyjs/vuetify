const { join, dirname, relative } = require('path')
const wrapListener = require('babel-plugin-detective/wrap-listener')

module.exports = wrapListener(listener, 'transform-sass-paths')

function listener(path, file) {
  if (path.isLiteral() && path.node.value.endsWith('.sass')) {
    const from = dirname(file.hub.file.opts.filename)
    const to = from.replace(from.split('/')[0], 'src')
    path.node.value = join(relative(from, to), path.node.value)
  }
}

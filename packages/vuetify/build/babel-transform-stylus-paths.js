const wrapListener = require('babel-plugin-detective/wrap-listener')

module.exports = wrapListener(listener, 'transform-stylus-paths')

function listener(path, file, opts) {
  const regex = /((?:\.\.?\/)+)/gi
  if (path.isLiteral() && path.node.value.endsWith('.styl')) {
    const matches = regex.exec(path.node.value)
    if (!matches) return
    const m = matches[0].startsWith('./') ? matches[0].substr(2) : matches[0]
    path.node.value = path.node.value.replace(matches[0], `${m}../src/`)
  }
}

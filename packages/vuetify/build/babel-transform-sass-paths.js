var wrapListener = require('babel-plugin-detective/wrap-listener')

module.exports = wrapListener(listener, 'transform-sass-paths')

function listener(path, file) {
  if (path.isLiteral() && path.node.value.endsWith('.sass')) {
    let tmpPath = path.node.value.split('/')
    let currentFolder = file.hub.file.opts.filename.split('/').slice(0, -1)

    let relativePath = Array(currentFolder.length).fill('..').concat(currentFolder)

    while (tmpPath[0].startsWith('.') && (tmpPath.shift() === '..')) {
      relativePath.splice(-1)
    }

    const finalPath = relativePath.concat(tmpPath).join('/').replace(currentFolder[0], 'src')

    path.node.value = finalPath
  }
}

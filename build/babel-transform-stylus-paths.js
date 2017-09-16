var types = require('babel-types');
var pathLib = require('path');
var wrapListener = require('babel-plugin-detective/wrap-listener');

module.exports = wrapListener(listener, 'transform-stylus-paths');

function listener(path, file, opts) {
  if (path.isLiteral() && path.node.value.endsWith('.styl')) {
    path.node.value = path.node.value.replace('../../', '../../../src/')
  }
}

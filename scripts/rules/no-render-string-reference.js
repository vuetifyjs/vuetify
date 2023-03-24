const allowedStrings = [
  'transition-group',
]

function isCreateElementCall (node) {
  return (
    (node.callee.type === 'Identifier' &&
      node.callee.name === 'h') ||
    (node.callee.type === 'MemberExpression' &&
      node.callee.object.type === 'ThisExpression' &&
      node.callee.property.name === '$createElement')
  )
}

function isStringRender (node) {
  return node.arguments[0] &&
    node.arguments[0].type === 'Literal' &&
    typeof node.arguments[0].value === 'string'
}

function isCustomComponent (node) {
  return node.arguments[0] &&
    RegExp('-').test(node.arguments[0].value) &&
    !allowedStrings.includes(node.arguments[0].value)
}

module.exports = {
  create (context) {
    return {
      CallExpression (node) {
        if (isCreateElementCall(node) && isStringRender(node) && isCustomComponent(node)) {
          context.report(node.arguments[0], 'Do not render components by a string reference')
        }
      },
    }
  },
}

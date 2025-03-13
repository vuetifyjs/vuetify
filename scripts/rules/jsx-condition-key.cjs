module.exports = {
  create (context) {
    return {
      JSXExpressionContainer (node) {
        if (!['LogicalExpression', 'ConditionalExpression'].includes(node.expression.type)) return

        if (
          node.parent.type !== 'JSXElement' ||
          node.parent.children.slice(node.parent.children.indexOf(node))
            .every(child => child === node || child.type === 'JSXText')
        ) return

        const test = node.expression.type === 'LogicalExpression'
          ? node.expression.left
          : node.expression.test
        if (
          (
            test.type === 'ChainExpression' &&
            test.expression.type === 'CallExpression' &&
            test.expression.callee.type === 'MemberExpression' &&
            test.expression.callee.object.name === 'slots'
          ) || (
            test.type === 'MemberExpression' &&
            test.object.name === 'slots'
          ) || (
            test.type === 'CallExpression' &&
            test.callee.type === 'MemberExpression' &&
            test.callee.object.name === 'slots'
          )
        ) return

        const tags = node.expression.type === 'LogicalExpression'
          ? [node.expression.right]
          : [node.expression.consequent, node.expression.alternate]

        tags.forEach(tag => {
          if (tag.type !== 'JSXElement') return

          const key = tag.openingElement.attributes.find(attr => attr.type === 'JSXAttribute' && attr.name.name === 'key')
          if (!key) {
            context.report({
              loc: {
                start: tag.openingElement.loc.start,
                end: tag.openingElement.name.loc.end,
              },
              message: 'Conditional JSX elements must have a key attribute',
            })
          }
        })
      },
    }
  },
}

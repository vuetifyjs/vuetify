export default {
  meta: {
    fixable: 'code',
  },
  create (context) {
    return {
      JSXExpressionContainer (node) {
        if (!(
          ['JSXElement', 'JSXFragment'].includes(node.parent.type) &&
          node.expression.type === 'LogicalExpression' &&
          ['??', '||'].includes(node.expression.operator)
        )) return

        const sourceCode = context.getSourceCode()
        const fallback = sourceCode.getText(node.expression.right)

        const left = unwrap(node.expression.left)
        if (!left || !['CallExpression', 'ChainExpression'].includes(left.type)) return

        const callee = unwrap(left.callee)
        if (!callee || !['MemberExpression', 'ChainExpression'].includes(callee.type)) return

        const obj = callee.object
        if (!obj || obj.type !== 'Identifier' || obj.name !== 'slots') return

        const slotAccess = (!callee.computed && callee.property && callee.property.type === 'Identifier')
          ? `slots.${callee.property.name}`
          : `slots[${sourceCode.getText(callee.property)}]`

        const slotProps = left.arguments && left.arguments.length
          ? sourceCode.getText(left.arguments[0])
          : 'undefined'

        context.report({
          node: node.expression,
          message: `Use renderSlot for slot fallback instead of "??"`,
          fix (fixer) {
            return fixer.replaceText(
              node.expression,
              `renderSlot(${slotAccess}, ${slotProps}, () => ${fallback})`
            )
          },
        })
      },
    }
  },
}

function unwrap (n) {
  while (n && n.type === 'ChainExpression') n = n.expression
  return n
}

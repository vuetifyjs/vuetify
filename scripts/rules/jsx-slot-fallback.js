export default {
  meta: {
    fixable: 'code',
  },
  create (context) {
    return {
      LogicalExpression (node) {
        if (!['??', '||'].includes(node.operator)) return

        const sourceCode = context.getSourceCode()
        const fallback = sourceCode.getText(node.right)

        const left = unwrap(node.left)
        if (!left || !['CallExpression', 'ChainExpression'].includes(left.type)) return

        const callee = unwrap(left.callee)
        if (!callee || !['MemberExpression', 'ChainExpression'].includes(callee.type)) return

        const obj = callee.object
        if (!obj || obj.type !== 'Identifier' || obj.name !== 'slots') return

        const slotAccess = (!callee.computed && callee.property && callee.property.type === 'Identifier')
          ? `'${callee.property.name}'`
          : sourceCode.getText(callee.property)

        context.report({
          node,
          message: `Use renderSlot for slot fallback instead of "??"`,
          fix (fixer) {
            let result = `renderSlot(slots, ${slotAccess}, `
            if (left.arguments && left.arguments.length) {
              result += sourceCode.getText(left.arguments[0]) + ', '
            }
            result += `() => ${fallback})`
            return fixer.replaceText(node, result)
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

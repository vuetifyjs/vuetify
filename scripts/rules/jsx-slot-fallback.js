export default {
  meta: {
    fixable: 'code',
  },
  create (context) {
    return {
      JSXExpressionContainer (node) {
        if (!(
          node.parent.type === 'JSXElement' &&
          node.expression.type === 'LogicalExpression' &&
          ['??', '||'].includes(node.expression.operator) &&
          node.expression.left.type === 'CallExpression' &&
          node.expression.left.callee.type === 'MemberExpression' &&
          node.expression.left.callee.object.name === 'slots' &&
          node.expression.left.callee.property.type === 'Identifier'
        )) return

        const slotName = node.expression.left.callee.property.name
        const sourceCode = context.getSourceCode()
        const fallback = sourceCode.getText(node.expression.right)
        const slotProps = node.expression.left.arguments.length
          ? sourceCode.getText(node.expression.left.arguments[0])
          : 'undefined'

        context.report({
          node,
          message: `Use renderSlot for nullish slot fallback instead of "slots.${slotName}?.() ?? fallback".`,
          fix (fixer) {
            return fixer.replaceText(
              node,
              `renderSlot(slots.${slotName}, ${slotProps}, ${fallback})`
            )
          },
        })
      },
    }
  },
}

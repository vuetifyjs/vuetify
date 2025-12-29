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
          node.expression.operator === '&&'
        )) return

        context.report({
          node: node.expression,
          message: 'Conditional JSX elements must use a ternary expression "a ? b : undefined" not "a && b"',
          fix (fixer) {
            const sourceCode = context.getSourceCode()
            const operator = sourceCode.getTokenAfter(node.expression.left)
            const last = sourceCode.getLastToken(node.expression)
            return [
              fixer.replaceText(operator, '?'),
              fixer.insertTextAfter(last, ' : undefined'),
            ]
          },
        })
      },
    }
  },
}

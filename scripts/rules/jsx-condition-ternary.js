export default {
  meta: {
    fixable: 'code',
  },
  create (context) {
    return {
      LogicalExpression (node) {
        if (!(
          node.operator === '&&' &&
          node.right.type === 'JSXElement'
        )) return

        context.report({
          node,
          message: 'Conditional JSX elements must use a ternary expression "a ? b : undefined" not "a && b"',
          fix (fixer) {
            const sourceCode = context.getSourceCode()
            const operator = sourceCode.getTokenAfter(node.left, token => (
              token.type === 'Punctuator' && token.value === '&&'
            ))
            const last = sourceCode.getLastToken(node)
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

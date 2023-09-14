module.exports = {
  create (context) {
    const sourceCode = context.getSourceCode()

    function isParenthesised (node) {
      const previousToken = sourceCode.getTokenBefore(node)
      const nextToken = sourceCode.getTokenAfter(node)

      return Boolean(previousToken && nextToken) &&
        previousToken.value === '(' && previousToken.range[1] <= node.range[0] &&
        nextToken.value === ')' && nextToken.range[0] >= node.range[1]
    }

    return {
      ConditionalExpression (node) {
        if (
          node.test.type === 'LogicalExpression' &&
          node.test.operator === '??' &&
          !isParenthesised(node.test)
        ) {
          context.report({
            node: node.test,
            message: 'Do not use nullish coalescing in ternary conditions',
          })
        }
      },
    }
  },
}

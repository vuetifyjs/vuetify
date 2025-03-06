module.exports = {
  meta: {
    fixable: 'code',
  },
  create (context) {
    return {
      Program (node) {
        if (node.comments.some(comment => comment.value.trim() === 'eslint-disable')) return

        const vitestGlobalsImport = node.body.find(node => (
          node.type === 'ImportDeclaration' &&
          node.source.value === 'vitest'
        ))

        if (!vitestGlobalsImport) return

        const badNodes = vitestGlobalsImport.specifiers.filter(node => (
          ['afterAll', 'afterEach', 'assert', 'beforeAll', 'beforeEach', 'describe', 'expect', 'it', 'vi']
            .includes(node.imported.name)
        ))

        if (badNodes.length === vitestGlobalsImport.specifiers.length) {
          context.report({
            node: vitestGlobalsImport,
            message: 'Extraneous vitest imports',
            fix (fixer) {
              const range = vitestGlobalsImport.range
              return fixer.removeRange([range[0], range[1] + 1])
            },
          })
        } else {
          for (const node of badNodes) {
            context.report({
              node,
              message: 'Extraneous vitest import',
              fix (fixer) {
                return fixer.remove(node)
              },
            })
          }
        }
      },
    }
  },
}

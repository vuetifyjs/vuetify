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

        if (!vitestGlobalsImport) {
          context.report({
            loc: {
              start: { line: 0, column: 0 },
              end: { line: 0, column: 0 },
            },
            message: 'Missing vitest import',
            fix (fixer) {
              const firstImport = node.body.find(node => node.type === 'ImportDeclaration')
              return fixer.insertTextBefore(firstImport || node, `import { expect, it } from 'vitest'\n`)
            },
          })
        }
      },
    }
  },
}

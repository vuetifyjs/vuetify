module.exports = {
  meta: {
    fixable: 'code',
  },
  create (context) {
    return {
      Program (node) {
        if (node.comments.some(comment => comment.value.trim() === 'eslint-disable')) return

        const jestGlobalsImport = node.body.find(node => (
          node.type === 'ImportDeclaration' &&
          node.source.value === '@jest/globals'
        ))

        if (!jestGlobalsImport) {
          context.report({
            loc: {
              start: { line: 0, column: 0 },
              end: { line: 0, column: 0 },
            },
            message: 'Missing @jest/globals import',
            fix (fixer) {
              const firstImport = node.body.find(node => node.type === 'ImportDeclaration')
              return fixer.insertTextBefore(firstImport || node, `import { describe, expect, it } from '@jest/globals'\n`)
            },
          })
        }
      },
    }
  },
}

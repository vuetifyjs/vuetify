const path = require('upath')

module.exports = {
  meta: {
    fixable: 'code',
  },
  create (context) {
    return {
      Program (node) {
        const referencePath = path.relative(
          path.dirname(context.getFilename()),
          path.resolve(__dirname, '../../packages/vuetify/types/cypress')
        )
        const cypressTypesReference = node.comments.find(comment => (
          comment.type === 'Line' &&
          comment.value.trim() === `/ <reference types="${referencePath}" />`
        ))
        if (!cypressTypesReference) {
          context.report({
            loc: {
              start: { line: 0, column: 0 },
              end: { line: 0, column: 0 },
            },
            message: 'Missing Cypress types reference',
            fix (fixer) {
              return fixer.insertTextAfterRange([0, 0], `/// <reference types="${referencePath}" />\n`)
            },
          })
        }
      },
    }
  },
}

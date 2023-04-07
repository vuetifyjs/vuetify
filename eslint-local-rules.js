'use strict'
const path = require('path')

module.exports = {
  'no-render-string-reference': require('./scripts/rules/no-render-string-reference'),
  'jsx-condition-key': {
    create (context) {
      return {
        JSXExpressionContainer (node) {
          if (!['LogicalExpression', 'ConditionalExpression'].includes(node.expression.type)) return

          if (
            node.parent.type !== 'JSXElement' ||
            node.parent.children.slice(node.parent.children.indexOf(node))
              .every(child => child === node || child.type === 'JSXText')
          ) return

          const test = node.expression.type === 'LogicalExpression'
            ? node.expression.left
            : node.expression.test
          if (
            (
              test.type === 'ChainExpression' &&
              test.expression.type === 'CallExpression' &&
              test.expression.callee.type === 'MemberExpression' &&
              test.expression.callee.object.name === 'slots'
            ) || (
              test.type === 'MemberExpression' &&
              test.object.name === 'slots'
            ) || (
              test.type === 'CallExpression' &&
              test.callee.type === 'MemberExpression' &&
              test.callee.object.name === 'slots'
            )
          ) return

          const tags = node.expression.type === 'LogicalExpression'
            ? [node.expression.right]
            : [node.expression.consequent, node.expression.alternate]

          tags.forEach(tag => {
            if (tag.type !== 'JSXElement') return

            const key = tag.openingElement.attributes.find(attr => attr.type === 'JSXAttribute' && attr.name.name === 'key')
            if (!key) {
              context.report({
                loc: {
                  start: tag.openingElement.loc.start,
                  end: tag.openingElement.name.loc.end,
                },
                message: 'Conditional JSX elements must have a key attribute',
              })
            }
          })
        },
      }
    },
  },
  'jsx-curly-spacing': require('./scripts/rules/jsx-curly-spacing'),
  'jest-global-imports': {
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
  },
  'cypress-types-reference': {
    meta: {
      fixable: 'code',
    },
    create (context) {
      return {
        Program (node) {
          const referencePath = path.relative(
            path.dirname(context.getFilename()),
            path.resolve(__dirname, 'packages/vuetify/types/cypress')
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
  },
}

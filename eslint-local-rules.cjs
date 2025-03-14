'use strict'

module.exports = {
  'no-render-string-reference': require('./scripts/rules/no-render-string-reference.cjs'),
  'no-components-index': require('./scripts/rules/no-components-index.cjs'),
  'jsx-condition-key': require('./scripts/rules/jsx-condition-key.cjs'),
  'jsx-curly-spacing': require('./scripts/rules/jsx-curly-spacing.cjs'),
  'vitest-global-imports': require('./scripts/rules/vitest-global-imports.cjs'),
  'sort-imports': require('./scripts/rules/sort-imports.cjs'),
  'no-nullish-coalescing-in-condition': require('./scripts/rules/no-nullish-coalescing-in-condition.cjs'),
}

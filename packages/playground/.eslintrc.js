const eslint = require('../../.eslintrc.js')

eslint.rules['local-rules/no-render-string-reference'] = 'off'

module.exports = {
  ...eslint
}

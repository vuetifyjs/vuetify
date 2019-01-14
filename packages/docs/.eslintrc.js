const path = require('path')

module.exports = {
  extends: 'vuetify',
  plugins: ['json'],
  globals: {
    docsearch: true
  },
  rules: {
    'local-rules/no-render-string-reference': 'off',
    'prefer-promise-reject-errors': 'off'
  },
  overrides: [
    {
      files: 'src/examples/**/*.vue',
      rules: {
        'vue/valid-v-on': 'off',
        'vue/no-parsing-error': 'off', // This rule doesn't allow empty event listeners
        'vue/html-self-closing': ['error', {
          'html': {
            'void': 'never',
            'normal': 'never',
            'component': 'never'
          },
          'svg': 'always',
          'math': 'always'
        }]
      }
    },
    {
      files: 'src/examples/layouts/**/*.vue',
      rules: {
        'vue/order-in-components': 'off',
        'vue/require-default-prop': 'off'
      }
    }
  ]
}

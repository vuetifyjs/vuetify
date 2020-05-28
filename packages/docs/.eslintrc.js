module.exports = {
  plugins: [
    'json',
    'vuetify'
  ],
  globals: {
    docsearch: true
  },
  overrides: [
    {
      files: [
        'src/examples/**/*.vue',
        'src/layouts/layouts/demos/*.vue'
      ],
      rules: {
        'max-len': 'off', // lorem ipsum is long
        'vue/html-self-closing': ['error', {
          'html': {
            'void': 'never',
            'normal': 'never',
            'component': 'never'
          },
          'svg': 'always',
          'math': 'always'
        }],
        'vuetify/no-deprecated-classes': 'error',
        'vuetify/grid-unknown-attributes': 'error',
        'vuetify/no-legacy-grid': 'error',
      }
    },
    {
      files: 'src/examples/layouts/**/*.vue',
      rules: {
        // Props are just used for source links, they don't need to be great
        'vue/order-in-components': 'off',
        'vue/require-default-prop': 'off'
      }
    },
    {
      files: [
        'src/components/**/*.vue',
        'src/layouts/**/*.vue',
        'src/pages/**/*.vue',
        'src/views/**/*.vue',
      ],
      rules: {
        'indent': 'off',
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'vue/script-indent': ['error', 2, {
          'baseIndent': 1,
          'switchCase': 1,
          'ignores': []
        }],
        'vue/max-attributes-per-line': ['error', {
          'singleline': 1,
          'multiline': {
            'max': 1,
            'allowFirstLine': false
          }
        }],
        'vue/html-closing-bracket-newline': ['error', {
          'singleline': 'never',
          'multiline': 'always'
        }],
        'vue/html-closing-bracket-spacing': 'error',
        'vue/no-v-html': 'off',
      }
    }
  ]
}

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
      files: 'src/examples/**/*.vue',
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
    }
  ]
}

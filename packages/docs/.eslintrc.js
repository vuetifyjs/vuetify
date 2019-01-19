module.exports = {
  plugins: [
    'json'
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
        }]
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

module.exports = {
  globals: {
    '__REQUIRED_VUE__': true
  },
  plugins: [
    'eslint-plugin-local-rules'
  ],
  rules: {
    'local-rules/no-render-string-reference': 'error'
  }
}

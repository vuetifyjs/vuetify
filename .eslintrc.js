module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'standard'
  ],
  env: {
    browser: true
  },
  globals: {
    'expect': true,
    'describe': true,
    'it': true,
    'jest': true
  },
  plugins: [
    'eslint-plugin-local-rules'
  ],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': [2, 'as-needed'],
    // set maximum line characters
    'max-len': [2, 140, 4, {'ignoreUrls': true, 'ignoreTemplateLiterals': true, 'ignoreStrings': true}],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-return-assign': 0,
    'max-statements': [2, 24],
    'prefer-promise-reject-errors': 0,
    'local-rules/no-render-string-reference': 2
  }
}

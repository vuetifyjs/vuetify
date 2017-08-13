module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'vue',
    'plugin:vue/recommended' // or 'plugin:vue/base'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'pug',
    'html'
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
  settings: {
    'html/html-extensions': ['.vue'],
    'html/xml-extensions': []
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // set maximum line characters
    'max-len': [2, 140, 4, {'ignoreUrls': true, 'ignoreTemplateLiterals': true, 'ignoreStrings': true}],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-return-assign': 0,
    // disallow indentation using both tabs and spaces
    'no-mixed-spaces-and-tabs': 2,
    // ensure consistent 2 space indentation and indent cases under switch
    'indent': [2, 2, {'SwitchCase': 1}],
    'object-curly-spacing': [2, 'always'],
    'max-statements': [2, 24],

    'vue/no-side-effects-in-computed-properties': 'error',
    'vue/no-async-in-computed-properties': 'error',
    'vue/no-shared-component-data': 'error',
    'vue/return-in-computed-property': 'error',
    'vue/no-dupe-keys': 'error',
    'vue/no-duplicate-attributes': 'error',
    'vue/no-reservered-keys': 'error',
    'vue/require-render-return': 'error'
  }
}

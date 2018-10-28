const path = require('path')
const resolve = file => path.resolve(__dirname, file)

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/recommended',
    'standard',
    resolve('../../.eslintrc.js')
  ],
  env: {
    node: true,
    browser: true
  },
  plugins: [
    'json'
  ],
  globals: {
    docsearch: true
  },
  rules: {
    'max-len': 0,
    "vue/max-attributes-per-line": [2, {
      "singleline": 5,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "prefer-promise-reject-errors": 0
  },
  overrides: [
    {
      files: '**/*.vue',
      rules: {
        indent: false,
        "vue/script-indent": ["error", 2, {
          "baseIndent": 1,
          "switchCase": 1,
          "ignores": []
        }],
        "vue/html-closing-bracket-newline": ["error", {
          "singleline": "never",
          "multiline": "always"
        }],
        "vue/html-closing-bracket-spacing": "error"
      }
    },
    {
      files: 'src/examples/**/*.vue',
      rules: {
        "vue/valid-v-on": false,
        "vue/no-parsing-error": false, // This rule doesn't allow empty event listeners
        "vue/html-self-closing": ["error", {
          "html": {
            "void": "never",
            "normal": "never",
            "component": "never"
          },
          "svg": "always",
          "math": "always"
        }]
      }
    },
    {
      files: 'src/examples/layouts/**/*.vue',
      rules: {
        "vue/order-in-components": false,
        "vue/require-default-prop": false
      }
    }
  ]
}

const path = require('path')

module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
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
    'max-len': 'off',
    "vue/max-attributes-per-line": ['error', {
      "singleline": 5,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "prefer-promise-reject-errors": 'off'
  },
  overrides: [
    {
      files: '**/*.vue',
      rules: {
        indent: 'off',
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
        "vue/valid-v-on": 'off',
        "vue/no-parsing-error": 'off', // This rule doesn't allow empty event listeners
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
        "vue/order-in-components": 'off',
        "vue/require-default-prop": 'off'
      }
    }
  ]
}

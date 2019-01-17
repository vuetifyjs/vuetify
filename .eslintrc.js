module.exports = {
  root: true,
  parserOptions: {
    parser: 'typescript-eslint-parser',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  env: {
    node: true,
    browser: true,
    es6: true
  },
  plugins: [
    'typescript'
  ],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': ['error', 'as-needed'],
    // set maximum line characters
    'max-len': ['error', 140, 4, {
      'ignoreUrls': true,
      'ignoreTemplateLiterals': true,
      'ignoreStrings': true
    }],
    'max-statements': ['error', 24],
    'no-console': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-return-assign': 'off',
    'no-unused-vars': 'error',
    'no-empty': 'error',
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always'
      }
    ],
    'no-return-await': 'warn',
    'object-shorthand': ['error', 'always'],
    'no-extra-semi': 'error',
    'prefer-const': ['error', {
      'destructuring': 'all',
      'ignoreReadBeforeAssign': true
    }],

    // Not in override, these apply to non-.vue files too
    'vue/name-property-casing': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/prop-name-casing': 'error',
    'vue/return-in-computed-property': 'off'
  },
  overrides: [
    {
      files: '**/*.vue',
      rules: {
        indent: 'off',
        'vue/script-indent': ['error', 2, {
          'baseIndent': 1,
          'switchCase': 1,
          'ignores': []
        }],
        'vue/html-closing-bracket-newline': ['error', {
          'singleline': 'never',
          'multiline': 'always'
        }],
        'vue/html-closing-bracket-spacing': 'error',
        'vue/max-attributes-per-line': ['error', {
          'singleline': 5,
          'multiline': {
            'max': 1,
            'allowFirstLine': false
          }
        }],
        'vue/valid-v-on': 'off', // This rule doesn't allow empty event listeners
        'vue/no-v-html': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off'
      }
    },
    {
      files: '**/*.ts',
      rules: {
        // https://github.com/eslint/typescript-eslint-parser/issues/416
        'no-undef': 'off',

        // https://github.com/eslint/eslint/issues/10260
        'space-infix-ops': 'off',

        // https://github.com/nzakas/eslint-plugin-typescript/issues/127
        // 'typescript/prefer-namespace-keyword': 'error',

        // Can't overload function exports with this enabled
        'import/export': 'off',

        // https://github.com/eslint/typescript-eslint-parser/issues/445
        // https://github.com/eslint/typescript-eslint-parser/issues/457
        // enabled in tslint instead
        'no-unused-vars': 'off',
        // 'typescript/no-unused-vars': 'error',

        // https://github.com/eslint/typescript-eslint-parser/issues/443
        // 'no-redeclare': false,

        'typescript/adjacent-overload-signatures': 'error',
        'typescript/member-delimiter-style': ['error', {
          delimiter: 'none'
        }],
        'typescript/member-ordering': 'error',
        'typescript/type-annotation-spacing': 'error'
      }
    }
  ]
}

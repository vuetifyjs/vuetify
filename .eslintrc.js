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
    browser: true,
    es6: true
  },
  globals: {
    'expect': true,
    'describe': true,
    'it': true,
    'jest': true,
    'process': true,
    '__REQUIRED_VUE__': true
  },
  plugins: [
    'typescript',
    'eslint-plugin-local-rules'
  ],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': [2, 'as-needed'],
    'local-rules/no-render-string-reference': 2,
    // set maximum line characters
    'max-len': [2, 140, 4, {
      'ignoreUrls': true,
      'ignoreTemplateLiterals': true,
      'ignoreStrings': true
    }],
    'max-statements': [2, 24],
    'no-console': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-return-assign': 0,
    'prefer-promise-reject-errors': 0,
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'none', // This needs to be off so we can specify mixin interfaces
      ignoreRestSiblings: false
    }],
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

    'vue/name-property-casing': false,
    'vue/require-default-prop': false,
    'vue/require-prop-types': false,
    'vue/prop-name-casing': 'error'
  },
  overrides: [
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

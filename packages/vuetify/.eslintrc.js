module.exports = {
  globals: {
    __VUETIFY_VERSION__: true,
    __REQUIRED_VUE__: true,
  },
  env: {
    'jest/globals': true,
  },
  plugins: [
    'jest',
    'eslint-plugin-local-rules',
    'sort-destructure-keys',
    '@typescript-eslint',
  ],
  extends: ['standard', 'plugin:@typescript-eslint/recommended', 'plugin:jest/recommended'],
  rules: {
    'vue/html-self-closing': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 1,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    'local-rules/no-render-string-reference': 'error',
    'jest/no-disabled-tests': 'off',
    'jest/no-large-snapshots': 'warn',
    'jest/prefer-spy-on': 'warn',
    'jest/prefer-to-be-null': 'warn',
    'jest/prefer-to-be-undefined': 'warn',
    'jest/prefer-to-contain': 'warn',
    'jest/prefer-to-have-length': 'warn',
    'jest/no-standalone-expect': 'off',
    'jest/no-conditional-expect': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'function-call-argument-newline': [
      'error',
      'consistent',
    ],
    'import/export': 'off',
    'import/newline-after-import': 'error',
    // 'padding-line-between-statements': [
    //   'error',
    //   {
    //     blankLine: 'always',
    //     prev: ['const', 'let', 'var'],
    //     next: '*',
    //   },
    //   {
    //     blankLine: 'never',
    //     prev: ['const', 'let', 'var'],
    //     next: ['const', 'let', 'var'],
    //   },
    //   {
    //     blankLine: 'always',
    //     prev: '*',
    //     next: 'return',
    //   },
    // ],
    'multiline-ternary': 'off',
    'no-case-declarations': 'off',
    'no-prototype-builtins': 'off',
    'no-return-assign': 'off',
    'no-use-before-define': 'off',
    'prefer-rest-params': 'off',
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'sort-imports': ['error', {
      ignoreCase: true,
      ignoreDeclarationSort: true,
    }],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },
  overrides: [
    {
      files: 'dev/Playground.vue',
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: '**/*.spec.ts',
      rules: {
        'vue/component-definition-name-casing': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}

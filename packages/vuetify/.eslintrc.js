module.exports = {
  parserOptions: {
    project: './packages/vuetify/tsconfig.dev.json',
  },
  globals: {
    __VUETIFY_VERSION__: true,
    __REQUIRED_VUE__: true,
  },
  extends: [
    // 'plugin:import/typescript', // slow, only enable if needed
  ],
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',

    // 'vue/html-self-closing': 'off',
    // 'vue/html-closing-bracket-spacing': 'off',
    // 'local-rules/no-render-string-reference': 'error',
    'local-rules/no-components-index': 'error',

    'no-restricted-imports': ['error', {
      paths: [{
        name: 'vue',
        importNames: ['defineComponent'],
        message: 'Please use wrapped function from @/util instead'
      }]
    }],

    // 'import/no-cycle': 'warn',
    // 'import/no-self-import': 'warn',
  },
  overrides: [
    {
      files: 'src/**/*',
      rules: {
        'local-rules/sort-imports': 'warn',
      },
    },
    {
      files: 'dev/Playground.vue',
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: '**/*.spec.{ts,tsx}',
      env: {
        'jest/globals': true,
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'local-rules/jest-global-imports': 'error',

        'no-restricted-imports': 'off',

        'jest/no-disabled-tests': 'off',
        'jest/no-large-snapshots': 'warn',
        'jest/prefer-spy-on': 'warn',
        'jest/prefer-to-be': 'warn',
        'jest/prefer-to-contain': 'warn',
        'jest/prefer-to-have-length': 'warn',
        'jest/no-standalone-expect': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/no-identical-title': 'off',
      },
    },
    {
      files: '**/*.spec.cy.{ts,tsx}',
      env: {
        'cypress/globals': true,
      },
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
      rules: {
        'local-rules/cypress-types-reference': 'error',

        'no-restricted-imports': 'off',

        'no-unused-expressions': 'off',
        'cypress/no-assigning-return-values': 'error',
        'cypress/no-unnecessary-waiting': 'warn',
        'cypress/assertion-before-screenshot': 'warn',
        'cypress/no-async-tests': 'error',
        'cypress/unsafe-to-chain-command': 'off',
      },
    },
  ],
}

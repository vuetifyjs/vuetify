module.exports = {
  parserOptions: {
    project: './packages/vuetify/tsconfig.dev.json',
  },
  globals: {
    __VUETIFY_VERSION__: true,
    __REQUIRED_VUE__: true,
  },
  env: {
    'jest/globals': true,
    'cypress/globals': true,
  },
  plugins: [
    'jest',
    'eslint-plugin-local-rules',
    'cypress'
  ],
  extends: [
    'plugin:jest/recommended',
    'plugin:cypress/recommended',

    // 'plugin:import/typescript', // slow, only enable if needed
  ],
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',

    // 'vue/html-self-closing': 'off',
    // 'vue/html-closing-bracket-spacing': 'off',
    // 'local-rules/no-render-string-reference': 'error',

    // 'import/no-cycle': 'warn',
    // 'import/no-self-import': 'warn',
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'warn',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error',

    'jest/no-disabled-tests': 'off',
    'jest/no-large-snapshots': 'warn',
    'jest/prefer-spy-on': 'warn',
    'jest/prefer-to-be-null': 'warn',
    'jest/prefer-to-be-undefined': 'warn',
    'jest/prefer-to-contain': 'warn',
    'jest/prefer-to-have-length': 'warn',
    'jest/no-standalone-expect': 'off',
    'jest/no-conditional-expect': 'off',
  },
  overrides: [
    {
      files: 'dev/Playground.vue',
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: '**/*.cy.spec.{ts,tsx}',
      rules: {
        'jest/expect-expect': 'off',
        'jest/valid-expect': 'off',
        'jest/valid-expect-in-promise': 'off',
        'no-unused-expressions': 'off',
      },
    },
  ],
}

module.exports = {
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
    'no-labels': 'off',

    // 'vue/html-self-closing': 'off',
    // 'vue/html-closing-bracket-spacing': 'off',
    // 'local-rules/no-render-string-reference': 'error',
    'local-rules/no-components-index': 'error',
    'local-rules/no-nullish-coalescing-in-condition': 'error',

    'no-restricted-imports': ['error', {
      paths: [{
        name: 'vue',
        importNames: ['defineComponent'],
        message: 'Please use wrapped function from @/util instead',
      }],
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
      files: '**/*.spec.?(browser.){ts,tsx}',
      plugins: ['vitest'],
      extends: ['plugin:vitest/legacy-all'],
      rules: {
        'local-rules/vitest-global-imports': 'error',

        'no-restricted-imports': 'off',

        'vitest/no-commented-out-tests': 'off',
        'vitest/prefer-expect-assertions': 'off',
        'vitest/max-expects': 'off',
        'vitest/consistent-test-filename': 'off',
        'vitest/prefer-to-be-truthy': 'off',
        'vitest/prefer-to-be-falsy': 'off',
        'vitest/no-hooks': 'off',
        'vitest/prefer-lowercase-title': 'off',
        'vitest/require-hook': 'off',
        'vitest/prefer-snapshot-hint': 'off',
        'vitest/no-disabled-tests': 'off',
        'vitest/prefer-strict-equal': 'off',
        'vitest/prefer-called-with': 'off',

        'vitest/no-focused-tests': ['error', { fixable: false }],
      },
    },
  ],
}

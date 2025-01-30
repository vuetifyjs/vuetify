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
      files: '**/*.spec.?(browser.){ts,tsx}',
      plugins: ['vitest'],
      extends: ['plugin:vitest/recommended'],
      rules: {
        'local-rules/vitest-global-imports': 'error',

        'no-restricted-imports': 'off',

        'vitest/no-commented-out-tests': 'off',
        'vitest/no-large-snapshots': 'warn',
        'vitest/prefer-spy-on': 'warn',
        'vitest/prefer-to-be': 'warn',
        'vitest/prefer-to-contain': 'warn',
        'vitest/prefer-to-have-length': 'warn',
      },
    },
  ],
}

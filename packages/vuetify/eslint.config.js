import baseConfig from '../../eslint.config.js'
import vitestPlugin from '@vitest/eslint-plugin'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...baseConfig,
  {
    files: ['**/*.{js,cjs,mjs,jsx,ts,tsx,vue}'],
    languageOptions: {
      globals: { __VUETIFY_VERSION__: 'readonly', __REQUIRED_VUE__: 'readonly' },
    },
    rules: {
      'no-console': 'error',
      'no-debugger': 'error',
      'no-labels': 'off',
      'local-rules/no-components-index': 'error',
      'local-rules/no-nullish-coalescing-in-condition': 'error',
      'no-restricted-imports': ['error', {
        paths: [{
          name: 'vue',
          importNames: ['defineComponent'],
          message: 'Please use wrapped function from @/util instead',
        }],
      }],
    },
  },
  {
    files: ['src/**/*.{js,cjs,mjs,jsx,ts,tsx,vue}'],
    rules: { 'local-rules/sort-imports': 'warn' },
  },
  {
    files: ['dev/Playground.vue'],
    rules: { 'max-len': 'off' },
  },
  {
    files: ['**/*.spec.?(browser.){ts,tsx}'],
    extends: [vitestPlugin.configs.all],
    settings: { vitest: { typecheck: true } },
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
      'vitest/prefer-importing-vitest-globals': 'off',
      'vitest/prefer-describe-function-title': 'off',
      'vitest/padding-around-all': 'off',
      'vitest/padding-around-expect-groups': 'off',
      'vitest/padding-around-after-all-blocks': 'off',
      'vitest/padding-around-before-all-blocks': 'off',
      'vitest/require-mock-type-parameters': 'off',
      'vitest/unbound-method': 'off',
      'vitest/prefer-strict-boolean-matchers': 'off',
      'vitest/no-focused-tests': ['error', { fixable: false }],
    },
  },
  {
    ignores: ['build/**', 'dev/components.d.ts', 'es5/**', 'lib/**', 'lib-temp/**', 'dist/**'],
  },
])

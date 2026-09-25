import baseConfig from '../../eslint.config.js'

export default [
  ...baseConfig,
  {
    files: ['**/*.{js,cjs,mjs,jsx,ts,tsx,vue}'],
    rules: {
      'no-undef': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['src/components/**/*.vue'],
    rules: { 'max-len': 'off' },
  },
  {
    files: ['src/examples/**/*.vue'],
    rules: {
      'max-len': 'off', // lorem ipsum is long
      'vue/html-self-closing': ['error', {
        html: {
          void: 'never',
          normal: 'never',
          component: 'never',
        },
        svg: 'always',
        math: 'always',
      }],
      'vue/v-slot-style': ['warn', {
        default: 'longform',
        named: 'longform',
      }],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/first': 'off',
      'import/no-duplicates': 'off',
      'no-redeclare': 'off',
      'no-use-before-define': 'off',
    },
  },
  {
    files: ['src/examples/**/usage.vue'],
    rules: { 'vue/html-self-closing': 'warn' },
  },
  {
    ignores: ['src/api/*'],
  },
]

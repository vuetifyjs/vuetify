module.exports = {
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'no-undef': 'off',
    'vue/multi-word-component-names': 'off',
  },
  overrides: [
    {
      files: [
        'src/components/**/*.vue',
      ],
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: [
        'src/examples/**/*.vue',
      ],
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
        // 'vuetify/no-deprecated-classes': 'error',
        // 'vuetify/grid-unknown-attributes': 'error',
        // 'vuetify/no-legacy-grid': 'error',
        'import/newline-after-import': ['error', { count: 1 }],

        // Script blocks normally both run and render, but in examples we
        // remove the options block so it is safe to import things in both
        'import/first': 'off',
        'import/no-duplicates': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'sonarjs/no-identical-functions': 'off',
      },
    },
    {
      files: [
        'src/examples/**/usage.vue',
      ],
      rules: {
        'vue/html-self-closing': 'warn',
      },
    },
  ],
}

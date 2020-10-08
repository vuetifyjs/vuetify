module.exports = {
  overrides: [
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
        'vuetify/no-deprecated-classes': 'error',
        'vuetify/grid-unknown-attributes': 'error',
        'vuetify/no-legacy-grid': 'error',
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

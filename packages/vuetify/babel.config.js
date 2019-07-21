const vuetifyPackage = require('./package.json')

module.exports = {
  presets: [
    ['env', {
      targets: {
        node: 8
      },
      modules: false
    }]
  ],
  plugins: [
    ['transform-define', {
      __VUETIFY_VERSION__: vuetifyPackage.version,
      __REQUIRED_VUE__: vuetifyPackage.peerDependencies.vue
    }],
    '@babel/plugin-proposal-object-rest-spread'
  ],
  env: {
    test: {
      presets: [
        ['env', {
          targets: { node: true }
        }]
      ],
      plugins: [
        ['module-resolver', {
          root: ['./src'],
          alias: {
            '~components': 'components',
            '~directives': 'directives',
            '~mixins': 'mixins',
            '~scss': 'scss',
            '~util': 'util'
          }
        }]
      ]
    },
    es5: {
      presets: [
        ['env', {
          targets: {
            node: 8
          }
        }]
      ],
      plugins: [
        './build/babel-transform-sass-paths.js'
      ]
    },
    lib: {
      plugins: [
        './build/babel-transform-sass-paths.js'
      ]
    }
  }
}

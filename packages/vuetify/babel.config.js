import fs from 'node:fs/promises'

const vuetifyPackage = JSON.parse(await fs.readFile('./package.json', 'utf8'))

export default {
  assumptions: {
    noDocumentAll: true
  },
  ignore: [/\.d\.ts$/],
  presets: [
    ['@babel/preset-env', {
      modules: false,
    }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@vue/babel-plugin-jsx', { optimize: false, enableObjectSlots: false }],
    ['transform-define', {
      __VUETIFY_VERSION__: vuetifyPackage.version,
      __REQUIRED_VUE__: vuetifyPackage.peerDependencies.vue,
    }],
    ['module-resolver', {
      root: ['.'],
      alias: {
        '@': './src',
      },
    }],
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          targets: { node: true },
          modules: 'commonjs',
        }],
      ],
    },
    lib: {
      ignore: ['**/__tests__'],
      plugins: [
        ['babel-plugin-add-import-extension', { extension: 'js' }],
        ['./build/babel-plugin-replace-import-extension', { extMapping: {
          '.sass': '.css',
          '.scss': '.css',
        }}],
      ],
    },
  },
}

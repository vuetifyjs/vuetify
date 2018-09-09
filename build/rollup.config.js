import path from 'path'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'

const resolve = file => path.resolve(__dirname, '../', file)
const version = process.env.VERSION || require('../package.json').version
const banner = `/*!
* Vuetify v${version}
* Forged by John Leider
* Released under the MIT License.
*/`

const builds = {
  // for bundlers (webpack etc.)
  'esm': {
    dest: resolve('dist/vuetify.esm.js'),
    format: 'esm',
    minify: false,
    extractCss: true
  },
  // for use in browsers, will be minified by terser
  'umd': {
    dest: resolve('dist/vuetify.js'),
    format: 'umd',
    minify: false,
    extractCss: true
  },
  // for bundlers, with css inlined so sourcemaps work
  // this will only be produced in watch mode
  'esm-dev': {
    dest: resolve('dist/vuetify.esm.js'),
    format: 'esm',
    minify: false,
    extractCss: false
  }
}

function createConfig (name) {
  const config = builds[name]
  return {
    input: './src/index.ts',
    output: {
      name: 'Vuetify',
      format: config.format,
      file: config.dest,
      exports: 'default',
      sourcemap: true,
      banner,
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      postcss({
        extensions: ['.css', '.styl'],
        extract: config.extractCss,
        use: ['stylus'],
        sourceMap: !config.extractCss // TODO: sources paths are incorrect
      }),
      typescript({
        check: false
      }),
      babel({ plugins: ['external-helpers'] })
    ],
    external: ['vue'],
    watch: {
      include: 'src/**'
    }
  }
}

export default [createConfig(false)]

import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

const version = process.env.VERSION || require('../package.json').version

function createConfig (prod) {
  return {
    input: './src/index.ts',
    output: {
      name: 'Vuetify',
      format: 'umd',
      file: `dist/vuetify${prod ? '.min' : ''}.js`,
      exports: 'default',
      sourcemap: !prod,
      banner: `/*!
* Vuetify v${version}
* Forged by John Leider
* Released under the MIT License.
*/     `,
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      postcss({
        extensions: ['.css', '.styl'],
        extract: true,
        use: ['stylus'],
        sourceMap: !prod,
        minimize: prod && {
          discardComments: { removeAll: true },
          postcssZindex: false,
          reduceIdents: false
        }
      }),
      typescript({
        check: !prod,
        tsconfigOverride: {
          compilerOptions: {
            sourceMap: !prod
          }
        }
      }),
      babel({ plugins: ['external-helpers'] }),
      replace({ values: { 'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development') } }),
      prod && terser()
    ],
    external: ['vue']
  }
}

export default [createConfig(false), createConfig(true)]

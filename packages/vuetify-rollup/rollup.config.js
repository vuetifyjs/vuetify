import typescript from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import externals from 'rollup-plugin-node-externals'
import babel from '@rollup/plugin-babel'
import babelRuntimeExternal from 'rollup-plugin-babel-runtime-external'
import { rewriteSassPaths } from './scripts/rollup-plugins'
import pkg from './package.json'

const base = {
  plugins: [
    typescript(),
    replace({
      'process.env.__VUETIFY_VERSION__': JSON.stringify(pkg.version),
    }),
  ],
}

const createConfig = format => {
  if (format === 'lib') return createLib('esm')

  return {
    ...base,
    input: 'src/full.ts',
    output: {
      file: `dist/vuetify.${format}.js`,
      format,
      name: 'Vuetify',
      globals: {
        vue: 'Vue',
      },
    },
    plugins: [
      ...base.plugins,
      format !== 'esm' && babel({
        babelHelpers: 'runtime',
        extensions: ['.js', '.ts'],
        exclude: ['node_modules'],
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
            },
          ],
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              useESModules: true,
            },
          ],
        ],
      }),
      postcss({
        extract: 'vuetify.css',
        plugins: [
        ],
        minimize: false,
        sourceMap: false,
      }),
      externals(),
      babelRuntimeExternal(),
    ],
  }
}

const createLib = format => {
  return {
    ...base,
    input: 'src/index.ts',
    output: {
      dir: 'lib',
      format,
    },
    preserveModules: true,
    plugins: [
      ...base.plugins,
      rewriteSassPaths(),
      externals(),
    ],
  }
}

const packageOptions = pkg.buildOptions || {}

const allFormats = ['esm', 'cjs', 'umd', 'lib']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const packageFormats = inlineFormats || packageOptions.formats || allFormats

const packageConfigs = packageFormats.map(createConfig)

export default packageConfigs

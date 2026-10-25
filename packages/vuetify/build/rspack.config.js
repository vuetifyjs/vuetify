import fs from 'node:fs'
import path from 'upath'
import { rspack } from '@rspack/core'
import { banner, root } from './constants.js'

const targets = fs.readFileSync(path.resolve(root, '.browserslistrc'), 'utf8').split('\n').filter(Boolean).join(', ')

const extensions = ['.ts', '.tsx', '.js', '.mjs']

function rules (css) {
  return [
    {
      test: /\.[jt]sx?$/,
      include: path.resolve(root, 'src'),
      // ponytail: babel stays for @vuetify/babel-plugin-jsx, rspack has no native Vue JSX transform
      // 4 workers: 8 saves 0.1 s for +0.7 GB peak memory
      use: [{ loader: 'babel-loader', parallel: { maxWorkers: 4 }, options: { babelrc: false, configFile: path.resolve(root, 'babel.config.js') } }],
    },
    css ? {
      test: /\.s[ac]ss$/,
      use: [
        { loader: 'builtin:lightningcss-loader', options: { targets } },
        { loader: 'sass-loader', options: { api: 'modern-compiler', implementation: 'sass-embedded', sassOptions: { charset: false } } },
      ],
      type: 'css',
    } : {
      test: /\.s[ac]ss$/,
      loader: path.resolve(root, 'build/rspack-empty-loader.cjs'),
      sideEffects: false,
    },
  ]
}

// The labs min entry exists for its CSS; rollup never shipped a minified labs bundle
function dropAssets (pattern) {
  return {
    apply (compiler) {
      compiler.hooks.thisCompilation.tap('dropAssets', compilation => {
        compilation.hooks.processAssets.tap({ name: 'dropAssets', stage: rspack.Compilation.PROCESS_ASSETS_STAGE_REPORT }, () => {
          for (const name of Object.keys(compilation.assets)) {
            if (pattern.test(name)) compilation.deleteAsset(name)
          }
        })
      })
    },
  }
}

function config ({ name, entry, library, css }) {
  return {
    name,
    mode: 'production',
    context: root,
    target: ['web', 'browserslist'],
    entry,
    devtool: false,
    externals: library === 'umd'
      ? { vue: { root: 'Vue', commonjs: 'vue', commonjs2: 'vue', amd: 'vue' } }
      : { vue: 'vue' },
    externalsType: library === 'umd' ? 'umd' : 'module',
    output: {
      path: path.resolve(root, 'dist'),
      filename: '[name].js',
      cssFilename: '[name].css',
      library: library === 'umd' ? { type: 'umd', name: 'Vuetify' } : { type: 'modern-module' },
      globalObject: 'this',
      clean: false,
    },
    resolve: {
      extensions,
      alias: { '@': path.resolve(root, 'src') },
    },
    module: { rules: rules(css) },
    optimization: {
      splitChunks: false,
      runtimeChunk: false,
      // ESM consumers' bundlers resolve process.env themselves
      nodeEnv: library === 'umd' ? 'production' : false,
      avoidEntryIife: library !== 'umd',
      concatenateModules: library === 'umd',
      minimize: true,
      minimizer: [
        new rspack.SwcJsMinimizerRspackPlugin({ include: /\.min\.js$/, extractComments: false }),
        new rspack.SwcJsMinimizerRspackPlugin({
          exclude: /\.min\.js$/,
          extractComments: false,
          minimizerOptions: { compress: false, mangle: false, format: { beautify: true, comments: 'some' } },
        }),
        new rspack.LightningCssMinimizerRspackPlugin({ include: /\.min\.css$/, minimizerOptions: { targets } }),
      ],
    },
    plugins: [
      new rspack.BannerPlugin({ banner, raw: true, entryOnly: true }),
      new rspack.SourceMapDevToolPlugin({ test: /^vuetify(\.min|\.esm)?\.js$|^vuetify-labs\.esm\.js$/, filename: '[file].map' }),
      dropAssets(/^vuetify-labs\.min\.js/),
      // @vuetify/v0 reads it at module init, CDN builds have no `process`
      library === 'umd' && new rspack.DefinePlugin({ 'process.env.VITE_LOGGER_ENABLED': 'undefined' }),
    ],
    performance: false,
  }
}

export default [
  config({
    name: 'umd',
    entry: { vuetify: './src/entry-bundler.ts', 'vuetify.min': './src/entry-bundler.ts' },
    library: 'umd',
    css: true,
  }),
  config({ name: 'esm', entry: { 'vuetify.esm': './src/entry-bundler.ts' }, library: 'esm' }),
  config({
    name: 'labs-umd',
    entry: { 'vuetify-labs': './src/labs/entry-bundler.ts', 'vuetify-labs.min': './src/labs/entry-bundler.ts' },
    library: 'umd',
    css: true,
  }),
  config({ name: 'labs-esm', entry: { 'vuetify-labs.esm': './src/labs/entry-bundler.ts' }, library: 'esm' }),
]

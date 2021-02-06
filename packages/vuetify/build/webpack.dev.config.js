const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const VueLoader = require('vue-loader')
// const { VuetifyProgressiveModule } = require('vuetify-loader')
const baseWebpackConfig = require('./webpack.base.config')

// Helpers
const resolve = file => path.resolve(__dirname, file)

module.exports = merge(baseWebpackConfig, {
  target: 'web',
  entry: ['./dev/index.js'],
  output: {
    filename: '[name].js',
    path: resolve('../dev'),
    library: 'Vuetify'
  },
  resolve: {
    alias: { vuetify$: resolve('../src/entry-bundler.ts') }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: {
        //   compilerOptions: {
        //     modules: [VuetifyProgressiveModule]
        //   }
        // }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        oneOf: [
          // {
          //   test: /\.(png|jpe?g|gif)$/,
          //   resourceQuery: /vuetify-preload/,
          //   use: [
          //     'vuetify-loader/progressive-loader',
          //     {
          //       loader: 'url-loader',
          //       options: { limit: 8000 }
          //     }
          //   ]
          // },
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: resolve('../dev'),
    publicPath: '/',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '8080',
    disableHostCheck: true,
  },
  plugins: [
    new VueLoader.VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      '__VUE_OPTIONS_API__': 'true',
      '__VUE_PROD_DEVTOOLS__': 'true',
    }),
  ],
})

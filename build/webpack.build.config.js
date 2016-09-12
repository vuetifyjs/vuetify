const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: false,
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'vuetify.js',
    library: 'Vuetify',
    libraryTarget: 'umd'
  },
  resolveLoader: {
    root: path.join(__dirname, '../node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "vue-style-loader",
          loader: ['css-loader', 'stylus-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('stylus.css'),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  vue: {
    postcss: [
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ]
  }
}
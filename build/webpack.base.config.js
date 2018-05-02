const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const resolve = file => require('path').resolve(__dirname, file)

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', '.ts'],
    alias: {
      '@': resolve('../src')
    }
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    }
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true
    })
  ]
}

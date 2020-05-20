const path = require('path')
const resolve = file => path.resolve(__dirname, file)

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            { loader: 'html-loader' },
            { loader: resolve('./build/md-to-vuetify') },
          ],
        },

      ],
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
}

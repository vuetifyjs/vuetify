module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8081
  },
  configureWebpack: {
    resolve: {
      symlinks: false
    }
  }
}

module: {
  rules: [
    {
      test: /\.styl$/,
      loader: ['style-loader', 'css-loader', 'stylus-loader']
    }
  ]
}

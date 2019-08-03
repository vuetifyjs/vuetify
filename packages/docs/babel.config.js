module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      modules: false,
      corejs: { version: 2, proposals: true }
    }]
  ]
}

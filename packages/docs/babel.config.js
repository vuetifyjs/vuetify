module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      modules: false,
      corejs: { version: 2, proposals: true }
    }]
  ],
  plugins: [
    [
      '@babel/plugin-proposal-optional-chaining',
      { loose: true },
    ],
    [
      '@babel/plugin-proposal-nullish-coalescing-operator',
      { loose: true },
    ],
  ]
}

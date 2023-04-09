module.exports = {
  presets: [
    '@babel/preset-typescript',
  ],
  plugins: [
    ['babel-plugin-add-import-extension', { extension: 'mjs' }],
    ['@babel/plugin-syntax-import-assertions'],
  ],
}

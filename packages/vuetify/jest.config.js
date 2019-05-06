const base = require('../../jest.config')

module.exports = {
  ...base,
  name: 'Vuetify',
  displayName: 'Vuetify',
  setupFiles: [
    'jest-canvas-mock'
  ]
}

const base = require('../../jest.config')

module.exports = {
  ...base,
  id: 'Vuetify',
  displayName: 'Vuetify',
  setupFiles: [
    'jest-canvas-mock',
  ],
}

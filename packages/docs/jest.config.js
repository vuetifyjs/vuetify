const os = require('os')

const maxWorkers = Math.max(1, Math.floor(Math.min(os.cpus().length / 2, os.freemem() / 1024 / 1024 / 1024 / 2.5)))

module.exports = {
  maxWorkers,
  runner: 'jest-runner-eslint',
  displayName: 'lint',
  testMatch: [
    '<rootDir>/src/**/*.js',
    '<rootDir>/src/**/*.ts',
    '<rootDir>/src/**/*.tsx',
    '<rootDir>/src/**/*.vue',
  ],
  moduleFileExtensions: ['vue', 'ts', 'js', 'tsx'],
  reporters: [['jest-silent-reporter', {
    showWarnings: true,
    useDots: true,
  }]],
}

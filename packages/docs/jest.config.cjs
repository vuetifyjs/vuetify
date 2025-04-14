const os = require('os')

const maxWorkers = Math.max(1, Math.floor(Math.min(os.cpus().length / 2, os.freemem() / 1024 ** 3 / 3.1)))

module.exports = {
  maxWorkers,
  runner: 'jest-runner-eslint',
  displayName: 'lint',
  testMatch: [
    '<rootDir>/src/**/*.js',
    '<rootDir>/src/**/*.ts',
    '<rootDir>/src/**/*.tsx',
    '<rootDir>/src/**/*.vue',
    '<rootDir>/src/**/*.json',
  ],
  moduleFileExtensions: ['vue', 'ts', 'js', 'tsx', 'json'],
  reporters: [['jest-silent-reporter', {
    showWarnings: true,
    useDots: true,
  }]],
}

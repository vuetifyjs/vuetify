const os = require('os')

function clamp (v, min, max) {
  return Math.max(min, Math.floor(Math.min(max, v)))
}

const memoryReserve = 3 // leave room for tsc too
const availableMemory = (os.freemem() / 1024 ** 3) - memoryReserve
const memoryPerWorker = 2.8
const threads = os.cpus().length / 2
const maxWorkers = clamp(availableMemory / memoryPerWorker, 1, threads)

console.log(`${maxWorkers} workers`)

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

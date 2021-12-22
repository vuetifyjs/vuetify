module.exports = {
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

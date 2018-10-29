module.exports = {
  verbose: false,
  roots: [
    '<rootDir>/src',
    '<rootDir>/test/unit',
    '<rootDir>/test/integration'
  ],
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  moduleDirectories: [
    'node_modules'
  ],
  moduleNameMapper: {
    '^@/test$': '<rootDir>/test/index.js',
    '^@/test/(.*)$': '<rootDir>/test/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '\\.(styl)$': 'jest-css-modules',
    '.*\\.(j|t)s$': 'ts-jest'
  },
  mapCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,ts,tsx}'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!vue-router)'
  ],
  snapshotSerializers: [
    'jest-serializer-html'
  ],
  globals: {
    'ts-jest': {
      'useBabelrc': true
    }
  }
}

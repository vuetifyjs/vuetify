module.exports = {
  verbose: false,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  roots: [
    '<rootDir>/src',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/test/index.ts',
  ],
  moduleFileExtensions: [
    'tsx',
    'ts',
    'js',
  ],
  moduleDirectories: [
    'node_modules',
  ],
  moduleNameMapper: {
    '^@/test$': '<rootDir>/test/index.js',
    '^@/test/(.*)$': '<rootDir>/test/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '.*\\.(j|t)sx?$': 'babel-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!**/*.d.ts',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!vue-router)',
  ],
  snapshotSerializers: [
    'jest-serializer-html',
  ],
  testMatch: [
    // Default
    '**/test/**/*.js',
    '**/__tests__/**/*.spec.js',
    '**/__tests__/**/*.spec.ts',
    '**/__tests__/**/*.spec.tsx',
  ],
}

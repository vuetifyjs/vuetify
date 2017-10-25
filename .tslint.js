module.exports = {
  defaultSeverity: 'error',
  extends: 'tslint-config-standard',
  linterOptions: {
    exclude: [
      './build/*',
      './es5/**/*',
      './dev/**/*',
      './src/stylus/*.styl',
      './src/util/testing.js',
      './src/util/to-have-been-warned.js',
      '**/*.spec.js',
      './node_modules/**/*'
    ]
  },
  jsRules: {
    'max-line-length': [true, 140],
    'no-debugger': process.env.NODE_ENV === 'production'
  },
  rules: {
    'max-line-length': [true, 140],
    'no-debugger': process.env.NODE_ENV === 'production',
    'strict-type-predicates': false
  },
  rulesDirectory: []
}

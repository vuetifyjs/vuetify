module.exports = {
  defaultSeverity: 'error',
  extends: 'typestrict',
  linterOptions: {
    include: [
      './src/**/*.ts'
    ],
    exclude: [
      '**/*.spec.js',
      './node_modules/**/*'
    ]
  },
  jsRules: {},
  rules: {
    'array-type': [true, 'array'],
    'use-type-alias': true,
    'no-inferrable-types': true,
    'unified-signatures': true,
    'use-default-type-parameter': true,
    'no-undefined-argument': true,

    /* typestrict overrides */

    // Handled by tsc
    'no-unused-variable': false,

    // Useless with vue
    'no-invalid-this': false,

    // Retarded
    'restrict-plus-operands': false,

    // Fails with no-unused-variable for some reason
    'no-useless-cast': false
  },
  rulesDirectory: []
}

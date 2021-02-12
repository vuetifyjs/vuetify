module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue'],
  },
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
    'plugin:sonarjs/recommended',
  ],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  plugins: [
    '@typescript-eslint',
    'sonarjs',
    'react',
    // 'vuetify',
  ],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': ['error', 'as-needed'],
    // set maximum line characters
    'max-len': ['error', {
      code: 140,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
      ignoreTrailingComments: true,
    }],
    'max-statements': ['error', 24],
    quotes: ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true,
    }],
    'no-console': 'off',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-return-assign': 'off',
    'no-unused-vars': 'error',
    'no-empty': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always',
      },
    ],
    'no-return-await': 'warn',
    'object-shorthand': ['error', 'always'],
    'no-extra-semi': 'error',
    'prefer-const': ['error', {
      destructuring: 'all',
      ignoreReadBeforeAssign: true,
    }],
    'no-prototype-builtins': 'off',
    'no-void': 'off',
    'no-case-declarations': 'off',

    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-duplicate-string': 'off',

    // Not in override, these apply to non-.vue files too
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/one-component-per-file': 'off',
    'vue/custom-event-name-casing': ['error', { ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'] }],
  },
  overrides: [
    {
      files: '**/*.vue',
      rules: {
        indent: 'off',
        'vue/script-indent': ['error', 2, {
          baseIndent: 1,
          switchCase: 1,
          ignores: [],
        }],
        'vue/html-closing-bracket-newline': ['error', {
          singleline: 'never',
          multiline: 'always',
        }],
        'vue/html-closing-bracket-spacing': 'error',
        'vue/max-attributes-per-line': ['error', {
          singleline: 5,
          multiline: {
            max: 1,
            allowFirstLine: false,
          },
        }],
        'vue/valid-v-on': 'off', // This rule doesn't allow empty event listeners
        'vue/no-v-html': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/valid-v-slot': ['error', { allowModifiers: true }],

        // 'vuetify/grid-unknown-attributes': 'error',
        // 'vuetify/no-legacy-grid': 'error',
        // 'vuetify/no-deprecated-classes': 'error',
      },
    },
    {
      files: '**/*.ts',
      rules: {
        // Can't overload function exports with this enabled
        'import/export': 'off',

        // False positives on types
        'no-undef': 'off',

        quotes: 'off',
        '@typescript-eslint/quotes': ['error', 'single', {
          avoidEscape: true,
          allowTemplateLiterals: true,
        }],

        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'error',

        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],

        // Enabled in tsconfig
        'no-unused-vars': 'off',

        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: {
            delimiter: 'none',
          },
          singleline: {
            delimiter: 'comma',
          },
        }],
        // '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        '@typescript-eslint/no-invalid-this': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        // '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        // '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'warn',
        '@typescript-eslint/restrict-plus-operands': 'error',
      },
    },
    {
      files: '**/*.tsx',
      rules: {
        'react/jsx-boolean-value': 'error',
        'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
        'react/jsx-curly-brace-presence': 'error',

        // https://github.com/yannickcr/eslint-plugin-react/issues/2415
        // 'react/jsx-curly-spacing': ['error', { when: 'always', spacing: { objectLiterals: 'never' } }],

        'react/jsx-equals-spacing': 'error',
        'react/jsx-first-prop-new-line': 'error',
        'react/jsx-max-props-per-line': ['error', { when: 'multiline' }],
        'react/jsx-no-comment-textnodes': 'error',
        'react/jsx-tag-spacing': 'error',
        'react/jsx-wrap-multilines': ['error', {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
        }],
      },
    },
  ],
}

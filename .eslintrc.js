module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue', '.json'],
    suppressDeprecatedPropertyWarnings: true,
  },
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
    // 'plugin:vuetify/base',
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
    'eslint-plugin-local-rules',
  ],
  rules: {
    'no-var': 'error',
    // allow paren-less arrow functions
    'arrow-parens': ['error', 'as-needed'],
    // set maximum line characters
    'max-len': ['error', {
      code: 140,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
      ignoreTrailingComments: true,
    }],
    complexity: ['error', 32],
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
    indent: ['error', 2, {
      ...require('eslint-config-standard').rules.indent[2],
      flatTernaryExpressions: true,
      offsetTernaryExpressions: false,
    }],
    'sort-imports': ['warn', {
      ignoreDeclarationSort: true,
      ignoreCase: true,
    }],
    'multiline-ternary': 'off',
    'no-implicit-coercion': ['error', { boolean: false }],

    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-duplicate-string': 'off',

    // Not in override, these apply to non-.vue files too
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/one-component-per-file': 'off',
    'vue/custom-event-name-casing': ['error', { ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'] }],

    'vue/attributes-order': ['error', {
      order: [
        'DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'UNIQUE', 'GLOBAL', 'SLOT',
        'TWO_WAY_BINDING', 'ATTR_DYNAMIC', 'ATTR_STATIC', 'ATTR_SHORTHAND_BOOL', 'OTHER_DIRECTIVES', 'EVENTS', 'CONTENT',
      ],
      alphabetical: true,
    }],
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
          multiline: 1,
        }],
        'vue/valid-v-on': 'off', // This rule doesn't allow empty event listeners
        'vue/no-v-html': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/valid-v-slot': ['error', { allowModifiers: true }],
        'vue/multi-word-component-names': 'off',

        /* TODO: this really should be enabled,
            we just do it so much I didn't have time to fix them all */
        'vue/no-v-text-v-html-on-component': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
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

        indent: 'off',
        '@typescript-eslint/indent': ['error', 2, {
          ...require('eslint-config-standard').rules.indent[2],
          ignoredNodes: [...require('eslint-config-standard').rules.indent[2].ignoredNodes, 'TSTypeParameterInstantiation'],
          flatTernaryExpressions: true,
          offsetTernaryExpressions: false,
        }],

        'func-call-spacing': 'off',
        '@typescript-eslint/func-call-spacing': require('eslint-config-standard').rules['func-call-spacing'],

        // Handled by tsc
        'no-redeclare': 'off',

        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],

        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': ['error'],

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
        '@typescript-eslint/consistent-type-imports': ['error', {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        }],
        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import/no-duplicates': ['error', { 'prefer-inline': false }],
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        // '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        // '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        // '@typescript-eslint/prefer-optional-chain': 'warn',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'warn',
        '@typescript-eslint/restrict-plus-operands': 'error',
      },
    },
    {
      files: '**/*.tsx',
      rules: {
        'jsx-quotes': 'error',
        'react/jsx-boolean-value': 'error',
        'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
        'react/jsx-curly-brace-presence': 'error',

        // https://github.com/yannickcr/eslint-plugin-react/issues/2415
        // 'react/jsx-curly-spacing': ['error', { when: 'always', spacing: { objectLiterals: 'never' } }],
        'local-rules/jsx-condition-key': 'error',
        'local-rules/jsx-curly-spacing': ['error', {
          when: 'always',
          spacing: {
            objectLiterals: 'never',
            arrayLiterals: 'never',
            multilineClose: 'never',
          },
          children: true,
        }],

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
    {
      files: '**/*.d.ts',
      rules: {
        'import/no-duplicates': 'off',
      },
    },
    {
      files: '**/*.json',
      rules: {
        quotes: ['error', 'double'],
        'comma-dangle': ['error', 'never'],
        'quote-props': ['error', 'always'],
        'max-len': 'off',
        'no-unused-expressions': 'off',
        'no-template-curly-in-string': 'off',
      },
    },
  ],
}

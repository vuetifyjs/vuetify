import neostandard from 'neostandard'
import jsonPlugin from '@eslint/json'
import tsParser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'eslint/config'

import jsxConditionKey from './scripts/rules/jsx-condition-key.js'
import jsxCurlySpacing from './scripts/rules/jsx-curly-spacing.js'
import jsxPropCasing from './scripts/rules/jsx-prop-casing.js'
import noComponentsIndex from './scripts/rules/no-components-index.js'
import noNullishCoalescingInCondition from './scripts/rules/no-nullish-coalescing-in-condition.js'
import noRenderStringReference from './scripts/rules/no-render-string-reference.js'
import sortImports from './scripts/rules/sort-imports.js'
import vitestGlobalImports from './scripts/rules/vitest-global-imports.js'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig([
  ...neostandard({
    ts: true,
    env: ['node', 'browser'],
    files: ['**/*.vue'],
  }),
  {
    files: ['**/*.{js,cjs,mjs,jsx,ts,tsx,vue}'],
    extends: pluginVue.configs['flat/recommended'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        parser: tsParser,
        projectService: true,
        tsconfigRootDir: rootDir,
        extraFileExtensions: ['.vue', '.json'],
        suppressDeprecatedPropertyWarnings: true,
      },
    },
    plugins: {
      import: importPlugin,
      local: {
        rules: {
          'jsx-condition-key': jsxConditionKey,
          'jsx-curly-spacing': jsxCurlySpacing,
          'jsx-prop-casing': jsxPropCasing,
          'no-components-index': noComponentsIndex,
          'no-nullish-coalescing-in-condition': noNullishCoalescingInCondition,
          'no-render-string-reference': noRenderStringReference,
          'sort-imports': sortImports,
          'vitest-global-imports': vitestGlobalImports,
        },
      },
    },
    rules: {
      'no-var': 'error',
      'arrow-parens': ['error', 'as-needed'],
      'object-shorthand': ['error', 'always'],
      'dot-notation': ['error', { allowKeywords: true }],
      'no-case-declarations': 'off',
      'no-console': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-prototype-builtins': 'off', // TODO: replace with hasOwn
      'no-return-assign': 'off',
      'no-unused-vars': 'error',
      'no-void': 'off',
      'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: true }],
      'max-len': ['error', {
        code: 140,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
      }],
      complexity: ['error', 36],

      'no-return-await': 'warn',
      'sort-imports': ['warn', { ignoreDeclarationSort: true, ignoreCase: true }],
      'no-implicit-coercion': ['error', { boolean: false }],

      'import/export': 'error',
      'import/first': 'error',
      'import/no-absolute-path': ['error', { esmodule: true, commonjs: true, amd: false }],
      'import/no-duplicates': 'error',
      'import/no-named-default': 'error',
      'import/no-webpack-loader-syntax': 'error',

      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',
      'vue/one-component-per-file': 'off',
      'vue/custom-event-name-casing': ['error', 'camelCase', { ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'] }],
      'vue/multi-word-component-names': 'off',
      'vue/attributes-order': ['error', {
        order: [
          'DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'UNIQUE', 'GLOBAL', 'SLOT',
          'TWO_WAY_BINDING', 'ATTR_DYNAMIC', 'ATTR_STATIC', 'ATTR_SHORTHAND_BOOL', 'OTHER_DIRECTIVES', 'EVENTS', 'CONTENT',
        ],
        alphabetical: true,
      }],

      '@stylistic/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
        importAttributes: 'always-multiline',
        dynamicImports: 'always-multiline',
        enums: 'always-multiline',
        generics: 'only-multiline',
        tuples: 'always-multiline',
      }],
      '@stylistic/indent': ['error', 2, {
        flatTernaryExpressions: true,
        offsetTernaryExpressions: false,
      }],
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: 'always' }],
      '@stylistic/space-before-function-paren': ['error', { anonymous: 'always', named: 'always', asyncArrow: 'always' }],
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      '@stylistic/indent': 'off',
      'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1, ignores: [] }],
      'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'always' }],
      'vue/html-closing-bracket-spacing': 'error',
      'vue/max-attributes-per-line': ['error', { singleline: 5, multiline: 1 }],
      'vue/valid-v-on': 'off', // This rule doesn't allow empty event listeners
      'vue/no-v-html': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/valid-v-slot': ['error', { allowModifiers: true }],

      /* TODO: this really should be enabled,
          we just do it so much I didn't have time to fix them all */
      'vue/no-v-text-v-html-on-component': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: { parser: tsParser },
    rules: {
      '@stylistic/member-delimiter-style': ['error', {
        multiline: { delimiter: 'none' },
        singleline: { delimiter: 'comma' },
      }],
      '@stylistic/type-annotation-spacing': 'error',

      // Handled by tsc
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // Overridden neostandard defaults
      '@typescript-eslint/no-loss-of-precision': 'off',
      '@typescript-eslint/no-dupe-class-members': 'off',
      '@typescript-eslint/no-array-constructor': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],

      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/no-invalid-this': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'separate-type-imports' }],
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/no-duplicates': ['error', { 'prefer-inline': false }],
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'warn',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
    },
  },
  {
    files: ['**/*.tsx'],
    plugins: { react: reactPlugin },
    rules: {
      'jsx-quotes': 'error',
      'react/jsx-boolean-value': 'error',
      'react/jsx-no-comment-textnodes': 'error',

      '@stylistic/jsx-quotes': 'off',
      '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
      '@stylistic/jsx-curly-brace-presence': 'error',
      '@stylistic/jsx-closing-tag-location': 'off',
      '@stylistic/jsx-curly-newline': 'off',
      '@stylistic/jsx-curly-spacing': 'off',
      '@stylistic/jsx-equals-spacing': 'error',
      '@stylistic/jsx-first-prop-new-line': 'error',
      '@stylistic/jsx-indent-props': 'off',
      '@stylistic/jsx-max-props-per-line': ['error', { when: 'multiline' }],
      '@stylistic/jsx-pascal-case': 'off',
      '@stylistic/jsx-tag-spacing': 'error',
      '@stylistic/jsx-wrap-multilines': ['error', {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
      }],

      'neostandard/jsx-key': 'off',

      'local/jsx-condition-key': 'error',
      // https://github.com/yannickcr/eslint-plugin-react/issues/2415
      'local/jsx-curly-spacing': ['error', {
        when: 'always',
        spacing: {
          objectLiterals: 'never',
          arrayLiterals: 'never',
          multilineClose: 'never',
        },
        children: true,
      }],
      'local/jsx-prop-casing': 'error',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: { 'import/no-duplicates': 'off' },
  },
  {
    files: ['**/*.json'],
    plugins: { json: jsonPlugin },
    language: 'json/json',
    rules: {
      'json/no-duplicate-keys': 'error',
      'json/no-empty-keys': 'error',
      'json/no-unnormalized-keys': 'error',
      'json/no-unsafe-values': 'error',
    },
  },
])

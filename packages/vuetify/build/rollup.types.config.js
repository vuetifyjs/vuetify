import path from 'path'

import dts from 'rollup-plugin-dts'
import alias from '@rollup/plugin-alias'

const externalsPlugin = () => ({
  resolveId (source, importer) {
    if (importer && (source.endsWith('.sass') || source.endsWith('.scss'))) {
      return {
        id: source,
        external: true,
        moduleSideEffects: false,
      }
    }
  }
})

function createTypesConfig (input, output) {
  return {
    input: 'types-temp/' + input,
    output: [{ file: output, format: 'es' }],
    plugins: [
      dts(),
      externalsPlugin(),
      alias({
        entries: [
          { find: /^@\/(.*)/, replacement: path.resolve(__dirname, '../types-temp/$1') },
        ]
      })
    ],
  }
}

export default [
  createTypesConfig('entry.d.ts', 'lib/entry.d.ts'),
  createTypesConfig('framework.d.ts', 'lib/framework.d.ts'),
  createTypesConfig('entry-bundler.d.ts', 'dist/vuetify.d.ts'),
  createTypesConfig('components/index.d.ts', 'lib/components/index.d.ts'),
  createTypesConfig('directives/index.d.ts', 'lib/directives/index.d.ts'),
]

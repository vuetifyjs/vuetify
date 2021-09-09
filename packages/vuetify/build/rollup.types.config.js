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
  createTypesConfig('framework.d.ts', 'lib/index.d.ts'),
  createTypesConfig('entry-bundler.d.ts', 'dist/vuetify.d.ts'),
  createTypesConfig('components/index.d.ts', 'lib/components/index.d.ts'),
  createTypesConfig('directives/index.d.ts', 'lib/directives/index.d.ts'),
  createTypesConfig('locale/index.d.ts', 'lib/locale/index.d.ts'),
  createTypesConfig('iconsets/fa.d.ts', 'lib/iconsets/fa.d.ts'),
  createTypesConfig('iconsets/fa4.d.ts', 'lib/iconsets/fa4.d.ts'),
  createTypesConfig('iconsets/fa-svg.d.ts', 'lib/iconsets/fa-svg.d.ts'),
  createTypesConfig('iconsets/md.d.ts', 'lib/iconsets/md.d.ts'),
  createTypesConfig('iconsets/mdi.d.ts', 'lib/iconsets/mdi.d.ts'),
  createTypesConfig('iconsets/mdi-svg.d.ts', 'lib/iconsets/mdi-svg.d.ts'),
]

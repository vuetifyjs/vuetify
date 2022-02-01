import path from 'path'
import fs from 'fs/promises'

import dts from 'rollup-plugin-dts'
import alias from '@rollup/plugin-alias'

import importMap from '../dist/json/importMap.json'

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
      }),
      {
        async renderChunk (code) {
          if (input === 'framework.d.ts') {
            const components = Object.keys(importMap.components).map(name => (
              `    ${name}: typeof import('vuetify/components')['${name}']`
            )).join('\n')

            const shims = (await fs.readFile(path.resolve(__dirname, '../src/shims.d.ts'), { encoding: 'utf8' }))
              .replace(/^\s+\/\/ @skip-build\s+.*$/gm, '')
              .replace(/^\s+\/\/ @generate-components$/gm, components)

            return code += '\n\n' + shims
          }
          return null
        },
      },
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

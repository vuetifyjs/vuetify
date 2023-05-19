import path from 'path'
import fs from 'fs/promises'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'

import dts from 'rollup-plugin-dts'
import alias from '@rollup/plugin-alias'
// import sourcemaps from 'rollup-plugin-sourcemaps'
import fg from 'fast-glob'
import mm from 'micromatch'
import MagicString from 'magic-string'

import importMap from '../dist/json/importMap.json' assert { type: 'json' }
import importMapLabs from '../dist/json/importMap-labs.json' assert { type: 'json' }

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

function createTypesConfig (input, output, renderChunk, filter) {
  input = 'types-temp/' + input
  let files = fg.sync(input)

  if (filter) files = filter(files)

  return files.map(file => {
    const outputFile = output.replace('*', mm.capture(input, file)[0])
    return {
      input: file,
      output: [{ file: outputFile, format: 'es', sourcemap: false }],
      plugins: [
        dts(),
        externalsPlugin(),
        alias({
          entries: [
            { find: /^@\/(.*)/, replacement: fileURLToPath(new URL('../types-temp/$1', import.meta.url)) },
          ]
        }),
        {
          async renderChunk (code) {
            code = new MagicString(code)

            if (renderChunk) await renderChunk(code)
            code.replaceAll(/import([^;])*?from 'vue-router'/gm, '// @ts-ignore\n$&')

            const map = code.generateMap({
              // source: 'source.js',
              // file: 'converted.js.map',
              includeContent: false,
            })
            return {
              code: code.toString(),
              map: null,
            }
          }
        },
        // sourcemaps(),
      ],
    }
  })
}

async function getShims () {
  const components = Object.keys(importMap.components).map(name => (
    `    ${name}: typeof import('vuetify/components')['${name}']`
  )).join('\n')
    + '\n'
    + Object.keys(importMapLabs.components).map(name => (
      `    ${name}: typeof import('vuetify/labs/components')['${name}']`
    )).join('\n')

  return (await fs.readFile(fileURLToPath(new URL('../src/shims.d.ts', import.meta.url)), { encoding: 'utf8' }))
    .replaceAll(/^\s*\/\/ @skip-build\s+.*$/gm, '')
    .replace(/^\s*\/\/ @generate-components$/gm, components)
}

export default [
  createTypesConfig('framework.d.ts', 'lib/index.d.mts', async code => {
    code.append('\n\n')
    code.append(await getShims())
  }),
  createTypesConfig('entry-bundler.d.ts', 'dist/vuetify.d.ts', async code => {
    code.replaceAll(/type index_d\$1_V(\w+) = V(\w+);/gm, 'declare const index_d$$1_V$1: typeof V$2;')
    code.append('\n\n')
    code.append((await getShims()).replace(', VNodeChild } from \'vue\'', ' } from \'vue\''))
  }),
  createTypesConfig('blueprints/*.d.ts', 'lib/blueprints/*.d.mts'),
  createTypesConfig('components/index.d.ts', 'lib/components/index.d.mts'),
  createTypesConfig('components/*/index.d.ts', 'lib/components/*/index.d.mts', undefined, files => {
    const index = readFileSync(fileURLToPath(new URL('../src/components/index.ts', import.meta.url)), { encoding: 'utf8' })
    const block = Array.from(index.matchAll(/^\/\/ export \* from '\.\/(.*)'$/gm), m => m[1])
    return files.filter(file => !block.some(name => file.includes(`/${name}/`)))
  }),
  createTypesConfig('labs/entry-bundler.d.ts', 'dist/vuetify-labs.d.ts', code => {
    code.replaceAll(/type allComponents_d_V(\w+) = V(\w+);/gm, 'declare const allComponents_d_V$1: typeof V$2;')
  }),
  createTypesConfig('labs/components.d.ts', 'lib/labs/components.d.mts'),
  createTypesConfig('labs/*/index.d.ts', 'lib/labs/*/index.d.mts'),
  createTypesConfig('labs/date/adapters/*.d.ts', 'lib/labs/date/adapters/*.d.mts'),
  createTypesConfig('directives/index.d.ts', 'lib/directives/index.d.mts'),
  createTypesConfig('locale/index.d.ts', 'lib/locale/index.d.mts'),
  createTypesConfig('locale/adapters/*.d.ts', 'lib/locale/adapters/*.d.mts'),
  createTypesConfig('iconsets/*.d.ts', 'lib/iconsets/*.d.mts'),
].flat()

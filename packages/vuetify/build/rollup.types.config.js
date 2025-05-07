import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import dts from 'rollup-plugin-dts'
import fg from 'fast-glob'
import mm from 'micromatch'
import MagicString from 'magic-string'
import { codeTransform } from './types-code-transform.js'

import importMap from '../dist/json/importMap.json' with { type: 'json' }
import importMapLabs from '../dist/json/importMap-labs.json' with { type: 'json' }

/**
 * @param input {string}
 * @param output {string}
 * @param renderChunk {import("rollup").RenderChunkHook | undefined}
 * @param filter {(files: string[]) => string[] | undefined}
 * @returns {import("rollup").RollupOptions[]}
 */
function createTypesConfig (input, output, renderChunk, filter) {
  input = 'lib/' + input
  let files = fg.sync(input)

  if (filter) files = filter(files)

  return files.map(file => {
    const outputFile = output.replace('*', mm.capture(input, file)[0])
    /** @type {import("rollup").RollupOptions} */
    const options = {
      input: file,
      output: [{ file: outputFile, format: 'es', sourcemap: false }],
      plugins: [
        dts(),
        {
          async renderChunk (code) {
            code = new MagicString(code)

            if (renderChunk) await renderChunk(code)

            codeTransform(code)

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
      ],
    }
    return options
  })
}

/**
 * @param useImport {boolean|undefined}
 * @returns {Promise<string>}
 */
async function getShims (useImport) {
  let components
  if (useImport) {
    components = Object.keys(importMap.components).map(name => (
        `    ${name}: typeof import('vuetify/components')['${name}']`
      )).join('\n')
      + '\n'
      + Object.keys(importMapLabs.components).map(name => (
        `    ${name}: typeof import('vuetify/labs/components')['${name}']`
      )).join('\n')
  } else {
    // All the components are already in scope, let's just assume rollup hasn't renamed any
    components = [...Object.keys(importMap.components), ...Object.keys(importMapLabs.components)]
      .map(name => `    ${name}: ${name}`).join('\n')
  }

  return (await fs.readFile(fileURLToPath(new URL('../src/shims.d.ts', import.meta.url)), { encoding: 'utf8' }))
    .replaceAll(/^\s*\/\/ @skip-build\s[\s\S]*?\s$/gm, '')
    .replace(/^\s*\/\/ @generate-components$/gm, components)
}

/** @type {import("rollup").RollupOptions[]} */
const options = [
  createTypesConfig('entry-bundler.d.ts', 'dist/vuetify.d.ts', async code => {
    code.replaceAll(/type index_d\$1_V(\w+) = V(\w+);/gm, 'declare const index_d$$1_V$1: typeof V$2;')
    code.append('\n\n')
    code.append((await getShims()).replace(', VNodeChild } from \'vue\'', ' } from \'vue\''))
  }),
  createTypesConfig('labs/entry-bundler.d.ts', 'dist/vuetify-labs.d.ts', async code => {
    code.replaceAll(/type allComponents_d_V(\w+) = V(\w+);/gm, 'declare const allComponents_d_V$1: typeof V$2;')
    code.append('\n\n')
    code.append((await getShims()).replace(', VNodeChild } from \'vue\'', ' } from \'vue\''))
  }),
  createTypesConfig('framework.d.ts', 'lib/framework.d.ts', async code => {
    code.append('\n\n')
    code.append(await getShims(true))
  }),
].flat()

export default options

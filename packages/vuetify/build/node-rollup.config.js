import { banner, externals, root, nodeLibDistDir } from './constants.js'
import { nodeResolve } from "@rollup/plugin-node-resolve"
import { babel } from '@rollup/plugin-babel'
import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import dts from 'rollup-plugin-dts'

const extensions = ['.ts']

export function unpluginModules() {
  return [
    unpluginModule('unplugin-vue-components-resolvers'),
    unpluginModule('unimport-presets'),
  ]
}

export function unpluginTypes() {
  return [
    unpluginDts('unplugin-vue-components-resolvers'),
    unpluginDts('unimport-presets'),
  ]
}

/**
 * @param name {'components' | 'unimport'}
 * @returns {import("rollup").RollupOptions}
 */
function unpluginModule(name) {
  const input = `src/node/${name}.ts`
  const file = `${name}/index`
  /** @type {import("rollup").RollupOptions}  */
  const config = {
    input,
    external: [
      'vuetify',
      'vuetify/directives',
      'vuetify/components',
      'vuetify/labs/components',
      'unplugin-vue-components/types',
      ...externals,
    ],
    output: [{
      file: `${file}.js`,
      format: 'esm',
      generatedCode: { constBindings: true },
      externalLiveBindings: false,
      freeze: false,
      banner,
    }],
    onwarn(warning, rollupWarn) {
      if (!warning.code || !["CIRCULAR_DEPENDENCY"].includes(warning.code)) {
        rollupWarn(warning);
      }
    },
    plugins: [
      nodeResolve({ extensions }),
      babel({
        extensions,
      }),
      {
        async buildEnd() {
          // cleanup lib/node folder
          await rm(nodeLibDistDir, { force: true, recursive: true })
        },
      },
    ],
  }
  return config
}

/**
 * @param name {'components' | 'unimport'}
 * @returns {import("rollup").RollupOptions}
 */
function unpluginDts(name) {
  const dir = `${root}/${name}`
  /** @type {import("rollup").RollupOptions}  */
  const config = {
    input: `src/node/${name}.ts`,
    external: [
      'vuetify',
      'vuetify/directives',
      'vuetify/components',
      'vuetify/labs/components',
      'unplugin-vue-components/types',
      ...externals,
    ],
    output: [{
      dir,
      entryFileNames: 'index.d.ts',
      format: 'esm',
      banner,
    }],
    plugins: [
      dts({
        dir: `${root}/${name}`,
        respectExternal: true,
        tsconfig: resolve(root, 'tsconfig.node-dist.json'),
      }),
    ],
  }
  return config
}

import { banner, externals, root, unpluginLibDistDir } from './constants.mjs'
import { nodeResolve } from "@rollup/plugin-node-resolve"
import { babel } from '@rollup/plugin-babel'
import { rm } from 'fs/promises'
import dts from 'rollup-plugin-dts'

const extensions = ['.ts']

export function unpluginModules() {
  return [
    unpluginModule('components'),
    unpluginModule('unimport'),
  ]
}

export function unpluginTypes() {
  return [
    unpluginDts('components'),
    unpluginDts('unimport'),
  ]
}

/**
 * @param name {'components' | 'unimport'}
 * @returns {import("rollup").RollupOptions}
 */
function unpluginModule(name) {
  const input = `src/unplugin/${name}.ts`
  const file = `${name === 'components' ? 'unplugin-vue-components' : name}/index`
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
      file: `${file}.mjs`,
      format: 'esm',
      generatedCode: { constBindings: true },
      externalLiveBindings: false,
      freeze: false,
      banner,
    }, {
      file: `${file}.cjs`,
      format: 'cjs',
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
          // cleanup lib/unplugin
          await rm(unpluginLibDistDir, { force: true, recursive: true })
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
  const dir = `${root}/${name === 'components' ? 'unplugin-vue-components' : 'unimport'}`
  /** @type {import("rollup").RollupOptions}  */
  const config = {
    input: `src/unplugin/${name}.ts`,
    external: ['vuetify', 'unplugin-vue-components/types', ...externals],
    output: [{
      dir,
      entryFileNames: 'index.d.mts',
      format: 'esm',
      banner,
    }, {
      dir,
      entryFileNames: 'index.d.ts',
      format: 'esm',
      banner,
    }, {
      dir,
      entryFileNames: 'index.d.cts',
      format: 'cjs',
      banner,
    }],
    plugins: [
      dts({
        dir: `${root}/${name === 'components' ? 'unplugin-vue-components' : 'unimport'}`,
        respectExternal: true,
        compilerOptions: {
          rootDir: root,
        },
      }),
    ],
  }
  return config
}

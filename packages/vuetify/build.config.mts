import { defineBuildConfig } from 'unbuild'
import { version, devDependencies } from './package.json'
import path from 'upath'
import { fileURLToPath } from 'url'
import { readFile, rm, writeFile } from 'node:fs/promises'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '..')

const externals = Array.from(Object.keys(devDependencies))

const banner = `/*!
* Vuetify v${version}
* Forged by John Leider
* Released under the MIT License.
*/\n`

export default defineBuildConfig([{
  rootDir,
  entries: [{
    input: `${rootDir}/src/unplugin/components.ts`,
    name: 'index',
    declaration: true,
    outDir: 'unplugin-vue-components',
    cleanDist: true,
  }],
  outDir: 'unplugin-vue-components',
  declaration: true,
  failOnWarn: false,
  externals: [
    'vuetify',
    'unplugin-vue-components/types',
    ...externals,
  ],
  hooks: {
    'rollup:done': async (ctx, build) => {
      // cleanup lib/unplugin
      await rm(path.resolve(rootDir, 'lib/unplugin'), { force: true, recursive: true })

      // add banner to dts files
      await Promise.all(['unplugin-vue-components'].map((dir) => {
        return ['', 'c', 'm'].map(d => `${rootDir}/${dir}/index.d.${d}ts`)
      }).map(async (dtsFiles) => {
        return dtsFiles.flat().map(async (dts) => {
          const content = await readFile(dts, 'utf-8')
          await writeFile(dts, `${banner}${content}`, 'utf-8')
        })
      }))
    }
  },
  rollup: {
    rootDir,
    emitCJS: true,
    output: { banner },
    dts: {
      compilerOptions: { rootDir },
      respectExternal: true,
    },
  },
}, {
  rootDir,
  entries: [{
    input: `${rootDir}/src/unplugin/unimport.ts`,
    name: 'index',
    declaration: true,
    outDir: 'unimport',
    cleanDist: true,
  }],
  outDir: 'unimport',
  declaration: true,
  failOnWarn: false,
  externals: ['vuetify', ...externals],
  hooks: {
    'rollup:done': async () => {
      // add banner to dts files
      await Promise.all(['unimport'].map((dir) => {
        return ['', 'c', 'm'].map(d => `${rootDir}/${dir}/index.d.${d}ts`)
      }).map(async (dtsFiles) => {
        return dtsFiles.flat().map(async (dts) => {
          const content = await readFile(dts, 'utf-8')
          await writeFile(dts, `${banner}${content}`, 'utf-8')
        })
      }))
    }
  },
  rollup: {
    rootDir,
    emitCJS: true,
    output: { banner },
    dts: {
      compilerOptions: { rootDir },
      respectExternal: true,
    },
  },
}])

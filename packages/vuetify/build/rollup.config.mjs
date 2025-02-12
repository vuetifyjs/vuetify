import path from 'upath'
import { mkdirp } from 'mkdirp'
import { writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'

import packageJson from '../package.json' with { type: 'json' }

import alias from '@rollup/plugin-alias'
import sass from 'rollup-plugin-sass'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postcss from 'postcss'
import { simple as walk } from 'acorn-walk'

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs']
const banner = `/*!
* Vuetify v${packageJson.version}
* Forged by John Leider
* Released under the MIT License.
*/\n`

const root = path.resolve(fileURLToPath(import.meta.url), '../..')
const srcDir = path.resolve(root, 'src')
const libDir = path.resolve(root, 'lib')
const labsDir = path.resolve(srcDir, 'labs')

export default [
  {
    input: 'src/entry-bundler.ts',
    output: [
      {
        file: 'dist/vuetify.esm.js',
        format: 'es',
        sourcemap: true,
        banner,
      },
      {
        file: 'dist/vuetify.js',
        name: 'Vuetify',
        format: 'umd',
        globals: { vue: 'Vue' },
        sourcemap: true,
        banner,
      },
      {
        file: 'dist/vuetify.min.js',
        name: 'Vuetify',
        format: 'umd',
        globals: { vue: 'Vue' },
        plugins: [terser({
          format: { comments: /^!/, ecma: 2015, semicolons: false },
        })],
        sourcemap: true,
        banner,
      },
    ],
    external: ['vue'],
    plugins: [
      nodeResolve({ extensions }),
      babel({
        extensions,
        babelHelpers: 'inline',
      }),
      sass({
        options: {
          charset: false,
          silenceDeprecations: ['legacy-js-api'],
        },
        output (styles, styleNodes) {
          // Complete CSS bundle
          mkdirp(path.resolve(root, 'dist')).then(() => {
            return Promise.all([
              postcss([autoprefixer]).process(styles, { from: 'src' }),
              postcss([autoprefixer, cssnano({
                preset: 'default',
                postcssZindex: false,
                reduceIdents: false,
              })]).process(styles, { from: 'src' }),
            ])
          }).then(result => {
            writeFile(path.resolve(root, 'dist/vuetify.css'), banner + result[0].css, 'utf8')
            writeFile(path.resolve(root, 'dist/vuetify.min.css'), banner + result[1].css, 'utf8')
          })

          // Individual CSS files
          for (const {id, content} of styleNodes) {
            const relativePath = path.relative(srcDir, id)
            const out = path.parse(path.join(libDir, relativePath))
            mkdirp(out.dir).then(() => {
              writeFile(path.join(out.dir, out.name + '.css'), content, 'utf8')
            })
          }
        },
      }),
      alias({
        entries: [
          { find: /^@\/(.*)/, replacement: fileURLToPath(new URL('../src/$1', import.meta.url)) },
        ],
      }),
      {
        async buildEnd () {
          const components = Object.create(null)
          const directives = []
          const variables = []

          { // Components
            const { importedIds } = this.getModuleInfo(
              (await this.resolve('src/components/index.ts')).id
            )
            await Promise.all(importedIds.map(async id => {
              const importFrom = path.relative(srcDir, id).replace(/\.ts$/, '.mjs')

              if (await this.resolve(path.join(id, '../_variables.scss')) != null) {
                variables.push(id)
              }

              const { ast } = this.getModuleInfo(id)
              walk(ast, {
                ExportNamedDeclaration (node) {
                  node.specifiers.forEach(node => {
                    components[node.exported.name] = importFrom
                  })
                  node.declaration?.declarations.forEach(node => {
                    components[node.id.name] = importFrom
                  })
                },
              })
            }))
          }

          { // Directives
            const { ast, importedIds } = this.getModuleInfo(
              (await this.resolve('src/directives/index.ts')).id
            )
            await Promise.all(importedIds.map(async id => {
              if (await this.resolve(path.join(id, '../_variables.scss')) != null) {
                variables.push(id)
              }
            }))
            walk(ast, {
              ExportNamedDeclaration (node) {
                node.specifiers.forEach(node => {
                  directives.push(node.exported.name)
                })
              },
            })
          }

          this.emitFile({
            type: 'asset',
            fileName: 'json/importMap.json',
            source: JSON.stringify({
              components: Object.fromEntries(Object.entries(components).map(entry => [entry[0], {
                from: entry[1],
                styles: [], // TODO
              }])),
              directives,
            }, null, 2),
          })

          this.emitFile({
            type: 'asset',
            fileName: '_component-variables.sass',
            source: variables.map(id => {
              return `@forward '` + path.join(
                '../lib',
                path.relative(srcDir, id),
                '../_variables.scss'
              ) + `'`
            }).sort().join('\n'),
          })
        },
      },
    ],
  },
  {
    input: 'src/labs/entry-bundler.ts',
    output: [
      {
        file: 'dist/vuetify-labs.js',
        name: 'Vuetify',
        format: 'umd',
        globals: { vue: 'Vue' },
        banner,
      },
      {
        file: 'dist/vuetify-labs.esm.js',
        format: 'es',
        sourcemap: true,
        banner,
      },
    ],
    external: ['vue'],
    plugins: [
      nodeResolve({ extensions }),
      babel({
        extensions,
        babelHelpers: 'inline',
      }),
      sass({
        options: {
          charset: false,
          silenceDeprecations: ['legacy-js-api'],
        },
        output (styles, styleNodes) {
          mkdirp(path.resolve(root, 'dist')).then(() => {
            return Promise.all([
              postcss([autoprefixer]).process(styles, { from: 'src' }),
              postcss([autoprefixer, cssnano({
                preset: 'default',
                postcssZindex: false,
                reduceIdents: false,
              })]).process(styles, { from: 'src' }),
            ])
          }).then(result => {
            writeFile(path.resolve(root, 'dist/vuetify-labs.css'), banner + result[0].css, 'utf8')
            writeFile(path.resolve(root, 'dist/vuetify-labs.min.css'), banner + result[1].css, 'utf8')
          })

          // Individual CSS files
          styleNodes = styleNodes.filter(node => path.normalize(node.id).startsWith(labsDir));
          for (const { id, content } of styleNodes) {
            const relativePath = path.relative(srcDir, id)
            const out = path.parse(path.join(libDir, relativePath))
            mkdirp(out.dir).then(() => {
              writeFile(path.join(out.dir, out.name + '.css'), content, 'utf8')
            })
          }
        },
      }),
      alias({
        entries: [
          { find: /^@\/(.*)/, replacement: fileURLToPath(new URL('../src/$1', import.meta.url)) },
        ],
      }),
      {
        async buildEnd () {
          const components = Object.create(null)
          const variables = []

          { // Components
            const { importedIds } = this.getModuleInfo(
              (await this.resolve('src/labs/components.ts')).id
            )
            await Promise.all(importedIds.map(async id => {
              const importFrom = path.relative(srcDir, id).replace(/\.ts$/, '.mjs')

              if (await this.resolve(path.join(id, '../_variables.scss')) != null) {
                variables.push(id)
              }

              const { ast } = this.getModuleInfo(id)
              walk(ast, {
                ExportNamedDeclaration (node) {
                  node.specifiers.forEach(node => {
                    components[node.exported.name] = importFrom
                  })
                  node.declaration?.declarations.forEach(node => {
                    components[node.id.name] = importFrom
                  })
                },
              })
            }))
          }

          this.emitFile({
            type: 'asset',
            fileName: 'json/importMap-labs.json',
            source: JSON.stringify({
              components: Object.fromEntries(Object.entries(components).map(entry => [entry[0], {
                from: entry[1],
                styles: [], // TODO
              }])),
            }, null, 2),
          })

          this.emitFile({
            type: 'asset',
            fileName: '_component-variables-labs.sass',
            source: variables.map(id => {
              return `@forward '` + path.join(
                '../lib',
                path.relative(srcDir, id),
                '../_variables.scss'
              ) + `'`
            }).sort().join('\n'),
          })
        }
      }
    ],
  },
]

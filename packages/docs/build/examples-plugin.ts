import type { Plugin } from 'vite'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const ID = '@vuetify-examples'

export function Examples (): Plugin {
  return {
    name: 'vuetify:examples',
    resolveId (source) {
      if (!source.startsWith('virtual:examples')) return

      const dir = source.split('/')[1]

      return dir ? `${ID}/${dir}` : ID
    },
    async load (id) {
      if (!id.startsWith(ID)) return

      const examplesDir = fileURLToPath(new URL('../src/examples', import.meta.url))

      if (id === ID) {
        const dirs = (await fs.readdir(examplesDir, { encoding: 'utf8' }))
          .map(dir => {
            return `'${dir}': () => import('virtual:examples/${dir}')`
          }).join(',\n')
        const code = `
const dirs = {
${dirs}
}

export async function getExample (name) {
  const [dir, file] = name.split('/')
  return (await dirs[dir]()).default[file]
}
      `

        return { code }
      } else {
        const dir = id.split('/')[1]
        const { imports, files } = (await fs.readdir(path.join(examplesDir, dir), 'utf8'))
          .reduce<{ imports: string[], files: string[] }>((acc, file, i) => {
            acc.imports.push(`import __${i} from '/src/examples/${dir}/${file}'`)
            acc.imports.push(`import __${i}_raw from '/src/examples/${dir}/${file}?raw'`)
            acc.files.push(`  '${file.split('.vue')[0]}': {
    component: __${i},
    source: __${i}_raw,
  }`)
            return acc
          }, { imports: [], files: [] })

        const code = `${imports.join('\n')}

export default {
${files.join(',\n')}
}
`

        return { code }
      }
    },
  }
}

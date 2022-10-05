import fs from 'fs/promises'
import path from 'path'
import { components } from 'vuetify'
import { components as componentsInfo } from 'vuetify/dist/json/importMap.json'
import { kebabCase } from './helpers/text'
import { generateComposableDataFromTypes, generateDirectiveDataFromTypes } from './types'
import Piscina from 'piscina'
import { addDescriptions, stringifyProps } from './utils'
import * as os from 'os'
import mkdirp from 'mkdirp'

const run = async () => {
  const locales = ['en']

  // Components
  const pool = new Piscina({
    filename: './src/worker.js',
    niceIncrement: 10,
    maxThreads: Math.max(1, Math.floor(Math.min(os.cpus().length / 2, os.freemem() / (1.1 * 1024 ** 3)))),
  })

  const template = await fs.readFile('./src/template.d.ts', 'utf-8')

  await mkdirp('./src/tmp')
  for (const name in componentsInfo) {
    await fs.writeFile(`./src/tmp/${name}.d.ts`,
      template.replaceAll('__component__', name)
        .replaceAll('__name__', componentsInfo[name].from.replace('.mjs', '.ts'))
    )
  }

  const outPath = '../docs/src/api/data/'

  await Promise.all(
    Object.entries(components).map(([componentName, componentInstance]) => pool.run(
      JSON.stringify({
        componentName,
        componentProps: stringifyProps(componentInstance.props),
        locales,
        outPath,
      })
    ))
  )

  // Composables
  const composables = generateComposableDataFromTypes()

  for (const composable of composables) {
    const kebabName = kebabCase(composable.name)
    const source = kebabName.split('-')[1]
    addDescriptions(composable.name, composable.data, [source], locales)

    await fs.writeFile(path.resolve(outPath, `${kebabName}.json`), JSON.stringify(composable.data, null, 2))
  }

  // Directives
  const directives = generateDirectiveDataFromTypes()

  for (const directive of directives) {
    const kebabName = kebabCase(directive.name)
    addDescriptions(directive.name, directive.data, [kebabName], locales)

    await fs.writeFile(path.resolve(outPath, `${kebabName}.json`), JSON.stringify(directive.data, null, 2))
  }
}

run()

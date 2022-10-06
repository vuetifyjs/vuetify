import fs from 'fs/promises'
import path from 'path'
import { components } from 'vuetify'
import { kebabCase } from './helpers/text'
import { generateComposableDataFromTypes, generateDirectiveDataFromTypes } from './types'
import Piscina from 'piscina'
import { addDescriptions, stringifyProps } from './utils'
import * as os from 'os'
import mkdirp from 'mkdirp'
import { createVeturApi } from './vetur'
import rimraf from 'rimraf'
import { createWebTypesApi } from './web-types'

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
  for (const component in components) {
    await fs.writeFile(`./src/tmp/${component}.d.ts`, template.replaceAll('__component__', component))
  }

  const outPath = '../docs/src/api/data/'

  const componentData = await Promise.all(
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

  console.log(JSON.stringify(composables, null, 2))

  for (const composable of composables) {
    const kebabName = kebabCase(composable.name)
    const source = kebabName.split('-')[1]
    addDescriptions(composable.name, composable.data, [source], locales)

    await fs.writeFile(path.resolve(outPath, `${kebabName}.json`), JSON.stringify(composable.data, null, 2))
  }

  // Directives
  const directives = generateDirectiveDataFromTypes().map(directive => {
    const kebabName = kebabCase(directive.name)
    addDescriptions(directive.name, directive.data, [kebabName], locales)

    return { kebabName, ...directive }
  })

  for (const directive of directives) {
    await fs.writeFile(path.resolve(outPath, `${directive.kebabName}.json`), JSON.stringify(directive.data, null, 2))
  }

  rimraf.sync(path.resolve('./dist'))
  createVeturApi(componentData)
  createWebTypesApi(componentData, directives)
}

run()

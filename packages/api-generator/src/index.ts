import fs from 'fs/promises'
import path from 'upath'
import { components } from 'vuetify/dist/vuetify-labs.js'
import importMap from 'vuetify/dist/json/importMap.json' assert { type: 'json' }
import importMapLabs from 'vuetify/dist/json/importMap-labs.json' assert { type: 'json' }
import { kebabCase } from './helpers/text'
import type { BaseData, ComponentData, DirectiveData } from './types'
import { generateComposableDataFromTypes, generateDirectiveDataFromTypes } from './types'
import Piscina from 'piscina'
import { addDescriptions, addDirectiveDescriptions, addPropData, stringifyProps } from './utils'
import * as os from 'os'
import { mkdirp } from 'mkdirp'
import { createVeturApi } from './vetur'
import { rimraf } from 'rimraf'
import { createWebTypesApi } from './web-types'
import inspector from 'inspector'
import yargs from 'yargs'
import { parseSassVariables } from './helpers/sass'

const yar = yargs(process.argv.slice(2))
  .option('components', {
    type: 'array',
  })
  .option('skip-directives', {
    type: 'boolean',
  })
  .option('skip-composables', {
    type: 'boolean',
  })

const reset = '\x1b[0m'
const red = '\x1b[31m'
const blue = '\x1b[34m'

const componentsInfo: Record<string, { from: string }> = {
  ...importMap.components,
  ...importMapLabs.components,
}

type Truthy<T> = Exclude<T, null | undefined | 0 | '' | false>;
const BooleanFilter = <T>(x: T): x is Truthy<T> => Boolean(x)

const run = async () => {
  const argv = await yar.argv

  const locales = await fs.readdir('./src/locale', 'utf-8')

  // Components
  const pool = new Piscina({
    filename: path.resolve('./src/worker.ts'),
    niceIncrement: 10,
    maxThreads: inspector.url() ? 1 : Math.max(1, Math.floor(Math.min(os.cpus().length / 2, os.freemem() / (1.1 * 1024 ** 3)))),
  })

  const template = await fs.readFile('./templates/component.d.ts', 'utf-8')

  await rimraf(path.resolve('./dist'))
  await fs.mkdir(path.resolve('./dist'))
  await mkdirp('./templates/tmp')
  for (const component in components) {
    // await fs.writeFile(`./templates/tmp/${component}.d.ts`, template.replaceAll('__component__', component))
    await fs.writeFile(`./templates/tmp/${component}.d.ts`,
      template.replaceAll('__component__', component)
        .replaceAll('__name__', componentsInfo[component].from.replace('.mjs', '.js'))
    )
  }

  const outPath = path.resolve('./dist/api')
  await mkdirp(outPath)

  const componentData = (await Promise.all(
    Object.entries(components).map(async ([componentName, componentInstance]) => {
      if (argv.components && !argv.components.includes(componentName)) return null

      const data = await pool.run(componentName)
      const componentProps = stringifyProps(componentInstance.props)
      const sources = addPropData(componentName, data, componentProps)
      await addDescriptions(componentName, data, locales, sources)
      const sass = parseSassVariables(componentName)

      const component = {
        displayName: componentName,
        fileName: componentName,
        pathName: kebabCase(componentName),
        ...data,
        sass,
      } satisfies ComponentData
      await fs.writeFile(path.resolve(outPath, `${component.fileName}.json`), JSON.stringify(component, null, 2))

      return component
    })
  )).filter(BooleanFilter)

  // Composables
  if (!argv.skipComposables) {
    const composables = await Promise.all((await generateComposableDataFromTypes()).map(async composable => {
      console.log(blue, composable.displayName, reset)
      await addDescriptions(composable.fileName, composable, locales)
      return composable
    }))

    for (const composable of composables) {
      await fs.writeFile(
        path.resolve(outPath, `${composable.fileName}.json`),
        JSON.stringify(composable, null, 2)
      )
    }
  }

  // Directives
  let directives: DirectiveData[] = []
  if (!argv.skipDirectives) {
    directives = await Promise.all((await generateDirectiveDataFromTypes()).map(async data => {
      console.log(blue, data.fileName, reset)
      await addDirectiveDescriptions(data.fileName, data, locales)

      return data
    }))

    for (const directive of directives) {
      await fs.writeFile(
        path.resolve(outPath, `${directive.fileName}.json`),
        JSON.stringify(directive, null, 2)
      )
    }
  }

  createVeturApi(componentData)
  createWebTypesApi(componentData, directives)
  await fs.mkdir(path.resolve('../vuetify/dist/json'), { recursive: true })
  await fs.copyFile(path.resolve('./dist/tags.json'), path.resolve('../vuetify/dist/json/tags.json'))
  await fs.copyFile(path.resolve('./dist/attributes.json'), path.resolve('../vuetify/dist/json/attributes.json'))
  await fs.copyFile(path.resolve('./dist/web-types.json'), path.resolve('../vuetify/dist/json/web-types.json'))
  rimraf.sync(path.resolve('./templates/tmp'))
}

run()

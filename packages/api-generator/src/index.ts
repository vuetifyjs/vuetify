import fs from 'fs/promises'
import path from 'upath'
import { components } from 'vuetify/dist/vuetify-labs.js'
import importMap from 'vuetify/dist/json/importMap.json' assert { type: 'json' }
import importMapLabs from 'vuetify/dist/json/importMap-labs.json' assert { type: 'json' }
import { kebabCase } from './helpers/text'
import { generateComposableDataFromTypes, generateDirectiveDataFromTypes } from './types'
import Piscina from 'piscina'
import { addDescriptions, addDirectiveDescriptions, stringifyProps } from './utils'
import * as os from 'os'
import mkdirp from 'mkdirp'
import { createVeturApi } from './vetur'
import rimraf from 'rimraf'
import { createWebTypesApi } from './web-types'
import inspector from 'inspector'
import yargs from 'yargs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

type TranslationData = {
  [type in 'props' | 'events' | 'slots' | 'exposed']?: {
    [name in string]?: string
  }
}

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
  .option('missing-descriptions', {
    type: 'boolean',
  })

const componentsInfo = {
  ...importMap.components,
  ...importMapLabs.components,
}

const run = async () => {
  const argv = await yar.argv
  const locales = ['en']

  // Components
  const pool = new Piscina({
    filename: './lib/worker.mjs',
    niceIncrement: 10,
    maxThreads: inspector.url() ? 1 : Math.max(1, Math.floor(Math.min(os.cpus().length / 2, os.freemem() / (1.1 * 1024 ** 3)))),
  })

  const template = await fs.readFile('./templates/component.d.ts', 'utf-8')

  await mkdirp('./templates/tmp')
  for (const component in components) {
    // await fs.writeFile(`./templates/tmp/${component}.d.ts`, template.replaceAll('__component__', component))
    await fs.writeFile(`./templates/tmp/${component}.d.ts`,
      template.replaceAll('__component__', component)
        .replaceAll('__name__', componentsInfo[component].from.replace('.mjs', '.js'))
    )
  }

  const outPath = fileURLToPath(new URL('../../docs/src/api/data/', import.meta.url))

  const componentData = await Promise.all(
    Object.entries(components).map(([componentName, componentInstance]) => {
      if (argv.components && !argv.components.includes(componentName)) return null

      return pool.run(
        JSON.stringify({
          componentName,
          componentProps: stringifyProps(componentInstance.props),
          locales,
          outPath,
        })
      )
    }).filter(Boolean)
  )

  // Missing descriptions
  if (argv.missingDescriptions) {
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim()
    const translations: { [filename in string]?: TranslationData } = {}

    async function readData (filename: string): Promise<TranslationData> {
      if (!(filename in translations)) {
        try {
          const data = JSON.parse(await fs.readFile(filename, 'utf-8'))

          for (const type of ['props', 'events', 'slots', 'exposed']) {
            for (const item in data[type] ?? {}) {
              if (data[type][item].startsWith('MISSING DESCRIPTION')) {
                delete data[type][item]
              }
            }
          }

          translations[filename] = data
        } catch (e) {
          translations[filename] = {}
        }
      }

      return translations[filename]
    }

    for (const component of componentData) {
      for (const type of ['props', 'events', 'slots', 'exposed']) {
        for (const name in component[type]) {
          if (type === 'props' && !component[type][name].source) {
            console.warn(`Missing source for ${component.kebabName} ${type}: ${name}`)
          }

          const filename = type === 'props'
            ? kebabCase(component[type][name].source ?? component.componentName)
            : component.kebabName

          for (const locale of locales) {
            const sourceData = await readData(`./src/locale/${locale}/${filename}.json`)
            const githubUrl = `https://github.com/vuetifyjs/vuetify/tree/${currentBranch}/packages/api-generator/src/locale/${locale}/${filename}.json`

            sourceData[type] ??= {}
            sourceData[type][name] ??= `MISSING DESCRIPTION ([edit in github](${githubUrl}))`
          }
        }
      }
    }

    for (const filename in translations) {
      try {
        await fs.writeFile(filename, JSON.stringify(translations[filename], null, 2) + '\n')
      } catch (e: unknown) {
        console.error(filename, e)
      }
    }

    process.exit()
  }

  // Composables
  if (!argv.skipComposables) {
    const composables = await Promise.all(generateComposableDataFromTypes().map(async composable => {
      const kebabName = kebabCase(composable.name)
      await addDescriptions(composable.name, composable.data, [kebabName], locales)
      return { fileName: kebabName, displayName: composable.name, ...composable }
    }))

    for (const { displayName, fileName, data } of composables) {
      await fs.writeFile(path.resolve(outPath, `${fileName}.json`), JSON.stringify({ displayName, fileName, ...data }, null, 2))
    }
  }

  // Directives
  let directives: any[] = []
  if (!argv.skipDirectives) {
    directives = await Promise.all(generateDirectiveDataFromTypes().map(async directive => {
      const kebabName = kebabCase(directive.name)
      await addDirectiveDescriptions(directive.name, directive, [kebabName], locales)

      return { fileName: kebabName, displayName: `v-${kebabName}`, ...directive }
    }))

    for (const { displayName, fileName, ...directive } of directives) {
      await fs.writeFile(path.resolve(outPath, `${fileName}.json`), JSON.stringify({ displayName, fileName, ...directive }, null, 2))
    }
  }

  rimraf.sync(path.resolve('./dist'))
  await fs.mkdir(path.resolve('./dist'))
  createVeturApi(componentData)
  createWebTypesApi(componentData, directives)
  await fs.mkdir(path.resolve('../vuetify/dist/json'), { recursive: true })
  await fs.copyFile(path.resolve('./dist/tags.json'), path.resolve('../vuetify/dist/json/tags.json'))
  await fs.copyFile(path.resolve('./dist/attributes.json'), path.resolve('../vuetify/dist/json/attributes.json'))
  await fs.copyFile(path.resolve('./dist/web-types.json'), path.resolve('../vuetify/dist/json/web-types.json'))
  rimraf.sync(path.resolve('./templates/tmp'))
}

run()

import fs from 'fs/promises'
import path from 'path'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { kebabCase } from './helpers/text'
import { generateComposableDataFromTypes, generateDirectiveDataFromTypes } from './types'
import Piscina from 'piscina'
import { addDescriptions } from './utils'

const run = async () => {
  const app = createApp({})
  const vuetify = createVuetify()

  app.use(vuetify)

  const components = app._context.components
  const locales = ['en']

  // Components
  const pool = new Piscina({
    filename: './src/worker.js',
  })

  await Promise.all(Object.entries(components).map(([componentName, componentInstance]) => pool.run(JSON.stringify({
    componentName,
    componentProps: (componentInstance as any).props,
    locales,
  }))))

  // Composables
  const composables = await generateComposableDataFromTypes()

  for (const composable of composables) {
    const kebabName = kebabCase(composable.name)
    const source = kebabName.split('-')[1]
    addDescriptions(composable.name, composable.data, [source], locales)

    await fs.writeFile(path.resolve(`../docs/src/api/data/${kebabName}.json`), JSON.stringify(composable.data, null, 2))
  }

  // Directives
  const directives = await generateDirectiveDataFromTypes()

  for (const directive of directives) {
    const kebabName = kebabCase(directive.name)
    addDescriptions(directive.name, directive.data, [kebabName], locales)

    await fs.writeFile(path.resolve(`../docs/src/api/data/${kebabName}.json`), JSON.stringify(directive.data, null, 2))
  }
}

run()

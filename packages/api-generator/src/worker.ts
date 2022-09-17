import fs from 'fs/promises'
import path from 'path'
import { kebabCase } from './helpers/text'
import { generateComponentDataFromTypes } from './types'
import { addDescriptions, addPropData } from './utils'

export default async (json: string) => {
  try {
    const { componentName, componentProps, locales } = JSON.parse(json)

    console.log(componentName)

    const kebabName = kebabCase(componentName)
    const componentData = await generateComponentDataFromTypes(componentName)

    const sources = addPropData(kebabName, componentData as any, componentProps)

    addDescriptions(kebabName, componentData as any, sources, locales)

    const folder = '../docs/src/api/data/'

    try {
      await fs.stat(path.resolve(folder))
    } catch (err) {
      await fs.mkdir(path.resolve(folder), { recursive: true })
    }

    await fs.writeFile(path.resolve(`../docs/src/api/data/${kebabName}.json`), JSON.stringify(componentData, null, 2))
  } catch (err) {
    console.error(err)
  }
}

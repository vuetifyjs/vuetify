import fs from 'fs/promises'
import path from 'path'
import { kebabCase } from './helpers/text'
import { generateComponentDataFromTypes } from './types'
import { addDescriptions, addPropData } from './utils'
import mkdirp from 'mkdirp'
import { parseSassVariables } from './helpers/sass'

export default async (json: string) => {
  const { componentName, componentProps, locales, outPath } = JSON.parse(json)

  console.log(componentName)

  try {
    const componentData = await generateComponentDataFromTypes(componentName)

    const sources = addPropData(componentName, componentData as any, componentProps)

    await addDescriptions(componentName, componentData as any, locales, sources)

    const sass = parseSassVariables(componentName)

    await mkdirp(outPath)

    const component = { displayName: componentName, fileName: kebabCase(componentName), ...componentData, sass }

    await fs.writeFile(path.resolve(outPath, `${componentName}.json`), JSON.stringify(component, null, 2))

    return component
  } catch (err) {
    console.error(`${componentName}: ${err}`, err.stack)
    return null
  }
}

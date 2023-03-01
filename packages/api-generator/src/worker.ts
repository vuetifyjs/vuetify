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
    const kebabName = kebabCase(componentName)
    const componentData = await generateComponentDataFromTypes(componentName)

    const sources = addPropData(kebabName, componentData as any, componentProps)

    await addDescriptions(kebabName, componentData as any, sources, locales)

    const sass = parseSassVariables(componentName)

    await mkdirp(outPath)

    const component = { displayName: kebabName, fileName: kebabName, ...componentData, sass }

    await fs.writeFile(path.resolve(outPath, `${component.fileName}.json`), JSON.stringify(component, null, 2))

    return component
  } catch (err) {
    console.error(`${componentName}: ${err}`, err.stack)
    return null
  }
}

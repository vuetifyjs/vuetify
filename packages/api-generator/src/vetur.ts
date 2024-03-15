import fs from 'fs'
import { kebabCase } from './helpers/text'
import type { ComponentData } from './types'

export function createVeturApi (componentData: ComponentData[]) {
  const tags = componentData.reduce((obj, component) => {
    return {
      ...obj,
      [component.fileName]: {
        attributes: Object.keys(component.props ?? {}).map(name => kebabCase(name)).sort(),
        description: '',
      },
    }
  }, {})

  const attributes = componentData.reduce((obj, component) => {
    const attrs = Object.entries(component.props ?? {}).reduce((curr, [name, prop]) => {
      curr[`${component.fileName}/${kebabCase(name)}`] = {
        type: prop.formatted,
        description: prop.description!.en || '',
      }

      return curr
    }, {} as Record<string, { type: string, description: string }>)
    Object.assign(obj, attrs)
    return obj
  }, {})

  fs.writeFileSync('dist/tags.json', JSON.stringify(tags, null, 2))
  fs.writeFileSync('dist/attributes.json', JSON.stringify(attributes, null, 2))
}

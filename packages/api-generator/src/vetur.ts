import fs from 'fs'
import { kebabCase } from './helpers/text'
import type { Definition } from './types'

type ComponentData = {
  props: Record<string, Definition>
  slots: Record<string, Definition>
  events: Record<string, Definition>
  exposed: Record<string, Definition>
  displayName: string
  fileName: string
}

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
        description: prop.description.en || '',
      }

      return curr
    }, {})

    return { ...obj, ...attrs }
  }, {})

  fs.writeFileSync('dist/tags.json', JSON.stringify(tags, null, 2))
  fs.writeFileSync('dist/attributes.json', JSON.stringify(attributes, null, 2))
}

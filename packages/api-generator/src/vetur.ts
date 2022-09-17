import type { Definition } from './types'

export function createVeturApi (componentDefinitions: Definition) {
  console.log(componentDefinitions)
  // const components = getComponentsApi(['en'])

  // const tags = components.reduce((obj, component) => {
  //   return {
  //     ...obj,
  //     [component.name]: {
  //       attributes: component.props.map(p => kebabCase(p.name)).sort(),
  //       description: '',
  //     },
  //   }
  // }, {})

  // const attributes = components.reduce((obj, component) => {
  //   const attrs = component.props.reduce((a, prop) => {
  //     let type = prop.type || ''

  //     if (!type) type = ''
  //     else if (Array.isArray(type)) type = type.map(t => t.toLowerCase()).join('|')
  //     else type = type.toLowerCase()

  //     a[`${component.name}/${kebabCase(prop.name)}`] = {
  //       type,
  //       description: prop.description.en || '',
  //     }

  //     return a
  //   }, {})

  //   return { ...obj, ...attrs }
  // }, {})

  // writeJsonFile(tags, 'dist/tags.json')
  // writeJsonFile(attributes, 'dist/attributes.json')
}

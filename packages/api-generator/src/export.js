const rimraf = require('rimraf')
const { resolve } = require('path')
const { writeJsonFile } = require('./helpers/write')
const { hyphenate, pascalize, capitalize } = require('./helpers/text')
const { getComponentsApi, getDirectivesApi } = require('./index')
const pkg = require('../package.json')

// Are fakeComponents still needed? Does webstorm not use webtypes now?

// const fakeComponents = (components, ts) => {
//   const imports = [
//     `import Vue from 'vue'`,
//   ]
//   if (ts) imports.push(`import { PropValidator } from 'vue/types/options'`)
//   const inspection = ts ? '' : `// noinspection JSUnresolvedFunction\n`

//   return `${imports.join('\n')}\n\n` + Object.keys(components).map(component => {
//     const propType = type => {
//       if (type === 'any' || typeof type === 'undefined') return ts ? 'null as any as PropValidator<any>' : 'null'
//       if (Array.isArray(type)) return `[${type.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(',')}]`
//       return type.charAt(0).toUpperCase() + type.slice(1)
//     }
//     const quoteProp = name => name.match(/-/) ? `'${name}'` : name
//     const componentProps = components[component].props
//     componentProps.sort((a, b) => {
//       if (a.name < b.name) return -1
//       return a.name === b.name ? 0 : 1
//     })
//     let props = componentProps.map(prop => `    ${quoteProp(prop.name)}: ${propType(prop.type)}`).join(',\n')
//     if (props) props = `\n  props: {\n${props}\n  }\n`
//     return `${inspection}Vue.component('${component}', {${props}})`
//   }).join('\n')
// }

// writePlainFile(fakeComponents(false), 'dist/fakeComponents.js')
// writePlainFile(fakeComponents(true), 'dist/fakeComponents.ts')

const createVeturApi = () => {
  const components = getComponentsApi(['en'])

  const tags = components.reduce((obj, component) => {
    return {
      ...obj,
      [component.name]: {
        attributes: component.props.map(p => hyphenate(p.name)).sort(),
        description: '',
      },
    }
  }, {})

  const attributes = components.reduce((obj, component) => {
    const attrs = component.props.reduce((a, prop) => {
      let type = prop.type || ''

      if (!type) type = ''
      else if (Array.isArray(type)) type = type.map(t => t.toLowerCase()).join('|')
      else type = type.toLowerCase()

      a[`${component.name}/${hyphenate(prop.name)}`] = {
        type,
        description: prop.description.en || '',
      }

      return a
    }, {})

    return { ...obj, ...attrs }
  }, {})

  writeJsonFile(tags, 'dist/tags.json')
  writeJsonFile(attributes, 'dist/attributes.json')
}

// Create web-types.json to provide autocomplete in JetBrains IDEs
const createWebTypesApi = () => {
  const components = getComponentsApi(['en'])
  const directives = getDirectivesApi(['en'])

  const getDocUrl = (cmp, heading = null) => `https://www.vuetifyjs.com/api/${cmp}${heading ? `#${heading}` : ''}`

  const createTag = component => {
    const createTagSlot = slot => {
      return {
        name: slot.name,
        pattern: undefined,
        description: slot.description.en || '',
        'doc-url': getDocUrl(component.name, 'slots'),
        'vue-properties': slot.props && Object.keys(slot.props).map(key => createTypedEntity(key, slot.props[key])),
      }
    }

    const createTagEvent = event => {
      return {
        name: event.name,
        description: event.description.en || '',
        'doc-url': getDocUrl(component.name, 'events'),
        arguments: [createTypedEntity('argument', event.value)], // TODO: value should be replaced by arguments array
      }
    }

    const createTagAttribute = prop => {
      return {
        name: prop.name,
        description: prop.description.en || '',
        'doc-url': getDocUrl(component.name, 'props'),
        default: typeof prop.default !== 'string' ? JSON.stringify(prop.default) : prop.default,
        required: undefined, // TODO: implement this
        value: createTagValue(prop.type),
        type: prop.type === 'boolean' ? 'boolean' : undefined, // this is deprecated but should be const 'boolean' for compatability with 2019.2
      }
    }

    const createTagValue = type => {
      return {
        kind: 'expression',
        type,
      }
    }

    const pascalName = pascalize(component.name)

    return {
      name: pascalName,
      source: {
        module: './src/components/index.ts',
        symbol: pascalName,
      },
      aliases: undefined, // TODO: are we using this? deprecated name changes?
      description: '', // TODO: we should probably include component description in locale files
      'doc-url': getDocUrl(component.name),
      attributes: component.props.map(createTagAttribute),
      events: component.events.map(createTagEvent),
      slots: component.slots.map(createTagSlot),
      'vue-model': { // TODO: we should expose this in api data if we can
        prop: 'value',
        event: 'input',
      },
    }
  }

  const createTypedEntity = (name, type) => {
    return {
      name,
      type: typeof type !== 'string' ? JSON.stringify(type) : type,
    }
  }

  const createAttribute = directive => {
    const createAttributeVueArgument = argument => {
      return {
        pattern: undefined,
        description: argument.description.en || '',
        'doc-url': getDocUrl(directive.name, 'argument'),
        required: undefined,
      }
    }

    const createAttributeVueModifier = modifier => {
      return {
        name: modifier.name,
        pattern: undefined,
        description: modifier.description.en || '',
        'doc-url': getDocUrl(directive.name, 'modifiers'),
      }
    }

    const createAttributeValue = argument => {
      return {
        kind: 'expression',
        type: argument.type,
      }
    }

    return {
      name: directive.name,
      aliases: undefined,
      description: '', // TODO: we should probably include directive description in locale files
      'doc-url': getDocUrl(directive.name),
      default: '',
      required: false,
      value: createAttributeValue(directive.argument),
      source: {
        module: './src/directives/index.ts',
        symbol: capitalize(directive.name.slice(2)),
      },
      'vue-argument': directive.argument && createAttributeVueArgument(directive.argument), // TODO: how to use this in comparison to value?
      'vue-modifiers': directive.modifiers && directive.modifiers.map(createAttributeVueModifier),
    }
  }

  const tags = components.map(createTag)
  const attributes = directives.map(createAttribute)

  const webTypes = {
    $schema: 'http://json.schemastore.org/web-types',
    framework: 'vue',
    name: 'vuetify',
    version: pkg.version,
    contributions: {
      html: {
        'types-syntax': 'typescript',
        'description-markup': 'markdown',
        tags,
        attributes,
      },
    },
  }

  writeJsonFile(webTypes, 'dist/web-types.json')
}

rimraf.sync(resolve('./dist'))

createVeturApi()
createWebTypesApi()

import fs from 'fs'
import { capitalize } from './helpers/text'
import type { Definition, ObjectDefinition } from './types'
const pkg = require('../package.json')

type ComponentData = {
  props: Definition
  slots: Definition
  events: Definition
  exposed: Definition
  componentName: string
  kebabName: string
}

type DirectiveData = {
  name: string
  kebabName: string
  data: {
    exposed: ObjectDefinition
  }
}

export const createWebTypesApi = (componentData: ComponentData[], directiveData: DirectiveData[]) => {
  const getDocUrl = (cmp, heading = null) => `https://vuetifyjs.com/api/${cmp}` + (heading ? `#${heading}` : '')

  const createTypedEntity = (name: string, type: string) => {
    return {
      name,
      type,
    }
  }

  const createTag = (component: ComponentData) => {
    const createTagSlot = ([name, slot]: [string, any]) => {
      return {
        name,
        pattern: undefined,
        description: slot.description.en || '',
        'doc-url': getDocUrl(component.kebabName, 'slots'),
        'vue-properties': slot.properties && Object.keys(slot.properties).map(key => createTypedEntity(key, slot.properties[key].formatted)),
      }
    }

    const createTagEvent = ([name, event]: [string, any]) => {
      return {
        name,
        description: event.description.en || '',
        'doc-url': getDocUrl(component.kebabName, 'events'),
        arguments: [createTypedEntity('argument', event.formatted)],
      }
    }

    const createTagValue = type => {
      return {
        kind: 'expression',
        type,
      }
    }

    const createTagAttribute = ([name, prop]: [string, any]) => {
      return {
        name,
        description: prop.description.en || '',
        'doc-url': getDocUrl(component.kebabName, 'props'),
        default: typeof prop.default !== 'string' ? JSON.stringify(prop.default) : prop.default,
        required: undefined, // TODO: implement this
        value: createTagValue(prop.formatted),
        type: prop.formatted === 'boolean' ? 'boolean' : undefined, // this is deprecated but should be const 'boolean' for compatibility with 2019.2
      }
    }

    return {
      name: component.componentName,
      source: {
        module: './src/components/index.ts',
        symbol: component.componentName,
      },
      aliases: undefined, // TODO: are we using this? deprecated name changes?
      description: '', // TODO: we should probably include component description in locale files
      'doc-url': getDocUrl(component.kebabName),
      attributes: Object.entries(component.props ?? {}).map(createTagAttribute),
      events: Object.entries(component.events ?? {}).map(createTagEvent),
      slots: Object.entries(component.slots ?? {}).map(createTagSlot),
      'vue-model': { // TODO: we should expose this in api data if we can
        prop: 'modelValue',
        event: 'update:modelValue',
      },
    }
  }

  const createAttribute = directive => {
    const createAttributeVueArgument = argument => {
      return {
        pattern: undefined,
        description: argument.description && argument.description.en ? argument.description.en : '',
        'doc-url': getDocUrl(directive.name, 'argument'),
        required: undefined,
      }
    }

    const createAttributeVueModifier = ([name, modifier]: [string, any]) => {
      return {
        name,
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
      value: createAttributeValue(directive.data.exposed.value),
      source: {
        module: './src/directives/index.ts',
        symbol: capitalize(directive.name.slice(2)),
      },
      'vue-argument': directive.data.exposed.value && createAttributeVueArgument(directive.data.exposed.value), // TODO: how to use this in comparison to value?
      'vue-modifiers': directive.data.exposed.modifiers && Object.entries(directive.data.exposed.modifiers.properties).map(createAttributeVueModifier),
    }
  }

  const tags = componentData.map(createTag)
  const attributes = directiveData.map(createAttribute)

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

  fs.writeFileSync('dist/web-types.json', JSON.stringify(webTypes, null, 2))
}

import fs from 'fs'
import { capitalize } from './helpers/text'
import type { Definition, ObjectDefinition } from './types'
import pkg from '../package.json' assert { type: 'json' }

type ComponentData = {
  props: Definition
  slots: Definition
  events: Definition
  exposed: Definition
  displayName: string
  fileName: string
}

type DirectiveData = {
  name: string
  fileName: string
  argument: { value: Definition }
  modifiers: Record<string, Definition>
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
        'doc-url': getDocUrl(component.fileName, 'slots'),
        'vue-properties': slot.properties &&
          Object.entries(slot.properties ?? {}).map(([name, prop]) => createTypedEntity(name, (prop as any).formatted)),
      }
    }

    const createTagEvent = ([name, event]: [string, any]) => {
      return {
        name,
        description: event.description.en || '',
        'doc-url': getDocUrl(component.fileName, 'events'),
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
        'doc-url': getDocUrl(component.fileName, 'props'),
        default: typeof prop.default !== 'string' ? JSON.stringify(prop.default) : prop.default,
        required: undefined, // TODO: implement this
        value: createTagValue(prop.formatted),
        type: prop.formatted === 'boolean' ? 'boolean' : undefined, // this is deprecated but should be const 'boolean' for compatibility with 2019.2
      }
    }

    return {
      name: component.displayName,
      source: {
        module: './src/components/index.ts',
        symbol: component.displayName,
      },
      aliases: undefined, // TODO: are we using this? deprecated name changes?
      description: '', // TODO: we should probably include component description in locale files
      'doc-url': getDocUrl(component.fileName),
      attributes: Object.entries(component.props ?? {}).map(createTagAttribute),
      events: Object.entries(component.events ?? {}).map(createTagEvent),
      slots: Object.entries(component.slots ?? {}).map(createTagSlot),
      'vue-model': { // TODO: we should expose this in api data if we can
        prop: 'modelValue',
        event: 'update:modelValue',
      },
    }
  }

  const createAttribute = (directive: DirectiveData) => {
    const createAttributeVueArgument = argument => {
      return {
        pattern: undefined,
        description: argument.description.en,
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
      value: createAttributeValue(directive.argument),
      source: {
        module: './src/directives/index.ts',
        symbol: capitalize(directive.name.slice(2)),
      },
      'vue-argument': directive.argument?.value && createAttributeVueArgument(directive.argument?.value), // TODO: how to use this in comparison to value?
      'vue-modifiers': directive.modifiers &&
        Object.entries(directive.modifiers ?? {}).map(createAttributeVueModifier),
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

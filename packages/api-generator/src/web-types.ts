import fs from 'fs'
import { capitalize } from './helpers/text'
import type { ComponentData, DirectiveData } from './types'
import pkg from '../package.json' assert { type: 'json' }

export const createWebTypesApi = (componentData: ComponentData[], directiveData: DirectiveData[]) => {
  const getDocUrl = (cmp: string, heading?: string) =>
    `https://vuetifyjs.com/api/${cmp}` + (heading ? `#${heading}` : '')

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
        'doc-url': getDocUrl(component.pathName, 'slots'),
        'vue-properties': slot.properties &&
          Object.entries(slot.properties ?? {}).map(([name, prop]) => createTypedEntity(name, (prop as any).formatted)),
      }
    }

    const createTagEvent = ([name, event]: [string, any]) => {
      return {
        name,
        description: event.description.en || '',
        'doc-url': getDocUrl(component.pathName, 'events'),
        arguments: [createTypedEntity('argument', event.formatted)],
      }
    }

    const createTagValue = (type: string) => {
      return {
        kind: 'expression',
        type: type?.trim(),
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
      'doc-url': getDocUrl(component.pathName),
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
    const createAttributeVueArgument = (argument: any) => {
      return {
        pattern: undefined,
        description: argument.description.en,
        'doc-url': getDocUrl(directive.pathName, 'argument'),
        required: undefined,
      }
    }

    const createAttributeVueModifier = ([name, modifier]: [string, any]) => {
      return {
        name,
        pattern: undefined,
        description: modifier.description.en || '',
        'doc-url': getDocUrl(directive.pathName, 'modifiers'),
      }
    }

    const createAttributeValue = (argument: any) => {
      return {
        kind: 'expression',
        type: argument.type?.trim(),
      }
    }

    return {
      name: directive.displayName,
      aliases: undefined,
      description: '', // TODO: we should probably include directive description in locale files
      'doc-url': getDocUrl(directive.pathName),
      default: '',
      required: false,
      value: createAttributeValue(directive.argument),
      source: {
        module: './src/directives/index.ts',
        symbol: capitalize(directive.displayName.slice(2)),
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

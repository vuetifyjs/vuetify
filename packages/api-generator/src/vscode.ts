import fs from 'fs'
import { /*capitalize,*/ kebabCase } from './helpers/text'
import type { ComponentData, DirectiveData } from './types'
import pkg from '../package.json' with { type: 'json' }

export const createVSCodeApi = (componentData: ComponentData[], directiveData: DirectiveData[]) => {
  const getDocUrl = (cmp: string, heading?: string) =>
    `https://vuetifyjs.com/api/${cmp}` + (heading ? `#${heading}` : '')

  /*
  const createTypedEntity = (name: string, type: string) => {
    return {
      name,
      type,
    }
  }
  */

  const createTag = (component: ComponentData) => {
    const createTagSlot = ([name, slot]: [string, any]) => {
      return {
        name: `#${kebabCase(name)}`,
        description: slot.description.en || '',
        references: [
          {
            name: `#${kebabCase(name)} API docs`,
            url: getDocUrl(component.pathName, `slots-${kebabCase(name)}`)
          }
        ],
        // not in schema
        /*
        pattern: undefined,
        'vue-properties': slot.properties && Object.entries(slot.properties ?? {}).map(([name, prop]) => createTypedEntity(name, (prop as any).formatted)),
        */
      }
    }

    const createTagEvent = ([name, event]: [string, any]) => {
      return {
        name:`@${kebabCase(name)}`,
        description: event.description.en || '',
        references: [
          {
            name: `@${kebabCase(name)} API docs`,
            url: getDocUrl(component.pathName, `events-${kebabCase(name)}`)
          }
        ],
        // not in schema
        // arguments: [createTypedEntity('argument', event.formatted)],
      }
    }

    /*
    const createTagValue = (type: string) => {
      return {
        kind: 'expression',
        type: type?.trim(),
      }
    }
    */

    const createTagAttribute = ([name, prop]: [string, any]) => {
      return {
        name: kebabCase(name),
        description: prop.description.en || '',
        references: [
          {
            name: `${kebabCase(name)} API docs`,
            url: getDocUrl(component.fileName, `props-${kebabCase(name)}`)
          }
        ],
        // not in schema - work into description or toss
        /*
        default: typeof prop.default !== 'string' ? JSON.stringify(prop.default) : prop.default,
        required: undefined, // TODO: implement this
        value: createTagValue(prop.formatted),
        type: prop.formatted === 'boolean' ? 'boolean' : undefined, // this is deprecated but should be const 'boolean' for compatibility with 2019.2
        */
      }
    }

    return {
      name: component.displayName,
      description: '', // TODO: we should probably include component description in locale files
      attributes: [
        ...Object.entries(component.props ?? {}).map(createTagAttribute), // props
        ...Object.entries(component.events ?? {}).map(createTagEvent), // events
        ...Object.entries(component.slots ?? {}).map(createTagSlot) // slots
      ],
      references: [
        {
          name: `${component.displayName} docs`,
          url: getDocUrl(component.pathName)
        }
      ],
      // not in schema - work into description or toss
      /*
      aliases: undefined, // TODO: are we using this? deprecated name changes?
      source: {
        module: './src/components/index.ts',
        symbol: component.displayName,
      },
      'vue-model': { // TODO: we should expose this in api data if we can
        prop: 'modelValue',
        event: 'update:modelValue',
      },
      */
    }
  }

  const createAttribute = (directive: DirectiveData) => {
    /*
    const createAttributeVueArgument = (argument: any) => {
      return {
        name: argument,
        description: argument.description.en,
        references: [
          {
            name: `${argument} API docs`,
            url: getDocUrl(directive.pathName, 'argument')
          }
        ],
      }
    }
      */

    const createAttributeVueModifier = ([name, modifier]: [string, any]) => {
      return {
        name,
        description: modifier.description.en || '',
        references: [
          {
            name: `${name} API docs`,
            url: getDocUrl(directive.pathName, 'modifiers')
          }
        ],
      }
    }

    /*
    const createAttributeValue = (argument: any) => {
      return {
        kind: 'expression',
        type: argument.text,
      }
    }
    */

    return {
      name: directive.displayName,
      description: directive?.value?.description?.en || '',
      references: [
        {
          name: `${directive.displayName} docs`,
          url: getDocUrl(directive.pathName)
        }
      ],
      attributes: [
        // will need to add to description
        //...(directive.argument ? [createAttributeVueArgument(directive.argument)] : []),
        ...(directive.modifiers ? Object.entries(directive.modifiers).map(createAttributeVueModifier) : [])
      ]
      // not in schema - work into description or toss
      /*
      aliases: undefined,
      default: '',
      required: false,
      value: createAttributeValue(directive.value),
      source: {
        module: './src/directives/index.ts',
        symbol: capitalize(directive.displayName.slice(2)),
      },
      */
    }
  }

  const tags = componentData.map(createTag)
  const globalAttributes = directiveData.map(createAttribute)

  const vscode = {
    $schema: 'http://json-schema.org/draft-07/schema',
    framework: 'vue',
    name: 'vuetify',
    version: pkg.version,
    tags,
    globalAttributes,
  }

  fs.writeFileSync('dist/vscode.json', JSON.stringify(vscode, null, 2))
}

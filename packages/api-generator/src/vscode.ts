import fs from 'fs'
import { /* capitalize, */ kebabCase } from './helpers/text'
import type { ComponentData, DirectiveData } from './types'
import pkg from '../package.json' with { type: 'json' }

export const createVSCodeApi = (componentData: ComponentData[], directiveData: DirectiveData[]) => {
  const getDocUrl = (cmp: string, heading?: string) =>
    `https://vuetifyjs.com/api/${cmp}` + (heading ? `#${heading}` : '')

  const descriptionHeader = '**Description**\n'
  const noDescription = '*no description*'
  const templateAttributes: Record<string, any> = {}

  const createTag = (component: ComponentData) => {
    const createTagSlot = ([name, slot]: [string, any]) => {
      return ['#', 'v-slot:'].map(prefix => (
        {
          name: `${prefix}${kebabCase(name)}`,
          description: [
            descriptionHeader,
            `>${slot.description.en || noDescription}\n`,
            '**Properties:**\n',
            ...slot.properties
              ? Object.entries(slot.properties ?? {}).map(([name, prop]) => `>**${name}:**, ${(prop as any).formatted}`)
              : ['>*no properties*'],
          ].join('\n') || '',
          references: [
            {
              name: `${prefix}${kebabCase(name)} API docs`,
              url: getDocUrl(component.pathName, `slots-${kebabCase(name)}`),
            },
          ],
        }
      ))
    }

    const createTagEvent = ([name, event]: [string, any]) => {
      const argument = event.formatted
      return {
        name: `@${kebabCase(name)}`,
        description: [
          descriptionHeader,
          `>${event.description.en || noDescription}`,
          ...argument ? ['', `* **argument:** \`${argument}\``] : [],
        ].join('\n') || '',
        references: [
          {
            name: `@${kebabCase(name)} API docs`,
            url: getDocUrl(component.pathName, `events-${kebabCase(name)}`),
          },
        ],
      }
    }

    const createTagProp = ([name, prop]: [string, any]) => {
      const defaultValue = typeof prop.default !== 'string' ? JSON.stringify(prop.default) : prop.default
      return {
        name: kebabCase(name),
        description: [
          descriptionHeader,
          `>${prop.description.en || noDescription}\n`,
          `* **default:** \`${defaultValue}\``,
        ].join('\n') || '',
        references: [
          {
            name: `${kebabCase(name)} API docs`,
            url: getDocUrl(component.fileName, `props-${kebabCase(name)}`),
          },
        ],
      }
    }

    // slots
    for (const [name, slot] of Object.entries(component.slots ?? {})) {
      if (!templateAttributes?.[name]) { templateAttributes[name] = createTagSlot([name, slot]) }
    }
    return [
      ...[component.displayName, kebabCase(component.displayName)].map(propName => (
        {
          name: propName,
          description: noDescription, // TODO: include component description in locale files
          attributes: [
            ...Object.entries(component.props ?? {}).map(createTagProp), // props
            ...Object.entries(component.events ?? {}).map(createTagEvent), // events
          ],
          // TODO: add reference to api page
          references: [
            {
              name: `${propName} docs`,
              url: getDocUrl(component.pathName),
            },
          ],
        }
      )),
    ]
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
        description: [
          descriptionHeader,
          `>${modifier.description.en || noDescription}`,
        ].join('\n') || '',
        references: [
          {
            name: `${name} API docs`,
            url: getDocUrl(directive.pathName, 'modifiers'),
          },
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
      description: [
        descriptionHeader,
        `>${directive?.value?.description?.en || noDescription}`,
      ].join('\n') || '',
      references: [
        {
          name: `${directive.displayName} docs`,
          url: getDocUrl(directive.pathName),
        },
      ],
      attributes: [
        // will need to add to description
        // ...(directive.argument ? [createAttributeVueArgument(directive.argument)] : []),
        ...(directive.modifiers ? Object.entries(directive.modifiers).map(createAttributeVueModifier) : []),
      ],
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

  const tags = []
  for (const component of componentData) {
    tags.push(...createTag(component))
  }
  tags.push({
    name: 'template',
    attributes: Object.values(templateAttributes).reduce((k, a) => {
      a.push(...k)
      return a
    }, []),
  })
  const globalAttributes = directiveData.map(createAttribute)

  const vscode = {
    $schema: 'http://json-schema.org/draft-07/schema',
    framework: 'vue',
    name: 'vuetify',
    version: pkg.version,
    tags,
    globalAttributes,
    // value set example structure, can be applied via valueSet / values on props
    /*
    valueSets: [
      {
        name: 'x',
        values: [
          {
            name: 'xvals',
            description: 'x values',
          },
          {
            name: 'xval',
            description: 'x value',
          },
        ],
      },
    ],
    */
  }

  fs.writeFileSync('dist/vscode.json', JSON.stringify(vscode, null, 2))
}

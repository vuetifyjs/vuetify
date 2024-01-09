import { execSync } from 'child_process'
import stringifyObject from 'stringify-object'
import prettier from 'prettier'
import * as typescriptParser from 'prettier/plugins/typescript'
import type { Definition } from './types'

function parseFunctionParams (func: string) {
  const [, regular] = /function\s\((.*)\)\s\{.*/i.exec(func) || []
  const [, arrow] = /\((.*)\)\s=>\s\{.*/i.exec(func) || []
  const args = regular || arrow

  return args ? `(${args}) => {}` : undefined
}

function getPropType (type: any | any[]): string | string[] {
  if (Array.isArray(type)) {
    return type.flatMap(t => getPropType(t))
  }

  if (!type) return 'any'

  return type.name.toLowerCase()
}

function getPropDefault (definition: any, type: string | string[]) {
  const def = definition?.default

  if (typeof def === 'function' && type !== 'function') {
    return def.call({}, {})
  }

  if (typeof def === 'string') {
    return def ? `'${def}'` : def
  }

  if (type === 'function') {
    return parseFunctionParams(def)
  }

  if ((!definition || !('default' in definition)) && (
    type === 'boolean' ||
    (Array.isArray(type) && type.includes('boolean'))
  )) {
    return false
  }

  return def
}

type ComponentData = {
  props?: Record<string, Definition>
  slots?: Record<string, Definition>
  events?: Record<string, Definition>
  exposed?: Record<string, Definition>
}

export function addPropData (
  name: string,
  componentData: ComponentData,
  componentProps: any
) {
  const sources = new Set<string>()
  for (const [propName, propObj] of Object.entries(componentData.props ?? {})) {
    const instancePropObj = componentProps[propName]

    ;(propObj as any).default = instancePropObj?.default
    ;(propObj as any).source = instancePropObj?.source

    sources.add(instancePropObj?.source ?? name)
  }

  return [...sources.values()]
}

export function stringifyProps (props: any) {
  return Object.fromEntries(
    Object.entries<any>(props).map(([key, prop]) => {
      let def = typeof prop === 'object'
        ? getPropDefault(prop, getPropType(prop?.type))
        : getPropDefault(undefined, getPropType(prop))

      if (typeof def === 'object') {
        def = stringifyObject(def, {
          indent: '  ',
          inlineCharacterLimit: 60,
          filter (obj, property) {
            if (typeof obj === 'object' && !Array.isArray(obj) && obj != null && 'name' in obj && 'props' in obj && 'setup' in obj) {
              return property === 'name'
            }
            return true
          },
        })
      }

      return [key, {
        source: prop?.source,
        default: def,
      }]
    })
  )
}

const localeCache = new Map<string, object>()
async function loadLocale (componentName: string, locale: string): Promise<Record<string, string | Record<string, string>>> {
  const cacheKey = `${locale}/${componentName}`
  if (localeCache.has(cacheKey)) {
    return localeCache.get(cacheKey) as any
  }
  try {
    const data = await import(`../src/locale/${cacheKey}.json`, {
      assert: { type: 'json' },
    })
    localeCache.set(cacheKey, data.default)
    return data.default
  } catch (err: any) {
    if (err.code === 'ERR_MODULE_NOT_FOUND') {
      console.error(`\x1b[35mMissing locale for ${cacheKey}\x1b[0m`)
      localeCache.set(cacheKey, {})
    } else {
      console.error('\x1b[31m', err.message, '\x1b[0m')
    }
    return {}
  }
}

const currentBranch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim()

async function getSources (name: string, locale: string, sources: string[]) {
  const arr = await Promise.all([
    loadLocale(name, locale),
    ...sources.map(source => loadLocale(source, locale)),
    loadLocale('generic', locale),
  ])
  const sourcesMap = [name, ...sources, 'generic']

  return {
    find: (section: string, key: string, ogSource = name) => {
      for (let i = 0; i < arr.length; i++) {
        const source = arr[i] as any
        const found: string | undefined = source?.[section]?.[key]
        if (found) {
          return { text: found, source: sourcesMap[i] }
        }
      }
      const githubUrl = `https://github.com/vuetifyjs/vuetify/tree/${currentBranch}/packages/api-generator/src/locale/${locale}/${ogSource}.json`
      return { text: `MISSING DESCRIPTION ([edit in github](${githubUrl}))`, source: name }
    },
  }
}

export async function addDescriptions (name: string, componentData: ComponentData, locales: string[], sources: string[] = []) {
  for (const locale of locales) {
    const descriptions = await getSources(name, locale, sources)

    for (const section of ['props', 'slots', 'events', 'exposed'] as const) {
      for (const [propName, propObj] of Object.entries(componentData[section] ?? {})) {
        propObj.description = propObj.description ?? {}
        propObj.descriptionSource = propObj.descriptionSource ?? {}

        const found = descriptions.find(section, propName, propObj.source)
        propObj.description![locale] = found.text
        propObj.descriptionSource![locale] = found.source
      }
    }
  }
}

export async function addDirectiveDescriptions (
  name: string,
  componentData: { argument: { value: Definition }, modifiers: Record<string, Definition> },
  locales: string[],
  sources: string[] = [],
) {
  for (const locale of locales) {
    const descriptions = await getSources(name, locale, sources)

    if (componentData.argument) {
      for (const [name, arg] of Object.entries(componentData.argument)) {
        arg.description = arg.description ?? {}

        arg.description[locale] = descriptions.find('argument', name)?.text
      }
    }

    if (componentData.modifiers) {
      for (const [name, modifier] of Object.entries(componentData.modifiers)) {
        modifier.description = modifier.description ?? {}

        modifier.description[locale] = descriptions.find('modifiers', name)?.text
      }
    }
  }
}

export function stripLinks (str: string): [string, Record<string, string>] {
  let out = str.slice()
  const obj: Record<string, string> = {}
  const regexp = /<a.*?>(.*?)<\/a>/g

  let matches = regexp.exec(str)

  while (matches !== null) {
    obj[matches[1]] = matches[0]
    out = out.replace(matches[0], matches[1])

    matches = regexp.exec(str)
  }

  return [out, obj]
}

export function insertLinks (str: string, stripped: Record<string, string>) {
  for (const [key, value] of Object.entries(stripped)) {
    str = str.replaceAll(new RegExp(`(^|\\W)(${key})(\\W|$)`, 'g'), `$1${value}$3`)
  }
  return str
}

export async function prettifyType (name: string, item: Definition) {
  const prefix = 'type Type = '
  const [str, stripped] = stripLinks(item.formatted)
  let formatted
  try {
    formatted = await prettier.format(prefix + str, {
      parser: 'typescript',
      plugins: [typescriptParser],
      bracketSpacing: true,
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
    })
  } catch (err: any) {
    console.error('\x1b[31m', `${name}:`, err.message, '\x1b[0m')
    return item
  }

  return {
    ...item,
    formatted: insertLinks(formatted, stripped).replace(/type\sType\s=\s+?/m, ''),
  }
}

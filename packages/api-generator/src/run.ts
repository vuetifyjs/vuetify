import fs from 'fs/promises'
import path from 'path'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { kebabCase } from './helpers/text'
import type { ObjectDefinition } from './types'
import { generateDataFromTypes } from './types'

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

function getPropDefault (def: any, type: string | string[]) {
  if (typeof def === 'function' && type !== 'function') {
    return def.call({}, {})
  }

  if (typeof def === 'string') {
    return def ? `'${def}'` : def
  }

  if (type === 'function') {
    return parseFunctionParams(def)
  }

  if (def == null && (
    type === 'boolean' ||
    (Array.isArray(type) && type.includes('boolean'))
  )) {
    return false
  }

  return def
}

type ComponentData = {
  props: ObjectDefinition
  slots: ObjectDefinition
  events: ObjectDefinition
  exposed: ObjectDefinition
}

function addPropData (
  kebabName: string,
  componentData: ComponentData,
  componentInstance: any
) {
  const sources = new Set<string>()
  for (const [propName, propObj] of Object.entries(componentData.props?.properties ?? {})) {
    const instancePropObj = componentInstance.props[propName]

    propObj.default = getPropDefault(instancePropObj?.default, getPropType(instancePropObj?.type))
    // propObj.source = instancePropObj?.source ?? kebabName

    sources.add(instancePropObj?.source ?? kebabName)
  }

  return [...sources.values()]
}

const loadLocale = (componentName: string, locale: string, fallback = {}): Record<string, Record<string, string>> => {
  try {
    const data = require(`./locale/${locale}/${componentName}`)
    return Object.assign(fallback, data)
  } catch (err) {
    return fallback
  }
}

function getSources (kebabName: string, sources: string[], locale: string) {
  const arr = [
    loadLocale(kebabName, locale),
    ...sources.map(source => loadLocale(source, locale)),
    loadLocale('generic', locale),
  ]

  return {
    find: (section: string, key: string) => {
      return arr.reduce<string | null>((str, source) => {
        if (str) return str
        return source?.[section]?.[key]
      }, null)
    },
  }
}

function addDescriptions (kebabName: string, componentData: ComponentData, sources: string[], locales: string[]) {
  for (const locale of locales) {
    const descriptions = getSources(kebabName, sources, locale)

    for (const section of ['props', 'slots', 'events', 'exposed'] as const) {
      for (const [propName, propObj] of Object.entries(componentData[section]?.properties ?? {})) {
        propObj.description = propObj.description ?? {}

        const description = descriptions.find(section, propName)

        propObj.description[locale] = description ?? 'MISSING DESCRIPTION'
      }
    }
  }
}

const run = async () => {
  const app = createApp({})
  const vuetify = createVuetify()

  app.use(vuetify)

  const components = app._context.components
  const locales = ['en']

  for (const [componentName, componentInstance] of Object.entries(components)) {
    try {
      // if (componentName !== 'VWindow') continue

      const kebabName = kebabCase(componentName)
      console.log(componentName)
      const componentData = await generateDataFromTypes(componentName)

      const sources = addPropData(kebabName, componentData as any, componentInstance)

      addDescriptions(kebabName, componentData as any, sources, locales)

      const folder = '../docs/src/api/data/'

      try {
        await fs.stat(path.resolve(folder))
      } catch (err) {
        await fs.mkdir(path.resolve(folder), { recursive: true })
      }

      await fs.writeFile(path.resolve(`../docs/src/api/data/${kebabName}.json`), JSON.stringify(componentData, null, 2))
    } catch (err) {
      console.error(err)
    }
  }
}

run()

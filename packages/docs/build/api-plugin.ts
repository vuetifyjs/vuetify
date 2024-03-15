// Imports
import fs from 'fs'
import path, { resolve } from 'path'
import { createRequire } from 'module'
import { startCase } from 'lodash-es'
import locales from '../src/i18n/locales.json'
import pageToApi from '../src/data/page-to-api.json'
import type { Plugin } from 'vite'
import { rimraf } from 'rimraf'
import { mkdirp } from 'mkdirp'

const API_ROOT = resolve('../api-generator/dist/api')
const API_PAGES_ROOT = resolve('./node_modules/.cache/api-pages')

const require = createRequire(import.meta.url)

const sections = ['props', 'events', 'slots', 'exposed', 'sass', 'argument', 'modifiers'] as const
// This can't be imported from the api-generator because it mixes the type definitions up
type Data = {
  displayName: string // user visible name used in page titles
  fileName: string // file name for translation strings and generated types
  pathName: string // kebab-case name for use in urls
} & Record<typeof sections[number], Record<string, any>>

const localeList = locales
  .filter(item => item.enabled)
  .map(item => item.alternate || item.locale)

function genApiLinks (componentName: string, header: string) {
  const section = ['<promoted-entry />', '<api-search />']
  const links = (Object.keys(pageToApi) as (keyof typeof pageToApi)[])
    .filter(page => pageToApi[page].includes(componentName))
    .reduce<string[]>((acc, href) => {
      const name = href.split('/')[1]
      acc.push(`- [${startCase(name)}](/${href})`)
      return acc
    }, [])

  if (links.length && header) {
    section.unshift(...[links.join('\n'), `## ${header} {#links}`])
  }

  return `${section.join('\n\n')}\n\n`
}

function genFrontMatter (component: string) {
  const fm = [
    `title: ${component} API`,
    `description: API for the ${component} component.`,
    `keywords: ${component}, api, vuetify`,
  ]

  return `---\nmeta:\n${fm.map(s => '  ' + s).join('\n')}\n---`
}

function genHeader (componentName: string) {
  const header = [
    genFrontMatter(componentName),
    `# ${componentName} API`,
    '<page-features />',
  ]

  return `${header.join('\n\n')}\n\n`
}

const sanitize = (str: string) => str.replace(/\$/g, '')

async function loadMessages (locale: string) {
  const prefix = path.resolve('./src/i18n/messages/')
  const fallback = require(path.join(prefix, 'en.json'))

  try {
    const messages = require(path.join(prefix, `${locale}.json`))

    return {
      ...fallback['api-headers'],
      ...(messages['api-headers'] || {}),
    }
  } catch (err) {
    return fallback['api-headers']
  }
}

async function createMdFile (component: Data, locale: string) {
  const messages = await loadMessages(locale)
  let str = ''

  str += genHeader(component.displayName)
  str += genApiLinks(component.displayName, messages.links)

  for (const section of sections) {
    if (Object.keys(component[section] ?? {}).length) {
      str += `## ${messages[section]} {#${section}}\n\n`
      str += `<api-section name="${component.fileName}" section="${section}" />\n\n`
    }
  }

  return str
}

async function writeFile (componentApi: Data, locale: string) {
  if (!componentApi?.fileName) return

  const folder = resolve(API_PAGES_ROOT, locale, 'api')

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }

  fs.writeFileSync(resolve(folder, `${sanitize(componentApi.pathName)}.md`), await createMdFile(componentApi, locale))
}

function getApiData () {
  const files = fs.readdirSync(API_ROOT)
  const data: Data[] = []

  for (const file of files) {
    const obj = JSON.parse(fs.readFileSync(resolve(API_ROOT, file), 'utf-8'))

    data.push(obj)
  }

  return data
}

async function generateFiles () {
  // const api: Record<string, any>[] = getCompleteApi(localeList)
  const api = getApiData()

  for (const locale of localeList) {
    // const pages = {} as Record<string, any>

    for (const item of api) {
      await writeFile(item, locale)

      // pages[`/${locale}/api/${sanitize(kebabCase(item.name))}/`] = item.name
    }

    // fs.writeFileSync(resolve(API_PAGES_ROOT, `${locale}/pages.json`), JSON.stringify(pages, null, 2))
    fs.writeFileSync(resolve(API_PAGES_ROOT, `${locale}.js`), `export default require.context('./${locale}/api', true, /\\.md$/)`)
  }

  // for (const item of api) {
  //   writeData(item.name, item)
  // }

  // fs.writeFileSync(resolve(API_PAGES_ROOT, 'sass.json'), JSON.stringify([
  //   ...api.filter(item => item && item.sass && item.sass.length > 0).map(item => item.name),
  // ]))
}

export default function Api (): Plugin {
  return {
    name: 'vuetify:api',
    enforce: 'pre',
    async config () {
      await rimraf(API_PAGES_ROOT)
      await mkdirp(API_PAGES_ROOT)

      await generateFiles()
    },
  }
}

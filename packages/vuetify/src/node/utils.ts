import { readFile } from 'node:fs/promises'
import path from 'upath'
import { createRequire } from 'node:module'
import process from 'node:process'

// Types
import type { ImportComponents, ImportLabsComponents, ImportMaps, VuetifyComponent } from './types'

const require = createRequire(import.meta.url)

export function resolveVuetifyBase (paths = [process.cwd()]) {
  return path.dirname(require.resolve('vuetify/package.json', { paths }))
}

export function toKebabCase (str: string) {
  return str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase()
}

export function mapComponent (prefix: boolean, name: string) {
  return prefix ? name.replace(/^V/, 'Vuetify') : name
}

export function prepareTransformAssetUrls (prefix: boolean) {
  const transformAssetUrls = {
    VAppBar: ['image'],
    VAvatar: ['image'],
    VBanner: ['avatar'],
    VCard: ['image', 'prependAvatar', 'appendAvatar'],
    VCardItem: ['prependAvatar', 'appendAvatar'],
    VCarouselItem: ['src', 'lazySrc', 'srcset'],
    VChip: ['prependAvatar', 'appendAvatar'],
    VImg: ['src', 'lazySrc', 'srcset'],
    VListItem: ['prependAvatar', 'appendAvatar'],
    VNavigationDrawer: ['image'],
    VParallax: ['src', 'lazySrc', 'srcset'],
    VToolbar: ['image'],
  } as Record<string, string[]>

  if (!prefix) {
    for (const [component, attrs] of Object.entries(transformAssetUrls)) {
      for (const attr of attrs) {
        if (/[A-Z]/.test(attr)) {
          attrs.push(toKebabCase(attr))
        }
      }
      transformAssetUrls[toKebabCase(component)] = attrs
    }

    return transformAssetUrls
  }

  const result: Record<string, string[]> = {}
  for (let [component, attrs] of Object.entries(transformAssetUrls)) {
    component = mapComponent(true, component)
    result[component] = attrs
    for (const attr of attrs) {
      if (/[A-Z]/.test(attr)) {
        attrs.push(toKebabCase(attr))
      }
    }
    result[toKebabCase(component)] = attrs
  }

  return result
}

export function resolveVuetifyImportMaps (
  paths = [process.cwd()]
): ImportMaps {
  const vuetifyBase = resolveVuetifyBase(paths)
  return [importMap(vuetifyBase), importMapLabs(vuetifyBase)]
}

export function resolveVuetifyImportMap (paths = [process.cwd()]) {
  return importMap(resolveVuetifyBase(paths))
}

export function resolveVuetifyImportMapLabs (paths = [process.cwd()]) {
  return importMapLabs(resolveVuetifyBase(paths))
}

// Vuetify 3.7.11+ resolves to subpath exports instead of a file in /lib
export function resolveVuetifyComponentFrom ({ from }: VuetifyComponent) {
  return from.endsWith('.mjs') ? `lib/${from}` : from
}

async function importMap (vuetifyBase: string): Promise<ImportComponents> {
  return JSON.parse(await readFile(path.resolve(vuetifyBase, 'dist/json/importMap.json'), 'utf-8'))
}
async function importMapLabs (vuetifyBase: string): Promise<ImportLabsComponents> {
  return JSON.parse(await readFile(path.resolve(vuetifyBase, 'dist/json/importMap-labs.json'), 'utf-8'))
}

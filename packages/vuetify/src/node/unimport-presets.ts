// Types
import type { Addon, AddonsOptions, InlinePreset, PresetImport } from 'unimport'
import type { ComponentName, DirectiveName, LabComponentName, VuetifyComponent } from './types'
import { resolveVuetifyComponentFrom, resolveVuetifyImportMaps } from './utils'

export type { ComponentName, DirectiveName, LabComponentName }

export interface VuetifyComponentInfo {
  pascalName: string
  kebabName: string
  export: string
  filePath: string
}

export interface VuetifyComposablesOptions {
  /**
   * Prefix Vuetify composables (to allow use other composables with the same name):
   * - when prefix set to `true` will use `useV`: `useVDate`.
   * - when prefix is a string will use `use<prefix>`: `useVuetifyDate` with `prefix: 'Vuetify'`.
   */
  prefix?: true | string
}

export interface VuetifyDirectivesOptions {
  /**
   * Prefix Vuetify directives (to allow use other directives with the same name):
   * - when prefix set to `true` will use `Vuetify` => `v-vuetify-<directive>: `v-vuetify-ripple`.
   */
  prefix?: true
  /**
   * Directives to exclude.
   */
  exclude?: DirectiveName[]
}

export interface VuetifyComponentsOptions {
  /**
   * Prefix Vuetify components (to allow use other components with the same name):
   * - when prefix set to `true` will use `Vuetify` => `vuetify-<component>/Vuetify<component>: `vuetify-btn/VuetifyBtn`.
   */
  prefix?: true
  /**
   * Components to exclude.
   */
  exclude?: (ComponentName | LabComponentName)[]
}

export { resolveVuetifyComponentFrom }

export function VuetifyComposables (options: VuetifyComposablesOptions = {}) {
  const { prefix } = options
  const composableImports: [link: string, name: string][] = [
    ['use-date', 'useDate'],
    ['use-defaults', 'useDefaults'],
    ['use-display', 'useDisplay'],
    ['use-go-to', 'useGoTo'],
    ['use-layout', 'useLayout'],
    ['use-locale', 'useLocale'],
    ['use-rtl', 'useRtl'],
    ['use-theme', 'useTheme'],
  ]
  const imports = typeof prefix === 'string'
    ? composableImports.map(([l, n]) => [l, n, n.replace('use', `use${prefix}`)])
    : prefix
      ? composableImports.map(([l, n]) => [l, n, n.replace('use', 'useV')])
      : composableImports
  return {
    from: 'vuetify',
    imports: imports.map<PresetImport>(([link, name, renamed]) => ({
      name: name!,
      as: renamed,
      meta: { docsUrl: `https://vuetifyjs.com/en/api/${link}/` },
    })),
  } satisfies InlinePreset
}

export function VuetifyDirectives (options: VuetifyDirectivesOptions = {}) {
  const { exclude, prefix } = options
  const directivesImports: [link: string, name: DirectiveName][] = [
    ['click-outside', 'ClickOutside'],
    ['intersect', 'Intersect'],
    ['mutate', 'Mutate'],
    ['resize', 'Resize'],
    ['ripple', 'Ripple'],
    ['scroll', 'Scroll'],
    ['touch', 'Touch'],
    ['tooltip', 'Tooltip'],
  ]

  const directives = directivesImports.filter(entry => !exclude || !exclude.includes(entry[1]))

  return {
    from: 'vuetify/directives',
    meta: {
      vueDirective: true,
    },
    imports: directives.map<PresetImport>(([link, name]) => ({
      name,
      as: prefix ? `Vuetify${name}` : undefined,
      meta: {
        vueDirective: true,
        docsUrl: `https://vuetifyjs.com/en/api/v-${link}-directive/`,
      },
    })),
  } satisfies InlinePreset
}

export function buildAddonsOptions (addons?: AddonsOptions | Addon[]): AddonsOptions {
  if (!addons) {
    return { vueDirectives: true }
  }

  if (Array.isArray(addons)) {
    return { vueDirectives: true, addons }
  }

  return {
    ...addons,
    vueDirectives: addons.vueDirectives ?? true,
    addons: addons.addons,
  }
}

export async function prepareVuetifyComponents (options: VuetifyComponentsOptions = {}) {
  const { prefix = false, exclude = [] } = options
  const info: VuetifyComponentInfo[] = []
  const [components, labs] = await Promise.all(
    resolveVuetifyImportMaps()
  )

  const map = new Map<string, VuetifyComponent & { name: string }>()
  for (const [component, entry] of Object.entries(components.components)) {
    if (exclude.length > 0 && exclude.includes(component as any)) {
      continue
    }
    map.set(mapComponent(prefix, component), {
      from: `vuetify/${resolveVuetifyComponentFrom(entry)}`,
      name: component,
    })
  }
  for (const [component, entry] of Object.entries(labs.components)) {
    if (exclude.length > 0 && exclude.includes(component as any)) {
      continue
    }
    map.set(mapComponent(prefix, component), {
      from: `vuetify/${resolveVuetifyComponentFrom(entry)}`,
      name: component,
    })
  }

  for (const [component, entry] of map.entries()) {
    info.push({
      pascalName: component,
      kebabName: toKebabCase(component),
      export: entry.name,
      filePath: entry.from,
    })
  }

  return info
}

function toKebabCase (str: string) {
  return str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase()
}

function mapComponent (prefix: boolean, name: string) {
  return prefix ? name.replace(/^V/, 'Vuetify') : name
}

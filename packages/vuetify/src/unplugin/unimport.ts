// Types
import type { Preset, PresetImport } from 'unimport'
import type { DirectiveName } from './types'

export interface VuetifyComposablesOptions {
  /**
   * Prefix Vuetify composables:
   * - when prefix set to `true` will use `useV`: `useVDate`.
   * - when prefix is a string will use `use<prefix>`: `useVuetifyDate` with `prefix: 'Vuetify'`.
   */
  prefix?: true | string
}
export interface VuetifyOneComposablesOptions {
  /**
   * Prefix Vuetify composables:
   * - when prefix set to `true` will use `useV`: `useVDate`.
   * - when prefix is a string will use `use<prefix>`: `useVuetifyDate` with `prefix: 'Vuetify'`.
   */
  prefix?: true | string
}

export interface VuetifyDirectivesOptions {
  /**
   * Prefix Vuetify directives:
   * - when prefix set to `true` will use `Vuetify` => `v-vuetify-<directive>: `v-vuetify-ripple`.
   */
  prefix?: true
  exclude?: DirectiveName[]
}

export function VuetifyComposables (options: VuetifyComposablesOptions = {}) {
  const { prefix } = options
  const composableImports: [link: string, name: string, renamed?: string][] = [
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
    imports: imports.map(([link, name, renamed]) => ({
      name,
      as: renamed,
      meta: { docsUrl: `https://vuetifyjs.com/en/api/${link}/` },
    } satisfies PresetImport)),
  } satisfies Preset
}

export function VuetifyOneComposables (options: VuetifyOneComposablesOptions = {}) {
  const { prefix } = options
  const composableImports: string[] = [
    'createOne',
    'useAuthStore',
    'useHttpStore',
    'useOneStore',
    'useUserStore',
    'useQueueStore',
    'useSettingsStore',
    'useProductsStore',
  ]
  const imports = typeof prefix === 'string'
    ? composableImports.map(n => n.startsWith('create')
      ? [n, n.replace('create', `create${prefix}`)]
      : [n, n.replace('use', `use${prefix}`)]
    )
    : prefix
      ? composableImports.map(n => n.startsWith('create')
        ? [n, n.replace('create', 'createV')]
        : [n, n.replace('use', 'useV')]
      )
      : composableImports.map(n => [n])

  return {
    from: '@vuetify/one',
    imports: imports.map(([name, renamed]) => ({
      name,
      as: renamed,
    } satisfies PresetImport)),
  } satisfies Preset
}

export function VuetifyDirectives (options: VuetifyDirectivesOptions = {}) {
  const { exclude, prefix } = options
  type Directive = [link: string, name: DirectiveName]
  const directives = ([
    ['click-outside', 'ClickOutside'],
    ['intersect', 'Intersect'],
    ['mutate', 'Mutate'],
    ['resize', 'Resize'],
    ['ripple', 'Ripple'],
    ['scroll', 'Scroll'],
    ['touch', 'Touch'],
    ['tooltip', 'Tooltip'],
  ] satisfies Directive[])
    .filter(entry => !exclude || !exclude.includes(entry[1]))

  return {
    from: 'vuetify/directives',
    meta: {
      vueDirective: true,
    },
    imports: directives.map(([link, name]) => ({
      name,
      as: prefix ? `Vuetify${name}` : undefined,
      meta: { docsUrl: `https://vuetifyjs.com/en/api/${link}/` },
    } satisfies PresetImport)),
  } satisfies Preset
}

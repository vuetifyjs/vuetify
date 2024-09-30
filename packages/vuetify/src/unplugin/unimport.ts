// Types
import type { InlinePreset, PresetImport } from 'unimport'
import type { DirectiveName } from './types'

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
  return <InlinePreset>{
    from: 'vuetify',
    imports: imports.map<PresetImport>(([link, name, renamed]) => ({
      name,
      as: renamed,
      meta: { docsUrl: `https://vuetifyjs.com/en/api/${link}/` },
    })),
  }
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

  return <InlinePreset>{
    from: 'vuetify/directives',
    meta: {
      vueDirective: true,
    },
    imports: directives.map<PresetImport>(([link, name]) => ({
      name,
      as: prefix ? `Vuetify${name}` : undefined,
      meta: { docsUrl: `https://vuetifyjs.com/en/api/${link}/` },
    })),
  }
}

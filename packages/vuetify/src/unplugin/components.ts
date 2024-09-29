// Types
import type { ComponentResolver } from 'unplugin-vue-components/types'
import type {
  ComponentName,
  DirectiveName,
  ImportComponents,
  ImportMaps,
  LabComponentName,
} from './types'
import { resolveVuetifyImportMap, resolveVuetifyImportMaps } from './utils'

export interface VuetifyComponentResolverOptions {
  labs?: boolean
  exclude?: (ComponentName | LabComponentName)[]
  paths?: string[]
}

export interface VuetifyDirectivesResolverOptions {
  exclude?: DirectiveName[]
  paths?: string[]
}

export interface VuetifyVueResolverOptions extends Omit<VuetifyComponentResolverOptions, 'exclude'> {
  excludeDirectives?: DirectiveName[]
  excludeComponents?: (ComponentName | LabComponentName)[]
}

export function VuetifyVueResolver (options: VuetifyVueResolverOptions = {}) {
  const {
    paths,
    excludeDirectives,
    labs,
    excludeComponents,
  } = options

  const [componentsPromise, directivesPromise] = resolveVuetifyImportMaps(paths)

  const directives = createDirectivesResolver(
    componentsPromise,
    { exclude: excludeDirectives, paths }
  )
  const components = createComponentsResolver(
    [componentsPromise, directivesPromise],
    { exclude: excludeComponents, labs, paths }
  )

  return {
    VuetifyDirectiveResolver: directives,
    VuetifyComponentResolver: components,
  }
}

export function VuetifyDirectiveResolver (options: VuetifyDirectivesResolverOptions = {}) {
  return createDirectivesResolver(resolveVuetifyImportMap(options.paths), options)
}

export function VuetifyComponentResolver (options: VuetifyComponentResolverOptions = {}) {
  return createComponentsResolver(resolveVuetifyImportMaps(options.paths), options)
}

function createComponentsResolver (
  promises: ImportMaps,
  options: VuetifyComponentResolverOptions
) {
  const { exclude, labs } = options
  return {
    type: 'component',
    resolve: async name => {
      if (exclude?.some(e => e === name)) return undefined
      const [components, labsComponents] = await Promise.all(promises)
      const component = name in components.components
        ? components.components[name]
        : labs && name in labsComponents
          ? labsComponents[name]
          : undefined

      if (!component) return undefined
      return {
        name,
        from: `vuetify/lib/${component.from}`,
      }
    },
  } satisfies ComponentResolver
}

function createDirectivesResolver (promise: Promise<ImportComponents>, options: VuetifyDirectivesResolverOptions) {
  const { exclude } = options
  return {
    type: 'directive',
    resolve: async name => {
      if (exclude?.some(e => e === name)) return undefined
      const { directives } = await promise
      const directive = name in directives ? directives[name] : undefined

      if (!directive) return undefined
      return {
        name: 'default',
        as: name,
        from: `vuetify/directives/${String(directive)}`,
      }
    },
  } satisfies ComponentResolver
}

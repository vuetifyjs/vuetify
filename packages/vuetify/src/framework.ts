import { wrapInArray } from './util/helpers'
import type { InjectionKey, App, ExtractPropTypes, Prop } from 'vue'
import { inject, getCurrentInstance } from 'vue'

type MakeFactoryFunctions<T> = {
  [K in keyof T]: T[K] extends (infer E)[]
    ? () => E[]
    : T[K] extends Function
      ? T[K]
      : T[K] extends object
        ? () => T[K]
        : T[K]
}

// @ts-expect-error
type ExtractDefaultTypes<T> = Partial<MakeFactoryFunctions<Required<ExtractPropTypes<T>>>>

export interface VuetifyComponentDefaults {}

export interface VuetifyInstance {
  defaults: VuetifyComponentDefaults
}

export interface VuetifyOptions {
  components?: Record<string, any>
  directives?: Record<string, any>
  defaults?: VuetifyComponentDefaults
}

export const VuetifySymbol: InjectionKey<VuetifyInstance> = Symbol.for('vuetify')

export const useVuetify = () => {
  const vuetify = inject(VuetifySymbol)

  if (!vuetify) {
    throw new Error('Vuetify has not been installed on this app')
  }

  return vuetify
}

export const createVuetify = (options: VuetifyOptions = {}) => {
  const install = (app: App) => {
    console.log('Installing Vuetify...')

    const {
      components = {},
      directives = {},
      defaults = {},
    } = options

    for (const key in directives) {
      const directive = directives[key]

      app.directive(key, directive)
    }

    for (const key in components) {
      const component = components[key]

      app.component(key, component)
    }

    const vuetify: VuetifyInstance = {
      defaults,
    }

    app.provide(VuetifySymbol, vuetify)
    app.config.globalProperties.$vuetify = vuetify
  }

  return { install }
}

// Would be nice to have PropOptions here
const isFactory = (type: any) => {
  return wrapInArray(type).find((t: any) => t === Array || t === Object)
}

export function makeProps<P extends Record<string, Prop<any>>> (props: P) {
  for (const key in props) {
    const propOptions = (props[key] as any)

    propOptions.default = generateDefault(key, propOptions.default, propOptions.type)
  }

  return props
}

function generateDefault (propName: string, localDefault: any, type: any) {
  return () => {
    const vm = getCurrentInstance()

    if (!vm || !vm.type.name) {
      console.warn('Unable to get current component instance when generating default prop value')

      return localDefault
    }

    const globalDefault = getGlobalDefault(vm.type.name, propName)
    const actualDefault = typeof globalDefault !== 'undefined' ? globalDefault : localDefault

    return isFactory(type) ? actualDefault() : actualDefault
  }
}

// TODO: Fix typings and shit
function getGlobalDefault<C extends string, P extends string> (component: C, prop: P) {
  const vuetify = useVuetify()
  const key = component as keyof VuetifyComponentDefaults
  const defaults = vuetify.defaults[key] as any
  if (defaults == null) return null
  return defaults[prop]
}

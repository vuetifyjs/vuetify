// Utilities
import { getCurrentInstance } from 'vue'
import { useVuetify } from '@/framework'
import { wrapInArray } from '@/util/helpers'

// Types
import type { Prop } from 'vue'

export default function makeProps<P extends Record<string, Prop<any>>> (props: P) {
  for (const key in props) {
    const propOptions = (props[key] as any)

    const isOptions = !(propOptions == null || Array.isArray(propOptions) || typeof propOptions === 'function')

    const type = isOptions
      ? propOptions.type
      : propOptions

    const localDefault = isOptions
      ? propOptions.default
      : undefined

    const wrappedDefault = generateDefault(key, localDefault, type)

    if (isOptions) {
      propOptions.default = wrappedDefault
    } else {
      props[key] = { type, default: wrappedDefault } as any
    }
  }

  return props
}

function generateDefault (propName: string, localDefault: any, type: any) {
  if (
    localDefault === undefined &&
    (type === Boolean || (Array.isArray(type) && type.includes(Boolean)))
  ) {
    localDefault = false
  }

  return (props: Record<string, unknown>) => {
    const vm = getCurrentInstance()

    if (!vm) {
      console.warn('Unable to get current component instance when generating default prop value')

      return localDefault
    }

    if (!vm.type.name) {
      console.warn('The component is missing an explicit name, unable to generate default prop value')

      return localDefault
    }

    const vuetify = useVuetify()
    const globalDefault = vuetify.defaults.global[propName]
    const componentDefault = vuetify.defaults[vm.type.name]?.[propName]
    const actualDefault = typeof componentDefault !== 'undefined'
      ? componentDefault
      : typeof globalDefault !== 'undefined'
        ? globalDefault
        : localDefault

    return isFactory(actualDefault, type) ? actualDefault(props) : actualDefault
  }
}

// Would be nice to have PropOptions here
function isFactory (val: any, type: any) {
  return typeof val === 'function' && !wrapInArray(type).includes(Function)
}

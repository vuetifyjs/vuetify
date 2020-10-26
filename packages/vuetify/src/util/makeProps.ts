// Utilities
import { getCurrentInstance } from 'vue'
import { useVuetify } from '@/framework'
import { wrapInArray } from '@/util/helpers'

// Types
import type { Prop } from 'vue'
import type { VuetifyComponentDefaults } from '@/framework'

export default function makeProps<P extends Record<string, Prop<any>>> (props: P) {
  for (const key in props) {
    const propOptions = (props[key] as any)

    propOptions.default = generateDefault(key, propOptions.default, propOptions.type)
  }

  return props
}

function generateDefault (propName: string, localDefault: any, type: any) {
  return (props: Record<string, unknown>) => {
    const vm = getCurrentInstance()

    if (!vm || !vm.type.name) {
      console.warn('Unable to get current component instance when generating default prop value')

      return localDefault
    }

    const globalDefault = getGlobalDefault(vm.type.name, propName)
    const actualDefault = typeof globalDefault !== 'undefined' ? globalDefault : localDefault

    return isFactory(type) ? actualDefault(props) : actualDefault
  }
}

// TODO: Fix typings and shit
function getGlobalDefault<C extends string, P extends string> (component: C, prop: P) {
  const vuetify = useVuetify()
  const key = component as keyof VuetifyComponentDefaults
  const defaults = vuetify.defaults[key] as any

  if (defaults == null) return undefined

  return defaults[prop]
}

// Would be nice to have PropOptions here
function isFactory (type: any) {
  return !!wrapInArray(type).find(t => t === Array || t === Object)
}

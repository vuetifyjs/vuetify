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

    if (!vm) {
      console.warn('Unable to get current component instance when generating default prop value')

      return localDefault
    }

    if (!vm.type.name) {
      console.warn('The component is missing an explicit name, unable to generate default prop value')

      return localDefault
    }

    const vuetify = useVuetify()
    const globalDefault = getDefaultValue('global', propName, vuetify.defaults)
    const componentDefault = getDefaultValue(vm.type.name, propName, vuetify.defaults)
    const actualDefault = typeof globalDefault !== 'undefined'
      ? globalDefault
      : typeof componentDefault !== 'undefined'
        ? componentDefault
        : localDefault

    return isFactory(actualDefault, type) ? actualDefault(props) : actualDefault
  }
}

function getDefaultValue (sectionName: keyof VuetifyComponentDefaults, propName: string, defaults: VuetifyComponentDefaults) {
  const section = defaults[sectionName]
  return section?.[propName]
}

// Would be nice to have PropOptions here
function isFactory (val: any, type: any) {
  return typeof val === 'function' && !wrapInArray(type).includes(Function)
}

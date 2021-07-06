// Utils
import { getCurrentInstance, reactive, toRaw, watchEffect } from 'vue'
import { consoleWarn } from '@/util/console'
import { toKebabCase } from '@/util/helpers'
import { useDefaults } from '@/composables/defaults'

// Types
import type { defineComponent as _defineComponent, ComponentOptions, VNode } from 'vue'

function propIsDefined (vnode: VNode, prop: string) {
  return vnode.props?.hasOwnProperty(prop) ||
  vnode.props?.hasOwnProperty(toKebabCase(prop))
}

export const defineComponent = (function defineComponent (options: ComponentOptions) {
  const _setup = options.setup

  if (!options.name) {
    consoleWarn('The component is missing an explicit name, unable to generate default prop value')

    return options
  }

  if (_setup) {
    options.setup = function setup (props: Dictionary<any>, ctx) {
      const vm = getCurrentInstance()!
      const defaults = useDefaults()

      const _props = reactive({ ...toRaw(props) })
      watchEffect(() => {
        const globalDefaults = defaults.value.global
        const componentDefaults = defaults.value[options.name!]

        for (const prop of Object.keys(props)) {
          if (propIsDefined(vm.vnode, prop)) {
            _props[prop] = props[prop]
          } else {
            _props[prop] = componentDefaults?.[prop] ?? globalDefaults?.[prop] ?? props[prop]
          }
        }
      })

      return _setup(_props, ctx)
    }
  }

  return options
}) as unknown as typeof _defineComponent

// Utils
import {
  getCurrentInstance,
  shallowReactive,
  toRaw,
  watchEffect,
} from 'vue'
import { consoleWarn } from '@/util/console'
import { toKebabCase } from '@/util/helpers'
import { useDefaults } from '@/composables/defaults'

// Types
import type {
  defineComponent as _defineComponent,
  ComponentOptions,
  ComponentOptionsMixin,
  ComponentOptionsWithObjectProps,
  ComponentPropsOptions,
  ComponentPublicInstance,
  ComputedOptions,
  DefineComponent,
  EmitsOptions,
  MethodOptions,
  VNode,
} from 'vue'

function propIsDefined (vnode: VNode, prop: string) {
  return vnode.props?.hasOwnProperty(prop) ||
  vnode.props?.hasOwnProperty(toKebabCase(prop))
}

export const defineComponent = (function defineComponent (options: ComponentOptions) {
  options._setup = options._setup ?? options.setup

  if (!options.name) {
    consoleWarn('The component is missing an explicit name, unable to generate default prop value')

    return options
  }

  if (options._setup) {
    options.setup = function setup (props: Dictionary<any>, ctx) {
      const vm = getCurrentInstance()!
      const defaults = useDefaults()

      const _props = shallowReactive({ ...toRaw(props) })
      watchEffect(() => {
        const globalDefaults = defaults.value.global
        const componentDefaults = defaults.value[options.name!]

        for (const prop of Object.keys(props)) {
          let newVal
          if (propIsDefined(vm.vnode, prop)) {
            newVal = props[prop]
          } else {
            newVal = componentDefaults?.[prop] ?? globalDefaults?.[prop] ?? props[prop]
          }
          if (_props[prop] !== newVal) {
            _props[prop] = newVal
          }
        }
      })

      return options._setup(_props, ctx)
    }
  }

  return options
}) as unknown as typeof _defineComponent

export function genericComponent<T extends (new () => Partial<ComponentPublicInstance>)> ():
<
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string
>(options: ComponentOptionsWithObjectProps<
  PropsOptions,
  RawBindings,
  D,
  C,
  M,
  Mixin,
  Extends,
  E,
  EE
>) => (new () => Omit<
    InstanceType<DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>>,
    keyof InstanceType<T>
  > & InstanceType<T>) {
  return options => defineComponent(options) as any
}

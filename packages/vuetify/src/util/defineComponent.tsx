// Utils
import {
  defineComponent as _defineComponent,
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
  ComponentOptions,
  ComponentOptionsMixin,
  ComponentOptionsWithObjectProps,
  ComponentPropsOptions,
  ComputedOptions,
  DefineComponent,
  EmitsOptions,
  MethodOptions,
  VNode,
  VNodeChild,
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
    options.setup = function setup (props: Record<string, any>, ctx) {
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

type ToListeners<T extends string | number | symbol> = { [K in T]: K extends `on${infer U}` ? Uncapitalize<U> : K }[T]
export type SlotsToProps<T extends Record<string, Slot>> = {
  $children: () => (T['default'] | VNodeChild | { [K in keyof T]?: T[K] })
  'v-slots': new () => { [K in keyof T]?: T[K] | false }
}/* & { // TODO: individual slots are never converted from the constructor type
  [K in keyof T as `v-slot:${K & string}`]?: new () => (T[K] | false)
} */

type Slot<T extends any[] = any[]> = (...args: T) => VNodeChild
export type MakeSlots<T extends Record<string, any[]>> = {
  [K in keyof T]?: Slot<T[K]>
}

export function genericComponent<T extends (new () => {
  $slots?: Record<string, Slot>
})> (exposeDefaults = true): <
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string,
  I = InstanceType<T>,
  Base = DefineComponent<
    (I extends Record<'$props', any> ? Omit<PropsOptions, keyof I['$props']> : PropsOptions) & (
      I extends Record<'$slots', any>
        ? SlotsToProps<I['$slots']>
        : {}
    ),
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E extends any[] ? E : I extends Record<'$props', any> ? Omit<E, ToListeners<keyof I['$props']>> : E,
    EE
  >
>(options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>) => Base & T {
  return options => (exposeDefaults ? defineComponent : _defineComponent)(options) as any
}

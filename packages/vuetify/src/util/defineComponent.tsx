// Utils
import {
  defineComponent as _defineComponent, // eslint-disable-line no-restricted-imports
  getCurrentInstance,
  shallowReactive,
  shallowRef,
  toRaw,
  watchEffect,
} from 'vue'
import { consoleWarn } from '@/util/console'
import { mergeDeep, toKebabCase } from '@/util/helpers'
import { injectSelf } from '@/util/injectSelf'
import { DefaultsSymbol, provideDefaults, useDefaults } from '@/composables/defaults'
import { useToggleScope } from '@/composables/toggleScope'

// Types
import type {
  ComponentObjectPropsOptions,
  ComponentOptions,
  ComponentOptionsMixin,
  ComponentOptionsWithObjectProps,
  ComponentPropsOptions,
  ComputedOptions,
  DefineComponent,
  EmitsOptions,
  ExtractDefaultPropTypes,
  ExtractPropTypes,
  FunctionalComponent,
  MethodOptions,
  VNode,
  VNodeChild,
} from 'vue'
import { propsFactory } from '@/util/propsFactory'

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
    options.props = options.props ?? {}

    options.props = propsFactory(options.props, toKebabCase(options.name))()

    options.props._as = String
    options.setup = function setup (props: Record<string, any>, ctx) {
      const vm = getCurrentInstance()!
      const defaults = useDefaults()

      const _subcomponentDefaults = shallowRef()
      const _props = shallowReactive({ ...toRaw(props) })
      watchEffect(() => {
        const globalDefaults = defaults.value.global
        const componentDefaults = defaults.value[props._as ?? options.name!]

        if (componentDefaults) {
          const subComponents = Object.entries(componentDefaults).filter(([key]) => key.startsWith(key[0].toUpperCase()))
          if (subComponents.length) _subcomponentDefaults.value = Object.fromEntries(subComponents)
        }

        for (const prop of Object.keys(props)) {
          let newVal = props[prop]
          if (!propIsDefined(vm.vnode, prop)) {
            newVal = componentDefaults?.[prop] ?? globalDefaults?.[prop] ?? props[prop]
          }
          if (_props[prop] !== newVal) {
            _props[prop] = newVal
          }
        }
      })

      const setupBindings = options._setup(_props, ctx)

      useToggleScope(_subcomponentDefaults, () => {
        provideDefaults(mergeDeep(injectSelf(DefaultsSymbol)?.value ?? {}, _subcomponentDefaults.value))
      })

      return setupBindings
    }
  }

  return options
}) as unknown as typeof _defineComponent

type ToListeners<T extends string | number | symbol> = { [K in T]: K extends `on${infer U}` ? Uncapitalize<U> : K }[T]

export type SlotsToProps<T extends Record<string, any>> = T extends Record<string, Slot> ? ({
  $children?: (
    | VNodeChild
    | (keyof T extends 'default' ? T['default'] : {})
    | { [K in keyof T]?: T[K] }
  )
  'v-slots'?: { [K in keyof T]?: T[K] | false }
} & {
  [K in keyof T as `v-slot:${K & string}`]?: T[K] | false
}) : T extends Record<string, any[]> ? SlotsToProps<MakeSlots<T>> : never

type Slot<T extends any[] = any[]> = (...args: T) => VNodeChild
export type MakeSlots<T extends Record<string, any[]>> = {
  [K in keyof T]?: Slot<T[K]>
}

export function genericComponent<T extends (new () => {
  $props?: Record<string, any>
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
    I extends Record<'$props', any>
      ? Omit<PropsOptions, keyof I['$props']>
      : PropsOptions,
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

export function defineFunctionalComponent<
  T extends FunctionalComponent<Props>,
  PropsOptions = ComponentObjectPropsOptions,
  Defaults = ExtractDefaultPropTypes<PropsOptions>,
  Props = Readonly<ExtractPropTypes<PropsOptions>>,
> (props: PropsOptions, render: T): FunctionalComponent<Partial<Defaults> & Omit<Props, keyof Defaults>> {
  render.props = props as any
  return render as any
}

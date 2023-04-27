// Utils
import {
  defineComponent as _defineComponent, // eslint-disable-line no-restricted-imports
} from 'vue'
import { consoleWarn } from '@/util/console'
import { pick, toKebabCase } from '@/util/helpers'
import { propsFactory } from '@/util/propsFactory'
import { injectDefaults, internalUseDefaults } from '@/composables/defaults'

// Types
import type {
  AllowedComponentProps,
  ComponentCustomProps,
  ComponentObjectPropsOptions,
  ComponentOptions,
  ComponentOptionsMixin,
  ComponentOptionsWithObjectProps,
  ComponentOptionsWithoutProps,
  ComponentPropsOptions,
  ComputedOptions,
  DefineComponent,
  EmitsOptions,
  ExtractDefaultPropTypes,
  ExtractPropTypes,
  FunctionalComponent,
  MethodOptions,
  ObjectEmitsOptions,
  VNodeChild,
  VNodeProps,
} from 'vue'

// No props
export function defineComponent<
  Props = {},
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = {},
  EE extends string = string,
  I extends {} = {},
  II extends string = string
>(
  options: ComponentOptionsWithoutProps<
    Props,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    EE,
    I,
    II
  >
): DefineComponent<Props, RawBindings, D, C, M, Mixin, Extends, E, EE>

// Object Props
export function defineComponent<
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = {},
  EE extends string = string,
  I extends {} = {},
  II extends string = string
>(
  options: ComponentOptionsWithObjectProps<
    PropsOptions,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    EE,
    I,
    II
  >
): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE> & FilterPropsOptions<PropsOptions>

// Implementation
export function defineComponent (options: ComponentOptions) {
  options._setup = options._setup ?? options.setup

  if (!options.name) {
    consoleWarn('The component is missing an explicit name, unable to generate default prop value')

    return options
  }

  if (options._setup) {
    options.props = propsFactory(options.props ?? {}, toKebabCase(options.name))()
    const propKeys = Object.keys(options.props)
    options.filterProps = function filterProps (props: Record<string, any>) {
      return pick(props, propKeys, ['class', 'style'])
    }

    options.props._as = String
    options.setup = function setup (props: Record<string, any>, ctx) {
      const defaults = injectDefaults()

      // Skip props proxy if defaults are not provided
      if (!defaults.value) return options._setup(props, ctx)

      const { props: _props, provideSubDefaults } = internalUseDefaults(props, props._as ?? options.name, defaults)

      const setupBindings = options._setup(_props, ctx)

      provideSubDefaults()

      return setupBindings
    }
  }

  return options
}

type ToListeners<T extends string | number | symbol> = { [K in T]: K extends `on${infer U}` ? Uncapitalize<U> : K }[T]

export type SlotsToProps<
  U extends Record<string, any[]> | Record<string, Slot>,
  T = U extends Record<string, any[]> ? MakeSlots<U> : U
> = {
  $children?: (
    | VNodeChild
    | (T extends { default: infer V } ? V : {})
    | { [K in keyof T]?: T[K] }
  )
  'v-slots'?: { [K in keyof T]?: T[K] | false }
} & {
  [K in keyof T as `v-slot:${K & string}`]?: T[K] | false
}

type Slot<T extends any[] = any[]> = (...args: T) => VNodeChild
export type MakeSlots<T extends Record<string, any[]> | Record<string, Slot>> = {
  [K in keyof T]: T[K] extends any[] ? Slot<T[K]> : T[K]
}

export type GenericProps<Props, Slots extends Record<string, any[]>> = {
  $props: Props & SlotsToProps<Slots>
  $slots: MakeSlots<Slots>
}

type DefineComponentWithGenericProps<T extends (new (props: Record<string, any>) => {
  $props?: Record<string, any>
})> = <
  PropsOptions extends Readonly<ComponentObjectPropsOptions>,
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
>(
  options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>
) => Base & T & FilterPropsOptions<PropsOptions>

type DefineComponentWithSlots<Slots extends Record<string, any[]> | Record<string, Slot>> = <
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string,
>(
  options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>
) => DefineComponent<
  ExtractPropTypes<PropsOptions> & SlotsToProps<Slots>,
  RawBindings,
  D,
  C,
  M,
  Mixin,
  Extends,
  E,
  EE,
  PublicProps,
  ExtractPropTypes<PropsOptions> & SlotsToProps<Slots> & ({} extends E ? {} : EmitsToProps<E>),
  ExtractDefaultPropTypes<PropsOptions>
> & FilterPropsOptions<PropsOptions>

// No argument - simple default slot
export function genericComponent (exposeDefaults?: boolean): DefineComponentWithSlots<{ default: [] }>

// Generic constructor argument - generic props and slots
export function genericComponent<T extends (new (props: Record<string, any>) => {
  $props?: Record<string, any>
})> (exposeDefaults?: boolean): DefineComponentWithGenericProps<T>

// Slots argument - simple slots
export function genericComponent<
  Slots extends Record<string, any[]> | Record<string, Slot>
> (exposeDefaults?: boolean): DefineComponentWithSlots<Slots>

// Implementation
export function genericComponent (exposeDefaults = true) {
  return (options: any) => ((exposeDefaults ? defineComponent : _defineComponent) as any)(options)
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

type EmitsToProps<T extends EmitsOptions> = T extends string[]
  ? {
    [K in string & `on${Capitalize<T[number]>}`]?: (...args: any[]) => any
  }
  : T extends ObjectEmitsOptions
    ? {
      [K in string &
        `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}`
        ? T[Uncapitalize<C>] extends null
          ? (...args: any[]) => any
          : (
            ...args: T[Uncapitalize<C>] extends (...args: infer P) => any
              ? P
              : never
          ) => any
        : never
    }
    : {}

type PublicProps =
  & VNodeProps
  & AllowedComponentProps
  & ComponentCustomProps

// Adds a filterProps method to the component options
export interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
  filterProps<
    T extends Partial<Props>,
    U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>
  > (props: T): [yes: Partial<Pick<T, U>>, no: Omit<T, U>]
}

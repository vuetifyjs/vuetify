// Types
import type {
  AllowedComponentProps,
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  EmitsOptions,
  ObjectEmitsOptions,
  SlotsType,
  VNode,
  VNodeChild,
  VNodeProps,
} from 'vue'

export type ToListeners<T extends string | number | symbol> = { [K in T]: K extends `on${infer U}` ? Uncapitalize<U> : K }[T]

export type SlotsToProps<
  U extends RawSlots,
  T = MakeInternalSlots<U>
> = {
  $children?: (
    | VNodeChild
    | (T extends { default: infer V } ? V : {})
    | { [K in keyof T]?: T[K] }
    | { $stable?: boolean }
  )
  'v-slots'?: { [K in keyof T]?: T[K] | false }
} & {
  [K in keyof T as `v-slot:${K & string}`]?: T[K] | false
}

export type RawSlots = Record<string, unknown>
export type Slot<T> = [T] extends [never] ? () => VNodeChild : (arg: T) => VNodeChild
export type VueSlot<T> = [T] extends [never] ? () => VNode[] : (arg: T) => VNode[]
export type MakeInternalSlots<T extends RawSlots> = {
  [K in keyof T]: Slot<T[K]>
}
export type MakeSlots<T extends RawSlots> = {
  [K in keyof T]: VueSlot<T[K]>
}

export type GenericProps<Props, Slots extends Record<string, unknown>> = {
  $props: Props & SlotsToProps<Slots>
  $slots: MakeSlots<Slots>
}

export type GenericConstructor = new (props: Record<string, any>, slots: any) => { $props: Record<string, any> }

// Target for handwritten *.types.d.ts, keep in sync with DefineComponentWithGenericProps and DefineComponentWithSlots
// SlotsOrGeneric: slots record, generic constructor, or null for components without typed slots (defineComponent)
export type VuetifyComponent<
  Props extends Record<string, any>,
  DefaultKeys extends keyof Props = never,
  Emits extends ObjectEmitsOptions = {},
  SlotsOrGeneric extends RawSlots | GenericConstructor | null = { default: never },
  Exposed extends {} = {},
  IsGeneric extends boolean = SlotsOrGeneric extends GenericConstructor ? true : false,
  Slots extends RawSlots = SlotsOrGeneric extends GenericConstructor
    ? ConstructorParameters<SlotsOrGeneric>[1]
    : SlotsOrGeneric extends RawSlots ? SlotsOrGeneric : {},
  GenericKeys extends PropertyKey = SlotsOrGeneric extends GenericConstructor ? keyof InstanceType<SlotsOrGeneric>['$props'] : never,
  BaseEmits extends ObjectEmitsOptions = Omit<Emits, ToListeners<GenericKeys>>,
  BaseProps = Omit<Props, GenericKeys | DefaultKeys> & Required<Pick<Props, Exclude<DefaultKeys, GenericKeys>>>,
> = DefineComponent<
  BaseProps,
  Exposed, {}, {}, {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  BaseEmits,
  string,
  PublicProps,
  (SlotsOrGeneric extends null ? Readonly<BaseProps> : BaseProps)
    & (IsGeneric extends true ? {} : SlotsOrGeneric extends null ? {} : SlotsToProps<Slots>)
    & ({} extends BaseEmits ? {} : EmitsToProps<BaseEmits>),
  Pick<Required<Props>, Exclude<DefaultKeys, GenericKeys>>,
  SlotsOrGeneric extends null ? {} : SlotsType<Partial<MakeSlots<Slots>>>
> & (IsGeneric extends true ? SlotsOrGeneric : {}) & {
  filterProps<T extends Partial<Props>> (props: T): Partial<Pick<T, keyof Props & keyof T>>
}

export type EmitsToProps<T extends EmitsOptions> = T extends string[]
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

export type PublicProps =
  & VNodeProps
  & AllowedComponentProps
  & ComponentCustomProps

// Types
import type { IgnoreAccents } from '@vuetify/v0'
import type { Ref, ShallowRef, StyleValue, WritableComputedRef } from 'vue'
import type { VFieldSlots } from '@/components/VField/VField.types'
import type { VInputSlots } from '@/components/VInput/VInput.types'
import type { VList } from '@/components/VList/VList.types'
import type { VMenu } from '@/components/VMenu/VMenu.types'
import type { VTextField } from '@/components/VTextField/VTextField.types'
import type { Density } from '@/composables/density.types'
import type { FilterFunction, FilterKeyFunctions, FilterKeys, FilterMode } from '@/composables/filter.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { ListItem } from '@/composables/list-items.types'
import type { ValidateOn, ValidationResult } from '@/composables/validation.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { SelectItemKey, ValueComparator } from '@/util/shared.types'

export type ItemType<T> = T extends readonly (infer U)[] ? U : never

export type Value <T, ReturnObject extends boolean, Multiple extends boolean> =
  Multiple extends true
    ? readonly Val<T, ReturnObject>[]
    : Val<T, ReturnObject> | null

export type Val <T, ReturnObject extends boolean> = string | ([T] extends [Primitive]
  ? T
  : (ReturnObject extends true ? T : any))

export type Primitive = string | number | boolean | symbol

export interface VComboboxProps {
  active?: boolean
  alwaysFilter?: boolean
  appendIcon?: IconValue
  appendInnerIcon?: IconValue
  autocomplete?: string
  autofocus?: boolean
  autoSelectFirst?: boolean | 'exact'
  baseColor?: string
  bgColor?: string
  centerAffix?: boolean
  chips?: boolean
  class?: any
  clearable?: boolean
  clearIcon?: IconValue
  clearOnSelect?: boolean
  closableChips?: boolean
  closeOnInputClick?: boolean
  closeText?: string
  color?: string
  counter?: string | number | boolean | null
  counterValue?: number | ((value: any) => number)
  customFilter?: FilterFunction
  customKeyFilter?: FilterKeyFunctions
  delimiters?: readonly string[]
  density?: Density
  detailsActive?: boolean
  disabled?: boolean
  eager?: boolean
  error?: boolean
  errorMessages?: string | readonly string[] | null
  filterKeys?: FilterKeys
  filterMode?: FilterMode
  flat?: boolean
  focused?: boolean
  form?: string
  glow?: boolean
  hideDetails?: boolean | 'auto'
  hideNoData?: boolean
  hideSelected?: boolean
  hideSpinButtons?: boolean
  hint?: string
  iconColor?: string | boolean
  id?: string
  ignoreAccents?: IgnoreAccents
  indentDetails?: boolean
  itemChildren?: SelectItemKey
  itemColor?: string
  itemProps?: SelectItemKey
  items?: any[]
  itemTitle?: SelectItemKey
  itemType?: SelectItemKey
  itemValue?: SelectItemKey
  label?: string
  listProps?: VList['$props']
  loading?: string | boolean
  maxErrors?: string | number
  maxWidth?: string | number
  menu?: boolean
  menuElevation?: string | number
  menuIcon?: IconValue
  menuProps?: VMenu['$props']
  messages?: string | readonly string[]
  minWidth?: string | number
  modelModifiers?: Record<string, boolean>
  modelValue?: any
  multiple?: boolean
  name?: string
  noAutoScroll?: boolean
  noDataText?: string
  noFilter?: boolean
  'onClick:append'?: ((args_0: MouseEvent) => void)
  'onClick:appendInner'?: ((args_0: MouseEvent) => void)
  'onClick:clear'?: ((args_0: MouseEvent) => void)
  'onClick:prepend'?: ((args_0: MouseEvent) => void)
  'onClick:prependInner'?: ((args_0: MouseEvent) => void)
  'onUpdate:focused'?: ((args_0: boolean) => void)
  openOnClear?: boolean
  openOnFocus?: boolean
  openText?: string
  persistentClear?: boolean
  persistentCounter?: boolean
  persistentHint?: boolean
  persistentPlaceholder?: boolean
  placeholder?: string
  prefix?: string
  prependIcon?: IconValue
  prependInnerIcon?: IconValue
  readonly?: boolean | null
  returnObject?: boolean
  reverse?: boolean
  role?: string
  rounded?: string | number | boolean
  rules?: readonly (string | boolean | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>) | [string, any, (string | undefined)?])[]
  singleLine?: boolean
  style?: StyleValue
  suffix?: string
  theme?: string
  tile?: boolean
  trimValues?: boolean
  type?: string
  validateOn?: ValidateOn
  valueComparator?: ValueComparator
  variant?: 'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled'
  width?: string | number
}

export type VComboboxDefaultKeys =
  | 'active'
  | 'alwaysFilter'
  | 'autofocus'
  | 'centerAffix'
  | 'chips'
  | 'clearable'
  | 'clearIcon'
  | 'clearOnSelect'
  | 'closableChips'
  | 'closeOnInputClick'
  | 'closeText'
  | 'counter'
  | 'density'
  | 'detailsActive'
  | 'disabled'
  | 'eager'
  | 'error'
  | 'errorMessages'
  | 'filterKeys'
  | 'filterMode'
  | 'flat'
  | 'focused'
  | 'glow'
  | 'hideNoData'
  | 'hideSelected'
  | 'hideSpinButtons'
  | 'indentDetails'
  | 'itemChildren'
  | 'itemProps'
  | 'items'
  | 'itemTitle'
  | 'itemType'
  | 'itemValue'
  | 'maxErrors'
  | 'menu'
  | 'menuIcon'
  | 'messages'
  | 'modelValue'
  | 'multiple'
  | 'noAutoScroll'
  | 'noDataText'
  | 'noFilter'
  | 'openOnClear'
  | 'openOnFocus'
  | 'openText'
  | 'persistentClear'
  | 'persistentCounter'
  | 'persistentHint'
  | 'persistentPlaceholder'
  | 'readonly'
  | 'returnObject'
  | 'reverse'
  | 'role'
  | 'rounded'
  | 'rules'
  | 'singleLine'
  | 'style'
  | 'tile'
  | 'trimValues'
  | 'type'
  | 'variant'

export declare const VCombobox: VuetifyComponent<
  VComboboxProps,
  VComboboxDefaultKeys,
  {
    'update:focused': (focused: boolean) => true
    'update:modelValue': (value: any) => true
    'update:search': (value: string) => true
    'update:menu': (value: boolean) => true
    'item:added': (item: ListItem<any>) => true
    'item:removed': (item: ListItem<any>) => true
    'item:created': (item: ListItem<any>) => true
  },
  new <
    T extends readonly any[],
    Item = ItemType<T>,
    ReturnObject extends boolean = true,
    Multiple extends boolean = false,
    V extends Value<Item, ReturnObject, Multiple> = Value<Item, ReturnObject, Multiple>
  >(
    props: {
      items?: T
      itemTitle?: SelectItemKey<ItemType<T>>
      itemValue?: SelectItemKey<ItemType<T>>
      itemProps?: SelectItemKey<ItemType<T>>
      returnObject?: ReturnObject
      multiple?: Multiple
      modelValue?: V | null
      'onUpdate:modelValue'?: (value: V) => void
    },
    slots: Omit<VInputSlots & VFieldSlots, 'default'> & {
      item: { item: Item, internalItem: ListItem<Item>, index: number, props: Record<string, unknown> }
      chip: { item: Item, internalItem: ListItem<Item>, index: number, props: Record<string, unknown> }
      selection: { item: Item, internalItem: ListItem<Item>, index: number }
      subheader: { props: Record<string, unknown>, index: number }
      divider: { props: Record<string, unknown>, index: number }
      'prepend-item': never
      'append-item': never
      'no-data': never
      'menu-header': { search: Ref<string | undefined>, filteredItems: ListItem<Item>[] }
      'menu-footer': { search: Ref<string | undefined>, filteredItems: ListItem<Item>[] }
    }
  ) => GenericProps<typeof props, typeof slots>,
  ForwardRefs<{ isFocused: ShallowRef<boolean, boolean>, isPristine: ShallowRef<boolean, boolean>, menu: WritableComputedRef<boolean, boolean>, search: WritableComputedRef<string, string>, selectionIndex: ShallowRef<number, number>, filteredItems: ShallowRef<ListItem<any>[], ListItem<any>[]>, select: (item: ListItem<any> | undefined, set?: boolean | null, keepMenu?: boolean) => void }, [VTextField]>
>
export type VCombobox = InstanceType<typeof VCombobox>

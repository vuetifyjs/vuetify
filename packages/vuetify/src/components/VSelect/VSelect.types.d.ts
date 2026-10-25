// Types
import type { Component, Ref, ShallowRef, WritableComputedRef } from 'vue'
import type { VFieldSlots } from '@/components/VField/VField.types'
import type { VInputSlots } from '@/components/VInput/VInput.types'
import type { VList } from '@/components/VList/VList.types'
import type { VMenu } from '@/components/VMenu/VMenu.types'
import type { TransitionValue } from '@/components/VOverlay/VOverlay.types'
import type { VTextField, VTextFieldProps } from '@/components/VTextField/VTextField.types'
import type { FilterProps } from '@/composables/filter.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { ListItem } from '@/composables/list-items.types'
import type { DefaultKeysOf, GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { SelectItemKey, ValueComparator } from '@/util/shared.types'

export interface VSelectBaseProps {
  chips?: boolean
  closableChips?: boolean
  closeText?: string
  eager?: boolean
  form?: string
  hideNoData?: boolean
  hideSelected?: boolean
  itemChildren?: SelectItemKey
  itemColor?: string
  itemProps?: SelectItemKey
  items?: any[]
  itemTitle?: SelectItemKey
  itemType?: SelectItemKey
  itemValue?: SelectItemKey
  listProps?: VList['$props']
  menu?: boolean
  /** @deprecated use menuProps.contentClass instead */
  menuElevation?: string | number
  menuIcon?: IconValue
  menuProps?: VMenu['$props']
  multiple?: boolean
  noAutoScroll?: boolean
  noDataText?: string
  openOnClear?: boolean
  openOnFocus?: boolean
  openText?: string
  returnObject?: boolean
  valueComparator?: ValueComparator
}

type VSelectBaseDefaultKeys =
  | 'chips'
  | 'closableChips'
  | 'closeText'
  | 'eager'
  | 'hideNoData'
  | 'hideSelected'
  | 'itemChildren'
  | 'itemProps'
  | 'items'
  | 'itemTitle'
  | 'itemType'
  | 'itemValue'
  | 'menu'
  | 'menuIcon'
  | 'multiple'
  | 'noAutoScroll'
  | 'noDataText'
  | 'openOnClear'
  | 'openOnFocus'
  | 'openText'
  | 'returnObject'

export interface VSelectProps extends Omit<VTextFieldProps, 'validationValue' | 'dirty'>, VSelectBaseProps, Omit<FilterProps, 'filteredOrder'> {
  search?: string
  transition?: TransitionValue | { component: Component }
}

type VSelectDefaultKeys =
  | Exclude<DefaultKeysOf<typeof VTextField>, 'dirty'>
  | VSelectBaseDefaultKeys
  | 'filterKeys'
  | 'filterMode'
  | 'modelValue'
  | 'noFilter'
  | 'role'
  | 'transition'

type Primitive = string | number | boolean | symbol
type ItemType<T> = T extends readonly (infer U)[] ? U : never

type Val<T, ReturnObject extends boolean> = [T] extends [Primitive]
  ? T
  : (ReturnObject extends true ? T : any)

export type SelectValue<T, ReturnObject extends boolean, Multiple extends boolean> =
  Multiple extends true
    ? readonly Val<T, ReturnObject>[]
    : Val<T, ReturnObject> | null

export type VSelectSlots<Item> = Omit<VInputSlots & VFieldSlots, 'default'> & {
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

export type VSelectGeneric = new <
  T extends readonly any[],
  Item = ItemType<T>,
  ReturnObject extends boolean = false,
  Multiple extends boolean = false,
  V extends SelectValue<Item, ReturnObject, Multiple> = SelectValue<Item, ReturnObject, Multiple>
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
  slots: VSelectSlots<Item>
) => GenericProps<typeof props, typeof slots>

export type VSelectExposed = ForwardRefs<{ isFocused: ShallowRef<boolean, boolean>, menu: WritableComputedRef<boolean, boolean>, search: Ref<string | undefined, string | undefined> & { readonly externalValue: string | undefined }, filteredItems: ShallowRef<ListItem<any>[], ListItem<any>[]>, select: (item: ListItem<any>, set?: boolean | null, closeMenu?: boolean) => void }, [VTextField]>

export declare const VSelect: VuetifyComponent<
  VSelectProps,
  VSelectDefaultKeys,
  {
    'update:focused': (focused: boolean) => true
    'update:modelValue': (value: any) => true
    'update:menu': (ue: boolean) => true
    'update:search': (value: string) => true
    'item:added': (item: ListItem) => true
    'item:removed': (item: ListItem) => true
  },
  VSelectGeneric,
  VSelectExposed
>
export type VSelect = InstanceType<typeof VSelect>

export {}

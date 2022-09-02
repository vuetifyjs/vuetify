// Utilities
import { computed } from 'vue'
import { getPropertyFromItem, pick, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { SelectItemKey } from '@/util'

export interface InternalItem<T> {
  title: string
  value: any
  props: {
    [key: string]: any
    title: string
    value: any
  }
  children?: InternalItem<T>[]
  raw: T
}

export interface ItemProps<T> {
  items: T[]
  itemTitle: SelectItemKey
  itemValue: SelectItemKey
  itemChildren: SelectItemKey
  itemProps: SelectItemKey
  itemType: SelectItemKey
  returnObject: boolean
}

// Composables
export const makeItemsProps = propsFactory({
  items: {
    type: Array as PropType<ItemProps<any>['items']>,
    default: () => ([]),
  },
  itemTitle: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: 'title',
  },
  itemValue: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: 'value',
  },
  itemChildren: {
    type: [Boolean, String, Array, Function] as PropType<SelectItemKey>,
    default: 'children',
  },
  itemProps: {
    type: [Boolean, String, Array, Function] as PropType<SelectItemKey>,
    default: 'props',
  },
  itemType: {
    type: [Boolean, String, Array, Function] as PropType<SelectItemKey>,
    default: 'type',
  },
  returnObject: Boolean,
}, 'item')

export function transformItem <T> (props: Omit<ItemProps<T>, 'items'>, item: T) {
  const type = getPropertyFromItem(item, props.itemType, 'item')
  const title = getPropertyFromItem(item, props.itemTitle, item)
  const value = getPropertyFromItem(item, props.itemValue, title)
  const children = getPropertyFromItem(item, props.itemChildren)
  const itemProps = props.itemProps === true
    ? typeof item === 'object' && item != null && !Array.isArray(item)
      ? 'children' in item
        ? pick(item as any, ['children'])[1]
        : item
      : undefined
    : getPropertyFromItem(item, props.itemProps)

  const _props = {
    title,
    value,
    ...itemProps,
  }

  return {
    type,
    title: String(_props.title ?? ''),
    value: _props.value,
    props: _props,
    children: Array.isArray(children) ? transformItems(props, children) : undefined,
    raw: item,
  }
}

export function transformItems <T> (props: Omit<ItemProps<T>, 'items'>, items: ItemProps<T>['items']) {
  const array: InternalItem<T>[] = []

  for (const item of items) {
    array.push(transformItem(props, item))
  }

  return array
}

export function useItems <T> (props: ItemProps<T>) {
  const items = computed(() => transformItems(props, props.items))

  function transformIn <T> (value: any[]): InternalItem<T>[] {
    return value.map(item => transformItem(props, item))
  }

  function transformOut <T> (value: InternalItem<T>[]) {
    if (props.returnObject) return value.map(({ raw: item }) => item)
    return value.map(({ props }) => props.value)
  }

  return { items, transformIn, transformOut }
}

// Utilities
import { computed } from 'vue'
import { getObjectValueByPath, getPropertyFromItem, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { SelectItemKey } from '@/util'

export interface InternalItem {
  props: {
    [key: string]: any
    title: string
    value: any
  }
  children?: InternalItem[]
  item: unknown
}

export interface ItemProps {
  items: (string | object)[]
  itemTitle: SelectItemKey
  itemValue: SelectItemKey
  itemChildren: string
  itemProps: (item: string | object) => object
}

// Composables
export const makeItemsProps = propsFactory({
  items: {
    type: Array as PropType<ItemProps['items']>,
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
    type: String,
    default: 'children',
  },
  itemProps: {
    type: Function as PropType<ItemProps['itemProps']>,
    default: (item: any) => ({}),
  },
}, 'item')

export function transformItem (props: ItemProps, item: any) {
  const title = getPropertyFromItem(item, props.itemTitle, item)
  const value = getPropertyFromItem(item, props.itemValue, title)
  const children = getObjectValueByPath(item, props.itemChildren)

  return {
    props: {
      title,
      value,
      ...props.itemProps?.(item),
    },
    children: Array.isArray(children) ? transformItems(props, children) : undefined,
    item,
  }
}

export function transformItems (props: ItemProps, items: ItemProps['items']) {
  const array: InternalItem[] = []

  for (const item of items) {
    array.push(transformItem(props, item))
  }

  return array
}

export function useItems (props: ItemProps) {
  const items = computed(() => transformItems(props, props.items))

  return { items }
}

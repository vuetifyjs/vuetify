// Utilities
import { computed } from 'vue'
import { getObjectValueByPath, getPropertyFromItem, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

export interface InternalItem {
  [key: string]: any
  title: string
  value: any
  children?: InternalItem[]
}

export interface ItemProps {
  items: (string | Partial<InternalItem>)[]
  itemTitle: string
  itemValue: any
  itemChildren: string
  itemProps: (item: any) => Partial<InternalItem>
}

// Composables
export const makeItemsProps = propsFactory({
  items: {
    type: Array as PropType<ItemProps['items']>,
    default: () => ([]),
  },
  itemTitle: {
    type: String,
    default: 'title',
  },
  itemValue: {
    type: String,
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
  const children = getObjectValueByPath(item, props.itemChildren, [])

  const newItem = {
    title,
    value,
    ...props.itemProps?.(item),
  }

  if (children.length) newItem.children = transformItems(props, children)

  return newItem
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

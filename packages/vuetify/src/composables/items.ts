// Utilities
import { computed } from 'vue'
import { getPropertyFromItem, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

export interface InternalItem {
  [key: string]: any
  children?: InternalItem[]
  title: string
  value: any
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

export function useItems (props: ItemProps) {
  function transformItems (items: ItemProps['items']) {
    const array: InternalItem[] = []

    for (const item of items) {
      const children = transformItems(getPropertyFromItem(item, props.itemChildren, []))

      const newItem = {
        title: getPropertyFromItem(item, props.itemTitle, item),
        value: getPropertyFromItem(item, props.itemValue, item),
        ...props.itemProps(item),
      }

      if (children.length) newItem.children = children

      array.push(newItem)
    }

    return array
  }

  const items = computed(() => transformItems(props.items))

  return { items }
}

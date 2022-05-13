// Utilities
import { computed } from 'vue'
import { getPropertyFromItem, propsFactory } from '@/util'

// Types
export interface ItemProps {
  [key: string]: any
}

// Composables
export const makeItemsProps = propsFactory({
  items: {
    type: Array,
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
    type: Function,
    default: (item: any) => ({}),
  },
}, 'item')

export function useItems (props: ItemProps) {
  const items = computed(() => {
    const array = []

    for (const item of props.items) {
      const children = item[props.itemChildren]

      const newItem = {
        title: getPropertyFromItem(item, props.itemTitle, item),
        value: getPropertyFromItem(item, props.itemValue, item),
        ...props.itemProps(item),
      }

      if (children) newItem.children = children

      array.push(newItem)
    }

    return array
  })

  return { items }
}

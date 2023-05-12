// Utilities
import { computed } from 'vue'
import type { SelectItemKey } from '@/util'
import { getPropertyFromItem, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

export interface DataIteratorItemProps {
  items: any[]
  itemValue: SelectItemKey
  returnObject: boolean
}

export interface DataIteratorItem<T = any> {
  type: 'item'
  value: unknown
  raw: T
}

// Composables
export const makeDataIteratorItemProps = propsFactory({
  items: {
    type: Array as PropType<DataIteratorItemProps['items']>,
    default: () => ([]),
  },
  itemValue: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: 'value',
  },
  returnObject: Boolean,
}, 'v-data-iterator-item')

export function transformItem (
  props: Omit<DataIteratorItemProps, 'items'>,
  item: any
): DataIteratorItem {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue)

  return {
    type: 'item',
    value,
    raw: item,
  }
}

export function transformItems (
  props: Omit<DataIteratorItemProps, 'items'>,
  items: DataIteratorItemProps['items']
) {
  const array: DataIteratorItem[] = []

  for (const item of items) {
    array.push(transformItem(props, item))
  }

  return array
}

export function useDataIteratorItems (props: DataIteratorItemProps) {
  const items = computed(() => transformItems(props, props.items))

  return { items }
}

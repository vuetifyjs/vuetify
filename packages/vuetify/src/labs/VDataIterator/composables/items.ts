// Utilities
import { computed } from 'vue'
import { getPropertyFromItem, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { GroupableItem } from '@/labs/VDataTable/composables/group'
import type { SelectableItem } from '@/labs/VDataTable/composables/select'
import type { SelectItemKey } from '@/util'

export interface DataIteratorItemProps {
  items: any[]
  itemValue: SelectItemKey
  itemSelectable: SelectItemKey
  returnObject: boolean
}

export interface DataIteratorItem<T = any> extends GroupableItem<T>, SelectableItem {
  value: unknown
}

// Composables
export const makeDataIteratorItemProps = propsFactory({
  items: {
    type: Array as PropType<DataIteratorItemProps['items']>,
    default: () => ([]),
  },
  itemValue: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: 'id',
  },
  itemSelectable: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: null,
  },
  returnObject: Boolean,
}, 'v-data-iterator-item')

export function transformItem (
  props: Omit<DataIteratorItemProps, 'items'>,
  item: any
): DataIteratorItem {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue)
  const selectable = getPropertyFromItem(item, props.itemSelectable, true)

  return {
    type: 'item',
    value,
    selectable,
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

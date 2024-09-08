// Utilities
import { computed } from 'vue'
import { getObjectValueByPath, getPropertyFromItem, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { GroupableItem } from '@/components/VDataTable/composables/group'
import type { SelectableItem } from '@/components/VDataTable/composables/select'
import type { SelectItemId, SelectItemKey } from '@/util'

export interface DataIteratorItemProps {
  items: any[]
  itemId: SelectItemId
  itemValue: SelectItemKey
  itemSelectable: SelectItemKey
  returnObject: boolean
}

export interface DataIteratorItem<T = any> extends GroupableItem<T>, SelectableItem {
  key: any
  value: unknown
}

// Composables
export const makeDataIteratorItemsProps = propsFactory({
  items: {
    type: Array as PropType<DataIteratorItemProps['items']>,
    default: () => ([]),
  },
  itemId: {
    type: [String, Function] as PropType<SelectItemId>,
    default: 'id',
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
}, 'DataIterator-items')

export function transformItem (
  props: Omit<DataIteratorItemProps, 'items'>,
  id: number | string,
  item: any
): DataIteratorItem {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue)
  const selectable = getPropertyFromItem(item, props.itemSelectable, true)

  return {
    type: 'item',
    key: id,
    value,
    selectable,
    raw: item,
  }
}

export function transformItems (
  props: Omit<DataIteratorItemProps, 'items'>,
  items: DataIteratorItemProps['items']
) {
  const itemId = props.itemId
  const getId = typeof itemId === 'function'
    ? (item: any) => itemId(item)
    : (item: any) => getObjectValueByPath(item, itemId)

  const array: DataIteratorItem[] = []

  for (const item of items) {
    array.push(transformItem(props, getId(item), item))
  }

  return array
}

export function useDataIteratorItems (props: DataIteratorItemProps) {
  const items = computed(() => transformItems(props, props.items))

  return { items }
}

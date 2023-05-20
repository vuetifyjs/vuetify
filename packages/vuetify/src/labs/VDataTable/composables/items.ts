// Utilities
import { computed } from 'vue'
import { getPropertyFromItem, propsFactory } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { SelectItemKey } from '@/util'
import type { DataTableItem, InternalDataTableHeader } from '../types'

export interface DataTableItemProps {
  items: any[]
  itemValue: SelectItemKey
  itemSelectable: SelectItemKey
  returnObject: boolean
}

// Composables
export const makeDataTableItemProps = propsFactory({
  items: {
    type: Array as PropType<DataTableItemProps['items']>,
    default: () => ([]),
  },
  itemValue: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: 'value',
  },
  itemSelectable: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: null,
  },
  returnObject: Boolean,
}, 'v-data-table-item')

export function transformItem (
  props: Omit<DataTableItemProps, 'items'>,
  item: any,
  columns: InternalDataTableHeader[]
): DataTableItem {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue)
  const selectable = getPropertyFromItem(item, props.itemSelectable, true)
  const itemColumns = columns.reduce((obj, column) => {
    obj[column.key] = getPropertyFromItem(item, column.value ?? column.key)
    return obj
  }, {} as Record<string, unknown>)

  return {
    type: 'item',
    value,
    selectable,
    columns: itemColumns,
    raw: item,
  }
}

export function transformItems (
  props: Omit<DataTableItemProps, 'items'>,
  items: DataTableItemProps['items'],
  columns: InternalDataTableHeader[]
) {
  const array: DataTableItem[] = []

  for (const item of items) {
    array.push(transformItem(props, item, columns))
  }

  return array
}

export function useDataTableItems (props: DataTableItemProps, columns: Ref<InternalDataTableHeader[]>) {
  const items = computed(() => transformItems(props, props.items, columns.value))

  return { items }
}

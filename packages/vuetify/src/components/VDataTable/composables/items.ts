// Utilities
import { computed } from 'vue'
import { getPropertyFromItem, propsFactory } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { CellProps, DataTableItem, InternalDataTableHeader, RowProps } from '../types'
import type { SelectItemKey } from '@/util'

export interface DataTableItemProps {
  items: any[]
  itemValue: SelectItemKey
  itemSelectable: SelectItemKey
  returnObject: boolean
}

// Composables
export const makeDataTableItemsProps = propsFactory({
  items: {
    type: Array as PropType<DataTableItemProps['items']>,
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
  rowProps: [Object, Function] as PropType<RowProps<any>>,
  cellProps: [Object, Function] as PropType<CellProps<any>>,
  returnObject: Boolean,
}, 'DataTable-items')

export function transformItem (
  props: Omit<DataTableItemProps, 'items'>,
  item: any,
  index: number,
  columns: InternalDataTableHeader[]
): DataTableItem {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue)
  const selectable = getPropertyFromItem(item, props.itemSelectable, true)
  const itemColumns = columns.reduce((obj, column) => {
    if (column.key != null) obj[column.key] = getPropertyFromItem(item, column.value!)
    return obj
  }, {} as Record<string, unknown>)

  return {
    type: 'item',
    key: props.returnObject ? getPropertyFromItem(item, props.itemValue) : value,
    index,
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
): DataTableItem[] {
  return items.map((item, index) => transformItem(props, item, index, columns))
}

export function useDataTableItems (props: DataTableItemProps, columns: Ref<InternalDataTableHeader[]>) {
  const items = computed(() => transformItems(props, props.items, columns.value))

  return { items }
}

// Composables
import { makeItemsProps, useItems } from '@/composables/items'

// Utilities
import { computed } from 'vue'
import { getPropertyFromItem, propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'
import type { ItemProps } from '@/composables/items'
import type { DataTableItem, InternalDataTableHeader } from '../types'

export const makeDataTableItemProps = propsFactory({
  // TODO: Worth it to make specific datatable implementation
  // without title, children?
  ...makeItemsProps({
    itemValue: 'id',
  }),
}, 'v-data-table-item')

export function useDataTableItems (props: ItemProps, columns: Ref<InternalDataTableHeader[]>) {
  const { items } = useItems(props)

  const dataTableItems = computed<DataTableItem[]>(() => items.value.map(item => {
    return {
      ...item,
      type: 'item',
      columns: columns.value.reduce((obj, column) => {
        obj[column.key] = getPropertyFromItem(item.raw, column.value ?? column.key)
        return obj
      }, {} as Record<string, unknown>),
    }
  }))

  return { items: dataTableItems }
}

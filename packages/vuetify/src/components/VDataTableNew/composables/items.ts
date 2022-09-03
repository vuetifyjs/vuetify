import type { ItemProps } from '@/composables/items'
import { makeItemsProps, useItems } from '@/composables/items'
import { getPropertyFromItem, propsFactory } from '@/util'
import type { Ref } from 'vue'
import { computed } from 'vue'
import type { DataTableHeader, DataTableItem } from '../types'

export const makeDataTableItemProps = propsFactory({
  // TODO: Worth it to make specific datatable implementation
  // without title, children?
  ...makeItemsProps({
    itemValue: 'id',
  }),
}, 'v-data-table-item')

export function useDataTableItems (props: ItemProps, columns: Ref<DataTableHeader[]>) {
  const { items } = useItems(props)

  const dataTableItems = computed<DataTableItem[]>(() => items.value.map(item => {
    return {
      ...item,
      type: 'item',
      columns: columns.value.reduce((obj, column) => {
        obj[column.id] = getPropertyFromItem(item.raw, column.value ?? column.id)
        return obj
      }, {} as Record<string, unknown>),
    }
  }))

  return { items: dataTableItems }
}

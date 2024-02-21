// Styles
import './VDataTable.sass'

// Components
import { makeVDataTableFooterProps, VDataTableFooter } from './VDataTableFooter'
import { makeVDataTableHeadersProps, VDataTableHeaders } from './VDataTableHeaders'
import { makeVDataTableRowsProps, VDataTableRows } from './VDataTableRows'
import { VDivider } from '@/components/VDivider'
import { makeVTableProps, VTable } from '@/components/VTable/VTable'

// Composables
import { makeDataTableExpandProps, provideExpanded } from './composables/expand'
import { createGroupBy, makeDataTableGroupProps, provideGroupBy, useGroupedItems } from './composables/group'
import { createHeaders, makeDataTableHeaderProps } from './composables/headers'
import { makeDataTableItemsProps, useDataTableItems } from './composables/items'
import { useOptions } from './composables/options'
import { createPagination, makeDataTablePaginateProps, providePagination, usePaginatedItems } from './composables/paginate'
import { makeDataTableSelectProps, provideSelection } from './composables/select'
import { createSort, makeDataTableSortProps, provideSort, useSortedItems } from './composables/sort'
import { provideDefaults } from '@/composables/defaults'
import { makeFilterProps, useFilter } from '@/composables/filter'

// Utilities
import { computed, toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { DeepReadonly, UnwrapRef } from 'vue'
import type { Group } from './composables/group'
import type { CellProps, DataTableHeader, DataTableItem, InternalDataTableHeader, RowProps } from './types'
import type { VDataTableHeadersSlots } from './VDataTableHeaders'
import type { VDataTableRowsSlots } from './VDataTableRows'
import type { GenericProps, SelectItemKey } from '@/util'

export type VDataTableSlotProps<T> = {
  page: number
  itemsPerPage: number
  sortBy: UnwrapRef<ReturnType<typeof provideSort>['sortBy']>
  pageCount: number
  toggleSort: ReturnType<typeof provideSort>['toggleSort']
  setItemsPerPage: ReturnType<typeof providePagination>['setItemsPerPage']
  someSelected: boolean
  allSelected: boolean
  isSelected: ReturnType<typeof provideSelection>['isSelected']
  select: ReturnType<typeof provideSelection>['select']
  selectAll: ReturnType<typeof provideSelection>['selectAll']
  toggleSelect: ReturnType<typeof provideSelection>['toggleSelect']
  isExpanded: ReturnType<typeof provideExpanded>['isExpanded']
  toggleExpand: ReturnType<typeof provideExpanded>['toggleExpand']
  isGroupOpen: ReturnType<typeof provideGroupBy>['isGroupOpen']
  toggleGroup: ReturnType<typeof provideGroupBy>['toggleGroup']
  items: readonly T[]
  internalItems: readonly DataTableItem[]
  groupedItems: readonly (DataTableItem<T> | Group<DataTableItem<T>>)[]
  columns: InternalDataTableHeader[]
  headers: InternalDataTableHeader[][]
}

export type VDataTableSlots<T> = VDataTableRowsSlots<T> & VDataTableHeadersSlots & {
  default: VDataTableSlotProps<T>
  colgroup: VDataTableSlotProps<T>
  top: VDataTableSlotProps<T>
  body: VDataTableSlotProps<T>
  tbody: VDataTableSlotProps<T>
  thead: VDataTableSlotProps<T>
  tfoot: VDataTableSlotProps<T>
  bottom: VDataTableSlotProps<T>
  'body.prepend': VDataTableSlotProps<T>
  'body.append': VDataTableSlotProps<T>
  'footer.prepend': never
}

export const makeDataTableProps = propsFactory({
  ...makeVDataTableRowsProps(),

  width: [String, Number],
  search: String,

  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeDataTableHeaderProps(),
  ...makeDataTableItemsProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...makeVDataTableHeadersProps(),
  ...makeVTableProps(),
}, 'DataTable')

export const makeVDataTableProps = propsFactory({
  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeFilterProps(),
  ...makeVDataTableFooterProps(),
}, 'VDataTable')

type ItemType<T> = T extends readonly (infer U)[] ? U : never

export const VDataTable = genericComponent<new <T extends readonly any[], V>(
  props: {
    items?: T
    itemValue?: SelectItemKey<ItemType<T>>
    rowProps?: RowProps<ItemType<T>>
    cellProps?: CellProps<ItemType<T>>
    itemSelectable?: SelectItemKey<ItemType<T>>
    headers?: DeepReadonly<DataTableHeader<ItemType<T>>[]>
    modelValue?: V
    'onUpdate:modelValue'?: (value: V) => void
  },
  slots: VDataTableSlots<ItemType<T>>,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VDataTable',

  props: makeVDataTableProps(),

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:page': (value: number) => true,
    'update:itemsPerPage': (value: number) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
    'update:groupBy': (value: any) => true,
    'update:expanded': (value: any) => true,
    'update:currentItems': (value: any) => true,
  },

  setup (props, { attrs, slots }) {
    const { groupBy } = createGroupBy(props)
    const { sortBy, multiSort, mustSort } = createSort(props)
    const { page, itemsPerPage } = createPagination(props)

    const {
      columns,
      headers,
      sortFunctions,
      sortRawFunctions,
      filterFunctions,
    } = createHeaders(props, {
      groupBy,
      showSelect: toRef(props, 'showSelect'),
      showExpand: toRef(props, 'showExpand'),
    })

    const { items } = useDataTableItems(props, columns)

    const search = toRef(props, 'search')
    const { filteredItems } = useFilter(props, items, search, {
      transform: item => item.columns,
      customKeyFilter: filterFunctions,
    })

    const { toggleSort } = provideSort({ sortBy, multiSort, mustSort, page })
    const { sortByWithGroups, opened, extractRows, isGroupOpen, toggleGroup } = provideGroupBy({ groupBy, sortBy })

    const { sortedItems } = useSortedItems(props, filteredItems, sortByWithGroups, sortFunctions, sortRawFunctions)
    const { flatItems } = useGroupedItems(sortedItems, groupBy, opened)
    const itemsLength = computed(() => flatItems.value.length)

    const { startIndex, stopIndex, pageCount, setItemsPerPage } = providePagination({ page, itemsPerPage, itemsLength })
    const { paginatedItems } = usePaginatedItems({ items: flatItems, startIndex, stopIndex, itemsPerPage })

    const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value))

    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
      someSelected,
      allSelected,
    } = provideSelection(props, { allItems: items, currentPage: paginatedItemsWithoutGroups })

    const { isExpanded, toggleExpand } = provideExpanded(props)

    useOptions({
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search,
    })

    provideDefaults({
      VDataTableRows: {
        hideNoData: toRef(props, 'hideNoData'),
        noDataText: toRef(props, 'noDataText'),
        loading: toRef(props, 'loading'),
        loadingText: toRef(props, 'loadingText'),
      },
    })

    const slotProps = computed<VDataTableSlotProps<any>>(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      pageCount: pageCount.value,
      toggleSort,
      setItemsPerPage,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: paginatedItemsWithoutGroups.value.map(item => item.raw),
      internalItems: paginatedItemsWithoutGroups.value,
      groupedItems: paginatedItems.value,
      columns: columns.value,
      headers: headers.value,
    }))

    useRender(() => {
      const dataTableFooterProps = VDataTableFooter.filterProps(props)
      const dataTableHeadersProps = VDataTableHeaders.filterProps(props)
      const dataTableRowsProps = VDataTableRows.filterProps(props)
      const tableProps = VTable.filterProps(props)

      return (
        <VTable
          class={[
            'v-data-table',
            {
              'v-data-table--show-select': props.showSelect,
              'v-data-table--loading': props.loading,
            },
            props.class,
          ]}
          style={ props.style }
          { ...tableProps }
        >
          {{
            top: () => slots.top?.(slotProps.value),
            default: () => slots.default ? slots.default(slotProps.value) : (
              <>
                { slots.colgroup?.(slotProps.value) }
                <thead>
                  <VDataTableHeaders
                    { ...dataTableHeadersProps }
                    v-slots={ slots }
                  />
                </thead>
                { slots.thead?.(slotProps.value) }
                <tbody>
                  { slots['body.prepend']?.(slotProps.value) }
                  { slots.body ? slots.body(slotProps.value) : (
                    <VDataTableRows
                      { ...attrs }
                      { ...dataTableRowsProps }
                      items={ paginatedItems.value }
                      v-slots={ slots }
                    />
                  )}
                  { slots['body.append']?.(slotProps.value) }
                </tbody>
                { slots.tbody?.(slotProps.value) }
                { slots.tfoot?.(slotProps.value) }
              </>
            ),
            bottom: () => slots.bottom ? slots.bottom(slotProps.value) : (
              <>
                <VDivider />

                <VDataTableFooter
                  { ...dataTableFooterProps }
                  v-slots={{
                    prepend: slots['footer.prepend'],
                  }}
                />
              </>
            ),
          }}
        </VTable>
      )
    })

    return {}
  },
})

export type VDataTable = InstanceType<typeof VDataTable>

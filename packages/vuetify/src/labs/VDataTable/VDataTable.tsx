// Styles
import './VDataTable.sass'

// Components
import { makeVDataTableFooterProps, VDataTableFooter } from './VDataTableFooter'
import { makeVDataTableHeadersProps, VDataTableHeaders } from './VDataTableHeaders'
import { makeVDataTableRowsProps, VDataTableRows } from './VDataTableRows'
import { makeVTableProps, VTable } from '@/components/VTable/VTable'

// Composables
import { makeDataTableExpandProps, provideExpanded } from './composables/expand'
import { createGroupBy, makeDataTableGroupProps, provideGroupBy, useGroupedItems } from './composables/group'
import { createHeaders, makeDataTableHeaderProps } from './composables/headers'
import { makeDataTableItemProps, useDataTableItems } from './composables/items'
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
import type { UnwrapRef } from 'vue'
import type { Group } from './composables/group'
import type { DataTableItem, InternalDataTableHeader } from './types'
import type { VDataTableHeadersSlots } from './VDataTableHeaders'
import type { VDataTableRowsSlots } from './VDataTableRows'

export type VDataTableSlotProps = {
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
  items: readonly DataTableItem[]
  groupedItems: readonly (DataTableItem | Group<DataTableItem>)[]
  columns: InternalDataTableHeader[]
  headers: InternalDataTableHeader[][]
}

export type VDataTableSlots = VDataTableRowsSlots & VDataTableHeadersSlots & {
  default: VDataTableSlotProps
  colgroup: VDataTableSlotProps
  top: VDataTableSlotProps
  body: VDataTableSlotProps
  tbody: VDataTableSlotProps
  thead: VDataTableSlotProps
  tfoot: VDataTableSlotProps
  bottom: VDataTableSlotProps
  'footer.prepend': never
}

export const makeDataTableProps = propsFactory({
  ...makeVDataTableRowsProps(),

  width: [String, Number],
  search: String,

  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeDataTableHeaderProps(),
  ...makeDataTableItemProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...makeVDataTableHeadersProps(),
  ...makeVTableProps(),
}, 'data-table')

export const makeVDataTableProps = propsFactory({
  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeFilterProps(),
  ...makeVDataTableFooterProps(),
}, 'v-data-table')

export const VDataTable = genericComponent<VDataTableSlots>()({
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
  },

  setup (props, { emit, slots }) {
    const { groupBy } = createGroupBy(props)
    const { sortBy, multiSort, mustSort } = createSort(props)
    const { page, itemsPerPage } = createPagination(props)

    const { columns, headers } = createHeaders(props, {
      groupBy,
      showSelect: toRef(props, 'showSelect'),
      showExpand: toRef(props, 'showExpand'),
    })

    const { items } = useDataTableItems(props, columns)

    const search = toRef(props, 'search')
    const { filteredItems } = useFilter(props, items, search, { transform: item => item.columns })

    const { toggleSort } = provideSort({ sortBy, multiSort, mustSort, page })
    const { sortByWithGroups, opened, extractRows, isGroupOpen, toggleGroup } = provideGroupBy({ groupBy, sortBy })

    const { sortedItems } = useSortedItems(props, filteredItems, sortByWithGroups)
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

    const slotProps = computed<VDataTableSlotProps>(() => ({
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
      items: paginatedItemsWithoutGroups.value,
      groupedItems: paginatedItems.value,
      columns: columns.value,
      headers: headers.value,
    }))

    useRender(() => {
      const [dataTableFooterProps] = VDataTableFooter.filterProps(props)
      const [dataTableHeadersProps] = VDataTableHeaders.filterProps(props)
      const [dataTableRowsProps] = VDataTableRows.filterProps(props)
      const [tableProps] = VTable.filterProps(props)

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
                  { slots.body ? slots.body(slotProps.value) : (
                    <VDataTableRows
                      { ...dataTableRowsProps }
                      items={ paginatedItems.value }
                      v-slots={ slots }
                    />
                  )}
                </tbody>
                { slots.tbody?.(slotProps.value) }
                { slots.tfoot?.(slotProps.value) }
              </>
            ),
            bottom: () => slots.bottom ? slots.bottom(slotProps.value) : (
              <>
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

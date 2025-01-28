// Components
import { makeDataTableProps } from './VDataTable'
import { makeVDataTableFooterProps, VDataTableFooter } from './VDataTableFooter'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'
import { VDivider } from '@/components/VDivider'
import { VTable } from '@/components/VTable'

// Composables
import { provideExpanded } from './composables/expand'
import { createGroupBy, provideGroupBy, useGroupedItems } from './composables/group'
import { createHeaders } from './composables/headers'
import { useDataTableItems } from './composables/items'
import { useOptions } from './composables/options'
import { createPagination, makeDataTablePaginateProps, providePagination } from './composables/paginate'
import { provideSelection } from './composables/select'
import { createSort, provideSort } from './composables/sort'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { computed, provide, toRef, toRefs } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VDataTableSlotProps, VDataTableSlots } from './VDataTable'
import type { CellProps, RowProps } from '@/components/VDataTable/types'
import type { GenericProps, SelectItemKey } from '@/util'

export const makeVDataTableServerProps = propsFactory({
  itemsLength: {
    type: [Number, String],
    required: true,
  },

  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeVDataTableFooterProps(),
}, 'VDataTableServer')

type ItemType<T> = T extends readonly (infer U)[] ? U : never

export const VDataTableServer = genericComponent<new <T extends readonly any[], V>(
  props: {
    items?: T
    itemValue?: SelectItemKey<ItemType<T>>
    rowProps?: RowProps<ItemType<T>>
    cellProps?: CellProps<ItemType<T>>
    itemSelectable?: SelectItemKey<ItemType<T>>
    modelValue?: V
    'onUpdate:modelValue'?: (value: V) => void
  },
  slots: VDataTableSlots<ItemType<T>>,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VDataTableServer',

  props: makeVDataTableServerProps(),

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:page': (page: number) => true,
    'update:itemsPerPage': (page: number) => true,
    'update:sortBy': (sortBy: any) => true,
    'update:options': (options: any) => true,
    'update:expanded': (options: any) => true,
    'update:groupBy': (value: any) => true,
  },

  setup (props, { attrs, slots }) {
    const { groupBy } = createGroupBy(props)
    const { sortBy, multiSort, mustSort } = createSort(props)
    const { page, itemsPerPage } = createPagination(props)
    const { disableSort } = toRefs(props)
    const itemsLength = computed(() => parseInt(props.itemsLength, 10))

    const { columns, headers } = createHeaders(props, {
      groupBy,
      showSelect: toRef(props, 'showSelect'),
      showExpand: toRef(props, 'showExpand'),
    })

    const { items } = useDataTableItems(props, columns)

    const { toggleSort } = provideSort({ sortBy, multiSort, mustSort, page })

    const { opened, isGroupOpen, toggleGroup, extractRows } = provideGroupBy({ groupBy, sortBy, disableSort })

    const { pageCount, setItemsPerPage } = providePagination({ page, itemsPerPage, itemsLength })

    const { flatItems } = useGroupedItems(items, groupBy, opened)

    const { isSelected, select, selectAll, toggleSelect, someSelected, allSelected } = provideSelection(props, {
      allItems: items,
      currentPage: items,
    })

    const { isExpanded, toggleExpand } = provideExpanded(props)

    const itemsWithoutGroups = computed(() => extractRows(items.value))

    useOptions({
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search: toRef(props, 'search'),
    })

    provide('v-data-table', {
      toggleSort,
      sortBy,
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
      items: itemsWithoutGroups.value.map(item => item.raw),
      internalItems: itemsWithoutGroups.value,
      groupedItems: flatItems.value,
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
                { !props.hideDefaultHeader && (
                  <thead key="thead" class="v-data-table__thead" role="rowgroup">
                    <VDataTableHeaders
                      { ...dataTableHeadersProps }
                      sticky={ props.fixedHeader }
                      v-slots={ slots }
                    />
                  </thead>
                )}
                { slots.thead?.(slotProps.value) }
                { !props.hideDefaultBody && (
                  <tbody class="v-data-table__tbody" role="rowgroup">
                    { slots['body.prepend']?.(slotProps.value) }
                    { slots.body ? slots.body(slotProps.value) : (
                      <VDataTableRows
                        { ...attrs }
                        { ...dataTableRowsProps }
                        items={ flatItems.value }
                        v-slots={ slots }
                      />
                    )}
                    { slots['body.append']?.(slotProps.value) }
                  </tbody>
                )}
                { slots.tbody?.(slotProps.value) }
                { slots.tfoot?.(slotProps.value) }
              </>
            ),
            bottom: () => slots.bottom ? slots.bottom(slotProps.value) : !props.hideDefaultFooter && (
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
  },
})

export type VDataTableServer = InstanceType<typeof VDataTableServer>

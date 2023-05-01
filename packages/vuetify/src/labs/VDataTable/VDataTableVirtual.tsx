// Components
import { VTable } from '@/components/VTable'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'

// Composables
import { createHeaders, makeDataTableHeaderProps } from './composables/headers'
import { makeDataTableItemProps, useDataTableItems } from './composables/items'
import { makeDataTableExpandProps, provideExpanded } from './composables/expand'
import { createSort, makeDataTableSortProps, provideSort, useSortedItems } from './composables/sort'
import { createGroupBy, makeDataTableGroupProps, provideGroupBy, useGroupedItems } from './composables/group'
import { makeDataTableSelectProps, provideSelection } from './composables/select'
import { makeVirtualProps, useVirtual } from '@/composables/virtual'
import { useOptions } from './composables/options'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { provideDefaults } from '@/composables/defaults'

// Utlities
import { computed, ref, toRef } from 'vue'
import { convertToUnit, genericComponent, useRender } from '@/util'
import { makeVDataTableProps } from './VDataTable'

// Types
import type { DataTableItem } from './types'
import type { VDataTableRowsSlots } from './VDataTableRows'

export type VDataTableVirtualSlots = VDataTableRowsSlots & {
  top: []
  headers: []
  bottom: []
}

export const VDataTableVirtual = genericComponent<VDataTableVirtualSlots>()({
  name: 'VDataTableVirtual',

  props: {
    ...makeVDataTableProps(),
    ...makeVDataTableProps(),
    ...makeDataTableGroupProps(),
    ...makeDataTableExpandProps(),
    ...makeDataTableHeaderProps(),
    ...makeDataTableItemProps(),
    ...makeDataTableSelectProps(),
    ...makeDataTableSortProps(),
    ...makeVirtualProps({
      itemHeight: 44,
    }),
    ...makeFilterProps(),
  },

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
    'update:groupBy': (value: any) => true,
    'update:expanded': (value: any) => true,
    'click:row': (e: Event, value: { item: DataTableItem }) => true,
  },

  setup (props, { emit, slots }) {
    const { groupBy } = createGroupBy(props)
    const { sortBy, multiSort, mustSort } = createSort(props)

    const { headers, columns } = createHeaders(props, {
      groupBy,
      showSelect: toRef(props, 'showSelect'),
      showExpand: toRef(props, 'showExpand'),
    })
    const { items } = useDataTableItems(props, columns)

    const filterKeys = computed(() => columns.value.map(c => 'columns.' + c.key))
    const search = toRef(props, 'search')
    const { filteredItems } = useFilter<DataTableItem>(props, items, search, { filterKeys })

    provideSort({ sortBy, multiSort, mustSort })
    const { sortByWithGroups, opened, extractRows } = provideGroupBy({ groupBy, sortBy })

    const { sortedItems } = useSortedItems(filteredItems, sortByWithGroups, columns)
    const { flatItems } = useGroupedItems(sortedItems, groupBy, opened)

    const allRows = computed(() => extractRows(flatItems.value))

    provideSelection(props, allRows)
    provideExpanded(props)

    const headerHeight = computed(() => headers.value.length * 56)

    const {
      containerRef,
      paddingTop,
      paddingBottom,
      computedItems,
      handleScroll,
    } = useVirtual(props, flatItems, headerHeight)

    useOptions({
      sortBy,
      page: ref(1),
      itemsPerPage: ref(-1),
      groupBy,
      search,
    })

    provideDefaults({
      VDataTableRows: {
        hideNoData: toRef(props, 'hideNoData'),
        noDataText: toRef(props, 'noDataText'),
      },
    })

    useRender(() => (
      <VTable
        class="v-data-table"
        style={{
          '--v-table-row-height': convertToUnit(props.itemHeight),
        }}
        fixedHeader={ props.fixedHeader }
        fixedFooter={ props.fixedFooter }
        height={ props.height }
        hover={ props.hover }
      >
        {{
          top: slots.top,
          wrapper: () => (
            <div
              ref={ containerRef }
              onScroll={ handleScroll }
              class="v-table__wrapper"
              style={{
                height: convertToUnit(props.height),
              }}
            >
              <table>
                <thead>
                  <VDataTableHeaders
                    sticky={ props.fixedHeader }
                    multiSort={ props.multiSort }
                    v-slots={ slots }
                  />
                </thead>
                <tbody>
                  <tr style={{ height: convertToUnit(paddingTop.value), border: 0 }}>
                    <td colspan={ columns.value.length } style={{ height: convertToUnit(paddingTop.value), border: 0 }}></td>
                  </tr>

                  <VDataTableRows
                    items={ computedItems.value.map(({ raw }) => raw) }
                    onClick:row={ props['onClick:row'] }
                    v-slots={ slots }
                  />

                  <tr style={{ height: convertToUnit(paddingBottom.value), border: 0 }}>
                    <td colspan={ columns.value.length } style={{ height: convertToUnit(paddingBottom.value), border: 0 }}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
          bottom: slots.bottom,
        }}
      </VTable>
    ))
  },
})

export type VDataTableVirtual = InstanceType<typeof VDataTableVirtual>

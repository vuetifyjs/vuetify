// Components
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'
import { VTable } from '@/components/VTable'

// Composables
import { createGroupBy, provideGroupBy, useGroupedItems } from './composables/group'
import { createHeaders } from './composables/headers'
import { createSort, provideSort, useSortedItems } from './composables/sort'
import { makeDataTableProps } from './VDataTable'
import { makeDataTableVirtualProps, useVirtual } from './composables/virtual'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { provideDefaults } from '@/composables/defaults'
import { provideExpanded } from './composables/expand'
import { provideSelection } from './composables/select'
import { useDataTableItems } from './composables/items'
import { useOptions } from './composables/options'

// Utlities
import { computed, shallowRef, toRef } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { DataTableItem } from './types'
import type { VDataTableRowsSlots } from './VDataTableRows'

export type VDataTableVirtualSlots = VDataTableRowsSlots & {
  top: []
  headers: []
  bottom: []
}

export const makeVDataTableVirtualProps = propsFactory({
  ...makeDataTableProps(),
  ...makeDataTableVirtualProps(),
  ...makeFilterProps(),
}, 'v-data-table-virtual')

export const VDataTableVirtual = genericComponent<VDataTableVirtualSlots>()({
  name: 'VDataTableVirtual',

  props: makeVDataTableVirtualProps(),

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

    const { columns } = createHeaders(props, {
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

    const {
      containerRef,
      paddingTop,
      paddingBottom,
      startIndex,
      stopIndex,
      itemHeight,
      handleScroll,
    } = useVirtual(props, flatItems)

    const visibleItems = computed(() => {
      return flatItems.value.slice(startIndex.value, stopIndex.value)
    })

    useOptions({
      sortBy,
      page: shallowRef(1),
      itemsPerPage: shallowRef(-1),
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

    useRender(() => {
      const [dataTableHeadersProps] = VDataTableHeaders.filterProps(props)
      const [dataTableRowsProps] = VDataTableRows.filterProps(props)
      const [tableProps] = VTable.filterProps(props)

      return (
        <VTable
          class={[
            'v-data-table',
            {
              'v-data-table--loading': props.loading,
            },
            props.class,
          ]}
          style={[
            { '--v-table-row-height': convertToUnit(itemHeight.value) },
            props.style,
          ]}
          { ...tableProps }
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
                      { ...dataTableHeadersProps }
                      sticky={ props.fixedHeader }
                      v-slots={ slots }
                    />
                  </thead>
                  <tbody>
                    <tr style={{ height: convertToUnit(paddingTop.value), border: 0 }}>
                      <td colspan={ columns.value.length } style={{ height: convertToUnit(paddingTop.value), border: 0 }}></td>
                    </tr>

                    <VDataTableRows
                      { ...dataTableRowsProps }
                      items={ visibleItems.value }
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
      )
    })
  },
})

export type VDataTableVirtual = InstanceType<typeof VDataTableVirtual>

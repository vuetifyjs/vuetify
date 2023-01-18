// Components
import { VTable } from '@/components/VTable'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { createHeaders, makeDataTableHeaderProps } from './composables/headers'
import { makeDataTableItemProps, useDataTableItems } from './composables/items'
import { createExpanded, makeDataTableExpandProps } from './composables/expand'
import { createSort, makeDataTableSortProps, useSortedItems } from './composables/sort'
import { createGroupBy, makeDataTableGroupProps, useGroupedItems } from './composables/group'
import { createSelection, makeDataTableSelectProps } from './composables/select'
import { makeDataTableVirtualProps, useVirtual } from './composables/virtual'
import { useOptions } from './composables/options'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { provideDefaults } from '@/composables/defaults'

// Utlities
import { computed, ref, toRef } from 'vue'
import { convertToUnit, defineComponent, useRender } from '@/util'
import { makeVDataTableProps } from './VDataTable'

// Types
import type { DataTableItem } from './types'

export const VDataTableVirtual = defineComponent({
  name: 'VDataTableVirtual',

  props: {
    search: String,

    ...makeVDataTableProps(),
    ...makeVDataTableProps(),
    ...makeDataTableGroupProps(),
    ...makeDataTableExpandProps(),
    ...makeDataTableHeaderProps(),
    ...makeDataTableItemProps(),
    ...makeDataTableSelectProps(),
    ...makeDataTableSortProps(),
    ...makeDataTableVirtualProps(),
    ...makeFilterProps(),
  },

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
    'update:groupBy': (value: any) => true,
    'update:expanded': (value: any) => true,
    'click:row': (event: Event, value: { item: DataTableItem }) => true,
  },

  setup (props, { emit, slots }) {
    const groupBy = useProxiedModel(props, 'groupBy')
    const { columns } = createHeaders(props, {
      groupBy,
      showSelect: toRef(props, 'showSelect'),
      showExpand: toRef(props, 'showExpand'),
    })
    const { items } = useDataTableItems(props, columns)

    const { filteredItems, getMatches } = useFilter<DataTableItem>(props, items, toRef(props, 'search'))

    const { sortBy } = createSort(props)
    const { sortByWithGroups, opened, extractRows } = createGroupBy(props, groupBy, sortBy)

    const { sortedItems } = useSortedItems(filteredItems, sortByWithGroups, columns)
    const { flatItems } = useGroupedItems(sortedItems, groupBy, opened)

    const allRows = computed(() => extractRows(flatItems.value))

    createSelection(props, allRows)
    createExpanded(props)

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
      page: ref(1),
      startIndex: ref(0),
      stopIndex: computed(() => flatItems.value.length - 1),
      pageCount: ref(1),
      itemsPerPage: ref(-1),
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
          '--v-table-row-height': convertToUnit(itemHeight.value),
        }}
        height={ props.height }
        fixedHeader={ props.fixedHeader }
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
                    items={ visibleItems.value }
                    getMatches={ getMatches }
                    onClick:row={ (event, value) => emit('click:row', event, value) }
                    v-slots={ slots }
                  />

                  <tr style={{ height: convertToUnit(paddingBottom.value), border: 0 }}>
                    <td colspan={columns.value.length} style={{ height: convertToUnit(paddingBottom.value), border: 0 }}></td>
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

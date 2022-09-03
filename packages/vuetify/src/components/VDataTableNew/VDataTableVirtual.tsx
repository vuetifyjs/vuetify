// Components
import { VTable } from '@/components'
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

// Utlities
import { computed, ref } from 'vue'
import { convertToUnit, defineComponent, useRender } from '@/util'
import { makeVDataTableProps } from './VDataTable'

export const VDataTableVirtual = defineComponent({
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
    ...makeDataTableVirtualProps(),
  },

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
    'update:groupBy': (value: any) => true,
  },

  setup (props, { slots }) {
    const groupBy = useProxiedModel(props, 'groupBy')
    const { columns } = createHeaders(props)
    const { items } = useDataTableItems(props, columns)

    createExpanded(props)
    const { sortBy } = createSort(props)
    const { sortByWithGroups, opened, extractRows } = createGroupBy(props, groupBy, sortBy)

    const { sortedItems } = useSortedItems(items, sortByWithGroups, columns)
    const { flatItems } = useGroupedItems(sortedItems, groupBy, opened)

    const allRows = computed(() => extractRows(flatItems.value))

    createSelection(props, allRows)

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
          top: slots.head,
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
                  />
                </thead>
                <tbody>
                  <tr style={{ height: convertToUnit(paddingTop.value), border: 0 }}>
                    <td colspan={columns.value.length} style={{ height: convertToUnit(paddingTop.value), border: 0 }}></td>
                  </tr>

                  <VDataTableRows
                    items={visibleItems.value}
                    v-slots={ slots }
                  />

                  <tr style={{ height: convertToUnit(paddingBottom.value), border: 0 }}>
                    <td colspan={columns.value.length} style={{ height: convertToUnit(paddingBottom.value), border: 0 }}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
          bottom: slots.footer,
        }}
      </VTable>
    ))
  },
})

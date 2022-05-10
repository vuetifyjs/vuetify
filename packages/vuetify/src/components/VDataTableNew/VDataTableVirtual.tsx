import { VTable } from '@/components'
import { convertToUnit, defineComponent } from '@/util'
import { computed, provide, ref, toRef } from 'vue'
import { createExpanded, useGroupBy, useHeaders, useOptions, useSelection, useSort, useSortedItems, useVirtual } from './composables'
import { makeVDataTableProps } from './VDataTable'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableVirtualRows } from './VDataTableVirtualRows'

export const VDataTableVirtual = defineComponent({
  name: 'VDataTableVirtual',

  props: {
    itemHeight: {
      type: [String, Number],
      default: 52,
    },
    itemsLength: {
      type: Number,
      required: true,
    },
    showScrollingRow: Boolean,
    ...makeVDataTableProps(),
  },

  emits: {
    'update:sortBy': (sortBy: any) => true,
    load: (value: any) => true,
  },

  setup (props, { slots }) {
    const allItems = toRef(props, 'items')
    const { expanded } = createExpanded()

    const { headers, columns } = useHeaders(props)
    const { sortBy, toggleSort } = useSort(props)
    const { sortedItems } = useSortedItems(allItems, sortBy)
    const { items, toggleGroup, numGroups, numHiddenItems } = useGroupBy(sortedItems, toRef(props, 'groupBy'))

    const {
      containerRef,
      startIndex,
      stopIndex,
      isScrolling,
      itemHeight,
      afterHeight,
      beforeHeight,
    } = useVirtual(props, computed(() => items.value.length + expanded.value.size))

    const { toggleSelect, selectAll, isSelected, someSelected, allSelected } = useSelection(props, allItems)

    const visibleItems = computed(() => {
      return items.value.slice(startIndex.value, stopIndex.value)
    })

    provide('v-data-table', {
      toggleGroup,
      toggleSort,
      sortBy,
      toggleSelect,
      isSelected,
      someSelected,
      allSelected,
      selectAll,
    })

    useOptions({
      sortBy,
      page: ref(1),
      startIndex: ref(0),
      stopIndex: computed(() => items.value.length - 1),
      pageCount: ref(1),
      itemsPerPage: ref(-1),
      itemsLength: computed(() => items.value.length),
    })

    return () => (
      <VTable
        class="v-data-table"
        height={ props.height }
        fixedHeader={ props.fixedHeader }
      >
        {{
          wrapper: () => (
            <div
              ref={ containerRef }
              class="v-table__wrapper"
              style={{
                height: convertToUnit(props.height),
              }}
            >
              <table>
                <thead>
                  <VDataTableHeaders
                    headers={ headers.value }
                    rowHeight={ itemHeight.value }
                    sticky={ props.fixedHeader }
                    sortBy={ sortBy.value }
                  />
                </thead>
                <tbody>
                  <VDataTableVirtualRows
                    columns={ columns.value }
                    items={ visibleItems.value }
                    rowHeight={ itemHeight.value }
                    before={ beforeHeight.value }
                    after={ afterHeight.value }
                    showScrollingRow={ isScrolling.value && props.showScrollingRow }
                    v-slots={ slots }
                  />
                </tbody>
              </table>
            </div>
          ),
        }}
      </VTable>
    )
  },
})

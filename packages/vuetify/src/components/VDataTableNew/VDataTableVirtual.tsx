import { VTable } from '@/components'
import { convertToUnit, defineComponent } from '@/util'
import { computed, provide, ref, toRef } from 'vue'
import { createExpanded, createGroup, createHeaders, createSelection, createSort, useOptions, useSortedItems, useVirtual } from './composables'
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
    expandOnClick: Boolean,
  },

  emits: {
    'update:sortBy': (sortBy: any) => true,
    load: (value: any) => true,
  },

  setup (props, { slots }) {
    const allItems = toRef(props, 'items')
    const { expanded } = createExpanded(props)

    const { headers, columns } = createHeaders(props)
    const { sortBy, toggleSort } = createSort(props)
    const { sortedItems } = useSortedItems(allItems, sortBy)
    const { flatItems, groupedItems, toggleGroup, numGroups, numHiddenItems } = createGroup(sortedItems, toRef(props, 'groupBy'))

    const {
      containerRef,
      startIndex,
      stopIndex,
      isScrolling,
      itemHeight,
      afterHeight,
      beforeHeight,
    } = useVirtual(props, computed(() => flatItems.value.length + expanded.value.size))

    const { toggleSelect, selectAll, isSelected, someSelected, allSelected } = createSelection(props, allItems)

    const visibleItems = computed(() => {
      return flatItems.value.slice(startIndex.value, stopIndex.value)
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
      stopIndex: computed(() => flatItems.value.length - 1),
      pageCount: ref(1),
      itemsPerPage: ref(-1),
      itemsLength: computed(() => flatItems.value.length),
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
                    columns={ columns.value }
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

import { VTable } from '@/components'
import { convertToUnit, defineComponent } from '@/util'
import { computed, provide, toRef } from 'vue'
import { createExpanded, useGroupBy, useHeaders, useVirtual } from '../composables'
import { makeVDataTableProps } from './VDataTable'
import { VDataTableVirtualHeaders } from './VDataTableVirtualHeaders'
import { VDataTableVirtualRows } from './VDataTableVirtualRows'

export const VDataTableVirtual = defineComponent({
  name: 'VDataTableVirtual',

  props: {
    itemHeight: {
      type: [String, Number],
      default: 48,
    },
    itemsLength: {
      type: Number,
      required: true,
    },
    scrollLoader: Boolean,
    ...makeVDataTableProps(),
  },

  setup (props, { slots }) {
    const { headers, columns } = useHeaders(props)

    const { expanded } = createExpanded()

    const { items, toggleGroup, numGroups, numHiddenItems } = useGroupBy(toRef(props, 'items'), toRef(props, 'groupBy'))

    const {
      containerRef,
      startIndex,
      stopIndex,
      isScrolling,
      itemHeight,
      afterHeight,
      beforeHeight,
    } = useVirtual(props, computed(() => props.itemsLength + expanded.value.size + numGroups.value - numHiddenItems.value))

    const visibleItems = computed(() => {
      return items.value.slice(startIndex.value, stopIndex.value)
    })

    provide('v-data-table', {
      toggleGroup,
    })

    return () => (
      <VTable
        fixedHeader={ props.fixedHeader }
        v-slots={{
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
                  <VDataTableVirtualHeaders
                    headers={ headers.value }
                    rowHeight={ itemHeight.value }
                    fixed={ props.fixedHeader }
                  />
                </thead>
                <tbody>
                  <VDataTableVirtualRows
                    columns={ columns.value }
                    items={ visibleItems.value }
                    rowHeight={ itemHeight.value }
                    before={ beforeHeight.value }
                    after={ afterHeight.value }
                    isScrolling={ isScrolling.value && props.scrollLoader }
                    v-slots={ slots }
                  />
                </tbody>
              </table>
            </div>
          ),
        }}
      ></VTable>
    )
  },
})

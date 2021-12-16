import { VTable } from '@/components'
import { convertToUnit, defineComponent } from '@/util'
import { computed, toRef } from 'vue'
import { useExpanded, useHeaders, useVirtual } from '../composables'
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
    ...makeVDataTableProps(),
  },

  setup (props, { slots }) {
    const { headers, columns } = useHeaders(props)

    const { expanded } = useExpanded()

    const {
      containerRef,
      startIndex,
      stopIndex,
      isScrolling,
      itemHeight,
      afterHeight,
      beforeHeight,
    } = useVirtual(props, computed(() => props.itemsLength + expanded.value.size))

    const items = computed(() => {
      const visibleItems = props.items.slice(startIndex.value, stopIndex.value)

      for (let i = 0; i < visibleItems.length; i++) {
        if (expanded.has(visibleItems[i].id)) {
          visibleItems.splice(i, 0, {
            expanded: true,
          })
        }
      }

      return visibleItems
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
                    items={ items.value }
                    rowHeight={ itemHeight.value }
                    before={ beforeHeight.value }
                    after={ afterHeight.value }
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

import { computed, inject } from 'vue'
import { convertToUnit, defineComponent } from '@/util'

import type { PropType } from 'vue'
import { VIcon } from '@/components/VIcon'
import { VProgressLinear } from '@/components/VProgressLinear'

export const VDataTableHeaders = defineComponent({
  name: 'VDataTableHeaders',

  props: {
    color: String,
    columns: Array,
    loading: Boolean,
    headers: {
      type: Array as PropType<any[][]>,
      required: true,
    },
    rowHeight: {
      type: Number,
      default: 48,
    },
    sticky: Boolean,
    sortBy: Array as PropType<any[]>,
  },

  setup (props, { slots, emit }) {
    const { toggleSort } = inject('v-data-table', {} as any)

    const fixedOffsets = computed(() => {
      return props.headers.flat().reduce((offsets, column) => {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        return [...offsets, offsets[offsets.length - 1] + (column.width ?? 0)]
      }, [0])
    })

    const getStickyStyles = (sticky: boolean, y: number, x: number) => {
      if (!props.sticky && !sticky) return null

      return {
        position: 'sticky',
        zIndex: sticky ? 4 : props.sticky ? 3 : undefined,
        left: sticky ? convertToUnit(fixedOffsets.value[x]) : undefined,
        top: props.sticky ? `${props.rowHeight * y}px` : undefined,
      }
    }

    function getSortIcon (id: string) {
      const item = props.sortBy?.find(item => item.key === id)

      if (!item) return 'mdi-arrow-up'

      return item.order === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down'
    }

    return () => {
      return (
        <>
          { props.headers.map((row, y) => (
            <tr class="v-data-table__tr" role="row">
              {row.map((column, x) => (
                <th
                  class={[
                    'v-data-table__th',
                    {
                      'v-data-table__th--sortable': column.sortable !== false && column.id,
                      'v-data-table__th--sorted': !!props.sortBy?.find(x => x.key === column.id),
                    },
                  ]}
                  style={{
                    ...column.style,
                    width: column.width,
                    'min-width': column.width,
                    height: convertToUnit(props.rowHeight),
                    ...getStickyStyles(column.sticky, y, x),
                  }}
                  role="columnheader"
                  colspan={column.colspan}
                  rowspan={column.rowspan}
                  onClick={() => toggleSort(column.id)}
                >
                  <span>{ column.name }</span>
                  { column.id && column.sortable !== false && (
                    <VIcon
                      class="v-data-table-header__sort-icon"
                      icon={ getSortIcon(column.id) }
                    />
                  )}
                </th>
              ))}
            </tr>
          )) }
          { props.loading && (
            <tr class="v-data-table__progress">
              <th
                style={{
                  ...getStickyStyles(false, props.headers.length, 0),
                }}
                colspan={ props.columns?.length }
              >
                <VProgressLinear indeterminate color={ props.color } />
              </th>
            </tr>
          )}
        </>
      )
    }
  },
})

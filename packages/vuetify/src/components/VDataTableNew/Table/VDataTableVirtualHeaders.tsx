import { convertToUnit, defineComponent } from '@/util'

import type { PropType } from 'vue'

export const VDataTableVirtualHeaders = defineComponent({
  name: 'VDataTableVirtualHeaders',

  props: {
    headers: {
      type: Array as PropType<any[][]>,
      required: true,
    },
    rowHeight: {
      type: Number,
      required: true,
    },
    fixed: Boolean,
  },

  setup (props, { slots }) {
    const getStickyStyles = (column: any, y: number) => {
      if (!props.fixed && !column.sticky) return null

      return {
        position: 'sticky',
        zIndex: column.sticky ? 4 : props.fixed ? 3 : undefined,
        left: column.sticky ? convertToUnit(column.stickyWidth ?? 0) : undefined,
        top: props.fixed ? `${props.rowHeight * y}px` : undefined,
      }
    }

    return () => {
      return props.headers.map((row, y) => (
        <tr class="v-data-table-regular__tr" role="row">
          {row.map(column => (
            <th
              class="v-data-table-regular__th"
              style={{
                ...column.style,
                width: column.width,
                'min-width': column.width,
                height: convertToUnit(props.rowHeight),
                ...getStickyStyles(column, y),
              }}
              role="columnheader"
              colspan={column.colspan}
              rowspan={column.rowspan}
            >
              { column.name }
            </th>
          ))}
        </tr>
      ))
    }
  },
})

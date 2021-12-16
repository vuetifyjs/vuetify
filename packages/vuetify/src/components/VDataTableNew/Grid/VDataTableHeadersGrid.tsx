import { convertToUnit, defineComponent } from '@/util'

import type { PropType } from 'vue'

export const VDataTableHeadersGrid = defineComponent({
  name: 'VDataTableHeadersGrid',

  props: {
    rows: {
      type: Array as PropType<any[][]>,
      required: true,
    },
    rowHeight: {
      type: Number,
      required: true,
    },
    sticky: Boolean,
  },

  setup (props, { slots }) {
    const getStickyStyles = (column: any, i: number) => {
      if (!props.sticky && !column.sticky) return null

      return {
        position: 'sticky',
        zIndex: column.sticky ? 4 : props.sticky ? 3 : undefined,
        left: column.sticky ? convertToUnit(column.stickyWidth) : undefined,
        top: props.sticky ? `${props.rowHeight * i}px` : undefined,
      }
    }

    return () => {
      return props.rows.map((row, i) => (
        <tr class="v-data-table__tr" role="row">
          {row.map(column => (
            <th
              class="v-data-table__th"
              style={{
                ...column.style,
                height: `${props.rowHeight * (column.rowspan ?? 1)}px`,
                ...getStickyStyles(column, i),
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

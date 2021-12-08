import { defineComponent } from '@/util'

import type { PropType } from 'vue'
import type { Column } from './VDataTable'

export const VDataTableHeaders = defineComponent({
  name: 'VDataTableHeaders',

  props: {
    rows: {
      type: Array as PropType<Column[][]>,
      required: true,
    },
    rowHeight: {
      type: Number,
      required: true,
    },
    sticky: Boolean,
  },

  setup (props, { slots }) {
    return () => {
      return props.rows.map((row, i) => (
        <tr class="v-data-table__tr" role="row">
          {row.map(column => (
            <th
              class="v-data-table__th"
              style={{
                ...column.style,
                height: `${props.rowHeight * (column.rowspan ?? 1)}px`,
                ...(props.sticky && {
                  position: 'sticky',
                  zIndex: 2,
                  top: `${props.rowHeight * i}px`,
                }),
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

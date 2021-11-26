import { defineComponent } from '@/util'
import { computed } from 'vue'

import type { PropType } from 'vue'
import type { Column } from './VDataTable'

export const VDataTableHeaders = defineComponent({
  name: 'VDataTableHeaders',

  props: {
    rows: {
      type: Array as PropType<Column[][]>,
      required: true,
    },
  },

  setup (props, { slots }) {
    return () => {
      return props.rows.map(row => (
        <tr class="v-data-table__tr" role="row">
          {row.map(column => (
            <th class="v-data-table__th" style={column.style} role="columnheader">
              { column.name }
            </th>
          ))}
        </tr>
      ))
    }
  },
})

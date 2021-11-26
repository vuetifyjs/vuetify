import { defineComponent } from '@/util'

import type { PropType } from 'vue'
import type { Column } from './VDataTable'

export const VDataTableRows = defineComponent({
  name: 'VDataTableRows',

  props: {
    columns: {
      type: Array as PropType<Column[]>,
      required: true,
    },
    items: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },

  setup (props, { slots }) {
    return () => {
      return props.items.map(item => (
        <tr class="v-data-table__tr" role="row">
          { props.columns.map(column => (
            <td class="v-data-table__td" role="cell">{ item[column.id] }</td>
          )) }
        </tr>
      ))
    }
  },
})

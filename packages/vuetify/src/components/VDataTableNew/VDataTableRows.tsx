import { convertToUnit, defineComponent } from '@/util'

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
    rowHeight: {
      type: Number,
      required: true,
    },
    offsetStart: {
      type: Number,
      default: 0,
    },
  },

  setup (props, { slots }) {
    return () => {
      return props.items.map((item, rowIndex) => (
        <tr class="v-data-table__tr" role="row">
          { props.columns.map((column, colIndex) => (
            <td
              class={[
                'v-data-table__td',
              ]}
              style={{
                height: `${props.rowHeight}px`,
                transform: `translateY(${convertToUnit(props.offsetStart)})`,
              }}
              role="cell"
            >
              { item[column.id] }
            </td>
          )) }
        </tr>
      ))
    }
  },
})

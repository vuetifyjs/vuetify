import { convertToUnit, defineComponent } from '@/util'

import type { PropType } from 'vue'
import type { Column } from './VDataTable'
import { useExpanded, VDataTableExpandedKey } from './VDataTable'

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
    },
    startIndex: {
      type: Number,
      default: 0,
    },
  },

  setup (props, { slots }) {
    const { toggleExpand } = useExpanded()

    return () => {
      return props.items.map((item, rowIndex) => item[VDataTableExpandedKey as symbol] ? (
        <tr
          class="v-data-table__tr v-data-table__tr--expanded"
          role="row"
        >
          <td
            class="v-data-table__td"
            style={{
              height: `${props.rowHeight}px`,
              transform: props.offsetStart ? `translateY(${convertToUnit(props.offsetStart)})` : undefined,
              'grid-area': `auto / 1 / auto / ${props.columns.length + 1}`,
            }}
          >
            expanded row
          </td>
        </tr>
      ) : (
        <tr
          class="v-data-table__tr"
          role="row"
          onClick={() => {
            toggleExpand(props.startIndex + rowIndex, item)
          }}
        >
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
              { slots[`item.${column.id}`]?.() ?? item[column.id] }
            </td>
          )) }
        </tr>
      ))
    }
  },
})

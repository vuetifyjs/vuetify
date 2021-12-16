import { convertToUnit, defineComponent } from '@/util'

import type { PropType } from 'vue'

export const VDataTableVirtualRows = defineComponent({
  name: 'VDataTableVirtualRows',

  props: {
    columns: {
      type: Array as PropType<any[]>,
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
    loading: Boolean,
    showLoader: Boolean,
    before: Number,
    after: Number,
  },

  setup (props, { slots }) {
    return () => {
      return (
        <>
          <tr style={{ height: convertToUnit(props.before) }}>
            <td colspan={props.columns.length} style={{ height: convertToUnit(props.before) }}></td>
          </tr>
          {props.items.map(item => (
            <tr
              class="v-data-table-regular__tr"
              role="row"
              key={ `row_${item.id}` }
            >
              { props.columns.map((column, colIndex) => (
                <td
                  class={[
                    'v-data-table-regular__td',
                    {
                      'v-data-table-regular__td--sticky': column.sticky,
                    },
                  ]}
                  style={{
                    height: `${props.rowHeight}px`,
                    left: column.sticky ? convertToUnit(column.stickyWidth) : undefined,
                  }}
                  role="cell"
                >
                  { slots[`item.${column.id}`]?.() ?? item[column.id] }
                </td>
              )) }
            </tr>
          ))}
          <tr style={{ height: convertToUnit(props.after) }}>
            <td colspan={props.columns.length} style={{ height: convertToUnit(props.after) }}></td>
          </tr>
        </>
      )
    }
  },
})

import { convertToUnit, defineComponent } from '@/util'

import type { PropType } from 'vue'
import { inject } from 'vue'

export const VDataTableRows = defineComponent({
  name: 'VDataTableRows',

  props: {
    columns: {
      type: Array as PropType<any[]>,
      required: true,
    },
    items: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },

  setup (props, { slots }) {
    const { toggleGroup } = inject('v-data-table', {} as any)

    return () => {
      return (
        <>
          {props.items.map(item => item.$type === 'group-header' ? (
            <tr
              class="v-data-table-regular__tr"
              role="row"
              key={ `group-header_${item.groupBy}_${item.groupByValue}` }
            >
              <td
                class="v-data-table-regular__td v-data-table-regular__td--group-header"
                colspan={ props.columns.length }
                onClick={ () => toggleGroup(item.groupByValue) }
              >
                Group { item.groupBy } { item.groupByValue }
              </td>
            </tr>
          ) : (
            <tr
              class={[
                'v-data-table-regular__tr',
              ]}
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
                    left: column.sticky ? convertToUnit(column.stickyWidth) : undefined,
                  }}
                  role="cell"
                >
                  { slots[`item.${column.id}`]?.() ?? item[column.id] }
                </td>
              )) }
            </tr>
          ))}
        </>
      )
    }
  },
})

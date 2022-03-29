import { convertToUnit, defineComponent } from '@/util'

import type { PropType } from 'vue'
import { inject } from 'vue'
import { useExpanded } from '../composables'

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
    rowHeight: Number,
  },

  setup (props, { slots }) {
    const { toggleGroup } = inject('v-data-table', {} as any)
    const { expanded, expand } = useExpanded()

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
                class={[
                  'v-data-table-regular__td',
                  'v-data-table-regular__td--group-header',
                  {
                    'v-data-table-regular__td--fixed': props.columns.some(c => c.fixed),
                  },
                ]}
                style={{
                  left: props.columns.some(c => c.fixed) ? convertToUnit(0) : undefined,
                }}
                colspan={ 1 }
                onClick={ () => toggleGroup(item.groupByValue) }
              >
                { item.groupByValue }
              </td>
              <td
                class={[
                  'v-data-table-regular__td',
                  'v-data-table-regular__td--group-header',
                ]}
                colspan={ props.columns.length - 1 }
              />
            </tr>
          ) : (
            <>
              <tr
                class="v-data-table-regular__tr"
                role="row"
                key={ `row_${item.id}` }
                onClick={() => expand(item, !expanded.value.has(item.id))}
              >
                { props.columns.map((column, colIndex) => (
                  <td
                    class={[
                      'v-data-table-regular__td',
                      {
                        'v-data-table-regular__td--fixed': column.fixed,
                      },
                    ]}
                    style={{
                      height: `${props.rowHeight}px`,
                      left: column.fixed ? convertToUnit(column.stickyWidth ?? 0) : undefined,
                    }}
                    role="cell"
                  >
                    { slots[`item.${column.id}`]?.() ?? item[column.id] }
                  </td>
                )) }
              </tr>

              {expanded.value.has(item.id) ? (
                <tr key={ `expanded_${item.id}` }>
                  <td colspan={props.columns.length}>expanded row</td>
                </tr>
              ) : undefined}
            </>
          ))}
        </>
      )
    }
  },
})

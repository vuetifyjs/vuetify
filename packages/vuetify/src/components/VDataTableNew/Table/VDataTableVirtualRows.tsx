import { convertToUnit, defineComponent } from '@/util'

import type { PropType } from 'vue'
import { inject } from 'vue'
import { useExpanded } from '../composables'

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
    isScrolling: Boolean,
  },

  setup (props, { slots }) {
    const { toggleGroup } = inject('v-data-table', { toggleGroup: (key: string) => {} })
    const { expanded, expand } = useExpanded()

    return () => {
      return (
        <>
          <tr style={{ height: convertToUnit(props.before) }}>
            <td colspan={props.columns.length} style={{ height: convertToUnit(props.before) }}></td>
          </tr>
          {props.isScrolling ? props.items.map((item, i) => (
            <>
              <tr class="v-data-table-regular__tr" key={ `row_${item.id}` }>
                <td class="v-data-table-regular__td" style={{ height: convertToUnit(props.rowHeight) }} colspan={props.columns.length}>
                  {item.id} loading
                </td>
              </tr>
              {expanded.value.has(item.id) ? (
                <tr key={ `expanded_${item.id}` }>
                  <td colspan={props.columns.length}>expanded row</td>
                </tr>
              ) : undefined}
            </>
          )) : props.items.map(item => item.$type === 'group-header' ? (
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
          <tr style={{ height: convertToUnit(props.after) }}>
            <td colspan={props.columns.length} style={{ height: convertToUnit(props.after) }}></td>
          </tr>
        </>
      )
    }
  },
})

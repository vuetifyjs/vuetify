import { convertToUnit, defineComponent } from '@/util'

import type { PropType } from 'vue'
import { inject } from 'vue'
import { useExpanded } from '../composables'
import { VDataTableRows } from './VDataTableRows'

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
    const { expanded, expand } = useExpanded()

    return () => {
      return (
        <>
          <tr style={{ height: convertToUnit(props.before) }}>
            <td colspan={props.columns.length} style={{ height: convertToUnit(props.before) }}></td>
          </tr>

          { props.isScrolling
            ? props.items.map((item, i) => (
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
            ))
            : (
              <VDataTableRows
                items={props.items}
                columns={props.columns}
                rowHeight={props.rowHeight}
                v-slots={ slots }
              />
            )
          }

          <tr style={{ height: convertToUnit(props.after) }}>
            <td colspan={props.columns.length} style={{ height: convertToUnit(props.after) }}></td>
          </tr>
        </>
      )
    }
  },
})

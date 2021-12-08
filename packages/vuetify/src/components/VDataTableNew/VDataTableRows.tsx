import { convertToUnit, createRange, defineComponent } from '@/util'

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
    stopIndex: {
      type: Number,
      default: 0,
    },
    loading: Boolean,
    showLoader: Boolean,
  },

  setup (props, { slots }) {
    const { toggleExpand } = useExpanded()

    return () => {
      if (props.showLoader && props.loading) {
        return createRange(props.stopIndex - props.startIndex).map(i => (
          <tr
            class="v-data-table__tr"
            role="row"
            key={ `loading_${i}` }
          >
            { props.columns.map(column => (
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
                loading
              </td>
            )) }
          </tr>
        ))
      }

      return props.items.map((item, rowIndex) => item[VDataTableExpandedKey as symbol] ? (
        <tr
          class="v-data-table__tr v-data-table__tr--expanded"
          role="row"
          key={ `expanded_${item.id}` }
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
          key={ `row_${item.id}` }
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

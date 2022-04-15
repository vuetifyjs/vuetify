// Components
import { VDataTableRow } from '@/components'

// Composables
import { useExpanded } from '../composables'
import { VDataTableColumn, VDataTableRows } from './VDataTableRows'

// Utilities
import { convertToUnit, defineComponent } from '@/util'

// Types
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
    before: Number,
    after: Number,
    showScrollingRow: Boolean,
  },

  setup (props, { slots }) {
    const { expanded, expand } = useExpanded()

    return () => {
      return (
        <>
          <tr style={{ height: convertToUnit(props.before) }}>
            <td colspan={props.columns.length} style={{ height: convertToUnit(props.before) }}></td>
          </tr>

          { props.showScrollingRow
            ? props.items.map((item, i) => (
              <>
                { slots['scrolling-row']?.({ item, columns: props.columns }) ?? (
                  <VDataTableRow key={ `row_${item.id}` }>
                    <VDataTableColumn height={ props.rowHeight } colspan={ props.columns.length }>
                      Loading...
                    </VDataTableColumn>
                  </VDataTableRow>
                ) }

                { expanded.value.has(item.id) && slots['expanded-row']?.() }
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

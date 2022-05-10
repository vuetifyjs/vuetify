// Components
import { VDataTableRow } from '@/components'

// Composables
import { useExpanded } from './composables'

// Utilities
import { convertToUnit, defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'
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
    before: Number,
    after: Number,
    showScrollingRow: Boolean,
  },

  setup (props, { slots }) {
    return () => {
      return (
        <>
          <tr style={{ height: convertToUnit(props.before), border: 0 }}>
            <td colspan={props.columns.length} style={{ height: convertToUnit(props.before), border: 0 }}></td>
          </tr>

          { props.showScrollingRow
            ? props.items.map((item, i) => (
              <>
                {/* { slots['scrolling-row']?.({ item, columns: props.columns }) ?? (
                  <VDataTableRow key={ `row_${item.id}` }>
                    <VDataTableColumn height={ props.rowHeight } colspan={ props.columns.length }>
                      Loading...
                    </VDataTableColumn>
                  </VDataTableRow>
                ) }

                { expanded.value.has(item.id) && slots['expanded-row']?.() } */}
                <div>foo</div>
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

          <tr style={{ height: convertToUnit(props.after), border: 0 }}>
            <td colspan={props.columns.length} style={{ height: convertToUnit(props.after), border: 0 }}></td>
          </tr>
        </>
      )
    }
  },
})

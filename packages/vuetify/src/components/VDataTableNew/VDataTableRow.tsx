import { defineComponent } from '@/util'
import { inject, PropType } from 'vue'
import { VCheckbox } from '../VCheckbox'
import { VDataTableColumn } from './VDataTableColumn'

export const VDataTableRow = defineComponent({
  name: 'VDataTableRow',

  props: {
    item: {
      type: null,
      required: true,
    },
    rowHeight: [String, Number],
    columns: {
      type: Array as PropType<any[]>,
      default: () => ([]),
    },
  },

  setup (props, { emit, slots }) {
    const { isSelected, toggleSelect } = inject('v-data-table', {} as any)
    return () => (
      <tr
        class={[
          'v-data-table__tr',
        ]}
      >
        { props.columns.map(column => (
          <VDataTableColumn
            fixed={ column.fixed }
            stickyWidth={ column.stickyWidth }
            height={ props.rowHeight }
          >
            {
              slots[`item.${column.value}`]?.() ?? (column.value === 'data-table-select' ? (
                <VCheckbox
                  modelValue={ isSelected(props.item) }
                  onClick={ () => toggleSelect(props.item) }
                  hide-details
                />
              ) : props.item[column.value])
            }
          </VDataTableColumn>
        )) }
      </tr>
    )
  },
})

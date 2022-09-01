// Components
import { VCheckbox, VCheckboxBtn } from '../VCheckbox'

// Composables
import { VDataTableColumn } from './VDataTableColumn'
import { useHeaders, useSelection } from './composables'

// Utilities
import { computed } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'
import type { DataTableItem } from './composables'

export const VDataTableRow = defineComponent({
  name: 'VDataTableRow',

  props: {
    item: {
      type: Object as PropType<DataTableItem>,
      required: true,
    },
    rowHeight: [String, Number],
  },

  setup (props, { emit, slots }) {
    const { isSelected, toggleSelect } = useSelection()
    const { columns } = useHeaders()

    const fixedOffsets = computed(() => {
      return columns.value.reduce((offsets, column) => {
        return [...offsets, offsets[offsets.length - 1] + (column.width ?? 0)]
      }, [0])
    })

    return () => (
      <tr
        class={[
          'v-data-table__tr',
        ]}
      >
        { columns.value.map((column, i) => (
          <VDataTableColumn
            fixed={ column.fixed }
            fixedOffset={ column.fixed ? fixedOffsets.value[i] : undefined }
            width={ column.width }
            height={ props.rowHeight }
          >
            {
              slots[`item.${column.id}`]?.() ?? (column.id === 'data-table-select' ? (
                <VCheckboxBtn
                  modelValue={ isSelected(props.item) }
                  onClick={ () => toggleSelect(props.item) }
                />
              ) : props.item.columns[column.id])
            }
          </VDataTableColumn>
        )) }
      </tr>
    )
  },
})

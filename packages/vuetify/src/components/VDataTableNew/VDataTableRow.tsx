// Components
import { VCheckbox } from '../VCheckbox'

// Composables
import { VDataTableColumn } from './VDataTableColumn'

// Utilities
import { computed, inject } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { DataTableItem } from './composables'
import type { PropType } from 'vue'
import type { DataTableHeader } from './types'

export const VDataTableRow = defineComponent({
  name: 'VDataTableRow',

  props: {
    item: {
      type: Object as PropType<DataTableItem>,
      required: true,
    },
    rowHeight: [String, Number],
    columns: {
      type: Array as PropType<DataTableHeader[]>,
      default: () => ([]),
    },
  },

  setup (props, { emit, slots }) {
    const { isSelected, toggleSelect } = inject('v-data-table', {} as any)

    const fixedOffsets = computed(() => {
      return props.columns.reduce((offsets, column) => {
        return [...offsets, offsets[offsets.length - 1] + (column.width ?? 0)]
      }, [0])
    })

    return () => (
      <tr
        class={[
          'v-data-table__tr',
        ]}
      >
        { props.columns.map((column, i) => (
          <VDataTableColumn
            fixed={ column.fixed }
            fixedOffset={ column.fixed ? fixedOffsets.value[i] : undefined }
            width={ column.width }
            height={ props.rowHeight }
          >
            {
              slots[`item.${column.id}`]?.() ?? (column.id === 'data-table-select' ? (
                <VCheckbox
                  modelValue={ isSelected(props.item) }
                  onClick={ () => toggleSelect(props.item) }
                  hide-details
                />
              ) : props.item.columns[column.id])
            }
          </VDataTableColumn>
        )) }
      </tr>
    )
  },
})

// Components
import { VBtn } from '../VBtn'
import { VCheckboxBtn } from '../VCheckbox'

// Composables
import { VDataTableColumn } from './VDataTableColumn'
import { useSelection } from './composables/select'
import { useHeaders } from './composables/headers'
import { useExpanded } from './composables/expand'

// Utilities
import { computed } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'
import type { DataTableItem } from './types'

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
    const { isExpanded, toggleExpand } = useExpanded()
    const { columns } = useHeaders()

    const fixedOffsets = computed(() => {
      return columns.value.reduce((offsets, column) => {
        return [...offsets, offsets[offsets.length - 1] + (column.width ?? 0)]
      }, [0])
    })

    return () => {
      return (
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
              align={ column.align }
              noPadding={ column.id === 'data-table-select' || column.id === 'data-table-expand' }
            >
              {{
                default: () => {
                  const slotName = `item.${column.id}`
                  const slotProps = {
                    item: props.item,
                    columns: columns.value,
                    isSelected,
                    toggleSelect,
                    isExpanded,
                    toggleExpand,
                  }

                  if (slots[slotName]) return slots[slotName]!(slotProps)

                  if (column.id === 'data-table-select') {
                    return slots['item.data-table-select']?.(slotProps) ?? (
                      <VCheckboxBtn
                        modelValue={ isSelected([props.item]) }
                        onClick={ () => toggleSelect(props.item) }
                      />
                    )
                  }

                  if (column.id === 'data-table-expand') {
                    return slots['item.data-table-expand']?.(slotProps) ?? (
                      <VBtn
                        variant="text"
                        size="small"
                        icon={isExpanded(props.item) ? '$collapse' : '$expand' }
                        onClick={ () => toggleExpand(props.item) }
                      />
                    )
                  }

                  return props.item.columns[column.id]
                },
              }}
            </VDataTableColumn>
          )) }
        </tr>
      )
    }
  },
})

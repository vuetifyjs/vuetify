// Components
import { VBtn } from '@/components/VBtn'
import { VCheckboxBtn } from '@/components/VCheckbox'

// Composables
import { useExpanded } from './composables/expand'
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'
import { VDataTableColumn } from './VDataTableColumn'

// Utilities
import { defineComponent, getPropertyFromItem, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { DataTableItem } from './types'

export const VDataTableRow = defineComponent({
  name: 'VDataTableRow',

  props: {
    index: Number as PropType<Number>,
    item: Object as PropType<DataTableItem>,
    onClick: Function as PropType<(e: MouseEvent) => void>,
  },

  setup (props, { slots }) {
    const { isSelected, toggleSelect } = useSelection()
    const { isExpanded, toggleExpand } = useExpanded()
    const { columns } = useHeaders()

    useRender(() => (
      <tr
        class={[
          'v-data-table__tr',
          {
            'v-data-table__tr--clickable': !!props.onClick,
          },
        ]}
        onClick={ props.onClick }
      >
        { !columns.value.length && (
          <VDataTableColumn
            key="no-data"
            v-slots={ slots }
          />
        )}

        { props.item && columns.value.map((column, i) => (
          <VDataTableColumn
            align={ column.align }
            fixed={ column.fixed }
            fixedOffset={ column.fixedOffset }
            lastFixed={ column.lastFixed }
            noPadding={ column.key === 'data-table-select' || column.key === 'data-table-expand' }
            width={ column.width }
          >
            {{
              default: () => {
                const item = props.item!
                const slotName = `item.${column.key}`
                const slotProps = {
                  index: props.index,
                  item: props.item,
                  columns: columns.value,
                  isSelected,
                  toggleSelect,
                  isExpanded,
                  toggleExpand,
                }

                if (slots[slotName]) return slots[slotName]!(slotProps)

                if (column.key === 'data-table-select') {
                  return slots['item.data-table-select']?.(slotProps) ?? (
                    <VCheckboxBtn
                      modelValue={ isSelected([item]) }
                      onClick={ () => toggleSelect(item) }
                    />
                  )
                }

                if (column.key === 'data-table-expand') {
                  return slots['item.data-table-expand']?.(slotProps) ?? (
                    <VBtn
                      icon={ isExpanded(item) ? '$collapse' : '$expand' }
                      size="small"
                      variant="text"
                      onClick={ () => toggleExpand(item) }
                    />
                  )
                }

                return getPropertyFromItem(item.columns, column.key)
              },
            }}
          </VDataTableColumn>
        ))}
      </tr>
    ))
  },
})

export type VDataTableRow = InstanceType<typeof VDataTableRow>

// Components
import { VBtn } from '@/components/VBtn'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VDataTableColumn } from './VDataTableColumn'

// Composables
import { highlightResult } from '@/composables/filter'
import { useExpanded } from './composables/expand'
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'

// Utilities
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { DataTableItem } from './types'

export const VDataTableRow = defineComponent({
  name: 'VDataTableRow',

  props: {
    item: Object as PropType<DataTableItem>,
    getMatches: Function,
  },

  setup (props, { slots }) {
    const { isSelected, toggleSelect } = useSelection()
    const { isExpanded, toggleExpand } = useExpanded()
    const { columns } = useHeaders()

    useRender(() => (
      <tr
        class={[
          'v-data-table__tr',
        ]}
      >
        { !columns.value.length && (
          <VDataTableColumn
            key="no-data"
            v-slots={ slots }
          />
        ) }

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
                      icon={isExpanded(item) ? '$collapse' : '$expand' }
                      size="small"
                      variant="text"
                      onClick={ () => toggleExpand(item) }
                    />
                  )
                }

                return highlightResult('v-data-table', String(item.columns[column.key]), props.getMatches!(item)?.[column.key])
              },
            }}
          </VDataTableColumn>
        )) }
      </tr>
    ))
  },
})

export type VDataTableRow = InstanceType<typeof VDataTableRow>

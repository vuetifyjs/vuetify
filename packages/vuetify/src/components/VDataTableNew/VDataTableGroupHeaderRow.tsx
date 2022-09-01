// Components
import { VBtn } from '../VBtn'
import { VCheckboxBtn } from '../VCheckbox'
import { VDataTableColumn } from './VDataTableColumn'

// Composables
import { useGroupBy, useHeaders, useSelection } from './composables'

// Utilities
import { computed } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'
import type { GroupHeaderItem } from './composables'

export const VDataTableGroupHeaderRow = defineComponent({
  name: 'VDataTableGroupHeaderRow',

  props: {
    item: {
      type: Object as PropType<GroupHeaderItem>,
      required: true,
    },
  },

  setup (props, { slots }) {
    const { opened, toggleGroup, extractRows } = useGroupBy()
    const { isSelected, isSomeSelected, select } = useSelection()
    const { columns } = useHeaders()

    const rows = computed(() => {
      return extractRows([props.item])
    })

    return () => (
      <tr
        class="v-data-table-group-header-row"
        style={{
          '--v-data-table-group-header-row-depth': props.item.depth,
        }}
      >
        { columns.value.map(column => {
          if (column.id === 'data-table-group') {
            return slots['data-table-group']?.() ?? (
              <VDataTableColumn class="v-data-table-group-header-row__column">
                <VBtn
                  size="small"
                  variant="text"
                  icon={ opened.value.has(props.item.id) ? '$expand' : '$next' }
                  onClick={ () => toggleGroup(props.item.id) }
                />
                <span>{ props.item.value }</span>
                <span>({ rows.value.length })</span>
              </VDataTableColumn>
            )
          }

          if (column.id === 'data-table-select') {
            const allSelected = isSelected(rows.value)
            const someSelected = isSomeSelected(rows.value)
            return slots['data-table-select']?.() ?? (
              <VCheckboxBtn
                modelValue={allSelected}
                indeterminate={someSelected && !allSelected}
                onUpdate:modelValue={v => select(rows.value, v)}
              />
            )
          }

          return <td />
        })}
      </tr>
    )
  },
})

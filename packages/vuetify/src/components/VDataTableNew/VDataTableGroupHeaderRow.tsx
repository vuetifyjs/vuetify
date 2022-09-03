// Components
import { VBtn } from '../VBtn'
import { VCheckboxBtn } from '../VCheckbox'
import { VDataTableColumn } from './VDataTableColumn'

// Composables
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'
import { useGroupBy } from './composables/group'

// Utilities
import { computed } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'
import type { GroupHeaderItem } from './types'

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
            const icon = opened.value.has(props.item.id) ? '$expand' : '$next'
            const onClick = () => toggleGroup(props.item.id)

            return slots['data-table-group']?.({ item: props.item, count: rows.value.length, props: { icon, onClick } }) ?? (
              <VDataTableColumn class="v-data-table-group-header-row__column">
                <VBtn
                  size="small"
                  variant="text"
                  icon={ icon }
                  onClick={ onClick }
                />
                <span>{ props.item.value }</span>
                <span>({ rows.value.length })</span>
              </VDataTableColumn>
            )
          }

          if (column.id === 'data-table-select') {
            const modelValue = isSelected(rows.value)
            const indeterminate = isSomeSelected(rows.value) && !modelValue
            const selectGroup = (v: boolean) => select(rows.value, v)
            return slots['data-table-select']?.({ props: { modelValue, indeterminate, 'onUpdate:modelValue': selectGroup } }) ?? (
              <VCheckboxBtn
                modelValue={ modelValue }
                indeterminate={ indeterminate }
                onUpdate:modelValue={ selectGroup }
              />
            )
          }

          return <td />
        })}
      </tr>
    )
  },
})

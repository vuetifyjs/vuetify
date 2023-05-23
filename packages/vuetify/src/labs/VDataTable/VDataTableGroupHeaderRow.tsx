// Components
import { VDataTableColumn } from './VDataTableColumn'
import { VBtn } from '@/components/VBtn'
import { VCheckboxBtn } from '@/components/VCheckbox'

// Composables
import { useGroupBy } from './composables/group'
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { Group } from './composables/group'

export type VDataTableGroupHeaderRowSlots = {
  'data-table-group': { item: Group, count: number, props: Record<string, unknown> }
  'data-table-select': { props: Record<string, unknown> }
}

export const makeVDataTableGroupHeaderRowProps = propsFactory({
  item: {
    type: Object as PropType<Group>,
    required: true,
  },
}, 'v-data-table-group-header-row')

export const VDataTableGroupHeaderRow = genericComponent<VDataTableGroupHeaderRowSlots>()({
  name: 'VDataTableGroupHeaderRow',

  props: makeVDataTableGroupHeaderRowProps(),

  setup (props, { slots }) {
    const { isGroupOpen, toggleGroup, extractRows } = useGroupBy()
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
          if (column.key === 'data-table-group') {
            const icon = isGroupOpen(props.item) ? '$expand' : '$next'
            const onClick = () => toggleGroup(props.item)

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

          if (column.key === 'data-table-select') {
            const modelValue = isSelected(rows.value)
            const indeterminate = isSomeSelected(rows.value) && !modelValue
            const selectGroup = (v: boolean) => select(rows.value, v)
            return slots['data-table-select']?.({ props: { modelValue, indeterminate, 'onUpdate:modelValue': selectGroup } }) ?? (
              <td>
                <VCheckboxBtn
                  modelValue={ modelValue }
                  indeterminate={ indeterminate }
                  onUpdate:modelValue={ selectGroup }
                />
              </td>
            )
          }

          return <td />
        })}
      </tr>
    )
  },
})

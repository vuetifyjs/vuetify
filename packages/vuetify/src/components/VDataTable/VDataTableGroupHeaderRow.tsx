// Components
import { VDataTableColumn } from './VDataTableColumn'
import { VBtn } from '@/components/VBtn'
import { VCheckboxBtn } from '@/components/VCheckbox'

// Composables
import { useGroupBy } from './composables/group'
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'
import { IconValue } from '@/composables/icons'

// Utilities
import { computed, toRef } from 'vue'
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
  groupCollapseIcon: {
    type: IconValue,
    default: '$tableGroupCollapse',
  },
  groupExpandIcon: {
    type: IconValue,
    default: '$tableGroupExpand',
  },
}, 'VDataTableGroupHeaderRow')

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

    const colspan = toRef(() => columns.value.length - (columns.value.some(c => c.key === 'data-table-select') ? 1 : 0))

    return () => (
      <tr
        class="v-data-table-group-header-row"
        style={{
          '--v-data-table-group-header-row-depth': props.item.depth,
        }}
      >
        { columns.value.map(column => {
          if (column.key === 'data-table-group') {
            const icon = isGroupOpen(props.item) ? props.groupCollapseIcon : props.groupExpandIcon
            const onClick = () => toggleGroup(props.item)

            return slots['data-table-group']?.({ item: props.item, count: rows.value.length, props: { icon, onClick } }) ?? (
              <VDataTableColumn
                class="v-data-table-group-header-row__column"
                colspan={ colspan.value }
              >
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
          } else if (column.key === 'data-table-select') {
            const modelValue = isSelected(rows.value)
            const indeterminate = isSomeSelected(rows.value) && !modelValue
            const selectGroup = (v: boolean) => select(rows.value, v)
            return slots['data-table-select']?.({ props: { modelValue, indeterminate, 'onUpdate:modelValue': selectGroup } }) ?? (
              <VDataTableColumn class="v-data-table__td--select-row" noPadding>
                <VCheckboxBtn
                  modelValue={ modelValue }
                  indeterminate={ indeterminate }
                  onUpdate:modelValue={ selectGroup }
                />
              </VDataTableColumn>
            )
          }

          return ''
        })}
      </tr>
    )
  },
})

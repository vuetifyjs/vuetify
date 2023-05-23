// Components
import { VBtn } from '@/components/VBtn'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VDataTableColumn } from './VDataTableColumn'

// Composables
import { useExpanded } from './composables/expand'
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'
import { useGroupBy } from './composables/group'

// Utilities
import { computed, withModifiers } from 'vue'
import { genericComponent, getPropertyFromItem, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { DataTableItem, InternalDataTableHeader } from './types'

export type VDataTableRowItemColumnSlot = {
  index: number
  item: DataTableItem
  columns: InternalDataTableHeader[]
  isExpanded: ReturnType<typeof useExpanded>['isExpanded']
  toggleExpand: ReturnType<typeof useExpanded>['toggleExpand']
  isSelected: ReturnType<typeof useSelection>['isSelected']
  toggleSelect: ReturnType<typeof useSelection>['toggleSelect']
  toggleGroup: ReturnType<typeof useGroupBy>['toggleGroup']
  isGroupOpen: ReturnType<typeof useGroupBy>['toggleGroup']
}

export type VDataTableRowSlots = {
  'item.data-table-select': VDataTableRowItemColumnSlot
  'item.data-table-expand': VDataTableRowItemColumnSlot
} & { [key: `item.${string}`]: VDataTableRowItemColumnSlot }

export const makeVDataTableRowProps = propsFactory({
  item: {
    type: Object as PropType<DataTableItem>,
    required: true,
  },
  onClick: Function as PropType<(e: Event, value: { item: DataTableItem }) => void>,
}, 'VDataTableRow')

export const VDataTableRow = genericComponent<VDataTableRowSlots>()({
  name: 'VDataTableRow',

  props: makeVDataTableRowProps(),

  setup (props, { slots }) {
    const { isSelected, toggleSelect } = useSelection()
    const { expandOnClick, isExpanded, toggleExpand } = useExpanded()
    const { isGroupOpen, toggleGroup } = useGroupBy()
    const { columns } = useHeaders()

    const slotProps = computed(() => ({
      index: props.item.index,
      item: props.item,
      columns: columns.value,
      isExpanded,
      toggleExpand,
      isSelected,
      toggleSelect,
      isGroupOpen,
      toggleGroup,
      props: {
        onClick: expandOnClick.value || props.onClick ? (event: MouseEvent) => {
          if (expandOnClick.value) {
            toggleExpand(props.item)
          }

          props.onClick?.(event, { item: props.item })
        } : undefined
      }
    }))

    useRender(() => {
      return (
        <tr
          class={[
            'v-data-table__tr',
            {
              'v-data-table__tr--clickable': !!props.onClick,
            },
          ]}
          { ...slotProps.value.props }
        >
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
                  const slotName = `item.${column.key}` as const

                  if (slots[slotName]) return slots[slotName]!(slotProps.value)

                  if (column.key === 'data-table-select') {
                    return slots['item.data-table-select']?.(slotProps.value) ?? (
                      <VCheckboxBtn
                        disabled={ !props.item.selectable }
                        modelValue={ isSelected([props.item]) }
                        onClick={ withModifiers(() => toggleSelect(props.item), ['stop']) }
                      />
                    )
                  }

                  if (column.key === 'data-table-expand') {
                    return slots['item.data-table-expand']?.(slotProps.value) ?? (
                      <VBtn
                        icon={ isExpanded(props.item) ? '$collapse' : '$expand' }
                        size="small"
                        variant="text"
                        onClick={ withModifiers(() => toggleExpand(props.item), ['stop']) }
                      />
                    )
                  }

                  return getPropertyFromItem(props.item.columns, column.key)
                },
              }}
            </VDataTableColumn>
          ))}
        </tr>
      )
    })
  },
})

export type VDataTableRow = InstanceType<typeof VDataTableRow>

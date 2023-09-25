// Components
import { VBtn } from '@/components/VBtn'
import { VCheckboxBtn } from '@/components/VCheckbox'

// Composables
import { useExpanded } from './composables/expand'
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'
import { VDataTableColumn } from './VDataTableColumn'

// Utilities
import { toDisplayString, withModifiers } from 'vue'
import { genericComponent, getObjectValueByPath, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { DataTableItem, ItemKeySlot } from './types'

export type VDataTableRowSlots = {
  'item.data-table-select': Omit<ItemKeySlot, 'value'>
  'item.data-table-expand': Omit<ItemKeySlot, 'value'>
} & { [key: `item.${string}`]: ItemKeySlot }

export const makeVDataTableRowProps = propsFactory({
  index: Number,
  item: Object as PropType<DataTableItem>,
  onClick: Function as PropType<(e: MouseEvent) => void>,
}, 'VDataTableRow')

export const VDataTableRow = genericComponent<VDataTableRowSlots>()({
  name: 'VDataTableRow',

  props: makeVDataTableRowProps(),

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
                const slotName = `item.${column.key}` as const
                const slotProps = {
                  index: props.index!,
                  item: item.raw,
                  internalItem: item,
                  value: getObjectValueByPath(item.columns, column.key),
                  column,
                  isSelected,
                  toggleSelect,
                  isExpanded,
                  toggleExpand,
                } satisfies ItemKeySlot

                if (slots[slotName]) return slots[slotName]!(slotProps)

                if (column.key === 'data-table-select') {
                  return slots['item.data-table-select']?.(slotProps) ?? (
                    <VCheckboxBtn
                      disabled={ !item.selectable }
                      modelValue={ isSelected([item]) }
                      onClick={ withModifiers(() => toggleSelect(item), ['stop']) }
                    />
                  )
                }

                if (column.key === 'data-table-expand') {
                  return slots['item.data-table-expand']?.(slotProps) ?? (
                    <VBtn
                      icon={ isExpanded(item) ? '$collapse' : '$expand' }
                      size="small"
                      variant="text"
                      onClick={ withModifiers(() => toggleExpand(item), ['stop']) }
                    />
                  )
                }

                return toDisplayString(slotProps.value)
              },
            }}
          </VDataTableColumn>
        ))}
      </tr>
    ))
  },
})

export type VDataTableRow = InstanceType<typeof VDataTableRow>

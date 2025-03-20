// Components
import { VDataTableColumn } from './VDataTableColumn'
import { VBtn } from '@/components/VBtn'
import { VCheckboxBtn } from '@/components/VCheckbox'

// Composables
import { useExpanded } from './composables/expand'
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'
import { useSort } from './composables/sort'
import { makeDisplayProps, useDisplay } from '@/composables/display'

// Utilities
import { toDisplayString, withModifiers } from 'vue'
import { EventProp, genericComponent, getObjectValueByPath, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { CellProps, DataTableItem, ItemKeySlot } from './types'
import type { VDataTableHeaderCellColumnSlotProps } from './VDataTableHeaders'
import type { GenericProps } from '@/util'

export type VDataTableItemCellColumnSlotProps<T> = Omit<ItemKeySlot<T>, 'value'> & {
  props: Record<string, unknown>
}

export type VDataTableRowSlots<T> = {
  'item.data-table-select': VDataTableItemCellColumnSlotProps<T>
  'item.data-table-expand': VDataTableItemCellColumnSlotProps<T>
  'header.data-table-select': VDataTableHeaderCellColumnSlotProps
  'header.data-table-expand': VDataTableHeaderCellColumnSlotProps
} & {
  [key: `item.${string}`]: ItemKeySlot<T>
  [key: `header.${string}`]: VDataTableHeaderCellColumnSlotProps
}

export const makeVDataTableRowProps = propsFactory({
  index: Number,
  item: Object as PropType<DataTableItem>,
  cellProps: [Object, Function] as PropType<CellProps<any>>,
  onClick: EventProp<[MouseEvent]>(),
  onContextmenu: EventProp<[MouseEvent]>(),
  onDblclick: EventProp<[MouseEvent]>(),

  ...makeDisplayProps(),
}, 'VDataTableRow')

export const VDataTableRow = genericComponent<new <T>(
  props: {
    item?: DataTableItem<T>
    cellProps?: CellProps<T>
  },
  slots: VDataTableRowSlots<T>,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VDataTableRow',

  props: makeVDataTableRowProps(),

  setup (props, { slots }) {
    const { displayClasses, mobile } = useDisplay(props, 'v-data-table__tr')
    const { isSelected, toggleSelect, someSelected, allSelected, selectAll } = useSelection()
    const { isExpanded, toggleExpand } = useExpanded()
    const { toggleSort, sortBy, isSorted } = useSort()
    const { columns } = useHeaders()

    useRender(() => (
      <tr
        class={[
          'v-data-table__tr',
          {
            'v-data-table__tr--clickable': !!(props.onClick || props.onContextmenu || props.onDblclick),
          },
          displayClasses.value,
        ]}
        onClick={ props.onClick as any }
        onContextmenu={ props.onContextmenu as any }
        onDblclick={ props.onDblclick as any }
      >
        { props.item && columns.value.map((column, i) => {
          const item = props.item!
          const slotName = `item.${column.key}` as const
          const headerSlotName = `header.${column.key}` as const
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
          } satisfies ItemKeySlot<any>

          const columnSlotProps: VDataTableHeaderCellColumnSlotProps = {
            column,
            selectAll,
            isSorted,
            toggleSort,
            sortBy: sortBy.value,
            someSelected: someSelected.value,
            allSelected: allSelected.value,
            getSortIcon: () => '',
          }

          const cellProps = typeof props.cellProps === 'function'
            ? props.cellProps({
              index: slotProps.index,
              item: slotProps.item,
              internalItem: slotProps.internalItem,
              value: slotProps.value,
              column,
            })
            : props.cellProps
          const columnCellProps = typeof column.cellProps === 'function'
            ? column.cellProps({
              index: slotProps.index,
              item: slotProps.item,
              internalItem: slotProps.internalItem,
              value: slotProps.value,
            })
            : column.cellProps

          return (
            <VDataTableColumn
              align={ column.align }
              class={{
                'v-data-table__td--expanded-row': column.key === 'data-table-expand',
                'v-data-table__td--select-row': column.key === 'data-table-select',
              }}
              fixed={ column.fixed }
              fixedOffset={ column.fixedOffset }
              lastFixed={ column.lastFixed }
              maxWidth={ !mobile.value ? column.maxWidth : undefined }
              noPadding={ column.key === 'data-table-select' || column.key === 'data-table-expand' }
              nowrap={ column.nowrap }
              width={ !mobile.value ? column.width : undefined }
              { ...cellProps }
              { ...columnCellProps }
            >
              {{
                default: () => {
                  if (column.key === 'data-table-select') {
                    return slots['item.data-table-select']?.({
                      ...slotProps,
                      props: {
                        disabled: !item.selectable,
                        modelValue: isSelected([item]),
                        onClick: withModifiers(() => toggleSelect(item), ['stop']),
                      },
                    }) ?? (
                      <VCheckboxBtn
                        disabled={ !item.selectable }
                        modelValue={ isSelected([item]) }
                        onClick={ withModifiers(() => toggleSelect(item), ['stop']) }
                      />
                    )
                  }

                  if (column.key === 'data-table-expand') {
                    return slots['item.data-table-expand']?.({
                      ...slotProps,
                      props: {
                        icon: isExpanded(item) ? '$collapse' : '$expand',
                        size: 'small',
                        variant: 'text',
                        onClick: withModifiers(() => toggleExpand(item), ['stop']),
                      },
                    }) ?? (
                      <VBtn
                        icon={ isExpanded(item) ? '$collapse' : '$expand' }
                        size="small"
                        variant="text"
                        onClick={ withModifiers(() => toggleExpand(item), ['stop']) }
                      />
                    )
                  }

                  if (slots[slotName] && !mobile.value) return slots[slotName](slotProps)

                  const displayValue = toDisplayString(slotProps.value)

                  return !mobile.value ? displayValue : (
                    <>
                      <div class="v-data-table__td-title">
                        { slots[headerSlotName]?.(columnSlotProps) ?? column.title }
                      </div>

                      <div class="v-data-table__td-value">
                        { slots[slotName]?.(slotProps) ?? displayValue }
                      </div>
                    </>
                  )
                },
              }}
            </VDataTableColumn>
          )
        })}
      </tr>
    ))
  },
})

export type VDataTableRow = InstanceType<typeof VDataTableRow>

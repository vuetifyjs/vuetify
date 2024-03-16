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
import { EventProp, genericComponent, getObjectValueByPath, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { CellProps, DataTableItem, ItemKeySlot } from './types'
import type { GenericProps } from '@/util'

export type VDataTableRowSlots<T> = {
  'item.data-table-select': Omit<ItemKeySlot<T>, 'value'>
  'item.data-table-expand': Omit<ItemKeySlot<T>, 'value'>
} & { [key: `item.${string}`]: ItemKeySlot<T> }

export const makeVDataTableRowProps = propsFactory({
  index: Number,
  item: Object as PropType<DataTableItem>,
  cellProps: [Object, Function] as PropType<CellProps<any>>,
  onClick: EventProp<[MouseEvent]>(),
  onContextmenu: EventProp<[MouseEvent]>(),
  onDblclick: EventProp<[MouseEvent]>(),
  mobileView: Boolean,
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
    const { isSelected, toggleSelect } = useSelection()
    const { isExpanded, toggleExpand } = useExpanded()
    const { columns, headers } = useHeaders()

    useRender(() => (
      <tr
        class={[
          'v-data-table__tr',
          {
            'v-data-table__tr--clickable': !!(props.onClick || props.onContextmenu || props.onDblclick),
            'v-data-table__tr--mobile': props.mobileView,
          },
        ]}
        onClick={ props.onClick as any }
        onContextmenu={ props.onContextmenu as any }
        onDblclick={ props.onDblclick as any }
      >
        {
          props.item && props.mobileView && headers.value.map((column, i) => {
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
            } satisfies ItemKeySlot<any>

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

            const cell = []

            column.forEach((col, v) => {
              const columnKey = col.key
              const isSelectOrExpand = columnKey === 'data-table-select' || columnKey === 'data-table-expand'

              cell.push(
                <VDataTableColumn
                  class={[
                    'v-data-table__td-mobile',
                    {
                      'v-data-table__td-mobile-select-row': columnKey === 'data-table-select',
                      'v-data-table__td-mobile-expanded-row': columnKey === 'data-table-expand',
                      'v-data-table__td-mobile-expanded-row-expanded is-expanded': isExpanded(item) && columnKey === 'data-table-expand',
                    }]}
                  align={ column.align }
                  noPadding={ isSelectOrExpand }
                  width={ column.width }
                  { ...cellProps }
                  { ...columnCellProps }
                >
                  {{
                    default: () => {
                      if (slots[slotName]) return slots[slotName]!(slotProps)

                      if (columnKey === 'data-table-select') {
                        return slots['item.data-table-select']?.(slotProps) ?? (
                        <VCheckboxBtn
                          disabled={ !item.selectable }
                          modelValue={ isSelected([item]) }
                          onClick={ withModifiers(() => toggleSelect(item), ['stop']) }
                        />
                        )
                      }

                      if (columnKey === 'data-table-expand') {
                        return slots['item.data-table-expand']?.(slotProps) ?? (
                        <VBtn
                          icon={ isExpanded(item) ? '$collapse' : '$expand' }
                          size="small"
                          variant="text"
                          onClick={ withModifiers(() => toggleExpand(item), ['stop']) }
                        />
                        )
                      }

                      return (
                        <>
                          <div class="v-data-table__td-mobile-key">{ toDisplayString(col.title) }</div>
                          <div class="v-data-table__td-mobile-value">{ toDisplayString(item.columns[columnKey]) }</div>
                        </>
                      )
                    },
                  }}
                </VDataTableColumn>
              )
            })

            return cell
          })
        }

        {
          props.item && !props.mobileView && columns.value.map((column, i) => {
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
            } satisfies ItemKeySlot<any>

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
                fixed={ column.fixed }
                fixedOffset={ column.fixedOffset }
                lastFixed={ column.lastFixed }
                noPadding={ column.key === 'data-table-select' || column.key === 'data-table-expand' }
                width={ column.width }
                { ...cellProps }
                { ...columnCellProps }
              >
                {{
                  default: () => {
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
            )
          })
        }
      </tr>
    ))
  },
})

export type VDataTableRow = InstanceType<typeof VDataTableRow>

// Components
import { VDataTableGroupHeaderRow } from './VDataTableGroupHeaderRow'
import { VDataTableRow } from './VDataTableRow'

// Composables
import { useExpanded } from './composables/expand'
import { useGroupBy } from './composables/group'
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'
import { useLocale } from '@/composables/locale'

// Utilities
import { Fragment, mergeProps } from 'vue'
import { genericComponent, getPrefixedEventHandlers, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { Group } from './composables/group'
import type { CellProps, DataTableItem, GroupHeaderSlot, ItemSlot, RowProps } from './types'
import type { VDataTableGroupHeaderRowSlots } from './VDataTableGroupHeaderRow'
import type { VDataTableRowSlots } from './VDataTableRow'
import type { GenericProps } from '@/util'

export type VDataTableRowsSlots<T> = VDataTableGroupHeaderRowSlots & VDataTableRowSlots<T> & {
  item: ItemSlot<T> & { props: Record<string, any> }
  loading: never
  'group-header': GroupHeaderSlot
  'no-data': never
  'expanded-row': ItemSlot<T>
}

export const makeVDataTableRowsProps = propsFactory({
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: '$vuetify.dataIterator.loadingText',
  },
  hideNoData: Boolean,
  items: {
    type: Array as PropType<readonly (DataTableItem | Group)[]>,
    default: () => ([]),
  },
  noDataText: {
    type: String,
    default: '$vuetify.noDataText',
  },
  rowProps: [Object, Function] as PropType<RowProps<any>>,
  cellProps: [Object, Function] as PropType<CellProps<any>>,
}, 'VDataTableRows')

export const VDataTableRows = genericComponent<new <T>(
  props: {
    items?: readonly (DataTableItem<T> | Group<T>)[]
  },
  slots: VDataTableRowsSlots<T>,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VDataTableRows',

  inheritAttrs: false,

  props: makeVDataTableRowsProps(),

  setup (props, { attrs, slots }) {
    const { columns } = useHeaders()
    const { expandOnClick, toggleExpand, isExpanded } = useExpanded()
    const { isSelected, toggleSelect } = useSelection()
    const { toggleGroup, isGroupOpen } = useGroupBy()
    const { t } = useLocale()

    useRender(() => {
      if (props.loading && (!props.items.length || slots.loading)) {
        return (
          <tr
            class="v-data-table-rows-loading"
            key="loading"
          >
            <td colspan={ columns.value.length }>
              { slots.loading?.() ?? t(props.loadingText) }
            </td>
          </tr>
        )
      }

      if (!props.loading && !props.items.length && !props.hideNoData) {
        return (
          <tr
            class="v-data-table-rows-no-data"
            key="no-data"
          >
            <td colspan={ columns.value.length }>
              { slots['no-data']?.() ?? t(props.noDataText) }
            </td>
          </tr>
        )
      }

      return (
        <>
          { props.items.map((item, index) => {
            if (item.type === 'group') {
              const slotProps = {
                index,
                item,
                columns: columns.value,
                isExpanded,
                toggleExpand,
                isSelected,
                toggleSelect,
                toggleGroup,
                isGroupOpen,
              } satisfies GroupHeaderSlot

              return slots['group-header'] ? slots['group-header'](slotProps) : (
                <VDataTableGroupHeaderRow
                  key={ `group-header_${item.id}` }
                  item={ item }
                  { ...getPrefixedEventHandlers(attrs, ':group-header', () => slotProps) }
                  v-slots={ slots }
                />
              )
            }

            const slotProps = {
              index,
              item: item.raw,
              internalItem: item,
              columns: columns.value,
              isExpanded,
              toggleExpand,
              isSelected,
              toggleSelect,
            } satisfies ItemSlot<any>

            const itemSlotProps = {
              ...slotProps,
              props: mergeProps(
                {
                  key: `item_${item.key ?? item.index}`,
                  onClick: expandOnClick.value ? () => {
                    toggleExpand(item)
                  } : undefined,
                  index,
                  item,
                  cellProps: props.cellProps,
                },
                getPrefixedEventHandlers(attrs, ':row', () => slotProps),
                typeof props.rowProps === 'function'
                  ? props.rowProps({
                    item: slotProps.item,
                    index: slotProps.index,
                    internalItem: slotProps.internalItem,
                  })
                  : props.rowProps,
              ),
            }

            return (
              <Fragment key={ itemSlotProps.props.key as string }>
                { slots.item ? slots.item(itemSlotProps) : (
                  <VDataTableRow
                    { ...itemSlotProps.props }
                    v-slots={ slots }
                  />
                )}

                { isExpanded(item) && slots['expanded-row']?.(slotProps) }
              </Fragment>
            )
          })}
        </>
      )
    })

    return {}
  },
})

export type VDataTableRows = InstanceType<typeof VDataTableRows>

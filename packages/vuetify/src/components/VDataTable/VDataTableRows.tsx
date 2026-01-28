// Components
import { makeVDataTableGroupHeaderRowProps, VDataTableGroupHeaderRow } from './VDataTableGroupHeaderRow'
import { makeVDataTableRowProps, VDataTableRow } from './VDataTableRow'

// Composables
import { useExpanded } from './composables/expand'
import { useGroupBy } from './composables/group'
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'
import { makeDisplayProps, useDisplay } from '@/composables/display'
import { useLocale } from '@/composables/locale'

// Utilities
import { Fragment, mergeProps } from 'vue'
import { genericComponent, getPrefixedEventHandlers, pick, propsFactory, renderSlot, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { Group, GroupSummary } from './composables/group'
import type { CellProps, DataTableItem, GroupHeaderSlot, GroupSummarySlot, ItemSlot, RowProps } from './types'
import type { VDataTableGroupHeaderRowSlots } from './VDataTableGroupHeaderRow'
import type { VDataTableRowSlots } from './VDataTableRow'
import type { GenericProps } from '@/util'

export type VDataTableRowsSlots<T> = VDataTableGroupHeaderRowSlots & VDataTableRowSlots<T> & {
  item: ItemSlot<T> & { props: Record<string, any> }
  loading: never
  'group-header': GroupHeaderSlot
  'group-summary': GroupSummarySlot
  'no-data': never
  'expanded-row': ItemSlot<T>
}

export const makeVDataTableRowsProps = propsFactory({
  color: String,
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: '$vuetify.dataIterator.loadingText',
  },
  hideNoData: Boolean,
  items: {
    type: Array as PropType<readonly (DataTableItem | Group | GroupSummary)[]>,
    default: () => ([]),
  },
  noDataText: {
    type: String,
    default: '$vuetify.noDataText',
  },
  rowProps: [Object, Function] as PropType<RowProps<any>>,
  cellProps: [Object, Function] as PropType<CellProps<any>>,

  ...pick(makeVDataTableRowProps(), ['collapseIcon', 'expandIcon', 'density']),
  ...pick(makeVDataTableGroupHeaderRowProps(), ['groupCollapseIcon', 'groupExpandIcon', 'density']),
  ...makeDisplayProps(),
}, 'VDataTableRows')

export const VDataTableRows = genericComponent<new <T>(
  props: {
    items?: readonly (DataTableItem<T> | Group<T> | GroupSummary<T>)[]
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
    const { mobile } = useDisplay(props)

    useRender(() => {
      const groupHeaderRowProps = pick(props, ['groupCollapseIcon', 'groupExpandIcon', 'density'])

      if (props.loading && (!props.items.length || slots.loading)) {
        return (
          <tr
            class="v-data-table-rows-loading"
            key="loading"
          >
            <td colspan={ columns.value.length }>
              { renderSlot(slots, 'loading', () => t(props.loadingText)) }
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
              { renderSlot(slots, 'no-data', () => t(props.noDataText)) }
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

              return slots['group-header'] ? renderSlot(slots, 'group-header', slotProps) : (
                <VDataTableGroupHeaderRow
                  key={ `group-header_${item.id}` }
                  item={ item }
                  { ...getPrefixedEventHandlers(attrs, ':groupHeader', () => slotProps) }
                  { ...groupHeaderRowProps }
                  v-slots={ slots }
                />
              )
            }

            if (item.type === 'group-summary') {
              const slotProps = {
                index,
                item,
                columns: columns.value,
                toggleGroup,
              } satisfies GroupSummarySlot

              return renderSlot(slots, 'group-summary', slotProps, () => '')
            }

            const slotProps = {
              index: item.virtualIndex ?? index,
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
                  color: props.color,
                  cellProps: props.cellProps,
                  collapseIcon: props.collapseIcon,
                  expandIcon: props.expandIcon,
                  density: props.density,
                  mobile: mobile.value,
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
                { slots.item ? renderSlot(slots, 'item', itemSlotProps) : (
                  <VDataTableRow
                    { ...itemSlotProps.props }
                    v-slots={ slots }
                  />
                )}

                { isExpanded(item) && renderSlot(slots, 'expanded-row', slotProps) }
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

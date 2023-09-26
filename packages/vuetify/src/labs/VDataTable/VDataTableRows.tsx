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
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { Group } from './composables/group'
import type { DataTableItem, GroupHeaderSlot, ItemSlot } from './types'
import type { VDataTableGroupHeaderRowSlots } from './VDataTableGroupHeaderRow'
import type { VDataTableRowSlots } from './VDataTableRow'

export type VDataTableRowsSlots = VDataTableGroupHeaderRowSlots & VDataTableRowSlots & {
  item: ItemSlot & { props: Record<string, any> }
  loading: never
  'group-header': GroupHeaderSlot
  'no-data': never
  'expanded-row': ItemSlot
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
  rowHeight: Number,
  'onClick:row': Function as PropType<(e: Event, value: { item: any, internalItem: DataTableItem }) => void>,
}, 'VDataTableRows')

export const VDataTableRows = genericComponent<VDataTableRowsSlots>()({
  name: 'VDataTableRows',

  props: makeVDataTableRowsProps(),

  setup (props, { emit, slots }) {
    const { columns } = useHeaders()
    const { expandOnClick, toggleExpand, isExpanded } = useExpanded()
    const { isSelected, toggleSelect } = useSelection()
    const { toggleGroup, isGroupOpen } = useGroupBy()
    const { t } = useLocale()

    useRender(() => {
      if (props.loading && slots.loading) {
        return (
          <tr
            class="v-data-table-rows-loading"
            key="loading"
          >
            <td colspan={ columns.value.length }>
              { slots.loading() }
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
              return slots['group-header'] ? slots['group-header']({
                index,
                item,
                columns: columns.value,
                isExpanded,
                toggleExpand,
                isSelected,
                toggleSelect,
                toggleGroup,
                isGroupOpen,
              } as GroupHeaderSlot) : (
                <VDataTableGroupHeaderRow
                  key={ `group-header_${item.id}` }
                  item={ item }
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
            } satisfies ItemSlot

            const itemSlotProps = {
              ...slotProps,
              props: {
                key: `item_${item.key ?? item.index}`,
                onClick: expandOnClick.value || props['onClick:row'] ? (event: Event) => {
                  if (expandOnClick.value) {
                    toggleExpand(item)
                  }
                  props['onClick:row']?.(event, { item: item.raw, internalItem: item })
                } : undefined,
                index,
                item,
              },
            }

            return (
              <>
                { slots.item ? slots.item(itemSlotProps) : (
                  <VDataTableRow
                    { ...itemSlotProps.props }
                    v-slots={ slots }
                  />
                )}

                { isExpanded(item) && slots['expanded-row']?.(slotProps) }
              </>
            )
          })}
        </>
      )
    })

    return {}
  },
})

export type VDataTableRows = InstanceType<typeof VDataTableRows>

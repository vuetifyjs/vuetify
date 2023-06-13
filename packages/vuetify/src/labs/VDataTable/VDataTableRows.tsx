// Components
import { VDataTableGroupHeaderRow } from './VDataTableGroupHeaderRow'
import { VDataTableRow, VDataTableRowItemColumnSlot, VDataTableRowSlots } from './VDataTableRow'

// Composables
import { Expanded, useExpanded } from './composables/expand'
import { useGroupBy } from './composables/group'
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'
import { useLocale } from '@/composables/locale'

// Utilities
import { GenericProps, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { Group } from './composables/group'
import type { DataTableItem } from './types'
import type { VDataTableGroupHeaderRowSlots } from './VDataTableGroupHeaderRow'
import { computed } from 'vue'
import { VVirtualScrollItem } from '@/components/VVirtualScroll/VVirtualScrollItem'

type GroupHeaderSlot = Omit<VDataTableRowItemColumnSlot, 'item' | 'index'> & {
  item: Group
}

type ItemSlot = VDataTableRowItemColumnSlot & {
  item: DataTableItem
}

export type VDataTableRowsSlots = VDataTableGroupHeaderRowSlots & VDataTableRowSlots & {
  loading: never
  'group-header': GroupHeaderSlot
  'no-data': never
  'expanded-row': ItemSlot
  item: ItemSlot
}

export const makeVDataTableRowsProps = propsFactory({
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: '$vuetify.dataIterator.loadingText',
  },
  hideNoData: Boolean,
  items: {
    type: Array as PropType<readonly any[]>,
    default: () => ([]),
  },
  noDataText: {
    type: String,
    default: '$vuetify.noDataText',
  },
  rowHeight: Number,
  'onClick:row': Function as PropType<(e: Event, value: { item: DataTableItem }) => void>,
  virtual: Boolean,
}, 'VDataTableRows')

type Keyed<T> = { key: number | string, item: T }

export const VDataTableRows = genericComponent<new <
  T extends DataTableItem | Group<DataTableItem> | Expanded<DataTableItem>,
  Virtual extends boolean = false,
  Item = Virtual extends true ? Keyed<T> : T,
>(
props: {
  items?: Item[]
  virtual?: Virtual
},
slots: VDataTableRowsSlots
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VDataTableRows',

  props: makeVDataTableRowsProps(),

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const { isSelected, toggleSelect } = useSelection()
    const { isExpanded, toggleExpand } = useExpanded()
    const { isGroupOpen, toggleGroup } = useGroupBy()
    const { columns } = useHeaders()

    const slotProps = computed(() => ({
      columns: columns.value,
      isExpanded,
      toggleExpand,
      isSelected,
      toggleSelect,
      isGroupOpen,
      toggleGroup,
    }))

    function makeRow (item: DataTableItem | Group<DataTableItem> | Expanded<DataTableItem>, extraProps?: Record<string, any> | void) {
      if (item.type === 'group') {
        return slots['group-header'] ? slots['group-header']({
          item,
          ...slotProps.value,
        } as GroupHeaderSlot) : (
          <VDataTableGroupHeaderRow
            key={ item.key }
            item={ item }
            v-slots={ slots }
          />
        )
      }

      if (item.type === 'expanded') {
        return slots['expanded-row']?.({ item: item.item, index: item.item.index, ...slotProps.value, ...extraProps })
      }

      return slots.item ? slots.item({ item, index: item.index, ...slotProps.value, ...extraProps }) : (
        <VDataTableRow
          { ...extraProps?.props }
          item={ item }
          key={ item.key }
          v-slots={ slots }
        />
      )
    }

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
          { props.items.map(item => {
            if (props.virtual) {
              return (
                <VVirtualScrollItem
                  virtualKey={ item.key }
                  dynamicHeight
                  renderless
                >
                  { slotProps => makeRow(item.item, slotProps) }
                </VVirtualScrollItem>
              )
            }

            return makeRow(item)
          })}
        </>
      )
    })

    return {}
  },
})

export type VDataTableRows = InstanceType<typeof VDataTableRows>

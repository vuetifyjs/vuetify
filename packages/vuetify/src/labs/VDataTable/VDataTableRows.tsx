// Components
import { VDataTableGroupHeaderRow } from './VDataTableGroupHeaderRow'
import { VDataTableRow } from './VDataTableRow'

// Composables
import { useLocale } from '@/composables/locale'
import { useExpanded } from './composables/expand'
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'
import { useGroupBy } from './composables/group'

// Utilities
import { genericComponent, useRender } from '@/util'

// Types
import type { DataTableItem, GroupHeaderItem, InternalDataTableHeader, InternalDataTableItem } from './types'
import type { PropType } from 'vue'

type GroupHeaderSlot = {
  index: number
  item: GroupHeaderItem
  columns: InternalDataTableHeader[]
  isExpanded: (item: DataTableItem) => boolean
  toggleExpand: (item: DataTableItem) => void
  isSelected: (items: DataTableItem[]) => boolean
  toggleSelect: (item: DataTableItem) => void
  toggleGroup: (group: GroupHeaderItem) => void
  isGroupOpen: (group: GroupHeaderItem) => boolean
}

type ItemSlot = {
  index: number
  item: InternalDataTableItem
  columns: InternalDataTableHeader[]
  isExpanded: (item: DataTableItem) => boolean
  toggleExpand: (item: DataTableItem) => void
  isSelected: (items: DataTableItem[]) => boolean
  toggleSelect: (item: DataTableItem) => void
}

export type VDataTableRowsSlots = {
  default: []
  item: [ItemSlot]
  loading: []
  'group-header': [GroupHeaderSlot]
  'no-data': []
  'expanded-row': [ItemSlot]
  'item.data-table-select': [ItemSlot]
  'item.data-table-expand': [ItemSlot]
} & { [key: `item.${string}`]: [ItemSlot] }

export const VDataTableRows = genericComponent<VDataTableRowsSlots>()({
  name: 'VDataTableRows',

  props: {
    loading: [Boolean, String],
    loadingText: {
      type: String,
      default: '$vuetify.dataIterator.loadingText',
    },
    hideNoData: Boolean,
    items: {
      type: Array as PropType<InternalDataTableItem[]>,
      default: () => ([]),
    },
    noDataText: {
      type: String,
      default: '$vuetify.noDataText',
    },
    rowHeight: Number,
  },

  emits: {
    'click:row': (event: Event, value: { item: DataTableItem }) => true,
  },

  setup (props, { emit, slots }) {
    const { columns } = useHeaders()
    const { expandOnClick, toggleExpand, isExpanded } = useExpanded()
    const { isSelected, toggleSelect } = useSelection()
    const { toggleGroup, isGroupOpen } = useGroupBy()
    const { t } = useLocale()

    useRender(() => (
      <>
        { props.loading ? slots.loading?.() ?? (
          <VDataTableRow
            class="v-data-table-rows-no-data"
            key="loading"
          >
            { t(props.loadingText) }
          </VDataTableRow>
        ) : undefined }

        { !props.loading && !props.items.length && !props.hideNoData && (slots['no-data']?.() ?? (
          <VDataTableRow
            class="v-data-table-rows-no-data"
            key="no-data"
          >
            { t(props.noDataText) }
          </VDataTableRow>
        ))}

        { props.items.map((item, index) => {
          if (item.type === 'group-header') {
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
            item,
            columns: columns.value,
            isExpanded,
            toggleExpand,
            isSelected,
            toggleSelect,
          } as ItemSlot

          return (
            <>
              { slots.item ? slots.item(slotProps) : (
                <VDataTableRow
                  key={ `item_${item.value}` }
                  onClick={ (event: Event) => {
                    if (expandOnClick.value) {
                      toggleExpand(item.value)
                    }

                    emit('click:row', event, { item })
                  }}
                  item={ item }
                  v-slots={ slots }
                />
              )}

              { isExpanded(item) && slots['expanded-row']?.(slotProps) }
            </>
          )
        })}
      </>
    ))

    return {}
  },
})

export type VDataTableRows = InstanceType<typeof VDataTableRows>

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
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { DataTableItem, InternalDataTableItem } from './types'

export const VDataTableRows = defineComponent({
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
    getMatches: Function,
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
        )) }

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
            }) : (
              <VDataTableGroupHeaderRow
                key={ `group-header_${item.id}` }
                item={ item }
                v-slots={ slots }
              />
            )
          }

          return (
            <>
              { slots.item ? slots.item({
                index,
                item,
                columns: columns.value,
                isExpanded,
                toggleExpand,
                isSelected,
                toggleSelect,
              }) : (
                <VDataTableRow
                  key={ `item_${item.value}` }
                  onClick={ (event: Event) => {
                    if (expandOnClick.value) {
                      toggleExpand(item.value)
                    }

                    emit('click:row', event, { item })
                  } }
                  item={ item }
                  getMatches={ props.getMatches }
                  v-slots={ slots }
                />
              ) }

              { isExpanded(item.value) && slots['expanded-row']?.({ item, columns: columns.value }) }
            </>
          )
        }) }
      </>
    ))

    return {}
  },
})

export type VDataTableRows = InstanceType<typeof VDataTableRows>

// Components
import { VDataTableGroupHeaderRow } from './VDataTableGroupHeaderRow'
import { VDataTableRow } from './VDataTableRow'

// Composables
import { useExpanded } from './composables/expand'
import { useHeaders } from './composables/headers'
import { useLocale } from '@/composables/locale'

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
  },

  emits: {
    'click:row': (event: Event, value: { item: DataTableItem }) => true,
  },

  setup (props, { emit, slots }) {
    const { columns } = useHeaders()
    const { expanded, expand, expandOnClick } = useExpanded()
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
            return (
              <VDataTableGroupHeaderRow
                key={ `group-header_${item.id}` }
                item={ item }
                v-slots={ slots }
              />
            )
          }

          return (
            <>
              <VDataTableRow
                key={ `item_${item.value}` }
                onClick={ (event: Event) => {
                  if (expandOnClick.value) {
                    expand(item, !expanded.value.has(item.value))
                  }

                  emit('click:row', event, { item })
                } }
                item={ item }
                v-slots={ slots }
              />

              { expanded.value.has(item.value) && slots['expanded-row']?.({ item, columns: columns.value }) }
            </>
          )
        }) }
      </>
    ))

    return {}
  },
})

export type VDataTableRows = InstanceType<typeof VDataTableRows>

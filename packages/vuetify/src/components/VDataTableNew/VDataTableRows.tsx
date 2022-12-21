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
import type { InternalDataTableItem } from './types'

export const VDataTableRows = defineComponent({
  name: 'VDataTableRows',

  props: {
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

  setup (props, { slots }) {
    const { columns } = useHeaders()
    const { expanded, expand, expandOnClick } = useExpanded()
    const { t } = useLocale()

    useRender(() => (
      <>
        { !props.items.length && !props.hideNoData && (slots['no-data']?.() ?? (
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
                onClick={ expandOnClick.value ? () => expand(item, !expanded.value.has(item.value)) : undefined }
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

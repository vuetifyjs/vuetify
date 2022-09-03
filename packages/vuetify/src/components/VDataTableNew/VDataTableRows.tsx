// Components
import { VDataTableGroupHeaderRow } from './VDataTableGroupHeaderRow'
import { VDataTableRow } from './VDataTableRow'

// Composables
import { useHeaders } from './composables/headers'
import { useExpanded } from './composables/expand'

// Utilities
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { InternalDataTableItem } from './types'

export const VDataTableRows = defineComponent({
  name: 'VDataTableRows',

  props: {
    items: {
      type: Array as PropType<InternalDataTableItem[]>,
      required: true,
    },
    rowHeight: Number,
  },

  setup (props, { slots }) {
    const { columns } = useHeaders()
    const { expanded, expand, expandOnClick } = useExpanded()

    useRender(() => {
      return (
        <>
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
      )
    })

    return {}
  },
})

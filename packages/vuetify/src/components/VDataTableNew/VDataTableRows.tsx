// Components
import { VDataTableGroupHeaderRow } from './VDataTableGroupHeaderRow'
import { VDataTableRow } from './VDataTableRow'

// Composables
import { useExpanded } from './composables'

// Utilities
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { InternalDataTableItem } from './composables'

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
    const { expanded, expand, expandOnClick } = useExpanded()

    useRender(() => {
      return (
        <>
          { props.items.map(item => {
            if (item.type === 'group-header') {
              return (
                <VDataTableGroupHeaderRow
                  key={ `group-header_${item.id}` }
                  item={ item }
                  v-slots={ slots }
                />
              )
            }

            if (item.type === 'item') {
              return (
                <>
                  <VDataTableRow
                    key={ `item_${item.value}` }
                    onClick={ expandOnClick.value ? () => expand(item, !expanded.value.has(item.value)) : undefined }
                    item={ item }
                    v-slots={ slots }
                  />
                  { expanded.value.has(item.value) && slots['expanded-row']?.({ item, columns: props.columns }) }
                </>
              )
            }

            // if (item.type === 'expanded-item') {
            //   return slots['expanded-row']?.({ item })
            // }

            return null
          }) }
        </>
      )
      // (
      //   <>
      //     { props.items.map(item => item.type === 'group-header' ? (
      //       <VDataTableGroupHeaderRow
      //         key={ `group-header_${item.groupBy}_${item.groupByValue}` }
      //         item={ item }
      //         columns={ props.columns }
      //         v-slots={ slots }
      //       />
      //     ) : (
      //       <>
      //         <VDataTableRow
      //           key={ `row_${item.id}` }
      //           onClick={ slots['expanded-row'] ? () => expand(item, !expanded.value.has(item.value)) : undefined }
      //           item={ item }
      //           columns={ props.columns }
      //           v-slots={ slots }
      //         />

      //         { expanded.value.has(item.value) && slots['expanded-row']?.() }
      //       </>
      //     )) }
      //   </>
      // )
    })

    return {}
  },
})

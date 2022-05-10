import { VBtn } from '@/components/VBtn'
import { VCheckbox } from '@/components/VCheckbox'
import { convertToUnit, defineComponent } from '@/util'

import type { PropType, SetupContext } from 'vue'
import { inject } from 'vue'
import { useExpanded } from './composables'
import { VDataTableGroupHeaderRow } from './VDataTableGroupHeaderRow'
import { VDataTableRow } from './VDataTableRow'

export const VDataTableRows = defineComponent({
  name: 'VDataTableRows',

  props: {
    columns: {
      type: Array as PropType<any[]>,
      required: true,
    },
    items: {
      type: Array as PropType<any[]>,
      required: true,
    },
    rowHeight: Number,
  },

  setup (props, { slots }) {
    const { expanded, expand } = useExpanded()

    return () => {
      return (
        <>
          {props.items.map(item => item.$type === 'group-header' ? (
            <VDataTableGroupHeaderRow
              key={ `group-header_${item.groupBy}_${item.groupByValue}` }
              item={ item }
              columns={ props.columns }
              v-slots={ slots }
            />
          ) : (
            <>
              <VDataTableRow
                key={ `row_${item.id}` }
                onClick={ slots['expanded-row'] ? () => expand(item, !expanded.value.has(item.value)) : undefined }
                item={ item }
                columns={ props.columns }
                v-slots={ slots }
              />

              { expanded.value.has(item.value) && slots['expanded-row']?.() }
            </>
          ))}
        </>
      )
    }
  },
})

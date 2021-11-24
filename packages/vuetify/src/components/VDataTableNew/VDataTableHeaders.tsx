import { defineComponent } from '@/util'
import { computed } from 'vue'

import type { PropType } from 'vue'

type DataTableHeader = {
  name: string
  colspan?: number
  rowspan?: number
}

function isMultipleHeaders (arr: any): arr is DataTableHeader[][] {
  return arr.length > 0 && Array.isArray(arr[0])
}

export const VDataTableHeaders = defineComponent({
  name: 'VDataTableHeaders',

  props: {
    headers: {
      type: Array as PropType<DataTableHeader[] | DataTableHeader[][]>,
      required: true,
    },
  },

  setup (props, { slots }) {
    const wrappedHeaders = computed<DataTableHeader[][]>(() => isMultipleHeaders(props.headers) ? props.headers : [props.headers])

    return () => {
      return wrappedHeaders.value.map(header => (
        <tr>
          {header.map(column => (
            <th colspan={column.colspan} rowspan={column.rowspan}>
              { column.name }
            </th>
          ))}
        </tr>
      ))
    }
  },
})

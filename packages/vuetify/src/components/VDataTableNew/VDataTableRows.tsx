import { defineComponent } from '@/util'
import { computed } from 'vue'

import type { PropType } from 'vue'

type DataTableHeader = {
  id: string
  name: string
  colspan?: number
  rowspan?: number
}

export const VDataTableRows = defineComponent({
  name: 'VDataTableRows',

  props: {
    headers: {
      type: Array as PropType<DataTableHeader[] | DataTableHeader[][]>,
      required: true,
    },
    items: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },

  setup (props, { slots }) {
    const columns = computed(() => props.headers.flatMap(header => {
      if (Array.isArray(header)) return header.filter(column => column.id != null)
      else return header.id ? [header] : []
    }))

    return () => {
      return props.items.map(item => (
        <tr>
          { columns.value.map(column => (
            <td>{ item[column.id] }</td>
          ))}
        </tr>
      ))
    }
  },
})

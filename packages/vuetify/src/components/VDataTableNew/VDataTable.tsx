import { defineComponent } from '@/util'
import { VTable } from '..'
import { VDataTableHeaders } from './VDataTableHeaders'

import type { PropType } from 'vue'
import { VDataTableRows } from './VDataTableRows'

type DataTableHeader = {
  id: string
  name: string
  colspan?: number
  rowspan?: number
}

export const VDataTable = defineComponent({
  name: 'VDataTable',

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
    return () => (
      <VTable>
        <thead>
          <VDataTableHeaders headers={ props.headers } />
        </thead>
        <tbody>
          <VDataTableRows headers={ props.headers } items={ props.items } />
        </tbody>
      </VTable>
    )
  },
})

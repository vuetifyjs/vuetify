import { computed, onBeforeUnmount, onMounted, ref, toRef, watch } from 'vue'
import { convertToUnit, defineComponent, getCurrentInstance, propsFactory } from '@/util'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'
import './VDataTable.sass'

import type { PropType, Ref } from 'vue'
import type { DataTableHeader } from '../types'
import { useHeaders } from '../composables'

export const makeVDataTableProps = propsFactory({
  headers: {
    type: Array as PropType<DataTableHeader[] | DataTableHeader[][]>,
    required: true,
  },
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
  height: [String, Number],
  width: [String, Number],
  fixedHeader: Boolean,
}, 'v-data-table')

export const VDataTable = defineComponent({
  name: 'VDataTable',

  props: {
    ...makeVDataTableProps(),
  },

  setup (props, { slots }) {
    const { headers, columns } = useHeaders(props)

    return () => (
      <div
        class="v-data-table-regular"
        style={{
          height: convertToUnit(props.height),
          width: convertToUnit(props.width),
        }}
      >
        <table
          class="v-data-table-regular__table"
          style={{
            width: convertToUnit(props.width),
          }}
          role="table"
        >
          <thead class="v-data-table-regular__thead" role="rowgroup">
            { slots.headers ? slots.headers() : (
              <VDataTableHeaders
                rows={ headers.value }
                sticky={ props.fixedHeader }
              />
            ) }
          </thead>
          <tbody class="v-data-table-regular__tbody" role="rowgroup">
            { slots.body ? slots.body() : (
              <VDataTableRows
                columns={ columns.value }
                items={ props.items }
                v-slots={ slots }
              />
            ) }
          </tbody>
        </table>
      </div>
    )
  },
})

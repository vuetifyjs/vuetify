import { defineComponent } from '@/util'
import { VBtn } from '../VBtn'
import { useGroup, useHeaders } from './composables'
import { VDataTableColumn } from './VDataTableColumn'

export const VDataTableGroupHeaderRow = defineComponent({
  name: 'VDataTableGroupHeaderRow',

  props: {
    item: {
      type: null,
      required: true,
    },
  },

  setup (props, { slots }) {
    const { opened, toggleGroup } = useGroup()
    const { columns } = useHeaders()

    return () => (
      <tr
        class="v-data-table-group-header-row"
      >
        <VDataTableColumn
          colspan={ columns.value.length }
        >
          <VBtn
            size="small"
            variant="text"
            icon={ opened.value.has(props.item.groupByValue) ? '$expand' : '$next' }
            onClick={ () => toggleGroup(props.item.groupByValue) }
          />
          <span>{ props.item.groupByValue }</span>
          <span>({ props.item.items.length })</span>
        </VDataTableColumn>
      </tr>
    )
  },
})

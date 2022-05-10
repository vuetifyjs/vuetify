import { defineComponent } from '@/util'
import { inject, PropType } from 'vue'
import { VBtn } from '../VBtn'
import { VDataTableColumn } from './VDataTableColumn'

export const VDataTableGroupHeaderRow = defineComponent({
  name: 'VDataTableGroupHeaderRow',

  props: {
    columns: {
      type: Array as PropType<any[]>,
      required: true,
    },
    item: {
      type: null,
      required: true,
    },
  },

  setup (props, { slots }) {
    const { opened, toggleGroup } = inject('v-data-table', {} as any)

    return () => (
      <tr
        class={[
          'v-data-table__tr',
          'v-data-table__tr--group-header',
        ]}
      >
        <VDataTableColumn
          colspan={ props.columns.length }
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

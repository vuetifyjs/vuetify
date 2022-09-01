import { defineComponent } from '@/util'
import { VBtn } from '../VBtn'
import { useGroupBy, useHeaders } from './composables'
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
    const { opened, toggleGroup } = useGroupBy()
    const { columns } = useHeaders()

    return () => (
      <tr
        class="v-data-table-group-header-row"
        style={{
          '--v-data-table-group-header-row-depth': props.item.depth,
        }}
      >
        { columns.value.map(column => {
          if (column.id !== 'data-table-group') return <td />

          return (
            <VDataTableColumn class="v-data-table-group-header-row__column">
              <VBtn
                size="small"
                variant="text"
                icon={ opened.value.has(props.item.id) ? '$expand' : '$next' }
                onClick={ () => toggleGroup(props.item.id) }
              />
              <span>{ props.item.value }</span>
              <span>({ props.item.items.length })</span>
            </VDataTableColumn>
          )
        })}
      </tr>
    )
  },
})

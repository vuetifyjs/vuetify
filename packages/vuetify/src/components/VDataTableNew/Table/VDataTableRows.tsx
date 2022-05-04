import { VBtn } from '@/components/VBtn'
import { VCheckbox } from '@/components/VCheckbox'
import { convertToUnit, defineComponent } from '@/util'

import type { PropType, SetupContext } from 'vue'
import { inject } from 'vue'
import { useExpanded } from '../composables'

export function VDataTableRow (props: any, { slots, attrs }: SetupContext) {
  return (
    <tr
      class={[
        'v-data-table__tr',
        {
          'v-data-table__tr--group-header': props.groupHeader,
        },
      ]}
      { ...attrs }
    >
      { slots.default?.() }
    </tr>
  )
}

export function VDataTableColumn (props: {
  height?: number
  stickyWidth?: number
  fixed?: boolean
}, { slots, attrs }: SetupContext) {
  return (
    <td
      class={[
        'v-data-table__td',
        {
          'v-data-table__td--fixed': props.fixed,
        },
      ]}
      style={{
        height: convertToUnit(props.height),
        left: props.fixed ? convertToUnit(props.stickyWidth ?? 0) : undefined,
      }}
      { ...attrs }
    >
      { slots.default?.() }
    </td>
  )
}

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
    const { toggleGroup, opened, toggleSelect, isSelected } = inject('v-data-table', {} as any)
    const { expanded, expand } = useExpanded()

    return () => {
      return (
        <>
          {props.items.map(item => item.$type === 'group-header' ? (
            <VDataTableRow
              groupHeader
              key={ `group-header_${item.groupBy}_${item.groupByValue}` }
            >
              <VDataTableColumn
                colspan={ props.columns.length }
              >
                <VBtn
                  size="small"
                  variant="text"
                  icon={ opened.value.has(item.groupByValue) ? '$expand' : '$next' }
                  onClick={ () => toggleGroup(item.groupByValue) }
                />
                <span>{ item.groupByValue }</span>
                <span>({ item.items.length })</span>
              </VDataTableColumn>
            </VDataTableRow>
          ) : (
            <>
              <VDataTableRow
                key={ `row_${item.value}` }
                onClick={ slots['expanded-row'] ? () => expand(item, !expanded.value.has(item.value)) : undefined }
              >
                { props.columns.map(column => (
                  <VDataTableColumn
                    fixed={ column.fixed }
                    stickyWidth={ column.stickyWidth }
                    height={ props.rowHeight }
                  >
                    {
                      slots[`item.${column.value}`]?.() ?? column.value === 'data-table-select' ? (
                        <VCheckbox
                          modelValue={ isSelected(item) }
                          onClick={ () => toggleSelect(item) }
                          hide-details
                        />
                      ) : item[column.value]
                    }
                  </VDataTableColumn>
                ))}
              </VDataTableRow>

              { expanded.value.has(item.value) && slots['expanded-row']?.() }
            </>
          ))}
        </>
      )
    }
  },
})

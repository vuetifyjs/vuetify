// Components
import { VIcon } from '@/components/VIcon'
import { VProgressLinear } from '@/components/VProgressLinear'
import { VCheckbox } from '@/components/VCheckbox'

// Composables

// Utilities
import { computed, inject } from 'vue'
import { convertToUnit, defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'
import type { DataTableHeader } from './types'
import type { SortItem } from './composables'

export const VDataTableHeaders = defineComponent({
  name: 'VDataTableHeaders',

  props: {
    color: String,
    columns: {
      type: Array as PropType<DataTableHeader[]>,
      required: true,
    },
    loading: Boolean,
    headers: {
      type: Array as PropType<DataTableHeader[][]>,
      required: true,
    },
    rowHeight: {
      type: Number,
      default: 48,
    },
    sticky: Boolean,
    sortBy: Array as PropType<readonly SortItem[]>,
  },

  setup (props, { slots, emit }) {
    const { toggleSort, someSelected, allSelected, selectAll } = inject('v-data-table', {} as any)

    const fixedOffsets = computed(() => {
      return props.columns.reduce((offsets, column) => {
        return [...offsets, offsets[offsets.length - 1] + (column.width ?? 0)]
      }, [0])
    })

    const getFixedStyles = (fixed: boolean | undefined, y: number, x: number) => {
      if (!props.sticky && !fixed) return null

      return {
        position: 'sticky',
        zIndex: fixed ? 4 : props.sticky ? 3 : undefined, // TODO: This needs to account for possible previous fixed columns.
        left: fixed ? convertToUnit(fixedOffsets.value[x]) : undefined, // TODO: This needs to account for possible row/colspan of previous columns
        top: props.sticky ? `${props.rowHeight * y}px` : undefined,
      }
    }

    function getSortIcon (id: string) {
      const item = props.sortBy?.find(item => item.key === id)

      if (!item) return 'mdi-arrow-up'

      return item.order === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down'
    }

    const VDataTableHeaderCell = ({ column, x, y }: { column: DataTableHeader, x: number, y: number }) => {
      return (
        <th
          class={[
            'v-data-table__th',
            {
              'v-data-table__th--sortable': column.sortable !== false && column.id,
              'v-data-table__th--sorted': !!props.sortBy?.find(x => x.key === column.id),
              'v-data-table-column--fixed': column.fixed,
            },
          ]}
          style={{
            width: convertToUnit(column.width),
            minWidth: convertToUnit(column.width),
            height: convertToUnit(props.rowHeight),
            ...getFixedStyles(column.fixed, y, x),
          }}
          role="columnheader"
          colspan={column.colspan}
          rowspan={column.rowspan}
          onClick={column.sortable !== false ? () => toggleSort(column.id) : undefined}
        >
          { column.id === 'data-table-select' ? (
            <VCheckbox
              hide-details
              modelValue={ allSelected.value }
              indeterminate={ someSelected.value && !allSelected.value }
              onUpdate:modelValue={ selectAll }
            />
          ) : (
            <>
              <span>{ column.title }</span>
              { column.id && column.sortable !== false && (
                <VIcon
                  class="v-data-table-header__sort-icon"
                  icon={ getSortIcon(column.id) }
                />
              )}
            </>
          ) }
        </th>
      )
    }

    return () => {
      return (
        <>
          { props.headers.map((row, y) => (
            <tr class="v-data-table__tr" role="row">
              { row.map((column, x) => (
                <VDataTableHeaderCell column={ column} x={ x } y={ y } />
              )) }
            </tr>
          )) }
          { props.loading && (
            <tr class="v-data-table__progress">
              <th colspan={ props.columns?.length }>
                <VProgressLinear indeterminate color={ props.color } />
              </th>
            </tr>
          )}
        </>
      )
    }
  },
})

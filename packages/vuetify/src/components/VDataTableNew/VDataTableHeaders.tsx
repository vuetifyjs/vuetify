// Components
import { VIcon } from '@/components/VIcon'
import { VProgressLinear } from '@/components/VProgressLinear'
import { VCheckboxBtn } from '@/components/VCheckbox'

// Composables
import { useSort } from './composables/sort'
import { useSelection } from './composables/select'
import { useHeaders } from './composables/headers'

// Utilities
import { computed } from 'vue'
import { convertToUnit, defineComponent } from '@/util'

// Types
import type { DataTableHeader } from './types'

export const VDataTableHeaders = defineComponent({
  name: 'VDataTableHeaders',

  props: {
    color: String,
    loading: Boolean,
    sticky: Boolean,
  },

  setup (props, { slots, emit }) {
    const { toggleSort, sortBy } = useSort()
    const { someSelected, allSelected, selectAll } = useSelection()
    const { columns, headers } = useHeaders()

    const fixedOffsets = computed(() => {
      return columns.value.reduce((offsets, column) => {
        return [...offsets, offsets[offsets.length - 1] + (column.width ?? 0)]
      }, [0])
    })

    const getFixedStyles = (fixed: boolean | undefined, y: number, x: number) => {
      if (!props.sticky && !fixed) return null

      return {
        position: 'sticky',
        zIndex: fixed ? 4 : props.sticky ? 3 : undefined, // TODO: This needs to account for possible previous fixed columns.
        left: fixed ? convertToUnit(fixedOffsets.value[x]) : undefined, // TODO: This needs to account for possible row/colspan of previous columns
        top: props.sticky ? `calc(var(--v-table-header-height) * ${y})` : undefined,
      }
    }

    function getSortIcon (id: string) {
      const item = sortBy.value.find(item => item.key === id)

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
              'v-data-table__th--sorted': !!sortBy.value.find(x => x.key === column.id),
              'v-data-table-column--fixed': column.fixed,
            },
          ]}
          style={{
            width: convertToUnit(column.width),
            minWidth: convertToUnit(column.width),
            ...getFixedStyles(column.fixed, y, x),
          } as any} // TODO: fix type
          role="columnheader"
          colspan={column.colspan}
          rowspan={column.rowspan}
          onClick={column.sortable !== false ? () => toggleSort(column.id) : undefined}
        >
          { column.id === 'data-table-select' ? (
            <VCheckboxBtn
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
          { headers.value.map((row, y) => (
            <tr>
              { row.map((column, x) => (
                <VDataTableHeaderCell column={ column} x={ x } y={ y } />
              )) }
            </tr>
          )) }
          { props.loading && (
            <tr class="v-data-table__progress">
              <th colspan={ columns.value.length }>
                <VProgressLinear indeterminate color={ props.color } />
              </th>
            </tr>
          )}
        </>
      )
    }
  },
})

// Components
import { VIcon } from '@/components/VIcon'
import { VProgressLinear } from '@/components/VProgressLinear'
import { VCheckboxBtn } from '@/components/VCheckbox'

// Composables
import { useSort } from './composables/sort'
import { useSelection } from './composables/select'
import { useHeaders } from './composables/headers'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { convertToUnit, defineComponent } from '@/util'

// Types
import type { InternalDataTableHeader } from './types'
import { VDataTableColumn } from '.'

export const VDataTableHeaders = defineComponent({
  name: 'VDataTableHeaders',

  props: {
    color: String,
    loading: Boolean,
    sticky: Boolean,
    multiSort: Boolean,
  },

  setup (props, { slots, emit }) {
    const { toggleSort, sortBy } = useSort()
    const { someSelected, allSelected, selectAll } = useSelection()
    const { columns, headers } = useHeaders()

    const getFixedStyles = (column: InternalDataTableHeader, y: number) => {
      if (!props.sticky && !column.fixed) return null

      return {
        position: 'sticky',
        zIndex: column.fixed ? 4 : props.sticky ? 3 : undefined, // TODO: This needs to account for possible previous fixed columns.
        left: column.fixed ? convertToUnit(column.fixedOffset) : undefined, // TODO: This needs to account for possible row/colspan of previous columns
        top: props.sticky ? `calc(var(--v-table-header-height) * ${y})` : undefined,
      }
    }

    function getSortIcon (id: string) {
      const item = sortBy.value.find(item => item.key === id)

      if (!item) return 'mdi-arrow-up'

      return item.order === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down'
    }

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    const VDataTableHeaderCell = ({ column, x, y }: { column: InternalDataTableHeader, x: number, y: number }) => {
      const isSorted = !!sortBy.value.find(x => x.key === column.id)
      const isSortable = column.sortable !== false && column.id
      const noPadding = column.id === 'data-table-select' || column.id === 'data-table-expand'

      return (
        <VDataTableColumn
          tag="th"
          class={[
            'v-data-table__th',
            {
              'v-data-table__th--sortable': isSortable,
              'v-data-table__th--sorted': isSorted,
            },
          ]}
          style={{
            width: convertToUnit(column.width),
            minWidth: convertToUnit(column.width),
            ...getFixedStyles(column, y),
          }}
          colspan={column.colspan}
          rowspan={column.rowspan}
          onClick={column.sortable !== false ? () => toggleSort(column.id) : undefined}
          lastFixed={column.lastFixed}
          noPadding={noPadding}
        >
          {{
            default: () => {
              const slotName = `header.${column.id}`
              const slotProps = {
                column,
                selectAll,
              }

              if (slots[slotName]) return slots[slotName]!(slotProps)

              if (column.id === 'data-table-select') {
                return slots['header.data-table-select']?.(slotProps) ?? (
                  <VCheckboxBtn
                    modelValue={ allSelected.value }
                    indeterminate={ someSelected.value && !allSelected.value }
                    onUpdate:modelValue={ selectAll }
                  />
                )
              }

              return (
                <div class="v-data-table-header__content">
                  <span>{ column.title }</span>
                  { isSortable && (
                    <VIcon
                      key="icon"
                      class="v-data-table-header__sort-icon"
                      icon={ getSortIcon(column.id) }
                    />
                  )}
                  { props.multiSort && isSorted && (
                    <div
                      key="badge"
                      class={[
                        'v-data-table-header__sort-badge',
                        ...backgroundColorClasses.value,
                      ]}
                      style={backgroundColorStyles.value}
                    >
                      {sortBy.value.findIndex(x => x.key === column.id) + 1}
                    </div>
                  ) }
                </div>
              )
            },
          }}
        </VDataTableColumn>
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

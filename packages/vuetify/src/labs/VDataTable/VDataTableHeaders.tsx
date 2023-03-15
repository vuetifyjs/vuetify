// Components
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VDataTableColumn } from './VDataTableColumn'
import { VIcon } from '@/components/VIcon'

// Composables
import { IconValue } from '@/composables/icons'
import { LoaderSlot, makeLoaderProps, useLoader } from '@/composables/loader'
import { useBackgroundColor } from '@/composables/color'
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'
import { useSort } from './composables/sort'

// Utilities
import { convertToUnit, genericComponent, useRender } from '@/util'

// Types
import type { InternalDataTableHeader } from './types'
import type { LoaderSlotProps } from '@/composables/loader'

export type VDataTableHeadersSlots = {
  default: []
  loader: [LoaderSlotProps]
  'column.data-table-select': [InternalDataTableHeader, (value: boolean) => void]
}

export const VDataTableHeaders = genericComponent<VDataTableHeadersSlots>()({
  name: 'VDataTableHeaders',

  props: {
    color: String,
    sticky: Boolean,
    multiSort: Boolean,
    sortAscIcon: {
      type: IconValue,
      default: '$sortAsc',
    },
    sortDescIcon: {
      type: IconValue,
      default: '$sortDesc',
    },

    ...makeLoaderProps(),
  },

  setup (props, { slots, emit }) {
    const { toggleSort, sortBy } = useSort()
    const { someSelected, allSelected, selectAll } = useSelection()
    const { columns, headers } = useHeaders()
    const { loaderClasses } = useLoader(props)

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

      if (!item) return props.sortAscIcon

      return item.order === 'asc' ? props.sortAscIcon : props.sortDescIcon
    }

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    const VDataTableHeaderCell = ({ column, x, y }: { column: InternalDataTableHeader, x: number, y: number }) => {
      const isSorted = !!sortBy.value.find(x => x.key === column.key)
      const noPadding = column.key === 'data-table-select' || column.key === 'data-table-expand'

      return (
        <VDataTableColumn
          tag="th"
          align={ column.align }
          class={[
            'v-data-table__th',
            {
              'v-data-table__th--sortable': column.sortable,
              'v-data-table__th--sorted': isSorted,
            },
            loaderClasses.value,
          ]}
          style={{
            width: convertToUnit(column.width),
            minWidth: convertToUnit(column.width),
            ...getFixedStyles(column, y),
          }}
          colspan={ column.colspan }
          rowspan={ column.rowspan }
          onClick={ column.sortable ? () => toggleSort(column.key) : undefined }
          lastFixed={ column.lastFixed }
          noPadding={ noPadding }
        >
          {{
            default: () => {
              const slotName = `column.${column.key}`
              const slotProps = {
                column,
                selectAll,
              }

              if (slots[slotName]) return slots[slotName]!(slotProps)

              if (column.key === 'data-table-select') {
                return slots['column.data-table-select']?.(slotProps) ?? (
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
                  { column.sortable && (
                    <VIcon
                      key="icon"
                      class="v-data-table-header__sort-icon"
                      icon={ getSortIcon(column.key) }
                    />
                  )}
                  { props.multiSort && isSorted && (
                    <div
                      key="badge"
                      class={[
                        'v-data-table-header__sort-badge',
                        ...backgroundColorClasses.value,
                      ]}
                      style={ backgroundColorStyles.value }
                    >
                      { sortBy.value.findIndex(x => x.key === column.key) + 1 }
                    </div>
                  )}
                </div>
              )
            },
          }}
        </VDataTableColumn>
      )
    }

    useRender(() => (
      <>
        { headers.value.map((row, y) => (
          <tr>
            { row.map((column, x) => (
              <VDataTableHeaderCell column={ column } x={ x } y={ y } />
            ))}
          </tr>
        ))}

        { props.loading && (
          <tr class="v-data-table__progress">
            <th colspan={ columns.value.length }>

            <LoaderSlot
              name="v-data-table-headers"
              active
              color={ typeof props.loading === 'boolean' ? undefined : props.loading }
              indeterminate
              v-slots={{ default: slots.loader }}
            />
            </th>
          </tr>
        )}
      </>
    ))
  },
})

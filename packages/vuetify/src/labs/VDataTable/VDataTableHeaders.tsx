// Components
import { VDataTableColumn } from './VDataTableColumn'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VIcon } from '@/components/VIcon'

// Composables
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'
import { useSort } from './composables/sort'
import { useBackgroundColor } from '@/composables/color'
import { IconValue } from '@/composables/icons'
import { LoaderSlot, makeLoaderProps, useLoader } from '@/composables/loader'

// Utilities
import { computed } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { CSSProperties, UnwrapRef } from 'vue'
import type { provideSelection } from './composables/select'
import type { provideSort } from './composables/sort'
import type { InternalDataTableHeader } from './types'
import type { LoaderSlotProps } from '@/composables/loader'

export type HeadersSlotProps = {
  headers: InternalDataTableHeader[][]
  columns: InternalDataTableHeader[]
  sortBy: UnwrapRef<ReturnType<typeof provideSort>['sortBy']>
  someSelected: UnwrapRef<ReturnType<typeof provideSelection>['someSelected']>
  allSelected: UnwrapRef<ReturnType<typeof provideSelection>['allSelected']>
  toggleSort: ReturnType<typeof provideSort>['toggleSort']
  selectAll: ReturnType<typeof provideSelection>['selectAll']
  getSortIcon: (column: InternalDataTableHeader) => IconValue
  getFixedStyles: (column: InternalDataTableHeader, y: number) => CSSProperties | undefined
  isSorted: ReturnType<typeof provideSort>['isSorted']
}

type VDataTableHeaderCellColumnSlotProps = {
  column: InternalDataTableHeader
  selectAll: ReturnType<typeof provideSelection>['selectAll']
  isSorted: ReturnType<typeof provideSort>['isSorted']
  toggleSort: ReturnType<typeof provideSort>['toggleSort']
  sortBy: UnwrapRef<ReturnType<typeof provideSort>['sortBy']>
  someSelected: UnwrapRef<ReturnType<typeof provideSelection>['someSelected']>
  allSelected: UnwrapRef<ReturnType<typeof provideSelection>['allSelected']>
  getSortIcon: (column: InternalDataTableHeader) => IconValue
}

export type VDataTableHeadersSlots = {
  headers: HeadersSlotProps
  loader: LoaderSlotProps
  'column.data-table-select': VDataTableHeaderCellColumnSlotProps
  'column.data-table-expand': VDataTableHeaderCellColumnSlotProps
} & { [key: `column.${string}`]: VDataTableHeaderCellColumnSlotProps }

export const makeVDataTableHeadersProps = propsFactory({
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
}, 'v-data-table-headers')

export const VDataTableHeaders = genericComponent<VDataTableHeadersSlots>()({
  name: 'VDataTableHeaders',

  props: makeVDataTableHeadersProps(),

  setup (props, { slots, emit }) {
    const { toggleSort, sortBy, isSorted } = useSort()
    const { someSelected, allSelected, selectAll, showSelectAll } = useSelection()
    const { columns, headers } = useHeaders()
    const { loaderClasses } = useLoader(props)

    const getFixedStyles = (column: InternalDataTableHeader, y: number): CSSProperties | undefined => {
      if (!props.sticky && !column.fixed) return undefined

      return {
        position: 'sticky',
        zIndex: column.fixed ? 4 : props.sticky ? 3 : undefined, // TODO: This needs to account for possible previous fixed columns.
        left: column.fixed ? convertToUnit(column.fixedOffset) : undefined, // TODO: This needs to account for possible row/colspan of previous columns
        top: props.sticky ? `calc(var(--v-table-header-height) * ${y})` : undefined,
      }
    }

    function getSortIcon (column: InternalDataTableHeader) {
      const item = sortBy.value.find(item => item.key === column.key)

      if (!item) return props.sortAscIcon

      return item.order === 'asc' ? props.sortAscIcon : props.sortDescIcon
    }

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    const slotProps = computed(() => ({
      headers: headers.value,
      columns: columns.value,
      toggleSort,
      isSorted,
      sortBy: sortBy.value,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      selectAll,
      getSortIcon,
      getFixedStyles,
    } satisfies HeadersSlotProps))

    const VDataTableHeaderCell = ({ column, x, y }: { column: InternalDataTableHeader, x: number, y: number }) => {
      const noPadding = column.key === 'data-table-select' || column.key === 'data-table-expand'

      return (
        <VDataTableColumn
          tag="th"
          align={ column.align }
          class={[
            'v-data-table__th',
            {
              'v-data-table__th--sortable': column.sortable,
              'v-data-table__th--sorted': isSorted(column),
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
          onClick={ column.sortable ? () => toggleSort(column) : undefined }
          lastFixed={ column.lastFixed }
          noPadding={ noPadding }
        >
          {{
            default: () => {
              const columnSlotName = `column.${column.key}` as const
              const columnSlotProps: VDataTableHeaderCellColumnSlotProps = {
                column,
                selectAll,
                isSorted,
                toggleSort,
                sortBy: sortBy.value,
                someSelected: someSelected.value,
                allSelected: allSelected.value,
                getSortIcon,
              }

              if (slots[columnSlotName]) return slots[columnSlotName]!(columnSlotProps)

              if (column.key === 'data-table-select') {
                return slots['column.data-table-select']?.(columnSlotProps) ?? (showSelectAll && (
                  <VCheckboxBtn
                    modelValue={ allSelected.value }
                    indeterminate={ someSelected.value && !allSelected.value }
                    onUpdate:modelValue={ selectAll }
                  />
                ))
              }

              return (
                <div class="v-data-table-header__content">
                  <span>{ column.title }</span>
                  { column.sortable && (
                    <VIcon
                      key="icon"
                      class="v-data-table-header__sort-icon"
                      icon={ getSortIcon(column) }
                    />
                  )}
                  { props.multiSort && isSorted(column) && (
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

    useRender(() => {
      return (
        <>
          { slots.headers
            ? slots.headers(slotProps.value)
            : headers.value.map((row, y) => (
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
      )
    })
  },
})

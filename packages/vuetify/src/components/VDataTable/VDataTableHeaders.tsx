// Components
import { VDataTableColumn } from './VDataTableColumn'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VChip } from '@/components/VChip'
import { VIcon } from '@/components/VIcon'
import { VSelect } from '@/components/VSelect'

// Composables
import { useHeaders } from './composables/headers'
import { useSelection } from './composables/select'
import { useSort } from './composables/sort'
import { useBackgroundColor } from '@/composables/color'
import { makeDensityProps } from '@/composables/density'
import { makeDisplayProps, useDisplay } from '@/composables/display'
import { IconValue } from '@/composables/icons'
import { LoaderSlot, makeLoaderProps, useLoader } from '@/composables/loader'
import { useLocale } from '@/composables/locale'

// Utilities
import { computed, mergeProps, nextTick } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { CSSProperties, PropType, UnwrapRef } from 'vue'
import type { provideSelection } from './composables/select'
import type { provideSort } from './composables/sort'
import type { InternalDataTableHeader } from './types'
import type { ItemProps } from '@/composables/list-items'
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
  isSorted: ReturnType<typeof provideSort>['isSorted']
}

export type VDataTableHeaderCellColumnSlotProps = {
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
  'header.data-table-select': VDataTableHeaderCellColumnSlotProps
  'header.data-table-expand': VDataTableHeaderCellColumnSlotProps
} & { [key: `header.${string}`]: VDataTableHeaderCellColumnSlotProps }

export const makeVDataTableHeadersProps = propsFactory({
  color: String,
  disableSort: Boolean,
  fixedHeader: Boolean,
  multiSort: Boolean,
  initialSortOrder: String as PropType<'asc' | 'desc'>,
  sortIcon: {
    type: IconValue,
    // default: '$sort', // maybe in v4
  },
  sortAscIcon: {
    type: IconValue,
    default: '$sortAsc',
  },
  sortDescIcon: {
    type: IconValue,
    default: '$sortDesc',
  },
  headerProps: {
    type: Object as PropType<Record<string, any>>,
  },
  selectAllText: {
    type: String,
    default: '$vuetify.dataTable.ariaLabel.selectAll',
  },
  deselectAllText: {
    type: String,
    default: '$vuetify.dataTable.ariaLabel.deselectAll',
  },
  selectAllSelectedText: {
    type: String,
    default: '$vuetify.dataTable.ariaLabel.selectAllSelected',
  },

  /** @deprecated */
  sticky: Boolean,

  ...makeDensityProps(),
  ...makeDisplayProps(),
  ...makeLoaderProps(),
}, 'VDataTableHeaders')

export const VDataTableHeaders = genericComponent<VDataTableHeadersSlots>()({
  name: 'VDataTableHeaders',

  props: makeVDataTableHeadersProps(),

  setup (props, { slots }) {
    const { t } = useLocale()
    const { toggleSort, sortBy, isSorted } = useSort()
    const { someSelected, allSelected, selectAll, showSelectAll, selectedItemsCount, allItemsCount } = useSelection()
    const { columns, headers } = useHeaders()
    const { loaderClasses } = useLoader(props)

    function getFixedStyles (column: InternalDataTableHeader, y: number): CSSProperties | undefined {
      if (!(props.sticky || props.fixedHeader) && !column.fixed) return undefined

      const fixedSide = typeof column.fixed === 'string' ? column.fixed
        : column.fixed ? 'start'
        : 'none'

      return {
        position: 'sticky',
        left: fixedSide === 'start' ? convertToUnit(column.fixedOffset) : undefined,
        right: fixedSide === 'end' ? convertToUnit(column.fixedEndOffset) : undefined,
        top: (props.sticky || props.fixedHeader) ? `calc(var(--v-table-header-height) * ${y})` : undefined,
      }
    }
    function handleEnterKeyPress (event: KeyboardEvent, column: InternalDataTableHeader) {
      if (event.key === 'Enter' && !props.disableSort) {
        toggleSort(column, event)
      }
    }
    function getSortIcon (column: InternalDataTableHeader) {
      const item = sortBy.value.find(item => item.key === column.key)

      switch (item?.order) {
        case 'asc': return props.sortAscIcon
        case 'desc': return props.sortDescIcon
        default: return props.sortIcon ||
          (
            props.initialSortOrder === 'asc'
              ? props.sortAscIcon
              : props.sortDescIcon
          )
      }
    }

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.color)

    const { displayClasses, mobile } = useDisplay(props)

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
    } satisfies HeadersSlotProps))

    const headerCellClasses = computed(() => ([
      'v-data-table__th',
      {
        'v-data-table__th--sticky': (props.sticky || props.fixedHeader),
      },
      displayClasses.value,
      loaderClasses.value,
    ]))

    const showSelectLabel = computed(() => {
      const [key, count] = allSelected.value
        ? [props.deselectAllText, allItemsCount.value]
        : someSelected.value
          ? [props.selectAllSelectedText, selectedItemsCount.value]
          : [props.selectAllText, 0]

      return t(key, [count])
    })

    const VDataTableHeaderCell = ({ column, x, y }: { column: InternalDataTableHeader, x: number, y: number }) => {
      const noPadding = column.key === 'data-table-select' || column.key === 'data-table-expand'
      const isEmpty = column.key === 'data-table-group' && column.width === 0 && !column.title
      const headerProps = mergeProps(props.headerProps ?? {}, column.headerProps ?? {})
      const isSortable = column.sortable && !props.disableSort

      return (
        <VDataTableColumn
          tag="th"
          align={ column.align }
          class={[
            {
              'v-data-table__th--sortable': isSortable,
              'v-data-table__th--sorted': isSorted(column),
              'v-data-table__th--fixed': column.fixed,
            },
            ...headerCellClasses.value,
          ]}
          style={{
            width: convertToUnit(column.width),
            minWidth: convertToUnit(column.minWidth),
            maxWidth: convertToUnit(column.maxWidth),
            ...getFixedStyles(column, y),
          }}
          colspan={ column.colspan }
          rowspan={ column.rowspan }
          fixed={ column.fixed }
          nowrap={ column.nowrap }
          lastFixed={ column.lastFixed }
          firstFixedEnd={ column.firstFixedEnd }
          noPadding={ noPadding }
          empty={ isEmpty }
          tabindex={ isSortable ? 0 : undefined }
          onClick={ isSortable ? (event: PointerEvent) => toggleSort(column, event) : undefined }
          onKeydown={ isSortable ? (event: KeyboardEvent) => handleEnterKeyPress(event, column) : undefined }
          { ...headerProps }
        >
          {{
            default: () => {
              const columnSlotName = `header.${column.key}` as const
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

              if (isEmpty) return ''

              if (column.key === 'data-table-select') {
                return slots['header.data-table-select']?.(columnSlotProps) ?? (showSelectAll.value && (
                  <VCheckboxBtn
                    aria-label={ showSelectLabel.value }
                    color={ props.color }
                    density={ props.density }
                    modelValue={ allSelected.value }
                    indeterminate={ someSelected.value && !allSelected.value }
                    onUpdate:modelValue={ selectAll }
                  />
                ))
              }

              return (
                <div class="v-data-table-header__content">
                  <span>{ column.title }</span>
                  { column.sortable && !props.disableSort && (
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

    const VDataTableMobileHeaderCell = () => {
      const sortableColumns = computed<ItemProps['items']>(() => {
        return props.disableSort ? [] : columns.value.filter(column => column?.sortable)
      })
      const showSelectColumn = columns.value.find(column => column.key === 'data-table-select')
      const sortingChips = computed<InternalDataTableHeader | InternalDataTableHeader[] | null>({
        get: () => sortableColumns.value.filter(({ key }) => sortBy.value.some(v => v.key === key)),
        set: val => {
          const sortedColumns = wrapInArray(val)
          const activeSortKeys = sortBy.value.map(v => v.key)
          const newColumnsToSort = sortedColumns.filter(({ key }) => !activeSortKeys.includes(key!))
          newColumnsToSort.forEach(column => toggleSort(column))
          // sortBy is proxied model, needs nextTick after toggleSort
          nextTick(() => sortBy.value = sortBy.value.filter(({ key }) => sortedColumns.some(c => c.key === key)))
        },
      })

      return (
        <VDataTableColumn
          tag="th"
          class={[
            ...headerCellClasses.value,
          ]}
          colspan={ headers.value.length + 1 }
          { ...props.headerProps }
        >
          <div class="v-data-table-header__content">
            { sortableColumns.value.length > 0 && (
              <VSelect
                key="sort-selector"
                v-model={ sortingChips.value }
                data-testid="v-data-table-thead-mobile-sort-selector"
                chips
                color={ props.color }
                class="v-data-table__td-sort-select"
                clearable
                density="default"
                items={ sortableColumns.value }
                label={ t('$vuetify.dataTable.sortBy') }
                multiple={ props.multiSort }
                variant="underlined"
                returnObject
                onClick:clear={ () => sortBy.value = [] }
              >
                {{
                  append: showSelectColumn ? () => (
                    <VCheckboxBtn
                      data-testid="v-data-table-thead-mobile-select-checkbox"
                      color={ props.color }
                      density="compact"
                      aria-label={ showSelectLabel.value }
                      modelValue={ allSelected.value }
                      indeterminate={ someSelected.value && !allSelected.value }
                      onUpdate:modelValue={ () => selectAll(!allSelected.value) }
                    />
                  ) : undefined,
                  chip: ({ internalItem }) => (
                    <VChip
                      onClick={ internalItem.raw.sortable ? () => toggleSort(internalItem.raw, undefined, true) : undefined }
                      onMousedown={ (e: MouseEvent) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                    >
                      { internalItem.title }
                      <VIcon
                        class={[
                          'v-data-table__td-sort-icon',
                          isSorted(internalItem.raw) && 'v-data-table__td-sort-icon-active',
                        ]}
                        icon={ getSortIcon(internalItem.raw) }
                        size="small"
                      />
                    </VChip>
                  ),
                }}
              </VSelect>
            )}
            { showSelectColumn && sortableColumns.value.length === 0 && (
              <VCheckboxBtn
                key="select-checkbox"
                class="flex-row-reverse"
                data-testid="v-data-table-thead-mobile-select-checkbox"
                color={ props.color }
                density="compact"
                label={ showSelectLabel.value }
                modelValue={ allSelected.value }
                indeterminate={ someSelected.value && !allSelected.value }
                onUpdate:modelValue={ () => selectAll(!allSelected.value) }
              />
            )}
          </div>
        </VDataTableColumn>
      )
    }

    useRender(() => {
      return mobile.value ? (
        <tr>
          <VDataTableMobileHeaderCell />
        </tr>
      ) : (
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
            <tr class="v-data-table-progress">
              <th colspan={ columns.value.length }>
                <LoaderSlot
                  name="v-data-table-progress"
                  absolute
                  active
                  color={ typeof props.loading === 'boolean' || props.loading === 'true'
                    ? props.color
                    : props.loading }
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

export type VDataTableHeaders = InstanceType<typeof VDataTableHeaders>

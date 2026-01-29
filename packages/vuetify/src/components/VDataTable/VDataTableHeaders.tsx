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
import { computed, mergeProps } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

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
    default: '$sort',
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
    const { someSelected, allSelected, selectAll, showSelectAll } = useSelection()
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

    const VDataTableHeaderCell = ({ column, x, y }: { column: InternalDataTableHeader, x: number, y: number }) => {
      const noPadding = column.key === 'data-table-select' || column.key === 'data-table-expand'
      const isEmpty = column.key === 'data-table-group' && column.width === 0 && !column.title
      const headerProps = mergeProps(props.headerProps ?? {}, column.headerProps ?? {})

      return (
        <VDataTableColumn
          tag="th"
          align={ column.align }
          class={[
            {
              'v-data-table__th--sortable': column.sortable && !props.disableSort,
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
          tabindex={ column.sortable ? 0 : undefined }
          onClick={ column.sortable ? (event: PointerEvent) => toggleSort(column, event) : undefined }
          onKeydown={ column.sortable ? (event: KeyboardEvent) => handleEnterKeyPress(event, column) : undefined }
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
      const displayItems = computed<ItemProps['items']>(() => {
        return columns.value.filter(column => column?.sortable && !props.disableSort)
      })
      const showSelectColumn = columns.value.find(column => column.key === 'data-table-select')

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
            <VSelect
              chips
              color={ props.color }
              class="v-data-table__td-sort-select"
              clearable
              density="default"
              items={ displayItems.value }
              label={ t('$vuetify.dataTable.sortBy') }
              multiple={ props.multiSort }
              variant="underlined"
              onClick:clear={ () => sortBy.value = [] }
            >
              {{
                append: showSelectColumn ? () => (
                  <VCheckboxBtn
                    color={ props.color }
                    density="compact"
                    modelValue={ allSelected.value }
                    indeterminate={ someSelected.value && !allSelected.value }
                    onUpdate:modelValue={ () => selectAll(!allSelected.value) }
                  />
                ) : undefined,
                chip: props => (
                  <VChip
                    onClick={ props.item.raw?.sortable ? () => toggleSort(props.item.raw) : undefined }
                    onMousedown={ (e: MouseEvent) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    { props.item.title }
                    <VIcon
                      class={[
                        'v-data-table__td-sort-icon',
                        isSorted(props.item.raw) && 'v-data-table__td-sort-icon-active',
                      ]}
                      icon={ getSortIcon(props.item.raw) }
                      size="small"
                    />
                  </VChip>
                ),
              }}
            </VSelect>
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

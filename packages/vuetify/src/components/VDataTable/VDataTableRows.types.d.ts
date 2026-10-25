// Types
import type { Component, TransitionProps } from 'vue'
import type { Group, GroupSummary } from '@/components/VDataTable/composables/group.types'
import type { GroupHeaderSlot, GroupSummarySlot } from '@/components/VDataTable/types.types'
import type { CellProps, DataTableItem, DataTableLoading, ItemSlot, RowProps } from '@/components/VDataTable/types.types'
import type { VDataTableGroupHeaderRowSlots } from '@/components/VDataTable/VDataTableGroupHeaderRow.types'
import type { VDataTableRowSlots } from '@/components/VDataTable/VDataTableRow.types'
import type { Density } from '@/composables/density.types'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { FilterMatchArrayMultiple } from '@/composables/filter.types'
import type { IconValue } from '@/composables/icons.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'

export type VDataTableRowsSlots<T> = VDataTableGroupHeaderRowSlots & VDataTableRowSlots<T> & {
  item: ItemSlot<T> & { props: Record<string, any> }
  loading: never
  'group-header': GroupHeaderSlot
  'group-summary': GroupSummarySlot
  'no-data': never
  'expanded-row': ItemSlot<T>
  expanded: ItemSlot<T>
}

export interface VDataTableRowsProps {
  cellProps?: CellProps<any>
  collapseIcon?: IconValue
  color?: string
  density?: Density
  expandIcon?: IconValue
  expandTransition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | null
  getMatches?: ((item: DataTableItem<any>) => Record<string, FilterMatchArrayMultiple | undefined> | undefined)
  groupCollapseIcon?: IconValue
  groupExpandIcon?: IconValue
  hideNoData?: boolean
  items?: readonly (DataTableItem<any> | Group<any> | GroupSummary<any>)[]
  loading?: DataTableLoading
  loadingText?: string
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
  noDataText?: string
  rowProps?: RowProps<any>
}

type VDataTableRowsDefaultKeys =
  | 'collapseIcon'
  | 'density'
  | 'expandIcon'
  | 'expandTransition'
  | 'groupCollapseIcon'
  | 'groupExpandIcon'
  | 'hideNoData'
  | 'items'
  | 'loadingText'
  | 'mobile'
  | 'noDataText'

export declare const VDataTableRows: VuetifyComponent<
  VDataTableRowsProps,
  VDataTableRowsDefaultKeys,
  Record<string, any>,
  new <T>(
    props: {
      items?: readonly (DataTableItem<T> | Group<T> | GroupSummary<T>)[]
    },
    slots: VDataTableRowsSlots<T>,
  ) => GenericProps<typeof props, typeof slots>
>
export type VDataTableRows = InstanceType<typeof VDataTableRows>

export {}

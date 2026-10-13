// Types
import type { CellProps, DataTableItem, ItemKeySlot } from '@/components/VDataTable/types.types'
import type { VDataTableHeaderCellColumnSlotProps } from '@/components/VDataTable/VDataTableHeaders.types'
import type { Density } from '@/composables/density.types'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { FilterMatchArrayMultiple } from '@/composables/filter.types'
import type { IconValue } from '@/composables/icons.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'

export type VDataTableRowSlots<T> = {
  'item.data-table-select': VDataTableItemCellColumnSlotProps<T>
  'item.data-table-expand': VDataTableItemCellColumnSlotProps<T>
  'header.data-table-select': VDataTableHeaderCellColumnSlotProps
  'header.data-table-expand': VDataTableHeaderCellColumnSlotProps
} & {
  [key: `item.${string}`]: ItemKeySlot<T>
  [key: `header.${string}`]: VDataTableHeaderCellColumnSlotProps
}

export type VDataTableItemCellColumnSlotProps<T> = Omit<ItemKeySlot<T>, 'value'> & {
  props: Record<string, unknown>
}

export interface VDataTableRowProps {
  cellProps?: CellProps<any>
  collapseIcon?: IconValue
  color?: string
  density?: Density
  expandIcon?: IconValue
  getMatches?: ((item: DataTableItem<any>) => Record<string, FilterMatchArrayMultiple | undefined> | undefined)
  index?: number
  item?: DataTableItem<any>
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
  onClick?: ((args_0: MouseEvent) => void)
  onContextmenu?: ((args_0: MouseEvent) => void)
  onDblclick?: ((args_0: MouseEvent) => void)
  selectRowLabel?: string
}

export type VDataTableRowDefaultKeys =
  | 'collapseIcon'
  | 'density'
  | 'expandIcon'
  | 'mobile'
  | 'selectRowLabel'

export declare const VDataTableRow: VuetifyComponent<
  VDataTableRowProps,
  VDataTableRowDefaultKeys,
  Record<string, any>,
  new <T>(
    props: {
      item?: DataTableItem<T>
      cellProps?: CellProps<T>
    },
    slots: VDataTableRowSlots<T>,
  ) => GenericProps<typeof props, typeof slots>
>
export type VDataTableRow = InstanceType<typeof VDataTableRow>

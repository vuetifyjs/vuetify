// Types
import type { HeadersSlotProps, VDataTableHeaderCellColumnSlotProps } from '@/components/VDataTable/VDataTableHeaders'
import type { Density } from '@/composables/density.types'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { IconValue } from '@/composables/icons.types'
import type { LoaderSlotProps } from '@/composables/loader.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VDataTableHeadersSlots = {
  headers: HeadersSlotProps
  loader: LoaderSlotProps
  'header.data-table-select': VDataTableHeaderCellColumnSlotProps
  'header.data-table-expand': VDataTableHeaderCellColumnSlotProps
  'mobile.header': HeadersSlotProps
} & { [key: `header.${string}`]: VDataTableHeaderCellColumnSlotProps }

export interface VDataTableHeadersProps {
  color?: string
  density?: Density
  disableSort?: boolean
  fixedHeader?: boolean
  headerProps?: Record<string, any>
  initialSortOrder?: 'asc' | 'desc'
  loading?: string | boolean
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
  multiSort?: boolean
  selectAllLabel?: string
  sortAscIcon?: IconValue
  sortDescIcon?: IconValue
  sortIcon?: IconValue
  sticky?: boolean
}

export type VDataTableHeadersDefaultKeys =
  | 'density'
  | 'disableSort'
  | 'fixedHeader'
  | 'mobile'
  | 'multiSort'
  | 'selectAllLabel'
  | 'sortAscIcon'
  | 'sortDescIcon'
  | 'sticky'

export declare const VDataTableHeaders: VuetifyComponent<
  VDataTableHeadersProps,
  VDataTableHeadersDefaultKeys,
  Record<string, any>,
  VDataTableHeadersSlots
>
export type VDataTableHeaders = InstanceType<typeof VDataTableHeaders>

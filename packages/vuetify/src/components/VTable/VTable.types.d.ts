// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type Gridlines = 'horizontal' | 'vertical' | 'all'

export type Striped = null | 'odd' | 'even'

export type VTableSlots = {
  default: never
  top: never
  bottom: never
  wrapper: never
  caption: never
}

export interface VTableProps {
  class?: any
  density?: Density
  fixedFooter?: boolean
  fixedHeader?: boolean
  gridlines?: boolean | Gridlines
  height?: string | number
  hover?: boolean
  striped?: Striped
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
}

export type VTableDefaultKeys =
  | 'density'
  | 'fixedFooter'
  | 'fixedHeader'
  | 'gridlines'
  | 'hover'
  | 'striped'
  | 'style'
  | 'tag'

export declare const VTable: VuetifyComponent<
  VTableProps,
  VTableDefaultKeys,
  Record<string, any>,
  VTableSlots
>
export type VTable = InstanceType<typeof VTable>

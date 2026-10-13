// Types
import type { ComputedRef, StyleValue } from 'vue'
import type { Position } from '@/composables/layout.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VLayoutProps {
  class?: any
  fullHeight?: boolean
  height?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  overlaps?: string[]
  style?: StyleValue
  width?: string | number
}

export type VLayoutDefaultKeys =
  | 'fullHeight'
  | 'style'

export declare const VLayout: VuetifyComponent<
  VLayoutProps,
  VLayoutDefaultKeys,
  Record<string, any>,
  { default: never },
  { getLayoutItem: (id: string) => { size: number, position: Position, top: number, bottom: number, left: number, right: number, id: string } | undefined, items: ComputedRef<{ size: number, position: Position, top: number, bottom: number, left: number, right: number, id: string }[]> }
>
export type VLayout = InstanceType<typeof VLayout>

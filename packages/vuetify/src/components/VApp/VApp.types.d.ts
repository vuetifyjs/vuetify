// Types
import type { ComputedRef, StyleValue } from 'vue'
import type { Position } from '@/composables/layout.types'
import type { ThemeInstance } from '@/composables/theme.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VAppProps {
  class?: any
  overlaps?: string[]
  style?: StyleValue
  theme?: string
}

type VAppDefaultKeys =
  | 'style'

export declare const VApp: VuetifyComponent<
  VAppProps,
  VAppDefaultKeys,
  Record<string, any>,
  { default: never },
  { getLayoutItem: (id: string) => { size: number, position: Position, top: number, bottom: number, left: number, right: number, id: string } | undefined, items: ComputedRef<{ size: number, position: Position, top: number, bottom: number, left: number, right: number, id: string }[]>, theme: ThemeInstance }
>
export type VApp = InstanceType<typeof VApp>

export {}

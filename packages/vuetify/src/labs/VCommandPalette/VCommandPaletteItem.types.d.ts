// Types
import type { VCommandPaletteActionItem } from '@/labs/VCommandPalette/types.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VCommandPaletteItemSlots = {
  prepend: never
  title: never
  append: never
}

export interface VCommandPaletteItemProps {
  index: number
  item: VCommandPaletteActionItem
  onExecute?: ((event: MouseEvent | KeyboardEvent) => void)
}

export type VCommandPaletteItemDefaultKeys = never

export declare const VCommandPaletteItem: VuetifyComponent<
  VCommandPaletteItemProps,
  VCommandPaletteItemDefaultKeys,
  Record<string, any>,
  VCommandPaletteItemSlots
>
export type VCommandPaletteItem = InstanceType<typeof VCommandPaletteItem>

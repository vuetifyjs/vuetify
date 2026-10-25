// Types
import type { Ref, StyleValue } from 'vue'
import type { ScrollToPosition } from '@/composables/virtual.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { SelectItemKey } from '@/util/shared.types'

export interface VVirtualScrollSlot<T> {
  item: T
  index: number
}

export interface VVirtualScrollProps {
  class?: any
  height?: string | number
  itemHeight?: string | number
  itemKey?: SelectItemKey
  items?: readonly unknown[]
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  renderless?: boolean
  style?: StyleValue
  width?: string | number
}

type VVirtualScrollDefaultKeys =
  | 'itemHeight'
  | 'itemKey'
  | 'items'
  | 'renderless'
  | 'style'

export declare const VVirtualScroll: VuetifyComponent<
  VVirtualScrollProps,
  VVirtualScrollDefaultKeys,
  Record<string, any>,
  new <T, Renderless extends boolean = false>(
    props: {
      items?: readonly T[]
      renderless?: Renderless
    },
    slots: {
      default: VVirtualScrollSlot<T> & (Renderless extends true ? {
        itemRef: Ref<HTMLElement | undefined>
      } : {})
    }
  ) => GenericProps<typeof props, typeof slots>,
  { calculateVisibleItems: () => void, scrollToIndex: (index: number, position?: ScrollToPosition) => void }
>
export type VVirtualScroll = InstanceType<typeof VVirtualScroll>

export {}

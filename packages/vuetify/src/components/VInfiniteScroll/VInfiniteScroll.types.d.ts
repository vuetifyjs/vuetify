// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type InfiniteScrollSide = 'start' | 'end' | 'both'

export type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error'

export type VInfiniteScrollSlots = {
  default: never
  loading: InfiniteScrollSlot
  error: InfiniteScrollSlot
  empty: InfiniteScrollSlot
  'load-more': InfiniteScrollSlot
}

export type InfiniteScrollSlot = {
  side: InfiniteScrollSide
  props: Record<string, any>
}

export interface VInfiniteScrollProps {
  color?: string
  direction?: 'horizontal' | 'vertical'
  emptyText?: string
  height?: string | number
  loadMoreText?: string
  margin?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  mode?: 'intersect' | 'manual'
  side?: InfiniteScrollSide
  tag?: string | JSXComponent
  width?: string | number
}

type VInfiniteScrollDefaultKeys =
  | 'direction'
  | 'emptyText'
  | 'loadMoreText'
  | 'mode'
  | 'side'
  | 'tag'

export declare const VInfiniteScroll: VuetifyComponent<
  VInfiniteScrollProps,
  VInfiniteScrollDefaultKeys,
  {
    load: (options: { side: InfiniteScrollSide, done: (status: InfiniteScrollStatus) => void }) => true
  },
  VInfiniteScrollSlots,
  { reset: (side?: InfiniteScrollSide | undefined) => void }
>
export type VInfiniteScroll = InstanceType<typeof VInfiniteScroll>

export {}

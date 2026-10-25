// Types
import type { Ref } from 'vue'
import type { Anchor } from '@/util/anchor.types'

export interface LocationStrategyProps {
  location?: Anchor
  locationStrategy: 'static' | 'connected' | LocationStrategyFunction
  maxHeight?: number | string
  maxWidth?: number | string
  minHeight?: number | string
  minWidth?: number | string
  offset?: number | string | number[]
  origin: Anchor | 'auto' | 'overlap'
  stickToTarget?: boolean
  viewportMargin?: number | string
}

export interface LocationStrategyData {
  contentEl: Ref<HTMLElement | undefined>
  target: Ref<HTMLElement | [x: number, y: number] | undefined>
  isActive: Ref<boolean>
  isRtl: Ref<boolean>
}

export type LocationStrategyFunction = (
  data: LocationStrategyData,
  props: LocationStrategyProps,
  contentStyles: Ref<Record<string, string>>
) => undefined | { updateLocation: (e?: Event) => void }

export {}

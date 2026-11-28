// Types
import type { EffectScope, Ref } from 'vue'

export interface ScrollStrategyData {
  root: Ref<HTMLElement | undefined>
  contentEl: Ref<HTMLElement | undefined>
  targetEl: Ref<HTMLElement | undefined>
  target: Ref<HTMLElement | [x: number, y: number] | undefined>
  isActive: Ref<boolean>
  updateLocation: Ref<((e: Event) => void) | undefined>
}

export interface ScrollStrategyProps {
  contained: boolean | undefined
  scrollStrategy: 'none' | 'close' | 'block' | 'reposition' | ScrollStrategyFunction
}

export type ScrollStrategyFunction = (data: ScrollStrategyData, props: ScrollStrategyProps, scope: EffectScope) => void

export {}

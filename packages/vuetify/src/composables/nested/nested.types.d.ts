// Types
import type { ActiveStrategy } from '@/composables/nested/activeStrategies.types'
import type { OpenStrategy } from '@/composables/nested/openStrategies.types'
import type { SelectStrategy } from '@/composables/nested/selectStrategies.types'

export type ActiveStrategyProp =
  | 'single-leaf'
  | 'leaf'
  | 'independent'
  | 'single-independent'
  | ActiveStrategy
  | ((mandatory: boolean) => ActiveStrategy)

export type SelectStrategyProp =
  | 'single-leaf'
  | 'leaf'
  | 'independent'
  | 'single-independent'
  | 'classic'
  | 'trunk'
  | 'branch'
  | SelectStrategy
  | ((mandatory: boolean) => SelectStrategy)

export type OpenStrategyProp = 'single' | 'multiple' | 'list' | OpenStrategy

export type ItemsRegistrationType = 'props' | 'render'

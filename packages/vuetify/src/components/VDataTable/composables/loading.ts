// Utilities
import { computed } from 'vue'
import { isObject } from '@/util'

// Types
import type { DataTableLoading, DataTableLoadingSide } from '../types'

export function useLoadingConfig (
  loading: () => DataTableLoading | undefined,
  fallbackColor: () => string | undefined,
) {
  const active = computed(() => {
    const v = loading()
    return v != null && v !== false && v !== 'false'
  })

  const side = computed<DataTableLoadingSide>(() => {
    const v = loading()
    if (isObject(v) && v.side) return v.side
    return 'start'
  })

  const color = computed(() => {
    const v = loading()
    if (isObject(v) && v.color) return v.color
    if (typeof v === 'string' && v !== 'true') return v
    return fallbackColor()
  })

  return { active, side, color }
}

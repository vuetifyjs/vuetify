// Utilities
import { computed } from 'vue'

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
    if (typeof v === 'object' && v !== null && v.side) return v.side
    return 'start'
  })

  const color = computed(() => {
    const v = loading()
    if (typeof v === 'object' && v !== null && v.color) return v.color
    if (typeof v === 'string' && v !== 'true') return v
    return fallbackColor()
  })

  return { active, side, color }
}

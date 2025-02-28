// Utilities
import { computed } from 'vue'
import { getCurrentInstanceName, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

const allowedDensities = [null, 'default', 'comfortable', 'compact'] as const

// typeof allowedDensities[number] evaluates to any
// when generating api types for whatever reason.
export type Density = null | 'default' | 'comfortable' | 'compact'

export interface DensityProps {
  density?: Density
}

// Composables
export const makeDensityProps = propsFactory({
  density: {
    type: String as PropType<Density>,
    default: 'default',
    validator: (v: any) => allowedDensities.includes(v),
  },
}, 'density')

export function useDensity (
  props: DensityProps,
  name = getCurrentInstanceName(),
) {
  const densityClasses = computed(() => {
    return `${name}--density-${props.density}`
  })

  return { densityClasses }
}

// Utilities
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
import type { PropType } from 'vue'

const allowedDensities = ['default', 'comfortable', 'compact'] as const

type Density = typeof allowedDensities[number]

export interface DensityProps {
  density: Density
}

// Composables
export const makeDensityProps = propsFactory({
  density: {
    type: String as PropType<Density>,
    default: 'default',
    validator: (v: any) => allowedDensities.includes(v),
  },
})

export function useDensity (props: DensityProps, name: string) {
  const densityClasses = computed(() => {
    return `${name}--density-${props.density}`
  })

  return { densityClasses }
}

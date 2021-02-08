// Utilities
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
import type { Prop } from 'vue'

const allowedDensities = ['default', 'comfortable', 'compact'] as const

type Density = typeof allowedDensities[number]

export interface DensityProps {
  density?: Density
}

// Composables
export const makeDensityProps = propsFactory({
  density: {
    type: String,
    default: 'default',
    validator: (v: any) => allowedDensities.includes(v),
  } as Prop<Density>,
})

export function useDensity (props: DensityProps, name: string) {
  const densityClasses = computed(() => {
    return `${name}--${props.density}`
  })

  return { densityClasses }
}

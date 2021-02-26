// Utilities
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
export interface ElevationProps {
  elevation?: number | string | null
  flat?: boolean
}

// Composables
export const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],
    validator (v: any) {
      const value = parseInt(v)

      return (
        !isNaN(value) &&
        value >= 0 &&
        // Material Design has a maximum elevation of 24
        // https://material.io/design/environment/elevation.html#default-elevations
        value <= 24
      )
    },
  },
  flat: Boolean,
})

export function useElevation (props: ElevationProps, name: string) {
  const elevationClasses = computed(() => {
    if (props.flat) return `${name}--flat`

    return props.elevation != null ? `elevation-${props.elevation}` : undefined
  })

  return { elevationClasses }
}

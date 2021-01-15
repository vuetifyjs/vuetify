import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
export interface ElevationProps {
  elevation?: number | string | null
}

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
})

// Effect
export function useElevation (props: ElevationProps) {
  const elevationClasses = computed(() => {
    const classes: string[] = []

    if (props.elevation == null) return classes

    classes.push(`elevation-${props.elevation}`)

    return classes
  })

  return { elevationClasses }
}

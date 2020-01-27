// Setup
import { computed } from 'vue'

// Types
export interface ElevationProps {
  elevation?: number | string
}

// Props
export function elevationProps (
  defaults: Partial<ElevationProps> = {}
) {
  return {
    elevation: {
      type: [Number, String],
      default: defaults.elevation,
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
  }
}

// Effect
export function useElevationClasses (props: ElevationProps) {
  const elevationClasses = computed(() => {
    const { elevation } = props
    const hasElevation = (elevation != null && elevation !== '') ? true : undefined

    return {
      class: { [`elevation-${elevation}`]: hasElevation },
    }
  })

  return { elevationClasses }
}

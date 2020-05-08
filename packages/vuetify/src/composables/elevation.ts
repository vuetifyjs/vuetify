// Setup
import { computed } from 'vue'

// Types
export interface ElevationProps {
  elevation?: number | string
  flat?: boolean
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
    flat: Boolean,
  }
}

// Effect
export function useElevationClasses (props: ElevationProps) {
  const elevationClasses = computed(() => {
    const { elevation = props.flat ? 0 : undefined } = props

    return (elevation != null && elevation !== '') ? {
      class: { [`elevation-${elevation}`]: true },
    } : {}
  })

  return { elevationClasses }
}

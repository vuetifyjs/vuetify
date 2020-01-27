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
    },
  }
}

// Effect
export function useElevationClasses (props: ElevationProps) {
  const elevationClasses = computed(() => {
    const { elevation } = props
    const hasElevation = (elevation != null && elevation !== '') ? true : undefined

    return { [`elevation-${elevation}`]: hasElevation }
  })

  return { elevationClasses }
}

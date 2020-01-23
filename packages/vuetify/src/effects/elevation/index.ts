// Setup
import { computed } from 'vue'

// Types
interface ElevationProps {
  elevation?: number
}

// Props
export const ElevationProps = (
  defaults: Partial<ElevationProps> = {}
) => ({
  elevation: {
    type: Number,
    default: defaults.elevation,
  },
})

// Effect
export function useElevation ({ elevation }: ElevationProps) {
  const classes: Dictionary<boolean> = {}

  if (
    elevation != null &&
    !isNaN(parseInt(elevation))
  ) {
    classes[`elevation-${elevation}`] = true
  }

  const elevationClasses = computed(() => classes)

  return { elevationClasses }
}

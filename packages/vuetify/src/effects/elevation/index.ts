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
export function useElevation (props: ElevationProps) {
  return computed(() => ({
    elevationClasses: {
      [`elevation-${props.elevation}`]: Boolean(0 ^ props.elevation!),
    },
  }))
}

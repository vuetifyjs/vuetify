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
export function useElevationClasses (props: ElevationProps) {
  return computed(() => (0 ^ props.elevation!) ? { [`elevation-${props.elevation}`]: true } : {})
}

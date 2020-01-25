// Setup
import { computed } from 'vue'

// Types
export interface ElevationProps {
  elevation?: number
}

// Props
export const elevationProps = (
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

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
  return computed(() => ({ [`elevation-${props.elevation}`]: Boolean(0 ^ props.elevation!) }))
}

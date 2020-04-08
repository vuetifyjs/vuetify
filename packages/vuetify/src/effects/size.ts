// Setup
import { computed, PropType } from 'vue'

// Types
export interface SizeProps {
  size: Sizes
}

type Sizes = 'x-small' | 'small' | 'default' | undefined | 'large' | 'x-large'

// Props
export function sizeProps (defaults: Partial<SizeProps> = {}) {
  return {
    size: String as PropType<Sizes>,
    // TODO: Convert to optional chaining
    // when updated to TS 3.7
    default: (defaults || {}).size,
  }
}

// Effect
export function useSizeClasses (props: SizeProps) {
  const sizeClasses = computed(() => {
    // TODO: Convert to optional chaining
    // when updated to TS 3.7
    if (!props || typeof props !== 'object') return {}

    return { [`v-size--${props.size}`]: true }
  })

  return { sizeClasses }
}

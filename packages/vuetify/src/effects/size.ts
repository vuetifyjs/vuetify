// Setup
import { computed } from 'vue'

// Types
export interface SizeProps {
  large?: boolean
  small?: boolean
  xLarge?: boolean
  xSmall?: boolean
}

// Props
export function sizeProps (
  defaults: Partial<SizeProps> = {}
) {
  return {
    large: {
      type: Boolean,
      default: defaults.large,
    },
    small: {
      type: Boolean,
      default: defaults.small,
    },
    xLarge: {
      type: Boolean,
      default: defaults.xLarge,
    },
    xSmall: {
      type: Boolean,
      default: defaults.xSmall,
    },
  }
}

// Effect
export function useSizeClasses (props: SizeProps) {
  const medium = computed(() => {
    return (
      !props.large &&
      !props.small &&
      !props.xLarge &&
      !props.xSmall
    ) ? true : undefined
  })

  const sizeClasses = computed(() => {
    return {
      'v-size--x-small': props.xSmall,
      'v-size--small': props.small,
      'v-size--default': medium.value,
      'v-size--large': props.large,
      'v-size--x-large': props.xLarge,
    }
  })

  return { sizeClasses }
}

// Setup
import { computed } from 'vue'

// Types
import type { Prop } from 'vue'

export interface SizeProps {
  size?: Size
}

const allowedSizes = ['x-small', 'small', 'default', 'large', 'x-large'] as const

type Size = typeof allowedSizes[number] | undefined

// Props
export function makeSizeProps (defaults: Partial<SizeProps> = { size: 'default' }) {
  return {
    size: {
      type: String,
      default: defaults.size,
      validator: (v: any) => allowedSizes.includes(v),
    } as Prop<Size>,
  }
}

// Effect
export function useSizeClasses (props: SizeProps) {
  const sizeClasses = computed(() => {
    if (!props.size) return null

    return `v-size--${props.size}`
  })

  return { sizeClasses }
}

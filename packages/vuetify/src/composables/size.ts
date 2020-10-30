// Setup
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
import type { Prop } from 'vue'

const allowedSizes = ['x-small', 'small', 'default', 'large', 'x-large'] as const

type Size = typeof allowedSizes[number]

export interface SizeProps {
  size: Size
}

// Props
export const makeSizeProps = propsFactory({
  size: {
    type: String,
    default: 'default',
    validator: (v: any) => allowedSizes.includes(v),
  } as Prop<Size>,
})

// Effect
export function useSizeClasses (props: SizeProps) {
  const sizeClasses = computed(() => {
    if (!props.size) return null

    return `v-size--${props.size}`
  })

  return { sizeClasses }
}

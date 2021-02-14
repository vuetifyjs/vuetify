// Setup
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
import type { PropType } from 'vue'

const allowedSizes = ['x-small', 'small', 'default', 'large', 'x-large'] as const

type Size = typeof allowedSizes[number]

export interface SizeProps {
  size: Size
}

// Props
export const makeSizeProps = propsFactory({
  size: {
    type: String as PropType<Size>,
    default: 'default',
    validator: (v: any) => allowedSizes.includes(v),
  },
})

// Effect
export function useSizeClasses (props: SizeProps, name: string) {
  const sizeClasses = computed(() => {
    return `${name}--size-${props.size}`
  })

  return { sizeClasses }
}

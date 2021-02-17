// Setup
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

const predefinedSizes = ['x-small', 'small', 'default', 'large', 'x-large']

export interface SizeProps {
  size: string | number
}

// Props
export const makeSizeProps = propsFactory({
  size: {
    type: [String, Number],
    default: 'default',
  },
})

// Effect
export function useSize (props: SizeProps, name: string) {
  const sizeClasses = computed(() => {
    return predefinedSizes.includes(props.size as string)
      ? `${name}--size-${props.size}`
      : null
  })

  return { sizeClasses }
}

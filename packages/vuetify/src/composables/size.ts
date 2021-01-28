// Setup
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

const predefinedSizes = ['x-small', 'small', 'default', 'large', 'x-large']

export interface SizeProps {
  size?: string
}

// Props
export const makeSizeProps = propsFactory({
  size: {
    type: String,
    default: 'default',
  },
})

// Effect
export function useSize (props: SizeProps) {
  const sizeClasses = computed(() => {
    if (!props.size) return 'v-size--default'
    else if (!predefinedSizes.includes(props.size)) return null

    return `v-size--${props.size}`
  })

  return { sizeClasses }
}

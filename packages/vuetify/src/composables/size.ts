// Utilities
import { convertToUnit, destructComputed, getCurrentInstanceName, includes, propsFactory } from '@/util'

// Types
const predefinedSizes = ['x-small', 'small', 'default', 'large', 'x-large']

export interface SizeProps {
  size?: string | number
}

// Composables
export const makeSizeProps = propsFactory({
  size: {
    type: [String, Number],
    default: 'default',
  },
}, 'size')

export function useSize (
  props: SizeProps,
  name = getCurrentInstanceName(),
) {
  return destructComputed(() => {
    const size = props.size
    let sizeClasses
    let sizeStyles
    if (includes(predefinedSizes, size)) {
      sizeClasses = `${name}--size-${size}`
    } else if (size) {
      sizeStyles = {
        // ${name}-size is already used in some places for font size instead of dimensions
        [`--${name}-scale`]: convertToUnit(size),
      }
    }
    return { sizeClasses, sizeStyles }
  })
}

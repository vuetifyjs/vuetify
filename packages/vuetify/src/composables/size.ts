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
    let sizeClasses
    let sizeStyles
    if (includes(predefinedSizes, props.size)) {
      sizeClasses = `${name}--size-${props.size}`
    } else if (props.size) {
      sizeStyles = {
        width: convertToUnit(props.size),
        height: convertToUnit(props.size),
      }
    }
    return { sizeClasses, sizeStyles }
  })
}

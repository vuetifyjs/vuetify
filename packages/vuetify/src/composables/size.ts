// Utilities
import { convertToUnit, destructComputed, getCurrentInstanceName, includes, propsFactory } from '@/util'

// Types
const predefinedSizes = ['x-small', 'small', 'default', 'large', 'x-large']

export interface SizeProps {
  size?: number | string
  iconSize?: number | string
}

type Prop = 'size' | 'iconSize'

// Composables
export const makeSizeProps = propsFactory({
  size: {
    type: [String, Number],
    default: 'default',
  },
  iconSize: {
    type: [String, Number],
  },
}, 'size')

export function useSize (
  props: SizeProps,
  prop: Prop = 'size',
  name = getCurrentInstanceName(),
) {
  return destructComputed(() => {
    let sizeClasses
    let sizeStyles
    if (includes(predefinedSizes, props[prop])) {
      sizeClasses = `${name}--size-${props[prop]}`
    } else if (props[prop]) {
      sizeStyles = {
        width: convertToUnit(props[prop]),
        height: convertToUnit(props[prop]),
      }
    }
    return { sizeClasses, sizeStyles }
  })
}

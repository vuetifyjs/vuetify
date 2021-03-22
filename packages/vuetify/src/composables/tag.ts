// Utilities
import propsFactory from '@/util/propsFactory'

// Types
export interface TagProps {
  tag: string
}

// Composables
export const makeTagProps = propsFactory({
  tag: {
    type: String,
    default: 'div',
  },
}, 'tag')

// Setup
import propsFactory from '@/util/propsFactory'

// Props
export const makeTagProps = propsFactory({
  tag: {
    type: String,
    default: 'div',
  },
})

// Utilities
import propsFactory from '@/util/propsFactory'

// Types
import type { PropType } from 'vue'

export const makeTransitionProps = propsFactory({
  transition: {
    type: [Boolean, String] as PropType<string | false>,
    default: 'fade-transition',
    validator: val => val !== true,
  },
}, 'transition')

// Utilities
import { propsFactory } from '@/util/propsFactory'

// Types
import type { ClassValue, PropType, StyleValue } from 'vue'

export interface ComponentProps {
  class: ClassValue | undefined
  style: StyleValue | undefined
}

// Composables
export const makeComponentProps = propsFactory({
  class: [String, Array, Object] as PropType<ClassValue>,
  style: {
    type: [String, Array, Object] as PropType<StyleValue>,
    default: null,
  },
}, 'component')

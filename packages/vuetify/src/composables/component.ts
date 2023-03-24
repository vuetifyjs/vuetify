// Utilities
import { propsFactory } from '@/util/propsFactory'

// Types
import type { PropType, StyleValue } from 'vue'

export interface ComponentProps {
  class?: string | any[] | Record<string, any>
  style: StyleValue
}

// Composables
export const makeComponentProps = propsFactory({
  class: [String, Array] as PropType<ComponentProps['class']>,
  style: {
    type: [String, Array, Object] as PropType<ComponentProps['style']>,
    default: null,
  },
}, 'component')

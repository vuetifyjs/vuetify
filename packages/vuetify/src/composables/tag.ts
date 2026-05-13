// Utilities
import { propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { JSXComponent } from '@/util'

// Types
export interface TagProps {
  tag: string | JSXComponent
}

// Composables
export const makeTagProps = propsFactory({
  tag: {
    type: [String, Object, Function] as PropType<string | JSXComponent>,
    default: 'div',
  },
}, 'tag')

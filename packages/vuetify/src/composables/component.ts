// Utilities
import { propsFactory } from '@/util/propsFactory'

// Types
import type { PropType, StyleValue } from 'vue'

// TODO This type could be imported from 'vue', as long as it's declared in `vue`
// There's a PR declares it, and it should be merged,
// ref to {@link https://github.com/vuejs/core/pull/14441}
export type ClassValue = any

export interface ComponentProps {
  class: ClassValue
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

// Utilities
import { computed } from 'vue'
import { getCurrentInstanceName, propsFactory, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'

export interface ComponentProps {
  _as?: String
  class?: string | string[]
  style?: string | string[] | Record<string, any>
}

// Composables
export const makeComponentProps = propsFactory({
  _as: String,
  class: [String, Array] as PropType<ComponentProps['class']>,
  style: [String, Array, Object] as PropType<ComponentProps['style']>,
}, 'component')

export function useComponent (
  props: ComponentProps,
  name = getCurrentInstanceName(),
) {
  const componentClasses = computed(() => [name, ...wrapInArray(props.class)])
  const componentStyles = computed(() => props.style)

  return { componentClasses, componentStyles }
}

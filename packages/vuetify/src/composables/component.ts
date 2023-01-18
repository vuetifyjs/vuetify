// Utilities
import { computed } from 'vue'
import { getCurrentInstanceName, propsFactory, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'

export interface ComponentProps {
  _as?: String
  defaultClass?: string | string[]
  defaultStyles?: string | string[] | Record<string, any>
}

// Composables
export const makeComponentProps = propsFactory({
  _as: String,
  defaultClass: [String, Array] as PropType<ComponentProps['defaultClass']>,
  defaultStyles: [String, Array, Object] as PropType<ComponentProps['defaultStyles']>,
}, 'component')

export function useComponent (
  props: ComponentProps,
  name = getCurrentInstanceName(),
) {
  const componentClasses = computed(() => [
    name,
    ...wrapInArray(props.defaultClass),
  ])
  const componentStyles = computed(() => props.defaultStyles)

  return { componentClasses, componentStyles }
}

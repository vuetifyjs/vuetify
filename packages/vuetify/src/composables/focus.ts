// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed } from 'vue'
import { EventProp, getCurrentInstanceName, propsFactory } from '@/util'

// Types
export interface FocusProps {
  focused: boolean
  'onUpdate:focused': ((focused: boolean) => any) | undefined
}

// Composables
export const makeFocusProps = propsFactory({
  focused: Boolean,
  'onUpdate:focused': EventProp<[boolean]>(),
}, 'focus')

export function useFocus (
  props: FocusProps,
  name = getCurrentInstanceName()
) {
  const isFocused = useProxiedModel(props, 'focused')
  const focusClasses = computed(() => {
    return ({
      [`${name}--focused`]: isFocused.value,
    })
  })

  function focus () {
    isFocused.value = true
  }

  function blur () {
    isFocused.value = false
  }

  return { focusClasses, isFocused, focus, blur }
}

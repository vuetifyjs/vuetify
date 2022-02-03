// Components
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed } from 'vue'
import { getCurrentInstanceName, propsFactory } from '@/util'

// Types
export interface FocusProps {
  focused: boolean
  'onUpdate:focused': ((val: boolean) => void) | undefined
}

// Composables
export const makeFocusProps = propsFactory({
  focused: Boolean,
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

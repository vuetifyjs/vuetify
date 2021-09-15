// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { propsFactory } from '@/util'
import { computed } from 'vue'

export interface ActiveProps {
  active: boolean
  activeClass?: string
}

// Composables
export const makeActiveProps = propsFactory({
  active: Boolean,
  activeClass: String,
}, 'active')

export function useActive (props: ActiveProps, name: string) {
  const isActive = useProxiedModel(props, 'active')
  const activeClasses = computed(() => {
    return {
      [`${name}--active`]: isActive.value,
      [`${props.activeClass}`]: isActive.value,
    }
  })

  return {
    activeClasses,
    isActive,
  }
}

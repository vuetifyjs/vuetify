// Utilities
import { computed, toRef, toValue, useId } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { MaybeRefOrGetter } from 'vue'

// Types
export interface MenuActivatorProps {
  closeText: string
  openText: string
}

// Composables
export const makeMenuActivatorProps = propsFactory({
  closeText: {
    type: String,
    default: '$vuetify.close',
  },
  openText: {
    type: String,
    default: '$vuetify.open',
  },
}, 'autocomplete')

export function useMenuActivator (props: MenuActivatorProps, isOpen: MaybeRefOrGetter<boolean>) {
  const uid = useId()
  const menuId = computed(() => `menu-${uid}`)

  const ariaExpanded = toRef(() => toValue(isOpen))
  const ariaControls = toRef(() => menuId.value)

  return {
    menuId,
    ariaExpanded,
    ariaControls,
  }
}

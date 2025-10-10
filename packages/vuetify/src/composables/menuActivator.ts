// Utilities
import { toRef, toValue } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { MaybeRefOrGetter } from 'vue'
import { useLocale } from './locale'

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
  const { t } = useLocale()

  const ariaLabel = toRef(() => t(toValue(isOpen) ? props.closeText : props.openText))

  return { ariaLabel }
}

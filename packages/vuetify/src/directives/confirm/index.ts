// Components
import { VConfirm } from '@/labs/VConfirm'

// Composables
import { useDirectiveComponent } from '@/composables/directiveComponent'

// Types
import type { DirectiveBinding } from 'vue'
import type { Anchor } from '@/util'

export interface ConfirmDirectiveBinding
  extends Omit<DirectiveBinding<string>, 'value'> {
  value: {
    title: string
    text: string
    onSubmit: (value?: string) => void
    onCancel?: () => void
    input?: boolean
    inputProps?: Record<string, unknown>
    anchor?: Anchor
  }
}

export const Confirm = useDirectiveComponent<ConfirmDirectiveBinding>(
  VConfirm,
  binding => {
    return {
      activator: 'parent',
    }
  },
)

export default Confirm

// Components
import { VConfirm } from '@/labs/VConfirm'

// Composables
import { useDirectiveComponent } from '@/composables/directiveComponent'

// Types
import type { DirectiveBinding } from 'vue'
import type { Anchor } from '@/util'

export interface ConfirmDirectiveBinding
  extends Omit<DirectiveBinding<string>, 'arg' | 'value'> {
  arg?: {
    [T in Anchor]: T extends `${infer A} ${infer B}` ? `${A}-${B}` : T;
  }[Anchor]
  value: boolean | string | Record<string, any>
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

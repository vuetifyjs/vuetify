// Components
import { VTooltip } from '@/components/VTooltip'

// Composables
import { useDirectiveComponent } from '@/composables/directiveComponent'

// Types
import type { DirectiveBinding } from 'vue'

export const Tooltip = useDirectiveComponent(VTooltip, (
  arg: DirectiveBinding['arg'],
  modifiers: DirectiveBinding['modifiers'],
) => {
  return {
    activator: 'parent',
    location: arg ?? 'top',
    ...modifiers,
  }
})

export default Tooltip

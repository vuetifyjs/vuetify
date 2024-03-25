// Components
import { VTooltip } from '@/components/VTooltip'

// Composables
import { useDirectiveComponent } from '@/composables/directiveComponent'

export const Tooltip = useDirectiveComponent(VTooltip, {
  activator: 'parent',
})

export default Tooltip

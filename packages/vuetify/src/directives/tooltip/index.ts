// Components
import { VTooltip } from '@/components/VTooltip'

// Composables
import { useDirectiveComponent } from '@/composables/directiveComponent'

// Types
import type { DirectiveBinding } from 'vue'
import type { Anchor } from '@/util'

export interface TooltipDirectiveBinding extends Omit<DirectiveBinding<string>, 'arg' | 'value'> {
  arg?: { [T in Anchor]: T extends `${infer A} ${infer B}` ? `${A}-${B}` : T }[Anchor]
  value: boolean | string | Record<string, any>
}

export const Tooltip = useDirectiveComponent<TooltipDirectiveBinding>(VTooltip, binding => {
  const disabled = isObject(binding.value)
    ? !binding.value.text
    : ['', false, null].includes(binding.value) // undefined means true

  return {
    activator: disabled ? null : 'parent',
    location: binding.arg?.replace('-', ' '),
    text: typeof binding.value === 'boolean' ? undefined : binding.value,
  }
})

export default Tooltip

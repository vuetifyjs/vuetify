import type { DirectiveBinding, Directive, DirectiveArguments } from 'vue'

interface Binding extends Omit<DirectiveBinding, 'value' | 'modifiers'> {
  value?: unknown
  modifiers: Dictionary<boolean | undefined>
}

/**
 * Transform DirectiveBinding to DirectiveArguments with strict typing
 */
export function useDirective <T extends Binding> (directive: Directive, binding: Partial<T>): DirectiveArguments[number] {
  return [
    directive,
    binding.value!,
    binding.arg!,
    binding.modifiers! as any,
  ]
}

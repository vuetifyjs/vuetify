import type { DirectiveArguments, DirectiveBinding } from 'vue'

interface Binding extends Omit<DirectiveBinding, 'value' | 'modifiers'> {
  value?: unknown
  modifiers: Dictionary<boolean | undefined>
}

type Tail<T extends any[]> = T extends [infer A, ...infer R] ? R : never

/**
 * Transform DirectiveBinding to DirectiveArguments with strict typing
 */
export function useDirective <T extends Binding> (binding: Partial<T>): Tail<DirectiveArguments[number]> {
  return [
    binding.value!,
    binding.arg!,
    binding.modifiers! as any,
  ]
}

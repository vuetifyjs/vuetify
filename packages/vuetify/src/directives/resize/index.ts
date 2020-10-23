import type { DirectiveBinding, ObjectDirective } from 'vue'

interface ResizeDirectiveBinding extends Omit<DirectiveBinding, 'modifiers'> {
  value: (() => void)
  modifiers?: {
    active?: boolean
    quiet?: boolean
  }
}

function mounted (el: HTMLElement, binding: ResizeDirectiveBinding) {
  const handler = binding.value
  const options: AddEventListenerOptions = {
    passive: !binding.modifiers?.active,
  }

  window.addEventListener('resize', handler, options)
  el._onResize = {
    handler,
    options,
  }

  if (!binding.modifiers?.quiet) {
    handler()
  }
}

function unmounted (el: HTMLElement) {
  if (!el._onResize) return

  const { handler, options } = el._onResize
  window.removeEventListener('resize', handler, options)
  delete el._onResize
}

export const Resize: ObjectDirective = {
  mounted,
  unmounted,
}

export default Resize

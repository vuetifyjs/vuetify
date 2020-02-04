import { DirectiveBinding, ObjectDirective } from 'vue'

interface ResizeDirectiveBinding extends DirectiveBinding {
  value: (() => void) | undefined
}

function mounted (el: HTMLElement, binding: ResizeDirectiveBinding) {
  const callback = binding.value!
  const options = {
    passive: !((binding.modifiers && binding.modifiers.active) || false)
  } as AddEventListenerOptions


  window.addEventListener('resize', callback, options)
  el._onResize = {
    callback,
    options,
  }

  if (!binding.modifiers || !binding.modifiers.quiet) {
    callback()
  }
}

function unmounted (el: HTMLElement) {
  if (!el._onResize) return

  const { callback, options } = el._onResize
  window.removeEventListener('resize', callback, options)
  delete el._onResize
}

export const Resize: ObjectDirective<HTMLElement> = {
  mounted,
  unmounted,
}

export default Resize

import { VNodeDirective } from 'vue/types/vnode'

interface ResizeVNodeDirective extends VNodeDirective {
  value: () => void
  options?: boolean | AddEventListenerOptions
}

function inserted (el: HTMLElement, binding: ResizeVNodeDirective) {
  const callback = binding.value
  const options = binding.options || { passive: true }

  window.addEventListener('resize', callback, options)
  el._onResize = {
    callback,
    options
  }

  if (!binding.modifiers || !binding.modifiers.quiet) {
    callback()
  }
}

function unbind (el: HTMLElement) {
  if (!el._onResize) return

  const { callback, options } = el._onResize
  window.removeEventListener('resize', callback, options)
  delete el._onResize
}

export default {
  inserted,
  unbind
}

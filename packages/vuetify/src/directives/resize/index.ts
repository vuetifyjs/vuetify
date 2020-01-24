import { VNodeDirective } from 'vue/types/vnode'

// Utilities
import { PASSIVE_SUPPORTED } from '../../util/globals'

interface ResizeVNodeDirective extends VNodeDirective {
  value?: () => void
  options?: boolean | AddEventListenerOptions
}

function inserted (el: HTMLElement, binding: ResizeVNodeDirective) {
  const callback = binding.value!
  const options = binding.options || PASSIVE_SUPPORTED ? { passive: true } : false

  window.addEventListener('resize', callback, options)
  el._onResize = {
    callback,
    options,
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

export const Resize = {
  inserted,
  unbind,
}

export default Resize

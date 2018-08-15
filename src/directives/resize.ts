import { VNodeDirective } from 'vue/types/vnode'

interface ResizeHTMLElement extends HTMLElement {
  _onResize: {
    callback: () => void
    options?: boolean | AddEventListenerOptions
  }
}

interface ResizeVNodeDirective extends VNodeDirective {
  value: () => void
  options?: boolean | AddEventListenerOptions
}

function inserted (el: HTMLElement, binding: ResizeVNodeDirective) {
  const callback = binding.value
  const options = binding.options || { passive: true }

  window.addEventListener('resize', callback, options)
  ;(el as ResizeHTMLElement)._onResize = {
    callback,
    options
  }

  if (!binding.modifiers || !binding.modifiers.quiet) {
    callback()
  }
}

function unbind (el: HTMLElement) {
  const { callback, options } = (el as ResizeHTMLElement)._onResize

  window.removeEventListener('resize', callback, options)
  delete (el as ResizeHTMLElement)._onResize
}

export default {
  inserted,
  unbind
}

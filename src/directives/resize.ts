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

function inserted (el: ResizeHTMLElement, binding: ResizeVNodeDirective) {
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

function unbind (el: ResizeHTMLElement) {
  const { callback, options } = el._onResize

  window.removeEventListener('resize', callback, options)
  delete el._onResize
}

export default {
  name: 'resize',
  inserted,
  unbind
}

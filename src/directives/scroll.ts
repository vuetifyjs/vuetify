import { VNodeDirective } from 'vue/types/vnode'

interface ScrollHTMLElement extends HTMLElement {
  _onScroll?: {
    callback: EventListenerOrEventListenerObject
    options: boolean | AddEventListenerOptions
    target: EventTarget
  }
}

interface ScrollVNodeDirective extends VNodeDirective {
  arg: string
  value: EventListenerOrEventListenerObject
  options?: boolean | AddEventListenerOptions
}

function inserted (el: ScrollHTMLElement, binding: ScrollVNodeDirective) {
  const callback = binding.value
  const options = binding.options || { passive: true }
  let target = binding.arg ? document.querySelector(binding.arg) : window
  if (!target) return

  target.addEventListener('scroll', callback, options)

  el._onScroll = {
    callback,
    options,
    target
  }
}

function unbind (el: ScrollHTMLElement) {
  if (!el._onScroll) return

  const { callback, options, target } = el._onScroll

  target.removeEventListener('scroll', callback, options)
  delete el._onScroll
}

export default {
  name: 'scroll',
  inserted,
  unbind
}

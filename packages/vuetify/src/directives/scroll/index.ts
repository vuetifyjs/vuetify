import type { DirectiveBinding } from 'vue'

interface ScrollDirectiveBinding extends Omit<DirectiveBinding, 'modifiers'> {
  value: EventListener | {
    handler: EventListener
    options?: AddEventListenerOptions
  } | EventListenerObject & { options?: AddEventListenerOptions }
  modifiers?: {
    self?: boolean
  }
}

function mounted (el: HTMLElement, binding: ScrollDirectiveBinding) {
  const { self = false } = binding.modifiers ?? {}
  const value = binding.value
  const options = (typeof value === 'object' && value.options) || { passive: true }
  const handler = typeof value === 'function' || 'handleEvent' in value ? value : value.handler

  const target = self
    ? el
    : binding.arg
      ? document.querySelector(binding.arg)
      : window

  if (!target) return

  target.addEventListener('scroll', handler, options)

  el._onScroll = {
    handler,
    options,
    // Don't reference self
    target: self ? undefined : target,
  }
}

function unmounted (el: HTMLElement) {
  if (!el._onScroll) return

  const { handler, options, target = el } = el._onScroll

  target.removeEventListener('scroll', handler, options)
  delete el._onScroll
}

function updated (el: HTMLElement, binding: ScrollDirectiveBinding) {
  if (binding.value === binding.oldValue) return

  unmounted(el)
  mounted(el, binding)
}

export const Scroll = {
  mounted,
  unmounted,
  updated,
}

export default Scroll

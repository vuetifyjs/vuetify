import {
  DirectiveBinding,
  ObjectDirective,
} from 'vue'
import { passiveEventOptions } from '../../util/events'

interface ScrollDirectiveBinding extends DirectiveBinding {
  arg?: string
  value: EventListenerOrEventListenerObject
}

function mounted (el: HTMLElement, binding: ScrollDirectiveBinding) {
  const callback = binding.value
  const target = binding.arg ? document.querySelector(binding.arg) : window

  if (!target) return

  target.addEventListener('scroll', callback, passiveEventOptions())
  el._onScroll = { callback, target }
}

function unmounted (el: HTMLElement) {
  if (!el._onScroll) return

  const { callback, target } = el._onScroll

  target.removeEventListener('scroll', callback, passiveEventOptions())
  delete el._onScroll
}

export const Scroll: ObjectDirective<HTMLElement> = {
  mounted,
  unmounted,
}

export default Scroll

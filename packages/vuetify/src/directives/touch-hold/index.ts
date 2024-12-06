// Types
import type { DirectiveBinding } from 'vue'

export type TouchHoldStoredHandlers = {
  touchstart: (e: TouchEvent) => void
  touchend: (e: TouchEvent) => void
}

function mounted (el: HTMLElement, binding: DirectiveBinding) {
  const uid = binding.instance?.$.uid

  if (!uid) return

  let timeout: number

  function touchstart () {
    timeout = window.setTimeout(binding.value, 1000)
  }

  function touchend () {
    window.clearTimeout(timeout)
  }

  el.addEventListener('mousedown', touchstart)
  el.addEventListener('mouseup', touchend)
  el.addEventListener('mouseleave', touchend)
  el.addEventListener('touchstart', touchstart)
  el.addEventListener('touchend', touchend)
  el.addEventListener('touchcancel', touchend)

  el._touchHandlers = el._touchHandlers ?? Object.create(null)
  el._touchHandlers![uid] = { touchstart, touchend }
}

function unmounted (el: HTMLElement, binding: DirectiveBinding) {
  const uid = binding.instance?.$.uid

  if (!uid || !el._touchHandlers![uid]) return

  const { touchstart, touchend } = el._touchHandlers![uid]

  el.removeEventListener('mousedown', touchstart as any)
  el.removeEventListener('mouseup', touchend as any)
  el.removeEventListener('mouseleave', touchend as any)
  el.removeEventListener('touchstart', touchstart)
  el.removeEventListener('touchend', touchend)
  el.removeEventListener('touchcancel', touchend)
}

export const TouchHold = {
  mounted,
  unmounted,
}

export default TouchHold

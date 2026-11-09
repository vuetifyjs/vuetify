// Utilities
import { isFunction, isUndefined } from '@/util'

// Types
import type { DirectiveBinding } from 'vue'

export interface TouchHoldEvent {
  // Android fires contextmenu for a long-press, so the event type does not tell the input apart
  originalEvent: TouchEvent | MouseEvent
  touch: boolean
  target: HTMLElement
  clientX: number
  clientY: number
}

export interface TouchHoldOptions {
  handler: (e: TouchHoldEvent) => void
  duration?: number
}

export interface TouchHoldDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
  value?: TouchHoldOptions['handler'] | TouchHoldOptions | null
  modifiers: {
    mouse?: boolean
  }
}

export type TouchHoldState = ReturnType<typeof createTouchHold>

// iOS reads it before touchstart handlers run, so it cannot wait for the press
export function preventCallout (el: HTMLElement) {
  el.style.setProperty('-webkit-touch-callout', 'none')
}

const lockedStyles = ['-webkit-user-select', 'user-select']

function lockStyles (el: HTMLElement) {
  const previous = lockedStyles.map(p => el.style.getPropertyValue(p))
  lockedStyles.forEach(p => el.style.setProperty(p, 'none'))
  return () => lockedStyles.forEach((p, i) => previous[i] ? el.style.setProperty(p, previous[i]) : el.style.removeProperty(p))
}

// nested holds share one press event; the innermost one takes it
const claimed = new WeakSet<Event>()

export function createTouchHold (options: TouchHoldOptions) {
  let timer = -1
  let held = false
  let handling = false
  let press: { el: HTMLElement, x: number, y: number, detach: () => void, unlock?: () => void } | undefined

  const state = {
    options,
    onTouchstart,
    onMousedown,
    cancel: end,
  }

  function onTouchstart (e: TouchEvent) {
    end()
    held = false
    if (e.touches.length > 1 || claimed.has(e)) return
    claimed.add(e)

    const el = e.currentTarget as HTMLElement
    const { clientX, clientY } = e.touches[0]
    // touch events keep targeting the original node even after it leaves the DOM, where they no longer bubble to el
    const target = e.target!
    press = {
      el,
      x: clientX,
      y: clientY,
      unlock: lockStyles(el),
      detach: () => {
        target.removeEventListener('touchmove', onTouchmove as EventListener)
        target.removeEventListener('touchend', onTouchend as EventListener)
        target.removeEventListener('touchcancel', onTouchend as EventListener)
        window.removeEventListener('contextmenu', onContextmenu, { capture: true })
      },
    }
    target.addEventListener('touchmove', onTouchmove as EventListener, { passive: true })
    target.addEventListener('touchend', onTouchend as EventListener, { passive: false })
    target.addEventListener('touchcancel', onTouchend as EventListener)
    window.addEventListener('contextmenu', onContextmenu, { capture: true })

    timer = window.setTimeout(() => trigger(e, true), state.options.duration ?? 500)
  }

  function onMousedown (e: MouseEvent) {
    end()
    held = false
    if (e.button !== 0 || claimed.has(e)) return
    claimed.add(e)

    press = {
      el: e.currentTarget as HTMLElement,
      x: e.clientX,
      y: e.clientY,
      detach: () => {
        window.removeEventListener('mousemove', onMousemove)
        window.removeEventListener('click', onClick, { capture: true })
      },
    }
    window.addEventListener('mousemove', onMousemove, { passive: true })
    window.addEventListener('click', onClick, { capture: true })

    timer = window.setTimeout(() => trigger(e, false), state.options.duration ?? 500)
  }

  function trigger (originalEvent: TouchEvent | MouseEvent, touch: boolean) {
    clearTimeout(timer)
    held = true
    getSelection()?.removeAllRanges()
    handling = true
    try {
      state.options.handler({ originalEvent, touch, target: press!.el, clientX: press!.x, clientY: press!.y })
    } finally {
      handling = false
    }
  }

  function onTouchmove (e: TouchEvent) {
    if (!press || held) return
    const { clientX, clientY } = e.touches[0]
    // fingers drift while holding still
    if (e.touches.length > 1 || Math.hypot(clientX - press.x, clientY - press.y) > 10) end()
  }

  function onTouchend (e: TouchEvent) {
    // cancels the click (and emulated mouse events) that would follow the hold
    if (held && e.cancelable) e.preventDefault()
    end()
  }

  function onMousemove (e: MouseEvent) {
    if (!press || held) return
    if (Math.hypot(e.clientX - press.x, e.clientY - press.y) > 10) end()
  }

  // the release ends the press, and the click it carries must not reach the element the hold acted on
  function onClick (e: MouseEvent) {
    if (held) {
      e.preventDefault()
      e.stopImmediatePropagation()
    }
    end()
  }

  // Android fires contextmenu for the same long-press, and click-outside would close what the handler just opened
  function onContextmenu (e: MouseEvent) {
    if (handling || !press?.el.contains(e.target as Node)) return
    e.preventDefault()
    e.stopImmediatePropagation()
    if (!held) trigger(e, true)
  }

  function end () {
    clearTimeout(timer)
    if (!press) return

    const { detach, unlock } = press
    press = undefined
    detach()
    if (!unlock) return
    // restoring right away still lets the finger lift start a selection
    if (held) setTimeout(unlock, 10)
    else unlock()
  }

  return state
}

function normalize (value: NonNullable<TouchHoldDirectiveBinding['value']>): TouchHoldOptions {
  return isFunction(value) ? { handler: value } : value
}

function mounted (el: HTMLElement, binding: TouchHoldDirectiveBinding) {
  const uid = binding.instance?.$.uid
  if (!binding.value || isUndefined(uid)) return

  const hold = createTouchHold(normalize(binding.value))
  preventCallout(el)
  el._touchHold ??= Object.create(null)
  el._touchHold![uid] = hold
  el.addEventListener('touchstart', hold.onTouchstart, { passive: true })
  if (binding.modifiers.mouse) el.addEventListener('mousedown', hold.onMousedown)
}

function unmounted (el: HTMLElement, binding: TouchHoldDirectiveBinding) {
  const uid = binding.instance?.$.uid
  const hold = isUndefined(uid) ? undefined : el._touchHold?.[uid]
  if (!hold) return

  hold.cancel()
  el.removeEventListener('touchstart', hold.onTouchstart)
  el.removeEventListener('mousedown', hold.onMousedown)
  delete el._touchHold![uid!]
}

function updated (el: HTMLElement, binding: TouchHoldDirectiveBinding) {
  const uid = binding.instance?.$.uid
  const hold = isUndefined(uid) ? undefined : el._touchHold?.[uid]

  if (!binding.value) unmounted(el, binding)
  // inline handlers change on every render, which must not cancel a press in progress
  else if (hold) hold.options = normalize(binding.value)
  else mounted(el, binding)
}

export const TouchHold = {
  mounted,
  unmounted,
  updated,
}

export default TouchHold

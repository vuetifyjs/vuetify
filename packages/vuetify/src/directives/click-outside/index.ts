// Utilities
import { attachedRoot } from '@/util'

// Types
import type { DirectiveBinding } from 'vue'

interface ClickOutsideBindingArgs {
  handler: (e: MouseEvent) => void
  closeConditional?: (e: Event) => boolean
  include?: () => HTMLElement[]
}

interface ClickOutsideDirectiveBinding extends DirectiveBinding {
  value: ((e: MouseEvent) => void) | ClickOutsideBindingArgs
}

function defaultConditional () {
  return true
}

function checkEvent (e: MouseEvent, el: HTMLElement, binding: ClickOutsideDirectiveBinding): boolean {
  // The include element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility
  // with non-toggleable components
  if (!e || checkIsActive(e, binding) === false) return false

  // If we're clicking inside the shadowroot, then the app root doesn't get the same
  // level of introspection as to _what_ we're clicking. We want to check to see if
  // our target is the shadowroot parent container, and if it is, ignore.
  const root = attachedRoot(el)
  if (
    typeof ShadowRoot !== 'undefined' &&
    root instanceof ShadowRoot &&
    root.host === e.target
  ) return false

  // Check if additional elements were passed to be included in check
  // (click must be outside all included elements, if any)
  const elements = ((typeof binding.value === 'object' && binding.value.include) || (() => []))()
  // Add the root element for the component this directive was defined on
  elements.push(el)

  // Check if it's a click outside our elements, and then if our callback returns true.
  // Non-toggleable components should take action in their callback and return falsy.
  // Toggleable can return true if it wants to deactivate.
  // Note that, because we're in the capture phase, this callback will occur before
  // the bubbling click event on any outside elements.
  return !elements.some(el => el?.contains(e.target as Node))
}

function checkIsActive (e: MouseEvent, binding: ClickOutsideDirectiveBinding): boolean | void {
  const isActive = (typeof binding.value === 'object' && binding.value.closeConditional) || defaultConditional

  return isActive(e)
}

function directive (e: MouseEvent, el: HTMLElement, binding: ClickOutsideDirectiveBinding) {
  const handler = typeof binding.value === 'function' ? binding.value : binding.value.handler

  // Clicks in the Shadow DOM change their target while using setTimeout, so the original target is saved here
  e.shadowTarget = e.target

  el._clickOutside!.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
    checkIsActive(e, binding) && handler && handler(e)
  }, 0)
}

function handleShadow (el: HTMLElement, callback: Function): void {
  const root = attachedRoot(el)

  callback(document)

  if (typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot) {
    callback(root)
  }
}

export const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted (el: HTMLElement, binding: ClickOutsideDirectiveBinding) {
    const onClick = (e: Event) => directive(e as MouseEvent, el, binding)
    const onMousedown = (e: Event) => {
      el._clickOutside!.lastMousedownWasOutside = checkEvent(e as MouseEvent, el, binding)
    }

    handleShadow(el, (app: HTMLElement) => {
      app.addEventListener('click', onClick, true)
      app.addEventListener('mousedown', onMousedown, true)
    })
    if (!el._clickOutside) {
      el._clickOutside = {
        lastMousedownWasOutside: false,
      }
    }

    el._clickOutside[binding.instance!.$.uid] = {
      onClick,
      onMousedown,
    }
  },

  beforeUnmount (el: HTMLElement, binding: ClickOutsideDirectiveBinding) {
    if (!el._clickOutside) return

    handleShadow(el, (app: HTMLElement) => {
      if (!app || !el._clickOutside?.[binding.instance!.$.uid]) return

      const { onClick, onMousedown } = el._clickOutside[binding.instance!.$.uid]!

      app.removeEventListener('click', onClick, true)
      app.removeEventListener('mousedown', onMousedown, true)
    })

    delete el._clickOutside[binding.instance!.$.uid]
  },
}

export default ClickOutside

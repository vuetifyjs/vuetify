import { attachedRoot } from '../../util/dom'
import { VNodeDirective } from 'vue/types/vnode'

interface ClickOutsideBindingArgs {
  handler: (e: Event) => void
  closeConditional?: (e: Event) => boolean
  include?: () => HTMLElement[]
}

interface ClickOutsideDirective extends VNodeDirective {
  value?: ((e: Event) => void) | ClickOutsideBindingArgs
}

function defaultConditional () {
  return true
}

function checkEvent (e: PointerEvent, el: HTMLElement, binding: ClickOutsideDirective): boolean {
  // The include element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility
  // with non-toggleable components
  if (!e || checkIsActive(e, binding) === false) return false

  // If we're clicking inside the shadowroot, then the app root doesn't get the same
  // level of introspection as to _what_ we're clicking. We want to check to see if
  // our target is the shadowroot parent container, and if it is, ignore.
  const root = attachedRoot(el)
  if (root instanceof ShadowRoot && root.host === e.target) return false

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
  return !elements.some(el => el.contains(e.target as Node))
}

function checkIsActive (e: PointerEvent, binding: ClickOutsideDirective): boolean | void {
  const isActive = (typeof binding.value === 'object' && binding.value.closeConditional) || defaultConditional

  return isActive(e)
}

function directive (e: PointerEvent, el: HTMLElement, binding: ClickOutsideDirective) {
  const handler = typeof binding.value === 'function' ? binding.value : binding.value!.handler

  el._clickOutside!.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
    checkIsActive(e, binding) && handler && handler(e)
  }, 0)
}

function handleShadow (el: HTMLElement, callback: Function): void {
  const root = attachedRoot(el)

  callback(document.body)

  if (root instanceof ShadowRoot) {
    callback(root)
  }
}

export const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  inserted (el: HTMLElement, binding: ClickOutsideDirective) {
    const onClick = (e: Event) => directive(e as PointerEvent, el, binding)
    const onMousedown = (e: Event) => {
      el._clickOutside!.lastMousedownWasOutside = checkEvent(e as PointerEvent, el, binding)
    }

    handleShadow(el, (app: HTMLElement) => {
      app.addEventListener('click', onClick, true)
      app.addEventListener('mousedown', onMousedown, true)
    })

    el._clickOutside = {
      lastMousedownWasOutside: true,
      onClick,
      onMousedown,
    }
  },

  unbind (el: HTMLElement) {
    if (!el._clickOutside) return

    handleShadow(el, (app: HTMLElement) => {
      if (!app || !el._clickOutside) return
      app.removeEventListener('click', el._clickOutside.onClick, true)
      app.removeEventListener('mousedown', el._clickOutside.onMousedown, true)
    })

    delete el._clickOutside
  },
}

export default ClickOutside

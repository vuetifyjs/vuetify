import { VNodeDirective } from 'vue/types/vnode'

interface ClickOutsideBindingArgs {
  closeConditional?: (e: Event) => boolean
  include?: () => HTMLElement[]
}

interface ClickOutsideDirective extends VNodeDirective {
  value?: (e: Event) => void
  args?: ClickOutsideBindingArgs
}

function closeConditional () {
  return false
}

function directive (e: PointerEvent, el: HTMLElement, binding: ClickOutsideDirective): void {
  // Args may not always be supplied
  binding.args = binding.args || {}

  // If no closeConditional was supplied assign a default
  const isActive = (binding.args.closeConditional || closeConditional)

  // The include element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility
  // with non-toggleable components
  if (!e || isActive(e) === false) return

  // If click was triggered programmaticaly (domEl.click()) then
  // it shouldn't be treated as click-outside
  // Chrome/Firefox support isTrusted property
  // IE/Edge support pointerType property (empty if not triggered
  // by pointing device)
  if (('isTrusted' in e && !e.isTrusted) ||
    ('pointerType' in e && !e.pointerType)
  ) return

  // Check if additional elements were passed to be included in check
  // (click must be outside all included elements, if any)
  const elements = (binding.args.include || (() => []))()
  // Add the root element for the component this directive was defined on
  elements.push(el)

  // Check if it's a click outside our elements, and then if our callback returns true.
  // Non-toggleable components should take action in their callback and return falsy.
  // Toggleable can return true if it wants to deactivate.
  // Note that, because we're in the capture phase, this callback will occure before
  // the bubbling click event on any outside elements.
  !clickedInEls(e, elements) && setTimeout(() => {
    isActive(e) && binding.value && binding.value(e)
  }, 0)
}

function clickedInEls (e: PointerEvent, elements: HTMLElement[]): boolean {
  // Get position of click
  const { clientX: x, clientY: y } = e
  // Loop over all included elements to see if click was in any of them
  for (const el of elements) {
    if (clickedInEl(el, x, y)) return true
  }

  return false
}

function clickedInEl (el: HTMLElement, x: number, y: number): boolean {
  // Get bounding rect for element
  // (we're in capturing event and we want to check for multiple elements,
  //  so can't use target.)
  const b = el.getBoundingClientRect()
  // Check if the click was in the element's bounding rect

  return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom
}

export default {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  inserted (el: HTMLElement, binding: ClickOutsideDirective) {
    const onClick = (e: Event) => directive(e as PointerEvent, el, binding)
    // iOS does not recognize click events on document
    // or body, this is the entire purpose of the v-app
    // component and [data-app], stop removing this
    const app = document.querySelector('[data-app]') ||
      document.body // This is only for unit tests
    app.addEventListener('click', onClick, true)
    el._clickOutside = onClick
  },

  unbind (el: HTMLElement) {
    if (!el._clickOutside) return

    const app = document.querySelector('[data-app]') ||
      document.body // This is only for unit tests
    app && app.removeEventListener('click', el._clickOutside, true)
    delete el._clickOutside
  }
}

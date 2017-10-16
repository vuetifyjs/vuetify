function directive (e, el, binding, v) {
  // The include element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility 
  // with non-toggleable components
  if (!e || v.context.isActive === false) return

  // Get value passed to directive
  const val = binding.value || (() => true)
  // Check if callback was passed in object or as the value
  const cb = val.callback || val
  // Check if additional elements were passed to be included in check
  // (click must be outside all included elements, if any)
  const elements = (val.include || (() => []))()
  // Add the root element for the component this directive was defined on
  elements.push(el)

  // Check if it's a click outside our elements, and then if our callback returns true.
  // Non-toggleable components should take action in their callback and return falsy.
  // Toggleable can return true if it wants to deactivate.
  // Note that, because we're in the capture phase, this callback will occure before
  // the bubbling click event on any outside elements. 
  if (!clickedInEls(e, elements) && cb(e)) {
    // Delay setting toggleable inactive to avoid conflicting 
    // with an outside click on any activator toggling our state.
    setTimeout(() => (v.context.isActive = false), 0)
  }
}

function clickedInEls (e, elements) {
  // Get position of click
  const { clientX: x, clientY: y } = e
  // Loop over all included elements to see if click was in any of them
  for (const el of elements) {
    if (clickedInEl(el, x, y)) return true
  }

  return false
}

function clickedInEl (el, x, y) {
  // Get bounding rect for element 
  // (we're in capturing event and we want to check for multiple elements,
  //  so can't use target.)
  const b = el.getBoundingClientRect()
  // Check if the click was in the element's bounding rect

  return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom
}

export default {
  name: 'click-outside',

  bind (el, binding, v) {
    v.context.$vuetify.load(() => {
      const onClick = e => directive(e, el, binding, v)
      // iOS does not recognize click events on document
      // or body, this is the entire purpose of the v-app
      // component and [data-app], stop removing this
      const app = document.querySelector('[data-app]') ||
        document.body // This is only for unit tests
      app.addEventListener('click', onClick, true)
      el._clickOutside = onClick
    })
  },

  unbind (el) {
    const app = document.querySelector('[data-app]') ||
      document.body // This is only for unit tests
    app && app.removeEventListener('click', el._clickOutside, true)
  }
}

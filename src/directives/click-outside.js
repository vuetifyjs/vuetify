function directive (e, el, binding, v) {
  if (!e || !v.context.isActive) return

  const val = binding.value || (() => true)
  // Check if callback was passed in object or as the value
  const cb = val.callback || val
  // Check if additional elements were passed to be included in check
  const elements = (val.include || (() => []))()
  // Add the element this directive was defined on
  elements.push(el)

  if (!clickedInEls(e, elements) && cb(e)) {
    setTimeout(() => (v.context.isActive = false), 0)
  }
}

function clickedInEls (e, elements) {
  // Get position of click
  const x = e.clientX
  const y = e.clientY
  // Loop over all included elements to see if click was in any of them
  for (const el of elements) {
    if (clickedInEl(el, x, y)) return true
  }
  return false
}

function clickedInEl (el, x, y) {
  // Get bounding rect for element (we're in capturing event so can't trust target)
  const b = el.getBoundingClientRect()
  // Check if the click was in the element's bounding rect
  return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom
}

export default {
  name: 'click-outside',

  bind (el, binding, v) {
    v.context.$vuetify.load(() => {
      const onClick = e => directive(e, el, binding, v)
      document.addEventListener('click', onClick, true)
      el._clickOutside = onClick
    })
  },

  unbind (el) {
    document.removeEventListener('click', el._clickOutside, true)
  }
}

function directive (e, el, binding, v) {
  let cb = () => true

  if (binding.value) cb = binding.value

  const elements = (binding.include || (() => []))()
  elements.push(el)

  if (v.context.isActive && !clickedInEls(e, elements) && cb(e)) {
    setTimeout(() => v.context.isActive = false, 0)
  }
}

function clickedInEls (e, elements) {
  for (const el of elements) {
    if (clickedInEl(e, el)) return true
  }
  return false
}

function clickedInEl (e, el) {
  e = e || {}
  const b = el.getBoundingClientRect()
  const x = e.clientX
  const y = e.clientY
  return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom
}

export default {
  name: 'click-outside',

  bind (el, binding, v) {
    v.context.$vuetify.load(() => {
      const click = e => directive(e, el, binding, v)
      document.addEventListener('click', click, true)
      el._clickOutside = click
    })
  },

  unbind (el) {
    document.removeEventListener('click', el._clickOutside, true)
  }
}

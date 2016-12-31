function dropdown (e, el, binding, bus, hover) {
  e.preventDefault()

  const component = document.getElementById(binding.arg)

  if (!component.dataset.hover && hover) {
    return
  }

  let width = 0
  let height = 0

  if (component.clientWidth > el.clientWidth
      && Boolean(component.dataset.right)
  ) {
    width = component.clientWidth - el.clientWidth
  }

  if (component.dataset.bottom == true) {
    height = el.clientHeight
  }

  component.style.minWidth = `${el.clientWidth}px`
  component.style.left = `${el.offsetLeft - width}px`
  component.style.top = `${el.offsetTop + height}px`

  setTimeout(() => bus.pub(`dropdown:open:${binding.arg}`), 0)
}

function directive (el, binding, v) {
  el.dataset.dropdown = binding.arg

  // Directive binding happens before all components are rendered
  // When changing routes, dropdown element may not be ready
  // Do hover check within dropdown function
  el.onclick = e => dropdown(e, el, binding, v.context.$vuetify.bus, false)
  el.onmouseenter = e => dropdown(e, el, binding, v.context.$vuetify.bus, true)
}

export default {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind (el) {
    el.removeAttribute('onclick')
    el.removeAttribute('onmouseenter')
    el.removeAttribute('onmouseleave')
    el.removeAttribute('data-dropdown')
  }
}
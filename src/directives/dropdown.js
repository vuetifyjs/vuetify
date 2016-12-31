function dropdown (e, el, binding, bus, hover) {
  e.preventDefault()

  const component = document.getElementById(binding.arg)

  if (!component.dataset.hover && hover 
    || component.style.display !== 'none'
  ) {
    return
  }

  let width = 0
  let height = 0
  let offset = component.dataset.offset

  component.style.minWidth = `${el.clientWidth}px`
  component.style.display = 'block'
  let componentWidth = component.clientWidth
  let componentHeight = component.clientHeight
  component.style.display = 'none'

  if (component.dataset.bottom) {
    height = componentHeight - (offset ? 0 : el.clientHeight)
  } else {
    height = offset ? -el.clientHeight : 0
  }

  if (component.dataset.right) {
    width = componentWidth - (offset ? 0 : el.clientWidth)
  } else {
    width = offset ? -el.clientWidth : 0
  }

  component.style.left = `${el.offsetLeft - width}px`
  component.style.top = `${el.offsetTop - height}px`

  if (Boolean(component.dataset.right)) {
    component.style.display = 'block'
    let cw = component.clientWidth
    component.style.display = 'none'
    width = cw - el.clientWidth
  }

  component.style.left = `${el.offsetLeft - width}px`
  component.style.top = `${el.offsetTop}px`

  bus.pub(`dropdown:open:${binding.arg}`)
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
import { directiveConfig } from '../util/helpers'

function dropdown (e, el, id, bus, hover) {
  e.preventDefault()

  const component = document.getElementById(id)

  if (!component
    ||!component.dataset.hover && hover 
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

  bus.pub(`dropdown:open:${id}`)
}

function directive (el, binding, v) {
  const config = directiveConfig(binding)
  let id = config.value
  let bus = v.context.$vuetify.bus

  el.dataset.dropdown = id

  // Directive binding happens before all components are rendered
  // When changing routes, dropdown element may not be ready
  // Do hover check within dropdown function
  el.onclick = e => dropdown(e, el, id, bus, false)
  el.onmouseenter = e => dropdown(e, el, id, bus, true)
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
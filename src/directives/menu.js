import { directiveConfig } from '../util/helpers'

function autoSize (el, component) {
  let scrollTop = 0,
      top = 0,
      index = 0

  let children = Array.from(component.getElementsByClassName('list__tile'))
  children.forEach((el, i) => {
    if (el.classList.contains('list__tile--active')) {
      index = i
    }
  })

  component.style.display = 'block'
  if (index < 2) {
    top = 20 + (48 * index)
  } else if (index === children.length - 2) {
    top = 12 + (48 * 2)
    scrollTop = component.scrollHeight
  } else if (index === children.length - 1) {
    top = 12 + (48 * 3)
    scrollTop = component.scrollHeight
  } else {
    top = component.clientHeight / 2 - 19
    scrollTop = 35 + ((index - 2) * children[index].clientHeight)
  }
  component.style.display = 'none'

  let data = getSize(el, component)
  
  return {
    left: data.left - 16,
    top: data.top - top + 6,
    scrollTop
  }
}

function getSize (el, component) {
  let width = 0
  let height = 0
  let offset = component.dataset.offset
  component.style.minWidth = `${el.clientWidth + 20}px`
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

  return { 
    left: el.offsetLeft - width,
    top: el.offsetTop - height,
    scrollTop: 0
  }
}

function dropdown (e, el, id, bus, hover) {
  e.preventDefault()

  const component = document.getElementById(id)

  if (!component
    ||!component.dataset.hover && hover 
    || component.style.display !== 'none'
  ) {
    return
  }

  let size = {}

  if (component.dataset.auto) {
    size = autoSize(el, component)
  } else {
    size = getSize(el, component)
  }

  component.style.left = `${size.left}px`
  component.style.top = `${size.top}px`

  bus.pub(`menu:open:${id}`)

  setTimeout(() => component.scrollTop = size.scrollTop, 100)
}

function directive (el, binding, v) {
  const config = directiveConfig(binding)
  let id = config.value
  let bus = v.context.$vuetify.bus

  el.dataset.menu = id

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
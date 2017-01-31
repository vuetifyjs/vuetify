import { directiveConfig } from '../util/helpers'

function autoSize (el, component) {
  const children = Array.from(component.getElementsByClassName('list__tile'))
  let scrollTop = 0
  let top = 0
  let selected = {}
  let index = 0

  children.forEach((el, i) => {
    if (el.classList.contains('list__tile--active')) {
      index = i
      selected = el
    }
  })

  component.style.display = 'block'
  if (index < 2 || children.length < 4 || !component.dataset.scrollable) {
    top = 20 + (children[0].clientHeight * index)
  } else if (index < children.length - 2) {
    top = component.clientHeight / 2 - 19
    scrollTop = 35 + ((index - 2) * selected.clientHeight)
  } else {
    const number = children.length - 2 === index ? 2 : 3

    top = 12 + (selected.clientHeight * number)
    scrollTop = component.scrollHeight
  }
  component.style.display = 'none'

  const data = getSize(el, component)

  return {
    left: data.left - 16,
    top: data.top - top + 6,
    scrollTop
  }
}

function getSize (el, component) {
  let width = 0
  let height = 0
  const offsetX = component.dataset.offsetX
  const offsetY = component.dataset.offsetY
  const autoWidth = component.dataset.auto ? 20 : 0

  component.style.minWidth = `${el.clientWidth + autoWidth}px`
  component.style.display = 'block'
  const componentWidth = component.clientWidth
  const componentHeight = component.clientHeight
  component.style.display = 'none'

  if (component.dataset.bottom) {
    height = componentHeight - (offsetY ? 0 : el.clientHeight)
  } else {
    height = offsetY ? -el.clientHeight : 0
  }

  if (component.dataset.right) {
    width = componentWidth - (offsetX ? 0 : el.clientWidth)
  } else {
    width = offsetX ? -el.clientWidth : 0
  }

  return {
    left: el.offsetLeft - width,
    top: el.offsetTop - height,
    scrollTop: 0
  }
}

function dropdown (e, el, component) {
  e.stopPropagation()

  if (!component || component.style.display !== 'none') {
    return
  }

  const size = component.dataset.auto
    ? autoSize(el, component)
    : getSize(el, component)

  component.style.left = `${size.left}px`
  component.style.top = `${size.top}px`

  setTimeout(() => (component.scrollTop = size.scrollTop), 0)
}

function directive (el, binding, v) {
  const config = directiveConfig(binding)
  const component = document.getElementById(config.value)

  el.dataset.menu = config.value

  // Directive binding happens before all components are rendered
  // When changing routes, dropdown element may not be ready
  const eventType = component.dataset.hover ? 'mouseenter' : 'click'

  el.addEventListener(eventType, e => {
    if (config.cb && !config.cb()) {
      return
    }

    dropdown(e, el, component)
  }, false)
}

export default {
  bind (el, binding, v) {
    v.context.$vuetify().load(() => directive(el, binding, v))
  },
  unbind (el) {
    // const component = document.getElementById(el.dataset.menu)
    // const event = component.dataset.hover ? 'mouseenter' : 'click'

    // el.removeEventListener(event, dropdown, false)
    // el.removeAttribute('data-menu')
  }
}

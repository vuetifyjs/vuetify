var defaults = {}

function setPositions (tooltip, el, position) {
    if (position === 'top') {
      tooltip.style.top = `${el.offsetTop - (tooltip.clientHeight)}px`
      tooltip.style.left = `${el.offsetLeft + el.clientWidth / 2 - tooltip.clientWidth / 2}px`
    } else if (position === 'left') {
      tooltip.style.top = `${el.offsetTop + ((el.clientHeight - tooltip.clientHeight) / 2) + 1}px`
      tooltip.style.left = `${el.offsetLeft - tooltip.clientWidth}px`
    } else if (position === 'right') {
      tooltip.style.top = `${el.offsetTop + ((el.clientHeight - tooltip.clientHeight) / 2) + 1}px`
      tooltip.style.left = `${el.offsetLeft + el.clientWidth + 2}px`
    } else if (position === 'bottom') {
      tooltip.style.top = `${el.offsetTop + el.clientHeight + 2}px`
      tooltip.style.left = `${el.offsetLeft + el.clientWidth / 2 - tooltip.clientWidth / 2}px`
    }
}

function directive (el, binding) {
  const tooltip = document.createElement('div')
  let config = {}

  Object.assign(
    config,
    defaults,
    binding.modifiers,
    { value: binding.arg },
    binding.value || {}
  )

  tooltip.classList.add('tooltip')
  tooltip.classList.add(`tooltip--${config.value}`)
  tooltip.innerHTML = config.html

  if (el.parentNode.lastChild === el) {
    el.parentNode.appendChild(tooltip)
  } else {
    el.parentNode.insertBefore(tooltip, el.nextSibling)
  }

  setTimeout(() => setPositions(tooltip, el, config.value), 200)

  let timeout = {}

  el.onmouseenter = function () {
    setPositions(tooltip, el, config.value)
    
    timeout = setTimeout(() => tooltip.classList.add('tooltip--active'), 100)
  }

  el.onmouseleave = function () {
    clearTimeout(timeout)

    tooltip.classList.remove('tooltip--active')
  }
}

export default {
  bind (el, binding, v) {
    v.context.$vuetify.load.call(
      v.context,
      () => directive(el, binding, v)
    )
  },

  updated (el, binding, v) {
    el.nextSibling.remove()
    directive(el, binding, v)
  },

  componentUpdated (el, binding, v) {
    el.nextSibling.remove()
    directive(el, binding, v)
  },

  unbind (el) {
    el.nextSibling.remove()
    el.removeAttribute('mouseenter')
    el.removeAttribute('mouseleave')
  }
}
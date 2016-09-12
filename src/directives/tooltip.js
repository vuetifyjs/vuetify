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

function init (el, binding, vnode) {
  const tooltip = document.createElement('div')

  tooltip.classList.add('tooltip')
  tooltip.classList.add(`tooltip--${binding.arg}`)
  tooltip.innerHTML = binding.value

  if (el.parentNode.lastChild === el) {
    el.parentNode.appendChild(tooltip)
  } else {
    el.parentNode.insertBefore(tooltip, el.nextSibling)
  }

  setTimeout(() => setPositions(tooltip, el, binding.arg), 200)

  let timeout = {}

  el.onmouseenter = function () {
    setPositions(tooltip, el, binding.arg)
    
    timeout = setTimeout(() => tooltip.classList.add('tooltip--active'), 100)
  }

  el.onmouseleave = function () {
    clearTimeout(timeout)

    tooltip.classList.remove('tooltip--active')
  }
}

export default {
  bind (el, binding, vnode) {
    vnode.context.$vuetify.load.call(vnode.context, () => init(el, binding, vnode))
  },

  unbind (el) {
    el.nextSibling.remove()
    el.removeAttribute('mouseenter')
    el.removeAttribute('mouseleave')
  },

  componentUpdated (el, binding, vnode) {
    el.nextSibling.remove()
    vnode.context.$vuetify.load.call(vnode.context, () => init(el, binding, vnode))
  },

  updated (el, binding, vnode) {
    el.nextSibling.remove()
    vnode.context.$vuetify.load.call(vnode.context, () => init(el, binding, vnode))
  }
}
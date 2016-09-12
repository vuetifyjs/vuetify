function bind (el, binding, vnode) {
  if (binding.modifiers.overlap) {
    el.classList.add('badge--overlap')
  }

  if (binding.modifiers.icon) {
    el.classList.add('badge--icon')
  }

  if (binding.modifiers.left) {
    el.classList.add('badge--left')
  }

  el.setAttribute('data-badge', binding.arg)
  el.classList.add('badge')
}

function unbind (el, binding) {
  if (binding.modifiers.overlap) {
    el.classList.remove('badge--overlap')
  }

  if (binding.modifiers.icon) {
    el.classList.remove('badge--icon')
  }

  if (binding.modifiers.left) {
    el.classList.remove('badge--left')
  }

  el.removeAttribute('data-badge')
  el.classList.remove('badge')
}

export default {
  bind (el, binding, vnode) {
    bind(el, binding, vnode)
  },

  updated (el, binding, vnode) {
    vnode.context.$nextTick(() => bind(el, binding, vnode))
  },

  componentUpdated (el, binding, vnode) {
    vnode.context.$nextTick(() => bind(el, binding, vnode))
  },

  unbind (el, binding) {
    unbind(el, binding)
  }
}
const Overlay = {
  functional: true,

  props: {
    value: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = data.staticClass ? `overlay ${data.staticClass}` : 'overlay'
    if (props.value) data.staticClass += ' overlay--active'

    if (typeof document !== 'undefined') {
      if (props.value) {
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.documentElement.style.overflow = null
      }
    }

    return h('div', data, children)
  }
}

export default {
  Overlay
}

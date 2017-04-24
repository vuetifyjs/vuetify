const Overlay = {
  functional: true,

  props: {
    value: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = data.staticClass ? `overlay ${data.staticClass}` : 'overlay'
    if (props.value) data.staticClass += ' overlay--active'

    return h('div', data, children)
  }
}

export default {
  Overlay
}

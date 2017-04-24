const Overlay = {
  functional: true,

  props: {
    absolute: Boolean,
    value: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = data.staticClass ? `overlay ${data.staticClass}` : 'overlay'

    if (props.value) data.staticClass += ' overlay--active'
    if (props.absolute) data.staticClass += ' overlay--absolute'

    return h('div', data, children)
  }
}

export default {
  Overlay
}

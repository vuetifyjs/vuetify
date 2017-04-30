const Divider = {
  functional: true,

  props: {
    dark: Boolean,
    inset: Boolean,
    light: Boolean
  },

  render (h, { props, data, children }) {
    data.staticClass = data.staticClass ? `divider ${data.staticClass}` : 'divider'

    if (props.inset) data.staticClass += ' divider--inset'
    if (props.dark) data.staticClass += ' divider--light'
    if (props.dark) data.staticClass += ' divider--dark'

    return h('hr', data)
  }
}

export default {
  Divider
}

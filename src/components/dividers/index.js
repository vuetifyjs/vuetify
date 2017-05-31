import Themeable from '../../mixins/themeable'

const Divider = {
  functional: true,

  mixins: [Themeable],

  props: {
    inset: Boolean
  },

  render (h, { props, data, children }) {
    data.staticClass = data.staticClass ? `divider ${data.staticClass}` : 'divider'

    if (props.inset) data.staticClass += ' divider--inset'
    if (props.light) data.staticClass += ' divider--light'
    if (props.dark && !props.light) data.staticClass += ' divider--dark'

    return h('hr', data)
  }
}

export default {
  Divider
}

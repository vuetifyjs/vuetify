import Themeable from '../../mixins/themeable'

const Footer = {
  functional: true,

  mixins: [Themeable],

  props: {
    absolute: Boolean,
    fixed: Boolean
  },

  render (h, { data, props, children }) {
    data.staticClass = data.staticClass ? `footer ${data.staticClass}` : 'footer'

    if (props.absolute) data.staticClass += ' footer--absolute'
    if (props.fixed) data.staticClass += ' footer--fixed'
    if (props.dark && !props.light) data.staticClass += ' footer--dark'
    if (props.light) data.staticClass += ' footer--light'

    return h('footer', data, children)
  }
}

export default {
  Footer
}

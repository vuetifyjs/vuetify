import Themeable from '~mixins/themeable'

export default {
  functional: true,

  mixins: [Themeable],

  props: {
    inset: Boolean
  },

  render (h, { props, data, children }) {
    data.staticClass = (`divider ${data.staticClass || ''}`).trim()

    if (props.dark) data.staticClass += ' theme--dark'
    if (props.inset) data.staticClass += ' divider--inset'
    if (props.light) data.staticClass += ' theme--light'

    return h('hr', data)
  }
}

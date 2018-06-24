// Styles
import '../../stylus/components/_dividers.styl'

// Mixins
import Themeable from '../../mixins/themeable'

/* @vue/component */
export default {
  name: 'v-divider',

  functional: true,

  props: {
    ...Themeable.options.props,
    inset: Boolean,
    vertical: Boolean
  },

  render (h, { props, data }) {
    data.staticClass = (`v-divider ${data.staticClass || ''}`).trim()

    if (props.inset) data.staticClass += ' v-divider--inset'
    if (props.vertical) data.staticClass += ' v-divider--vertical'
    if (props.light) data.staticClass += ' theme--light'
    if (props.dark) data.staticClass += ' theme--dark'

    return h('hr', data)
  }
}

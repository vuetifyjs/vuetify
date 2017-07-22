export default {
  functional: true,

  props: {
    absolute: Boolean,
    fixed: Boolean
  },

  render (h, { data, props, children }) {
    data.staticClass = (`footer ${data.staticClass || ''}`).trim()

    if (props.absolute) data.staticClass += ' footer--absolute'
    if (props.fixed) data.staticClass += ' footer--fixed'

    return h('footer', data, children)
  }
}

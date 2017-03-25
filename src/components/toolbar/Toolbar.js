export default {
  functional: true,

  props: { fixed: Boolean },

  render (h, { data, props, children }) {
    data.staticClass = data.staticClass ? `toolbar ${data.staticClass}` : 'toolbar'
    if (props.fixed) data.staticClass += ' toolbar--fixed'

    return h('nav', data, children)
  }
}

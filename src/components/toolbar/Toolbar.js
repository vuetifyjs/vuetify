export default {
  functional: true,

  render (h, { data, props, children }) {
    data.staticClass = data.staticClass ? `toolbar ${data.staticClass}` : 'toolbar'

    return h('nav', data, children)
  }
}

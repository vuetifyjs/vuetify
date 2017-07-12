export default {
  functional: true,

  props: {
    inset: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = (`subheader ${data.staticClass || ''}`).trim()

    if (props.inset) data.staticClass += ' subheader--inset'

    return h('li', data, children)
  }
}

const Subheader = {
  functional: true,

  name: 'v-subheader',

  props: {
    inset: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = data.staticClass ? `subheader ${data.staticClass}` : 'subheader'
    if (props.inset) data.staticClass += ' subheader--inset'

    return h('li', data, children)
  }
}

export default {
  Subheader
}

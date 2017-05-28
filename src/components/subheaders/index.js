import Themeable from '../../mixins/themeable'

const Subheader = {
  functional: true,

  mixins: [Themeable],

  props: {
    inset: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = data.staticClass ? `subheader ${data.staticClass}` : 'subheader'
    if (props.inset) data.staticClass += ' subheader--inset'
    if (props.dark && !props.light) data.staticClass += ' subheader--dark'
    if (props.light) data.staticClass += ' subheader--light'

    return h('li', data, children)
  }
}

export default {
  Subheader
}

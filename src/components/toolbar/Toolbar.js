import Themeable from '../../mixins/themeable'

export default {
  functional: true,

  mixins: [Themeable],

  props: {
    fixed: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = data.staticClass ? `toolbar ${data.staticClass}` : 'toolbar'
    if (props.fixed) data.staticClass += ' toolbar--fixed'
    data.staticClass += props.light ? ' toolbar--light' : ' toolbar--dark'

    return h('nav', data, children)
  }
}

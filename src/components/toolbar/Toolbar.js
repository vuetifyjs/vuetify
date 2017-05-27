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
    if (props.dark) data.staticClass += ' toolbar--dark'
    if (props.light) data.staticClass += ' toolbar--light'

    return h('nav', data, children)
  }
}

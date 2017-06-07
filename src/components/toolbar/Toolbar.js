import Schemable from '../../mixins/schemable'

export default {
  functional: true,

  mixins: [Schemable],

  props: {
    fixed: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = data.staticClass ? `toolbar ${data.staticClass}` : 'toolbar'
    if (props.fixed) data.staticClass += ' toolbar--fixed'
    if (props.dark) data.staticClass += ' dark--text dark--bg'
    if (props.light) data.staticClass += ' light--text light--bg'

    return h('nav', data, children)
  }
}

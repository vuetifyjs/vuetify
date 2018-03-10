// Styles
import '../../stylus/components/_counters.styl'

export default {
  functional: true,

  name: 'v-counter',

  props: {
    value: {
      default: ''
    }
  },

  render (h, { props }) {
    return h('div', {
      staticClass: 'v-counter'
    }, props.value)
  }
}

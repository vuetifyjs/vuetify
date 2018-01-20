import Bar from './Bar'
import Trend from './Trend'
import props from './mixins/props'

const COMPONENTS = {
  bar: Bar,
  trend: Trend
}

export default {
  name: 'v-sparkline',

  mixins: [props],

  props: {
    type: {
      type: String,
      default: 'trend',
      validator: val => ['trend', 'bar'].indexOf(val) > -1
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'sparkline'
    }, [
      h(COMPONENTS[this.type], {
        props: this.$props,
        attrs: this.$attrs
      })
    ])
  }
}
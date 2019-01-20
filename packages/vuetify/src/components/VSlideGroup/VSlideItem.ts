// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import mixins from '../../util/mixins'

export default mixins(
  GroupableFactory('slideGroup')
).extend({
  name: 'v-slide-item',

  props: {
    value: {
      required: false
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'v-slide-item'
    }, this.$slots.default)
  }
})

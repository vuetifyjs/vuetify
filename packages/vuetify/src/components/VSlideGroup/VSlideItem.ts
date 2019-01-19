// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import mixins from '../../util/mixins'

export default mixins(
  GroupableFactory('slideGroup')
).extend({
  name: 'v-slide-item',

  render (h) {
    return h('div', this.$slots.default)
  }
})

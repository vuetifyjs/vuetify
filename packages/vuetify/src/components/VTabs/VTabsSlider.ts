// Mixins
import Colorable from '../../mixins/colorable'

// Utilities
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(Colorable).extend({
  name: 'v-tabs-slider',

  render (h) {
    return h('div', this.setBackgroundColor(this.color, {
      staticClass: 'v-tabs__slider'
    }))
  }
})

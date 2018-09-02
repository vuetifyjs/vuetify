import { VNode } from 'vue'
// Styles
import '../../stylus/components/_overlay.styl'

// Mixins
import Toggleable from './../../mixins/toggleable'

// Utilities
import mixins from '../../util/mixins'

export default mixins(
  Toggleable
).extend({
  name: 'v-overlay',

  props: {
    absolute: Boolean,
    zIndex: [Number, String]
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-overlay',
      class: {
        'v-overlay--absolute': this.absolute,
        'v-overlay--active': this.isActive
      },
      style: {
        zIndex: this.zIndex
      }
    }, this.$slots.default)
  }
})

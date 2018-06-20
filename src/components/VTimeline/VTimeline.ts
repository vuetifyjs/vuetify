import '../../stylus/components/_timeline.styl'
import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'v-timeline',

  props: {
    right: Boolean,
    left: Boolean
  },

  computed: {
    classes (): {} {
      return {
        'v-timeline--left': this.left,
        'v-timeline--right': this.right
      }
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-timeline',
      'class': this.classes
    }, this.$slots.default)
  }
})

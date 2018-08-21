// Styles
import '../../stylus/components/_timeline.styl'

// Types
import Vue, { VNode } from 'vue'
import mixins from '../../util/mixins'

// Mixins
import Themeable from '../../mixins/themeable'

export default mixins(
  Themeable
/* @vue/component */
).extend({
  name: 'v-timeline',

  props: {
    right: Boolean,
    left: Boolean
  },

  computed: {
    classes (): {} {
      return {
        'v-timeline--left': this.left,
        'v-timeline--right': this.right,
        ...this.themeClasses
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

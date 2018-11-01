// Styles
import '../../stylus/components/_timeline.styl'

// Types
import { VNode } from 'vue'
import mixins from '../../util/mixins'

// Mixins
import Themeable from '../../mixins/themeable'

export default mixins(
  Themeable
/* @vue/component */
).extend({
  name: 'v-timeline',

  props: {
    alignTop: Boolean,
    dense: Boolean
  },

  computed: {
    classes (): {} {
      return {
        'v-timeline--align-top': this.alignTop,
        'v-timeline--dense': this.dense,
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

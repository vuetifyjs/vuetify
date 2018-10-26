// Styles
import '../../stylus/components/_dividers.styl'

// Types
import { VNode } from 'vue'

// Mixins
import Themeable from '../../mixins/themeable'

export default Themeable.extend({
  name: 'v-divider',

  props: {
    inset: Boolean,
    vertical: Boolean
  },

  render (h): VNode {
    return h('hr', {
      class: {
        'v-divider': true,
        'v-divider--inset': this.inset,
        'v-divider--vertical': this.vertical,
        ...this.themeClasses
      },
      attrs: this.$attrs,
      on: this.$listeners
    })
  }
})

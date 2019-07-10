// Styles
import './VDivider.sass'

// Types
import { VNode } from 'vue'

// Mixins
import Themeable from '../../mixins/themeable'

export default Themeable.extend({
  name: 'v-divider',

  props: {
    inset: Boolean,
    vertical: Boolean,
  },

  render (h): VNode {
    // WAI-ARIA attributes
    let orientation
    if (!this.$attrs.role || this.$attrs.role === 'separator') {
      orientation = this.vertical ? 'vertical' : 'horizontal'
    }
    return h('hr', {
      class: {
        'v-divider': true,
        'v-divider--inset': this.inset,
        'v-divider--vertical': this.vertical,
        ...this.themeClasses,
      },
      attrs: {
        role: 'separator',
        'aria-orientation': orientation,
        ...this.$attrs,
      },
      on: this.$listeners,
    })
  },
})

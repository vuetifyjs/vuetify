// Styles
import './VDivider.sass'

// Types
import { defineComponent, h } from 'vue'

// Mixins
import Themeable from '../../mixins/themeable'

export default defineComponent({
  name: 'v-divider',

  mixins: [Themeable],

  props: {
    inset: Boolean,
    vertical: Boolean,
  },

  render () {
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
      role: 'separator',
      'aria-orientation': orientation,
      ...this.$attrs,
    })
  },
})

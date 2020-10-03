// Styles
import './VSubheader.sass'

// Mixins
import Themeable from '../../mixins/themeable'

// Types
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'v-subheader',

  mixins: [
    Themeable,
  ],

  props: {
    inset: Boolean,
  },

  render () {
    return h('div', {
      class: {
        'v-subheader': true,
        'v-subheader--inset': this.inset,
        ...this.themeClasses,
      },
    }, this.$slots.default?.())
  },
})

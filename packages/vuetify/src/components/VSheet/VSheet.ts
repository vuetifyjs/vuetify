// Styles
import './VSheet.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Elevatable from '../../mixins/elevatable'
import Measurable from '../../mixins/measurable'
import Roundable from '../../mixins/roundable'
import Themeable from '../../mixins/themeable'

// Utilities
import { defineComponent, h } from 'vue'

// Types
import type { VNode } from 'vue'

export default defineComponent({
  name: 'v-sheet',

  mixins: [
    Colorable,
    Elevatable,
    Measurable,
    Roundable,
    Themeable,
  ],

  props: {
    outlined: Boolean,
    shaped: Boolean,
    tag: {
      type: String,
      default: 'div',
    },
  },

  computed: {
    classes (): object {
      return {
        'v-sheet': true,
        'v-sheet--outlined': this.outlined,
        'v-sheet--shaped': this.shaped,
        ...this.themeClasses,
        ...this.elevationClasses,
        ...this.roundedClasses,
      }
    },
    styles (): object {
      return this.measurableStyles
    },
  },

  render (): VNode {
    const data = {
      class: this.classes,
      style: this.styles,
    }

    return h(
      this.tag,
      this.setBackgroundColor(this.color, data),
      this.$slots.default?.()
    )
  },
})

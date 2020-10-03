import './VAvatar.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Measurable from '../../mixins/measurable'
import Roundable from '../../mixins/roundable'

// Utilities
import { defineComponent } from 'vue'
import { convertToUnit } from '../../util/helpers'

// Types
import type { VNode } from 'vue'

export default defineComponent({
  name: 'v-avatar',

  mixins: [
    Colorable,
    Measurable,
    Roundable,
  ],

  props: {
    left: Boolean,
    right: Boolean,
    size: {
      type: [Number, String],
      default: 48,
    },
  },

  computed: {
    classes (): object {
      return {
        'v-avatar': true,
        'v-avatar--left': this.left,
        'v-avatar--right': this.right,
        ...this.roundedClasses,
      }
    },
    styles (): object {
      return {
        height: convertToUnit(this.size),
        minWidth: convertToUnit(this.size),
        width: convertToUnit(this.size),
        ...this.measurableStyles,
      }
    },
  },

  render (h): VNode {
    const data = {
      class: this.classes,
      style: this.styles,
    }

    return h('div', this.setBackgroundColor(this.color, data), this.$slots.default?.())
  },
})

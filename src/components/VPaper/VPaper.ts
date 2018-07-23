import '../../stylus/components/_paper.styl'

import { VNode } from 'vue'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import mixins from '../../util/mixins'

export default mixins(
  Colorable,
  Themeable
).extend({
  name: 'v-paper',

  data () {
    return {
      isMouseOver: false as boolean
    }
  },

  props: {
    elevation: {
      type: [Number, String],
      default: 0
    },
    hover: [Number, String],
    tag: {
      type: String,
      default: 'div'
    }
  },

  computed: {
    classes (): object {
      return this.addBackgroundColorClassChecks({
        'v-paper': true,
        ...this.themeClasses,
        [`elevation-${this.computedElevation}`]: true
      }, this.color)
    },
    listeners (): object {
      return this.hover === undefined ? {} : {
        mouseenter: () => {
          this.isMouseOver = true
        },
        mouseleave: () => {
          this.isMouseOver = false
        }
      }
    },
    computedElevation (): string | number {
      return this.isMouseOver ? this.hover : this.elevation
    }
  },

  render (h): VNode {
    return h(this.tag, {
      class: this.classes,
      on: {
        ...this.listeners
      }
    }, this.$slots.default)
  }
})

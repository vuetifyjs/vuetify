// Styles
import '../../stylus/components/_sheet.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Elevatable from '../../mixins/elevatable'
import Measurable from '../../mixins/measurable'
import Themeable from '../../mixins/themeable'

// Helpers
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

/* @vue/component */
export default mixins(
  Colorable,
  Elevatable,
  Measurable,
  Themeable
).extend({
  name: 'v-sheet',

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    tile: Boolean
  },

  computed: {
    classes (): object {
      return {
        'v-sheet': true,
        'v-sheet--tile': this.tile,
        ...this.themeClasses,
        ...this.elevationClasses
      }
    },
    styles (): object {
      return this.measurableStyles
    }
  },

  render (h): VNode {
    const data = {
      class: this.classes,
      style: this.styles,
      on: this.$listeners
    }

    return h(
      this.tag,
      this.setBackgroundColor(this.color, data),
      this.$slots.default
    )
  }
})

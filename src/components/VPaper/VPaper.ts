import '../../stylus/components/_paper.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import Elevationable from '../../mixins/elevationable'

// Helpers
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

/* @vue/component */
export default mixins(Elevationable, Colorable, Themeable).extend({
  name: 'v-paper',

  props: {
    square: Boolean,
    tag: {
      type: String,
      default: 'div'
    },
    elevation: Number
  },

  computed: {
    classes (): object {
      return this.addBackgroundColorClassChecks({
        'v-paper': true,
        'v-paper--square': this.square,
        ...this.themeClasses,
        ...this.elevationClass
      })
    }
  },

  render (h): VNode {
    const data = {
      class: this.classes
    }

    return h(this.tag, data, this.$slots.default)
  }
})

import '../../stylus/components/_timeline.styl'

//  MIXINS
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

export default {
  name: 'v-timeline',

  mixins: [Colorable, Themeable],

  provide () {
    return {
      right: this.right,
      left: this.left,
      alternate: this.alternate
    }
  },

  props: {
    right: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    alternate: {
      type: Boolean,
      default: true
    }
  },

  render (h) {
    return h(
      'ul',
      {
        staticClass: 'v-timeline',
        class: {
          ...this.themeClasses
        }
      },
      this.$slots.default
    )
  }
}

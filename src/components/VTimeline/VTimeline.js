import '../../stylus/components/_timeline.styl'

//  MIXINS
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-timeline',

  mixins: [Colorable],

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
        staticClass: 'v-timeline'
      },
      this.$slots.default
    )
  }
}

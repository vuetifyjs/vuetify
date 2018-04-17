import '../../stylus/components/_timeline.styl'

//  MIXINS
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-timeline',

  mixins: [Colorable],

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
      default: false
    }
  },

  computed: {
    alignClass () {
      return {
        'v-timeline--alternate': this.alternate,
        'v-timeline--left': this.left,
        'v-timeline--right': this.right
      }
    }
  },

  render (h) {
    return h(
      'ul',
      {
        staticClass: 'v-timeline',
        class: this.alignClass
      },
      this.$slots.default
    )
  }
}

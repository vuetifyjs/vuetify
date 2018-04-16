import '../../stylus/components/_timeline.styl'

//  MIXINS
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

export default {
  name: 'v-timeline',

  mixins: [Colorable, Themeable],

  provide () {
    return {
      iconParent: this.icon,
      noIconParent: this.noIcon,
      circleFillColorParent: this.circleFillColor
    }
  },

  props: {
    right: {
      type: Boolean,
      default: true
    },
    left: {
      type: Boolean,
      default: false
    },
    alternate: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'event'
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    circleFillColor: {
      type: String,
      default: 'grey lighten-4'
    }
  },

  render (h) {
    return h(
      'div',
      {
        staticClass: 'v-timeline',
        class: {
          ...this.themeClasses
        }
      },
      [
        h(
          'ul',
          {
            staticClass: 'v-timeline__container'
          },
          this.$slots.default
        )
      ]
    )
  }
}

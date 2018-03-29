import '../../stylus/components/_timeline.styl'

//  MIXINS
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

export default {
  name: 'v-timeline',

  mixins: [Colorable, Themeable],

  props: {
    icon: {
      type: String,
      default: 'event'
    },
    iconSize: {
      type: [Number, String],
      default: '24px'
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    lineSize: {
      type: [Number, String],
      default: 8
    },
    lineColor: {
      type: String,
      default: 'grey lighten-2'
    },
    circleOutlineSize: {
      type: [Number, String]
    },
    circleOutlineColor: {
      type: String,
      default: 'grey lighten-2'
    },
    circleFillColor: {
      type: String,
      default: 'white'
    },
    hideCircleOutline: {
      type: Boolean,
      default: false
    },
    raised: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return this.addTextColorClassChecks({}, this.lineColor)
    }
  },

  render (h) {
    return h(
      'div',
      {
        staticClass: 'timeline',
        class: {
          ...this.themeClasses
        }
      },
      [
        h(
          'ul',
          {
            staticClass: 'timeline__container',
            class: this.classes
          },
          this.$slots.default
        )
      ]
    )
  }
}

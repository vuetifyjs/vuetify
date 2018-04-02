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
      iconSizeParent: this.iconSize,
      noIconParent: this.noIcon,
      lineColorParent: this.lineColor,
      hoverParent: this.hover,
      raisedParent: this.raised,
      circleFillColorParent: this.circleFillColor,
      circleOutlineColorParent: this.circleOutlineColor,
      lineSizeParent: this.lineSize,
      circleOutlineSizeParent: this.circleOutlineSize,
      hideCircleOutlineParent: this.hideCircleOutline
    }
  },

  props: {
    icon: {
      type: String,
      default: 'event'
    },
    iconSize: {
      type: [Number, String],
      default: 24
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
      type: [Number, String],
      default: 8
    },
    circleOutlineColor: {
      type: String
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
            staticClass: 'timeline__container'
          },
          this.$slots.default
        )
      ]
    )
  }
}

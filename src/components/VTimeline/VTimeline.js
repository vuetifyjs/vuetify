import '../../stylus/components/_timeline.styl'

//  MIXINS
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

export default {
  name: 'v-timeline',

  mixins: [Colorable, Themeable],

  props: {
    lineSize: {
      type: [Number, String],
      default: 8
    },
    lineColor: {
      type: String,
      default: 'grey lighten-2'
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    iconFillColor: {
      type: String,
      default: 'white'
    }
  },

  computed: {
    classes () {
      return this.addTextColorClassChecks(null, this.lineColor)
    }
  },

  render (h) {
    return h(
      'section',
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

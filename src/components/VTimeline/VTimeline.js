import '../../stylus/components/_timeline.styl'

//  MIXINS
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

export default {
  name: 'v-timeline',

  props: {
    lineColor: {
      type: String,
      default: 'grey lighten-2'
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    fillColor: {
      type: String,
      default: 'white'
    }
  },

  mixins: [Colorable, Themeable],

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

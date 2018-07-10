import '../../stylus/components/_cards.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'

// Helpers
import { convertToUnit } from '../../util/helpers'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

/* @vue/component */
export default mixins(Colorable, Routable, Themeable).extend({
  name: 'v-card',

  props: {
    flat: Boolean,
    height: [Number, String],
    hover: Boolean,
    img: String,
    raised: Boolean,
    tag: {
      type: String,
      default: 'div'
    },
    tile: Boolean,
    width: [String, Number]
  },

  computed: {
    classes (): object {
      return this.addBackgroundColorClassChecks({
        'v-card': true,
        'v-card--flat': this.flat,
        'v-card--hover': this.hover,
        'v-card--raised': this.raised,
        'v-card--tile': this.tile,
        'theme--light': this.light,
        'theme--dark': this.dark
      })
    },
    styles (): object {
      const style: Record<string, any> = {
        height: convertToUnit(this.height)
      }

      if (this.img) {
        style.background = `url("${this.img}") center center / cover no-repeat`
      }

      if (this.width) {
        style.width = convertToUnit(this.width)
      }

      return style
    }
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink()

    data.style = this.styles

    return h(tag, data, this.$slots.default)
  }
})

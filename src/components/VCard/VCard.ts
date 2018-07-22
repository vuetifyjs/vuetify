// Styles
import '../../stylus/components/_cards.styl'

// Components
import VPaper from '../VPaper'

// Mixins
import Routable from '../../mixins/routable'

// Helpers
import { convertToUnit } from '../../util/helpers'

// Types
import { VNode } from 'vue'
import mixins from '../../util/mixins'
import { deprecate } from '../../util/console'

/* @vue/component */
export default mixins(Routable, VPaper).extend({
  name: 'v-card',

  props: {
    elevation: {
      type: [Number, String],
      default: 1
    },
    flat: Boolean,
    height: [Number, String],
    /* @deprecated */
    img: String,
    /* @deprecated */
    raised: Boolean,
    width: [Number, String]
  },

  computed: {
    classes (): object {
      return {
        'v-card': true,
        ...VPaper.options.computed.classes.call(this)
      }
    },
    computedElevation (): number | string {
      if (this.raised) {
        deprecate('<v-card raised>', '<v-card elevation="3">', this)

        return 3
      }

      return this.flat
        ? 0
        : VPaper.options.computed.computedElevation.call(this)
    },
    styles (): object {
      const style: Record<string, any> = {
        height: convertToUnit(this.height)
      }

      if (this.img) {
        deprecate('<v-card img="...">', 'a nested <v-img>', this)

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
    data.on = {
      ...data.on,
      ...VPaper.options.computed.listeners.call(this)
    }

    return h(tag, data, this.$slots.default)
  }
})

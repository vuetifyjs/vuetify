// Styles
import '../../stylus/components/_cards.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Elevatable from '../../mixins/elevatable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'

// Helpers
import { convertToUnit } from '../../util/helpers'
import { deprecate } from '../../util/console'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'
import { ClassesObject } from './../../../types'

/* @vue/component */
export default mixins(
  Colorable,
  Elevatable,
  Routable,
  Themeable
).extend({
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
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    /* @deprecated */
    raised: Boolean,
    tag: {
      type: String,
      default: 'div'
    },
    tile: Boolean,
    width: [Number, String]
  },

  computed: {
    classes (): ClassesObject {
      return this.addBackgroundColorClassChecks({
        'v-card': true,
        'v-card--flat': this.flat,
        'v-card--hover': Boolean(this.hover),
        'v-card--raised': this.raised,
        'v-card--tile': this.tile,
        ...this.themeClasses,
        ...this.elevationClasses
      })
    },
    computedElevation (): number | string {
      if (this.raised) {
        deprecate('<v-card raised>', '<v-card elevation="3">', this)

        return 3
      }

      if (this.hover === '' && this.isMouseOver) {
        deprecate('<v-card hover>', '<v-card hover="8">', this)

        return 8
      }

      return this.flat
        ? 0
        : Elevatable.options.computed.computedElevation.call(this)
    },
    styles (): object {
      const style: Record<string, any> = {
        height: convertToUnit(this.height),
        maxHeight: convertToUnit(this.maxHeight),
        maxWidth: convertToUnit(this.maxWidth),
        width: convertToUnit(this.width)
      }

      if (this.img) {
        deprecate('<v-card img="...">', 'a nested <v-img>', this)
        style.background = `url("${this.img}") center center / cover no-repeat`
      }

      return style
    }
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink()

    data.on = {
      ...data.on,
      ...this.listeners()
    }
    data.style = this.styles

    return h(tag, data, this.$slots.default)
  }
})

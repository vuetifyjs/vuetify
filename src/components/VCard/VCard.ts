// Styles
import '../../stylus/components/_cards.styl'

// Components
import { VPaper } from '../VPaper'

// Mixins
import Routable from '../../mixins/routable'

// Helpers
import { addPaperClasses } from '../VPaper/VPaper'
import { convertToUnit } from '../../util/helpers'
import { deprecate } from '../../util/console'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'
import { ClassesObject } from './../../../types'

/* @vue/component */
export default mixins(
  Routable
).extend({
  name: 'v-card',

  data: () => ({
    isMouseOver: false as boolean
  }),

  props: {
    ...VPaper.options.props,
    elevation: {
      type: [Number, String],
      default: 1
    },
    flat: Boolean,
    height: [Number, String],
    hover: [Number, String],
    /* @deprecated */
    img: String,
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    /* @deprecated */
    raised: Boolean,
    tile: Boolean,
    width: [Number, String]
  },

  computed: {
    classes (): ClassesObject {
      return {
        'v-paper v-card': true,
        'v-card--tile': this.tile
      }
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
        : this.isMouseOver ? this.hover : this.elevation
    },
    listeners (): object {
      return this.hover === undefined ? {} : {
        mouseenter: () => {
          this.isMouseOver = true
        },
        mouseleave: () => {
          this.isMouseOver = false
        }
      }
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

    data.class = {
      ...data.class,
      ...addPaperClasses({
        color: this.color,
        dark: this.dark,
        light: this.light,
        elevation: this.computedElevation
      })
    }

    data.style = this.styles
    data.on = {
      ...data.on,
      ...this.listeners
    }

    return h(tag, data, this.$slots.default)
  }
})

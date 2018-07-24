// Styles
import '../../stylus/components/_cards.styl'

// Components
import { VPaper } from '../VPaper'

// Mixins
import Routable from '../../mixins/routable'

// Helpers
import { addPaperClasses, addPaperStyles } from '../VPaper/VPaper'
import { convertToUnit } from '../../util/helpers'
import { deprecate } from '../../util/console'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'
import { ClassesObject } from './../../../types'

/* @vue/component */
export default mixins(
  VPaper,
  Routable
).extend({
  name: 'v-card',

  functional: false,

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
    hover: [Number, String],
    /* @deprecated */
    img: String,
    /* @deprecated */
    raised: Boolean,
    tile: Boolean
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
        mouseenter: (e: Event) => {
          this.isMouseOver = true
          this.$emit('mouseenter', e)
        },
        mouseleave: (e: Event) => {
          this.isMouseOver = false
          this.$emit('mouseleave', e)
        }
      }
    },
    styles (): object {
      if (!this.img) return {}

      deprecate('<v-card img="...">', 'a nested <v-img>', this)

      return {
        background: `url("${this.img}") center center / cover no-repeat`
      }
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

    data.style = {
      ...data.style,
      ...this.styles,
      ...addPaperStyles({
        height: convertToUnit(this.height),
        maxHeight: convertToUnit(this.maxHeight),
        maxWidth: convertToUnit(this.maxWidth),
        width: convertToUnit(this.width)
      })
    }

    data.on = {
      ...data.on,
      ...this.listeners
    }

    return h(tag, data, this.$slots.default)
  }
})

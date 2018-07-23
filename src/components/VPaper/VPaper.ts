import '../../stylus/components/_paper.styl'

import { VNode } from 'vue'

// Components
import { VResponsive } from '../VResponsive'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import mixins from '../../util/mixins'

export default mixins(
  VResponsive,
  Colorable,
  Themeable
).extend({
  name: 'v-paper',

  data () {
    return {
      isMouseOver: false as boolean
    }
  },

  props: {
    elevation: {
      type: [Number, String],
      default: 0
    },
    hover: [Number, String],
    square: Boolean,
    tile: Boolean,
    tag: {
      type: String,
      default: 'div'
    }
  },

  computed: {
    classes (): object {
      return this.addBackgroundColorClassChecks({
        ...VResponsive.options.computed.classes.call(this),
        'v-paper': true,
        'v-paper--tile': this.tile,
        ...this.themeClasses,
        [`elevation-${this.computedElevation}`]: true
      }, this.color)
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
    computedElevation (): string | number {
      return this.isMouseOver ? this.hover : this.elevation
    }
  },

  render (h): VNode {
    const node = VResponsive.options.render.call(this, h)

    node.on = {
      ...node.on,
      ...this.listeners
    }

    return h(node.tag, node.data, node.children)
  }
})

// Styles
import './VSystemBar.sass'

// Mixins
import Applicationable from '../../mixins/applicationable'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Utilities
import mixins from '../../util/mixins'
import { convertToUnit, getSlot } from '../../util/helpers'

// Types
import { VNode } from 'vue/types'

export default mixins(
  Applicationable('bar', [
    'height',
    'window',
  ]),
  Colorable,
  Themeable
/* @vue/component */
).extend({
  name: 'v-system-bar',

  props: {
    height: [Number, String],
    lightsOut: Boolean,
    window: Boolean,
  },

  computed: {
    classes (): object {
      return {
        'v-system-bar--lights-out': this.lightsOut,
        'v-system-bar--absolute': this.absolute,
        'v-system-bar--fixed': !this.absolute && (this.app || this.fixed),
        'v-system-bar--window': this.window,
        ...this.themeClasses,
      }
    },
    computedHeight (): number | string {
      if (this.height) {
        return isNaN(parseInt(this.height)) ? this.height : parseInt(this.height)
      }

      return this.window ? 32 : 24
    },
    styles (): object {
      return {
        height: convertToUnit(this.computedHeight),
      }
    },
  },

  methods: {
    updateApplication () {
      return this.$el
        ? this.$el.clientHeight
        : this.computedHeight
    },
  },

  render (h): VNode {
    const data = {
      staticClass: 'v-system-bar',
      class: this.classes,
      style: this.styles,
      on: this.$listeners,
    }

    return h('div', this.setBackgroundColor(this.color, data), getSlot(this))
  },
})

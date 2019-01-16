import '../../stylus/components/_system-bars.styl'

import Applicationable from '../../mixins/applicationable'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Types
import { VNode } from 'vue/types'
import mixins from '../../util/mixins'

export default mixins(
  Applicationable('bar', [
    'height',
    'window'
  ]),
  Colorable,
  Themeable
/* @vue/component */
).extend({
  name: 'v-system-bar',

  props: {
    height: {
      type: [Number, String],
      validator: (v: any) => !isNaN(parseInt(v))
    },
    lightsOut: Boolean,
    status: Boolean,
    window: Boolean
  },

  computed: {
    classes (): object {
      return {
        'v-system-bar--lights-out': this.lightsOut,
        'v-system-bar--absolute': this.absolute,
        'v-system-bar--fixed': !this.absolute && (this.app || this.fixed),
        'v-system-bar--status': this.status,
        'v-system-bar--window': this.window,
        ...this.themeClasses
      }
    },
    computedHeight (): number {
      if (this.height) return parseInt(this.height)

      return this.window ? 32 : 24
    }
  },

  methods: {
    /**
     * Update the application layout
     *
     * @return {number}
     */
    updateApplication () {
      return this.computedHeight
    }
  },

  render (h): VNode {
    const data = {
      staticClass: 'v-system-bar',
      'class': this.classes,
      style: {
        height: `${this.computedHeight}px`
      }
    }

    return h('div', this.setBackgroundColor(this.color, data), this.$slots.default)
  }
})

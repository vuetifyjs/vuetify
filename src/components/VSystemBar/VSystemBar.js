import '../../stylus/components/_system-bars.styl'

import Applicationable from '../../mixins/applicationable'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

/* @vue/component */
export default {
  name: 'v-system-bar',

  mixins: [
    Applicationable('bar', [
      'height',
      'window'
    ]),
    Colorable,
    Themeable
  ],

  props: {
    height: {
      type: [Number, String],
      validator: v => !isNaN(parseInt(v))
    },
    lightsOut: Boolean,
    status: Boolean,
    window: Boolean
  },

  computed: {
    classes () {
      return this.addBackgroundColorClassChecks(Object.assign({
        'v-system-bar--lights-out': this.lightsOut,
        'v-system-bar--absolute': this.absolute,
        'v-system-bar--fixed': !this.absolute && (this.app || this.fixed),
        'v-system-bar--status': this.status,
        'v-system-bar--window': this.window
      }, this.themeClasses))
    },
    computedHeight () {
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

  render (h) {
    const data = {
      staticClass: 'v-system-bar',
      'class': this.classes,
      style: {
        height: `${this.computedHeight}px`
      }
    }

    return h('div', data, this.$slots.default)
  }
}

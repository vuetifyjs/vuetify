require('../../stylus/components/_system-bars.styl')

import Applicationable from '../../mixins/applicationable'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

export default {
  name: 'v-system-bar',

  mixins: [Applicationable, Colorable, Themeable],

  props: {
    lightsOut: Boolean,
    status: Boolean,
    window: Boolean
  },

  computed: {
    classes () {
      return this.addBackgroundColorClassChecks({
        'system-bar': true,
        'system-bar--lights-out': this.lightsOut,
        'system-bar--status': this.status,
        'system-bar--window': this.window,
        'theme--dark': this.dark,
        'theme--light': this.light
      })
    },
    computedHeight () {
      if (this.window) return 32

      return 24
    }
  },

  methods: {
    updateApplication () {
      if (!this.app) return

      this.$vuetify.application.bar = this.computedHeight
    }
  },

  render (h) {
    const data = {
      'class': this.classes,
      style: {
        height: `${this.computedHeight}px`
      }
    }

    return h('div', data, this.$slots.default)
  }
}

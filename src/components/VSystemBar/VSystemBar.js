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
      return this.addBackgroundColorClassChecks(Object.assign({
        'system-bar--lights-out': this.lightsOut,
        'system-bar--fixed': this.app,
        'system-bar--status': this.status,
        'system-bar--window': this.window
      }, this.themeClasses))
    },
    computedHeight () {
      return this.window ? 32 : 24
    }
  },

  watch: {
    window () {
      this.updateApplication()
    }
  },

  methods: {
    updateApplication () {
      if (this.app) this.$vuetify.application.bar = this.computedHeight
    }
  },

  destroyed () {
    if (this.app) this.$vuetify.application.bar = 0
  },

  render (h) {
    const data = {
      staticClass: 'system-bar',
      'class': this.classes,
      style: {
        height: `${this.computedHeight}px`
      }
    }

    return h('div', data, this.$slots.default)
  }
}

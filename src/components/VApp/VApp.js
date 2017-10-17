require('../../stylus/components/_app.styl')

import Breakpoint from '../../util/breakpoint'
import Themeable from '../../mixins/themeable'
import TouchSupport from '../../util/touchSupport'

import Resize from '../../directives/resize'

export default {
  name: 'v-app',

  mixins: [Breakpoint, Themeable, TouchSupport],

  directives: {
    Resize
  },

  data: () => ({
    resizeTimeout: {}
  }),

  props: {
    id: {
      type: String,
      default: 'app'
    }
  },

  mounted () {
    this.$vuetify.breakpoint = this.breakpoint
    window.addEventListener('load', this.runCallbacks)
  },

  methods: {
    // Run all load callbacks created
    // from the load helper utility
    runCallbacks () {
      // For unit tests
      if (!document._loadCallbacks) return

      while (document._loadCallbacks.length) {
        document._loadCallbacks.pop()()
      }
    }
  },

  render (h) {
    const data = {
      staticClass: 'application',
      'class': {
        'application--dark': this.dark,
        'application--light': !this.dark
      },
      attrs: { 'data-app': true },
      domProps: { id: this.id },
      directives: [{
        name: 'resize',
        value: this.onResize
      }]
    }

    return h('div', data, this.$slots.default)
  }
}

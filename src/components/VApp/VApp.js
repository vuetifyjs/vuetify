require('../../stylus/components/_app.styl')

// Component level mixins
import AppTheme from './mixins/app-theme'
import AppBreakpoint from './mixins/app-breakpoint'

// Directives
import Resize from '../../directives/resize'

// Utilities
import Themeable from '../../mixins/themeable'
import TouchSupport from '../../util/touchSupport'

export default {
  name: 'v-app',

  mixins: [
    AppBreakpoint,
    AppTheme,
    Themeable,
    TouchSupport
  ],

  directives: {
    Resize
  },

  props: {
    id: {
      type: String,
      default: 'app'
    }
  },

  mounted () {
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

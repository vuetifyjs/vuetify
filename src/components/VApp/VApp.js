import '../../stylus/components/_app.styl'

// Component level mixins
import AppTheme from './mixins/app-theme'
import AppBreakpoint from './mixins/app-breakpoint'

import Themeable from '../../mixins/themeable'

// Directives
import Resize from '../../directives/resize'

export default {
  name: 'v-app',

  mixins: [
    AppBreakpoint,
    AppTheme,
    Themeable
  ],

  directives: {
    Resize
  },

  props: {
    id: {
      type: String,
      default: 'app'
    },
    dark: Boolean
  },

  computed: {
    classes () {
      return {
        'application--is-rtl': this.$vuetify.rtl,
        ...this.themeClasses
      }
    }
  },

  mounted () {
    this.$vuetify.dark = this.dark
  },

  watch: {
    dark () {
      this.$vuetify.dark = this.dark
    }
  },

  render (h) {
    const data = {
      staticClass: 'application',
      'class': this.classes,
      attrs: { 'data-app': true },
      domProps: { id: this.id },
      directives: [{
        name: 'resize',
        value: this.onResize
      }]
    }

    const wrapper = h('div', { staticClass: 'application--wrap' }, this.$slots.default)

    return h('div', data, [wrapper])
  }
}

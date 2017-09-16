require('../../stylus/components/_app.styl')

import Breakpoint from '../../util/breakpoint'
import Themeable from '../../mixins/themeable'

import Resize from '../../directives/resize'

export default {
  name: 'v-app',

  mixins: [Breakpoint, Themeable],

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
    this.onResize()
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

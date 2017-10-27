require('../../stylus/components/_footer.styl')

import Applicationable from '../../mixins/applicationable'
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-footer',

  mixins: [Applicationable, Colorable],

  props: {
    absolute: Boolean,
    fixed: Boolean
  },

  computed: {
    classes () {
      return {
        'footer--absolute': this.absolute,
        'footer--fixed': this.fixed,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    },
    paddingLeft () {
      return this.fixed || !this.app
        ? 0
        : this.$vuetify.application.left
    },
    paddingRight () {
      return this.fixed || !this.app
        ? 0
        : this.$vuetify.application.right
    }
  },

  destroyed () {
    if (this.app) this.$vuetify.application.bottom = 0
  },

  methods: {
    updateApplication () {
      if (!this.app) return

      this.$vuetify.application.bottom = this.fixed
        ? this.$el && this.$el.clientHeight
        : 0
    }
  },

  mounted () {
    this.updateApplication()
  },

  render (h) {
    this.updateApplication()

    const data = {
      staticClass: 'footer',
      'class': this._computedClasses,
      style: {
        paddingLeft: `${this.paddingLeft}px`,
        paddingRight: `${this.paddingRight}px`
      }
    }

    return h('footer', data, this.$slots.default)
  }
}

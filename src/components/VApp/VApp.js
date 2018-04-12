import '../../stylus/components/_app.styl'

// Directives
import Resize from '../../directives/resize'

export default {
  name: 'v-app',

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
        [`theme--${this.dark ? 'dark' : 'light'}`]: true
      }
    }
  },

  // TODO: Deprecate
  mounted () {
    this.$vuetify.dark = this.dark
  },

  // TODO: Deprecate
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
      domProps: { id: this.id }
    }

    const wrapper = h('div', { staticClass: 'application--wrap' }, this.$slots.default)

    return h('div', data, [wrapper])
  }
}

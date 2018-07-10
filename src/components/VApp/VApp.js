import '../../stylus/components/_app.styl'

// Component level mixins
import AppTheme from './mixins/app-theme'

// Directives
import Resize from '../../directives/resize'

/* @vue/component */
export default {
  name: 'v-app',

  directives: {
    Resize
  },

  mixins: [
    AppTheme
  ],

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
        [`theme--${this.dark ? 'dark' : 'light'}`]: true,
        'application--is-rtl': this.$vuetify.rtl
      }
    }
  },

  watch: {
    dark () {
      this.$vuetify.dark = this.dark
    }
  },

  mounted () {
    this.$vuetify.dark = this.dark
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

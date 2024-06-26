// Styles
import './VApp.sass'

// Mixins
import Themeable from '../../mixins/themeable'

// Utilities
import mixins from '../../util/mixins'
import { getSlot } from '../../util/helpers'

/* @vue/component */
export default mixins(
  Themeable
).extend({
  name: 'v-app',

  props: {
    dark: {
      type: Boolean,
      default: undefined,
    },
    id: {
      type: String,
      default: 'app',
    },
    light: {
      type: Boolean,
      default: undefined,
    },
  },

  computed: {
    isDark (): boolean {
      return this.$vuetify.theme.dark
    },
  },

  beforeCreate () {
    if (!this.$vuetify || (this.$vuetify === this.$root as any)) {
      throw new Error('Vuetify is not properly initialized, see https://v2.vuetifyjs.com/getting-started/quick-start#bootstrapping-the-vuetify-object')
    }
  },

  render (h) {
    const wrapper = h('div', { staticClass: 'v-application--wrap' }, getSlot(this))

    return h('div', {
      staticClass: 'v-application',
      class: {
        'v-application--is-rtl': this.$vuetify.rtl,
        'v-application--is-ltr': !this.$vuetify.rtl,
        ...this.themeClasses,
      },
      attrs: { 'data-app': true },
      domProps: { id: this.id },
    }, [wrapper])
  },
})

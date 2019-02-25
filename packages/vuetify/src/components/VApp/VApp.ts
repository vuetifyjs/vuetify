// Styles
import '../../stylus/components/_app.styl'

// Mixins
import Themeable from '../../mixins/themeable'

// Utilities
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(
  Themeable
).extend({
  name: 'v-app',

  props: {
    dark: {
      type: Boolean,
      default: undefined
    },
    id: {
      type: String,
      default: 'app'
    },
    light: {
      type: Boolean,
      default: undefined
    }
  },

  computed: {
    isDark () {
      if (this.dark != null || this.light != null) {
        return Themeable.options.computed.isDark.call(this)
      }

      return this.$vuetify.theme.dark
    }
  },

  render (h) {
    const wrapper = h('div', { staticClass: 'application--wrap' }, this.$slots.default)

    return h('div', {
      staticClass: 'application',
      class: {
        'application--is-rtl': this.$vuetify.rtl,
        ...this.themeClasses
      },
      attrs: { 'data-app': true },
      domProps: { id: this.id }
    }, [wrapper])
  }
})

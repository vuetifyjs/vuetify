// Styles
import '../../stylus/components/_app.styl'

// Mixins
import Themeable from '../../mixins/themeable'

/* @vue/component */
export default {
  name: 'v-app',

  mixins: [Themeable],

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
    classes () {
      return {
        'application--is-rtl': this.$vuetify.rtl,
        ...this.themeClasses
      }
    },
    isDark () {
      if (this.dark != null || this.light != null) {
        return Themeable.options.computed.isDark.call(this)
      }

      return this.$vuetify.theme.dark
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

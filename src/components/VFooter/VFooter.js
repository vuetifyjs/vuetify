// Styles
import '../../stylus/components/_footer.styl'

// Mixins
import Applicationable from '../../mixins/applicationable'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

/* @vue/component */
export default {
  name: 'v-footer',

  mixins: [
    Applicationable('footer', [
      'height'
    ]),
    Colorable,
    Themeable
  ],

  props: {
    height: {
      default: 32,
      type: [Number, String]
    },
    inset: Boolean
  },

  computed: {
    computedMarginBottom () {
      if (!this.app) return

      return this.$vuetify.application.bottom
    },
    computedPaddingLeft () {
      return !this.app || !this.inset
        ? 0
        : this.$vuetify.application.left
    },
    computedPaddingRight () {
      return !this.app
        ? 0
        : this.$vuetify.application.right
    },
    styles () {
      const styles = {
        height: isNaN(this.height) ? this.height : `${this.height}px`
      }

      if (this.computedPaddingLeft) {
        styles.paddingLeft = `${this.computedPaddingLeft}px`
      }

      if (this.computedPaddingRight) {
        styles.paddingRight = `${this.computedPaddingRight}px`
      }

      if (this.computedMarginBottom) {
        styles.marginBottom = `${this.computedMarginBottom}px`
      }

      return styles
    }
  },

  methods: {
    /**
     * Update the application layout
     *
     * @return {number}
     */
    updateApplication () {
      const height = parseInt(this.height)

      return isNaN(height)
        ? this.$el ? this.$el.clientHeight : 0
        : height
    }
  },

  render (h) {
    const data = {
      staticClass: 'v-footer',
      'class': this.addBackgroundColorClassChecks({
        'v-footer--absolute': this.absolute,
        'v-footer--fixed': !this.absolute && (this.app || this.fixed),
        'v-footer--inset': this.inset,
        'theme--dark': this.dark,
        'theme--light': this.light
      }),
      style: this.styles,
      ref: 'content'
    }

    return h('footer', data, this.$slots.default)
  }
}

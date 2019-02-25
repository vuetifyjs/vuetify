// Styles
import '../../stylus/components/_footer.styl'

// Mixins
import Applicationable from '../../mixins/applicationable'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Utilities
import mixins from '../../util/mixins'

// TYpes
import { VNode } from 'vue/types/vnode'

/* @vue/component */
export default mixins(
  Applicationable('footer', [
    'height',
    'inset'
  ]),
  Colorable,
  Themeable
).extend({
  name: 'v-footer',

  props: {
    height: {
      default: 32,
      type: [Number, String]
    },
    inset: Boolean
  },

  computed: {
    applicationProperty (): string {
      return this.inset ? 'insetFooter' : 'footer'
    },
    computedMarginBottom (): number {
      if (!this.app) return 0

      return this.$vuetify.application.bottom
    },
    computedPaddingLeft (): number {
      return !this.app || !this.inset
        ? 0
        : this.$vuetify.application.left
    },
    computedPaddingRight (): number {
      return !this.app || !this.inset
        ? 0
        : this.$vuetify.application.right
    },
    styles (): object {
      const styles: Record<string, string | number> = {
        height: isNaN(parseInt(this.height)) ? this.height : `${this.height}px`
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

  render (h): VNode {
    const data = this.setBackgroundColor(this.color, {
      staticClass: 'v-footer',
      'class': {
        'v-footer--absolute': this.absolute,
        'v-footer--fixed': !this.absolute && (this.app || this.fixed),
        'v-footer--inset': this.inset,
        ...this.themeClasses
      },
      style: this.styles,
      ref: 'content'
    })

    return h('footer', data, this.$slots.default)
  }
})

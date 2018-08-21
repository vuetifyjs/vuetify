// Mixins
import Colorable from '../../mixins/colorable'
import Routable from '../../mixins/routable'
import Toggleable from '../../mixins/toggleable'
import Themeable from '../../mixins/themeable'

// Directives
import Ripple from '../../directives/ripple'

/* @vue/component */
export default {
  name: 'v-list-tile',

  directives: {
    Ripple
  },

  mixins: [
    Colorable,
    Routable,
    Toggleable,
    Themeable
  ],

  inheritAttrs: false,

  props: {
    activeClass: {
      type: String,
      default: 'primary--text'
    },
    avatar: Boolean,
    inactive: Boolean,
    tag: String,
    threeLine: Boolean,
    twoLine: Boolean
  },

  data: () => ({
    proxyClass: 'v-list__item--active'
  }),

  computed: {
    classes () {
      return {
        'v-list__item': true,
        'v-list__item--link': this.isLink && !this.inactive,
        'v-list__item--avatar': this.avatar,
        'v-list__item--disabled': this.disabled,
        'v-list__item--active': !this.to && this.isActive,
        'v-list__item--three-line': this.threeLine,
        'v-list__item--two-line': this.twoLine,
        ...this.themeClasses,
        [this.activeClass]: this.isActive
      }
    },
    isLink () {
      return this.href || this.to ||
        (this.$listeners && (this.$listeners.click || this.$listeners['!click']))
    }
  },

  render (h) {
    const isRouteLink = !this.inactive && this.isLink
    const { tag, data } = isRouteLink ? this.generateRouteLink(this.classes) : {
      tag: this.tag || 'div',
      data: {
        class: this.classes
      }
    }

    data.attrs = Object.assign({}, data.attrs, this.$attrs)
    data.attrs.disabled = this.disabled

    return h(tag, this.setBackgroundColor(this.color, data), this.$slots.default)
  }
}

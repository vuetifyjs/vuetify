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
    tag: String
  },

  data: () => ({
    proxyClass: 'v-list__tile--active'
  }),

  computed: {
    listClasses () {
      return this.disabled
        ? { 'v-list--disabled': true }
        : undefined
    },
    classes () {
      return {
        'v-list__tile': true,
        'v-list__tile--link': this.isLink && !this.inactive,
        'v-list__tile--avatar': this.avatar,
        'v-list__tile--disabled': this.disabled,
        'v-list__tile--active': !this.to && this.isActive,
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

    return h('div', this.setTextColor(!this.disabled && this.color, {
      class: this.listClasses,
      attrs: {
        disabled: this.disabled,
        role: 'listitem'
      }
    }), [h(tag, data, this.$slots.default)])
  }
}

// Mixins
import Colorable from '../../mixins/colorable'
import Routable from '../../mixins/routable'
import Toggleable from '../../mixins/toggleable'

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
    Toggleable
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
        ? 'v-list--disabled'
        : this.color
          ? this.addTextColorClassChecks()
          : this.defaultColor
    },
    classes () {
      return {
        'v-list__tile': true,
        'v-list__tile--link': this.isLink && !this.inactive,
        'v-list__tile--avatar': this.avatar,
        'v-list__tile--disabled': this.disabled,
        'v-list__tile--active': !this.to && this.isActive,
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
    const { tag, data } = isRouteLink ? this.generateRouteLink() : {
      tag: this.tag || 'div',
      data: {
        class: this.classes
      }
    }

    data.attrs = Object.assign({}, data.attrs, this.$attrs)

    return h('div', {
      'class': this.listClasses,
      attrs: {
        disabled: this.disabled
      },
      on: {
        ...this.$listeners
      }
    }, [h(tag, data, this.$slots.default)])
  }
}

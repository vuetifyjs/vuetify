// Mixins
import Colorable from '../../mixins/colorable'
import Routable from '../../mixins/routable'
import Toggleable from '../../mixins/toggleable'

// Directives
import Ripple from '../../directives/ripple'

export default {
  name: 'v-list-tile',

  mixins: [
    Colorable,
    Routable,
    Toggleable
  ],

  directives: {
    Ripple
  },

  inheritAttrs: false,

  data: () => ({
    proxyClass: 'v-list__tile--active'
  }),

  props: {
    activeClass: {
      type: String,
      default: 'primary--text'
    },
    avatar: Boolean,
    inactive: Boolean,
    tag: String
  },

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

    const setColor = this.disabled ? (c, v) => v : this.setTextColor
    return h('div', setColor(this.color, {
      'class': this.listClasses,
      attrs: {
        disabled: this.disabled
      },
      on: {
        ...this.$listeners
      }
    }), [h(tag, data, this.$slots.default)])
  }
}

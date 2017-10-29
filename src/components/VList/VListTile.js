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
    proxyClass: 'list__tile--active'
  }),

  props: {
    activeClass: {
      type: String,
      default: 'primary--light--text'
    },
    avatar: Boolean,
    inactive: Boolean,
    tag: String
  },

  computed: {
    classes () {
      return {
        'list__tile': true,
        'list__tile--link': this.isLink && !this.inactive,
        'list__tile--avatar': this.avatar,
        'list__tile--disabled': this.disabled,
        'list__tile--active': !this.to && this.isActive,
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
      data: {}
    }

    data.class = this._computedClasses
    data.attrs = Object.assign({}, data.attrs, this.$attrs)

    return h('li', {
      attrs: {
        disabled: this.disabled
      },
      on: {
        ...this.$listeners
      }
    }, [h(tag, data, this.$slots.default)])
  }
}

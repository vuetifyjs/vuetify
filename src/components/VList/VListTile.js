import Routable from '../../mixins/routable'
import Toggleable from '../../mixins/toggleable'
import Ripple from '../../directives/ripple'

export default {
  name: 'v-list-tile',

  mixins: [Routable, Toggleable],

  directives: {
    Ripple
  },

  inheritAttrs: false,

  props: {
    activeClass: {
      type: String,
      default: 'list__tile--active'
    },
    active: {
      type: Boolean,
      default: true
    },
    avatar: Boolean,
    tag: String
  },

  computed: {
    classes () {
      return {
        'list__tile': true,
        'list__tile--link': this.isLink && this.active,
        'list__tile--avatar': this.avatar,
        'list__tile--disabled': this.disabled,
        [this.activeClass]: this.isActive
      }
    },
    isLink () {
      return this.href || this.to ||
        (this.$listeners && (this.$listeners.click || this.$listeners['!click']))
    }
  },

  render (h) {
    const isRouteLink = this.active && (this.href || this.to || this.$listeners.click)
    const { tag, data } = isRouteLink ? this.generateRouteLink() : {
      tag: this.tag || 'div',
      data: {
        class: this.classes
      }
    }

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

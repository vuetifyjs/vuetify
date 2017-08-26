import GenerateRouteLink from '../../mixins/route-link'
import Toggleable from '../../mixins/toggleable'
import Ripple from '../../directives/ripple'

export default {
  name: 'v-list-tile',

  mixins: [GenerateRouteLink, Toggleable],

  directives: {
    Ripple
  },

  inheritAttrs: false,

  props: {
    activeClass: {
      type: String,
      default: 'list__tile--active'
    },
    avatar: Boolean,
    tag: String
  },

  computed: {
    classes () {
      return {
        'list__tile': true,
        'list__tile--link': this.isLink,
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
    const { tag, data } = this.generateRouteLink()
    let newTag = tag

    data.attrs = Object.assign({}, data.attrs, this.$attrs)

    if (!this.href &&
      !this.to &&
      !this.tag
    ) newTag = 'div'

    return h('li', {
      attrs: {
        disabled: this.disabled
      },
      on: {
        ...this.$listeners
      }
    }, [h(newTag, data, this.$slots.default)])
  }
}

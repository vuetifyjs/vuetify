import GenerateRouteLink from '../../mixins/route-link'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'list-tile',

  mixins: [GenerateRouteLink, Toggleable],

  props: {
    activeClass: {
      type: String,
      default: 'list__tile--active'
    },
    avatar: Boolean
  },

  computed: {
    classes () {
      return {
        'list__tile': true,
        'list__tile--active': this.isActive,
        'list__tile--avatar': this.avatar,
        'list__tile--disabled': this.disabled
      }
    }
  },

  render (h) {
    const { tag, data } = this.generateRouteLink()

    return h(tag, data, [this.$slots.default])
  }
}

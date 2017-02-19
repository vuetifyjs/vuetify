import { closestParentTag } from '../../util/helpers'
import GenerateRouteLink from '../../mixins/route-link'

export default {
  name: 'list-tile',

  mixins: [GenerateRouteLink],

  data () {
    return {
      active: false
    }
  },

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
        'list__tile--avatar': this.avatar,
        'list__tile--disabled': this.disabled
      }
    },

    listUID () {
      return closestParentTag.call(this, 'v-list')
    }
  },

  methods: {
    click () {
      //
    }
  },

  render (createElement) {
    const { tag, data } = this.generateRouteLink()

    return createElement(tag, data, [this.$slots.default])
  }
}

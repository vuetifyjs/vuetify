import GenerateRouteLink from '../../mixins/route-link'

export default {
  name: 'tab-item',

  mixins: [GenerateRouteLink],

  data () {
    return {
      isActive: false,
      defaultActiveClass: 'tab__item--active'
    }
  },

  props: {
    activeClass: {
      type: String,
      default: 'tab__item--active'
    }
  },

  computed: {
    classes () {
      return {
        'tab__item': true,
        'tab__item--active': this.isActive,
        'tab__item--disabled': this.disabled
      }
    }
  },
  render (h) {
    const { tag, data } = this.generateRouteLink()

    return h('li', {}, [h(tag, data, [this.$slots.default])])
  }
}

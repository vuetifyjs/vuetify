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
  inject:['tabs'],
  props: {
    activeClass: {
      type: String,
      default: 'tab__item--active'
    }
  },

  computed: {
      return {
        'tab__item': true,
        'tab__item--active': this.tabs.active==this.$el,
        'tab__item--disabled': this.disabled
      }
    }
  },
  render (h) {
    const { tag, data } = this.generateRouteLink()

    return h('li', {}, [h(tag, data, [this.$slots.default])])
  }
}

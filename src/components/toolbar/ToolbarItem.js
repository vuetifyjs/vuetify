import GenerateRouteLink from '../../mixins/route-link'

export default {
  name: 'toolbar-item',

  mixins: [GenerateRouteLink],

  props: {
    activeClass: {
      type: String,
      default: 'toolbar__item--active'
    }
  },

  computed: {
    classes () {
      return {
        'toolbar__item': true,
        'toolbar__item--disabled': this.disabled
      }
    }
  },

  render (h) {
    const { tag, data } = this.generateRouteLink()

    return h('li', {}, [h(tag, data, [this.$slots.default])])
  }
}

import GenerateRouteLink from '../../mixins/route-link'

export default {
  name: 'breadcrumbs-item',

  mixins: [GenerateRouteLink],

  inject: ['divider'],

  props: {
    activeClass: {
      type: String,
      default: 'breadcrumbs__item--active'
    }
  },

  computed: {
    classes () {
      return {
        'breadcrumbs__item': true,
        'breadcrumbs__item--disabled': this.disabled
      }
    }
  },

  render (h) {
    const { tag, data } = this.generateRouteLink()

    return h('li', {
      attrs: { 'data-divider': this.divider }
    }, [
      h(tag, data, this.$slots.default)
    ])
  }
}

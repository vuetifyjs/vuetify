import GenerateRouteLink from '~mixins/route-link'

export default {
  name: 'v-breadcrumbs-item',

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
      const classes = {
        'breadcrumbs__item': true,
        [this.activeClass]: !this.disabled
      }

      return classes
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

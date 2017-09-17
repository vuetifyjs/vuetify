import Routable from '../../mixins/routable'

export default {
  name: 'v-breadcrumbs-item',

  mixins: [Routable],

  inject: ['divider'],

  props: {
    activeClass: {
      type: String,
      default: 'breadcrumbs__item--disabled'
    }
  },

  computed: {
    classes () {
      const classes = {
        'breadcrumbs__item': true
      }

      classes[this.activeClass] = this.disabled

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

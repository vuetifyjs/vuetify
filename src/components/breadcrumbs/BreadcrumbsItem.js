export default {
  name: 'breadcrumbs-item',

  inject: ['divider'],

  props: {
    disabled: Boolean,
    href: {
      type: String,
      default: 'javascript:;'
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
    return h('li', {
      attrs: { 'data-divider': this.divider }
    }, [
      h('a', {
        'class': this.classes,
        domProps: { href: this.href }
      }, this.$slots.default)
    ])
  }
}

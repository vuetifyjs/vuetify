export default {
  name: 'breadcrumbs-item',

  props: {
    disabled: Boolean,
    href: {
      type: String,
      default: 'javascript:;'
    },
    target: String
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
    return h('li', {}, [
      h('a', {
        'class': this.classes,
        domProps: {
          href: this.href,
          target: this.target
        }
      }, this.$slots.default)
    ])
  }
}

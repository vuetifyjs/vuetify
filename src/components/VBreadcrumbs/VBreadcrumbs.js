require('../../stylus/components/_breadcrumbs.styl')

export default {
  name: 'v-breadcrumbs',

  provide () {
    return {
      divider: this.divider
    }
  },

  props: {
    divider: {
      type: String,
      default: '/'
    },
    icons: Boolean
  },

  computed: {
    classes () {
      return {
        'breadcrumbs': true,
        'breadcrumbs--with-icons': this.icons
      }
    }
  },

  render (h) {
    return h('ul', {
      'class': this.classes,
      props: { items: this.items }
    }, this.$slots.default)
  }
}

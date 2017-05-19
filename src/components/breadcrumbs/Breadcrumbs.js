export default {
  name: 'breadcrumbs',

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

  mounted () {
    this.$vuetify.load(this.init)
  },

  methods: {
    init () {
      this.$children.forEach(i => (i.$el.dataset.divider = this.divider))
    }
  },

  render (h) {
    return h('ul', {
      'class': this.classes,
      props: { items: this.items }
    }, this.$slots.default)
  }
}

export default {
  name: 'v-expansion-panel',

  props: {
    expand: Boolean
  },

  computed: {
    params () {
      return {
        expand: this.expand
      }
    }
  },

  render (h) {
    return h('ul', {
      'class': 'expansion-panel'
    }, this.$slots.default)
  }
}

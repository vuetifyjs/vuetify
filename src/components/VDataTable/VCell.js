export default {
  name: 'v-cell',
  props: {
    head: {
      type: Boolean
    }
  },
  render (h) {
    return h('div', {
      staticClass: this.head ? 'v-head' : 'v-cell'
    }, this.$slots.default)
  }
}

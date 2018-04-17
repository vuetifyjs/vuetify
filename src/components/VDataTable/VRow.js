export default {
  name: 'v-row',
  render (h) {
    return h('div', {
      staticClass: 'tr'
    }, this.$slots.default)
  }
}

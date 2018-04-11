export default {
  name: 'v-row',
  render (h) {
    return h('div', {
      staticClass: 'v-row'
    }, this.$slots.default)
  }
}

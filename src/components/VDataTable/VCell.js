export default {
  name: 'v-cell',
  render (h) {
    return h('div', {
      staticClass: 'v-cell'
    }, this.$slots.default)
  }
}

export default {
  name: 'v-row',
  inject: ['dataTable'],
  render (h) {
    const cells = this.$slots.default ? this.$slots.default.filter(e => !!e.tag) : []

    const widths = this.dataTable.widths
    const isFlexWidth = this.dataTable.isFlexWidth
    cells.forEach((c, i) => {
      if (!widths[i]) return

      if (isFlexWidth) {
        c.data.style = `flex-grow: ${widths[i]}`
      } else {
        c.data.style = `flex: none; width: ${widths[i]}`
      }
    })

    return h('div', {
      staticClass: 'v-row'
    }, cells)
  }
}

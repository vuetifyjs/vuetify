export default {
  name: 'v-row',
  inject: ['dataTable'],
  render (h) {
    const content = this.$slots.default ? this.$slots.default : []
    const widths = this.dataTable.widths
    const isFlexWidth = this.dataTable.isFlexWidth

    content.forEach((c, i) => {
      if (!c.fnOptions || !c.fnOptions.name === 'v-cell' || !widths[i]) return

      if (isFlexWidth) {
        c.data.style = `flex-grow: ${widths[i]}`
      } else {
        c.data.style = `flex: none; width: ${widths[i]}`
      }
    })

    return h('div', {
      staticClass: 'v-row'
    }, content)
  }
}

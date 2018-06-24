export default {
  methods: {
    genTProgress () {
      const col = this.$createElement('th', {
        staticClass: 'column',
        attrs: {
          colspan: this.headerColumns + (this.fixedHeaderEnabled && this.scrollbarWidth > 0)
        }
      }, [this.genProgress()])

      return this.genTR([col], {
        staticClass: 'v-datatable__progress'
      })
    }
  }
}

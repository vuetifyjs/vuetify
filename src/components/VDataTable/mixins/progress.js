export default {
  methods: {
    genTProgress () {
      const col = this.$createElement('th', {
        staticClass: 'column',
        attrs: {
          colspan: this.headerColumns
        }
      }, [this.genProgress()])

      return this.genTR([col], {
        staticClass: 'datatable__progress'
      })
    }
  }
}

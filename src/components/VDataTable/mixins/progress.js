export default {
  methods: {
    genTProgress (headersLength) {
      const col = this.$createElement('th', {
        staticClass: 'column',
        attrs: {
          colspan: this.headers.length
        }
      }, [this.genProgress()])

      return this.genTR([col], {
        staticClass: 'datatable__progress'
      })
    }
  }
}

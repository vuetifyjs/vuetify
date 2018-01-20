export default {
  methods: {
    genTProgress (headersLength) {
      const col = this.$createElement('th', {
        staticClass: 'column',
        attrs: {
          colspan: headersLength
        }
      }, [this.genProgress()])

      return this.genTR([col], {
        staticClass: 'datatable__progress'
      })
    }
  }
}

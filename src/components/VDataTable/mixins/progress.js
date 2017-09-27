export default {
  methods: {
    genTProgress () {
      const col = this.$createElement('th', {
        staticClass: 'column',
        attrs: {
          colspan: '100%'
        }
      }, [this.genProgress()])

      return this.$createElement('thead', {
        staticClass: 'datatable__progress'
      }, [this.genTR([col])])
    }
  }
}

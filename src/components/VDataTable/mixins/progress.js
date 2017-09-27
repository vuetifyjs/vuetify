export default {
  methods: {
    genTProgress () {
      const progress = this.genProgress()
      const col = this.$createElement('th', {
        staticClass: 'column',
        attrs: {
          colspan: '100%'
        }
      }, progress ? [progress] : null)

      return this.$createElement('thead', {
        staticClass: 'datatable__progress'
      }, [this.genTR([col])])
    }
  }
}

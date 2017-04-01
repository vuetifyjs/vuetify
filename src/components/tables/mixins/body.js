export default {
  methods: {
    genTBody () {
      return this.$createElement('tbody', this.filteredItems.map(item => {
        return this.genTR(this.$scopedSlots.items({ item }), {
          attrs: {
            active: item[this.itemValue]
          }
        })
      }))
    }
  }
}

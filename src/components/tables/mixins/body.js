export default {
  methods: {
    genTBody () {
      return this.$createElement('tbody', this.filteredItems.map(item => this.$scopedSlots.items({ item })))
    }
  }
}

export default {
  methods: {
    genTBody () {
      let children = []

      if (!this.itemsLength) {
        children = [this.genEmptyBody(this.noDataText)]
      } else if (!this.filteredItems.length) {
        children = [this.genEmptyBody(this.noResultsText)]
      } else {
        children = this.filteredItems.map(item => {
          console.log(this.options.checked[item[this.options.checkedValue]])
          return this.genTR(this.$scopedSlots.items({ item, checked: this.options.checked[item[this.options.checkedValue]] }), {
            attrs: { active: this.isChecked(item) }
          })
        })
      }

      return this.$createElement('tbody', children)
    },
    genEmptyBody (text) {
      return this.genTR([this.$createElement('td', {
        'class': 'text-xs-center',
        attrs: { colspan: '100%' }
      }, text)])
    }
  }
}

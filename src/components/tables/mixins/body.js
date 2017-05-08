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
          if (!(item.id in this.options.checked))
            this.$set(this.options.checked, item.id, false)

          const props = { item }

          Object.defineProperty(props, 'checked', {
            get: () => this.options.checked[item[this.options.checkedValue]],
            set: _ => this.options.checked[item[this.options.checkedValue]] = _
          })

          return this.genTR(this.$scopedSlots.items(props), {
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

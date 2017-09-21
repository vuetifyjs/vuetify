export default {
  methods: {
    genTBody () {
      const children = []

      if (!this.itemsLength) {
        children.push(this.genEmptyBody(this.noDataText))
      } else if (!this.filteredItems.length) {
        children.push(this.genEmptyBody(this.noResultsText))
      } else {
        children.push(this.genFilteredItems())
      }

      return this.$createElement('tbody', children)
    },
    genFilteredItems () {
      return this.filteredItems.map((item, index) => {
        const props = { item, index }
        const key = this.selectedKey

        Object.defineProperty(props, 'selected', {
          get: () => this.selected[item[this.selectedKey]],
          set: (value) => {
            let selected = this.value.slice()
            if (value) selected.push(item)
            else selected = selected.filter(i => i[key] !== item[key])

            this.$emit('input', selected)
          }
        })

        const row = this.$scopedSlots.items(props)

        return this.needsTR(row)
          ? this.genTR(row, {
            attrs: { active: this.isSelected(item) }
          })
          : row
      })
    },
    genEmptyBody (text) {
      return this.genTR([this.$createElement('td', {
        'class': 'text-xs-center',
        attrs: { colspan: '100%' }
      }, text)])
    }
  }
}

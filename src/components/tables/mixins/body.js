export default {
  methods: {
    genTBody () {
      let children = []

      if (!this.itemsLength) {
        children = [this.genEmptyBody(this.noDataText)]
      } else if (!this.filteredItems.length) {
        children = [this.genEmptyBody(this.noResultsText)]
      } else {
        children = this.filteredItems.map((item, index) => {
          const props = { item, index }
          const key = this.selectedKey

          Object.defineProperty(props, 'selected', {
            get: () => this.selected[item[this.selectedKey]],
            set: (value) => {
              let selected = this.value.slice()
              if (value) {
                selected.push(item)
              } else {
                selected = selected.filter(i => i[key] !== item[key])
              }
              this.$emit('input', selected)
            }
          })

          const row = this.$scopedSlots.items(props)

          if (row.length && row[0].tag === 'td') {
            return this.genTR(row, { attrs: { active: this.isSelected(item) } })
          } else {
            return row
          }
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

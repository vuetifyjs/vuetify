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
          const props = { item }

          if (this.selected) {
            Object.defineProperty(props, 'selected', {
              get: () => !!this.selected.find(i => i[this.selectedKey] === item[this.selectedKey]),
              set: (value) => {
                let selected = this.selected.slice()

                value && selected.push(item) || (selected = selected.filter(i => i[this.selectedKey] !== item[this.selectedKey]))

                this.$emit('update:selected', selected)
              }
            })
          }

          return this.genTR(this.$scopedSlots.items(props), {
            attrs: { active: this.isSelected(item) }
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

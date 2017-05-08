import Vue from 'vue'

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
            Vue.set(this.options.checked, item.id, false)

          const props = {
            item,
            checked: this.options.checked,
          }

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

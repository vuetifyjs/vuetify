export default {
  props: {
    filter: {
      type: Function,
      default: (item, query, itemText) => {
        const text = [undefined, null].includes(itemText) ? '' : itemText

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      }
    }
  },

  methods: {
    filterSearch () {
      return this.items.filter(i => this.filter(
        i, this.searchValue, this.getText(i))
      )
    },
    onKeyDown (e) {
      this.$refs.menu.changeListIndex(e)
    }
  }
}

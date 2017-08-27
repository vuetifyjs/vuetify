export default {
  props: {
    filter: {
      type: Function,
      default: (item, queryText, itemText) => {
        const hasValue = val => [undefined, null].includes(val)

        const text = hasValue(itemText) ? '' : itemText
        const query = hasValue(queryText) ? '' : queryText

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      }
    }
  },

  methods: {
    filterSearch () {
      return this.computedItems.filter(i => this.filter(
        i, this.searchValue, this.getText(i))
      )
    },
    onKeyDown (e) {
      this.$refs.menu.changeListIndex(e)
    }
  }
}

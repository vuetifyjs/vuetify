export default {
  props: {
    filter: {
      type: Function,
      default: () => (item, query, itemText) => (
        typeof itemText === 'string' &&
        itemText.toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
    }
  },
  data () {
    return {
      searchValue: null
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

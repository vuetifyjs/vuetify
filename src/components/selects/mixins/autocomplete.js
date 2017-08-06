export default {
  props: {
    filter: {
      type: Function,
      default: () => (item, query, itemText) => typeof itemText === 'string' && itemText.toLowerCase().indexOf(query) !== -1
    }
  },
  data () {
    return {
      searchValue: null
    }
  },

  methods: {
    filterSearch () {
      const query = this.searchValue.toLowerCase()
      return this.items.filter(i => this.filter(i, query, this.getText(i)))
    },
    onKeyDown (e) {
      this.$refs.menu.changeListIndex(e)
    }
  }
}

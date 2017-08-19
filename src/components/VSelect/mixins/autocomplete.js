export default {
  methods: {
    filterSearch () {
      if (this.searchValue === null) return this.items

      return this.items.filter(i => {
        const text = this.getText(i)
        if (typeof text !== 'string') return false

        return text.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
      })
    },
    onKeyDown (e) {
      this.$refs.menu.changeListIndex(e)
    }
  }
}

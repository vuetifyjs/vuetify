export default {
  data () {
    return {
      searchValue: null
    }
  },

  methods: {
    filterSearch () {
      return this.items.filter(i => {
        const text = this.getText(i)
        if (typeof text === 'undefined') return false

        return text.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
      })
    }
  }
}

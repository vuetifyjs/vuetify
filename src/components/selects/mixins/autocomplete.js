export default {
  data () {
    return {
      searchValue: null
    }
  },

  methods: {
    filterSearch () {
      return this.items.filter(i => {
        return this.getText(i).toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
      })
    }
  }
}
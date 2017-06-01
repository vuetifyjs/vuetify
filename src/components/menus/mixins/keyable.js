export default {
  data: () => ({
    listIndex: 0,
    isUsingKeys: false
  }),

  watch: {
    listIndex () {
      this.isUsingKeys = true
    }
  },

  methods: {
    changeListIndex (e) {
      if (e.keyCode === 40 && this.listIndex > 0) {
        e.preventDefault()
        this.listIndex--
      }
      if (e.keyCode === 38 && this.listIndex < this.tileLength - 1) {
        e.preventDefault()
        this.listIndex++
      }
      console.log(this.listIndex)
    }
  }
}

export default {
  data: () => ({
    listIndex: -1,
    isUsingKeys: false,
    tiles: []
  }),

  watch: {
    isActive (val) {
      if (!val) this.listIndex = -1
    },
    listIndex (next, prev) {
      // For infinite scroll, re-evaluate children
      next === this.tiles.length - 1 && this.getTiles()

      if (next !== -1) {
        this.tiles[next].classList.add('list__tile--highlighted')
        this.$refs.content.scrollTop = next * 48
      }

      prev !== -1 && this.tiles[prev].classList.remove('list__tile--highlighted')
    }
  },

  methods: {
    changeListIndex (e) {
      [40, 38, 13, 32].includes(e.keyCode) && e.preventDefault()

      if (this.listIndex === -1) this.setActiveListIndex()
      if ([27, 9].includes(e.keyCode)) this.isActive = false
      else if (e.keyCode === 40 && this.listIndex < this.tiles.length - 1) this.listIndex++
      else if (e.keyCode === 38 && this.listIndex > 0) this.listIndex--
      else if (e.keyCode === 13 && this.listIndex !== -1) this.tiles[this.listIndex].click()
      else if ([13, 32].includes(e.keyCode)) this.isActive = true
    },
    getTiles () {
      this.tiles = this.$refs.content.querySelectorAll('.list__tile')
    },
    setActiveListIndex () {
      this.tiles.forEach((t, i) => {
        if (t.classList.contains('list__tile--active')) {
          this.listIndex = i
          return
        }
      })
    }
  }
}

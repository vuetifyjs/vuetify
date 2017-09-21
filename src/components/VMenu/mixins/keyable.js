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
      // For infinite scroll and autocomplete, re-evaluate children
      this.getTiles()

      if (next in this.tiles) {
        this.tiles[next].classList.add('list__tile--highlighted')
        this.$refs.content.scrollTop = next * 48
      }

      prev in this.tiles &&
        this.tiles[prev].classList.remove('list__tile--highlighted')
    }
  },

  methods: {
    changeListIndex (e) {
      [40, 38, 13].includes(e.keyCode) && e.preventDefault()
      e.keyCode === 32 && !this.isActive && e.preventDefault()

      if ([27, 9].includes(e.keyCode)) return this.isActive = false
      else if (!this.isActive &&
        [13, 32].includes(e.keyCode) &&
        this.openOnClick
      ) {
        return this.isActive = true
      }

      if (e.keyCode === 40 && this.listIndex < this.tiles.length - 1) {
        this.listIndex++
      } else if (e.keyCode === 38 && this.listIndex > 0) {
        this.listIndex--
      } else if (e.keyCode === 13 && this.listIndex !== -1) {
        this.tiles[this.listIndex].click()
      }

      if (this.listIndex === -1) this.setActiveListIndex()
    },
    getTiles () {
      this.tiles = this.$refs.content.querySelectorAll('.list__tile')
    },
    setActiveListIndex () {
      const tiles = Array.from(this.tiles || [])
      tiles.forEach((t, i) => {
        if (t.classList.contains('list__tile--active')) {
          this.listIndex = i
          return
        }
      })
    }
  }
}

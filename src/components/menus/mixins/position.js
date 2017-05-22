export default {
  methods: {
    setDirection (direction) {
      const pos = this.dimensions.activator[direction]


    },
    sneakPeek (cb) {
      const el = this.$refs.content
      const currentDisplay = el.style.display

      el.style.display = 'inline-block'
      cb()
      el.style.display = currentDisplay
    },
    updateDimensions () {
      this.sneakPeek(() => {
        this.dimensions = {
          activator: this.measure(this.getActivator()),
          content: this.measure(this.$refs.content)
        }
      })

      const { activator: a, content: c } = this.dimensions
      let top = (this.top ? a.top - c.height : a.top) + this.window.pageYOffset
      const left = a.left

      this.position = {
        minWidth: a.width,
        top: !this.offsetY ? top : this.top ? top - a.height : top + a.height,
        left: !this.offsetX ? left : this.left ? left - a.width : left + a.width
      }
    }
  }
}

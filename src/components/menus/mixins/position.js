export default {
  methods: {
    setDirection (horiz = '', vert = '') {
      horiz = horiz || (this.left && !this.auto ? 'left' : 'right')
      vert = vert || (this.top && !this.auto ? 'top' : 'bottom')

      this.direction = { horiz, vert }
      this.position.top = vert === 'top' ? 'auto' : '0px'
      this.position.left = horiz === 'left' ? 'auto' : '0px'
      this.position.bottom = vert === 'bottom' ? 'auto' : '0px'
      this.position.right = horiz === 'right' ? 'auto' : '0px'
    },

    updatePosition () {
      this.$nextTick(() => {
        this.updateDimensions()

        const { offset, screenOverflow: screen } = this
        const { horiz, vert } = this.direction

        let left = horiz === 'left' ? 'auto' : offset.horiz - screen.horiz + this.nudgeLeft
        const top = vert === 'top' ? 'auto' : offset.vert - screen.vert + this.nudgeTop
        const right = horiz === 'right' ? 'auto' : -offset.horiz - screen.horiz + this.nudgeRight
        const bottom = vert === 'bottom' ? 'auto' : -offset.vert - screen.vert + this.nudgeBottom

        const leftSpace = left + this.dimensions.content.width
        if (leftSpace > this.window.innerWidth) {
          const diff = leftSpace - this.window.innerWidth
          left = left - diff - 16
        }

        this.position.left = left
        this.position.right = right
        this.position.top = top
        this.position.bottom = bottom

        const noMoreFlipping = this.flip() === false

        if (noMoreFlipping) this.startTransition()
      })
    },

    updateDimensions () {
      const a = this.getActivator()
      const c = this.$refs.content

      this.sneakPeek(c, () => {
        this.updateMaxMin()

        this.dimensions = {
          activator: this.measure(a),
          content: this.measure(c),
          list: this.measure(c, '.list'),
          selected: this.auto ? this.measure(c, '.list__tile--active', 'parent') : null
        }

        this.updateScroll()
      })
    },

    updateMaxMin () {
      const { maxHeight, maxHeightAutoDefault: maxAuto, offsetAuto, auto } = this
      const a = this.getActivator()
      const c = this.$refs.content
      const widthAdjust = this.nudgeWidth + Math.abs(offsetAuto.horiz) * 2

      if (!this.activatorXY) {
        c.style.minWidth = `${a.getBoundingClientRect().width + widthAdjust}px`
      }
      c.style.maxHeight = null  // <-- Todo: Investigate why this fixes rendering.
      c.style.maxHeight = isNaN(maxHeight) ? maxHeight : `${maxHeight}px`
      c.style.maxHeight = maxHeight === null && auto ? maxAuto : c.style.maxHeight
    },

    updateScroll () {
      if (!this.auto || !this.dimensions.selected) return

      const { content: c, selected: s, list: l } = this.dimensions
      const scrollMiddle = (c.height - s.height) / 2
      const scrollMax = l.height - c.height
      let offsetTop = s.offsetTop - scrollMiddle

      offsetTop = this.screenOverflow.vert && offsetTop > scrollMax ? scrollMax : offsetTop
      offsetTop = this.screenOverflow.vert && offsetTop < 0 ? 0 : offsetTop
      offsetTop -= this.screenOverflow.vert

      this.$refs.content.scrollTop = offsetTop
    },

    flip () {
      const { auto, screenDist } = this
      const { content: c } = this.dimensions
      const { horiz, vert } = this.direction
      const flipHoriz = !auto && c.width > screenDist[horiz] ? screenDist.horizMaxDir : horiz
      const flipVert = !auto && c.height > screenDist[vert] ? screenDist.vertMaxDir : vert
      const doFlip = flipHoriz !== horiz || flipVert !== vert

      if (doFlip) {
        this.setDirection(flipHoriz, flipVert)
        this.updatePosition()
      }

      return doFlip
    }
  }
}

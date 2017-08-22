export default {
  methods: {
    wheelScroll (e) {
      e.preventDefault()

      let year = this.tableYear

      if (e.deltaY < 0) year++
      else year--

      this.tableDate = new Date(year, 0)
    },
    touch (value) {
      this.tableDate = new Date(this.tableYear + value, 0)
    },
    genTouch () {
      return {
        name: 'touch',
        value: {
          left: e => (e.offsetX < -15) && this.touch(1),
          right: e => (e.offsetX > 15) && this.touch(-1)
        }
      }
    },
    genTable () {
      return this.$createElement('div', {
        staticClass: 'picker--date__table',
        on: this.scrollable ? { wheel: this.wheelScroll } : undefined,
        directives: [this.genTouch()]
      }, [
        this.$createElement('transition', {
          props: { name: this.computedTransition }
        }, [
          this.$createElement('table', {
            key: this.tableYear
          }, [
            this.genTBody()
          ])
        ])
      ])
    },
    genTD (month) {
      const date = new Date(this.tableYear, month, 1, 12, 0, 0, 0)
      const monthName = date.toLocaleString(this.locale, { month: 'short' })
      return this.$createElement('td', [
        this.$createElement('button', {
          'class': {
            'btn': true,
            'btn--raised': this.isActive(month),
            'btn--flat': !this.isActive(month),
            'btn--active': this.isActive(month),
            'btn--current': this.isCurrent(month),
            'btn--light': this.dark,
            'btn--disabled': !this.isAllowed(date)
          },
          attrs: {
            type: 'button'
          },
          domProps: {
            innerHTML: `<span class="btn__content">${monthName}</span>`
          },
          on: {
            click: () => {
              const tableYear = this.tableYear
              const monthStr = month < 9 ? `0${month + 1}` : (month + 1)

              this.inputDate = `${tableYear}-${monthStr}-01T12:00:00`
              this.$nextTick(() => (this.autosave && this.save()))
            }
          }
        })
      ])
    },
    genTBody () {
      const children = []
      const cols = Array(3).fill(null)
      const rows = 12 / cols.length

      for (let row = 0; row < rows; row++) {
        children.push(this.$createElement('tr', cols.map((_, col) => {
          return this.genTD(row * cols.length + col)
        })))
      }

      return this.$createElement('tbody', children)
    },
    isActive (i) {
      return this.tableYear === this.year &&
        this.month === i
    },
    isCurrent (i) {
      return this.currentYear === this.tableYear &&
        this.currentMonth === i
    }
  }
}

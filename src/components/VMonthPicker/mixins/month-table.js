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
      this.tableDate = new Date(this.tableYear, 0)
    },
    genTable () {
      const children = []
      const data = {
        'class': 'picker--date__table',
        directives: [
          {
            name: 'touch',
            value: {
              left: (e) => (e.offsetX < -15) && this.touch(1),
              right: (e) => (e.offsetX > 15) && this.touch(-1)
            }
          }
        ]
      }

      if (this.scrollable) {
        data.on = { wheel: this.wheelScroll }
      }

      children.push(this.$createElement('table', {
        key: this.tableYear
      }, [this.genTBody()]))

      return this.$createElement('div', data, [
        this.$createElement('transition', {
          props: { name: this.computedTransition }
        }, children)
      ])
    },
    genTBody () {
      const children = []
      const cols = 3

      for (let row = 0; row < 12 / cols; row++) {
        const rows = []
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col
          const date = new Date(this.tableYear, i, 1, 12, 0, 0, 0)
          const month = date.toLocaleString(this.locale, { month: 'short' })
          rows.push(this.$createElement('td', [
            this.$createElement('button', {
              'class': {
                'btn btn--small btn--flat': true,
                'btn--active': this.isActive(i),
                'btn--current': this.isCurrent(i),
                'btn--light': this.dark,
                'btn--disabled': !this.isAllowed(date)
              },
              attrs: {
                type: 'button'
              },
              domProps: {
                innerHTML: `<span class="btn__content">${month}</span>`
              },
              on: {
                click: () => {
                  const tableYear = this.tableYear
                  let month = i + 1
                  month = month < 10 ? `0${month}` : (month)

                  this.inputDate = `${tableYear}-${month}-01T12:00:00`
                  this.$nextTick(() => (this.autosave && this.save()))
                }
              }
            })
          ]))
        }
        children.push(this.genTR(rows))
      }

      return this.$createElement('tbody', children)
    },
    genTR (children = [], data = {}) {
      return [this.$createElement('tr', data, children)]
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

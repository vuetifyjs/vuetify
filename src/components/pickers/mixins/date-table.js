export default {
  methods: {
    genTable () {
      const children = []

      children.push(this.$createElement('table', {
        key: this.tableDate.getMonth()
      }, [
        this.genTHead(),
        this.genTBody()
      ]))

      return this.$createElement('div', {
        'class': 'date-picker__table',
        domProps: {
          onwheel: (e) => {
            e.preventDefault()

            let month = this.tableDate.getMonth()
            const year = this.tableDate.getFullYear()
            const next = e.wheelDelta > 0

            if (next) month++
            else month--

            this.tableDate = new Date(year, month)
          }
        }
      }, [
        this.$createElement(this.computedTransition, children)
      ])
    },
    genTHead () {
      return this.$createElement('thead', {

      }, this.genTR(this.days.map(o => {
        return this.$createElement('th', o.substr(0, 1))
      })))
    },
    genTBody () {
      const children = []
      let rows = []
      const length = new Date(
        this.tableYear,
        this.tableMonth + 1,
        0
      ).getDate()

      const day = new Date(
        this.tableYear,
        this.tableMonth
      ).getDay()

      for (let i = 0; i < day; i++) {
        rows.push(this.$createElement('td'))
      }

      for (let i = 1; i <= length; i++) {
        rows.push(this.$createElement('td', [
          this.$createElement('button', {
            'class': {
              'btn btn--floating btn--small btn--flat': true,
              'btn--active': this.isActive(i),
              'btn--current': this.isCurrent(i)
            },
            domProps: {
              innerHTML: `<span class="btn__content">${i}</span>`
            },
            on: {
              click: () => {
                this.inputDate = `${this.tableDate.getFullYear()}-${this.tableDate.getMonth() + 1}-${i}`
              }
            }
          })
        ]))

        if (rows.length % 7 === 0) {
          children.push(this.genTR(rows))
          rows = []
        }
      }

      if (rows.length) {
        children.push(this.genTR(rows))
      }

      children.length < 6 && children.push(this.genTR([
        this.$createElement('td', { domProps: { innerHTML: '&nbsp;' }})
      ]))

      return this.$createElement('tbody', children)
    },
    genTR (children = [], data = {}) {
      return [this.$createElement('tr', data, children)]
    },
    isActive (i) {
      return this.tableYear === this.year &&
        this.tableMonth === this.month &&
        this.day === i
    },
    isCurrent (i) {
      return this.currentYear === this.tableYear &&
        this.currentMonth === this.tableMonth &&
        this.currentDay === i
    }
  }
}

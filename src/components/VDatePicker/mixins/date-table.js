export default {
  methods: {
    dateWheelScroll (e) {
      e.preventDefault()

      let month = this.tableMonth

      if (e.deltaY < 0) month++
      else month--

      this.tableDate = new Date(this.tableYear, month)
    },
    dateGenTHead () {
      const days = this.narrowDays.map(day => this.$createElement('th', day))
      return this.$createElement('thead', this.dateGenTR(days))
    },
    dateGenTBody () {
      const children = []
      let rows = []
      const length = new Date(
        this.tableYear,
        this.tableMonth + 1,
        0
      ).getDate()

      let day = new Date(this.tableYear, this.tableMonth).getDay()
      day = day < 1 ? 6 : day - parseInt(this.firstDayOfWeek)

      for (let i = 0; i < day; i++) {
        rows.push(this.$createElement('td'))
      }

      for (let i = 1; i <= length; i++) {
        const date = new Date(this.tableYear, this.tableMonth, i, 12, 0, 0, 0)
        rows.push(this.$createElement('td', [
          this.$createElement('button', {
            'class': {
              'btn btn--floating btn--small btn--flat': true,
              'btn--active': this.dateIsActive(i),
              'btn--current': this.dateIsCurrent(i),
              'btn--light': this.dark,
              'btn--disabled': !this.isAllowed(date)
            },
            attrs: {
              type: 'button'
            },
            domProps: {
              innerHTML: `<span class="btn__content">${i}</span>`
            },
            on: {
              click: () => {
                const day = i < 10 ? `0${i}` : i
                const tableYear = this.tableYear
                let tableMonth = this.tableMonth + 1
                tableMonth = tableMonth < 10 ? `0${tableMonth}` : tableMonth

                this.inputDate = `${tableYear}-${tableMonth}-${day}T12:00:00`
                this.$nextTick(() => (this.autosave && this.save()))
              }
            }
          })
        ]))

        if (rows.length % 7 === 0) {
          children.push(this.dateGenTR(rows))
          rows = []
        }
      }

      if (rows.length) {
        children.push(this.dateGenTR(rows))
      }

      children.length < 6 && children.push(this.dateGenTR([
        this.$createElement('td', { domProps: { innerHTML: '&nbsp;' } })
      ]))

      return this.$createElement('tbody', children)
    },
    dateGenTR (children = [], data = {}) {
      return [this.$createElement('tr', data, children)]
    },
    dateIsActive (i) {
      return this.tableYear === this.year &&
        this.tableMonth === this.month &&
        this.day === i
    },
    dateIsCurrent (i) {
      return this.currentYear === this.tableYear &&
        this.currentMonth === this.tableMonth &&
        this.currentDay === i
    }
  }
}

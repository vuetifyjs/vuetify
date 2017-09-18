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
    dateClick (day) {
      day = day < 10 ? `0${day}` : day
      const tableYear = this.tableYear
      let tableMonth = this.tableMonth + 1
      tableMonth = tableMonth < 10 ? `0${tableMonth}` : tableMonth

      this.inputDate = `${tableYear}-${tableMonth}-${day}T12:00:00`
      this.$nextTick(() => (this.autosave && this.save()))
    },
    dateGenTD (day) {
      const date = new Date(this.tableYear, this.tableMonth, day, 12)
      const buttonText = this.supportsLocaleFormat
        ? date.toLocaleDateString(this.locale, { day: 'numeric' })
        : day
      const button = this.$createElement('button', {
        'class': {
          'btn btn--date-picker btn--floating btn--small btn--flat': true,
          'btn--active': this.dateIsActive(day),
          'btn--outline': this.dateIsCurrent(day) && !this.dateIsActive(day),
          'btn--disabled': !this.isAllowed(date)
        },
        attrs: {
          type: 'button'
        },
        domProps: {
          innerHTML: `<span class="btn__content">${buttonText}</span>`
        },
        on: {
          click: () => this.dateClick(day)
        }
      })

      return this.$createElement('td', [button])
    },
    dateGenTBody () {
      const children = []
      const daysInMonth = new Date(this.tableYear, this.tableMonth + 1, 0, 12).getDate()
      let rows = []
      const day = (new Date(this.tableYear, this.tableMonth, 1, 12).getDay() - parseInt(this.firstDayOfWeek) + 7) % 7

      for (let i = 0; i < day; i++) {
        rows.push(this.$createElement('td'))
      }

      for (let i = 1; i <= daysInMonth; i++) {
        rows.push(this.dateGenTD(i))

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

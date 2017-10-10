export default {
  methods: {
    dateWheelScroll (e) {
      e.preventDefault()

      this.updateTableMonth(e.deltaY < 0 ? this.tableMonth + 1 : this.tableMonth - 1)
    },
    dateGenTHead () {
      const days = this.weekDays.map(day => this.$createElement('th', day))
      return this.$createElement('thead', this.dateGenTR(days))
    },
    dateClick (day) {
      this.inputDate = this.sanitizeDateString(`${this.tableYear}-${this.tableMonth + 1}-${day}`, 'date')
      this.$nextTick(() => (this.autosave && this.save()))
    },
    dateGenTD (day) {
      const date = this.sanitizeDateString(`${this.tableYear}-${this.tableMonth + 1}-${day}`, 'date')
      const buttonText = this.dayFormat(date, this.locale)
      const button = this.$createElement('button', {
        staticClass: 'btn btn--date-picker btn--floating btn--small btn--flat',
        'class': {
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
      const daysInMonth = new Date(this.tableYear, this.tableMonth + 1, 0).getDate()
      let rows = []

      // Use UTC time zone to get the position of the first day of the month relative to the first day of the week
      const day = (new Date(`${this.tableYear}-${this.tableMonth + 1}-01 GMT+0`).getUTCDay() - parseInt(this.firstDayOfWeek) + 7) % 7

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

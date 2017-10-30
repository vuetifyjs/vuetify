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
      const buttonText = this.formatters.day(date)
      const isActive = this.dateIsActive(day)
      const isCurrent = this.dateIsCurrent(day)
      const classes = Object.assign({
        'btn--active': isActive,
        'btn--outline': isCurrent && !isActive,
        'btn--disabled': !this.isAllowed(date)
      }, this.themeClasses)

      const button = this.$createElement('button', {
        staticClass: 'btn btn--raised btn--icon',
        'class': (isActive || isCurrent)
          ? this.addBackgroundColorClassChecks(classes)
          : classes,
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
    // Returns number of the days from the firstDayOfWeek to the first day of the current month
    weekDaysBeforeFirstDayOfTheMonth () {
      const pad = n => (n * 1 < 10) ? `0${n * 1}` : `${n}`
      const firstDayOfTheMonth = new Date(`${this.tableYear}-${pad(this.tableMonth + 1)}-01T00:00:00+00:00`)
      const weekDay = firstDayOfTheMonth.getUTCDay()
      return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7
    },
    dateGenTBody () {
      const children = []
      const daysInMonth = new Date(this.tableYear, this.tableMonth + 1, 0).getDate()
      let rows = []
      const day = this.weekDaysBeforeFirstDayOfTheMonth()

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

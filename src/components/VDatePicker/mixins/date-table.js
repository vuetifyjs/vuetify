export default {
  methods: {
    dateWheelScroll (e) {
      e.preventDefault()

      let month = this.tableMonth

      if (e.deltaY < 0) month++
      else month--

      this.tableDate = this.normalizeDate(this.tableYear, month)
    },
    dateGenTHead () {
      const days = this.narrowDays.map(day => this.$createElement('th', day))
      return this.$createElement('thead', this.dateGenTR(days))
    },
    dateClick (day) {
      this.inputDate = this.normalizeDate(this.tableYear, this.tableMonth, day)
      this.$nextTick(() => (this.autosave && this.save()))
    },
    dateGenButtonText (date, day) {
      return this.supportsLocaleFormat
        ? date.toLocaleDateString(this.locale, {
          day: 'numeric',
          timeZone: this.timeZone
        })
        : day
    },
    dateGenTD (day) {
      const date = this.normalizeDate(this.tableYear, this.tableMonth, day)
      const buttonText = this.dateGenButtonText(date, day)
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
      const daysInMonth = this.normalizeDate(this.tableYear, this.tableMonth + 1, 0).getDate()
      let rows = []
      const day = (this.normalizeDate(this.tableYear, this.tableMonth).getDay() - parseInt(this.firstDayOfWeek) + 7) % 7

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

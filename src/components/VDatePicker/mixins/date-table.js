export default {
  methods: {
    dateWheelScroll (e) {
      e.preventDefault()

      let month = this.tableMonth

      if (e.deltaY < 0) month++
      else month--

      if (month === 12) {
        this.tableDate = this.sanitizeDateString(`${this.tableYear + 1}-01`, 'month')
      } else if (month === -1) {
        this.tableDate = this.sanitizeDateString(`${this.tableYear - 1}-12`, 'month')
      } else {
        this.tableDate = this.sanitizeDateString(`${this.tableYear}-${month + 1}`, 'month')
      }
    },
    dateGenTHead () {
      const days = this.narrowDays.map(day => this.$createElement('th', day))
      return this.$createElement('thead', this.dateGenTR(days))
    },
    dateClick (day) {
      this.inputDate = this.sanitizeDateString(`${this.tableYear}-${this.tableMonth + 1}-${day}`, 'date')
      this.$nextTick(() => (this.autosave && this.save()))
    },
    dateGenButtonText (day) {
      return this.supportsLocaleFormat
        ? new Date(`${this.tableYear}-${this.tableMonth + 1}-${day} GMT+0`).toLocaleDateString(this.locale, {
          day: 'numeric',
          timeZone: 'UTC'
        })
        : day
    },
    dateGenTD (day) {
      const date = this.sanitizeDateString(`${this.tableYear}-${this.tableMonth + 1}-${day}`, 'date')
      const buttonText = this.dateGenButtonText(day)
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

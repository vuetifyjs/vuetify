export default {
  methods: {
    monthWheelScroll (e) {
      e.preventDefault()

      let year = this.tableYear

      if (e.deltaY < 0) year++
      else year--

      this.tableDate = `${year}`
    },
    monthClick (month) {
      // Updates inputDate setting 'YYYY-MM' or 'YYYY-MM-DD' format, depending on the picker type
      if (this.type === 'date') {
        const date = this.sanitizeDateString(`${this.tableYear}-${month + 1}-${this.day}`, 'date')
        if (this.isAllowed(date)) this.inputDate = date
        this.updateTableMonth(month)
        this.activePicker = 'DATE'
      } else {
        this.inputDate = this.sanitizeDateString(`${this.tableYear}-${month + 1}`, 'month')
        this.$nextTick(() => (this.autosave && this.save()))
      }
    },
    monthGenTD (month) {
      const pad = n => (n * 1 < 10) ? `0${n * 1}` : `${n}`
      const date = `${this.tableYear}-${pad(month + 1)}`
      const monthName = this.formatters.month(date)
      const isActive = this.monthIsActive(month)
      const isCurrent = this.monthIsCurrent(month)
      const classes = Object.assign({
        'btn--flat': !isActive,
        'btn--active': isActive,
        'btn--outline': isCurrent && !isActive,
        'btn--disabled': this.type === 'month' && !this.isAllowed(date)
      }, this.themeClasses)

      return this.$createElement('td', {
        key: month
      }, [this.$createElement('button', {
        staticClass: 'btn',
        'class': (isActive || isCurrent)
          ? this.addBackgroundColorClassChecks(classes)
          : classes,
        attrs: {
          type: 'button'
        },
        domProps: {
          innerHTML: `<span class="btn__content">${monthName}</span>`
        },
        on: {
          click: () => this.monthClick(month)
        }
      })])
    },
    monthGenTBody () {
      const children = []
      const cols = Array(3).fill(null)
      const rows = 12 / cols.length

      for (let row = 0; row < rows; row++) {
        children.push(this.$createElement('tr', cols.map((_, col) => {
          return this.monthGenTD(row * cols.length + col)
        })))
      }

      return this.$createElement('tbody', children)
    },
    monthIsActive (i) {
      return this.tableYear === this.year &&
        (this.type === 'month' ? this.month : this.tableMonth) === i
    },
    monthIsCurrent (i) {
      return this.currentYear === this.tableYear &&
        this.currentMonth === i
    }
  }
}

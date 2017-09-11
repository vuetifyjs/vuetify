export default {
  methods: {
    wheelScroll (e) {
      e.preventDefault()

      let month = this.tableMonth

      if (e.deltaY < 0) month++
      else month--

      this.tableDate = new Date(this.tableYear, month)
    },
    touch (value) {
      this.tableDate = new Date(this.tableYear, this.tableMonth + value)
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
        key: this.tableMonth
      }, [this.genTHead(), this.genTBody()]))

      return this.$createElement('div', data, [
        this.$createElement('transition', {
          props: { name: this.computedTransition }
        }, children)
      ])
    },
    genTHead () {
      const days = this.narrowDays.map(day => this.$createElement('th', day))
      return this.$createElement('thead', this.genTR(days))
    },
    genTBody () {
      const children = []
      let rows = []
      const length = new Date(
        this.tableYear,
        this.tableMonth + 1,
        0
      ).getDate()

      let day = new Date(this.tableYear, this.tableMonth).getDay()
      day = (day + 7 - parseInt(this.firstDayOfWeek)) % 7

      for (let i = 0; i < day; i++) {
        rows.push(this.$createElement('td'))
      }

      for (let i = 1; i <= length; i++) {
        const date = new Date(this.tableYear, this.tableMonth, i, 12, 0, 0, 0)
        const buttonText = this.supportsLocaleFormat
          ? date.toLocaleDateString(this.locale, { day: 'numeric' })
          : i
        rows.push(this.$createElement('td', [
          this.$createElement('button', {
            'class': {
              'btn btn--date-picker btn--floating btn--small btn--flat': true,
              'btn--active': this.isActive(i),
              'btn--current': this.isCurrent(i),
              'btn--light': this.dark,
              'btn--disabled': !this.isAllowed(date)
            },
            attrs: {
              type: 'button'
            },
            domProps: {
              innerHTML: `<span class="btn__content">${buttonText}</span>`
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
          children.push(this.genTR(rows))
          rows = []
        }
      }

      if (rows.length) {
        children.push(this.genTR(rows))
      }

      children.length < 6 && children.push(this.genTR([
        this.$createElement('td', { domProps: { innerHTML: '&nbsp;' } })
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

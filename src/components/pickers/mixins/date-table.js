import touch from '~util/touch'

export default {
  methods: {
    genTable () {
      const children = []
      const data = {
        ref: 'table',
        'class': 'picker--date__table'
      }

      if (this.scrollable) {
        data.on = {
          wheel: (e) => {
            e.preventDefault()

            let month = this.tableMonth
            const year = this.tableYear
            const next = e.deltaY < 0

            if (next) month++
            else month--

            this.tableDate = new Date(year, month)
          }
        }
      }

      children.push(this.$createElement('table', {
        key: this.tableMonth
      }, [
        this.genTHead(),
        this.genTBody()
      ]))

      return this.$createElement('div', data, [
        this.$createElement(this.computedTransition, children)
      ])
    },
    genTHead () {
      return this.$createElement('thead', {

      }, this.genTR(this.narrowDays.map(day => this.$createElement('th', day))))
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
      ).getDay() - parseInt(this.firstDayOfWeek)

      for (let i = 0; i < day; i++) {
        rows.push(this.$createElement('td'))
      }

      for (let i = 1; i <= length; i++) {
        rows.push(this.$createElement('td', [
          this.$createElement('button', {
            'class': {
              'btn btn--floating btn--small btn--flat': true,
              'btn--active': this.isActive(i),
              'btn--current': this.isCurrent(i),
              'btn--light': this.dark,
              'btn--disabled': !this.isAllowed(new Date(this.tableYear, this.tableMonth, i, 12, 0, 0, 0))
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
                let tableMonth = this.tableMonth + 1
                tableMonth = tableMonth < 10 ? `0${tableMonth}` : tableMonth

                this.inputDate = `${this.tableYear}-${tableMonth}-${day}T12:00:00`
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
  },
  mounted () {
    touch.bind(this.$refs.table)
      .left(() => this.tableDate = new Date(this.tableYear, this.tableMonth + 1))
      .right(() => this.tableDate = new Date(this.tableYear, this.tableMonth - 1))
  },
  beforeDestroy () {
    touch.unbind(this.$refs.table)
  }
}

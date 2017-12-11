export default {
  methods: {
    genYears () {
      return this.$createElement('ul', {
        staticClass: 'picker--date__years',
        key: 'year',
        ref: 'years'
      }, this.genYearItems())
    },
    yearClick (year) {
      // Not used as the year picker is not supported yet
      // if (this.type === 'year') {
      //   this.inputDate = `${year}`
      //   this.$nextTick(() => (this.autosave && this.save()))
      // } else

      if (this.type === 'month') {
        const date = this.sanitizeDateString(`${year}-${this.month + 1}`, 'month')
        if (this.isAllowed(date)) this.inputDate = date
        this.tableDate = `${year}`
        this.activePicker = 'MONTH'
      } else {
        const date = this.sanitizeDateString(`${year}-${this.tableMonth + 1}-${this.day}`, 'date')
        if (this.isAllowed(date)) this.inputDate = date
        this.tableDate = `${year}-${this.tableMonth + 1}`
        this.activePicker = 'MONTH'
      }
    },
    genYearItems () {
      const children = []
      for (let year = this.year + 100, length = this.year - 100; year > length; year--) {
        const buttonText = this.formatters.year(`${year}`)

        children.push(this.$createElement('li', {
          key: year,
          'class': this.year === year
            ? this.addTextColorClassChecks({ active: true })
            : {},
          on: {
            click: () => this.yearClick(year)
          }
        }, buttonText))
      }
      return children
    }
  }
}

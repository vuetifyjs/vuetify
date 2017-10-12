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
      if (this.type === 'year') {
        this.inputDate = `${year}`
        this.$nextTick(() => (this.autosave && this.save()))
      } else if (this.type === 'month') {
        this.inputDate = this.sanitizeDateString(`${year}-${this.month + 1}`, 'month')
        this.activePicker = 'MONTH'
      } else {
        this.inputDate = this.sanitizeDateString(`${year}-${this.tableMonth + 1}-${this.day}`, 'date')
        this.activePicker = 'MONTH'
      }
    },
    genYearItems () {
      const children = []
      for (let year = this.year + 100, length = this.year - 100; year > length; year--) {
        const buttonText = this.yearFormat(`${year}`, this.locale)

        children.push(this.$createElement('li', {
          'class': {
            active: this.year === year
          },
          on: {
            click: () => this.yearClick(year)
          }
        }, buttonText))
      }
      return children
    }
  }
}

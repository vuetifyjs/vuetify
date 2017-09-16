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
      let tableMonth = this.tableMonth + 1
      let day = this.day
      tableMonth = tableMonth < 10 ? `0${tableMonth}` : tableMonth
      day = day < 10 ? `0${day}` : day
      this.inputDate = `${year}-${tableMonth}-${day}`

      if (this.type === 'year') {
        this.$nextTick(() => (this.autosave && this.save()))
      } else {
        this.activePicker = 'MONTH'
      }
    },
    genYearItems () {
      const children = []
      for (let year = this.year + 100, length = this.year - 100; year > length; year--) {
        const date = new Date(year, this.month, this.day, 12)
        const buttonText = this.supportsLocaleFormat
          ? date.toLocaleDateString(this.locale, { year: 'numeric' })
          : year

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

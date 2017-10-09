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
      this.inputDate = this.normalizeDate(year, this.tableMonth, this.day)

      if (this.type === 'year') {
        this.$nextTick(() => (this.autosave && this.save()))
      } else {
        this.activePicker = 'MONTH'
      }
    },
    genYearItems () {
      const children = []
      for (let year = this.year + 100, length = this.year - 100; year > length; year--) {
        const date = this.normalizeDate(year, this.month, this.day)
        const buttonText = this.supportsLocaleFormat
          ? date.toLocaleDateString(this.locale, {
            year: 'numeric',
            timeZone: this.timeZone
          })
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

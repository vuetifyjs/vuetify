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
      this.inputDate = this.sanitizeDateString(`${year}-${this.tableMonth + 1}-${this.day}`, this.type)

      if (this.type === 'year') {
        this.$nextTick(() => (this.autosave && this.save()))
      } else {
        this.activePicker = 'MONTH'
      }
    },
    genYearItems () {
      const children = []
      for (let year = this.year + 100, length = this.year - 100; year > length; year--) {
        const date = new Date(`${year}-1-1 GMT+0`)
        const buttonText = Date.prototype.toLocaleDateString
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

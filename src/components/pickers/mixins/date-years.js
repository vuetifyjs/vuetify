export default {
  methods: {
    genYears () {
      return this.$createElement('ul', {
        'class': 'date-picker__years',
        ref: 'years'
      }, this.genYearItems())
    },
    genYearItems () {
      const children = []
      for (let i = this.year - 100, length = this.year + 100; i < length; i++) {
        children.push(this.$createElement('li', {
          'class': {
            active: this.year === i
          },
          on: {
            click: e => {
              e.stopPropagation()
              this.inputDate = `${i}-${this.tableDate.getMonth() + 1}-${this.day}`
              this.isSelected = false
            }
          }
        }, i))
      }
      return children
    }
  }
}

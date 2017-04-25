export default {
  methods: {
    genYears () {
      return this.$createElement('ul', {
        'class': 'picker--date__years',
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

              let tableMonth = this.tableMonth + 1
              let day = this.day
              tableMonth = tableMonth < 10 ? `0${tableMonth}` : tableMonth
              day = day < 10 ? `0${day}` : day

              this.inputDate = `${i}-${tableMonth}-${day}`
              this.isSelected = false
            }
          }
        }, i))
      }
      return children
    }
  }
}

export default {
  methods: {
    genYears (inputDateForYearCallback) {
      return this.$createElement('ul', {
        staticClass: 'picker--date__years',
        key: 'year',
        ref: 'years'
      }, this.genYearItems(inputDateForYearCallback))
    },
    genYearItems (inputDateForYearCallback) {
      const children = []
      for (let i = this.year + 100, length = this.year - 100; i > length; i--) {
        children.push(this.$createElement('li', {
          'class': {
            active: this.year === i
          },
          on: {
            click: e => {
              e.stopPropagation()
              this.inputDate = inputDateForYearCallback(i)
              if (this.type === 'year') {
                this.$nextTick(() => (this.autosave && this.save()))
              } else {
                this.activePicker = 'MONTH'
              }
            }
          }
        }, i))
      }
      return children
    }
  }
}

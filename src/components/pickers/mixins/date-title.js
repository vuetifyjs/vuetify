export default {
  methods: {
    genTitle () {
      const date = `${this.dayName.substr(0, 3)}, ${this.monthName.substr(0, 3)} ${this.day}`

      const text = this.$createElement('v-slide-x-transition', [
        this.$createElement('div', { key: date }, date)
      ])

      return this.$createElement('v-card-title', {
        'class': 'date-picker__title'
      }, [
        this.$createElement('div', {
          'class': {
            'date-picker__title-year': true,
            'active': this.isSelected
          },
          on: {
            click: e => {
              e.stopPropagation()
              this.isSelected = true
            }
          }
        }, this.year),
        this.$createElement('div', {
          'class': {
            'date-picker__title-date': true,
            'active': !this.isSelected
          },
          on: {
            click: e => {
              e.stopPropagation()
              this.isSelected = false
            }
          }
        }, [text])
      ])
    }
  }
}

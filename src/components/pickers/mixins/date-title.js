
export default {
  methods: {
    genTitle () {
      const date = this.titleDateFormat({
        day: this.day,
        dayName: this.dayName,
        month: this.month,
        monthName: this.monthName,
        landscape: this.landscape
      })

      const text = this.$createElement('transition', {
        props: {
          name: 'slide-x-transition',
          mode: 'out-in'
        }
      }, [
        this.$createElement('div', {
          domProps: { innerHTML: date },
          key: date
        })
      ])

      return this.$createElement('div', {
        'class': 'picker__title'
      }, [
        this.$createElement('div', {
          'class': {
            'picker--date__title-year': true,
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
            'picker--date__title-date': true,
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

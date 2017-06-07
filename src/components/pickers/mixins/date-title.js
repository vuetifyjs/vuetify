
export default {
  methods: {
    genTitle () {
      const date = `${this.dayName.substr(0, 3)},${this.landscape ? '<br>' : ''} ${this.monthName.substr(0, 3)} ${this.day}`

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

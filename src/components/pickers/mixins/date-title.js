
export default {
  methods: {
    genTitle () {
      let date = new Date(this.year, this.month, this.day).toLocaleString(this.locale, this.titleDateFormat)
      if (this.landscape) {
        if (date.indexOf(',') > -1) date = date.replace(',', ',<br>')
        else if (date.indexOf(' ') > -1) date = date.replace(' ', '<br>')
      }

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

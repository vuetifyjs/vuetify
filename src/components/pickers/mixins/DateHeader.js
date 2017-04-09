export default {
  methods: {
    genHeader () {
      return this.$createElement('v-card-title', {
        'class': 'date-picker__header'
      }, [
        this.$createElement('div', {
          'class': 'date-picker__header-year'
        }, this.year),
        this.$createElement('div', {
          'class': 'date-picker__header-date display-1'
        }, 'Thu, Apr 13')
      ])
    }
  }
}

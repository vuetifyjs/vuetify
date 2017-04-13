export default {
  methods: {
    genTitle () {
      const children = [this.genTime()]

      if (this.format === 'ampm') {
        children.push(this.genAMPM())
      }

      return this.$createElement('v-card-title', {
        'class': 'time-picker__title'
      }, children)
    },
    genTime () {
      return this.$createElement('div', [
        this.$createElement('span', {
          'class': { active: this.selectingHour },
          on: {
            click: () => (this.selectingHour = true)
          }
        }, this.hour),
        this.$createElement('span', {
          'class': { active: !this.selectingHour },
          on: {
            click: () => (this.selectingHour = false)
          }
        }, `:${this.minute}`)
      ])
    },
    genAMPM () {
      return this.$createElement('div', [
        this.$createElement('span', {
          'class': { active: this.period === 'am' },
          on: { click: () => (this.period = 'am') }
        }, 'AM'),
        this.$createElement('span', {
          'class': { active: this.period === 'pm' },
          on: { click: () => (this.period = 'pm') }
        }, 'PM')
      ])
    }
  }
}

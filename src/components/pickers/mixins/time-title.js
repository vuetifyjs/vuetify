export default {
  methods: {
    genTitle () {
      const children = [this.genTime()]

      if (this.format === 'ampm') {
        children.push(this.genAMPM())
      }

      return this.$createElement('div', {
        'class': 'picker__title'
      }, children)
    },
    genTime () {
      let hour = this.hour

      if (this.is24hr && hour < 10) {
        hour = `0${hour}`
      }

      return this.$createElement('div', {
        'class': 'picker--time__title'
      }, [
        this.$createElement('span', {
          'class': { active: this.selectingHour },
          on: {
            click: () => (this.selectingHour = true)
          }
        }, hour),
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
        this.genPeriod('am'),
        this.genPeriod('pm')
      ])
    },
    genPeriod (period) {
      return this.$createElement('span', {
        'class': { active: this.period === period },
        on: { click: () => (this.period = period) }
      }, period.toUpperCase())
    }
  }
}

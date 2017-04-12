export default {
  methods: {
    genBody () {
      return this.$createElement('v-card-text', {
        'class': 'time-picker__body'
      }, [
        this.$createElement('div', {
          'class': 'time-picker__clock'
        }, this.genTime(12).concat([
          this.$createElement('div', {
            'class': 'time-picker__clock-hand'
          })
        ]))
      ])
    },
    genTime (hours) {
      const children = []
      const radius = -(280 / 2 * 0.85)
      const degrees = -(360 / hours * Math.PI / 180)

      for (let i = 1; i <= hours; i++) {
        const x = Math.sin(i * degrees) * radius
        const y = Math.cos(i * degrees) * radius

        children.push(this.$createElement('span', {
          'class': {
            'active': i === 12
          },
          style: {
            transform: `translate(${parseFloat(x).toFixed(1)}px, ${parseFloat(y).toFixed(1)}px)`
          }
        }, i))
      }
      return children
    }
  }
}

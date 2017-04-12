export default {
  methods: {
    genTitle () {
      const time = '3:30'

      const text = this.$createElement('v-slide-x-transition', [
        this.$createElement('div', { key: time }, time)
      ])

      return this.$createElement('v-card-title', {
        'class': 'time-picker__title'
      }, time)
    }
  }
}

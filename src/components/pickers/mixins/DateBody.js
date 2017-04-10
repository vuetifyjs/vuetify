export default {
  methods: {
    genBody () {
      return this.$createElement('v-card-text', {
        'class': 'date-picker__body'
      }, [
        this.genSelector()
      ])
    },
    genSelector () {
      const month = this.lazyDate.getMonth()
      const year = this.lazyDate.getFullYear()

      return this.$createElement('div', {
        'class': 'date-picker__body-selector'
      }, [
        this.$createElement('v-btn', {
          props: { icon: true },
          nativeOn: {
            click: () => (this.lazyDate = new Date(year, month - 1))
          }
        }, [
          this.$createElement('v-icon', 'chevron_left')
        ]),
        this.$createElement('strong', `${this.months[month]} ${year}`),
        this.$createElement('v-btn', {
          props: { icon: true },
          nativeOn: {
            click: () => (this.lazyDate = new Date(year, month + 1))
          }
        }, [
          this.$createElement('v-icon', 'chevron_right')
        ])
      ])
    }
  }
}

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
      const month = this.inputDate.getMonth()
      const year = this.inputDate.getFullYear()

      return this.$createElement('div', {
        'class': 'date-picker__body-selector'
      }, [
        this.$createElement('v-icon', {
          nativeOn: {
            click: () => {
              this.inputDate = new Date(
                year,
                month - 1
              )
            }
          }
        }, 'chevron_left'),
        this.$createElement('strong', `${this.months[month]} ${year}`),
        this.$createElement('v-icon', {
          nativeOn: {
            click: () => {
              this.inputDate = new Date(
                year,
                month + 1
              )
            }
          }
        }, 'chevron_right')
      ])
    }
  }
}

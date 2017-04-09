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
      return this.$createElement('div', {
        'class': 'date-picker__body-selector'
      }, [
        this.$createElement('v-icon', {
          nativeOn: {
            click: () => {
              this.inputDate = new Date(
                this.inputDate.getFullYear(),
                this.inputDate.getMonth() - 1
              )
            }
          }
        }, 'chevron_left'),
        this.$createElement('strong', `${this.month} ${this.year}`),
        this.$createElement('v-icon', {
          nativeOn: {
            click: () => {
              this.inputDate = new Date(
                this.inputDate.getFullYear(),
                this.inputDate.getMonth() + 1
              )
            }
          }
        }, 'chevron_right')
      ])
    }
  }
}

export default {
  methods: {
    genHeader () {
      return this.$createElement('v-card-text', {
        'class': 'date-picker__header'
      }, [
        this.genSelector()
      ])
    },
    genSelector () {
      const month = this.tableDate.getMonth()
      const year = this.tableDate.getFullYear()

      return this.$createElement('div', {
        'class': 'date-picker__header-selector'
      }, [
        this.$createElement('v-btn', {
          props: { icon: true },
          nativeOn: {
            click: e => {
              e.stopPropagation()
              this.tableDate = new Date(year, month - 1)
            }
          }
        }, [
          this.$createElement('v-icon', 'chevron_left')
        ]),
        this.$createElement('div', {
          'class': 'date-picker__header-selector-date'
        }, [
          this.$createElement(this.computedTransition, [
            this.$createElement('strong', {
              key: this.tableDate.getMonth()
            }, `${this.months[month]} ${year}`)
          ])
        ]),
        this.$createElement('v-btn', {
          props: { icon: true },
          nativeOn: {
            click: e => {
              e.stopPropagation()
              this.tableDate = new Date(year, month + 1)
            }
          }
        }, [
          this.$createElement('v-icon', 'chevron_right')
        ])
      ])
    }
  }
}

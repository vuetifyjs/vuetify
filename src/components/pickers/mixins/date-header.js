export default {
  methods: {
    genHeader () {
      return this.$createElement('div', {
        'class': 'picker--date__header'
      }, [
        this.genSelector()
      ])
    },
    genBtn (change, children) {
      return this.$createElement('v-btn', {
        props: {
          dark: this.dark,
          icon: true
        },
        nativeOn: {
          click: e => {
            e.stopPropagation()
            this.tableDate = new Date(this.tableYear, change)
          }
        }
      }, children)
    },
    genSelector () {
      const date = new Date(this.tableYear, this.tableMonth)
      const header = this.$createElement('div', {
        'class': 'picker--date__header-selector-date'
      }, [
        this.$createElement(this.computedTransition, [
          this.$createElement('strong', {
            key: this.tableMonth
          }, date.toLocaleString(this.locale, this.headerDateFormat))
        ])
      ])

      return this.$createElement('div', {
        'class': 'picker--date__header-selector'
      }, [
        this.genBtn(this.tableMonth - 1, [
          this.$createElement('v-icon', 'chevron_left')
        ]),
        header,
        this.genBtn(this.tableMonth + 1, [
          this.$createElement('v-icon', 'chevron_right')
        ])
      ])
    }
  }
}

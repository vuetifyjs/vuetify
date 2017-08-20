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
            this.tableDate = new Date(change, 0)
          }
        }
      }, children)
    },
    genSelector () {
      const date = new Date(this.tableYear, 0)

      // Workaround for #1409
      date.setHours(1)

      const header = this.$createElement('div', {
        'class': 'picker--date__header-selector-date'
      }, [
        this.$createElement('transition', {
          props: { name: this.computedTransition }
        }, [
          this.$createElement('strong', {
            key: this.tableYear
          }, date.toLocaleString(this.locale, { year: 'numeric' }))
        ])
      ])

      return this.$createElement('div', {
        'class': 'picker--date__header-selector'
      }, [
        this.genBtn(this.tableYear - 1, [
          this.$createElement('v-icon', 'chevron_left')
        ]),
        header,
        this.genBtn(this.tableYear + 1, [
          this.$createElement('v-icon', 'chevron_right')
        ])
      ])
    }
  }
}

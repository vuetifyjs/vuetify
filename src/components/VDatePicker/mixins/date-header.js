export default {
  methods: {
    genBtn (change, children) {
      return this.$createElement('v-btn', {
        props: {
          dark: this.dark,
          icon: true
        },
        nativeOn: {
          click: e => {
            e.stopPropagation()
            if (this.activePicker === 'DATE') {
              this.updateTableMonth(change)
            } else if (this.activePicker === 'MONTH') {
              this.tableDate = `${change}`
            }
          }
        }
      }, children)
    },

    genHeader (keyValue, selectorText) {
      const header = this.$createElement('strong', {
        'class': this.addTextColorClassChecks(),
        key: keyValue,
        on: {
          click: () => this.activePicker = this.activePicker === 'DATE' ? 'MONTH' : 'YEAR'
        }
      }, selectorText)

      const transition = this.$createElement('transition', {
        props: { name: this.computedTransition }
      }, [header])

      return this.$createElement('div', {
        'class': 'picker--date__header-selector-date'
      }, [transition])
    },

    genSelector () {
      const keyValue = this.activePicker === 'DATE' ? this.tableMonth : this.tableYear
      // Generates the text of the button switching the active picker in the table header.
      // For date picker it uses headerDateFormat formatting function (defined by dev or
      // default). For month picker it uses Date::toLocaleDateString to get the year
      // in the current locale or just a year numeric value if Date::toLocaleDateString
      // is not supported
      const selectorText = this.activePicker === 'DATE'
        ? this.formatters.headerDate(`${this.tableYear}-${this.tableMonth + 1}`)
        : this.formatters.year(`${this.tableYear}`)

      return this.$createElement('div', {
        'class': 'picker--date__header-selector'
      }, [
        this.genBtn(keyValue - 1, [
          this.$createElement('v-icon', this.prependIcon)
        ]),
        this.genHeader(keyValue, selectorText),
        this.genBtn(keyValue + 1, [
          this.$createElement('v-icon', this.appendIcon)
        ])
      ])
    }
  }
}

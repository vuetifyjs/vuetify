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
              if (change === 12) {
                this.tableDate = this.sanitizeDateString(`${this.tableYear + 1}-1`, 'month')
              } else if (change === -1) {
                this.tableDate = this.sanitizeDateString(`${this.tableYear - 1}-12`, 'month')
              } else {
                this.tableDate = this.sanitizeDateString(`${this.tableYear}-${change + 1}`, 'month')
              }
            } else if (this.activePicker === 'MONTH') {
              this.tableDate = this.sanitizeDateString(`${change}`, 'year')
            }
          }
        }
      }, children)
    },

    genHeader (keyValue, selectorText) {
      const header = this.$createElement('strong', {
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
      const selectorText = this.activePicker === 'DATE'
        ? this.headerDateFormat(`${this.tableYear}-${this.tableMonth + 1}`, this.locale)
        : Date.prototype.toLocaleDateString
          ? new Date(`${this.tableYear}-01-01 GMT+0`).toLocaleDateString(this.locale, {
            year: 'numeric',
            timeZone: 'UTC'
          }) : this.tableYear

      return this.$createElement('div', {
        'class': 'picker--date__header-selector'
      }, [
        this.genBtn(keyValue - 1, [
          this.$createElement('v-icon', 'chevron_left')
        ]),
        this.genHeader(keyValue, selectorText),
        this.genBtn(keyValue + 1, [
          this.$createElement('v-icon', 'chevron_right')
        ])
      ])
    }
  }
}

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
              this.tableDate = this.normalizeDate(this.tableYear, change)
            } else if (this.activePicker === 'MONTH') {
              this.tableDate = this.normalizeDate(change, this.tableMonth)
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
      const pad = n => n < 10 ? `0${n}` : `${n}`
      const selectorText = this.activePicker === 'DATE'
        ? this.headerDateFormat(`${this.tableYear}-${pad(this.tableMonth + 1)}`, this.locale)
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

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
      const selectorDate = this.normalizeDate(this.tableYear, this.tableMonth)

      let selectorText = ''
      if (typeof this.headerDateFormat === 'function' && this.activePicker === 'DATE') {
        selectorText = this.headerDateFormat(selectorDate, this.activePicker)
      } else if (this.supportsLocaleFormat) {
        const format = this.activePicker === 'DATE'
          ? this.headerDateFormat
          : { year: 'numeric' }
        selectorText = selectorDate.toLocaleDateString(this.locale, Object.assign(format, {
          timeZone: this.timeZone
        }))
      } else if (this.activePicker === 'DATE') {
        selectorText = selectorDate.getFullYear() + '/'
        if (selectorDate.getMonth() < 9) selectorText += '0'
        selectorText += (1 + selectorDate.getMonth())
      } else if (this.activePicker === 'MONTH') {
        selectorText = selectorDate.getFullYear()
      }

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

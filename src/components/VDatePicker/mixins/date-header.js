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

      // Workaround for #1409
      date.setHours(1)

      let buttonText
      if (typeof this.headerDateFormat === 'function') {
        buttonText = this.headerDateFormat(date)
      } else if (this.supportsLocaleFormat) {
        buttonText = date.toLocaleDateString(this.locale, this.headerDateFormat)
      } else {
        buttonText = date.getFullYear() + '/'
        if (date.getMonth() < 9) buttonText += '0'
        buttonText += (1 + date.getMonth())
      }

      const header = this.$createElement('div', {
        'class': 'picker--date__header-selector-date'
      }, [
        this.$createElement('transition', {
          props: { name: this.computedTransition }
        }, [
          this.$createElement('strong', {
            key: this.tableMonth
          }, buttonText)])
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

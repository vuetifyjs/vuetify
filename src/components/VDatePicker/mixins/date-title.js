
export default {
  methods: {
    genYearIcon () {
      return this.yearIcon
        ? this.$createElement('v-icon', {
          props: {
            dark: true
          }
        }, this.yearIcon)
        : null
    },

    getYearBtn () {
      return this.$createElement('div', {
        'class': {
          'picker--date__title-year': true,
          'active': this.activePicker === 'YEAR'
        },
        on: {
          click: e => {
            e.stopPropagation()
            this.activePicker = 'YEAR'
          }
        }
      }, [
        new Date(this.year, this.month, this.day, 12).toLocaleDateString(this.locale, { year: 'numeric' }),
        this.genYearIcon()
      ])
    },

    genTitleText (title) {
      return this.$createElement('transition', {
        props: {
          name: 'slide-x-transition',
          mode: 'out-in'
        }
      }, [
        this.$createElement('div', {
          domProps: { innerHTML: title },
          key: title
        })
      ])
    },

    genTitleDate (title) {
      return this.$createElement('div', {
        staticClass: 'picker--date__title-date',
        'class': {
          'active': this.activePicker === this.type.toUpperCase()
        },
        on: {
          click: e => {
            e.stopPropagation()
            this.activePicker = this.type.toUpperCase()
          }
        }
      }, [this.genTitleText(title)])
    },

    genTitle (title) {
      return this.$createElement('div', {
        'class': 'picker__title'
      }, [
        this.getYearBtn(),
        this.genTitleDate(title)
      ])
    }
  }
}

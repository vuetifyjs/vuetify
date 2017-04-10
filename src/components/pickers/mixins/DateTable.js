export default {
  methods: {
    genTable () {
      return this.$createElement('table', {
      }, [
        this.genTHead(),
        this.genTBody(),
        this.genTFoot()
      ])
    },
    genTHead () {
      return this.$createElement('thead', {

      }, this.genTR(this.days.map(o => {
        return this.$createElement('th', o.substr(0, 1))
      })))
    },
    genTBody () {
      const children = []
      let rows = []
      const length = new Date(
        this.lazyDate.getFullYear(),
        this.lazyDate.getMonth() + 1,
        0
      ).getDate()

      const day = new Date(
        this.lazyDate.getFullYear(),
        this.lazyDate.getMonth()
      ).getDay()

      for (let i = 0; i < day; i++) {
        rows.push(this.$createElement('td'))
      }

      for (let i = 1; i <= length; i++) {
        rows.push(this.$createElement('td', [
          this.$createElement('v-btn', {
            'class': {
              'btn--active': this.isActive(i),
              'btn--current': this.isCurrent(i)
            },
            props: {
              floating: true,
              small: true,
              flat: true
            },
            nativeOn: {
              click: () => {
                this.inputDate = `${this.lazyDate.getFullYear()}-${this.lazyDate.getMonth() + 1}-${i} 00:00:00`
              }
            }
          }, i)
        ]))

        if (rows.length % 7 === 0) {
          children.push(this.genTR(rows))
          rows = []
        }
      }

      if (rows.length) {
        children.push(this.genTR(rows))
      }

      children.length < 6 && children.push(this.genTR([
        this.$createElement('td', { domProps: { innerHTML: '&nbsp;' }})
      ]))

      return this.$createElement('tbody', children)
    },
    genTFoot () {
      return this.$createElement('tfoot', {

      }, [
        this.genTR([
          this.$createElement('td', {
            'class': 'text-xs-right',
            attrs: { colspan: '100%' }
          }, [
            this.$createElement('v-btn', {
              props: { flat: true, primary: true }
            }, 'Cancel'),
            this.$createElement('v-btn', {
              props: { flat: true, primary: true }
            }, 'Ok')
          ])
        ])
      ])
    },
    genTR (children = [], data = {}) {
      return [this.$createElement('tr', data, children)]
    },
    isActive (i) {
      return this.lazyDate.getFullYear() === this.year &&
        this.lazyDate.getMonth() === this.month &&
        this.lazyDate.getDate() === i
    },
    isCurrent (i) {
      return this.currentYear === this.lazyDate.getFullYear() &&
        this.currentMonth === this.lazyDate.getMonth() &&
        this.currentDay === i
    }
  }
}

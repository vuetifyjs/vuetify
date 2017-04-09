export default {
  methods: {
    genTable () {
      return this.$createElement('table', {
        //
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
        this.inputDate.getFullYear(),
        this.inputDate.getMonth() + 1,
        0
      ).getDate()

      const day = this.inputDate.getDay()

      for (let i = 0; i < day; i++) {
        rows.push(this.$createElement('td'))
      }

      for (let i = 1; i <= length; i++) {
        rows.push(this.$createElement('td', [
          this.$createElement('v-btn', {
            props: { floating: true, small: true, flat: true }
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
    genTR (children, data = {}) {
      return [this.$createElement('tr', data, children)]
    }
  }
}

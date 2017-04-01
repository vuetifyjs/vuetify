export default {
  methods: {
    genTHead () {
      const selectAll = this.selectAll ? 1 : 0
      const children = this.headers.map((o, i) => this.genHeader(o, i + selectAll))
      const checkbox = this.$createElement('v-checkbox', {
        props: {
          'hide-details': true,
          primary: true,
          inputValue: this.all,
          indeterminate: this.indeterminate
        },
        on: { change: this.toggle }
      })

      this.selectAll && children.unshift(this.$createElement('th', [checkbox]))

      return this.$createElement('thead', [this.genTR(children)])
    },
    genHeader (item, index) {
      const beingSorted = this.sorting === index
      const classes = beingSorted && this.desc
        ? 'desc'
        : 'asc'

      return this.$createElement('th', {
        'class': {
          active: beingSorted,
          [classes]: beingSorted && true
        },
        on: { click: () => this.sort(index) }
      }, [
        this.$createElement('v-icon', { 'class': classes }, 'arrow_downward'),
        this.$scopedSlots.headers ? this.$scopedSlots.headers({ item }) : item
      ])
    }
  }
}

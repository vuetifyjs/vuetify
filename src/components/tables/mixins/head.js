export default {
  methods: {
    genTHead () {
      const children = this.headers.map((o, i) => this.genHeader(o, i))
      const checkbox = this.$createElement('v-checkbox', {
        props: {
          'hide-details': true,
          primary: true
        }
      })

      children.unshift(this.$createElement('th', [checkbox]))

      return this.$createElement('thead', [this.genTR(children)])
    },
    genHeader (item, index) {
      const beingSorted = this.sorting === index
      const icon = beingSorted && this.asc
        ? 'arrow_upward'
        : 'arrow_downward'

      return this.$createElement('th', {
        'class': {
          'active': beingSorted
        },
        on: { click: () => this.sort(index) }
      }, [
        this.$createElement('v-icon', icon),
        this.$scopedSlots.headers ? this.$scopedSlots.headers({ item }) : item
      ])
    }
  }
}

export default {
  methods: {
    genTHead () {
      const children = this.headers.map(o => this.genHeader(o))
      const checkbox = this.$createElement('v-checkbox', {
        props: {
          hideDetails: true,
          primary: true,
          inputValue: this.all,
          indeterminate: this.indeterminate
        },
        on: { change: this.toggle }
      })

      this.selectAll && children.unshift(this.$createElement('th', [checkbox]))

      return this.$createElement('thead', [this.genTR(children)])
    },
    genHeader (item) {
      const array = [
        this.$scopedSlots.headers
          ? this.$scopedSlots.headers({ item })
          : item[this.headerText]
      ]

      return this.$createElement('th', ...this.genHeaderData(item, array))
    },
    genHeaderData (item, children) {
      let beingSorted = false
      const classes = ['column']
      const data = {}

      if ('sortable' in item && item.sortable || !('sortable' in item)) {
        data.on = { click: () => this.sort(item.value) }
        !('value' in item) && console.warn('Data table headers must have a value property that corresponds to a value in the v-model array')

        classes.push('sortable')
        const icon = this.$createElement('v-icon', 'arrow_upward')
        item.left && children.push(icon) || children.unshift(icon)

        beingSorted = this.sorting === item.value
        beingSorted && classes.push('active')
        beingSorted && this.desc && classes.push('desc') || classes.push('asc')
      }

      item.left && classes.push('text-xs-left') || classes.push('text-xs-right')

      data.class = classes

      return [data, children]
    }
  }
}

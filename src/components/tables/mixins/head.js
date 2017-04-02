export default {
  methods: {
    genTHead () {
      const selectAll = this.selectAll ? 1 : 0
      const children = this.headers.map((o, i) => this.genHeader(o, i + selectAll))
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
    genHeader (item, index) {
      const array = [
        this.$scopedSlots.headers
          ? this.$scopedSlots.headers({ item })
          : item[this.headerText]
      ]

      return this.$createElement('th', ...this.genHeaderData(item, index, array))
    },
    genHeaderData (item, index, children) {
      let beingSorted = false
      const classes = ['column']

      if ('sortable' in item && item.sortable || !('sortable' in item)) {
        classes.push('sortable')
        const icon = this.$createElement('v-icon', 'arrow_downward')
        item.left && children.push(icon) || children.unshift(icon)

        beingSorted = this.sorting === index
        beingSorted && classes.push('active')
        beingSorted && this.desc && classes.push('desc') || classes.push('asc')
      }

      item.left && classes.push('text-xs-left') || classes.push('text-xs-right')

      return [
        {
          'class': classes,
          on: { click: () => this.sort(index) }
        },
        children
      ]
    }
  }
}

export default {
  methods: {
    genTHead () {
      let children = []

      if (this.$scopedSlots.headers) {
        const row = this.$scopedSlots.headers({ headers: this.headers })

        children = row.length && row[0].tag === 'tr' ? row : this.genTR(row)
      } else {
        const row = this.headers.map(o => this.genHeader(o))
        const checkbox = this.$createElement('v-checkbox', {
          props: {
            dark: this.dark,
            light: this.light,
            primary: this.selectAll === 'primary' || this.selectAll === true,
            secondary: this.selectAll === 'secondary',
            success: this.selectAll === 'success',
            info: this.selectAll === 'info',
            warning: this.selectAll === 'warning',
            error: this.selectAll === 'error',
            hideDetails: true,
            inputValue: this.all,
            indeterminate: this.indeterminate
          },
          on: { change: this.toggle }
        })

        this.selectAll && row.unshift(this.$createElement('th', [checkbox]))

        children = this.genTR(row)
      }

      return this.$createElement('thead', [children])
    },
    genHeader (header) {
      const array = [
        this.$scopedSlots.headerCell
          ? this.$scopedSlots.headerCell({ header })
          : header[this.headerText]
      ]

      return this.$createElement('th', ...this.genHeaderData(header, array))
    },
    genHeaderData (header, children) {
      let beingSorted = false
      const classes = ['column']
      const data = {}

      if ('sortable' in header && header.sortable || !('sortable' in header)) {
        data.on = { click: () => this.sort(header.value) }
        !('value' in header) && console.warn('Data table headers must have a value property that corresponds to a value in the v-model array')

        classes.push('sortable')
        const icon = this.$createElement('v-icon', 'arrow_upward')
        header.left && children.push(icon) || children.unshift(icon)

        beingSorted = this.computedPagination.sortBy === header.value
        beingSorted && classes.push('active')
        beingSorted && this.computedPagination.descending && classes.push('desc') || classes.push('asc')
      }

      header.left && classes.push('text-xs-left') || classes.push('text-xs-right')

      data.class = classes

      return [data, children]
    }
  }
}

export default {
  methods: {
    genTHead () {
      let children = []

      if (this.$scopedSlots.headers) {
        const row = this.$scopedSlots.headers({
          headers: this.headers,
          indeterminate: this.indeterminate,
          all: this.all
        })

        children = this.needsTR(row) ? this.genTR(row) : row
      } else {
        const row = this.headers.map(o => this.genHeader(o))
        const checkbox = this.$createElement('v-checkbox', {
          props: {
            dark: this.dark,
            light: this.light,
            color: this.selectAll === true && '' || this.selectAll,
            hideDetails: true,
            inputValue: this.all,
            indeterminate: this.indeterminate
          },
          on: { change: this.toggle }
        })

        this.hasSelectAll && row.unshift(this.$createElement('th', [checkbox]))

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
      const classes = ['column']
      const data = {}
      const pagination = this.computedPagination

      if ('sortable' in header && header.sortable || !('sortable' in header)) {
        data.on = { click: () => this.sort(header.value) }
        if (!('value' in header)) {
          console.warn('Data table headers must have a value property that corresponds to a value in the v-model array')
        }

        classes.push('sortable')
        const icon = this.$createElement('v-icon', 'arrow_upward')
        if (header.align && header.align === 'left') {
          children.push(icon)
        } else {
          children.unshift(icon)
        }

        const beingSorted = pagination.sortBy === header.value
        if (beingSorted) {
          classes.push('active')
          classes.push(pagination.descending ? 'desc' : 'asc')
        }
      }

      classes.push(`text-xs-${header.align || 'right'}`)
      data.class = classes

      return [data, children]
    }
  }
}

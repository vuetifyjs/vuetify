export default {
  methods: {
    genTHead () {
      if (this.hideHeaders) return // Exit Early since no headers are needed.

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
            color: this.selectAll === true ? '' : this.selectAll,
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
      const data = {
        attrs: {
          role: 'columnheader',
          scope: 'col',
          'aria-label': header[this.headerText] || '',
          'aria-sort': 'none'
        }
      }

      if ('sortable' in header && header.sortable || !('sortable' in header)) {
        this.genHeaderSortingData(header, children, data, classes)
      } else {
        data.attrs['aria-label'] += ': Not sorted.' // TODO: Localization
      }

      classes.push(`text-xs-${header.align || 'right'}`)
      if (Array.isArray(header.class)) {
        classes.push(...header.class)
      } else if (header.class) {
        classes.push(header.class)
      }
      data.class = classes

      return [data, children]
    },
    genHeaderSortingData (header, children, data, classes) {
      if (!('value' in header)) {
        console.warn('Data table headers must have a value property that corresponds to a value in the v-model array')
      }

      data.attrs.tabIndex = 0
      data.on = {
        click: () => {
          this.expanded = []
          this.sort(header.value)
        },
        keydown: e => {
          // check for space
          if (e.keyCode === 32) {
            e.preventDefault()
            this.sort(header.value)
          }
        }
      }

      classes.push('sortable')
      const icon = this.$createElement('v-icon', { attrs: { 'aria-hidden': true } }, 'arrow_upward')
      if (header.align && header.align === 'left') {
        children.push(icon)
      } else {
        children.unshift(icon)
      }

      const pagination = this.computedPagination
      const beingSorted = pagination.sortBy === header.value
      if (beingSorted) {
        classes.push('active')
        if (pagination.descending) {
          classes.push('desc')
          data.attrs['aria-sort'] = 'descending'
          data.attrs['aria-label'] += ': Sorted descending. Activate to remove sorting.' // TODO: Localization
        } else {
          classes.push('asc')
          data.attrs['aria-sort'] = 'ascending'
          data.attrs['aria-label'] += ': Sorted ascending. Activate to sort descending.' // TODO: Localization
        }
      } else {
        data.attrs['aria-label'] += ': Not sorted. Activate to sort ascending.' // TODO: Localization
      }
    }
  }
}

import { consoleWarn } from '../../../util/console'

import VCheckbox from '../../VCheckbox'
import VIcon from '../../VIcon'

export default {
  props: {
    sortIcon: {
      type: String,
      default: '$vuetify.icons.sort'
    }
  },

  methods: {
    genColgroup () {
      return this.$createElement('colgroup', {}, [...this.genCols()])
    },
    genColgroupForFixedHeader () {
      return this.$createElement('colgroup', {}, [
        ...this.genCols(),
        (this.scrollbarWidth > 0) ? this.$createElement('col', {
          attrs: {
            width: this.scrollbarWidth
          }
        }) : undefined
      ])
    },
    genCols () {
      return (this.columnsWidth) ? this.columnsWidth.map(
        colWidth => this.$createElement('col', {
          attrs: {
            width: colWidth
          }
        })
      ) : []
    },
    genFixedHeader () {
      if (!this.fixedHeaderEnabled) return // disabled fixed header if height is not specify

      return this.$createElement('div', {
        'class': { 'v-table__header-wrapper': true }
      }, [
        this.$createElement('table', {
          'class': this.classes
        }, [
          this.genColgroupForFixedHeader(),
          this.genTHead(true)
        ])
      ])
    },
    genDefaultHeader () {
      if (this.height !== undefined) return
      return this.genTHead()
    },
    genTHead (isHeader = false) {
      if (this.hideHeaders) return // Exit Early since no headers are needed.

      let children = []

      if (this.$scopedSlots.headers) {
        const row = this.$scopedSlots.headers({
          headers: this.headers,
          indeterminate: this.indeterminate,
          all: this.everyItem
        })

        children = [this.hasTag(row, 'th') ? this.genTR(row) : row, this.genTProgress()]
      } else {
        const row = this.headers.map(o => this.genHeader(o))
        const checkbox = this.$createElement(VCheckbox, {
          props: {
            dark: this.dark,
            light: this.light,
            color: this.selectAll === true ? '' : this.selectAll,
            hideDetails: true,
            inputValue: this.everyItem,
            indeterminate: this.indeterminate
          },
          on: { change: this.toggle }
        })

        this.hasSelectAll && row.unshift(this.$createElement('th', [ this.genHeaderWrapper([ checkbox ]) ]))

        if (isHeader && this.scrollbarWidth > 0) {
          row.push(this.$createElement('th', [ this.genHeaderWrapper(['']) ]))
        }

        children = [this.genTR(row), this.genTProgress()]
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
        key: header[this.headerText],
        attrs: {
          role: 'columnheader',
          scope: 'col',
          'aria-label': header[this.headerText] || '',
          'aria-sort': 'none'
        }
      }

      if (header.sortable == null || header.sortable) {
        this.genHeaderSortingData(header, children, data, classes)
      } else {
        data.attrs['aria-label'] += ': Not sorted.' // TODO: Localization
      }

      classes.push(`text-xs-${header.align || 'left'}`)
      if (Array.isArray(header.class)) {
        classes.push(...header.class)
      } else if (header.class) {
        classes.push(header.class)
      }
      data.class = classes
      return [data, [ this.genHeaderWrapper(children) ]]
    },
    genHeaderWrapper (children) {
      // for measurement of the actual width of header items
      return this.$createElement(
        'span',
        children
      )
    },
    genHeaderSortingData (header, children, data, classes) {
      if (!('value' in header)) {
        consoleWarn('Headers must have a value property that corresponds to a value in the v-model array', this)
      }

      data.attrs.tabIndex = 0
      data.on = {
        click: () => {
          this.expanded = {}
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
      const icon = this.$createElement(VIcon, {
        props: {
          small: true
        }
      }, this.sortIcon)
      if (!header.align || header.align === 'left') {
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

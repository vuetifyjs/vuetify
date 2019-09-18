// Helpers
import { VNode } from 'vue'
import mixins from '../../util/mixins'
import header, { TableHeader } from './mixins/header'
import { wrapInArray, convertToUnit } from '../../util/helpers'

export default mixins(header).extend({
  name: 'v-data-table-header-desktop',

  methods: {
    genGroupByToggle (header: TableHeader) {
      return this.$createElement('span', {
        on: {
          click: () => this.$emit('group', header.value),
        },
      }, ['group'])
    },
    // eslint-disable-next-line max-statements
    genHeader (header: TableHeader) {
      const listeners: any = {}
      const children = []
      const attrs = {
        role: 'columnheader',
        scope: 'col',
        'aria-label': header.text || '',
        'aria-sort': 'none',
      }

      const styles = {
        width: convertToUnit(header.width),
        minWidth: convertToUnit(header.width),
      }

      const classes = [
        `text-${header.align || 'start'}`,
        ...wrapInArray(header.class),
      ]

      if (header.value === 'data-table-select' && !this.singleSelect) {
        children.push(this.genSelectAll())
      } else {
        children.push(this.$scopedSlots[header.value]
          ? this.$scopedSlots[header.value]!({ header })
          : this.$createElement('span', [header.text])
        )

        if (!this.disableSort && (header.sortable || !header.hasOwnProperty('sortable'))) {
          listeners['click'] = () => this.$emit('sort', header.value)

          const sortIndex = this.options.sortBy.findIndex(k => k === header.value)
          const beingSorted = sortIndex >= 0
          const isDesc = this.options.sortDesc[sortIndex]

          classes.push('sortable')

          if (beingSorted) {
            classes.push('active')
            classes.push(isDesc ? 'desc' : 'asc')

            attrs['aria-sort'] = isDesc ? 'descending' : 'ascending'
            attrs['aria-label'] += isDesc
              ? this.$vuetify.lang.t('$vuetify.dataTable.ariaLabel.sortDescending')
              : this.$vuetify.lang.t('$vuetify.dataTable.ariaLabel.sortAscending')
          } else {
            attrs['aria-label'] += this.$vuetify.lang.t('$vuetify.dataTable.ariaLabel.sortNone')
          }

          if (header.align === 'end') children.unshift(this.genSortIcon())
          else children.push(this.genSortIcon())

          if (this.options.multiSort && beingSorted) {
            children.push(this.$createElement('span', { class: 'v-data-table-header__sort-badge' }, [String(sortIndex + 1)]))
          }
        }

        if (this.showGroupBy) {
          children.push(this.genGroupByToggle(header))
        }
      }

      return this.$createElement('th', {
        attrs,
        class: classes,
        style: styles,
        on: listeners,
      }, children)
    },
  },

  render (): VNode {
    return this.$createElement('thead', {
      staticClass: 'v-data-table-header',
    }, [
      this.$createElement('tr', this.headers.map(header => this.genHeader(header))),
    ])
  },
})

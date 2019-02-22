// Helpers
import { VNode } from 'vue'
import mixins from '../../util/mixins'
import header, { TableHeader } from './mixins/header'
import { getTextAlignment } from '../../util/helpers'

export default mixins(header).extend({
  name: 'v-data-table-header-desktop',

  methods: {
    genGroupByToggle (header: TableHeader) {
      return this.$createElement('span', {
        on: {
          click: () => this.$emit('group', header.value)
        }
      }, ['group'])
    },
    genHeader (header: TableHeader) {
      const listeners: any = {}
      const children = []
      const attrs = {
        role: 'columnheader',
        scope: 'col',
        'aria-label': header.text || '',
        'aria-sort': 'none'
      }

      let classes = {
        [getTextAlignment(header.align, this.$vuetify.rtl)]: true
      }

      if (header.value === 'dataTableSelect') {
        children.push(this.genSelectAll())
      } else {
        children.push(this.$scopedSlots[header.value]
          ? this.$scopedSlots[header.value]!(header)
          : this.$createElement('span', [header.text])
        )

        if (header.sortable || !header.hasOwnProperty('sortable')) {
          listeners['click'] = () => this.$emit('sort', header.value)

          const sortIndex = this.options.sortBy.findIndex(k => k === header.value)
          const beingSorted = sortIndex >= 0
          const isDesc = this.options.sortDesc[sortIndex]

          classes = {
            ...classes,
            'sortable': true,
            'active': beingSorted,
            'asc': beingSorted && !isDesc,
            'desc': beingSorted && isDesc
          }

          if (beingSorted) {
            attrs['aria-sort'] = isDesc ? 'descending' : 'ascending'
            attrs['aria-label'] += isDesc
              ? this.$vuetify.t('$vuetify.dataTable.ariaLabel.sortDescending')
              : this.$vuetify.t('$vuetify.dataTable.ariaLabel.sortAscending')
          } else {
            attrs['aria-label'] += this.$vuetify.t('$vuetify.dataTable.ariaLabel.sortNone')
          }

          if (header.align === 'end') children.unshift(this.genSortIcon())
          else children.push(this.genSortIcon())

          if (this.options.multiSort && beingSorted) {
            children.push(this.$createElement('span', { class: 'badge' }, [String(sortIndex + 1)]))
          }
        }

        if (this.dataTable.showGroupBy) {
          children.push(this.genGroupByToggle(header))
        }
      }

      return this.$createElement('th', {
        attrs,
        class: classes,
        on: listeners
      }, children)
    }
  },

  render (): VNode {
    return this.$createElement('thead', {
      staticClass: 'v-data-table-header'
    }, [
      this.$createElement('tr', this.headers.map(header => this.genHeader(header)))
    ])
  }
})

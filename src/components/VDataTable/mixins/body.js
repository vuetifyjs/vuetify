import ExpandTransitionGenerator from '../../transitions/expand-transition'

export default {
  methods: {
    genTBody () {
      const children = this.genItems()

      return this.$createElement('tbody', children)
    },
    genExpandedRow (props) {
      const children = []

      if (this.isExpanded(props.item)) {
        const expand = this.$createElement('div', {
          class: 'datatable__expand-content',
          key: props.item[this.itemKey]
        }, this.$scopedSlots.expand(props))

        children.push(expand)
      }

      const transition = this.$createElement('transition-group', {
        class: 'datatable__expand-col',
        attrs: { colspan: '100%' },
        props: {
          tag: 'td'
        },
        on: ExpandTransitionGenerator('datatable__expand-col--expanded')
      }, children)

      return this.genTR([transition], { class: 'datatable__expand-row' })
    },
    genFilteredItems () {
      if (!this.$scopedSlots.items) {
        return null
      }

      const rowMultiplier = this.$scopedSlots.expand ? 2 : 1
      const rows = new Array(this.filteredItems.length * rowMultiplier)
      for (let index = 0; index < this.filteredItems.length; ++index) {
        const item = this.filteredItems[index]
        const props = this.createProps(item, index)
        const row = this.$scopedSlots.items(props)

        const rowPosition = index * rowMultiplier
        rows[rowPosition] = this.processRow(row, item, index)

        if (this.$scopedSlots.expand) {
          const expandRow = this.genExpandedRow(props)
          rows[rowPosition + 1] = expandRow
        }
      }

      return rows
    },
    processRow (row, item, index) {
      if (this.needsTR(row)) {
        return this.genTR(row, {
          key: index,
          attrs: { active: this.isSelected(item) }
        })
      }

      for (let childIndex = 0; childIndex < row.length; ++childIndex) {
        const rowChild = row[childIndex]
        rowChild.key = rowChild.key || `${index}:${childIndex}`
      }

      return row
    },
    genEmptyItems (content) {
      return this.genTR([this.$createElement('td', {
        'class': 'text-xs-center',
        attrs: { colspan: '100%' }
      }, content)])
    }
  }
}

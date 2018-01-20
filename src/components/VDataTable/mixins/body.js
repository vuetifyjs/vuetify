import ExpandTransitionGenerator from '../../transitions/expand-transition'

export default {
  methods: {
    genTBody (headersLength) {
      const children = this.genItems(headersLength)

      return this.$createElement('tbody', children)
    },
    genExpandedRow (props, headersLength) {
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
        attrs: { colspan: headersLength },
        props: {
          tag: 'td'
        },
        on: ExpandTransitionGenerator('datatable__expand-col--expanded')
      }, children)

      return this.genTR([transition], { class: 'datatable__expand-row' })
    },
    genFilteredItems (headersLength) {
      if (!this.$scopedSlots.items) {
        return null
      }

      const rows = []
      for (let index = 0, len = this.filteredItems.length; index < len; ++index) {
        const item = this.filteredItems[index]
        const props = this.createProps(item, index)
        const row = this.$scopedSlots.items(props)

        rows.push(this.needsTR(row)
          ? this.genTR(row, {
            key: index,
            attrs: { active: this.isSelected(item) }
          })
          : row)

        if (this.$scopedSlots.expand) {
          const expandRow = this.genExpandedRow(props, headersLength)
          rows.push(expandRow)
        }
      }

      return rows
    },
    genEmptyItems (content, headersLength) {
      if (typeof content === 'string') {
        return this.genTR([this.$createElement('td', {
          'class': 'text-xs-center',
          attrs: { colspan: headersLength }
        }, content)])
      } else {
        return this.needsTR(content) ? this.genTR(content) : content
      }
    }
  }
}

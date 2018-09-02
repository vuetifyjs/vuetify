import ExpandTransitionGenerator from '../../transitions/expand-transition'
import VIcon from '../../VIcon'

/* @vue/component */
export default {
  methods: {
    genTBody () {
      const children = this.genItems()

      return this.$createElement('tbody', children)
    },
    genGroupRow (props) {
      const groupPrefix = 'v-datatable__group'
      const expandIcon = this.$createElement('div', {
        'class': `${groupPrefix}__expand-icon`
      }, [this.$createElement(VIcon, this.expandIcon)])

      const groupContent = this.$createElement('div', {
        'class': `${groupPrefix}-content`
      }, [expandIcon, this.$scopedSlots.group(props)])

      return this.genTR([this.$createElement('td', {
        class: [
          `${groupPrefix}-col`,
          { [`${groupPrefix}-col--active`]: this.activeGroup[props.groupName] }
        ],
        on: {
          click: () => {
            const active = !this.activeGroup[props.groupName]
            this.$set(this.activeGroup, props.groupName, active)
            this.$emit('group', {
              active,
              ...props
            })
          }
        },
        attrs: { colspan: this.headerColumns }
      }, [groupContent])], { 'class': `${groupPrefix}-row` })
    },

    genExpandedRow (props) {
      const children = []

      if (this.isExpanded(props.item)) {
        const expand = this.$createElement('div', {
          class: 'v-datatable__expand-content',
          key: props.item[this.itemKey]
        }, [this.$scopedSlots.expand(props)])

        children.push(expand)
      }

      const transition = this.$createElement('transition-group', {
        class: 'v-datatable__expand-col',
        attrs: { colspan: this.headerColumns },
        props: {
          tag: 'td'
        },
        on: ExpandTransitionGenerator('v-datatable__expand-col--expanded')
      }, children)

      return this.genTR([transition], { class: 'v-datatable__expand-row' })
    },
    genFilteredItems () {
      if (!this.$scopedSlots.items) {
        return null
      }

      const rows = []
      let currentGroup
      for (let index = 0, groupIndex = 0, len = this.filteredItems.length; index < len; ++index) {
        const item = this.filteredItems[index]
        const props = this.createProps(item, index)
        const row = this.$scopedSlots.items(props)

        if (this.$scopedSlots.group && (!this.groupKey || currentGroup !== props.item[this.groupKey])) {
          currentGroup = props.item[this.groupKey]
          const groupProps = { groupName: currentGroup, groupIndex }
          const groupRow = this.genGroupRow(groupProps)
          rows.push(groupRow)
          groupIndex++
        }

        if (this.$scopedSlots.group && !this.activeGroup[currentGroup]) {
          continue
        }

        rows.push(this.hasTag(row, 'td')
          ? this.genTR(row, {
            key: this.itemKey ? props.item[this.itemKey] : index,
            attrs: { active: this.isSelected(item) }
          })
          : row)

        if (this.$scopedSlots.expand) {
          const expandRow = this.genExpandedRow(props)
          rows.push(expandRow)
        }
      }

      return rows
    },
    genEmptyItems (content) {
      if (this.hasTag(content, 'tr')) {
        return content
      } else if (this.hasTag(content, 'td')) {
        return this.genTR(content)
      } else {
        return this.genTR([this.$createElement('td', {
          class: {
            'text-xs-center': typeof content === 'string'
          },
          attrs: { colspan: this.headerColumns }
        }, content)])
      }
    }
  }
}

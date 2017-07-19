export default {
  methods: {
    genMenu () {
      const data = {
        ref: 'menu',
        props: {
          activator: this.$refs.activator,
          auto: this.auto,
          closeOnClick: false,
          closeOnContentClick: !this.multiple,
          contentClass: this.computedContentClass,
          disabled: this.disabled,
          maxHeight: this.maxHeight,
          nudgeTop: this.isDropdown ? 22 : 0,
          offsetY: this.autocomplete || this.offset || this.isDropdown,
          value: this.isActive
        },
        on: { input: val => (this.isActive = val) }
      }

      return this.$createElement('v-menu', data, [this.genList()])
    },
    genSelectionsAndSearch () {
      let input

      if (this.autocomplete || this.editable) {
        input = this.$createElement('input', {
          'class': 'input-group--select__autocomplete',
          domProps: { value: this.searchValue },
          on: { input: e => (this.searchValue = e.target.value) },
          attrs: { tabindex: -1 },
          ref: 'input',
          key: 'input'
        })
      }

      const selections = this.isDirty && (!this.editable || this.editable && !this.focused) ? this.genSelections() : []
      input && selections.push(input)
      const group = this.$createElement('div', selections)

      return this.$createElement('div', {
        'class': 'input-group__selections',
        style: { 'overflow': 'hidden' },
        ref: 'activator'
      }, [group])
    },
    genSelections () {
      const children = []
      const chips = this.chips
      const slots = this.$scopedSlots.selection
      const length = this.selectedItems.length

      this.selectedItems.forEach((item, i) => {
        if (slots) {
          children.push(this.genSlotSelection(item))
        } else if (chips) {
          children.push(this.genChipSelection(item))
        } else {
          children.push(this.genCommaSelection(item, i < length - 1))
        }
      })

      return children
    },
    genSlotSelection (item) {
      return this.$scopedSlots.selection({ parent: this, item })
    },
    genChipSelection (item) {
      return this.$createElement('v-chip', {
        'class': 'chip--select-multi',
        props: { close: true },
        on: {
          input: () => this.selectItem(item),
          click: e => e.stopPropagation()
        },
        key: this.getValue(item)
      }, this.getText(item))
    },
    genCommaSelection (item, comma) {
      return this.$createElement('div', {
        'class': 'input-group__selections__comma',
        key: JSON.stringify(this.getValue(item)) // Item may be an object
      }, `${this.getText(item)}${comma ? ', ' : ''}`)
    },
    genList () {
      const children = this.filteredItems.map(o => {
        if (o.header) return this.genHeader(o)
        if (o.divider) return this.genDivider(o)
        else return this.genTile(o)
      })

      if (!children.length) {
        children.push(this.genTile(this.noDataText, true))
      }

      return this.$createElement('v-card', [
        this.$createElement('v-list', {
          ref: 'list'
        }, children)
      ])
    },
    genHeader (item) {
      return this.$createElement('v-subheader', {
        props: item
      }, item.header)
    },
    genDivider (item) {
      return this.$createElement('v-divider', {
        props: item
      })
    },
    genTile (item, disabled) {
      const active = this.selectedItems.indexOf(item) !== -1
      const data = {
        on: { click: e => this.selectItem(item) },
        props: {
          avatar: item === Object(item) && 'avatar' in item,
          ripple: true,
          value: active
        }
      }

      if (this.$scopedSlots.item) {
        return this.$createElement('v-list-tile', data,
          [this.$scopedSlots.item({ parent: this, item })]
        )
      }

      return this.$createElement('v-list-tile', data,
        [this.genAction(item, active), this.genContent(item)]
      )
    },
    genAction (item, active) {
      if (!this.multiple) return null

      const data = {
        'class': {
          'list__tile__action--select-multi': this.multiple
        },
        on: {
          click: e => {
            e.stopPropagation()
            this.selectItem(item)
          }
        }
      }

      return this.$createElement('v-list-tile-action', data, [
        this.$createElement('v-checkbox', { props: { inputValue: active } })
      ])
    },
    genContent (item) {
      return this.$createElement('v-list-tile-content',
        [this.$createElement('v-list-tile-title', this.getText(item))]
      )
    }
  }
}

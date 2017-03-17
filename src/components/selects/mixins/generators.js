export default {
  methods: {
    genMenu (h) {
      const data = {
        ref: 'menu',
        props: {
          auto: this.auto,
          closeOnClick: !this.multiple,
          disabled: this.disabled,
          offsetY: this.autocomplete || this.offset,
          value: this.menuActive,
          nudgeBottom: 2,
          nudgeTop: -16,
          nudgeYAuto: 2,
          nudgeXAuto: this.multiple ? -40 : -16,
          nudgeWidth: 25,
          maxHeight: this.maxHeight,
          activator: this.$refs.activator
        },
        on: {
          input: val => (this.menuActive = val)
        }
      }

      return h('v-menu', data, [this.genList(h)])
    },
    genSelectionsAndSearch (h) {
      return h('div', {
        'class': 'input-group__selections',
        ref: 'activator'
      }, this.isDirty() ? this.genSelections(h) : null)
    },
    genSelections (h) {
      if (!this.multiple) {
        return [this.genCommaSelection(h, this.inputValue)]
      }

      const children = []
      const chips = this.chips
      const slots = this.$scopedSlots.selection

      this.selectedItems.forEach((item, i) => {
        if (slots) {
          children.push(this.genSlotSelection(h, item))
        } else if (chips) {
          children.push(this.genChipSelection(h, item))
        } else {
          children.push(this.genCommaSelection(h, item))

          if (i < this.inputValue.length - 1) {
            children.push(this.genCommaSelection(h, ', '))
          }
        }
      })

      return children
    },
    genSlotSelection (h, item) {
      return this.$scopedSlots.selection({ parent: this, item })
    },
    genChipSelection (h, item) {
      return h('v-chip', {
        'class': 'chip--select-multi',
        props: { close: true },
        on: { input: () => this.selectItem(item) },
        nativeOn: { click: e => e.stopPropagation() }
      }, this.getText(item))
    },
    genCommaSelection (h, item) {
      return h('div', {
        'class': {
          'input-group__selections__comma': true
        }
      }, this.getText(item))
    },
    genSearchField (h) {
      const data = {
        ref: 'searchField',
        domProps: {
          value: this.inputSearch
        },
        on: {
          input: debounce(e => {
            this.inputSearch = this.autocomplete ? e.target.value : ''
          }, this.debounce),
          focus: this.focus,
          blur: this.blur,
          keyup: e => {
            // Arrow down.
            if (e.keyCode === 40) this.keyUpDown++
            // Arrow up.
            if (e.keyCode === 38) this.keyUpDown--
            // Enter.
            if (e.keyCode === 13) this.selectItem(this.highlighted)
            // Arrow left.
            if (e.keyCode === 37 && !this.inputSearch) this.keyLeftRight++
            // Arrow right.
            if (e.keyCode === 39 && !this.inputSearch) this.keyLeftRight--
            // Backspace.
            if (e.keyCode === 8 && !this.inputSearch) {
              this.keyLeftRight === 0 ? this.keyLeftRight++ : this.selectItem(this.activeSelection)
            }
            // Delete.
            if (e.keyCode === 46 && !this.inputSearch) this.selectItem(this.activeSelection)
          }
        }
      }

      return h('input', data)
    },
    genList (h) {
      return h('v-list', { ref: 'list' }, this.filteredItems.map(o => this.genListItem(h, o)))
    },
    genListItem (h, item) {
      return h('v-list-item', {}, [this.genTile(h, item)])
    },
    genTile (h, item) {
      const active = this.selectedItems.includes(item)
      const data = {
        'class': {
          'list__tile--active': active,
          'list__tile--select-multi': this.multiple
        },
        nativeOn: {
          click: () => this.selectItem(item)
        }
      }

      const scopeData = {
        parent: this,
        item: item
      }

      return this.$scopedSlots.item
        ? h('v-list-tile', data, [this.$scopedSlots.item(scopeData)])
        : h('v-list-tile', data, [this.genAction(h, item, active), this.genContent(h, item)])
    },
    genAction (h, item, active) {
      if (!this.multiple) return null

      const data = {
        'class': {
          'list__tile__action--select-multi': this.multiple
        },
        nativeOn: {
          click: i => this.selectItem(i)
        }
      }

      return h('v-list-tile-action', data, [
        h('v-checkbox', { props: { inputValue: active }})
      ])
    },
    genContent (h, item) {
      return h('v-list-tile-content', {}, [h('v-list-tile-title', this.getText(item))])
    }
  }
}

export default {
  methods: {
    genMenu (h) {
      const data = {
        ref: 'menu',
        props: {
          auto: !this.autocomplete,
          closeOnClick: !this.multiple,
          disabled: this.disabled,
          offsetY: this.autocomplete,
          value: this.menuActive,
          nudgeBottom: 2,
          nudgeTop: -16,
          nudgeYAuto: 2,
          nudgeXAuto: this.multiple ? -40 : -16,
          activator: this.menuActivator,
          maxHeight: this.maxHeight
        },
        on: {
          input: val => (this.menuActive = val)
        }
      }

      return h('v-menu', data, [this.genList(h)])
    },
    genActivator (h) {
      const data = {
        slot: 'activator'
      }
      return h('div', data, [this.genSelectionsAndSearch(h)])
    },
    genSelectionsAndSearch (h) {
      const data = {
        'class': 'input-group__selections'
      }

      if (!this.autocomplete) return h('div', data, this.genSelections(h))
      if (!this.multiple && this.autocomplete) return [this.genSearchField(h)]
      return h('div', data, this.genSelections(h).concat(this.genSearchField(h)))
    },
    genSelections (h) {
      const chips = this.chips
      const slots = this.$scopedSlots.selection
      const comma = true // <-- default

      if (!this.multiple) {
        return this.genCommaSelection(h, this.inputValue, 0)
      }

      return this.inputValue.map((item, index) => {
        if (slots) return this.genSlotSelection(h, item, index)
        if (chips) return this.genChipSelection(h, item, index)
        if (comma) return this.genCommaSelection(h, item, index)
      })
    },
    genSlotSelection (h, item, index) {
      return this.$scopedSlots.selection({ parent: this, item: item, index: index })
    },
    genChipSelection (h, item, index) {
      const data = {
        'class': {
          'chip--select-multi': true
        },
        props: { close: true },
        on: {
          input: val => { if (val === false) this.removeSelected(item) }
        },
        nativeOn: {
          click: e => e.stopPropagation()
        }
      }

      return h('v-chip', data, item[this.itemText])
    },
    genCommaSelection (h, item, index) {
      const comma = index < this.inputCommaCount - 1 ? ',' : ''
      const text = typeof item === 'string' ? item : item[this.itemText]

      const data = {
        'class': {
          'input-group__selections__comma': true,
          'input-group__selections__comma--active': this.isActiveSelection(item)
        }
      }

      return h('div', data, 'test')
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
            if (e.keyCode === 13) this.addSelected(this.highlighted)
            // Arrow left.
            if (e.keyCode === 37 && !this.inputSearch) this.keyLeftRight++
            // Arrow right.
            if (e.keyCode === 39 && !this.inputSearch) this.keyLeftRight--
            // Backspace.
            if (e.keyCode === 8 && !this.inputSearch) {
              this.keyLeftRight === 0 ? this.keyLeftRight++ : this.removeSelected(this.activeSelection)
            }
            // Delete.
            if (e.keyCode === 46 && !this.inputSearch) this.removeSelected(this.activeSelection)
          }
        }
      }

      return h('input', data)
    },
    genList (h) {
      const noResultsFound = this.inputSearch && !this.filteredItems
      let list

      if (noResultsFound) {
        list = [this.genNoResultsFound(h)]
      } else {
        list = (this.filteredItems).map((item, index, items) => {
          const prevItem = items[index - 1] || null
          return this.genListItem(h, item, prevItem)
        })
      }

      return h('v-list', {}, list)
    },
    genListItem (h, item, prevItem) {
      const group = item[this.itemGroup]
      const prevGroup = prevItem ? prevItem[this.itemGroup] : null
      const isNewGroup = group && group !== prevGroup
      const listItem = h('v-list-item', {}, [this.genTile(h, item, prevItem)])

      // Check for option groups.
      if (isNewGroup) {
        return [h('v-subheader', {}, group), listItem]
      }

      return listItem
    },
    genTile (h, item, prevItem) {
      const data = {
        'class': {
          'list__tile--active': this.isSelected(item),
          'list__tile--select-multi': this.multiple,
          'list__tile--highlighted': this.isHighlighted(item)
        },
        nativeOn: {
          click: e => { this.addSelected(item) }
        }
      }

      const scopeData = {
        parent: this,
        item: item,
        prevItem: prevItem
      }

      return this.$scopedSlots.item
        ? h('v-list-tile', data, [this.$scopedSlots.item(scopeData)])
        : h('v-list-tile', data, [this.genAction(h, item), this.genContent(h, item)])
    },
    genAction (h, item) {
      if (!this.multiple) return null

      const data = {
        'class': {
          'list__tile__action--select-multi': this.multiple
        }
      }

      const checkbox = h('v-checkbox', { props: { 'inputValue': this.isSelected(item) }})
      return h('v-list-tile-action', data, [checkbox])
    },
    genNoResultsFound (h) {
      const text = this.noResultsFoundText
      const content = h('v-list-tile-content', {}, [h('v-list-tile-title', {}, text)])
      const tile = h('v-list-tile', [content])

      return h('v-list-item', [tile])
    },
    genContent (h, item) {
      return h('v-list-tile-content', {}, [h('v-list-tile-title', item[this.itemText])])
    }
  }
}

export default {
  methods: {
    genMenu () {
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
        on: { input: val => (this.menuActive = val) }
      }

      return this.$createElement('v-menu', data, [this.genList()])
    },
    genSelectionsAndSearch () {
      const group = this.$createElement('transition-group', {
        props: {
          name: 'slide-y-reverse-transition',
          tag: 'div'
        },
      }, this.isDirty ? this.genSelections() : null)

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
        on: { input: () => this.selectItem(item) },
        nativeOn: { click: e => e.stopPropagation() },
        key: item
      }, this.getText(item))
    },
    genCommaSelection (item, comma) {
      return this.$createElement('div', {
        'class': 'input-group__selections__comma',
        key: item
      }, `${this.getText(item)}${comma ? ', ' : ''}`)
    },
    genList () {
      return this.$createElement('v-list', {
        ref: 'list'
      }, this.filteredItems.map(o => {
        if (o.header) return this.genHeader(o)
        if (o.divider) return this.genDivider(o)
        else return this.genListItem(o)
      }))
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
    genListItem (item) {
      return this.$createElement('v-list-item', [this.genTile(item)])
    },
    genTile (item) {
      const active = this.selectedItems.indexOf(item) !== -1
      const data = {
        'class': {
          'list__tile--active': active,
          'list__tile--select-multi': this.multiple
        },
        nativeOn: { click: () => this.selectItem(item) }
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
        nativeOn: { click: () => this.selectItem(item) }
      }

      return this.$createElement('v-list-tile-action', data, [
        this.$createElement('v-checkbox', { props: { inputValue: active }})
      ])
    },
    genContent (item) {
      return this.$createElement('v-list-tile-content',
        [this.$createElement('v-list-tile-title', this.getText(item))]
      )
    }
  }
}

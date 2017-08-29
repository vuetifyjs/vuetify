import { getObjectValueByPath } from '../../../util/helpers'

export default {
  methods: {
    genMenu () {
      const offsetY = this.isAutocomplete || this.offset || this.isDropdown
      const data = {
        ref: 'menu',
        props: {
          activator: this.$refs.activator,
          allowOverflow: this.isAutocomplete,
          openOnClick: false,
          auto: this.auto,
          closeOnClick: false,
          closeOnContentClick: !this.multiple,
          contentClass: this.computedContentClass,
          disabled: this.disabled,
          maxHeight: this.maxHeight,
          nudgeTop: this.isDropdown ? -12 : offsetY ? -2 : 0,
          nudgeRight: this.isDropdown ? 16 : 0,
          nudgeWidth: this.isDropdown ? 56 : 24,
          offsetY,
          value: this.isActive && this.computedItems.length,
          zIndex: this.menuZIndex
        },
        on: { input: val => (this.isActive = val) }
      }

      this.minWidth && (data.props.minWidth = this.minWidth)

      return this.$createElement('v-menu', data, [this.genList()])
    },
    genSelectionsAndSearch () {
      let input

      if (this.isAutocomplete) {
        input = this.$createElement('input', {
          'class': 'input-group--select__autocomplete',
          style: {
            flex: this.shouldBreak ? '1 0 100%' : null
          },
          attrs: {
            ...this.$attrs,
            tabindex: this.disabled ? -1 : 0
          },
          domProps: { value: this.lazySearch },
          on: {
            focus: this.focus,
            blur: () => {
              if (this.isActive) return

              this.blur()
            },
            input: e => (this.searchValue = e.target.value)
          },
          ref: 'input',
          key: 'input'
        })
      }

      const selections = this.genSelections()

      input && selections.push(input)

      return this.$createElement('div', {
        'class': 'input-group__selections',
        style: { 'overflow': 'hidden' },
        ref: 'activator'
      }, [selections])
    },
    genSelections () {
      if (this.isAutocomplete && !this.multiple) return []

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

      if (typeof disabled === 'undefined') {
        disabled = getObjectValueByPath(item, this.itemDisabled)
      }

      const data = {
        on: {
          click: e => {
            if (disabled) return

            this.selectItem(item)
          }
        },
        props: {
          avatar: item === Object(item) && 'avatar' in item,
          ripple: true,
          value: active
        }
      }

      if (disabled) {
        data.props.disabled = disabled
      }

      if (this.$scopedSlots.item) {
        return this.$createElement('v-list-tile', data,
          [this.$scopedSlots.item({ parent: this, item })]
        )
      }

      return this.$createElement('v-list-tile', data,
        [this.genAction(item, active && !disabled), this.genContent(item)]
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

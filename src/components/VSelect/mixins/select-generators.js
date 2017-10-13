import { getObjectValueByPath } from '../../../util/helpers'

/**
 * Select generators
 *
 * @mixin
 *
 * Used for creating the DOM elements for VSelect
 */
export default {
  methods: {
    genMenu () {
      const offsetY = this.isAutocomplete || this.offset || this.isDropdown
      let nudgeTop = 0

      if (this.auto) nudgeTop = -18
      else if (this.solo) nudgeTop = 0
      else if (this.isDropdown) nudgeTop = 26
      else if (offsetY) nudgeTop = 24

      const data = {
        ref: 'menu',
        props: {
          activator: this.$el,
          auto: this.auto,
          closeOnClick: false,
          closeOnContentClick: !this.isMultiple,
          contentClass: this.computedContentClass,
          disabled: this.disabled,
          maxHeight: this.maxHeight,
          nudgeTop,
          offsetY,
          offsetOverflow: this.isAutocomplete,
          openOnClick: false,
          value: this.menuIsActive &&
            (!this.tags || this.filteredItems.length > 0) &&
            (!this.combobox || this.filteredItems.length > 0),
          zIndex: this.menuZIndex
        },
        on: {
          input: val => {
            if (!val) {
              this.menuIsActive = false
            }
          }
        }
      }

      if (this.isAutocomplete) data.props.transition = ''

      this.minWidth && (data.props.minWidth = this.minWidth)

      return this.$createElement('v-menu', data, [this.genList()])
    },
    genSelectionsAndSearch () {
      return this.$createElement('div', {
        'class': 'input-group__selections',
        style: { 'overflow': 'hidden' },
        ref: 'activator'
      }, [
        ...this.genSelections(),
        this.genSearch()
      ])
    },
    genSelections () {
      if (this.hideSelections) return []

      const children = []
      const chips = this.chips
      const slots = this.$scopedSlots.selection
      const length = this.selectedItems.length
      this.selectedItems.forEach((item, i) => {
        if (slots) {
          children.push(this.genSlotSelection(item, i))
        } else if (chips) {
          children.push(this.genChipSelection(item, i))
        } else if (this.segmented) {
          children.push(this.genSegmentedBtn(item, i))
        } else {
          children.push(this.genCommaSelection(item, i < length - 1, i))
        }
      })

      return children
    },
    genSearch () {
      const data = {
        staticClass: 'input-group--select__autocomplete',
        'class': {
          'input-group--select__autocomplete--index': this.selectedIndex > -1
        },
        style: {
          flex: this.shouldBreak ? '1 0 100%' : null
        },
        attrs: {
          ...this.$attrs,
          disabled: this.disabled || !this.isAutocomplete,
          readonly: this.readonly,
          tabindex: this.disabled || !this.isAutocomplete ? -1 : this.tabindex
        },
        domProps: {
          value: this.maskText(this.lazySearch || '')
        },
        directives: [{
          name: 'show',
          value: (this.isAutocomplete) ||
            (this.placeholder && !this.selectedItems.length)
        }],
        ref: 'input',
        key: 'input'
      }

      if (this.isAutocomplete) {
        data.attrs.role = 'combobox'
        data.domProps.autocomplete = this.browserAutocomplete

        data.on = {
          ...this.genListeners(),
          input: e => {
            this.searchValue = this.unmaskText(e.target.value)
          }
        }

        if (this.combobox) {
          // When using the combobox
          // update inputValue and
          // set the menu status
          data.on.blur = () => {
            this.inputValue = this.lazySearch
          }
        }

        data.directives = data.directives.concat(this.genDirectives())
      }

      if (this.placeholder) data.domProps.placeholder = this.placeholder

      return this.$createElement('input', data)
    },
    genSegmentedBtn (item) {
      if (!item.text || !item.callback) {
        console.warn('[Vuetify] Warn: When using the v-select component with \'segmented\' prop without a selection slot, items must contain both a text and callback property')
        return null
      }

      return this.$createElement('v-btn', {
        props: {
          flat: true
        },
        on: {
          click (e) {
            e.stopPropagation()
            item.callback(e)
          }
        }
      }, [item.text])
    },
    genSlotSelection (item, index) {
      return this.$scopedSlots.selection({
        parent: this,
        item,
        index,
        selected: index === this.selectedIndex,
        disabled: this.disabled || this.readonly
      })
    },
    genChipSelection (item, index) {
      const isDisabled = this.disabled || this.readonly
      const click = e => {
        if (isDisabled) return

        e.stopPropagation()
        this.focus()
        this.selectedIndex = index
      }

      return this.$createElement('v-chip', {
        staticClass: 'chip--select-multi',
        attrs: { tabindex: '-1' },
        props: {
          close: !isDisabled,
          dark: this.dark,
          disabled: isDisabled,
          selected: index === this.selectedIndex
        },
        on: {
          click: click,
          focus: click,
          input: () => this.selectItem(item)
        },
        key: this.getValue(item)
      }, this.getText(item))
    },
    genCommaSelection (item, comma, index) {
      return this.$createElement('div', {
        staticClass: 'input-group__selections__comma',
        'class': {
          'input-group__selections__comma--active': index === this.selectedIndex
        },
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
        const noData = this.$slots['no-data']
        if (noData) {
          children.push(noData)
        } else {
          children.push(this.genTile(this.noDataText, true))
        }
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
          avatar: item === Object(item) && this.itemAvatar in item,
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
        [this.genAction(item, active), this.genContent(item)]
      )
    },
    genAction (item, active) {
      if (!this.isMultiple) return null

      const data = {
        staticClass: 'list__tile__action--select-multi',
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
      const text = this.getText(item)

      return this.$createElement('v-list-tile-content',
        [this.$createElement('v-list-tile-title', {
          domProps: {
            innerHTML: this.genFiltered(text)
          }
        })]
      )
    }
  }
}

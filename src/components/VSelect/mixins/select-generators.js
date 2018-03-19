import { getObjectValueByPath } from '../../../util/helpers'
import { consoleWarn } from '../../../util/console'

// Components
import VBtn from '../../VBtn'
import VCard from '../../VCard'
import VCheckbox from '../../VCheckbox'
import VChip from '../../VChip'
import VDivider from '../../VDivider'
import VMenu from '../../VMenu'
import VSubheader from '../../VSubheader'
import {
  VList,
  VListTile,
  VListTileAction,
  VListTileContent,
  VListTileTitle
} from '../../VList'

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
      const data = {
        ref: 'menu',
        props: {
          activator: this.$el,
          auto: this.auto,
          attach: this.attach && `[data-uid="${this._uid}"]`,
          closeOnClick: false,
          closeOnContentClick: !this.isMultiple,
          contentClass: this.computedContentClass,
          dark: this.dark,
          disabled: this.disabled,
          light: this.light,
          maxHeight: this.maxHeight,
          nudgeTop: this.nudgeTop,
          offsetY: this.shouldOffset,
          offsetOverflow: this.isAutocomplete,
          openOnClick: false,
          value: this.menuIsVisible,
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

      if (this.isAutocomplete) data.props.transition = false

      this.minWidth && (data.props.minWidth = this.minWidth)

      return this.$createElement(VMenu, data, [this.genList()])
    },
    getMenuIndex () {
      return this.$refs.menu ? this.$refs.menu.listIndex : -1
    },
    setMenuIndex (index) {
      this.$refs.menu && (this.$refs.menu.listIndex = index)
    },
    resetMenuIndex () {
      this.setMenuIndex(-1)
    },
    isMenuItemSelected () {
      return this.menuIsActive && this.menuItems.length && this.getMenuIndex() > -1
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

      let length = this.selectedItems.length
      const children = new Array(length)

      let genSelection
      if (this.$scopedSlots.selection) {
        genSelection = this.genSlotSelection
      } else if (this.chips) {
        genSelection = this.genChipSelection
      } else if (this.segmented) {
        genSelection = this.genSegmentedBtn
      } else {
        genSelection = this.genCommaSelection
      }

      while (length--) {
        children[length] = genSelection(this.selectedItems[length], length, length === children.length - 1)
      }

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
            if (this.selectedIndex > -1) return

            this.searchValue = this.unmaskText(e.target.value)
          }
        }

        data.directives = data.directives.concat(this.genDirectives())
      }

      if (this.placeholder) data.domProps.placeholder = this.placeholder

      return this.$createElement('input', data)
    },
    genSegmentedBtn (item) {
      if (!item.text || !item.callback) {
        consoleWarn('When using \'segmented\' prop without a selection slot, items must contain both a text and callback property', this)
        return null
      }

      return this.$createElement(VBtn, {
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
        this.focusInput()
        this.selectedIndex = index
      }

      return this.$createElement(VChip, {
        staticClass: 'chip--select-multi',
        attrs: { tabindex: '-1' },
        props: {
          close: this.deletableChips && !isDisabled,
          dark: this.dark,
          disabled: isDisabled,
          selected: index === this.selectedIndex
        },
        on: {
          click: click,
          focus: click,
          input: () => {
            if (this.isMultiple) this.selectItem(item)
            else this.inputValue = null
          }
        },
        key: this.getValue(item)
      }, this.getText(item))
    },
    genCommaSelection (item, index, last) {
      return this.$createElement('div', {
        staticClass: 'input-group__selections__comma',
        'class': {
          'input-group__selections__comma--active': index === this.selectedIndex
        },
        key: JSON.stringify(this.getValue(item)) // Item may be an object
      }, `${this.getText(item)}${last ? '' : ', '}`)
    },
    genList () {
      const children = this.menuItems.map(o => {
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

      return this.$createElement(VCard, [
        this.$createElement(VList, {
          props: {
            dense: this.dense
          },
          ref: 'list'
        }, children)
      ])
    },
    genHeader (item) {
      return this.$createElement(VSubheader, {
        props: item
      }, item.header)
    },
    genDivider (item) {
      return this.$createElement(VDivider, {
        props: item
      })
    },
    genLabel () {
      const singleLine = this.singleLine || this.isDropdown

      if (singleLine &&
        (this.isDirty || (this.isFocused && this.searchValue))
      ) return null

      const data = {}

      if (this.id) data.attrs = { for: this.id }

      return this.$createElement('label', data, this.$slots.label || this.label)
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

      data.props.activeClass = Object.keys(this.addTextColorClassChecks()).join(' ')

      if (this.$scopedSlots.item) {
        const tile = this.$scopedSlots.item({ parent: this, item, tile: data })
        return this.needsTile(tile)
          ? this.$createElement(VListTile, data, [tile])
          : tile
      }

      return this.$createElement(VListTile, data,
        [this.genAction(item, active), this.genContent(item)]
      )
    },
    genAction (item, active) {
      if (!this.isMultiple || this.isHidingSelected) return null

      const data = {
        staticClass: 'list__tile__action--select-multi',
        on: {
          click: e => {
            e.stopPropagation()
            this.selectItem(item)
          }
        }
      }

      return this.$createElement(VListTileAction, data, [
        this.$createElement(VCheckbox, {
          props: {
            color: this.computedColor,
            inputValue: active
          }
        })
      ])
    },
    genContent (item) {
      const text = this.getText(item)

      return this.$createElement(VListTileContent,
        [this.$createElement(VListTileTitle, {
          domProps: {
            innerHTML: this.genFiltered(text)
          }
        })]
      )
    }
  }
}

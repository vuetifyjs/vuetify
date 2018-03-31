// Styles
import '../../stylus/components/_text-fields.styl'
import '../../stylus/components/_select.styl'

// Components
import VCard from '../VCard'
import VCheckbox from '../VCheckbox'
import VChip from '../VChip'
import VDivider from '../VDivider'
import VMenu from '../VMenu'
import VSubheader from '../VSubheader'
import {
  VList,
  VListTile,
  VListTileAction,
  VListTileContent,
  VListTileTitle
} from '../VList'

// Extensions
import VTextField from '../VTextField/VTextField'

// Mixins
import Dependent from '../../mixins/dependent'

// Directives
import ClickOutside from '../../directives/click-outside'

// Helpers
import {
  escapeHTML,
  getObjectValueByPath
} from '../../util/helpers'

export default {
  name: 'v-select',

  extends: VTextField,

  directives: {
    ClickOutside
  },

  mixins: [
    Dependent
  ],

  data: vm => ({
    cachedItems: vm.cacheItems ? vm.items : [],
    isMenuActive: false,
    selectedIndex: null
  }),

  props: {
    ...VMenu.props, // remove some, just for testing,
    appendIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    appendIconCb: Function,
    attach: Boolean,
    auto: Boolean,
    autocomplete: Boolean,
    browserAutocomplete: {
      type: String,
      default: 'on'
    },
    cacheItems: Boolean,
    chips: Boolean,
    clearable: Boolean,
    combobox: Boolean,
    contentClass: String,
    deletableChips: Boolean,
    dense: Boolean,
    editable: Boolean,
    hideSelected: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    itemAvatar: {
      type: String,
      default: 'avatar'
    },
    itemDisabled: {
      type: String,
      default: 'disabled'
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    maxHeight: {
      type: [Number, String],
      default: 300
    },
    minWidth: {
      type: [Boolean, Number, String],
      default: false
    },
    multiple: Boolean,
    multiLine: Boolean,
    openOnClear: Boolean,
    overflow: Boolean,
    returnObject: Boolean,
    searchInput: {
      default: null
    },
    segmented: Boolean,
    singleLine: Boolean,
    tags: Boolean,
    valueComparator: {
      type: Function,
      default: (a, b) => {
        if (a !== Object(a)) return a === b
        const aProps = Object.keys(a)
        const bProps = Object.keys(b)
        return aProps.length === bProps.length && aProps.every(propName => (a[propName] === b[propName]))
      }
    }
  },

  computed: {
    classes () {
      return {
        'v-select v-input--text': true,
        'v-select--chips': this.chips,
        'v-select--is-menu-active': this.isMenuActive
      }
    },
    computedItems () {
      return this.filterDuplicates(this.cachedItems.concat(this.items))
    },
    directives () {
      return [{
        name: 'click-outside',
        value: () => {
          this.selectedIndex = null
          this.onKeyDown({ keyCode: 9 })
        },
        args: {
          closeConditional: () => {
            return true
          }
        }
      }]
    },
    dynamicHeight () {
      return this.chips ? 'auto' : '32px'
    },
    isDirty () {
      return this.selectedItems.length > 0
    },
    isDisabled () {
      return this.disabled || this.readonly
    },
    // Convert internalValue to always
    // be an array and check for validity
    selectedItems () {
      const val = this.internalValue

      let selectedItems = this.computedItems.filter(i => {
        if (!this.multiple) {
          return this.getValue(i) === this.getValue(val)
        } else {
          // Always return Boolean
          return this.findExistingIndex(i, this.internalValue) > -1
        }
      })

      return selectedItems
    },
    tileActiveClass () {
      return Object.keys(this.addTextColorClassChecks()).join(' ')
    }
  },

  methods: {
    changeSelectedIndex (keyCode) {
      // backspace, left, right, delete
      if (![8, 37, 39, 46].includes(keyCode)) return

      const indexes = this.selectedItems.length - 1

      if (keyCode === 37) { // Left arrow
        this.selectedIndex = this.selectedIndex === -1
          ? indexes
          : this.selectedIndex - 1
      } else if (keyCode === 39) { // Right arrow
        this.selectedIndex = this.selectedIndex >= indexes
          ? -1
          : this.selectedIndex + 1
      } else if (this.selectedIndex === -1) {
        this.selectedIndex = indexes
        return
      }

      // backspace/delete
      if ([8, 46].includes(keyCode)) {
        const newIndex = this.selectedIndex === indexes
          ? this.selectedIndex - 1
          : this.selectedItems[this.selectedIndex + 1]
            ? this.selectedIndex
            : -1

        this.selectItem(this.selectedItems[this.selectedIndex])
        this.selectedIndex = newIndex
      }
    },
    clearableCallback () {
      this.internalValue = this.multiple ? [] : null
      this.$emit('change', this.internalValue)
      this.$nextTick(() => this.$refs.input.focus())

      if (this.openOnClear) this.isMenuActive = true
    },
    filterDuplicates (arr) {
      const uniqueValues = new Map()
      for (let index = 0; index < arr.length; ++index) {
        const item = arr[index]
        const val = this.getValue(item)

        !uniqueValues.has(val) && uniqueValues.set(val, item)
      }
      return Array.from(uniqueValues.values())
    },
    findExistingIndex (item, internalValue) {
      const itemValue = this.getValue(item)

      return (internalValue || []).findIndex(i => this.valueComparator(this.getValue(i), itemValue))
    },
    genAction (item, inputValue) {
      if (!this.multiple || this.isHidingSelected) return null

      const data = {
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
            inputValue
          }
        })
      ])
    },
    genChipSelection (item, index) {
      const isDisabled = this.disabled || this.readonly
      const click = e => {
        if (isDisabled) return

        e.stopPropagation()
        this.selectedIndex = index
        this.onFocus()
      }

      return this.$createElement(VChip, {
        staticClass: 'chip--select-multi',
        attrs: {
          tabindex: this.isFocused ? null : '-1'
        },
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
            if (this.multiple) this.selectItem(item)
            else this.inputValue = null

            // If all items have been deleted,
            // open `v-menu`
            if (this.selectedItems.length === 0) {
              this.isMenuActive = true
            }
          }
        },
        key: this.getValue(item)
      }, this.getText(item))
    },
    genClearIcon () {
      if (!this.clearable ||
        !this.isDirty
      ) return null

      return this.genSlot('append', 'inner', [
        this.genIcon('clear', this.clearableCallback || this.clearIconCb)
      ])
    },
    genCommaSelection (item, index, last) {
      // Item may be an object
      const key = JSON.stringify(this.getValue(item))

      return this.$createElement('div', {
        staticClass: 'v-select__selection',
        key
      }, `${this.getText(item)}${last ? '' : ', '}`)
    },
    genDefaultSlot () {
      const activator = this.$createElement('div', {
        staticClass: 'v-select__slot',
        directives: this.directives,
        slot: 'activator'
      }, [
        this.genLabel(),
        this.prefix ? this.genAffix('prefix') : null,
        this.genSelections(),
        this.genInput(),
        this.suffix ? this.genAffix('suffix') : null,
        this.genClearIcon(),
        this.genSlot('append', 'inner', [this.genIcon('append')]),
        this.genProgress()
      ])

      return [this.genMenu(activator)]
    },
    genDivider (props) {
      return this.$createElement(VDivider, { props })
    },
    genHeader (props) {
      return this.$createElement(VSubheader, { props }, props.header)
    },
    genList () {
      const children = this.items.map(o => {
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

      return this.$createElement(VCard, {
        props: {
          dark: this.dark,
          light: this.light
        }
      }, [
        this.$createElement(VList, {
          props: { dense: this.dense },
          ref: 'list'
        }, children)
      ])
    },
    genMenu (activator) {
      const props = {
        contentClass: this.contentClass
      }

      // Later this might be filtered
      for (let prop of Object.keys(VMenu.props)) {
        props[prop] = this[prop]
      }

      props.closeOnContentClick = false
      props.value = this.isMenuActive

      return this.$createElement(VMenu, {
        props,
        on: {
          input: val => {
            this.isMenuActive = val
            this.isFocused = false
          }
        },
        ref: 'menu'
      }, [activator, this.genList()])
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
      } else {
        genSelection = this.genCommaSelection
      }

      while (length--) {
        children[length] = genSelection(
          this.selectedItems[length],
          length,
          length === children.length - 1
        )
      }

      return children
    },
    genTile (
      item,
      disabled,
      avatar = false,
      value = this.selectedItems.indexOf(item) !== -1
    ) {
      if (item === Object(item)) {
        avatar = this.getAvatar(item)
        disabled = disabled != null
          ? disabled
          : this.getDisabled(item)
      }

      const tile = {
        on: {
          click: () => {
            if (disabled) return

            this.selectItem(item)
          }
        },
        props: {
          activeClass: this.tileActiveClass,
          avatar,
          disabled,
          ripple: true,
          value
        }
      }

      if (!this.$scopedSlots.item) {
        return this.$createElement(VListTile, tile,
          [
            this.genAction(item, value),
            this.genTileContent(item)
          ]
        )
      }

      const parent = this
      const scopedSlot = this.$scopedSlots.item({ parent, item, tile })

      return this.needsTile(scopedSlot)
        ? this.$createElement(VListTile, tile, [scopedSlot])
        : scopedSlot
    },
    genTileContent (item) {
      const innerHTML = escapeHTML((this.getText(item) || '').toString())

      return this.$createElement(VListTileContent,
        [this.$createElement(VListTileTitle, {
          domProps: { innerHTML }
        })]
      )
    },
    getAvatar (item) {
      return getObjectValueByPath(item, this.itemAvatar)
    },
    getDisabled (item) {
      return getObjectValueByPath(item, this.itemDisabled)
    },
    getText (item) {
      return this.getPropertyFromItem(item, this.itemText)
    },
    getValue (item) {
      return this.getPropertyFromItem(item, this.itemValue)
    },
    getPropertyFromItem (item, field) {
      if (item !== Object(item)) return item

      const value = getObjectValueByPath(item, field)

      return typeof value === 'undefined' ? item : value
    },
    needsTile (tile) {
      return tile.componentOptions == null ||
        tile.componentOptions.Ctor.options.name !== 'v-list-tile'
    },
    // Ignore default onBlur
    onBlur () {},
    // Detect tab and call original onBlur method
    onKeyDown (e) {
      if (e.keyCode === 9) {
        VTextField.methods.onBlur.call(this, e)
      } else if ([13, 32, 38, 40].includes(e.keyCode)) {
        this.isMenuActive = true
      }

      this.changeSelectedIndex(e.keyCode)
    },
    onClick () {
      if (this.isDisabled) return

      this.isMenuActive = true
      this.onFocus()
    },
    selectItem (item) {
      if (!this.multiple) {
        this.internalValue = this.returnObject ? item : this.getValue(item)
        this.isMenuActive = false
      } else {
        const internalValue = this.selectedItems.slice()
        const i = this.findExistingIndex(item, internalValue)

        i !== -1 ? internalValue.splice(i, 1) : internalValue.push(item)
        this.internalValue = internalValue.map(i => {
          return this.returnObject ? i : this.getValue(i)
        })
      }

      this.$emit('change', this.internalValue)
    }
  }
}

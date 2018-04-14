// Styles
import '../../stylus/components/_text-fields.styl'
import '../../stylus/components/_select.styl'

// Components
import VChip from '../VChip'
import VMenu from '../VMenu'
import VSelectList from './VSelectList'

// Extensions
import VTextField from '../VTextField/VTextField'

// Mixins
import Comparable from '../../mixins/comparable'
import Dependent from '../../mixins/dependent'
import Filterable from '../../mixins/filterable'
import Menuable from '../../mixins/menuable'

// Directives
import ClickOutside from '../../directives/click-outside'

// Helpers
import { getPropertyFromItem } from '../../util/helpers'

export default {
  name: 'v-select',

  extends: VTextField,

  directives: {
    ClickOutside
  },

  mixins: [
    Comparable,
    Dependent,
    Filterable
  ],

  data: vm => ({
    cachedItems: vm.cacheItems ? vm.items : [],
    isMenuActive: false,
    selectedIndex: null
  }),

  props: {
    ...VMenu.props, // remove some, just for testing,
    ...Menuable.props,
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
      type: [String, Array, Function],
      default: 'avatar'
    },
    itemDisabled: {
      type: [String, Array, Function],
      default: 'disabled'
    },
    itemText: {
      type: [String, Array, Function],
      default: 'text'
    },
    itemValue: {
      type: [String, Array, Function],
      default: 'value'
    },
    maxHeight: {
      type: [Number, String],
      default: 300
    },
    minWidth: {
      type: [Boolean, Number, String],
      default: 0
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
    tags: Boolean
  },

  computed: {
    classes () {
      return Object.assign({}, VTextField.computed.classes.call(this), {
        'v-select': true,
        'v-select--chips': this.chips,
        'v-select--is-menu-active': this.isMenuActive
      })
    },
    computedItems () {
      return this.filterDuplicates(this.cachedItems.concat(this.items))
    },
    directives () {
      return [{
        name: 'click-outside',
        value: () => {
          this.isMenuActive = false
          this.isFocused = false
          this.selectedIndex = null
          this.onKeyDown({ keyCode: 9 })
        },
        args: {
          closeConditional: e => {
            return !this.$refs.menu.$refs.content.contains(e.target) &&
              !this.$el.contains(e.target) &&
              e.target !== this.$el
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
          return this.valueComparator(this.getValue(i), this.getValue(val))
        } else {
          // Always return Boolean
          return this.findExistingIndex(i, this.internalValue) > -1
        }
      })

      return selectedItems
    }
  },

  watch: {
    items (val) {
      if (this.cacheItems) {
        this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val))
      }
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

        // TODO: comparator
        !uniqueValues.has(val) && uniqueValues.set(val, item)
      }
      return Array.from(uniqueValues.values())
    },
    findExistingIndex (item, internalValue) {
      const itemValue = this.getValue(item)

      return (internalValue || []).findIndex(i => this.valueComparator(this.getValue(i), itemValue))
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
            else this.internalValue = null

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
        this.genIcon('clear', this.clearIconCb || this.clearableCallback)
      ])
    },
    genCommaSelection (item, index, last) {
      // Item may be an object
      // TODO: Remove JSON.stringify
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
    genList () {
      return this.$createElement(VSelectList, {
        props: {
          action: this.multiple && !this.isHidingSelected,
          color: this.color,
          dark: this.dark,
          dense: this.dense,
          items: this.items,
          light: this.light,
          noDataText: this.noDataText,
          selectedItems: this.selectedItems,
          itemAvatar: this.itemAvatar,
          itemDisabled: this.itemDisabled,
          itemValue: this.itemValue,
          itemText: this.itemText
        },
        on: {
          select: this.selectItem
        },
        scopedSlots: {
          item: this.$scopedSlots.item
        }
      }, [
        this.$slots['no-data'] ? this.$createElement('div', {
          slot: 'no-data'
        }, this.$slots['no-data']) : null
      ])
    },
    genMenu (activator) {
      const props = {
        contentClass: this.contentClass
      }
      const inheritedProps = Object.keys(VMenu.props).concat(Object.keys(Menuable.props))

      // Later this might be filtered
      for (let prop of inheritedProps) {
        props[prop] = this[prop]
      }

      props.closeOnClick = false
      props.closeOnContentClick = false
      props.value = this.isMenuActive

      return this.$createElement(VMenu, {
        props,
        on: {
          input: val => {
            this.isMenuActive = val
            this.isFocused = val
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
    getText (item) {
      return getPropertyFromItem(item, this.itemText, item)
    },
    getValue (item) {
      return getPropertyFromItem(item, this.itemValue, item)
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

      if (this.chips || this.multiple) {
        this.changeSelectedIndex(e.keyCode)
      }
    },
    onClick () {
      if (this.isDisabled) return

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

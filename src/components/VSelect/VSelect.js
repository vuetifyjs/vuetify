require('../../stylus/components/_text-fields.styl')
require('../../stylus/components/_input-groups.styl')
require('../../stylus/components/_select.styl')

// Components
import VBtn from '../VBtn'
import VCard from '../VCard'
import VCheckbox from '../VCheckbox'
import VChip from '../VChip'
import {
  VList,
  VListTile,
  VListTileAction,
  VListTileContent,
  VListTileTitle
} from '../VList'
import VMenu from '../VMenu'

// Mixins
import Colorable from '../../mixins/colorable'
import Dependent from '../../mixins/dependent'
import Filterable from '../../mixins/filterable'
import Input from '../../mixins/input'
import Maskable from '../../mixins/maskable'

// Component level mixins
import Autocomplete from './mixins/select-autocomplete'
import Computed from './mixins/select-computed'
import Events from './mixins/select-events'
import Generators from './mixins/select-generators'
import Helpers from './mixins/select-helpers'
import Menu from './mixins/select-menu'
import Props from './mixins/select-props'
import Watchers from './mixins/select-watchers'

// Directives
import ClickOutside from '../../directives/click-outside'

export default {
  name: 'v-select',

  inheritAttrs: false,

  components: {
    VCard,
    VCheckbox,
    VChip,
    VList,
    VListTile,
    VListTileAction,
    VListTileContent,
    VListTileTitle,
    VMenu,
    VBtn
  },

  directives: {
    ClickOutside
  },

  mixins: [
    Autocomplete,
    Colorable,
    Dependent,
    Events,
    Filterable,
    Generators,
    Helpers,
    Input,
    Maskable,
    Menu,
    Props,
    Watchers,
    // Input and Computed both
    // contain isDirty props
    // last gets merged in
    Computed
  ],

  data () {
    return {
      cachedItems: this.cacheItems ? this.items : [],
      content: {},
      defaultColor: 'primary',
      inputValue: (this.multiple || this.tags) && !this.value ? [] : this.value,
      isBooted: false,
      lastItem: 20,
      lazySearch: null,
      isActive: false,
      menuIsActive: false,
      searchTimeout: null,
      selectedIndex: -1,
      selectedItems: [],
      shouldBreak: false
    }
  },

  mounted () {
    // If instance is being destroyed
    // do not run mounted functions
    if (this._isDestroyed) return

    // Evaluate the selected items immediately
    // to avoid a unnecessary label transition
    this.genSelectedItems()

    this.content = this.$refs.menu.$refs.content
  },

  beforeDestroy () {
    if (this.isBooted) {
      if (this.content) {
        this.content.removeEventListener('scroll', this.onScroll, false)
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

        this.combobox
          ? this.inputValue = null
          : this.selectItem(this.selectedItems[this.selectedIndex])
        this.selectedIndex = newIndex
      }
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
    genDirectives () {
      return [{
        name: 'click-outside',
        value: e => {
          return (
            !!this.content &&
            !this.content.contains(e.target) &&
            !!this.$el &&
            !this.$el.contains(e.target)
          )
        }
      }]
    },
    genSelectedItems (val = this.inputValue) {
      // If we are using tags, don't filter results
      if (this.tags) return (this.selectedItems = val)

      // Combobox is the single version
      // of a taggable select element
      if (this.combobox) return (this.selectedItems = val != null ? [val] : [])

      let selectedItems = this.computedItems.filter(i => {
        if (!this.isMultiple) {
          return this.getValue(i) === this.getValue(val)
        } else {
          // Always return Boolean
          return this.findExistingItem(i) > -1
        }
      })

      if (!selectedItems.length &&
        val != null &&
        this.tags
      ) {
        selectedItems = Array.isArray(val) ? val : [val]
      }

      this.selectedItems = selectedItems
    },
    clearableCallback () {
      const inputValue = this.isMultiple ? [] : null

      this.inputValue = inputValue
      this.$emit('change', inputValue)
      this.genSelectedItems()

      // When input is cleared
      // reset search value and
      // re-focus the input
      setTimeout(() => {
        this.searchValue = null
        this.focusInput()
      }, 0)

      if (this.openOnClear) {
        setTimeout(this.showMenu, 50)
      }
    },
    onScroll () {
      if (!this.isActive) {
        requestAnimationFrame(() => (this.content.scrollTop = 0))
      } else {
        if (this.lastItem >= this.computedItems.length) return

        const showMoreItems = (
          this.content.scrollHeight -
          (this.content.scrollTop +
          this.content.clientHeight)
        ) < 200

        if (showMoreItems) {
          this.lastItem += 20
        }
      }
    },
    findExistingItem (item) {
      const itemValue = this.getValue(item)
      return this.inputValue.findIndex(i => this.valueComparator(this.getValue(i), itemValue))
    },
    selectItem (item) {
      if (!this.isMultiple) {
        this.inputValue = this.returnObject ? item : this.getValue(item)
        this.selectedItems = [item]
      } else {
        const selectedItems = []
        const inputValue = this.inputValue.slice()
        const i = this.findExistingItem(item)

        i !== -1 && inputValue.splice(i, 1) || inputValue.push(item)
        this.inputValue = inputValue.map((i) => {
          selectedItems.push(i)
          return this.returnObject ? i : this.getValue(i)
        })

        this.selectedItems = selectedItems
      }

      this.searchValue = !this.isMultiple &&
        !this.chips &&
        !this.$scopedSlots.selection
        ? this.getText(this.selectedItem)
        : null

      this.$emit('change', this.inputValue)

      // List tile will re-render, reset index to
      // maintain highlighting
      const savedIndex = this.getMenuIndex()
      this.resetMenuIndex()

      // After selecting an item
      // refocus the input and
      // reset the caret pos
      this.$nextTick(() => {
        this.focusInput()
        this.setCaretPosition(this.currentRange)

        requestAnimationFrame(() => {
          if (savedIndex > -1) {
            this.setMenuIndex(savedIndex)
          }
        })
      })
    }
  },

  render (h) {
    const data = {
      attrs: {
        tabindex: this.isAutocomplete || this.disabled ? -1 : this.tabindex,
        'data-uid': this._uid,
        ...(this.isAutocomplete ? null : this.$attrs),
        role: this.isAutocomplete ? null : 'combobox'
      }
    }

    if (!this.isAutocomplete) {
      data.on = this.genListeners()
      data.directives = this.genDirectives()
    } else {
      data.on = {
        click: () => {
          if (this.disabled || this.readonly || this.isFocused) return

          // If the input is dirty,
          // the input is not targetable
          // so we must manually focus
          if (this.isDirty) {
            this.focus()
            this.$nextTick(this.focusInput)
          }
        }
      }
    }

    return this.genInputGroup([
      this.genSelectionsAndSearch(),
      this.genMenu()
    ], data, this.toggleMenu)
  }
}

import Input from '../../mixins/input'
import { debounce } from '../../util/helpers'

// Todo: Debounce double/triple clicks.
// Todo: Animate progress bar between debounces on search.
// Todo: Arrow controls on chips.
// Todo: Ability to add new items on the fly (and select them simultaneously).
// Todo: Scroll to highlighted when key up/down.
export default {
  name: 'select',

  mixins: [Input],

  data () {
    return {
      inputValue: this.parseInputValue(),
      inputSearch: this.parseInputSearch(),
      menuActive: false,
      menuActivator: null,
      keyUpDown: 0,
      keyLeftRight: 0,
      appendIconCbPrivate: this.removeAllSelected,
      noResultsFoundText: 'No search results found.'
    }
  },

  props: {
    appendIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    autocomplete: Boolean,
    chips: Boolean,
    close: Boolean,
    debounce: {
      type: Number,
      default: 200
    },
    items: {
      type: Array,
      default: () => []
    },
    filter: Function,
    itemText: {
      type: String,
      default: 'text'
    },
    itemGroup: {
      type: String,
      default: 'group'
    },
    maxHeight: {
      type: [Number, String],
      default: 200
    },
    multiple: Boolean
  },

  computed: {
    classes () {
      return {
        'input-group--text-field': true,
        'input-group--select': true,
        'input-group--autocomplete': this.autocomplete,
        'input-group--single-line': this.singleLine,
        'input-group--multi-line': this.multiLine,
        'input-group--chips': this.chips
      }
    },

    filteredItems () {
      let filtered = this.items

      if (this.inputSearch) {
        filtered = this.filter
          ? this.items.filter(item => (this.filter(item, this.inputSearch)))
          : this.items.filter(item => (this.defaultFilter(item, this.inputSearch)))

        filtered = filtered.length ? filtered : this.items
      }

      return filtered
    },

    inputCommaCount () {
      return this.inputValue.length + (this.focused ? 1 : 0)
    },

    highlighted () {
      return this.filteredItems[this.keyUpDown - 1]
    },

    activeSelection () {
      const activeIndex = this.inputValue.length - this.keyLeftRight
      return this.inputValue[activeIndex]
    }
  },

  watch: {
    focused (val) {
      this.$emit('focused', val)
    },

    value (val) {
      this.inputValue = this.parseInputValue()
      this.inputSearch = this.parseInputSearch()
      this.validate()
    },

    inputValue (val) {
      if (this.multiple && this.autocomplete) this.$refs.menu.activate()

      if (this.multiple) {
        this.$emit('input', !val.length ? null : val)
      } else {
        this.$emit('input', !val.length ? null : val[0])
      }
    },

    menuActive (val) {
      if (!val && this.autocomplete) this.$refs.searchField.blur()
    },

    keyUpDown (val) {
      const numItems = this.filteredItems.length
      if (val < 1) this.keyUpDown = 1
      if (val > numItems) this.keyUpDown = numItems

      // Todo: Scroll to highlighted here.
    },

    keyLeftRight (val) {
      const numSelections = this.inputValue.length
      if (val > numSelections) this.keyLeftRight = 0
      if (val < 0) this.keyLeftRight = numSelections
    }
  },

  mounted () {
    this.menuActivator = this.$refs.inputgroup.querySelector('.input-group__input')
  },

  methods: {
    isDirty () {
      return this.inputSearch || this.inputValue.length
    },

    focus () {
      this.focused = true
      this.showClearIcon(true)
    },

    blur () {
      this.$nextTick(() => (this.focused = false))
      this.showClearIcon(false)
      this.keyUpDown = 0
      this.keyLeftRight = 0
    },

    parseInputValue () {
      if (this.value === null) return []
      if (this.multiple) return this.value
      return this.isEmptyObject(this.value) ? [] : [this.value]
    },

    parseInputSearch () {
      if (this.autocomplete && !this.multiple && this.value) return this.value[this.itemText]
      return this.inputSearch
    },

    defaultFilter (item, inputSearch) {
      return item[this.itemText].toLowerCase().includes(inputSearch.toLowerCase())
    },

    isHighlighted (item) {
      return item === this.highlighted
    },

    isActiveSelection (item) {
      return item === this.activeSelection
    },

    isSelected (item) {
      return this.inputValue.includes(item)
    },

    addSelected (item) {
      if (!item) return

      const uncheck = this.isSelected(item) && this.multiple
      if (uncheck) {
        this.removeSelected(item)
        return
      }

      this.multiple ? this.inputValue.push(item) : this.inputValue = [item]
      this.inputSearch = this.autocomplete && !this.multiple ? item[this.itemText] : ''

      if (!this.multiple) this.menuActive = false
      if (this.autocomplete) this.$refs.searchField.focus()
    },

    removeSelected (item) {
      if (!item) return

      this.inputValue.splice(this.inputValue.findIndex(s => s === item), 1)
      if (this.autocomplete && !this.multiple) this.inputSearch = ''
    },

    removeAllSelected (e) {
      if (!this.appendIconAlt) return

      e.stopPropagation()
      this.inputValue = []
      this.inputSearch = ''
      this.showClearIcon(false)
    },

    showClearIcon (on = true) {
      this.appendIconAlt = on && this.close && this.inputValue.length ? 'close' : ''
    },

    // Render functions
    // ====================

    genMenu (h) {
      const data = {
        ref: 'menu',
        style: {
          width: '100%'
        },
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
          input: (val) => (this.menuActive = val)
        },
        nativeOn: {
          '!mouseenter': this.showClearIcon,
          mouseleave: () => { this.showClearIcon(false) }
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

      if (this.multiple) return h('div', data, this.genSelections(h).concat(this.genSearchField(h)))
      if (this.autocomplete) return [this.genSearchField(h)]
      return h('div', data, this.genSelections(h))
    },

    genSelections (h) {
      const chips = this.chips
      const slots = this.$scopedSlots.selection
      const comma = true // <-- default

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

      const data = {
        'class': {
          'input-group__selections__comma': true,
          'input-group__selections__comma--active': this.isActiveSelection(item)
        }
      }
      return h('div', data, item[this.itemText] + comma)
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
    },

    // Utils
    // ====================

    isEmptyObject (obj) {
      return obj.constructor === Object && Object.keys(obj).length === 0
    }
  },

  render (h) {
    const data = { ref: 'inputgroup' }
    const inputGroup = this.genInputGroup(h, [this.genSelectionsAndSearch(h)], data)
    const menu = this.genMenu(h)

    return h('div', {}, [inputGroup, menu])
  }
}

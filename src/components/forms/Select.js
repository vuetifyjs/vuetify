import Input from '../../mixins/input'
import { debounce } from '../../util/helpers'

// Todo: Debounce double/triple clicks.
// Todo: Animate progress bar between debounces on search.
// Todo: Confirm css changes to list tiles are good.
// Todo: Keyboard down arrow.
// Todo: Enter key on autocomplete selects top pick in list.
// Todo: Click on chip should focus input and open menu.
// Todo: Ability to add new items on the fly (and select them simultaneously).
export default {
  name: 'select',

  mixins: [Input],

  data () {
    return {
      inputValue: this.parseInputValue(),
      inputSearch: this.parseInputSearch(),
      filteredItems: null,
      menuActive: false,
      appendIconCbPrivate: this.removeAllSelected,
      noResultsFoundText: 'No search noResultsFoundts found.'
    }
  },

  props: {
    items: {
      type: Array,
      default: () => []
    },
    itemText: {
      type: String,
      default: 'text'
    },
    appendIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    multiple: Boolean,
    autocomplete: Boolean,
    filter: Function,
    singleLine: Boolean,
    chips: Boolean,
    close: Boolean,
    debounce: {
      type: Number,
      default: 200
    }
  },

  computed: {
    classes () {
      return {
        'input-group--text-field': true,
        'input-group--select': true,
        'input-group--autocomplete': this.autocomplete,
        'input-group--single-line': this.singleLine,
        'input-group--multi-line': this.multiLine
      }
    },
    inputValueLength () {
      return this.inputValue.length
    }
  },

  watch: {
    focused (val) {
      this.$emit('focused', val)
    },

    value (val) {
      this.inputValue = this.parseInputValue()
      this.inputSearch = this.parseInputSearch()
    },

    inputValue (val) {
      if (this.multiple) {
        this.$emit('input', !val.length ? null : val)
      } else {
        this.$emit('input', !val.length ? null : val[0])
      }
    },

    menuActive (val) {
      if (!val) this.$refs.searchField.blur()
    }
  },

  methods: {
    isDirty () {
      return this.inputSearch || this.multiple && this.inputValue.length
    },

    focus () {
      this.focused = true
      this.showClearIcon(true)
    },

    blur () {
      this.$nextTick(() => (this.focused = false))
      this.showClearIcon(false)
    },

    parseInputValue () {
      if (this.value === null) return []
      if (this.multiple) return this.value
      return this.isEmptyObject(this.value) ? [] : [this.value]
    },

    parseInputSearch () {
      if (this.multiple || this.value === null) return ''
      return this.value[this.itemText]
    },

    // TODO: Maybe convert to computed prop on inputSearch and items.
    filterItems () {
      const { items, inputSearch } = this
      const isFilterable = inputSearch && this.autocomplete
      let filtered = null

      if (isFilterable) {
        filtered = this.filter
          ? items.filter(item => (this.filter(item, inputSearch)))
          : items.filter(item => (this.defaultFilter(item, inputSearch)))

        filtered = filtered.length ? filtered : null
      }

      this.filteredItems = filtered
    },

    defaultFilter (item, inputSearch) {
      return item[this.itemText].toLowerCase().includes(inputSearch.toLowerCase())
    },

    isSelected (item) {
      return this.inputValue.includes(item)
    },

    addSelected (item) {
      if (this.multiple) {
        this.inputValue.push(item)
        this.inputSearch = ''
      } else {
        this.inputValue = [item]
        this.inputSearch = item[this.itemText]
      }
      this.filterItems()
    },

    removeSelected (item) {
      this.inputValue.splice(this.inputValue.findIndex(s => s === item), 1)
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
          nudgeBottom: -20,
          nudgeTop: -16,
          nudgeXAuto: this.multiple ? -40 : -16
        },
        on: {
          input: (val) => (this.menuActive = val)
        },
        nativeOn: {
          '!mouseenter': this.showClearIcon,
          mouseleave: () => { this.showClearIcon(false) }
        }
      }

      return h('v-menu', data, [this.genActivator(h), this.genList(h)])
    },

    genActivator (h) {
      const data = {
        slot: 'activator'
      }
      return this.genInputGroup(h, [this.genSelectionsAndSearch(h)], data)
    },

    genSelectionsAndSearch (h) {
      const data = {
        slot: 'activator',
        'class': 'input-group__selections'
      }

      return this.multiple
        ? h('div', data, this.genSelections(h).concat(this.genSearchField(h)))
        : h('div', data, [this.genSearchField(h)])
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
      const comma = index !== this.inputValueLength - 1 ? ',' : ''

      const data = {
        'class': 'input-group__selections__comma'
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
            this.inputSearch = e.target.value
            this.filterItems()
          }, this.debounce),
          focus: this.focus,
          blur: this.blur
        }
      }

      return h('input', data)
    },

    genList (h) {
      const noResultsFound = this.autocomplete && this.inputSearch && !this.filteredItems

      const list = noResultsFound
        ? [this.genNoResultsFound(h)]
        : (this.filteredItems || this.items).map(item => this.genListItem(h, item))

      return h('v-list', {}, list)
    },

    genListItem (h, item) {
      return h('v-list-item', {}, [this.genTile(h, item)])
    },

    genTile (h, item) {
      const data = {
        'class': {
          'list__tile--active': this.isSelected(item),
          'list__tile--select-multi': this.multiple
        },
        nativeOn: {
          click: e => {
            this.isSelected(item) && this.multiple
              ? this.removeSelected(item)
              : this.addSelected(item)

            this.$refs.searchField.focus()
          }
        }
      }

      return this.$scopedSlots.item
        ? h('v-list-tile', data, this.$scopedSlots.item({ parent: this, item: item }))
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
    return this.genMenu(h)
  }
}

import Input from '../../mixins/input'
import Generators from './mixins/generators'

export default {
  name: 'select',

  mixins: [Input, Generators],

  data () {
    return {
      inputValue: [],
      inputSearch: '',
      menuActive: false,
      menuActivator: null,
      keyUpDown: 0,
      keyLeftRight: 0,
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
    value (val) {
      this.inputValue = val
    },
    inputValue (val) {
      this.$emit('input', val)
    },
    focused (val) {
      if (val) {
        this.keyUpDown = 0
        this.keyLeftRight = 0
      }

      this.$emit('focused', val)
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
    },

    blur () {
      this.$nextTick(() => (this.focused = false))
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

      if (!this.multiple) {
        this.inputValue = typeof item === 'string'
          ? item
          : item[this.itemText]
        return
      }

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
    }
  },

  render (h) {
    const data = { ref: 'inputgroup' }
    const inputGroup = this.genInputGroup(h, [this.genSelectionsAndSearch(h)], data)
    const menu = this.genMenu(h)

    return h('div', {}, [inputGroup, menu])
  }
}

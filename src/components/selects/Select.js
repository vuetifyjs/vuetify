import Input from '../../mixins/input'
import Generators from './mixins/generators'
import Autocomplete from './mixins/autocomplete'

export default {
  name: 'select',

  mixins: [Autocomplete, Input, Generators],

  data () {
    return {
      content: {},
      inputValue: this.value,
      isBooted: false,
      lastItem: 20,
      menuActive: false
    }
  },

  props: {
    appendIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    auto: Boolean,
    autocomplete: Boolean,
    bottom: Boolean,
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
    itemValue: {
      type: String,
      default: 'value'
    },
    maxHeight: {
      type: [Number, String],
      default: 300
    },
    multiple: Boolean,
    multiLine: Boolean,
    offset: Boolean,
    singleLine: Boolean,
    top: Boolean,
    returnObject: Boolean
  },

  computed: {
    classes () {
      return {
        'input-group--text-field input-group--select': true,
        'input-group--autocomplete': this.autocomplete,
        'input-group--single-line': this.singleLine,
        'input-group--multi-line': this.multiLine,
        'input-group--chips': this.chips,
        'input-group--multiple': this.multiple
      }
    },
    filteredItems () {
      const items = this.autocomplete && this.searchValue
        ? this.filterSearch()
        : this.items

      return !this.auto ? items.slice(0, this.lastItem) : items
    },
    isDirty () {
      return this.selectedItems.length
    },
    selectedItems () {
      if (this.inputValue === null) return []

      return this.items.filter(i => {
        if (!this.multiple) {
          return this.getValue(i) === this.getValue(this.inputValue)
        } else {
          return this.inputValue.find(j => this.getValue(j) === this.getValue(i))
        }
      })
    }
  },

  watch: {
    inputValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.inputValue = val
      this.validate()
      this.autocomplete && this.$refs.menu.activate()
    },
    menuActive (val) {
      this.isBooted = true
      this.lastItem += !val ? 20 : 0

      if (!val) this.blur()
      else this.focus()
    },
    isBooted () {
      this.$nextTick(() => {
        this.content = this.$refs.menu.$el.querySelector('.menu__content')

        this.content.addEventListener('scroll', this.onScroll, false)
      })
    }
  },

  beforeDestroy () {
    if (this.isBooted) {
      this.content.removeEventListener('scroll', this.onScroll, false)
    }
  },

  methods: {
    blur () {
      this.$nextTick(() => (this.focused = false))
    },
    focus () {
      this.focused = true
      this.autocomplete && this.$refs.input.focus()
    },
    getText (item) {
      return item === Object(item) ? item[this.itemText] : item
    },
    getValue (item) {
      return item === Object(item) && (this.itemValue in item) ? item[this.itemValue] : item
    },
    onScroll () {
      if (!this.menuActive) {
        setTimeout(() => (this.content.scrollTop = 0), 50)
      } else {
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
    selectItem (item) {
      if (!this.multiple) {
        this.inputValue = this.returnObject ? item : this.getValue(item)
      } else {
        const inputValue = this.inputValue.slice()
        const i = this.inputValue.findIndex(i => this.getValue(i) === this.getValue(item))

        i !== -1 && inputValue.splice(i, 1) || inputValue.push(item)
        this.inputValue = inputValue.map(i => this.returnObject ? i : this.getValue(i))
      }

      if (this.autocomplete) {
        this.$nextTick(() => {
          this.searchValue = null
          this.$refs.input.focus()
        })
      }
    }
  },

  render (h) {
    return this.genInputGroup([
      this.genSelectionsAndSearch(),
      this.genMenu()
    ], {
      ref: 'activator'
    })
  }
}

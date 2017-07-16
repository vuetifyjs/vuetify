import Autocomplete from './mixins/autocomplete'
import Filterable from '~mixins/filterable'
import Generators from './mixins/generators'
import Input from '~mixins/input'
import { getObjectValueByPath } from '~util/helpers'

export default {
  name: 'select',

  mixins: [Autocomplete, Input, Filterable, Generators],

  data () {
    return {
      content: {},
      inputValue: this.multiple && !this.value ? [] : this.value,
      isBooted: false,
      lastItem: 20,
      isActive: false
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
    returnObject: Boolean,
    overflow: Boolean,
    segmented: Boolean,
    editable: Boolean
  },

  computed: {
    classes () {
      return {
        'input-group--text-field input-group--select': true,
        'input-group--auto': this.auto,
        'input-group--overflow': this.overflow,
        'input-group--segmented': this.segmented,
        'input-group--editable': this.editable,
        'input-group--autocomplete': this.autocomplete,
        'input-group--single-line': this.singleLine || this.isDropdown,
        'input-group--multi-line': this.multiLine,
        'input-group--chips': this.chips,
        'input-group--multiple': this.multiple
      }
    },
    computedContentClass () {
      const children = [
        this.auto ? 'menu__content--auto' : '',
        this.isDropdown ? 'menu__content--dropdown' : ''
      ]

      return children.join(' ')
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
    isDropdown () {
      return this.segmented || this.overflow || this.editable
    },
    selectedItems () {
      if (this.inputValue === null || typeof this.inputValue === 'undefined') return []

      return this.items.filter(i => {
        if (!this.multiple) {
          return this.getValue(i) === this.getValue(this.inputValue)
        }
        // Always return Boolean
        return this.inputValue.find(j => this.getValue(j) === this.getValue(i)) !== undefined
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
      if (this.autocomplete || this.editable) this.$nextTick(this.$refs.menu.updateDimensions)
    },
    isActive (val) {
      this.isBooted = true
      this.lastItem += !val ? 20 : 0

      if (!val) this.blur()
      else this.focus()
    },
    isBooted () {
      this.$nextTick(() => {
        this.content && this.content.addEventListener('scroll', this.onScroll, false)
      })
    },
    searchValue () {
      this.$refs.menu.listIndex = -1
    }
  },

  mounted () {
    this.content = this.$refs.menu.$refs.content
  },

  beforeDestroy () {
    if (this.isBooted) {
      this.content && this.content.removeEventListener('scroll', this.onScroll, false)
    }
  },

  methods: {
    blur () {
      this.$nextTick(() => {
        this.focused = false
        this.searchValue = null
        this.$el.blur()
      })
    },
    focus () {
      this.focused = true
      this.$refs.input &&
        (this.autocomplete || this.editable) &&
        this.$refs.input.focus()

      if (this.editable &&
          this.inputValue !== null &&
          typeof this.inputValue !== 'undefined'
        ) {
        this.$nextTick(() => {
          this.$refs.input.value = this.returnObject
            ? this.getText(this.inputValue)
            : this.getValue(this.inputValue)
        })
      }
    },
    genLabel () {
      if (this.searchValue) return null

      const data = {}

      if (this.id) data.attrs = { for: this.id }

      return this.$createElement('label', data, this.label)
    },
    getText (item) {
      return item === Object(item) ? getObjectValueByPath(item, this.itemText) : item
    },
    getValue (item) {
      return item === Object(item) ? getObjectValueByPath(item, this.itemValue) : item
    },
    onScroll () {
      if (!this.isActive) {
        requestAnimationFrame(() => (this.content.scrollTop = 0))
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

      if (this.autocomplete || this.editable) {
        this.$nextTick(() => {
          this.searchValue = null
          this.$refs.input &&
            this.$refs.input.focus()
        })
      }

      this.$emit('change', this.inputValue)
    }
  },

  render (h) {
    return this.genInputGroup([
      this.genSelectionsAndSearch(),
      this.genMenu()
    ], {
      ref: 'activator',
      directives: [{
        name: 'click-outside',
        value: () => (this.isActive = false)
      }],
      on: {
        keydown: this.onKeyDown // Located in mixins/autocomplete.js
      }
    })
  }
}

import Input from '../../mixins/input'
import Generators from './mixins/generators'

export default {
  name: 'select',

  mixins: [Input, Generators],

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
    offset: Boolean
  },

  computed: {
    classes () {
      return {
        'input-group--text-field input-group--select': true,
        'input-group--autocomplete': this.autocomplete,
        'input-group--single-line': this.singleLine,
        'input-group--multi-line': this.multiLine,
        'input-group--chips': this.chips
      }
    },
    filteredItems () {
      return !this.auto ? this.items.slice(0, this.lastItem) : this.items
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
    },
    menuActive (val) {
      this.isBooted = true
      this.lastItem += !val ? 20 : 0
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
    },
    getText (item) {
      return item === Object(item) ? item[this.itemText] : item
    },
    getValue (item) {
      return item === Object(item) ? item[this.itemValue] : item
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
        this.inputValue = item
      } else {
        if (this.inputValue === null) {
          this.inputValue = [item]
        } else {
          const i = this.inputValue.findIndex(i => this.getValue(i) === this.getValue(item))

          if (i !== -1) {
            this.inputValue.splice(i, 1)
          } else {
            this.inputValue.push(item)
          }
        }
      }
    }
  },

  render (h) {
    return h('div', {}, [
      this.genInputGroup([this.genSelectionsAndSearch()]),
      this.genMenu()
    ])
  }
}

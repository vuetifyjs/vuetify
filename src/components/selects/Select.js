import Input from '../../mixins/input'
import Generators from './mixins/generators'

export default {
  name: 'select',

  mixins: [Input, Generators],

  data () {
    return {
      inputValue: this.value,
      inputSearch: '',
      isBooted: false,
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
    multiple: Boolean
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
      return this.items
    },
    selectedItems () {
      if (!this.multiple) {
        return [this.items.findIndex(i => this.getValue(i) === this.inputValue)]
      }

      const selected = []

      this.items.forEach((o, i) => {
        if (this.inputValue.find(j => this.getValue(j) === this.getValue(o))) {
          selected.push(i)
        }
      })

      return selected
    }
  },

  watch: {
    inputValue (val) {
      this.$emit('input', val)
    },
    menuActive () {
      this.isBooted = true
    },
    value (val) {
      this.inputValue = val
    }
  },

  methods: {
    blur () {
      this.$nextTick(() => (this.focused = false))
    },
    isDirty () {
      return (
        (!this.multiple &&
          this.inputValue ||
          this.inputValue &&
          this.inputValue.toString().length > 0
        ) ||
        this.multiple &&
        this.inputValue.length > 0
      )
    },
    focus () {
      this.focused = true
    },
    getText (item) {
      return typeof item === 'object' ? item[this.itemText] : item
    },
    getValue (item) {
      return typeof item === 'object' ? item[this.itemValue] : item
    },
    selectItem (item) {
      if (!this.multiple) {
        this.inputValue = item
      } else {
        const i = this.inputValue.findIndex(i => this.getValue(i) === this.getValue(item))

        if (i !== -1) {
          this.inputValue.splice(i, 1)
        } else {
          this.inputValue.push(item)
        }
      }
    }
  },

  render (h) {
    return h('div', {}, [
      this.genInputGroup(h, [this.genSelectionsAndSearch(h)]),
      this.genMenu(h)
    ])
  }
}

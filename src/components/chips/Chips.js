import Input from '../../mixins/input'

export default {
  name: 'chips',

  mixins: [Input],

  data () {
    return {
      hasFocused: false,
      items: this.chips
    }
  },

  computed: {
    classes () {
      return {
        'input-group--text-field': true,
        'input-group--single-line': this.singleLine,
        'input-group--multi-line': this.multiLine
      }
    },

    hasError () {
      return this.errors.length !== 0 ||
        !this.counterIsValid() ||
        !this.validateIsValid()
    },

    count () {
      const inputLength = (this.inputValue || '').length
      let min = inputLength

      if (this.min !== 0 && inputLength < this.min) {
        min = this.min
      }

      return `${min} / ${this.max}`
    },

    inputValue: {
      get () {
        return this.value
      },
      set (val) {
        if (!this.lazy) {
          this.$emit('input', val)
        }

        this.lazyValue = val
      }
    }
  },

  props: {
    autocomplete: Boolean,
    counter: Boolean,
    id: String,
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 25
    },
    menu: Boolean,
    multiLine: Boolean,
    name: String,
    singleLine: Boolean,
    type: {
      default: 'text'
    },
    chips: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  watch: {
    focused () {
      this.$emit('focused', this.focused)
      this.hasFocused = true

      if (!this.focused) {
        this.$emit('input', this.lazyValue)
      }
    },
    value () {
      this.lazyValue = this.value
    },
    chips (val) {
      this.items = val
    }
  },

  methods: {
    blur () {
      this.validate()
      this.$nextTick(() => (this.focused = false))
    },
    genCounter (h) {
      return h('div', {
        'class': {
          'input-group__counter': true,
          'input-group__counter--error': !this.counterIsValid()
        }
      }, this.count)
    },

    genChips (h) {
      const chips = []

      this.items.forEach(item => {
        chips.push(this.genChip(h, item))
      })

      return h('div', chips)
    },

    genChip (h, item) {
      return h(
        'v-chip',
        {
          props: {
            close: true
          }
        },
        item.text
      )
    },

    genInput (h) {
      const inputData = {
        domProps: {
          autocomplete: this.autocomplete,
          disabled: this.disabled,
          id: this.id || this.name || this._uid,
          name: this.name,
          required: this.required,
          value: this.inputValue
        },
        on: {
          blur: this.blur,
          input: e => (this.inputValue = e.target.value),
          focus: () => (this.focused = true),
          keyup: e => {
            if (e.keyCode !== 13) return
            this.items.push({
              text: e.target.value
            })
          }
        },
        ref: 'input'
      }

      inputData.domProps.type = this.type

      return h('input', inputData)
    },
    counterIsValid () {
      return (!this.counter ||
        !this.inputValue ||
        (this.inputValue.length >= this.min && this.inputValue.length <= this.max)
      )
    },
    validateIsValid () {
      return (!this.required ||
        (this.required &&
          this.inputValue) ||
        !this.hasFocused ||
        (this.hasFocused && this.focused))
    }
  },

  render (h) {
    return this.genInputGroup(h, [this.genChips(h), this.genInput(h)])
  }
}

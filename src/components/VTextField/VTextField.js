require('../../stylus/components/_input-groups.styl')
require('../../stylus/components/_text-fields.styl')

import Colorable from '../../mixins/colorable'
import Input from '../../mixins/input'
import Maskable from '../../mixins/maskable'
import { isMaskDelimiter } from '../../util/mask'

export default {
  name: 'v-text-field',

  mixins: [Colorable, Input, Maskable],

  inheritAttrs: false,

  data () {
    return {
      initialValue: null,
      inputHeight: null,
      badInput: false,
      lazySelection: 0
    }
  },

  props: {
    autofocus: Boolean,
    autoGrow: Boolean,
    box: Boolean,
    clearable: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    counter: [Boolean, Number, String],
    fullWidth: Boolean,
    multiLine: Boolean,
    placeholder: String,
    prefix: String,
    rows: {
      default: 5
    },
    singleLine: Boolean,
    solo: Boolean,
    suffix: String,
    textarea: Boolean,
    type: {
      type: String,
      default: 'text'
    }
  },

  computed: {
    classes () {
      const classes = {
        'input-group--text-field': true,
        'input-group--text-field-box': this.box,
        'input-group--single-line': this.singleLine || this.solo,
        'input-group--solo': this.solo,
        'input-group--multi-line': this.multiLine,
        'input-group--full-width': this.fullWidth,
        'input-group--prefix': this.prefix,
        'input-group--suffix': this.suffix,
        'input-group--textarea': this.textarea
      }

      if (this.hasError) {
        classes['error--text'] = true
      } else {
        return this.addTextColorClassChecks(classes)
      }

      return classes
    },
    count () {
      let inputLength
      if (this.inputValue) inputLength = this.inputValue.toString().length
      else inputLength = 0

      return `${inputLength} / ${this.counterLength}`
    },
    counterLength () {
      const parsedLength = parseInt(this.counter, 10)
      return isNaN(parsedLength) ? 25 : parsedLength
    },
    inputValue: {
      get () {
        return this.value
      },
      set (val) {
        this.lazyValue = val
        this.mask && this.setSelectionRange()
        this.$emit('input', val)
      }
    },
    isDirty () {
      return this.lazyValue != null &&
        this.lazyValue.toString().length > 0 ||
        this.badInput ||
        ['time', 'date', 'datetime-local', 'week', 'month'].includes(this.type)
    },
    shouldAutoGrow () {
      return (this.multiLine || this.textarea) && this.autoGrow
    }
  },

  watch: {
    isFocused (val) {
      if (val) {
        this.initialValue = this.lazyValue
      } else if (this.initialValue !== this.lazyValue) {
        this.$emit('change', this.lazyValue)
      }
    },
    value (val) {
      // Value was changed externally, update lazy
      this.lazyValue = val

      !this.validateOnBlur && this.validate()
      this.shouldAutoGrow && this.calculateInputHeight()
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.shouldAutoGrow && this.calculateInputHeight()
      this.autofocus && this.focus()
    })
  },

  methods: {
    calculateInputHeight () {
      this.inputHeight = null

      this.$nextTick(() => {
        const height = this.$refs.input
          ? this.$refs.input.scrollHeight
          : 0
        const minHeight = this.rows * 24
        const inputHeight = height < minHeight ? minHeight : height
        this.inputHeight = inputHeight + (this.textarea ? 4 : 0)
      })
    },
    onInput (e) {
      this.resetSelections(e.target)
      this.inputValue = this.unmaskText(e.target.value)
      this.badInput = e.target.validity && e.target.validity.badInput
      this.shouldAutoGrow && this.calculateInputHeight()
    },
    blur (e) {
      this.isFocused = false

      this.$nextTick(() => {
        this.validate()
      })
      this.$emit('blur', e)
    },
    focus (e) {
      if (!this.$refs.input) return

      this.isFocused = true
      if (document.activeElement !== this.$refs.input) {
        this.$refs.input.focus()
      }
      this.$emit('focus', e)
    },
    genCounter () {
      return this.$createElement('div', {
        'class': {
          'input-group__counter': true,
          'input-group__counter--error': this.hasError
        }
      }, this.count)
    },
    genInput () {
      const tag = this.multiLine || this.textarea ? 'textarea' : 'input'
      const listeners = Object.assign({}, this.$listeners)
      delete listeners['change'] // Change should not be bound externally

      const data = {
        style: {},
        domProps: {
          autofocus: this.autofocus,
          disabled: this.disabled,
          required: this.required,
          value: this.maskText(this.lazyValue)
        },
        attrs: {
          ...this.$attrs,
          readonly: this.readonly,
          tabindex: this.tabindex,
          'aria-label': (!this.$attrs || !this.$attrs.id) && this.label // Label `for` will be set if we have an id
        },
        on: Object.assign(listeners, {
          blur: this.blur,
          input: this.onInput,
          focus: this.focus
        }),
        ref: 'input'
      }

      if (this.shouldAutoGrow) {
        data.style.height = this.inputHeight && `${this.inputHeight}px`
      }

      if (this.placeholder) data.domProps.placeholder = this.placeholder

      if (!this.textarea && !this.multiLine) {
        data.domProps.type = this.type
      } else {
        data.domProps.rows = this.rows
      }

      if (this.mask) {
        data.attrs.maxlength = this.masked.length
      }

      const children = [this.$createElement(tag, data)]

      this.prefix && children.unshift(this.genFix('prefix'))
      this.suffix && children.push(this.genFix('suffix'))

      return children
    },
    genFix (type) {
      return this.$createElement('span', {
        'class': `input-group--text-field__${type}`
      }, this[type])
    },
    clearableCallback () {
      this.inputValue = null
      this.$nextTick(() => this.$refs.input.focus())
    },
    resetSelections (input) {
      this.selection = input.selectionEnd
      this.lazySelection = 0

      for (const char of input.value.substr(0, this.selection)) {
        isMaskDelimiter(char) || this.lazySelection++
      }
    }
  },

  render () {
    return this.genInputGroup(this.genInput(), { attrs: { tabindex: false } })
  }
}

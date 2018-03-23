// Styles
import '../../stylus/components/_text-fields.styl'

// Components
import VCounter from '../VCounter'
import VLabel from '../VLabel'

// Extensions
import VInput from '../VInput'

// Mixins
import Maskable from '../../mixins/maskable'
import Soloable from '../../mixins/soloable'

const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']

export default {
  name: 'v-text-field',

  extends: VInput,

  mixins: [
    Maskable,
    Soloable
  ],

  inheritAttrs: false,

  data: vm => ({
    badInput: false,
    initialValue: null,
    inputHeight: null,
    internalChange: false,
    isClearing: false
  }),

  props: {
    appendOuterIcon: String,
    autofocus: Boolean,
    box: Boolean,
    clearable: Boolean,
    clearIcon: {
      type: String,
      default: 'clear'
    },
    clearIconCb: Function,
    color: {
      type: String,
      default: 'primary'
    },
    counter: [Boolean, Number, String],
    fullWidth: Boolean,
    label: String,
    placeholder: String,
    prefix: String,
    singleLine: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text'
    }
  },

  computed: {
    classes () {
      return {
        'v-input--text': true,
        'v-input--text--prefix': this.prefix,
        'v-input--text--single-line': this.isSingle,
        'v-input--text--solo': this.solo,
        'v-input--text--box': (this.box || this.solo)
      }
    },
    proxyValue: {
      get () {
        return this.lazyValue
      },
      set (val) {
        if (this.mask) {
          this.lazyValue = this.unmaskText(this.maskText(this.unmaskText(val)))
          this.setSelectionRange()
        } else {
          this.lazyValue = val
          this.$emit('input', this.lazyValue)
        }
      }
    },
    isDirty () {
      return (this.lazyValue != null &&
        this.lazyValue.toString().length > 0) ||
        this.badInput
    },
    isLabelActive () {
      return this.isDirty || dirtyTypes.includes(this.type)
    },
    isSingle () {
      return this.solo || this.singleLine
    }
  },

  watch: {
    isFocused (val) {
      // Sets validationState from validatable
      this.hasColor = val

      if (val) {
        this.initialValue = this.lazyValue
      } else if (this.initialValue !== this.lazyValue) {
        this.$emit('change', this.lazyValue)
      }
    },
    value (val) {
      if (this.mask && !this.internalChange) {
        const masked = this.maskText(this.unmaskText(val))
        this.lazyValue = this.unmaskText(masked)

        // Emit when the externally set value was modified internally
        String(val) !== this.lazyValue && this.$nextTick(() => {
          this.$refs.input.value = masked
          this.$emit('input', this.lazyValue)
        })
      } else this.lazyValue = val

      if (this.internalChange) this.internalChange = false

      !this.validateOnBlur && this.validate()
    }
  },

  mounted () {
    this.autofocus && this.onFocus()
  },

  methods: {
    clearableCallback () {
      this.proxyValue = null
      this.$nextTick(() => this.$refs.input.focus())
    },
    genAppendSlot () {
      const slot = []

      if (this.appendOuterIcon) {
        slot.push(this.genIcon('appendOuter'))
      }

      return this.genSlot('append', 'outer', slot)
    },
    genCounter () {
      if (this.counter === false) return null

      const value = (this.proxyValue || '').length
      const max = this.counter === true ? this.$attrs.maxlength : this.counter

      return this.$createElement(VCounter, {
        props: {
          value,
          max
        }
      })
    },
    genLabel () {
      if (this.isDirty && this.isSingle) return null

      const isSingleLine = this.isSingle
      const left = (!this.prefix || this.isFocused || this.isDirty)
        ? 0
        : 12

      const data = {
        props: {
          absolute: true,
          color: this.validationState,
          focused: !isSingleLine && (this.isFocused || !!this.validationState),
          left,
          value: !isSingleLine && (this.isFocused || this.isDirty)
        }
      }

      if ((this.attrs || {}).id) data.props.for = this.attrs.id

      return this.$createElement(VLabel, data, this.$slots.label || this.label)
    },
    genIconSlot () {
      const slot = []

      if (this.appendIcon) {
        slot.push(this.genIcon('append'))
      } else if (this.clearable && this.isDirty) {
        slot.push(this.genIcon('clear',
          this.clearableCallback || this.clearIconCb
        ))
      }

      return this.genSlot('append', 'inner', slot)
    },
    genInput () {
      const listeners = Object.assign({}, this.$listeners)
      delete listeners['change'] // Change should not be bound externally

      const data = {
        style: {},
        domProps: {
          value: this.maskText(this.lazyValue)
        },
        attrs: {
          ...this.$attrs,
          autofocus: this.autofocus,
          disabled: this.disabled,
          required: this.required,
          readonly: this.readonly,
          tabindex: this.tabindex,
          type: this.type,
          'aria-label': (!this.$attrs || !this.$attrs.id) && this.label // Label `for` will be set if we have an id
        },
        on: Object.assign(listeners, {
          blur: this.onBlur,
          input: this.onInput,
          focus: this.onFocus,
          keydown: this.onKeyDown
        }),
        ref: 'input'
      }

      if (this.placeholder) data.attrs.placeholder = this.placeholder

      if (this.mask) {
        data.attrs.maxlength = this.masked.length
      }

      return this.$createElement('input', data)
    },
    genDefaultSlot () {
      return [
        this.genLabel(),
        this.prefix ? this.genAffix('prefix') : null,
        this.genInput(),
        this.suffix ? this.genAffix('suffix') : null,
        this.genIconSlot(),
        this.genProgress()
      ]
    },
    genMessages () {
      return this.$createElement('div', {
        staticClass: 'v-input--text__details'
      }, [
        VInput.methods.genMessages.call(this),
        this.genCounter()
      ])
    },
    genAffix (type) {
      return this.$createElement('div', {
        'class': `v-input--text__${type}`,
        ref: type
      }, this[type])
    },
    onBlur (e) {
      this.isFocused = false
      // Reset internalChange state
      // to allow external change
      // to persist
      this.internalChange = false

      this.$nextTick(this.validate)
      this.$emit('blur', e)
    },
    onClick () {
      !this.isFocused &&
        !this.disabled &&
        this.onFocus()
    },
    onFocus (e) {
      if (!this.$refs.input) return

      this.isFocused = true
      if (document.activeElement !== this.$refs.input) {
        this.$refs.input.focus()
      }
      this.$emit('focus', e)
    },
    onInput (e) {
      this.mask && this.resetSelections(e.target)
      this.proxyValue = e.target.value
      this.badInput = e.target.validity && e.target.validity.badInput
    },
    onKeyDown (e) {
      // Prevents closing of a
      // dialog when pressing
      // enter
      if (this.isTextarea &&
        this.isFocused &&
        e.keyCode === 13
      ) {
        e.stopPropagation()
      }

      this.internalChange = true
    }
  }
}

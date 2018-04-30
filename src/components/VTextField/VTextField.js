// Styles
import '../../stylus/components/_text-fields.styl'

// Extensions
import VInput from '../VInput'

// Components
import VCounter from '../VCounter'
import VLabel from '../VLabel'

// Mixins
import Maskable from '../../mixins/maskable'

// Directives
import Ripple from '../../directives/ripple'

const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']

export default {
  name: 'v-text-field',

  extends: VInput,

  mixins: [Maskable],

  directives: { Ripple },

  inheritAttrs: false,

  data: () => ({
    badInput: false,
    initialValue: null,
    internalChange: false,
    isClearing: false
  }),

  props: {
    appendOuterIcon: String,
    autofocus: Boolean,
    box: Boolean,
    browserAutocomplete: String,
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
    flat: Boolean,
    fullWidth: Boolean,
    label: String,
    placeholder: String,
    prefix: String,
    singleLine: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text'
    }
  },

  computed: {
    classes () {
      return {
        'v-text-field': true,
        'v-text-field--prefix': this.prefix,
        'v-text-field--single-line': this.isSingle,
        'v-text-field--solo': this.isSolo,
        'v-text-field--solo-inverted': this.soloInverted,
        'v-text-field--box': this.box,
        'v-text-field--enclosed': this.isEnclosed,
        'elevation-0': this.flat
      }
    },
    directivesInput () {
      return this.box
        ? [{ name: 'ripple', value: true }]
        : []
    },
    dynamicHeight () {
      if (!this.isEnclosed) return VInput.computed.dynamicHeight.call(this)

      return this.height || (this.isEnclosed ? 56 : false)
    },
    internalValue: {
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
    isEnclosed () {
      return this.isSolo || this.box
    },
    isLabelActive () {
      return this.isDirty || dirtyTypes.includes(this.type)
    },
    isSingle () {
      return this.isSolo || this.singleLine
    },
    isSolo () {
      return this.solo || this.soloInverted
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
      this.internalValue = null
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

      const value = (this.internalValue || '').length
      const max = this.counter === true ? this.$attrs.maxlength : this.counter

      return this.$createElement(VCounter, {
        props: {
          value,
          max
        }
      })
    },
    genDefaultSlot () {
      return [
        this.genTextFieldSlot(),
        this.genIconSlot(),
        this.genProgress()
      ]
    },
    genLabel () {
      if (this.isSingle &&
        (this.isDirty || !!this.placeholder)
      ) return null

      const isSingleLine = this.isSingle
      let left = 0

      if (this.prefix &&
        (isSingleLine || !this.isFocused) &&
        !this.isDirty
      ) left = 12

      const data = {
        props: {
          absolute: true,
          color: this.validationState,
          disabled: this.disabled,
          focused: !isSingleLine && (this.isFocused || !!this.validationState),
          left,
          value: Boolean(!isSingleLine &&
            (this.isFocused || this.isDirty || this.placeholder))
        }
      }

      if (this.$attrs.id) data.props.for = this.$attrs.id

      return this.$createElement(VLabel, data, this.$slots.label || this.label)
    },
    genIconSlot () {
      const slot = []

      if (this.appendIcon) {
        slot.push(this.genIcon('append'))
      } else if (this.clearable && this.isDirty) {
        slot.push(this.genIcon('clear',
          this.clearIconCb || this.clearableCallback
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
      if (this.mask) data.attrs.maxlength = this.masked.length
      if (this.browserAutocomplete) data.attrs.autocomplete = this.browserAutocomplete

      return this.$createElement('input', data)
    },
    genMessages () {
      return this.$createElement('div', {
        staticClass: 'v-text-field__details'
      }, [
        VInput.methods.genMessages.call(this),
        this.genCounter()
      ])
    },
    genTextFieldSlot () {
      return this.$createElement('div', {
        staticClass: 'v-text-field__slot'
      }, [
        this.genLabel(),
        this.prefix ? this.genAffix('prefix') : null,
        this.genInput(),
        this.suffix ? this.genAffix('suffix') : null
      ])
    },
    genAffix (type) {
      return this.$createElement('div', {
        'class': `v-text-field__${type}`,
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
      if (this.isFocused || this.disabled) return

      this.$refs.input.focus()
    },
    onFocus (e) {
      if (!this.$refs.input) return

      if (document.activeElement !== this.$refs.input) {
        return this.$refs.input.focus()
      }

      this.isFocused = true
      this.$emit('focus', e)
    },
    onInput (e) {
      this.mask && this.resetSelections(e.target)
      this.internalValue = e.target.value
      this.badInput = e.target.validity && e.target.validity.badInput
    },
    onKeyDown () {
      this.internalChange = true
    }
  }
}

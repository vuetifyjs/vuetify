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

// Utilities
import {
  keyCodes
} from '../../util/helpers'

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
      default: '$vuetify.icons.clear'
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
    outline: Boolean,
    placeholder: String,
    prefix: String,
    reverse: Boolean,
    singleLine: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    suffix: String,
    textarea: Boolean, // TODO: Deprecate
    type: {
      type: String,
      default: 'text'
    }
  },

  computed: {
    classes () {
      return {
        'v-text-field': true,
        'v-text-field--full-width': this.fullWidth,
        'v-text-field--prefix': this.prefix,
        'v-text-field--single-line': this.isSingle,
        'v-text-field--solo': this.isSolo,
        'v-text-field--solo-inverted': this.soloInverted,
        'v-text-field--box': this.box,
        'v-text-field--enclosed': this.isEnclosed,
        'v-text-field--reverse': this.reverse,
        'v-text-field--outline': this.hasOutline,
        'elevation-0': this.flat
      }
    },
    directivesInput () {
      return []
    },
    // TODO: Deprecate
    hasOutline () {
      return this.outline || this.textarea
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
      return this.isSolo || this.hasOutline || this.fullWidth
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
    }
  },

  mounted () {
    this.autofocus && this.onFocus()
  },

  methods: {
    /** @public */
    focus () {
      this.onFocus()
    },
    /** @public */
    blur () {
      this.onBlur()
    },
    clearableCallback () {
      this.internalValue = null
      this.$nextTick(() => this.$refs.input.focus())
    },
    genAppendSlot () {
      const slot = []

      if (this.$slots['append-outer']) {
        slot.push(this.$slots['append-outer'])
      } else if (this.$slots['append-outer-icon']) {
        slot.push(this.$slots['append-outer-icon'])
      } else if (this.appendOuterIcon) {
        slot.push(this.genIcon('appendOuter'))
      }

      return this.genSlot('append', 'outer', slot)
    },
    genClearIcon () {
      if (!this.clearable) return null

      const icon = !this.isDirty
        ? false
        : 'clear'

      return this.genSlot('append', 'inner', [
        this.genIcon(icon, this.clearIconCb || this.clearableCallback)
      ])
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
        this.genClearIcon(),
        this.genIconSlot()
      ]
    },
    genLabel () {
      if (!this.hasLabel ||
        (this.isSingle &&
        (this.isDirty || !!this.placeholder))
      ) return null

      const isSingleLine = this.isSingle
      let value = 0
      let left = 'auto'
      let right = 'auto'

      // Create spacing
      if ((this.prefix || this.reverse) &&
        (isSingleLine || !this.isFocused) &&
        !this.isDirty
      ) value = 16

      // Check if RTL
      if (this.$vuetify.rtl) right = value
      else left = value

      // Check if reversed
      if (this.reverse) {
        const direction = right
        right = left
        left = direction
      }

      const data = {
        props: {
          absolute: true,
          color: this.validationState,
          disabled: this.disabled,
          focused: !isSingleLine && (this.isFocused || !!this.validationState),
          left,
          right,
          value: Boolean(!isSingleLine &&
            (this.isFocused || this.isDirty || this.placeholder))
        }
      }

      if (this.$attrs.id) data.props.for = this.$attrs.id

      return this.$createElement(VLabel, data, this.$slots.label || this.label)
    },
    genIconSlot () {
      const slot = []

      if (this.$slots['append']) {
        slot.push(this.$slots['append'])
      } else if (this.$slots['append-icon']) {
        slot.push(this.$slots['append-icon'])
      } else if (this.appendIcon) {
        slot.push(this.genIcon('append'))
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

      if (!this.isFocused) {
        this.isFocused = true
        this.$emit('focus', e)
      }
    },
    onInput (e) {
      this.mask && this.resetSelections(e.target)
      this.internalValue = e.target.value
      this.badInput = e.target.validity && e.target.validity.badInput
    },
    onKeyDown (e) {
      this.internalChange = true

      if (e.keyCode === keyCodes.enter) this.$emit('change', this.internalValue)

      this.$emit('keydown', e)
    },
    onMouseDown (e) {
      // Prevent input from being blurred
      if (e.target !== this.$refs.input) {
        e.preventDefault()
        e.stopPropagation()
      }

      VInput.methods.onMouseDown.call(this, e)
    },
    onMouseUp (e) {
      // Default click handler is on slot,
      // Mouse events are to enable specific
      // input types when clicked
      if (
        (this.isSolo || this.hasOutline) &&
        document.activeElement !== this.$refs.input
      ) {
        this.$refs.input.focus()
      }

      VInput.methods.onMouseUp.call(this, e)
    }
  }
}

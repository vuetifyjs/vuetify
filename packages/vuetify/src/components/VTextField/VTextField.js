// Styles
import '../../stylus/components/_text-fields.styl'

// Extensions
import VInput from '../VInput'

// Components
import VCounter from '../VCounter'
import VLabel from '../VLabel'

// Mixins
import Maskable from '../../mixins/maskable'
import Loadable from '../../mixins/loadable'

// Directives
import Ripple from '../../directives/ripple'

// Utilities
import {
  keyCodes
} from '../../util/helpers'
import { deprecate } from '../../util/console'

const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']

/* @vue/component */
export default VInput.extend({
  name: 'v-text-field',

  directives: { Ripple },

  mixins: [Maskable, Loadable],

  inheritAttrs: false,

  props: {
    appendOuterIcon: String,
    /** @deprecated */
    appendOuterIconCb: Function,
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
    prependInnerIcon: String,
    /** @deprecated */
    prependInnerIconCb: Function,
    reverse: Boolean,
    singleLine: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text'
    }
  },

  data: () => ({
    badInput: false,
    initialValue: null,
    internalChange: false,
    isClearing: false
  }),

  computed: {
    classes () {
      return {
        'v-text-field': true,
        'v-text-field--full-width': this.fullWidth,
        'v-text-field--prefix': this.prefix,
        'v-text-field--single-line': this.isSingle,
        'v-text-field--solo': this.isSolo,
        'v-text-field--solo-inverted': this.soloInverted,
        'v-text-field--solo-flat': this.flat,
        'v-text-field--box': this.box,
        'v-text-field--enclosed': this.isEnclosed,
        'v-text-field--reverse': this.reverse,
        'v-text-field--outline': this.hasOutline,
        'v-text-field--placeholder': this.placeholder
      }
    },
    counterValue () {
      return (this.internalValue || '').toString().length
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
      return (
        this.box ||
        this.isSolo ||
        this.hasOutline ||
        this.fullWidth
      )
    },
    isLabelActive () {
      return this.isDirty || dirtyTypes.includes(this.type)
    },
    isSingle () {
      return this.isSolo || this.singleLine
    },
    isSolo () {
      return this.solo || this.soloInverted
    },
    labelPosition () {
      const offset = (this.prefix && !this.labelValue) ? this.prefixWidth : 0

      return (!this.$vuetify.rtl !== !this.reverse) ? {
        left: 'auto',
        right: offset
      } : {
        left: offset,
        right: 'auto'
      }
    },
    showLabel () {
      return this.hasLabel && (!this.isSingle || (!this.isLabelActive && !this.placeholder && !this.prefixLabel))
    },
    labelValue () {
      return !this.isSingle &&
        Boolean(this.isFocused || this.isLabelActive || this.placeholder || this.prefixLabel)
    },
    prefixWidth () {
      if (!this.prefix && !this.$refs.prefix) return

      return this.$refs.prefix.offsetWidth
    },
    prefixLabel () {
      return (this.prefix && !this.value)
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
      this.$refs.input ? this.$refs.input.blur() : this.onBlur()
    },
    clearableCallback () {
      this.internalValue = null
      this.$nextTick(() => this.$refs.input.focus())
    },
    genAppendSlot () {
      const slot = []

      if (this.$slots['append-outer']) {
        slot.push(this.$slots['append-outer'])
      } else if (this.appendOuterIcon) {
        slot.push(this.genIcon('appendOuter'))
      }

      return this.genSlot('append', 'outer', slot)
    },
    genPrependInnerSlot () {
      const slot = []

      if (this.$slots['prepend-inner']) {
        slot.push(this.$slots['prepend-inner'])
      } else if (this.prependInnerIcon) {
        slot.push(this.genIcon('prependInner'))
      }

      return this.genSlot('prepend', 'inner', slot)
    },
    genIconSlot () {
      const slot = []

      if (this.$slots['append']) {
        slot.push(this.$slots['append'])
      } else if (this.appendIcon) {
        slot.push(this.genIcon('append'))
      }

      return this.genSlot('append', 'inner', slot)
    },
    genInputSlot () {
      const input = VInput.options.methods.genInputSlot.call(this)

      const prepend = this.genPrependInnerSlot()
      prepend && input.children.unshift(prepend)

      return input
    },
    genClearIcon () {
      if (!this.clearable) return null

      const icon = !this.isDirty
        ? false
        : 'clear'

      if (this.clearIconCb) deprecate(':clear-icon-cb', '@click:clear', this)

      return this.genSlot('append', 'inner', [
        this.genIcon(
          icon,
          (!this.$listeners['click:clear'] && this.clearIconCb) || this.clearableCallback,
          false
        )
      ])
    },
    genCounter () {
      if (this.counter === false || this.counter == null) return null

      const max = this.counter === true ? this.$attrs.maxlength : this.counter

      return this.$createElement(VCounter, {
        props: {
          dark: this.dark,
          light: this.light,
          max,
          value: this.counterValue
        }
      })
    },
    genDefaultSlot () {
      return [
        this.genTextFieldSlot(),
        this.genClearIcon(),
        this.genIconSlot(),
        this.genProgress()
      ]
    },
    genLabel () {
      if (!this.showLabel) return null

      const data = {
        props: {
          absolute: true,
          color: this.validationState,
          dark: this.dark,
          disabled: this.disabled,
          focused: !this.isSingle && (this.isFocused || !!this.validationState),
          left: this.labelPosition.left,
          light: this.light,
          right: this.labelPosition.right,
          value: this.labelValue
        }
      }

      if (this.$attrs.id) data.props.for = this.$attrs.id

      return this.$createElement(VLabel, data, this.$slots.label || this.label)
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
          'aria-label': (!this.$attrs || !this.$attrs.id) && this.label, // Label `for` will be set if we have an id
          ...this.$attrs,
          autofocus: this.autofocus,
          disabled: this.disabled,
          readonly: this.readonly,
          type: this.type
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
      if (this.hideDetails) return null

      return this.$createElement('div', {
        staticClass: 'v-text-field__details'
      }, [
        VInput.options.methods.genMessages.call(this),
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
      this.internalChange = true
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

      VInput.options.methods.onMouseDown.call(this, e)
    },
    onMouseUp (e) {
      if (this.hasMouseDown) this.focus()

      VInput.options.methods.onMouseUp.call(this, e)
    }
  }
})

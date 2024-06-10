// Styles
import './VTextField.sass'

// Extensions
import VInput from '../VInput'

// Components
import VCounter from '../VCounter'
import VLabel from '../VLabel'

// Mixins
import Intersectable from '../../mixins/intersectable'
import Loadable from '../../mixins/loadable'
import Validatable from '../../mixins/validatable'

// Directives
import resize from '../../directives/resize'
import ripple from '../../directives/ripple'

// Utilities
import { attachedRoot } from '../../util/dom'
import { convertToUnit, getSlot, keyCodes } from '../../util/helpers'
import { breaking, consoleWarn } from '../../util/console'

// Types
import mixins from '../../util/mixins'
import { VNode, PropType } from 'vue/types'

const baseMixins = mixins(
  VInput,
  Intersectable({
    onVisible: [
      'onResize',
      'tryAutofocus',
    ],
  }),
  Loadable,
)
interface options extends InstanceType<typeof baseMixins> {
  $refs: {
    label: HTMLElement
    input: HTMLInputElement
    'prepend-inner': HTMLElement
    prefix: HTMLElement
    suffix: HTMLElement
  }
}

const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-text-field',

  directives: {
    resize,
    ripple,
  },

  inheritAttrs: false,

  props: {
    appendOuterIcon: String,
    autofocus: Boolean,
    clearable: Boolean,
    clearIcon: {
      type: String,
      default: '$clear',
    },
    counter: [Boolean, Number, String],
    counterValue: Function as PropType<(value: any) => number>,
    filled: Boolean,
    flat: Boolean,
    fullWidth: Boolean,
    label: String,
    outlined: Boolean,
    placeholder: String,
    prefix: String,
    prependInnerIcon: String,
    persistentPlaceholder: Boolean,
    reverse: Boolean,
    rounded: Boolean,
    shaped: Boolean,
    singleLine: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text',
    },
  },

  data: () => ({
    badInput: false,
    labelWidth: 0,
    prefixWidth: 0,
    prependWidth: 0,
    initialValue: null,
    isBooted: false,
    isClearing: false,
  }),

  computed: {
    classes (): object {
      return {
        ...VInput.options.computed.classes.call(this),
        'v-text-field': true,
        'v-text-field--full-width': this.fullWidth,
        'v-text-field--prefix': this.prefix,
        'v-text-field--single-line': this.isSingle,
        'v-text-field--solo': this.isSolo,
        'v-text-field--solo-inverted': this.soloInverted,
        'v-text-field--solo-flat': this.flat,
        'v-text-field--filled': this.filled,
        'v-text-field--is-booted': this.isBooted,
        'v-text-field--enclosed': this.isEnclosed,
        'v-text-field--reverse': this.reverse,
        'v-text-field--outlined': this.outlined,
        'v-text-field--placeholder': this.placeholder,
        'v-text-field--rounded': this.rounded,
        'v-text-field--shaped': this.shaped,
      }
    },
    computedColor (): string | undefined {
      const computedColor = Validatable.options.computed.computedColor.call(this)

      if (!this.soloInverted || !this.isFocused) return computedColor

      return this.color || 'primary'
    },
    computedCounterValue (): number {
      if (typeof this.counterValue === 'function') {
        return this.counterValue(this.internalValue)
      }
      return [...(this.internalValue || '').toString()].length
    },
    hasCounter (): boolean {
      return this.counter !== false && this.counter != null
    },
    hasDetails (): boolean {
      return VInput.options.computed.hasDetails.call(this) || this.hasCounter
    },
    internalValue: {
      get (): any {
        return this.lazyValue
      },
      set (val: any) {
        this.lazyValue = val
        this.$emit('input', this.lazyValue)
      },
    },
    isDirty (): boolean {
      return this.lazyValue?.toString().length > 0 || this.badInput
    },
    isEnclosed (): boolean {
      return (
        this.filled ||
        this.isSolo ||
        this.outlined
      )
    },
    isLabelActive (): boolean {
      return this.isDirty || dirtyTypes.includes(this.type)
    },
    isSingle (): boolean {
      return (
        this.isSolo ||
        this.singleLine ||
        this.fullWidth ||
        // https://material.io/components/text-fields/#filled-text-field
        (this.filled && !this.hasLabel)
      )
    },
    isSolo (): boolean {
      return this.solo || this.soloInverted
    },
    labelPosition (): Record<'left' | 'right', string | number | undefined> {
      let offset = (this.prefix && !this.labelValue) ? this.prefixWidth : 0

      if (this.labelValue && this.prependWidth) offset -= this.prependWidth

      return (this.$vuetify.rtl === this.reverse) ? {
        left: offset,
        right: 'auto',
      } : {
        left: 'auto',
        right: offset,
      }
    },
    showLabel (): boolean {
      return this.hasLabel && !(this.isSingle && this.labelValue)
    },
    labelValue (): boolean {
      return this.isFocused || this.isLabelActive || this.persistentPlaceholder
    },
  },

  watch: {
    // labelValue: 'setLabelWidth', // moved to mounted, see #11533
    outlined: 'setLabelWidth',
    label () {
      this.$nextTick(this.setLabelWidth)
    },
    prefix () {
      this.$nextTick(this.setPrefixWidth)
    },
    isFocused: 'updateValue',
    value (val) {
      this.lazyValue = val
    },
  },

  created () {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('box')) {
      breaking('box', 'filled', this)
    }

    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('browser-autocomplete')) {
      breaking('browser-autocomplete', 'autocomplete', this)
    }

    /* istanbul ignore if */
    if (this.shaped && !(this.filled || this.outlined || this.isSolo)) {
      consoleWarn('shaped should be used with either filled or outlined', this)
    }
  },

  mounted () {
    // #11533
    this.$watch(() => this.labelValue, this.setLabelWidth)
    this.autofocus && this.tryAutofocus()
    requestAnimationFrame(() => {
      this.isBooted = true
      requestAnimationFrame(() => {
        if (!this.isIntersecting) {
          this.onResize()
        }
      })
    })
  },

  methods: {
    /** @public */
    focus () {
      this.onFocus()
    },
    /** @public */
    blur (e?: Event) {
      // https://github.com/vuetifyjs/vuetify/issues/5913
      // Safari tab order gets broken if called synchronous
      window.requestAnimationFrame(() => {
        this.$refs.input && this.$refs.input.blur()
      })
    },
    clearableCallback () {
      this.$refs.input && this.$refs.input.focus()
      this.$nextTick(() => this.internalValue = null)
    },
    genAppendSlot () {
      const slot = []

      if (this.$slots['append-outer']) {
        slot.push(this.$slots['append-outer'] as VNode[])
      } else if (this.appendOuterIcon) {
        slot.push(this.genIcon('appendOuter'))
      }

      return this.genSlot('append', 'outer', slot)
    },
    genPrependInnerSlot () {
      const slot = []

      if (this.$slots['prepend-inner']) {
        slot.push(this.$slots['prepend-inner'] as VNode[])
      } else if (this.prependInnerIcon) {
        slot.push(this.genIcon('prependInner'))
      }

      return this.genSlot('prepend', 'inner', slot)
    },
    genIconSlot () {
      const slot = []

      if (this.$slots.append) {
        slot.push(this.$slots.append as VNode[])
      } else if (this.appendIcon) {
        slot.push(this.genIcon('append'))
      }

      return this.genSlot('append', 'inner', slot)
    },
    genInputSlot () {
      const input = VInput.options.methods.genInputSlot.call(this)

      const prepend = this.genPrependInnerSlot()

      if (prepend) {
        input.children = input.children || []
        input.children.unshift(prepend)
      }

      return input
    },
    genClearIcon () {
      if (!this.clearable) return null

      // if the text field has no content then don't display the clear icon.
      // We add an empty div because other controls depend on a ref to append inner
      if (!this.isDirty) {
        return this.genSlot('append', 'inner', [
          this.$createElement('div'),
        ])
      }

      return this.genSlot('append', 'inner', [
        this.genIcon('clear', this.clearableCallback),
      ])
    },
    genCounter () {
      if (!this.hasCounter) return null

      const max = this.counter === true ? this.attrs$.maxlength : this.counter

      const props = {
        dark: this.dark,
        light: this.light,
        max,
        value: this.computedCounterValue,
      }

      return this.$scopedSlots.counter?.({ props }) ?? this.$createElement(VCounter, { props })
    },
    genControl () {
      return VInput.options.methods.genControl.call(this)
    },
    genDefaultSlot () {
      return [
        this.genFieldset(),
        this.genTextFieldSlot(),
        this.genClearIcon(),
        this.genIconSlot(),
        this.genProgress(),
      ]
    },
    genFieldset () {
      if (!this.outlined) return null

      return this.$createElement('fieldset', {
        attrs: {
          'aria-hidden': true,
        },
      }, [this.genLegend()])
    },
    genLabel () {
      if (!this.showLabel) return null

      const data = {
        props: {
          absolute: true,
          color: this.validationState,
          dark: this.dark,
          disabled: this.isDisabled,
          focused: !this.isSingle && (this.isFocused || !!this.validationState),
          for: this.computedId,
          left: this.labelPosition.left,
          light: this.light,
          right: this.labelPosition.right,
          value: this.labelValue,
        },
      }

      return this.$createElement(VLabel, data, getSlot(this, 'label') || this.label)
    },
    genLegend () {
      const width = !this.singleLine && (this.labelValue || this.isDirty) ? this.labelWidth : 0
      const span = this.$createElement('span', {
        domProps: { innerHTML: '&#8203;' },
        staticClass: 'notranslate',
      })

      return this.$createElement('legend', {
        style: {
          width: !this.isSingle ? convertToUnit(width) : undefined,
        },
      }, [span])
    },
    genInput () {
      const listeners = Object.assign({}, this.listeners$)
      delete listeners.change // Change should not be bound externally
      const { title, ...inputAttrs } = this.attrs$

      return this.$createElement('input', {
        style: {},
        domProps: {
          value: (this.type === 'number' && Object.is(this.lazyValue, -0)) ? '-0' : this.lazyValue,
        },
        attrs: {
          ...inputAttrs,
          autofocus: this.autofocus,
          disabled: this.isDisabled,
          id: this.computedId,
          placeholder: this.persistentPlaceholder || this.isFocused || !this.hasLabel ? this.placeholder : undefined,
          readonly: this.isReadonly,
          type: this.type,
        },
        on: Object.assign(listeners, {
          blur: this.onBlur,
          input: this.onInput,
          focus: this.onFocus,
          keydown: this.onKeyDown,
        }),
        ref: 'input',
        directives: [{
          name: 'resize',
          modifiers: { quiet: true },
          value: this.onResize,
        }],
      })
    },
    genMessages () {
      if (!this.showDetails) return null

      const messagesNode = VInput.options.methods.genMessages.call(this)
      const counterNode = this.genCounter()

      return this.$createElement('div', {
        staticClass: 'v-text-field__details',
      }, [
        messagesNode,
        counterNode,
      ])
    },
    genTextFieldSlot () {
      return this.$createElement('div', {
        staticClass: 'v-text-field__slot',
      }, [
        this.genLabel(),
        this.prefix ? this.genAffix('prefix') : null,
        this.genInput(),
        this.suffix ? this.genAffix('suffix') : null,
      ])
    },
    genAffix (type: 'prefix' | 'suffix') {
      return this.$createElement('div', {
        class: `v-text-field__${type}`,
        ref: type,
      }, this[type])
    },
    onBlur (e?: Event) {
      this.isFocused = false
      e && this.$nextTick(() => this.$emit('blur', e))
    },
    onClick () {
      if (this.isFocused || this.isDisabled || !this.$refs.input) return

      this.$refs.input.focus()
    },
    onFocus (e?: Event) {
      if (!this.$refs.input) return

      const root = attachedRoot(this.$el)
      if (!root) return

      if (root.activeElement !== this.$refs.input) {
        return this.$refs.input.focus()
      }

      if (!this.isFocused) {
        this.isFocused = true
        e && this.$emit('focus', e)
      }
    },
    onInput (e: Event) {
      const target = e.target as HTMLInputElement
      this.internalValue = target.value
      this.badInput = target.validity && target.validity.badInput
    },
    onKeyDown (e: KeyboardEvent) {
      if (
        e.keyCode === keyCodes.enter &&
        this.lazyValue !== this.initialValue
      ) {
        this.initialValue = this.lazyValue
        this.$emit('change', this.initialValue)
      }

      this.$emit('keydown', e)
    },
    onMouseDown (e: Event) {
      // Prevent input from being blurred
      if (e.target !== this.$refs.input) {
        e.preventDefault()
        e.stopPropagation()
      }

      VInput.options.methods.onMouseDown.call(this, e)
    },
    onMouseUp (e: Event) {
      if (this.hasMouseDown) this.focus()

      VInput.options.methods.onMouseUp.call(this, e)
    },
    setLabelWidth () {
      if (!this.outlined) return

      this.labelWidth = this.$refs.label
        ? Math.min(this.$refs.label.scrollWidth * 0.75 + 6, (this.$el as HTMLElement).offsetWidth - 24)
        : 0
    },
    setPrefixWidth () {
      if (!this.$refs.prefix) return

      this.prefixWidth = this.$refs.prefix.offsetWidth
    },
    setPrependWidth () {
      if (!this.outlined || !this.$refs['prepend-inner']) return

      this.prependWidth = this.$refs['prepend-inner'].offsetWidth
    },
    tryAutofocus () {
      if (
        !this.autofocus ||
        typeof document === 'undefined' ||
        !this.$refs.input) return false

      const root = attachedRoot(this.$el)
      if (!root || root.activeElement === this.$refs.input) return false

      this.$refs.input.focus()

      return true
    },
    updateValue (val: boolean) {
      // Sets validationState from validatable
      this.hasColor = val

      if (val) {
        this.initialValue = this.lazyValue
      } else if (this.initialValue !== this.lazyValue) {
        this.$emit('change', this.lazyValue)
      }
    },
    onResize () {
      this.setLabelWidth()
      this.setPrefixWidth()
      this.setPrependWidth()
    },
  },
})

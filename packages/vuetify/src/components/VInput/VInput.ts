// Styles
import './VInput.sass'

// Components
import VIcon from '../VIcon'
import VLabel from '../VLabel'
import VMessages from '../VMessages'

// Mixins
import BindsAttrs from '../../mixins/binds-attrs'
import Validatable from '../../mixins/validatable'

// Utilities
import {
  convertToUnit,
  getSlot,
  kebabCase,
} from '../../util/helpers'

// Types
import { VNode, VNodeData, PropType } from 'vue'
import mixins from '../../util/mixins'
import { InputValidationRule } from 'types'

const baseMixins = mixins(
  BindsAttrs,
  Validatable
)

interface options extends InstanceType<typeof baseMixins> {
  /* eslint-disable-next-line camelcase */
  $_modelEvent: string
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-input',

  inheritAttrs: false,

  props: {
    appendIcon: String,
    backgroundColor: {
      type: String,
      default: '',
    },
    dense: Boolean,
    height: [Number, String],
    hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,
    hint: String,
    id: String,
    label: String,
    loading: Boolean,
    persistentHint: Boolean,
    prependIcon: String,
    value: null as any as PropType<any>,
  },

  data () {
    return {
      lazyValue: this.value,
      hasMouseDown: false,
    }
  },

  computed: {
    classes (): object {
      return {
        'v-input--has-state': this.hasState,
        'v-input--hide-details': !this.showDetails,
        'v-input--is-label-active': this.isLabelActive,
        'v-input--is-dirty': this.isDirty,
        'v-input--is-disabled': this.disabled,
        'v-input--is-focused': this.isFocused,
        'v-input--is-loading': this.loading !== false && this.loading !== undefined,
        'v-input--is-readonly': this.readonly,
        'v-input--dense': this.dense,
        ...this.themeClasses,
      }
    },
    computedId (): string {
      return this.id || `input-${this._uid}`
    },
    hasHint (): boolean {
      return !this.hasMessages &&
        !!this.hint &&
        (this.persistentHint || this.isFocused)
    },
    hasLabel (): boolean {
      return !!(this.$slots.label || this.label)
    },
    // Proxy for `lazyValue`
    // This allows an input
    // to function without
    // a provided model
    internalValue: {
      get (): any {
        return this.lazyValue
      },
      set (val: any) {
        this.lazyValue = val
        this.$emit(this.$_modelEvent, val)
      },
    },
    isDirty (): boolean {
      return !!this.lazyValue
    },
    isDisabled (): boolean {
      return this.disabled || this.readonly
    },
    isLabelActive (): boolean {
      return this.isDirty
    },
    messagesToDisplay (): string[] {
      if (this.hasHint) return [this.hint]

      if (!this.hasMessages) return []

      return this.validations.map((validation: string | InputValidationRule) => {
        if (typeof validation === 'string') return validation

        const validationResult = validation(this.internalValue)

        return typeof validationResult === 'string' ? validationResult : ''
      }).filter(message => message !== '')
    },
    showDetails (): boolean {
      return this.hideDetails === false || (this.hideDetails === 'auto' && this.messagesToDisplay.length > 0)
    },
  },

  watch: {
    value (val) {
      this.lazyValue = val
    },
  },

  beforeCreate () {
    // v-radio-group needs to emit a different event
    // https://github.com/vuetifyjs/vuetify/issues/4752
    this.$_modelEvent = (this.$options.model && this.$options.model.event) || 'input'
  },

  methods: {
    genContent () {
      return [
        this.genPrependSlot(),
        this.genControl(),
        this.genAppendSlot(),
      ]
    },
    genControl () {
      return this.$createElement('div', {
        staticClass: 'v-input__control',
      }, [
        this.genInputSlot(),
        this.genMessages(),
      ])
    },
    genDefaultSlot () {
      return [
        this.genLabel(),
        this.$slots.default,
      ]
    },
    genIcon (
      type: string,
      cb?: (e: Event) => void
    ) {
      const icon = (this as any)[`${type}Icon`]
      const eventName = `click:${kebabCase(type)}`
      const hasListener = !!(this.listeners$[eventName] || cb)

      const data: VNodeData = {
        attrs: {
          'aria-label': hasListener ? kebabCase(type).split('-')[0] + ' icon' : undefined,
        },
        props: {
          color: this.validationState,
          dark: this.dark,
          disabled: this.disabled,
          light: this.light,
        },
        on: !hasListener
          ? undefined
          : {
            click: (e: Event) => {
              e.preventDefault()
              e.stopPropagation()

              this.$emit(eventName, e)
              cb && cb(e)
            },
            // Container has g event that will
            // trigger menu open if enclosed
            mouseup: (e: Event) => {
              e.preventDefault()
              e.stopPropagation()
            },
          },
      }

      return this.$createElement('div', {
        staticClass: `v-input__icon`,
        class: type ? `v-input__icon--${kebabCase(type)}` : undefined,
      }, [
        this.$createElement(
          VIcon,
          data,
          icon
        ),
      ])
    },
    genInputSlot () {
      return this.$createElement('div', this.setBackgroundColor(this.backgroundColor, {
        staticClass: 'v-input__slot',
        style: { height: convertToUnit(this.height) },
        on: {
          click: this.onClick,
          mousedown: this.onMouseDown,
          mouseup: this.onMouseUp,
        },
        ref: 'input-slot',
      }), [this.genDefaultSlot()])
    },
    genLabel () {
      if (!this.hasLabel) return null

      return this.$createElement(VLabel, {
        props: {
          color: this.validationState,
          dark: this.dark,
          disabled: this.disabled,
          focused: this.hasState,
          for: this.computedId,
          light: this.light,
        },
      }, this.$slots.label || this.label)
    },
    genMessages () {
      if (!this.showDetails) return null

      return this.$createElement(VMessages, {
        props: {
          color: this.hasHint ? '' : this.validationState,
          dark: this.dark,
          light: this.light,
          value: this.messagesToDisplay,
        },
        attrs: {
          role: this.hasMessages ? 'alert' : null,
        },
        scopedSlots: {
          default: props => getSlot(this, 'message', props),
        },
      })
    },
    genSlot (
      type: string,
      location: string,
      slot: (VNode | VNode[])[]
    ) {
      if (!slot.length) return null

      const ref = `${type}-${location}`

      return this.$createElement('div', {
        staticClass: `v-input__${ref}`,
        ref,
      }, slot)
    },
    genPrependSlot () {
      const slot = []

      if (this.$slots.prepend) {
        slot.push(this.$slots.prepend)
      } else if (this.prependIcon) {
        slot.push(this.genIcon('prepend'))
      }

      return this.genSlot('prepend', 'outer', slot)
    },
    genAppendSlot () {
      const slot = []

      // Append icon for text field was really
      // an appended inner icon, v-text-field
      // will overwrite this method in order to obtain
      // backwards compat
      if (this.$slots.append) {
        slot.push(this.$slots.append)
      } else if (this.appendIcon) {
        slot.push(this.genIcon('append'))
      }

      return this.genSlot('append', 'outer', slot)
    },
    onClick (e: Event) {
      this.$emit('click', e)
    },
    onMouseDown (e: Event) {
      this.hasMouseDown = true
      this.$emit('mousedown', e)
    },
    onMouseUp (e: Event) {
      this.hasMouseDown = false
      this.$emit('mouseup', e)
    },
  },

  render (h): VNode {
    return h('div', this.setTextColor(this.validationState, {
      staticClass: 'v-input',
      class: this.classes,
    }), this.genContent())
  },
})

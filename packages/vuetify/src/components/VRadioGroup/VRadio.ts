// Styles
import './VRadio.sass'

// Components
import VRadioGroup from './VRadioGroup'
import VLabel from '../VLabel'
import VIcon from '../VIcon'
import VInput from '../VInput'

// Mixins
import BindsAttrs from '../../mixins/binds-attrs'
import Colorable from '../../mixins/colorable'
import { factory as GroupableFactory } from '../../mixins/groupable'
import Rippleable from '../../mixins/rippleable'
import Themeable from '../../mixins/themeable'
import Selectable, { prevent } from '../../mixins/selectable'

// Utilities
import { getSlot } from '../../util/helpers'

// Types
import { VNode, VNodeData } from 'vue'
import mixins from '../../util/mixins'
import { mergeListeners } from '../../util/mergeData'

const baseMixins = mixins(
  BindsAttrs,
  Colorable,
  Rippleable,
  GroupableFactory('radioGroup'),
  Themeable
)

interface options extends InstanceType<typeof baseMixins> {
  radioGroup: InstanceType<typeof VRadioGroup>
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-radio',

  inheritAttrs: false,

  props: {
    disabled: Boolean,
    id: String,
    label: String,
    name: String,
    offIcon: {
      type: String,
      default: '$radioOff',
    },
    onIcon: {
      type: String,
      default: '$radioOn',
    },
    readonly: Boolean,
    value: {
      default: null,
    },
  },

  data: () => ({
    isFocused: false,
  }),

  computed: {
    classes (): object {
      return {
        'v-radio--is-disabled': this.isDisabled,
        'v-radio--is-focused': this.isFocused,
        ...this.themeClasses,
        ...this.groupClasses,
      }
    },
    computedColor (): string | undefined {
      return Selectable.options.computed.computedColor.call(this)
    },
    computedIcon (): string {
      return this.isActive
        ? this.onIcon
        : this.offIcon
    },
    computedId (): string {
      return VInput.options.computed.computedId.call(this)
    },
    hasLabel: VInput.options.computed.hasLabel,
    hasState (): boolean {
      return (this.radioGroup || {}).hasState
    },
    isDisabled (): boolean {
      return this.disabled || (
        !!this.radioGroup &&
        this.radioGroup.isDisabled
      )
    },
    isReadonly (): boolean {
      return this.readonly || (
        !!this.radioGroup &&
        this.radioGroup.isReadonly
      )
    },
    computedName (): string {
      if (this.name || !this.radioGroup) {
        return this.name
      }

      return this.radioGroup.name || `radio-${this.radioGroup._uid}`
    },
    rippleState (): string | undefined {
      return Selectable.options.computed.rippleState.call(this)
    },
    validationState (): string | undefined {
      return (this.radioGroup || {}).validationState || this.computedColor
    },
  },

  methods: {
    genInput (args: any) {
      // We can't actually use the mixin directly because
      // it's made for standalone components, but its
      // genInput method is exactly what we need
      return Selectable.options.methods.genInput.call(this, 'radio', args)
    },
    genLabel () {
      if (!this.hasLabel) return null

      return this.$createElement(VLabel, {
        on: {
          // Label shouldn't cause the input to focus
          click: prevent,
        },
        attrs: {
          for: this.computedId,
        },
        props: {
          color: this.validationState,
          focused: this.hasState,
        },
      }, getSlot(this, 'label') || this.label)
    },
    genRadio () {
      return this.$createElement('div', {
        staticClass: 'v-input--selection-controls__input',
      }, [
        this.$createElement(VIcon, this.setTextColor(this.validationState, {
          props: {
            dense: this.radioGroup && this.radioGroup.dense,
          },
        }), this.computedIcon),
        this.genInput({
          name: this.computedName,
          value: this.value,
          ...this.attrs$,
        }),
        this.genRipple(this.setTextColor(this.rippleState)),
      ])
    },
    onFocus (e: Event) {
      this.isFocused = true
      this.$emit('focus', e)
    },
    onBlur (e: Event) {
      this.isFocused = false
      this.$emit('blur', e)
    },
    onChange () {
      if (this.isDisabled || this.isReadonly || this.isActive) return

      this.toggle()
    },
    onKeydown: () => {}, // Override default with noop
  },

  render (h): VNode {
    const data: VNodeData = {
      staticClass: 'v-radio',
      class: this.classes,
      on: mergeListeners({
        click: this.onChange,
      }, this.listeners$),
    }

    return h('div', data, [
      this.genRadio(),
      this.genLabel(),
    ])
  },
})

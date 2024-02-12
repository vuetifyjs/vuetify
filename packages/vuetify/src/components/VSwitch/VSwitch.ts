// Styles
import '../../styles/components/_selection-controls.sass'
import './VSwitch.sass'

// Mixins
import Selectable from '../../mixins/selectable'
import VInput from '../VInput'

// Directives
import Touch from '../../directives/touch'

// Components
import { VFabTransition } from '../transitions'
import VProgressCircular from '../VProgressCircular/VProgressCircular'

// Helpers
import { getSlot, keyCodes } from '../../util/helpers'

// Types
import { VNode, VNodeData } from 'vue'

/* @vue/component */
export default Selectable.extend({
  name: 'v-switch',

  directives: { Touch },

  props: {
    inset: Boolean,
    loading: {
      type: [Boolean, String],
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes (): object {
      return {
        ...VInput.options.computed.classes.call(this),
        'v-input--selection-controls v-input--switch': true,
        'v-input--switch--flat': this.flat,
        'v-input--switch--inset': this.inset,
      }
    },
    attrs (): object {
      return {
        'aria-checked': String(this.isActive),
        'aria-disabled': String(this.isDisabled),
        role: 'switch',
      }
    },
    // Do not return undefined if disabled,
    // according to spec, should still show
    // a color when disabled and active
    validationState (): string | undefined {
      if (this.hasError && this.shouldValidate) return 'error'
      if (this.hasSuccess) return 'success'
      if (this.hasColor !== null) return this.computedColor
      return undefined
    },
    switchData (): VNodeData {
      return this.setTextColor(this.loading ? undefined : this.validationState, {
        class: this.themeClasses,
      })
    },
  },

  methods: {
    genDefaultSlot (): (VNode | null)[] {
      return [
        this.genSwitch(),
        this.genLabel(),
      ]
    },
    genSwitch (): VNode {
      const { title, ...switchAttrs } = this.attrs$

      return this.$createElement('div', {
        staticClass: 'v-input--selection-controls__input',
      }, [
        this.genInput('checkbox', {
          ...this.attrs,
          ...switchAttrs,
        }),
        this.genRipple(this.setTextColor(this.validationState, {
          directives: [{
            name: 'touch',
            value: {
              left: this.onSwipeLeft,
              right: this.onSwipeRight,
            },
          }],
        })),
        this.$createElement('div', {
          staticClass: 'v-input--switch__track',
          ...this.switchData,
        }),
        this.$createElement('div', {
          staticClass: 'v-input--switch__thumb',
          ...this.switchData,
        }, [this.genProgress()]),
      ])
    },
    genProgress (): VNode {
      return this.$createElement(VFabTransition, {}, [
        this.loading === false
          ? null
          : getSlot(this, 'progress') || this.$createElement(VProgressCircular, {
            props: {
              color: (this.loading === true || this.loading === '')
                ? (this.color || 'primary')
                : this.loading,
              size: 16,
              width: 2,
              indeterminate: true,
            },
          }),
      ])
    },
    onSwipeLeft () {
      if (this.isActive) this.onChange()
    },
    onSwipeRight () {
      if (!this.isActive) this.onChange()
    },
    onKeydown (e: KeyboardEvent) {
      if (
        (e.keyCode === keyCodes.left && this.isActive) ||
        (e.keyCode === keyCodes.right && !this.isActive)
      ) this.onChange()
    },
  },
})

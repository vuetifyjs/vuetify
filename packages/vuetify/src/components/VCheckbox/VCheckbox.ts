// Styles
import './VCheckbox.sass'
import '../../styles/components/_selection-controls.sass'

// Components
import VIcon from '../VIcon'
import VInput from '../VInput'
import VLabel from '../VLabel'

// Mixins
import Selectable from '../../mixins/selectable'

// Utilities
import { getSlot } from '../../util/helpers'

/* @vue/component */
export default Selectable.extend({
  name: 'v-checkbox',

  props: {
    description: String,
    indeterminate: Boolean,
    indeterminateIcon: {
      type: String,
      default: '$vuetify.icons.checkboxIndeterminate',
    },
    onIcon: {
      type: String,
      default: '$vuetify.icons.checkboxOn',
    },
    offIcon: {
      type: String,
      default: '$vuetify.icons.checkboxOff',
    },
  },

  data () {
    return {
      inputIndeterminate: this.indeterminate,
    }
  },

  computed: {
    classes (): object {
      return {
        ...VInput.options.computed.classes.call(this),
        'v-input--selection-controls': true,
        'v-input--checkbox': true,
        'v-input--indeterminate': this.inputIndeterminate,
      }
    },
    computedIcon (): string {
      if (this.inputIndeterminate) {
        return this.indeterminateIcon
      } else if (this.isActive) {
        return this.onIcon
      } else {
        return this.offIcon
      }
    },
    computedId (): string {
      return VInput.options.computed.computedId.call(this)
    },
    hasDescription (): boolean {
      return (this.description || '').length > 0
    },
    hasLabel: VInput.options.computed.hasLabel,
    // Do not return undefined if disabled,
    // according to spec, should still show
    // a color when disabled and active
    validationState (): string | undefined {
      if (this.disabled && !this.inputIndeterminate) return undefined
      if (this.hasError && this.shouldValidate) return 'error'
      if (this.hasSuccess) return 'success'
      if (this.hasColor) return this.computedColor
      return undefined
    },
  },

  watch: {
    indeterminate (val) {
      this.inputIndeterminate = val
    },
    inputIndeterminate (val) {
      this.$emit('update:indeterminate', val)
    },
    isActive () {
      if (!this.indeterminate) return
      this.inputIndeterminate = false
    },
  },

  methods: {
    genCheckbox () {
      return this.$createElement('div', {
        staticClass: 'v-input--selection-controls__input',
      }, [
        this.genInput('checkbox', {
          ...this.$attrs,
          'aria-checked': this.inputIndeterminate
            ? 'mixed'
            : this.isActive.toString(),
        }),
        this.genRipple(this.setTextColor(this.validationState)),
        this.$createElement(VIcon, this.setTextColor(this.validationState, {
          props: {
            dark: this.dark,
            light: this.light,
          },
        }), this.computedIcon),
      ])
    },
    genDescription () {
      if (!this.hasDescription) return null

      return this.$createElement('span', {
        staticClass: 'v-label--description',
        class: this.classes,
      }, getSlot(this, 'description') || this.description)
    },
    genLabel () {
      if (!this.hasLabel) return null

      const label = getSlot(this, 'label') || this.label

      return this.$createElement(VLabel, {
        on: {
          click: (e: Event) => {
            // Prevent label from
            // causing the input
            // to focus
            e.preventDefault()

            this.onChange()
          },
        },
        attrs: {
          for: this.computedId,
          color: this.validationState,
          dark: this.dark,
          focused: this.hasState,
          light: this.light,
        },
        props: {
          color: this.validationState,
        },
      },
      [
        this.$createElement('span', {
          staticClass: 'v-label--content',
        }, label),
        this.genDescription(),
      ])
    },
    genDefaultSlot () {
      return [
        this.genCheckbox(),
        this.genLabel(),
      ]
    },
  },
})

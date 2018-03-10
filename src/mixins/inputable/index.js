// Local Mixins
import InputGenerators from './inputable-generators'

// Mixins
import Colorable from '../colorable'
import Loadable from '../loadable'
import Themeable from '../themeable'
import Validatable from '../validatable'

export default {
  name: 'input',

  mixins: [
    Colorable,
    Loadable,
    InputGenerators,
    Themeable,
    Validatable
  ],

  data () {
    return {
      isFocused: false,
      tabFocused: false,
      internalTabIndex: null,
      lazyValue: this.value
    }
  },

  props: {
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    clearable: Boolean,
    clearIcon: String,
    hint: String,
    hideDetails: Boolean,
    label: String,
    outerIcon: String,
    persistentHint: Boolean,
    placeholder: String,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    required: Boolean,
    tabindex: {
      default: 0
    },
    toggleKeys: {
      type: Array,
      default: () => [13, 32]
    },
    value: {
      required: false
    }
  },

  computed: {
    classesColor () {
      return this.addTextColorClassChecks()
    },
    classesInput () {
      return {
        ...this.classes,
        'v-input--is-focused': this.isFocused,
        'v-input--is-loading': this.loading !== false,
        'v-input--is-dirty': this.isDirty,
        'v-input--is-disabled': this.disabled,
        'v-input--has-state': this.hasState,
        ...this.classesColor,
        'theme--light': !this.dark,
        'theme--dark': this.dark
      }
    },
    currentColor () {
      if (this.hasError) return 'error'
      if (this.hasSuccess) return 'success'
      if (this.isFocused) return this.color
      return null
    },
    hasState () {
      return this.hasError || this.hasSuccess || this.isFocused
    },
    isDirty () {
      return !!this.inputValue
    }
  },

  methods: {
    groupFocus (e) {},
    groupBlur (e) {
      this.tabFocused = false
    },

    hasIcon (icon) {
      return this[`${icon}Icon`] || this.$slots[`${icon}Icon`]
    },
    onClick () {
      this.$emit('click')
    },
    shouldClear (type) {
      return (type === 'append' || type === 'clear') &&
        this.clearable &&
        this.isDirty
    }
  }
}

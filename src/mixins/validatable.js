
import { inject as RegistrableInject } from './registrable'
import { consoleError } from '../util/console'

// Mixins
import Colorable from './colorable'

export default {
  name: 'validatable',

  mixins: [
    Colorable,
    RegistrableInject('form')
  ],

  data: vm => ({
    errorBucket: [],
    hasColor: false,
    hasFocused: false,
    hasInput: false,
    shouldValidate: false,
    valid: false
  }),

  props: {
    error: Boolean,
    errorCount: {
      type: [Number, String],
      default: 1
    },
    errorMessages: {
      type: [String, Array],
      default: () => []
    },
    messages: {
      type: [String, Array],
      default: () => []
    },
    rules: {
      type: Array,
      default: () => []
    },
    success: Boolean,
    successMessages: {
      type: [String, Array],
      default: () => []
    },
    validateOnBlur: Boolean
  },

  computed: {
    hasError () {
      return this.errorMessages.length > 0 ||
        this.errorBucket.length > 0 ||
        this.error
    },
    // TODO: Add logic that allows the user to enable based
    // upon a good validation
    hasSuccess () {
      return this.successMessages.length > 0 ||
        this.success
    },
    hasMessages () {
      return this.validations.length > 0
    },
    hasState () {
      return this.shouldValidate && (this.hasError || this.hasSuccess)
    },
    validations () {
      return this.validationTarget.slice(0, this.errorCount)
    },
    validationState () {
      if (this.hasError && this.shouldValidate) return 'error'
      if (this.hasSuccess && this.shouldValidate) return 'success'
      if (this.hasColor) return this.color
      return null
    },
    validationTarget () {
      const target = this.errorMessages.length > 0
        ? this.errorMessages
        : this.successMessages.length > 0
          ? this.successMessages
          : this.messages

      // String
      if (!Array.isArray(target)) {
        return [target]
      // Array with items
      } else if (target.length > 0) {
        return target
      // Currently has validation
      } else if (this.shouldValidate) {
        return this.errorBucket
      } else {
        return []
      }
    }
  },

  watch: {
    rules: {
      handler (newVal, oldVal) {
        // TODO: This handler seems to trigger when input changes, even though
        // rules array stays the same? Solved it like this for now
        if (newVal.length === oldVal.length) return

        this.validate()
      },
      deep: true
    },
    internalValue (val) {
      // If it's the first time we're setting input,
      // mark it with hasInput
      if (!!val && !this.hasInput) this.hasInput = true

      if (this.hasInput && !this.validateOnBlur) this.shouldValidate = true
    },
    isFocused (val) {
      // If we're not focused, and it's the first time
      // we're defocusing, set shouldValidate to true
      if (!val && !this.hasFocused) {
        this.hasFocused = true
        this.shouldValidate = true

        this.$emit('update:error', this.errorBucket.length > 0)
      }
    },
    hasError (val) {
      if (this.shouldValidate) {
        this.$emit('update:error', val)
      }
    },
    error (val) {
      this.shouldValidate = !!val
    }
  },

  beforeMount () {
    this.shouldValidate = !!this.error
    this.validate()
  },

  created () {
    this.form && this.form.register(this)
  },

  beforeDestroy () {
    this.form && this.form.unregister(this)
  },

  methods: {
    reset () {
      this.shouldValidate = false
      this.hasFocused = false
    },
    validate (force = false, value = this.internalValue) {
      if (force) this.shouldValidate = true

      this.errorBucket = []

      for (let index = 0; index < this.rules.length; index++) {
        const rule = this.rules[index]
        const valid = typeof rule === 'function' ? rule(value) : rule

        if (valid === false || typeof valid === 'string') {
          this.errorBucket.push(valid)
        } else if (valid !== true) {
          consoleError(`Rules should return a string or boolean, received '${typeof valid}' instead`, this)
        }
      }

      this.valid = this.errorBucket.length === 0

      return this.valid
    }
  }
}

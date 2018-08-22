import { deepEqual } from '../util/helpers'
import { inject as RegistrableInject } from './registrable'
import { consoleError } from '../util/console'

// Mixins
import Colorable from './colorable'

/* @vue/component */
export default {
  name: 'validatable',

  mixins: [
    Colorable,
    RegistrableInject('form')
  ],

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

  data: () => ({
    errorBucket: [],
    hasColor: false,
    hasFocused: false,
    hasInput: false,
    isResetting: false,
    valid: false
  }),

  computed: {
    hasError () {
      return this.internalErrorMessages.length > 0 ||
        this.errorBucket.length > 0 ||
        this.error
    },
    externalError () {
      return this.internalErrorMessages.length > 0 || this.error
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
      return this.hasSuccess || (this.shouldValidate && this.hasError)
    },
    internalErrorMessages () {
      return this.errorMessages || ''
    },
    shouldValidate () {
      return this.externalError || (!this.isResetting && (
        this.validateOnBlur
          ? this.hasFocused && !this.isFocused
          : (this.hasInput || this.hasFocused)
      ))
    },
    validations () {
      return this.validationTarget.slice(0, this.errorCount)
    },
    validationState () {
      if (this.hasError && this.shouldValidate) return 'error'
      if (this.hasSuccess) return 'success'
      if (this.hasColor) return this.color
      return null
    },
    validationTarget () {
      const target = this.internalErrorMessages.length > 0
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
        if (deepEqual(newVal, oldVal)) return
        this.validate()
      },
      deep: true
    },
    internalValue () {
      // If it's the first time we're setting input,
      // mark it with hasInput
      this.hasInput = true
      this.validateOnBlur || this.$nextTick(this.validate)
    },
    isFocused (val) {
      if (!val) {
        this.hasFocused = true
        this.validateOnBlur && this.validate()
      }
    },
    isResetting () {
      setTimeout(() => {
        this.hasInput = false
        this.hasFocused = false
        this.isResetting = false
      }, 0)
    },
    hasError (val) {
      if (this.shouldValidate) {
        this.$emit('update:error', val)
      }
    }
  },

  beforeMount () {
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
      this.isResetting = true
      this.internalValue = Array.isArray(this.internalValue)
        ? []
        : undefined
    },
    validate (force = false, value = this.internalValue) {
      const errorBucket = []

      if (force) this.hasInput = this.hasFocused = true

      for (let index = 0; index < this.rules.length; index++) {
        const rule = this.rules[index]
        const valid = typeof rule === 'function' ? rule(value) : rule

        if (valid === false || typeof valid === 'string') {
          errorBucket.push(valid)
        } else if (valid !== true) {
          consoleError(`Rules should return a string or boolean, received '${typeof valid}' instead`, this)
        }
      }

      this.errorBucket = errorBucket
      this.valid = errorBucket.length === 0

      return this.valid
    }
  }
}

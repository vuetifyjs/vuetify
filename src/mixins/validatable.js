export default {
  data () {
    return {
      errorBucket: [],
      hasFocused: false,
      hasInput: false,
      shouldValidate: false,
      valid: false
    }
  },

  props: {
    error: {
      type: Boolean,
      default: true
    },
    errorMessages: {
      type: [String, Array],
      default: () => []
    },
    rules: {
      type: Array,
      default: () => []
    },
    validateOnBlur: Boolean
  },

  computed: {
    validations () {
      if (!Array.isArray(this.errorMessages)) {
        return [this.errorMessages]
      } else if (this.errorMessages.length > 0) {
        return this.errorMessages
      } else if (this.shouldValidate) {
        return this.errorBucket
      } else {
        return []
      }
    },
    hasError () {
      return this.validations.length > 0 ||
        this.errorMessages.length > 0
    }
  },

  watch: {
    rules () {
      this.validate()
    },
    lazyValue (val) {
      // If it's the first time we're setting input,
      // mark it with hasInput
      if (!!val && !this.hasInput) this.hasInput = true

      if (this.hasInput && !this.validateOnBlur) this.shouldValidate = true
    },
    focused (val) {
      // If we're not focused, and it's the first time
      // we're defocusing, set shouldValidate to true
      if (!val && !this.hasFocused) {
        this.hasFocused = true
        this.shouldValidate = true

        this.$emit('update:error', this.errorBucket.length > 0)
      }
    },
    hasError (val) {
      this.valid = !val
      this.$emit('update:error', val)
    }
  },

  mounted () {
    this.validate()
  },

  methods: {
    validate (force) {
      if (force) this.shouldValidate = true

      this.errorBucket = []

      this.rules.forEach(rule => {
        const valid = typeof rule === 'function'
          ? rule(this.inputValue)
          : rule

        if (valid !== true) {
          this.errorBucket.push(valid)
        }
      })
    }
  }
}

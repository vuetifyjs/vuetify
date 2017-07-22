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
    error: Boolean,
    errorMessages: {
      type: [String, Array],
      default: () => []
    },
    rules: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    validations () {
      if (!this.shouldValidate) {
        return []
      } else if (!Array.isArray(this.errorMessages)) {
        return [this.errorMessages]
      } else {
        return this.errorMessages.concat(this.errorBucket)
      }
    },
    hasError () {
      return this.validations.length > 0 || this.error
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

      if (this.hasInput) this.shouldValidate = true
    },
    focused (val) {
      // If we're not focused, and it's the first time
      // we're defocusing, set shouldValidate to true
      if (!val && !this.hasFocused) {
        this.hasFocused = true
        this.shouldValidate = true
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
          ? rule(this.value)
          : rule

        if (valid !== true) {
          this.errorBucket.push(valid)
        }
      })
    }
  }
}

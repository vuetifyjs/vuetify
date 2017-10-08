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
      type: Boolean
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
        this.errorMessages.length > 0 ||
        this.error
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
    inputValue (val) {
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

  mounted () {
    this.shouldValidate = !!this.error
    this.validate()
  },

  methods: {
    reset () {
      // TODO: Do this another way!
      // This is so that we can reset all types of inputs
      this.$emit('input', this.isMultiple ? [] : null)
      this.$emit('change', null)

      this.$nextTick(() => {
        this.shouldValidate = false
        this.hasFocused = false
        this.validate()
      })
    },
    validate (force = false, value = this.inputValue) {
      if (force) this.shouldValidate = true

      this.errorBucket = []

      this.rules.forEach(rule => {
        const valid = typeof rule === 'function' ? rule(value) : rule

        if (valid !== true && !['string', 'boolean'].includes(typeof valid)) {
          throw new TypeError(`Rules should return a string or boolean, received '${typeof valid}' instead`)
        }

        if (valid !== true) {
          this.errorBucket.push(valid)
        }
      })

      this.valid = this.errorBucket.length === 0

      return this.valid
    }
  }
}

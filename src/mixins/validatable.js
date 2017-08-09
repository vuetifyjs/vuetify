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
      if (this.shouldValidate) {
        this.valid = !val
        this.$emit('update:error', val)
      }
    }
  },

  mounted () {
    this.validate()
  },

  methods: {
    reset () {
      // TODO: Do this another way!
      // This is so that we can reset all types of inputs
      this.$emit('input', null)
      this.$emit('change', null)

      this.$nextTick(() => {
        this.shouldValidate = false
        this.hasFocused = false
      })
    },
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

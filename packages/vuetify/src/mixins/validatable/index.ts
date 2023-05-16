// Mixins
import Colorable from '../colorable'
import Themeable from '../themeable'
import { inject as RegistrableInject } from '../registrable'

// Utilities
import { deepEqual } from '../../util/helpers'
import { consoleError } from '../../util/console'
import mixins from '../../util/mixins'

// Types
import { PropValidator } from 'vue/types/options'
import { InputMessage, InputValidationRules } from 'vuetify/types'

const baseMixins = mixins(
  Colorable,
  RegistrableInject<'form', any>('form'),
  Themeable,
)

/* @vue/component */
export default baseMixins.extend({
  name: 'validatable',

  props: {
    disabled: {
      type: Boolean,
      default: null,
    },
    error: Boolean,
    errorCount: {
      type: [Number, String],
      default: 1,
    },
    errorMessages: {
      type: [String, Array],
      default: () => [],
    } as PropValidator<InputMessage | null>,
    messages: {
      type: [String, Array],
      default: () => [],
    } as PropValidator<InputMessage | null>,
    readonly: {
      type: Boolean,
      default: null,
    },
    rules: {
      type: Array,
      default: () => [],
    } as PropValidator<InputValidationRules>,
    success: Boolean,
    successMessages: {
      type: [String, Array],
      default: () => [],
    } as PropValidator<InputMessage | null>,
    validateOnBlur: Boolean,
    value: { required: false },
  },

  data () {
    return {
      errorBucket: [] as string[],
      hasColor: false,
      hasFocused: false,
      hasInput: false,
      isFocused: false,
      isResetting: false,
      lazyValue: this.value,
      valid: false,
    }
  },

  computed: {
    computedColor (): string | undefined {
      if (this.isDisabled) return undefined
      if (this.color) return this.color
      // It's assumed that if the input is on a
      // dark background, the user will want to
      // have a white color. If the entire app
      // is setup to be dark, then they will
      // like want to use their primary color
      if (this.isDark && !this.appIsDark) return 'white'
      else return 'primary'
    },
    hasError (): boolean {
      return (
        this.internalErrorMessages.length > 0 ||
        this.errorBucket.length > 0 ||
        this.error
      )
    },
    // TODO: Add logic that allows the user to enable based
    // upon a good validation
    hasSuccess (): boolean {
      return (
        this.internalSuccessMessages.length > 0 ||
        this.success
      )
    },
    externalError (): boolean {
      return this.internalErrorMessages.length > 0 || this.error
    },
    hasMessages (): boolean {
      return this.validationTarget.length > 0
    },
    hasState (): boolean {
      if (this.isDisabled) return false

      return (
        this.hasSuccess ||
        (this.shouldValidate && this.hasError)
      )
    },
    internalErrorMessages (): InputValidationRules {
      return this.genInternalMessages(this.errorMessages)
    },
    internalMessages (): InputValidationRules {
      return this.genInternalMessages(this.messages)
    },
    internalSuccessMessages (): InputValidationRules {
      return this.genInternalMessages(this.successMessages)
    },
    internalValue: {
      get (): unknown {
        return this.lazyValue
      },
      set (val: any) {
        this.lazyValue = val

        this.$emit('input', val)
      },
    },
    isDisabled (): boolean {
      return this.disabled ?? (
        !!this.form &&
        this.form.disabled
      )
    },
    isInteractive (): boolean {
      return !this.isDisabled && !this.isReadonly
    },
    isReadonly (): boolean {
      return this.readonly ?? (
        !!this.form &&
        this.form.readonly
      )
    },
    shouldValidate (): boolean {
      if (this.externalError) return true
      if (this.isResetting) return false

      return this.validateOnBlur
        ? this.hasFocused && !this.isFocused
        : (this.hasInput || this.hasFocused)
    },
    validations (): InputValidationRules {
      return this.validationTarget.slice(0, Number(this.errorCount))
    },
    validationState (): string | undefined {
      if (this.isDisabled) return undefined
      if (this.hasError && this.shouldValidate) return 'error'
      if (this.hasSuccess) return 'success'
      if (this.hasColor) return this.computedColor
      return undefined
    },
    validationTarget (): InputValidationRules {
      if (this.internalErrorMessages.length > 0) {
        return this.internalErrorMessages
      } else if (this.successMessages && this.successMessages.length > 0) {
        return this.internalSuccessMessages
      } else if (this.messages && this.messages.length > 0) {
        return this.internalMessages
      } else if (this.shouldValidate) {
        return this.errorBucket
      } else return []
    },
  },

  watch: {
    rules: {
      handler (newVal, oldVal) {
        if (deepEqual(newVal, oldVal)) return
        this.validate()
      },
      deep: true,
    },
    internalValue () {
      // If it's the first time we're setting input,
      // mark it with hasInput
      this.hasInput = true
      this.validateOnBlur || this.$nextTick(this.validate)
    },
    isFocused (val) {
      // Should not check validation
      // if disabled
      if (
        !val &&
        !this.isDisabled
      ) {
        this.hasFocused = true
        this.validateOnBlur && this.$nextTick(this.validate)
      }
    },
    isResetting () {
      setTimeout(() => {
        this.hasInput = false
        this.hasFocused = false
        this.isResetting = false
        this.validate()
      }, 0)
    },
    hasError (val) {
      if (this.shouldValidate) {
        this.$emit('update:error', val)
      }
    },
    value (val) {
      this.lazyValue = val
    },
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
    genInternalMessages (messages: InputMessage | null): InputValidationRules {
      if (!messages) return []
      else if (Array.isArray(messages)) return messages
      else return [messages]
    },
    /** @public */
    reset () {
      this.isResetting = true
      this.internalValue = Array.isArray(this.internalValue)
        ? []
        : null
    },
    /** @public */
    resetValidation () {
      this.isResetting = true
    },
    /** @public */
    validate (force = false, value?: any): boolean {
      const errorBucket = []
      value = value || this.internalValue

      if (force) this.hasInput = this.hasFocused = true

      for (let index = 0; index < this.rules.length; index++) {
        const rule = this.rules[index]
        const valid = typeof rule === 'function' ? rule(value) : rule

        if (valid === false || typeof valid === 'string') {
          errorBucket.push(valid || '')
        } else if (typeof valid !== 'boolean') {
          consoleError(`Rules should return a string or boolean, received '${typeof valid}' instead`, this)
        }
      }

      this.errorBucket = errorBucket
      this.valid = errorBucket.length === 0

      return this.valid
    },
  },
})

<script>
  import Input from '../../mixins/input'

  export default {
    name: 'v-text-field',

    mixins: [Input],

    inheritAttrs: false,

    data () {
      return {
        inputHeight: null
      }
    },

    props: {
      autofocus: Boolean,
      autoGrow: Boolean,
      counter: [Number, String],
      fullWidth: Boolean,
      multiLine: Boolean,
      placeholder: String,
      prefix: String,
      rows: {
        default: 5
      },
      singleLine: Boolean,
      solo: Boolean,
      suffix: String,
      textarea: Boolean,
      type: {
        type: String,
        default: 'text'
      }
    },

    computed: {
      classes () {
        return {
          'input-group--text-field': true,
          'input-group--single-line': this.singleLine,
          'input-group--solo': this.solo,
          'input-group--multi-line': this.multiLine,
          'input-group--full-width': this.fullWidth,
          'input-group--prefix': this.prefix,
          'input-group--suffix': this.suffix,
          'input-group--textarea': this.textarea
        }
      },
      count () {
        let inputLength
        if (this.inputValue) inputLength = this.inputValue.toString().length
        else inputLength = 0

        return `${inputLength} / ${this.counterLength}`
      },
      counterLength () {
        const parsedLength = parseInt(this.counter, 10)
        return isNaN(parsedLength) ? 25 : parsedLength
      },
      inputValue: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)

          this.lazyValue = val
        }
      },
      isDirty () {
        return this.lazyValue !== null &&
          typeof this.lazyValue !== 'undefined' &&
          this.lazyValue.toString().length > 0 ||
          this.placeholder ||
          ['time', 'date', 'datetime-local', 'week', 'month'].includes(this.type)
      }
    },

    watch: {
      focused (val) {
        !val && this.$emit('change', this.lazyValue)
      },
      value () {
        this.lazyValue = this.value
        !this.validateOnBlur && this.validate()
        this.multiLine && this.autoGrow && this.calculateInputHeight()
      }
    },

    mounted () {
      this.$vuetify.load(() => {
        this.multiLine && this.autoGrow && this.calculateInputHeight()
        this.autofocus && this.focus()
      })
    },

    methods: {
      calculateInputHeight () {
        this.inputHeight = null

        this.$nextTick(() => {
          const height = this.$refs.input
            ? this.$refs.input.scrollHeight
            : 0
          const minHeight = this.rows * 24
          const inputHeight = height < minHeight ? minHeight : height
          this.inputHeight = inputHeight
        })
      },
      onInput (e) {
        this.inputValue = e.target.value
        this.multiLine && this.autoGrow && this.calculateInputHeight()
      },
      blur (e) {
        this.$nextTick(() => {
          this.focused = false
          this.validate()
        })
        this.$emit('blur', e)
      },
      focus (e) {
        this.focused = true
        this.$refs.input.focus()
        this.$emit('focus', e)
      },
      genCounter () {
        return this.$createElement('div', {
          'class': {
            'input-group__counter': true,
            'input-group__counter--error': this.hasError
          }
        }, this.count)
      },
      genInput () {
        const tag = this.multiLine || this.textarea ? 'textarea' : 'input'

        const data = {
          style: {
            'height': this.inputHeight && `${this.inputHeight}px`
          },
          domProps: {
            autofocus: this.autofocus,
            disabled: this.disabled,
            required: this.required,
            value: this.lazyValue
          },
          attrs: {
            ...this.$attrs,
            tabindex: this.tabindex,
            'aria-label': (!this.$attrs || !this.$attrs.id) && this.label // Label `for` will be set if we have an id
          },
          on: {
            ...this.$listeners,
            blur: this.blur,
            input: this.onInput,
            focus: this.focus
          },
          ref: 'input'
        }

        if (this.placeholder) data.domProps.placeholder = this.placeholder

        if (!this.textarea && !this.multiLine) {
          data.domProps.type = this.type
        } else {
          data.domProps.rows = this.rows
        }

        const children = [this.$createElement(tag, data)]

        this.prefix && children.unshift(this.genFix('prefix'))
        this.suffix && children.push(this.genFix('suffix'))

        return children
      },
      genFix (type) {
        return this.$createElement('span', {
          'class': `input-group--text-field__${type}`
        }, this[type])
      }
    },

    render () {
      return this.genInputGroup(this.genInput(), { attrs: { tabindex: false } })
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_input-groups.styl"></style>
<style lang="stylus" src="../../stylus/components/_text-fields.styl"></style>

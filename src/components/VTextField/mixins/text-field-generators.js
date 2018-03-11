import VLabel from '../../VLabel'

export default {
  methods: {
    genLabel () {
      if (this.isDirty && this.isSingle) return null

      const isSingleLine = this.isSingle
      const data = {
        props: {
          color: this.color,
          focused: !isSingleLine && this.isFocused,
          value: !isSingleLine && (this.isFocused || this.isDirty)
        }
      }

      if ((this.attrs || {}).id) data.props.for = this.attrs.id

      return this.$createElement(VLabel, data, this.$slots.label || this.label)
    },
    genInput () {
      const tag = this.isTextarea ? 'textarea' : 'input'
      const listeners = Object.assign({}, this.$listeners)
      delete listeners['change'] // Change should not be bound externally

      const data = {
        style: {},
        domProps: {
          value: this.maskText(this.lazyValue)
        },
        attrs: {
          ...this.$attrs,
          autofocus: this.autofocus,
          disabled: this.disabled,
          required: this.required,
          readonly: this.readonly,
          tabindex: this.tabindex,
          'aria-label': (!this.$attrs || !this.$attrs.id) && this.label // Label `for` will be set if we have an id
        },
        on: Object.assign(listeners, {
          blur: this.onBlur,
          input: this.onInput,
          focus: this.onFocus,
          keydown: this.onKeyDown
        }),
        ref: 'input'
      }

      if (this.shouldAutoGrow) {
        data.style.height = this.inputHeight && `${this.inputHeight}px`
      }

      if (this.placeholder) data.attrs.placeholder = this.placeholder

      if (!this.isTextarea) {
        data.attrs.type = this.type
      } else {
        data.attrs.rows = this.rows
      }

      if (this.mask) {
        data.attrs.maxlength = this.masked.length
      }

      const children = [this.$createElement(tag, data)]

      this.prefix && children.unshift(this.genAffix('prefix'))
      this.suffix && children.push(this.genAffix('suffix'))

      return children
    },
    genAffix (type) {
      return this.$createElement('div', {
        'class': `v-input--text__${type}`,
        ref: type
      }, this[type])
    }
  }
}

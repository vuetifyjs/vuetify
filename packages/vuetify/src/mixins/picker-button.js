/* @vue/component */
export default {
  methods: {
    genPickerButton (prop, value, content, readonly = false, staticClass = '') {
      const active = this[prop] === value
      const click = event => {
        event.stopPropagation()
        this.$emit(`update:${prop}`, value)
      }

      return this.$createElement('div', {
        staticClass: `v-picker__title__btn ${staticClass}`.trim(),
        'class': {
          'v-picker__title__btn--active': active,
          'v-picker__title__btn--readonly': readonly
        },
        on: (active || readonly) ? undefined : { click }
      }, Array.isArray(content) ? content : [content])
    }
  }
}

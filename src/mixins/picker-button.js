/* @vue/component */
export default {
  methods: {
    genPickerButton (prop, value, content, staticClass = '') {
      const active = this[prop] === value
      const click = event => {
        event.stopPropagation()
        this.$emit(`update:${prop}`, value)
      }

      return this.$createElement('div', {
        staticClass: `v-picker__title__btn ${staticClass}`.trim(),
        'class': { active },
        on: active ? undefined : { click }
      }, Array.isArray(content) ? content : [content])
    }
  }
}

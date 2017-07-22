export default {
  name: 'v-form',

  inheritAttrs: false,

  data () {
    return {
      inputs: 0,
      errors: {}
    }
  },

  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  watch: {
    errors: {
      handler () {
        const keys = Object.keys(this.errors)
        if (keys.length < this.inputs) return false

        const errors = keys.reduce((errors, key) => {
          errors = errors || this.errors[key]
          return errors
        }, false)

        this.$emit('input', !errors)

        return !errors
      },
      deep: true
    }
  },

  methods: {
    validate () {
      this.$children.forEach((child) => {
        if (!child.$el.querySelector('input')) return

        child.validate(true)
      })
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.$children.forEach((child) => {
        if (!child.$el.querySelector('input')) return

        this.inputs += 1

        // Only start watching inputs if we need to
        child.$watch('shouldValidate', (val) => {
          if (!val) return

          child.$watch('valid', (val) => {
            this.$set(this.errors, child._uid, !val)
          }, { immediate: true })
        })
      })
    })
  },

  render (h) {
    return h('form', {
      attrs: this.$attrs
    }, this.$slots.default)
  }
}

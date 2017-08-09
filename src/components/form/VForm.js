export default {
  name: 'v-form',

  inheritAttrs: false,

  data () {
    return {
      inputs: 0,
      errorBag: {}
    }
  },

  props: {
    value: Boolean
  },

  watch: {
    errorBag: {
      handler () {
        const keys = Object.keys(this.errorBag)
        if (keys.length < this.inputs) return false

        const errors = keys.reduce((errors, key) => {
          errors = errors || this.errorBag[key]
          return errors
        }, false)

        this.$emit('input', !errors)

        return !errors
      },
      deep: true
    }
  },

  methods: {
    getInputs () {
      return this.$children.filter(child => {
        return !!child.$el.querySelector('.input-group__input')
      })
    },
    validate () {
      this.getInputs().forEach(child => child.validate(true))
    },
    reset () {
      this.getInputs().forEach((input) => input.reset())
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.getInputs().forEach((child) => {
        if (!child.$el.querySelector('input')) return

        this.inputs += 1

        // Only start watching inputs if we need to
        child.$watch('shouldValidate', (val) => {
          if (!val) return

          // Only watch if we're not already doing it
          if (this.errorBag.hasOwnProperty(child._uid)) return

          child.$watch('valid', (val) => {
            this.$set(this.errorBag, child._uid, !val)
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
